import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/agreement-generator",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/login",
    "/sign-up"
  ] as const;

  const now = new Date();

  return routes.map((route) => ({
    changeFrequency: route === "/" ? "weekly" : "monthly",
    lastModified: now,
    priority: route === "/" ? 1 : 0.7,
    url: absoluteUrl(route)
  }));
}
