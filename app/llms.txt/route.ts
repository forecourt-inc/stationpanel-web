import { atgLine, contactPage, pricing, productPage, site } from "@/content/copy";
import { failuresPage } from "@/content/failures";
import { faq } from "@/content/faq";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain map of the site for assistants and agents. Built from content/ so it never drifts.
export function GET() {
  const faqLines = faq.map((item) => `- ${item.question} ${item.answer}`).join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.tagline}. Made by ${site.legalEntity} Operators sign in at ${site.loginUrl}.

ATG: ${atgLine}

Pricing: ${pricing.body}

## Pages

- [Product](${site.url}/product): ${productPage.metaDescription}
- [Demo](${site.url}/demo): A short walk through the app in five stops.
- [On the record](${site.url}/record): ${failuresPage.metaDescription}
- [About](${site.url}/about): The founders’ letter.
- [Contact](${site.url}/contact): ${contactPage.intro}

## Feeds

- [Field notes (RSS)](${site.url}/feed.xml): Public reports on tank releases and enforcement actions, curated. Not ${site.name} customer data.

## FAQ

${faqLines}

## Contact

${site.email}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
