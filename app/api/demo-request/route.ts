import { appendFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/copy";
import { demoFields, validateDemoRequest, type DemoRequest } from "@/lib/demo-request";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function formatEmail(data: DemoRequest): string {
  return demoFields.map((field) => `${field.label}: ${data[field.name] || "—"}`).join("\n");
}

// No email provider (or it failed): keep the request on disk and in the logs.
// Serverless filesystems are read-only outside the temp dir, so fall back to it.
async function saveToDisk(record: object): Promise<string | null> {
  const line = `${JSON.stringify(record)}\n`;
  for (const dir of [path.join(process.cwd(), "data"), path.join(tmpdir(), "stationpanel")]) {
    try {
      await mkdir(dir, { recursive: true });
      const file = path.join(dir, "demo-requests.jsonl");
      await appendFile(file, line, "utf8");
      return file;
    } catch {
      // try the next location
    }
  }
  return null;
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
        replyTo: data.email,
        subject: `Demo request — ${data.company} (${data.sites} sites)`,
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
    // The request is in the logs, but do not let the visitor rely on that.
    return NextResponse.json(
      { error: `We could not send that. Please write to ${site.email}.` },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
