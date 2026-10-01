import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { aboutPage, pressPage, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Press",
  description: pressPage.metaDescription,
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <>
      <PageHeader eyebrow={pressPage.eyebrow} title={pressPage.title} intro={pressPage.intro} />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="type-item">{pressPage.boilerplateTitle}</h2>
            <p className="mt-3 max-w-xl text-lg">{aboutPage.company}</p>
          </div>
          <aside className="space-y-8">
            <div>
              <h2 className="type-item">Press contact</h2>
              <p className="mt-2">
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </p>
            </div>
            <div>
              <h2 className="type-item">Founders</h2>
              <ul className="mt-2 text-muted">
                {aboutPage.founders.map((founder) => (
                  <li key={founder.name}>
                    {founder.name}, {founder.role}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
