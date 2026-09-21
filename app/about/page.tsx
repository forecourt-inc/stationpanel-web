import type { Metadata } from "next";
import { FoundersLetter } from "@/components/founders-letter";
import { Container, CtaPair, PageHeader } from "@/components/ui";
import { aboutPage } from "@/content/copy";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.metaDescription,
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

      <section className="border-t border-line bg-white py-16 sm:py-24">
        <Container>
          <h2 className="type-section">Founders</h2>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {aboutPage.founders.map((founder) => (
              <li key={founder.name} className="border-b border-line py-5 first:border-t sm:[&:nth-child(2)]:border-t">
                <h3 className="type-item">{founder.name}</h3>
                <p className="text-muted">{founder.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CtaPair tone="light" />
          </div>
        </Container>
      </section>
    </>
  );
}
