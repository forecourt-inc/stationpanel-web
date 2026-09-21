import type { Metadata } from "next";
import { PricingBlock } from "@/components/pricing-block";
import { DeviceShot, Screenshot } from "@/components/screenshot";
import { Container, PageHeader } from "@/components/ui";
import { atgLine, demoBlock, kioskBlock, productPage } from "@/content/copy";

export const metadata: Metadata = {
  title: "Product",
  description: productPage.metaDescription,
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  const { dashboard, needsAttention, tests, sections, kiosk } = productPage;

  return (
    <>
      <PageHeader eyebrow={productPage.eyebrow} title={productPage.title} intro={productPage.intro} />

      <section className="py-16 sm:py-24">
        <Container>
          <Screenshot shot="dashboard" alt={demoBlock.posterAlt} caption={productPage.screenshotCaption} preload />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="type-section">{dashboard.title}</h2>
            <p className="mt-3 text-xl text-clear">“{dashboard.quote}”</p>
            <p className="mt-4 text-muted">{dashboard.body}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8" aria-label="The four dashboard numbers">
            {dashboard.kpis.map((kpi) => (
              <li key={kpi.label} className="flex items-center gap-3 border-b border-line py-4 [&:nth-child(-n+2)]:border-t">
                <span className="size-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                <span className="label text-ink">{kpi.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="card p-7 sm:p-9">
            <h2 className="type-card">{needsAttention.title}</h2>
            <p className="mt-3 text-muted">{needsAttention.body}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line text-sm font-medium" aria-label="Status tags used in the app">
              <li className="flex min-h-12 items-center">
                <span className="rounded-full border border-overdue/40 bg-overdue/10 px-3 py-1 text-overdue-ink">alarm</span>
              </li>
              <li className="flex min-h-12 items-center">
                <span className="rounded-full border border-warning/50 bg-warning/10 px-3 py-1 text-[#7a5b06]">warning</span>
              </li>
              <li className="flex min-h-12 items-center">
                <span className="rounded-full border border-overdue/40 bg-overdue/10 px-3 py-1 text-overdue-ink">overdue</span>
              </li>
            </ul>
          </article>
          <article className="card p-7 sm:p-9">
            <h2 className="type-card">{tests.title}</h2>
            <p className="mt-3 text-muted">{tests.body}</p>
            <ul className="mt-6 grid gap-x-8 border-t border-line text-[0.95rem] sm:grid-cols-2">
              {tests.examples.map((example) => (
                <li key={example} className="flex min-h-12 items-center border-b border-line">
                  {example}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <h2 className="type-section">The rest of the sidebar.</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-line pt-5">
                <dt className="type-item">{section.title}</dt>
                <dd className="mt-2 text-muted">{section.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="ipad" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="type-section">{kiosk.title}</h2>
              <p className="mt-3 text-xl text-clear">{kiosk.lead}</p>
              <p className="mt-4 text-muted">{kiosk.body}</p>
            </div>
            <DeviceShot shot="idle" alt={kioskBlock.idleAlt} caption={kiosk.idleCaption} />
          </div>
          <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {kiosk.points.map((point) => (
              <div key={point.title} className="border-t border-line pt-5">
                <dt className="type-item">{point.title}</dt>
                <dd className="mt-2 text-muted">{point.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 max-w-2xl">
            <h3 className="type-card">{kiosk.setupTitle}</h3>
            <p className="mt-3 text-muted">{kiosk.setupBody}</p>
          </div>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {kiosk.setupSteps.map((step) => (
              <li key={step.shot}>
                <DeviceShot shot={step.shot} alt={step.alt} caption={step.caption} sizes="(min-width: 640px) 340px, 100vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="type-section">{productPage.atgTitle}</h2>
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

      <section className="pb-20 pt-16 sm:pb-28 sm:pt-24">
        <Container>
          <PricingBlock />
        </Container>
      </section>
    </>
  );
}
