import type { MetadataRoute } from "next";
import { site } from "@/content/copy";

const routes = ["", "/product", "/demo", "/record", "/about", "/contact", "/careers", "/press", "/privacy", "/terms", "/accessibility", "/security"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${site.url}${route}`, changeFrequency: "monthly", priority: route ? 0.7 : 1 }));
}
