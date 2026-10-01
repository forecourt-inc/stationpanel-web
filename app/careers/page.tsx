import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { careersPage, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Careers",
  description: careersPage.metaDescription,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow={careersPage.eyebrow} title={careersPage.title} intro={careersPage.intro} />
      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="type-item">{careersPage.howTitle}</h2>
          <p className="mt-3 max-w-xl text-lg">{careersPage.how}</p>
          <p className="mt-4 text-lg">
            <a href={`mailto:${site.email}?subject=Careers`} className="link">
              {site.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
