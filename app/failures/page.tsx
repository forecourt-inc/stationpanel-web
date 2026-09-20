import type { Metadata } from "next";
import { Container, CtaPair, PageHeader } from "@/components/ui";
import { failureCases, failuresPage } from "@/content/failures";
import { fieldNotes, fieldNotesLabel } from "@/content/field-notes";

export const metadata: Metadata = {
  title: "Failures",
  description: failuresPage.title,
  alternates: { canonical: "/failures" },
};

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function FailuresPage() {
  const notes = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader eyebrow={failuresPage.eyebrow} title={failuresPage.title} intro={failuresPage.intro} />

      <section className="py-16 sm:py-24">
        <Container className="space-y-6">
          {failureCases.map((item) => (
            <article key={item.id} id={item.id} className="card scroll-mt-28 p-7 sm:p-10">
              <p className="label text-muted">{item.kicker}</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{item.title}</h2>
              <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div className="space-y-4">
                  {item.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
                <dl className="divide-y divide-line self-start border-y border-line">
                  {item.facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-[0.95rem] text-muted">{fact.label}</dt>
                      <dd className="text-right font-semibold tabular-nums">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-8 text-sm text-muted">
                {item.sources.length > 1 ? "Sources: " : "Source: "}
                {item.sources.map((source, index) => (
                  <span key={source.url}>
                    {index > 0 ? " · " : null}
                    <a href={source.url} className="link" rel="noopener noreferrer" target="_blank">
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            </article>
          ))}
        </Container>
      </section>

      <section id="field-notes" className="scroll-mt-28 border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Field notes</h2>
              <p className="mt-3 text-muted">{fieldNotesLabel}</p>
            </div>
            <a href="/feed.xml" className="link text-[0.95rem]">
              RSS feed
            </a>
          </div>

          <ol className="mt-12 divide-y divide-line border-y border-line">
            {notes.map((note) => (
              <li key={note.id} id={note.id} className="scroll-mt-28 grid gap-x-10 gap-y-2 py-8 md:grid-cols-[13rem_1fr]">
                <p className="text-[0.95rem] text-muted">
                  <time dateTime={note.date}>{dateFormat.format(new Date(`${note.date}T00:00:00Z`))}</time>
                  <br />
                  {note.place}
                </p>
                <div>
                  <h3 className="text-xl font-semibold">{note.headline}</h3>
                  <p className="mt-2">{note.summary}</p>
                  <p className="mt-3 text-[0.95rem]">
                    <span className="font-semibold">Impact:</span> {note.impact}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Source:{" "}
                    <a href={note.sourceUrl} className="link" rel="noopener noreferrer" target="_blank">
                      {note.sourceName}
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">{failuresPage.closing}</h2>
          <div className="mt-8 flex justify-center">
            <CtaPair tone="light" />
          </div>
        </Container>
      </section>
    </>
  );
}
