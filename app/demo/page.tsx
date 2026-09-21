import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";
import { DemoVideo } from "@/components/demo-video";
import { Container, PageHeader } from "@/components/ui";
import { demoPage } from "@/content/copy";

export const metadata: Metadata = {
  title: "Demo",
  description: demoPage.metaDescription,
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHeader eyebrow={demoPage.eyebrow} title={demoPage.title} intro={demoPage.intro} />

      <section className="py-16 sm:py-24">
        <Container>
          <DemoVideo />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <h2 className="type-section">{demoPage.shotsTitle}</h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {demoPage.shots.map((shot, index) => (
              <li key={shot.title} className="border-t border-line pt-5">
                <p className="font-mono text-sm text-clear" aria-hidden="true">
                  {index + 1}
                </p>
                <h3 className="type-item mt-2">{shot.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{shot.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="type-section">{demoPage.formTitle}</h2>
            <p className="mt-4 text-lg text-muted">{demoPage.formBody}</p>
          </div>
          <DemoForm />
        </Container>
      </section>
    </>
  );
}
