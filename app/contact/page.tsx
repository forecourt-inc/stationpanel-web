import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";
import { Container, PageHeader } from "@/components/ui";
import { atgLine, contactPage, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.intro,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={contactPage.eyebrow} title={contactPage.title} intro={contactPage.intro} />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <DemoForm />
          <aside className="space-y-8 lg:pt-4">
            <div>
              <h2 className="type-item">Already have a login?</h2>
              <p className="mt-2 text-muted">
                Log in at{" "}
                <a href={site.loginUrl} className="link">
                  app.stationpanel.com
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="type-item">About your ATG</h2>
              <p className="mt-2 text-muted">{atgLine}</p>
            </div>
            <div>
              <h2 className="type-item">Rather write?</h2>
              <p className="mt-2 text-muted">
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
