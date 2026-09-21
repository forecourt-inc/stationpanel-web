import { cta, pricing } from "@/content/copy";
import { ButtonLink } from "./ui";

// `cta={false}` where the page's own closing call to action sits right under the block.
export function PricingBlock({ cta: showCta = true }: { cta?: boolean }) {
  return (
    <aside
      aria-label="Pricing"
      className={`card flex flex-col gap-6 p-7 sm:p-9 md:flex-row md:items-center md:justify-between ${showCta ? "" : "mx-auto max-w-[54rem]"}`}
    >
      <p className="max-w-3xl text-lg">
        <strong className="font-semibold">{pricing.label}</strong> {pricing.body}
      </p>
      {showCta ? (
        <ButtonLink href={cta.demo.href} className="shrink-0 self-start md:self-auto">
          {cta.demo.label}
        </ButtonLink>
      ) : null}
    </aside>
  );
}
