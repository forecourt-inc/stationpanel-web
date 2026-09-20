import type { Metadata } from "next";
import { FoundersLetter } from "@/components/founders-letter";
import { Container, CtaPair, PageHeader } from "@/components/ui";
import { aboutPage } from "@/content/copy";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.company,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={aboutPage.eyebrow} title={aboutPage.title} intro={aboutPage.company} />

      <section id="letter" className="scroll-mt-28 py-16 sm:py-24">
        <Container>
          <FoundersLetter />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <h2 className="text-3xl font-semibold">Founders</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {aboutPage.founders.map((founder) => (
              <li key={founder.name} className="card flex items-center gap-5 bg-canvas p-6">
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-forest text-lg font-semibold text-sage"
                  aria-hidden="true"
                >
                  {founder.initials}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{founder.name}</h3>
                  <p className="text-muted">{founder.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex justify-center">
          <CtaPair tone="light" />
        </Container>
      </section>
    </>
  );
}
