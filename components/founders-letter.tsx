import { foundersLetter } from "@/content/copy";

export function FoundersLetter() {
  return (
    <article className="card mx-auto max-w-3xl px-6 py-10 sm:px-12 sm:py-14">
      <h2 className="type-card">{foundersLetter.title}</h2>
      <div className="mt-8 space-y-6 text-[1.075rem] leading-[1.75]">
        {foundersLetter.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        <p className="text-xl font-semibold tracking-tight">{foundersLetter.closing}</p>
      </div>
      <footer className="mt-10 border-t border-line pt-6 text-[0.95rem] text-muted">
        {foundersLetter.signatures.map((line) => (
          <p key={line} className="first:text-ink [&:nth-child(2)]:text-ink">
            {line}
          </p>
        ))}
      </footer>
    </article>
  );
}
