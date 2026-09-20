# Station Panel marketing site — Claude Code kickoff

Paste this entire file into Claude Code as the first instruction in an empty repo.
Put the two product screenshots in `/reference/login.png` and `/reference/dashboard.png` first.

---

## Mission

Build the public marketing / sales site for **Station Panel**, the first product of **Forecourt Inc.**

This is not the product app. The product already lives at `https://app.stationpanel.com`. Do not rebuild it. Do not scrape it. Do not fake a logged-in session.

## Company

- Legal entity: **Forecourt Inc.**, Delaware C-corporation, operating in New York State
- Product: **Station Panel**
- Public domain: **https://stationpanel.com** (this site)
- Product / login: **https://app.stationpanel.com** and **https://app.stationpanel.com/login**
- Founders:
  - Michael Bacher — Co-Founder & CEO
  - Adam Siemaszko — Co-Founder & COO
- Sales inbox: **hello@stationpanel.com**
- Do **not** mention Meringo Labs anywhere on the marketing site.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Deploy-ready on Vercel
- `stationpanel.com` is the marketing host. `app.stationpanel.com` stays the product.
- No marketing-site auth.

## Look and feel

Match the live product: quiet, forest green, white cards, lots of air, operator-serious.

Colors:

- Forest `#1B3A2F` — nav wash, footer, chatbot button
- Sage `#6FBF8A` — logo tile, “Panel” in the wordmark, links
- Button `#5FA87A`
- Canvas `#F4F6F5`
- Ink `#111827`
- Muted `#6B7280`
- Warning `#D4A017`
- Overdue `#C45C4A`
- Clear `#2F7D4A`

Type: Geist or Inter. Tight tracking on labels, comfortable body size.

Logo: the **only** mark we have is the leaf. Recreate as SVG:

- Rounded square (~8px radius) sage fill
- Simple white/off-white leaf, slightly tilted, same family as a single-leaf / sprout — not an oak, not a generic eco-globe
- Wordmark beside it: **Station** in ink, **Panel** in sage, one word, no space, as in the product: `StationPanel`
- Favicon = the leaf tile only

Use `/reference/login.png` and `/reference/dashboard.png` on Product and as the demo poster.

## Primary CTAs (header, hero, footer)

1. **Log in** → `https://app.stationpanel.com/login`
2. **Request a demo** → `/request-demo`

Demo form posts to an API route that emails **hello@stationpanel.com** (Resend or similar; if no `RESEND_API_KEY`, save the submission to disk and log it). Confirmation copy: “We’ll reply from hello@stationpanel.com.”

## Voice

Direct. Short sentences. Operators, not VCs.

Allowed words: inspector, binder, site, fleet, overdue, alarm, test, tanks, PBS, DEC, Tuesday.

Banned: revolutionize, leverage, seamless, next-gen, AI-powered (except one honest line that the FAQ widget can answer questions), disrupt, ecosystem, unlock.

Do not claim ATG vendor integrations (Veeder-Root, Franklin, Incon, etc.). We have not locked which gauges we read. Say: “Station Panel is built around ATG alarms and the testing calendar those gauges sit inside. Tell us what is on site — we will tell you what we support.”

## Pricing

Placeholder only. Do not invent a number.

Use this block on Product and near the final CTA:

> **Pricing.** Monthly software + a one-time setup. Hardware only if the site needs a connection we do not already have. We price the fleet after we see the sites. Request a demo and we will send a number that matches your count.

## Pages

### `/` Home

- Sticky header: leaf + StationPanel · Product · Demo · Failures · About · Log in · Request a demo
- Hero eyebrow: `Fuel-site compliance, without the binder.`
- Hero h1: `Don’t have those days.`
- Hero subhead: the Tuesday / three-hour drive / paper binder story, then the product promise. New York PBS flavored.
- Two buttons: Request a demo · Log in
- Proof strip: Fleet-wide compliance at a glance · Active alarms · Overdue tests · Documents ready when DEC is in the building
- Demo video block: `public/demo.mp4`. If missing, dashboard screenshot + “Screen recording coming. Request a walkthrough.”
- Feature grid (6): Dashboard, Needs attention, Testing calendar, ATG alarms, Documents, Fleet view
- Failure strip (3 cards) linking to `/failures`
- Founders pull-quote from the letter
- Pricing placeholder
- Final CTA

### `/product`

Walk the real IA from the app, nothing invented:

- Dashboard — “Fleet-wide compliance at a glance.” KPIs: Active sites, Active alarms, Tests overdue, Due in 60 days
- Needs attention — sites with live alarms or overdue testing
- Upcoming & overdue tests — Line Tightness, ATG Functionality, Spill Bucket Integrity, days overdue
- Sites, Documents, Testing, Alarms, Settings

Screenshot of the real dashboard. Caption: “A Station Panel fleet dashboard.”

### `/demo`

Player + shot list:

1. Sign in at app.stationpanel.com
2. Dashboard KPIs
3. Needs attention
4. An overdue test
5. Alarms

Same demo form as `/request-demo`.

### `/failures`

Opening: compliance fails in the records room long before it fails in the soil.

Case cards (factual, sourced, not theatrical):

1. National UST picture — ~534k active petroleum USTs at ~190k facilities; mid-year FY2026 technical compliance ~60.9%; ~2,000 confirmed releases in six months; ~53k cleanups still open. Source EPA UST Performance Measures.
2. Walla Walla, 2023 — ~2,500 gallons, groundwater + basements, hotel evacuated, $4.1M+ cost recovery. Source WA Ecology / trade press.
3. Santa Monica / Charnock — MTBE from a cluster of UST sites took down drinking-water wells serving about half the city.
4. New York PBS — DEC still cites sites for the boring failures: 10-day inventory reconciliation missing, tightness tests not on file, ATG not functioning, walkthrough logs not in the binder. Cite 6 NYCRR Part 613 / PBS inspection practice. This is the Tuesday problem.

**Field notes** — curated array in `content/field-notes.ts`, 8–12 items. Public reporting only. Each item: date, place, headline, 2–3 sentences, impact, source URL. Label: “Public reports, curated. Not Station Panel customer data.”

Generate **`/feed.xml`** from that array.

### `/about`

Short company paragraph + full founders’ letter + two founder blocks.

### `/request-demo`

Form fields: name, email, company, role, number of sites, city/state, phone, notes, “How did you hear about us?”

### `/privacy` `/terms`

Short B2B placeholders for a Delaware C-corp selling to NY operators. Mark “Draft for counsel.”

## Founders’ letter — use this text (light copy-edit only)

**A letter from the founders**

Around 2016, Michael watched a version of the same day more than once.

A DEC inspector walks into a New York fuel site on a Tuesday. Petroleum Bulk Storage. The manager is new. The PBS records are in a paper binder — if they are on site at all. Inventory sheets, tightness tests, walkthroughs, the ATG tape. Someone has to get in a car and drive three hours to stand at a counter and flip pages while the inspector waits.

The day is gone. Everybody in the room feels unprepared. Nobody is a villain. The system is paper, distance, and hope.

New York does not grade you on whether you meant well. It grades you on whether the record is in the building. Missing 10-day reconciliation. A tightness test that exists in a vendor’s email. An ATG that has been in alarm since last shift. That is how a PBS inspection becomes a bad week, and how a bad week becomes a spill you explain for years.

We started Forecourt Inc. because that Tuesday is still normal. Fuel sites are not short on rules. They are short on one place that can tell you, this morning, which tanks, tests, and alarms are actually in order.

Station Panel is that place. Sites. Documents. Testing. ATG alarms. A dashboard you can open before the inspector does.

We are a Delaware C-corporation. We work in New York. We built the product we wished existed when the binder was the system.

Don’t have those days.

Michael Bacher, Co-Founder & CEO
Adam Siemaszko, Co-Founder & COO
Forecourt Inc.

## Chatbot — simple FAQ now

- Floating forest-green button, bottom right, label “Ask Station Panel”
- Slide-over. Chips: “What does Station Panel track?” · “What happens on inspection day?” · “Do you read our ATG?” · “Who is this for?” · “What does it cost?” · “How do I get a demo?”
- `POST /api/chat`
- If `ANTHROPIC_API_KEY` is set, answer with Claude Haiku. System prompt may only use `content/faq.ts` + site copy. Never invent pricing, integrations, customers, or legal advice. If unsure: say so and point to Request a demo / hello@stationpanel.com.
- If no key, keyword-match the FAQ so the widget still works.
- Do not claim a human is on the other side.

Include at least these FAQ pairs:

- What is Station Panel? → Operator portal for fuel-site compliance, testing, and ATG alarms.
- Who is it for? → Operators first. Small fleets. Municipal and commercial fueling yards. Anyone who owns the Tuesday inspection.
- What does it track? → Sites, documents, testing due dates, overdue tests, ATG alarms.
- Will this replace my ATG? → No. The gauge stays on the tank. Station Panel is where alarms and the testing calendar live next to the rest of the site file.
- Which ATG brands do you support? → Tell us what is on site. We will tell you what we support. Do not list brands.
- Does it work in New York? → Built with NYS PBS inspections in mind. Records in one place before DEC is in the building.
- What does it cost? → Monthly software + setup. Hardware only if needed. No public price list yet. Request a demo.
- Is there a live demo? → Yes — request one. Existing operators log in at app.stationpanel.com.
- How do I reach you? → hello@stationpanel.com

## Content modules

- `content/copy.ts`
- `content/faq.ts`
- `content/field-notes.ts`
- `content/failures.ts` (cards + source URLs)

## Quality bar

- Mobile-first, accessible, semantic HTML
- Metadata + Open Graph for stationpanel.com
- Fast. Client JS only for chatbot, form, video
- README: env vars (`RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `DEMO_TO_EMAIL=hello@stationpanel.com`), how to drop in `public/demo.mp4`, how to add a field note, how to deploy to Vercel, DNS note that apex/www is marketing and `app` is the product

Build the full site. Do not leave lorem. Do not invent customers, logos, or integration partners.
