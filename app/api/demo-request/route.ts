import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/copy";
import { addressLabels, detailFields, validateDemoRequest, type DemoRequest } from "@/lib/demo-request";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function formatEmail(data: DemoRequest): string {
  const best = [data.time, data.days].filter(Boolean).join(", ");
  return [
    `${addressLabels[data.addressKind].label}: ${data.address}`,
    `${data.contactKind === "email" ? "Email" : "Phone"}: ${data.contact}`,
    `Best time: ${best || "—"}`,
    ...detailFields.map((field) => `${field.label}: ${data[field.name] || "—"}`),
  ].join("\n");
}

function subject(data: DemoRequest): string {
  const who = data.company || data.name || data.address;
  return `Demo request — ${who}${data.sites ? ` (${data.sites} sites)` : ""}`;
}

// No email provider (or it failed), in development only: keep the request in ./data.
// In production nothing on the server's disk lasts (a serverless temp dir is wiped),
// so a failed send must reach the visitor as an error, never as "Got it".
async function saveToDisk(record: object): Promise<string | null> {
  if (process.env.NODE_ENV === "production") return null;
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, "demo-requests.jsonl");
    await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
    return file;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!rateLimit(`demo:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: `Too many requests. Write to ${site.email} instead.` },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (body && typeof body === "object" && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateDemoRequest(body);
  if (!result.ok) return NextResponse.json({ error: "Check the form.", errors: result.errors }, { status: 400 });

  const data = result.data;
  const record = { receivedAt: new Date().toISOString(), ...data };
  const to = process.env.DEMO_TO_EMAIL || site.email;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.DEMO_FROM_EMAIL || `Station Panel <${site.email}>`,
        to,
        // Reply goes to the visitor when they gave an email. A phone number is in the body for a call back.
        replyTo: data.contactKind === "email" ? data.contact : undefined,
        subject: subject(data),
        text: formatEmail(data),
      });
      if (!error) return NextResponse.json({ ok: true });
      console.error("[demo-request] Resend error:", error);
    } catch (error) {
      console.error("[demo-request] Resend threw:", error);
    }
  }

  const file = await saveToDisk(record);
  console.log(`[demo-request] ${file ? `saved to ${file}` : "COULD NOT SAVE"}:`, JSON.stringify(record));
  if (!file) {
    // The request is in the runtime logs, but do not let the visitor rely on that.
    return NextResponse.json(
      { error: `We could not send that. Please write to ${site.email}.` },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
