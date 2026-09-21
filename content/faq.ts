import { atgLine, pricing, site } from "./copy";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  // Lowercase words and phrases used by the no-API-key keyword matcher in lib/faq-match.ts.
  keywords: string[];
  // Show as a quick-reply chip in the widget.
  chip?: boolean;
};

export const faq: FaqItem[] = [
  {
    id: "what-is",
    question: "What is Station Panel?",
    answer:
      "Station Panel is an operator portal for fuel-site compliance, testing, and ATG alarms. Sites, documents, tests, and alarms in one place.",
    keywords: ["station panel", "stationpanel", "what is this", "what do you do", "portal"],
  },
  {
    id: "track",
    question: "What does Station Panel track?",
    answer:
      "Sites, documents, testing due dates, overdue tests, and ATG alarms. Documents are filed by record category, from the registration certificate to DEC inspections. The dashboard shows active sites, active alarms, tests overdue, and what is due in 60 days.",
    keywords: ["track", "tracks", "features", "dashboard", "tests", "testing", "documents", "overdue", "kpi", "does it do"],
    chip: true,
  },
  {
    id: "inspection-day",
    question: "What happens on inspection day?",
    answer:
      "The inspector asks for records. With the site file in Station Panel — documents, testing dates, alarms — you open it where you are standing. Nobody has to drive three hours to flip pages in a binder.",
    keywords: ["inspection", "inspector", "inspection day", "dec", "binder", "tuesday", "audit", "records"],
    chip: true,
  },
  {
    id: "atg-support",
    question: "Do you read our ATG?",
    answer: atgLine,
    keywords: ["atg", "gauge", "gauges", "brand", "brands", "support", "supported", "integration", "integrations", "read our", "compatible", "veeder", "franklin", "incon", "tls"],
    chip: true,
  },
  {
    id: "ipad",
    question: "Is there anything at the site itself?",
    answer:
      "There can be. A site can keep an iPad on the counter with its compliance records on it. The idle screen says whether the records are up to date, and anyone can tap it to open them.",
    keywords: ["ipad", "tablet", "kiosk", "counter", "at the site", "in the store"],
  },
  {
    id: "replace-atg",
    question: "Will this replace my ATG?",
    answer:
      "No. The gauge stays on the tank. Station Panel is where alarms and the testing schedule live next to the rest of the site file.",
    keywords: ["replace", "replacement", "instead of", "swap", "new gauge"],
  },
  {
    id: "who",
    question: "Who is this for?",
    answer:
      "Fuel-site operators first. Then small fleets, and municipal and commercial fueling yards. Anyone who owns the Tuesday inspection.",
    keywords: ["who is it for", "who is this for", "for whom", "customers", "fleet", "fleets", "municipal", "commercial", "operator", "operators", "yard"],
    chip: true,
  },
  {
    id: "new-york",
    question: "Does it work in New York?",
    answer:
      `Yes. Station Panel is built with NYS PBS inspections in mind. Records in one place before DEC is in the building. For sites in another state, ask us at ${site.email}.`,
    keywords: ["new york", "ny", "nys", "pbs", "petroleum bulk storage", "which states"],
  },
  {
    id: "cost",
    question: "What does it cost?",
    answer: `${pricing.body} There is no public price list yet.`,
    keywords: ["cost", "costs", "price", "pricing", "how much", "fee", "fees", "monthly", "setup", "hardware", "quote"],
    chip: true,
  },
  {
    id: "demo",
    question: "How do I get a demo?",
    answer: `Request one at ${site.url}/request-demo and we’ll reply from ${site.email}. If you already have a login, it is at app.stationpanel.com.`,
    keywords: ["demo", "walkthrough", "trial", "see it", "live demo", "try", "log in", "login", "sign in"],
    chip: true,
  },
  {
    id: "contact",
    question: "How do I reach you?",
    answer: `Write to ${site.email}.`,
    keywords: ["contact", "reach", "email", "talk", "sales", "phone", "call", "person", "human"],
  },
  {
    id: "company",
    question: "Who is behind Station Panel?",
    answer:
      "Forecourt Inc., a Delaware C-corporation that works in New York. The founders are Michael Bacher, CEO, and Adam Siemaszko, COO.",
    keywords: ["company", "forecourt", "founder", "founders", "who made", "who built", "behind", "team"],
  },
];

export const chips = faq.filter((item) => item.chip).map((item) => item.question);

export const fallbackAnswer = `I don’t have a good answer for that. Request a demo at ${site.url}/request-demo or write to ${site.email}.`;
