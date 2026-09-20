// Site copy. The hero, proof strip, pricing placeholder, ATG line, and founders'
// letter are locked — they come verbatim from STATIONPANEL-COPY.md. Edit them there first.

export const site = {
  name: "Station Panel",
  legalEntity: "Forecourt Inc.",
  url: "https://stationpanel.com",
  appUrl: "https://app.stationpanel.com",
  loginUrl: "https://app.stationpanel.com/login",
  email: "hello@stationpanel.com",
  tagline: "Operator portal for fuel-site compliance, testing & ATG alarms",
  description:
    "Station Panel puts sites, tests, documents, and ATG alarms in one place — so the fleet is ready before anyone knocks.",
} as const;

export const nav = [
  { label: "Product", href: "/product" },
  { label: "Demo", href: "/demo" },
  { label: "Failures", href: "/failures" },
  { label: "About", href: "/about" },
] as const;

export const cta = {
  login: { label: "Log in", href: site.loginUrl },
  demo: { label: "Request a demo", href: "/request-demo" },
} as const;

// --- Locked copy -----------------------------------------------------------

export const hero = {
  eyebrow: "Fuel-site compliance, without the binder.",
  headline: "Don’t have those days.",
  subhead:
    "A DEC inspector walks in on a Tuesday. The PBS binder is at another site. Someone drives three hours to flip pages. Station Panel puts sites, tests, documents, and ATG alarms in one place — so the fleet is ready before anyone knocks.",
} as const;

export const proofStrip = [
  "Fleet-wide compliance at a glance",
  "Active alarms",
  "Overdue tests",
  "Documents ready when DEC is in the building",
] as const;

export const pricing = {
  label: "Pricing.",
  body: "Monthly software + a one-time setup. Hardware only if the site needs a connection we do not already have. We price the fleet after we see the sites. Request a demo and we will send a number that matches your count.",
} as const;

export const atgLine =
  "Station Panel is built around ATG alarms and the testing calendar those gauges sit inside. The gauge stays on the tank. Tell us what is on site — we will tell you what we support.";

export const foundersLetter = {
  title: "A letter from the founders",
  paragraphs: [
    "Around 2016, Michael watched a version of the same day more than once.",
    "A DEC inspector walks into a New York fuel site on a Tuesday. Petroleum Bulk Storage. The manager is new. The PBS records are in a paper binder — if they are on site at all. Inventory sheets, tightness tests, walkthroughs, the ATG tape. Someone has to get in a car and drive three hours to stand at a counter and flip pages while the inspector waits.",
    "The day is gone. Everybody in the room feels unprepared. Nobody is a villain. The system is paper, distance, and hope.",
    "New York does not grade you on whether you meant well. It grades you on whether the record is in the building. Missing 10-day reconciliation. A tightness test that exists in a vendor’s email. An ATG that has been in alarm since last shift. That is how a PBS inspection becomes a bad week, and how a bad week becomes a spill you explain for years.",
    "We started Forecourt Inc. because that Tuesday is still normal. Fuel sites are not short on rules. They are short on one place that can tell you, this morning, which tanks, tests, and alarms are actually in order.",
    "Station Panel is that place. Sites. Documents. Testing. ATG alarms. A dashboard you can open before the inspector does.",
    "We are a Delaware C-corporation. We work in New York. We built the product we wished existed when the binder was the system.",
  ],
  closing: "Don’t have those days.",
  signatures: [
    "Michael Bacher, Co-Founder & CEO",
    "Adam Siemaszko, Co-Founder & COO",
    "Forecourt Inc.",
  ],
} as const;

// Pulled from the letter, word for word.
export const pullQuote = {
  quote:
    "New York does not grade you on whether you meant well. It grades you on whether the record is in the building.",
  attribution: "From the founders’ letter",
} as const;

// --- Home ------------------------------------------------------------------

export const demoBlock = {
  eyebrow: "Demo",
  title: "What you see when you sign in.",
  body: "The dashboard. Counts across the top; below them, the sites that need attention and the next tests due or overdue across the fleet.",
  missing: "Screen recording coming. Request a walkthrough.",
  posterAlt:
    "A Station Panel fleet dashboard: active sites, active alarms, tests overdue, due in 60 days, a needs-attention list, and upcoming and overdue tests.",
} as const;

export const features = [
  {
    title: "Dashboard",
    body: "Four numbers when you sign in: active sites, active alarms, tests overdue, and tests due in the next 60 days.",
  },
  {
    title: "Needs attention",
    body: "The sites with an active alarm or an overdue test, in one list. You know where to look this morning.",
  },
  {
    title: "Testing calendar",
    body: "Tests like line tightness, ATG functionality, and spill bucket integrity, each with a due date by site and a count of days overdue when one slips.",
  },
  {
    title: "ATG alarms",
    body: "Alarms and warnings live next to the rest of the site file. The gauge stays on the tank.",
  },
  {
    title: "Documents",
    body: "Each site’s records, kept with the site instead of in a binder somewhere else.",
  },
  {
    title: "Fleet view",
    body: "All your sites under one login. Start the day with the whole fleet, not one binder.",
  },
] as const;

export const failureStrip = {
  eyebrow: "Failures",
  title: "Compliance fails in the records room long before it fails in the soil.",
  linkLabel: "Read the case",
} as const;

export const finalCta = {
  title: "Show us the fleet.",
  body: "We will show you the dashboard you open before the inspector does.",
} as const;

// --- Product ---------------------------------------------------------------

export const productPage = {
  eyebrow: "Product",
  title: "One place for sites, tests, documents, and ATG alarms.",
  metaDescription:
    "The Station Panel app, screen by screen: the dashboard, needs attention, upcoming and overdue tests, ATG alarms, documents, and settings.",
  intro: "This is the app as it is today, screen by screen. The screenshots are taken from the product.",
  screenshotCaption: "A Station Panel fleet dashboard.",
  loginCaption: "Operators sign in at app.stationpanel.com.",
  loginAlt:
    "The Station Panel sign-in screen: email, password, and the line “Operator portal for fuel-site compliance, testing & ATG alarms.”",
  dashboard: {
    title: "Dashboard",
    quote: "Fleet-wide compliance at a glance.",
    body: "Four numbers at the top of the screen. They are the first thing you see when you sign in.",
    kpis: [
      { label: "Active sites", tone: "ink" },
      { label: "Active alarms", tone: "overdue" },
      { label: "Tests overdue", tone: "overdue" },
      { label: "Due in 60 days", tone: "clear" },
    ],
  },
  needsAttention: {
    title: "Needs attention",
    body: "Sites with active alarms or overdue testing. Each site shows its counts: alarms, warnings, overdue tests.",
  },
  tests: {
    title: "Upcoming & overdue tests",
    body: "The next tests across the fleet, by site. When a test slips, the row says how many days overdue.",
    examples: [
      "Line Tightness Test",
      "ATG Functionality Test",
      "Spill Bucket Integrity Test",
    ],
  },
  sections: [
    { title: "Sites", body: "Every site in the fleet. Each one carries its own file." },
    {
      title: "Documents",
      body: "The records an inspector asks for, kept with the site they belong to.",
    },
    {
      title: "Testing",
      body: "The testing calendar. What is due, what is overdue, and by how many days.",
    },
    {
      title: "Alarms",
      body: "ATG alarms and warnings by site, next to the rest of the site file.",
    },
    {
      title: "Settings",
      body: "Who can see which sites, who is an admin, and how the account is named. It is boring on purpose.",
    },
  ],
  atgTitle: "About your ATG",
} as const;

// --- Demo ------------------------------------------------------------------

export const demoPage = {
  eyebrow: "Demo",
  title: "A short walk through the app.",
  metaDescription:
    "A short walk through Station Panel in five stops: sign in, the four dashboard numbers, needs attention, an overdue test, and ATG alarms.",
  intro: "Five stops. The same ones we walk on a live demo.",
  shotsTitle: "The five stops",
  shots: [
    { title: "Sign in at app.stationpanel.com", body: "Email and password. The same screen your operators use." },
    {
      title: "The four numbers",
      body: "Active sites, active alarms, tests overdue, due in 60 days.",
    },
    { title: "Needs attention", body: "Sites with active alarms or overdue testing." },
    { title: "An overdue test", body: "Which test, which site, how many days overdue." },
    { title: "Alarms", body: "ATG alarms and warnings, by site." },
  ],
  formTitle: "Rather see it live?",
  formBody: "Tell us about the fleet and we will walk you through it.",
} as const;

// --- Request a demo --------------------------------------------------------

export const requestDemoPage = {
  eyebrow: "Request a demo",
  title: "Show us the fleet.",
  intro:
    "Tell us how many sites and where. We will walk you through the dashboard and send a number that matches your count.",
  confirmation: "We’ll reply from hello@stationpanel.com.",
} as const;

// --- About -----------------------------------------------------------------

export const aboutPage = {
  eyebrow: "About",
  title: "Forecourt Inc. builds Station Panel.",
  metaDescription:
    "Forecourt Inc. is a Delaware C-corporation working in New York. Station Panel is its first product. Read the founders’ letter.",
  company:
    "Forecourt Inc. is a Delaware C-corporation operating in New York State. Station Panel is our first product: an operator portal for fuel-site compliance, testing, and ATG alarms. We build for operators — the people who own the Tuesday inspection.",
  founders: [
    {
      name: "Michael Bacher",
      role: "Co-Founder & CEO",
      initials: "MB",
    },
    {
      name: "Adam Siemaszko",
      role: "Co-Founder & COO",
      initials: "AS",
    },
  ],
} as const;
