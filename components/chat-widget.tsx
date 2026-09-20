"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { chips } from "@/content/faq";
import { site } from "@/content/copy";

type Turn = { role: "user" | "assistant"; content: string };

const LINKS = /(https:\/\/stationpanel\.com\/request-demo|hello@stationpanel\.com|app\.stationpanel\.com)/g;

function linkify(text: string): ReactNode[] {
  return text.split(LINKS).map((part, index) => {
    if (part === "hello@stationpanel.com")
      return (
        <a key={index} href={`mailto:${part}`} className="link">
          {part}
        </a>
      );
    if (part === "https://stationpanel.com/request-demo")
      return (
        <a key={index} href="/request-demo" className="link">
          stationpanel.com/request-demo
        </a>
      );
    if (part === "app.stationpanel.com")
      return (
        <a key={index} href={site.loginUrl} className="link">
          {part}
        </a>
      );
    return part;
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [turns, pending]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    const next: Turn[] = [...turns, { role: "user", content: text }];
    setTurns(next);
    setDraft("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const result = (await response.json()) as { answer?: string };
      if (!result.answer) throw new Error("No answer");
      setTurns([...next, { role: "assistant", content: result.answer }]);
    } catch {
      setTurns([
        ...next,
        { role: "assistant", content: `That did not go through. Write to ${site.email} and we will answer there.` },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(draft);
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-50 items-center gap-2 rounded-full bg-forest px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-lg shadow-forest-deep/30 ring-1 ring-white/15 transition-colors hover:bg-forest-deep ${open ? "hidden" : "inline-flex"}`}
      >
        <svg viewBox="0 0 20 20" className="size-4 fill-sage" aria-hidden="true">
          <path d="M10 2c4.4 0 8 3 8 6.8s-3.6 6.8-8 6.8c-.7 0-1.4-.1-2-.2L4 17.5l.8-3.3C3.1 13 2 11 2 8.8 2 5 5.6 2 10 2Z" />
        </svg>
        Ask Station Panel
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Ask Station Panel"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[26rem] flex-col border-l border-line bg-canvas shadow-2xl"
        >
          <div className="flex items-center justify-between bg-forest px-5 py-4 text-white">
            <div>
              <h2 className="text-base font-semibold tracking-normal">Ask Station Panel</h2>
              <p className="text-xs text-white/70">Automated answers from our FAQ. Not a person.</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[0.95rem] leading-relaxed ring-1 ring-line">
              Ask about the product, inspections, ATGs, or pricing. For a person, write to{" "}
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
              .
            </p>
            {turns.map((turn, index) => (
              <p
                key={index}
                className={
                  turn.role === "user"
                    ? "ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-forest px-4 py-3 text-[0.95rem] leading-relaxed text-white"
                    : "max-w-[90%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[0.95rem] leading-relaxed ring-1 ring-line"
                }
              >
                {turn.role === "assistant" ? linkify(turn.content) : turn.content}
              </p>
            ))}
            {pending ? <p className="px-1 text-sm text-muted">Looking that up…</p> : null}
          </div>

          <div className="border-t border-line bg-white px-5 pb-5 pt-4">
            <ul className="mb-3 flex flex-wrap gap-2" aria-label="Common questions">
              {chips.map((chip) => (
                <li key={chip}>
                  <button
                    type="button"
                    onClick={() => void ask(chip)}
                    disabled={pending}
                    className="rounded-full border border-line bg-canvas px-3 py-1.5 text-left text-[0.8rem] font-medium text-ink transition-colors hover:border-sage disabled:opacity-60"
                  >
                    {chip}
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={onSubmit} className="flex gap-2">
              <label htmlFor="chat-question" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="chat-question"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={600}
                placeholder="Type a question"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-lg border border-line px-3.5 py-2.5 text-base focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                className="rounded-lg bg-button px-4 py-2.5 text-[0.95rem] font-semibold text-forest-deep hover:bg-button-hover disabled:opacity-50"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
