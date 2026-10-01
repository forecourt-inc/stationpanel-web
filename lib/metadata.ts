import type { Metadata } from "next";
import { alt as imageAlt, size as imageSize } from "@/app/opengraph-image";
import { site } from "@/content/copy";

// Next merges metadata shallowly, so a page that sets openGraph or alternates replaces the layout's.
// A page-level openGraph also drops the root opengraph-image, so the image is named here.
// Every page builds its metadata here, so shared links show that page's title, description, and URL.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  const images = [{ url: "/opengraph-image", ...imageSize, alt: imageAlt, type: "image/png" }];
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: "/feed.xml", title: "Station Panel field notes" }] },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: `${site.url}${path}`,
      title: fullTitle,
      description,
      locale: "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
