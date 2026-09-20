import { site } from "@/content/copy";
import { fieldNotes, fieldNotesLabel } from "@/content/field-notes";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// RSS 2.0 built from content/field-notes.ts. Items link to the original public source.
export function GET() {
  const notes = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date));
  const items = notes
    .map((note) => {
      const description = `${note.place}. ${note.summary} Impact: ${note.impact} Source: ${note.sourceName}.`;
      return `    <item>
      <title>${escapeXml(note.headline)}</title>
      <link>${escapeXml(note.sourceUrl)}</link>
      <guid isPermaLink="false">${escapeXml(`${site.url}/failures#${note.id}`)}</guid>
      <pubDate>${new Date(`${note.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Station Panel — Field notes</title>
    <link>${site.url}/failures</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(fieldNotesLabel)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
