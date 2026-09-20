import { faq, fallbackAnswer } from "@/content/faq";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Keyword matcher used when ANTHROPIC_API_KEY is not set (and as the fallback if the API call fails).
export function matchFaq(question: string): string {
  const q = normalize(question);
  if (!q) return fallbackAnswer;

  const exact = faq.find((item) => normalize(item.question) === q);
  if (exact) return exact.answer;

  const padded = ` ${q} `;
  let best: { score: number; answer: string } | null = null;
  for (const item of faq) {
    let score = 0;
    for (const keyword of item.keywords) {
      // Multi-word phrases count for more than single words.
      if (padded.includes(` ${normalize(keyword)} `)) score += keyword.includes(" ") ? 2 : 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, answer: item.answer };
  }
  return best ? best.answer : fallbackAnswer;
}
