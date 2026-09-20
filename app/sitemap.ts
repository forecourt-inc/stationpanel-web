import type { MetadataRoute } from "next";
import { site } from "@/content/copy";

const routes = ["", "/product", "/demo", "/failures", "/about", "/request-demo", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${site.url}${route}`, changeFrequency: "monthly", priority: route ? 0.7 : 1 }));
}
