# stationpanel.com

Marketing site for **Station Panel**, the first product of **Forecourt Inc.**

This is not the product. The product lives at `https://app.stationpanel.com`. This repo is the public site at `https://stationpanel.com`: Next.js (App Router), TypeScript, Tailwind CSS. No auth, no database.

## Run it

Requires Node 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

## Environment variables

Everything works with none of these set.

| Variable | What it does | If unset |
| --- | --- | --- |
| `RESEND_API_KEY` | Emails demo requests through [Resend](https://resend.com). | Requests are appended to `data/demo-requests.jsonl` and logged. |
| `DEMO_TO_EMAIL` | Where demo requests go. Use `hello@stationpanel.com`. | Defaults to `hello@stationpanel.com`. |
| `DEMO_FROM_EMAIL` | The From line. The domain must be verified in Resend. | `Station Panel <hello@stationpanel.com>` |
| `ANTHROPIC_API_KEY` | The “Ask Station Panel” widget answers with Claude Haiku, limited to `content/faq.ts` and site copy. | The widget keyword-matches the FAQ. |

On Vercel, set `RESEND_API_KEY`. The filesystem there is temporary, so the disk fallback only lands in the function's temp dir and the logs.

If Resend or the Claude API fails at runtime, the routes fall back the same way: save-and-log for demo requests, FAQ matching for chat.

## Where things live

```
app/                  pages, /api/chat, /api/demo-request, /feed.xml, OG image, favicon (icon.svg)
components/           header, footer, logo, demo form, chat widget, screenshot frame
content/copy.ts       all page copy. Hero, pricing, ATG line, and founders' letter are locked (STATIONPANEL-COPY.md)
content/faq.ts        FAQ pairs, widget chips, matcher keywords
content/failures.ts   case cards on /failures, with source URLs
content/field-notes.ts  field notes on /failures and in /feed.xml
lib/                  FAQ matcher, chat system prompt, form validation, rate limiter
public/screenshots/   product screenshots, built by scripts/patch-shots.cjs
scripts/              patch-shots.cjs: raw capture in, publishable screenshot out
reference/            original screenshots, untouched (dashboard.png is git-ignored and kept locally)
```

Client-side JavaScript is limited to the chat widget and the demo form. Everything else is server-rendered and static.

## Drop in the demo video

Save the screen recording as `public/demo.mp4` and rebuild. The home page and `/demo` check for that file at build time: if it exists they show the player with the dashboard screenshot as the poster; if not, they show the screenshot and “Screen recording coming. Request a walkthrough.”

Keep it small (H.264, 1080p, a few MB). The shot list is on `/demo`.

## Add a field note

Add an object to the array in `content/field-notes.ts`:

```ts
{
  id: "2026-05-town-st-short-slug",   // unique; used as the anchor and the RSS guid
  date: "2026-05-14",                 // ISO date of the public report
  place: "Town, ST",
  headline: "Plain, factual headline",
  summary: "Two or three sentences. Only what the source says.",
  impact: "Gallons, penalty, number of sites — as the source states it.",
  sourceName: "Agency or publication",
  sourceUrl: "https://…",
},
```

Rules: public reporting only, never customer data. Link the primary source. No adjectives the source did not use. The page and `/feed.xml` sort by date and update on the next build.

## Screenshots

`public/screenshots/*.png` are built from raw captures by `scripts/patch-shots.cjs`. The raw captures live in `reference/` (portal) and `WEB_PHOTOS/` (on-site iPad, git-ignored, local only).

```sh
node scripts/patch-shots.cjs                 # list the shots it knows
node scripts/patch-shots.cjs ipad-idle       # rebuild one
OUT_DIR=/tmp/shots node scripts/patch-shots.cjs dashboard   # dry run somewhere else
```

Portal captures: browser chrome removed, the half-visible card at the bottom of the dashboard trimmed, the organization label under the sidebar wordmark covered with the adjacent sidebar color, and the signed-in user’s name and role in the top bar covered with the bar’s white. iPad captures: the status bar cropped off, then resized. Never publish a capture that shows a person’s name, the organization label, a device PIN, the Settings page, a Wi-Fi name, a local address, or a live QR code. Add a new shot to the table in the script, then to the table in `components/screenshot.tsx`.

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel. The framework preset is detected; no build settings to change.
2. Add the environment variables above (Production and Preview).
3. Add the domains `stationpanel.com` and `www.stationpanel.com` to the project. Pick one as primary; Vercel redirects the other.

### DNS

- **Apex and `www` are the marketing site** (this repo). Point them at Vercel using the records shown in the project's Domains tab.
- **`app` is the product.** Leave the `app.stationpanel.com` record pointing wherever the product is hosted. Do not add `app` to this Vercel project.
- Resend needs its own DNS records (SPF/DKIM) on `stationpanel.com` to send from `hello@stationpanel.com`.

## Copy rules

Direct. Short sentences. Operators, not VCs. Do not claim ATG vendor integrations, customers, or a price. Legal pages are marked “Draft for counsel” until reviewed.
