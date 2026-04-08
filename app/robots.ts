import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteConfig.siteUrl,
    rules: [
      {
        allow: "/",
        userAgent: "*"
      }
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
