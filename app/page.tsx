import Link from "next/link";
import { DemoNote, DemoVideo } from "@/components/demo-video";
import { PricingBlock } from "@/components/pricing-block";
import { DeviceShot } from "@/components/screenshot";
import { Container, CtaPair, Eyebrow } from "@/components/ui";
import { demoBlock, failureStrip, features, finalCta, hero, kioskBlock, proofStrip, pullQuote } from "@/content/copy";
import { failureCases } from "@/content/failures";

export default function HomePage() {
  const homeCases = failureCases.filter((item) => item.onHome).slice(0, 3);

  return (
    <>
      <section className="forest-wash relative isolate overflow-hidden text-white">
        <Container className="pt-16 sm:pt-20">
          <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
          <h1 className="type-display mt-5 max-w-4xl">{hero.headline}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{hero.subhead}</p>
          <div className="mt-9">
            <CtaPair tone="dark" />
          </div>
          <div className="relative mt-14 pb-10 sm:mt-16 sm:pb-14">
            {/* The canvas comes back a third of the way down, so the product sits across the edge of the forest. */}
            <div className="absolute -inset-x-[100vw] bottom-0 top-1/3 -z-10 bg-canvas" aria-hidden="true" />
            <DemoVideo note={false} preload />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <ul aria-label="What you see" className="card grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {proofStrip.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 px-6 py-5 text-[0.95rem] font-medium leading-snug lg:border-l lg:border-line lg:first:border-l-0"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-x-16 gap-y-5 sm:mt-20 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div>
              <Eyebrow>{demoBlock.eyebrow}</Eyebrow>
              <h2 className="type-section mt-4">{demoBlock.title}</h2>
            </div>
            <div>
              <p className="text-lg text-muted">{demoBlock.body}</p>
              <DemoNote className="mt-3" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Product</Eyebrow>
            <h2 className="type-section mt-4">What is in the panel.</h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li key={feature.title} className="border-t border-line pt-6">
                <p className="font-mono text-xs text-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="type-item mt-2">{feature.title}</h3>
                <p className="mt-2 text-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12">
            <Link href="/product" className="link">
              Walk the product
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{failureStrip.eyebrow}</Eyebrow>
            <h2 className="type-section mt-4">{failureStrip.title}</h2>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {homeCases.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/failures#${item.id}`}
                  className="card group flex h-full flex-col p-7 transition-colors hover:border-sage"
                >
                  <p className="label text-muted">{item.kicker}</p>
                  <h3 className="type-item mt-3">{item.title}</h3>
                  <p className="mt-3 flex-1 text-muted">{item.teaser}</p>
                  <p className="mt-6 text-[0.95rem] font-medium text-clear group-hover:text-forest">
                    {failureStrip.linkLabel} <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>{kioskBlock.eyebrow}</Eyebrow>
            <h2 className="type-section mt-4">{kioskBlock.title}</h2>
            <p className="mt-5 text-lg text-muted">{kioskBlock.body}</p>
            <p className="mt-8">
              <Link href="/product#ipad" className="link">
                {kioskBlock.linkLabel}
              </Link>
            </p>
          </div>
          <DeviceShot shot="idle" alt={kioskBlock.idleAlt} />
        </Container>
      </section>

      <section className="forest-wash py-20 text-white sm:py-28">
        <Container>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-[2.6rem]">
              <p>“{pullQuote.quote}”</p>
            </blockquote>
            <figcaption className="mt-8 text-white/70">
              {pullQuote.attribution}.{" "}
              <Link href="/about#letter" className="text-sage underline-offset-4 hover:underline">
                Read the letter
              </Link>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="space-y-14">
          <PricingBlock cta={false} />
          <div className="text-center">
            <h2 className="type-page">{finalCta.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{finalCta.body}</p>
            <div className="mt-8 flex justify-center">
              <CtaPair tone="light" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
