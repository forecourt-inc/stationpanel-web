import type { Metadata } from "next";
import { PricingBlock } from "@/components/pricing-block";
import { Screenshot } from "@/components/screenshot";
import { Container, CtaPair, PageHeader } from "@/components/ui";
import { atgLine, demoBlock, productPage } from "@/content/copy";

export const metadata: Metadata = {
  title: "Product",
  description: productPage.title,
  alternates: { canonical: "/product" },
};

const kpiTone = { ink: "bg-ink", overdue: "bg-overdue", clear: "bg-clear" } as const;

export default function ProductPage() {
  const { dashboard, needsAttention, tests, sections } = productPage;

  return (
    <>
      <PageHeader eyebrow={productPage.eyebrow} title={productPage.title} intro={productPage.intro} />

      <section className="py-16 sm:py-24">
        <Container>
          <Screenshot shot="dashboard" alt={demoBlock.posterAlt} caption={productPage.screenshotCaption} priority />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">{dashboard.title}</h2>
            <p className="mt-3 text-xl text-clear">“{dashboard.quote}”</p>
            <p className="mt-4 text-muted">{dashboard.body}</p>
          </div>
          <ul className="grid grid-cols-2 gap-4" aria-label="Dashboard KPIs">
            {dashboard.kpis.map((kpi) => (
              <li key={kpi.label} className="card flex items-center gap-3 bg-canvas p-5">
                <span className={`size-2.5 shrink-0 rounded-full ${kpiTone[kpi.tone]}`} aria-hidden="true" />
                <span className="label text-ink">{kpi.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="card p-7 sm:p-9">
            <h2 className="text-2xl font-semibold">{needsAttention.title}</h2>
            <p className="mt-3 text-muted">{needsAttention.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-medium" aria-label="Status tags used in the app">
              <li className="rounded-full border border-overdue/40 bg-overdue/10 px-3 py-1 text-overdue-ink">alarm</li>
              <li className="rounded-full border border-warning/50 bg-warning/10 px-3 py-1 text-[#7a5b06]">warning</li>
              <li className="rounded-full border border-overdue/40 bg-overdue/10 px-3 py-1 text-overdue-ink">overdue</li>
            </ul>
          </article>
          <article className="card p-7 sm:p-9">
            <h2 className="text-2xl font-semibold">{tests.title}</h2>
            <p className="mt-3 text-muted">{tests.body}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line text-[0.95rem]">
              {tests.examples.map((example) => (
                <li key={example} className="py-2.5">
                  {example}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <h2 className="text-3xl font-semibold">The rest of the sidebar.</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-line pt-5">
                <dt className="text-xl font-semibold">{section.title}</dt>
                <dd className="mt-2 text-muted">{section.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">{productPage.atgTitle}</h2>
            <p className="mt-4 text-lg">{atgLine}</p>
          </div>
          <Screenshot
            shot="login"
            alt={productPage.loginAlt}
            caption={productPage.loginCaption}
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-10">
          <PricingBlock />
          <div className="flex justify-center">
            <CtaPair tone="light" />
          </div>
        </Container>
      </section>
    </>
  );
}
