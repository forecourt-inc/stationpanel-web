import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { fallbackAnswer } from "@/content/faq";
import { buildSystemPrompt } from "@/lib/chat-prompt";
import { matchFaq } from "@/lib/faq-match";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_TURNS = 8;
const MAX_CHARS = 600;

type ChatTurn = { role: "user" | "assistant"; content: string };

function parseTurns(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const turns: ChatTurn[] = [];
  for (const entry of raw.slice(-MAX_TURNS)) {
    if (!entry || typeof entry !== "object") return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) turns.push({ role, content: text });
  }
  // The API needs the history to open with a user turn and the question to be last.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientKey(request)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { answer: "That is a lot of questions in a short time. Give it a few minutes, or write to hello@stationpanel.com." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const turns = parseTurns(body);
  if (!turns) return NextResponse.json({ error: "Send { messages: [{ role, content }] }." }, { status: 400 });

  const question = turns[turns.length - 1].content;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ answer: matchFaq(question), source: "faq" });
  }

  try {
    const client = new Anthropic();
    const messages: Anthropic.MessageParam[] = turns;
    const response = await client.messages.create(
      {
        model: "claude-haiku-4-5",
        max_tokens: 400, // answers are two to four sentences by design
        system: buildSystemPrompt(),
        messages,
      },
      { timeout: 20_000 },
    );

    const answer = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();

    return NextResponse.json({ answer: answer || fallbackAnswer, source: "claude" });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`[chat] Claude API error ${error.status}: ${error.message}`);
    } else {
      console.error("[chat] unexpected error", error);
    }
    // The widget should still work when the API does not.
    return NextResponse.json({ answer: matchFaq(question), source: "faq" });
  }
}
