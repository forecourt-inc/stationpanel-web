import Image from "next/image";
import Link from "next/link";
import { DemoVideo } from "@/components/demo-video";
import { PricingBlock } from "@/components/pricing-block";
import { Container, CtaPair, Eyebrow } from "@/components/ui";
import { demoBlock, failureStrip, features, finalCta, hero, proofStrip, pullQuote } from "@/content/copy";
import { failureCases } from "@/content/failures";

const proofDots = ["bg-sage", "bg-overdue", "bg-warning", "bg-clear"];

export default function HomePage() {
  const homeCases = failureCases.filter((item) => item.onHome).slice(0, 3);

  return (
    <>
      <section className="forest-wash text-white">
        <Container className="pb-24 pt-16 sm:pb-32 sm:pt-24">
          <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">{hero.headline}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{hero.subhead}</p>
          <div className="mt-9">
            <CtaPair tone="dark" />
          </div>
        </Container>
      </section>

      <section aria-label="What you see" className="-mt-12 sm:-mt-14">
        <Container>
          <ul className="card grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {proofStrip.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 px-6 py-5 text-[0.95rem] font-medium leading-snug lg:border-l lg:border-line lg:first:border-l-0"
              >
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${proofDots[index]}`} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{demoBlock.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{demoBlock.title}</h2>
            <p className="mt-4 text-lg text-muted">{demoBlock.body}</p>
          </div>
          <div className="mt-10">
            <DemoVideo />
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Product</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What is in the panel.</h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li key={feature.title} className="border-t border-line pt-6">
                <p className="font-mono text-xs text-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
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
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{failureStrip.title}</h2>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {homeCases.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/failures#${item.id}`}
                  className="card group flex h-full flex-col p-7 transition-colors hover:border-sage"
                >
                  <p className="label text-muted">{item.kicker}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
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

      <section className="forest-wash relative isolate overflow-hidden py-20 text-white sm:py-28">
        <Image
          src="/photos/forecourt-pump.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[42%_88%] opacity-80 mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest/90 via-forest/55 to-forest/10" aria-hidden="true" />
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
          <PricingBlock />
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{finalCta.title}</h2>
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
