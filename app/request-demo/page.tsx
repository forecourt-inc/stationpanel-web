import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";
import { Container, PageHeader } from "@/components/ui";
import { atgLine, requestDemoPage, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Request a demo",
  description: requestDemoPage.intro,
  alternates: { canonical: "/request-demo" },
};

export default function RequestDemoPage() {
  return (
    <>
      <PageHeader eyebrow={requestDemoPage.eyebrow} title={requestDemoPage.title} intro={requestDemoPage.intro} />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <DemoForm />
          <aside className="space-y-8 lg:pt-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Already an operator?</h2>
              <p className="mt-2 text-muted">
                Log in at{" "}
                <a href={site.loginUrl} className="link">
                  app.stationpanel.com
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">About your ATG</h2>
              <p className="mt-2 text-muted">{atgLine}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Rather write?</h2>
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
