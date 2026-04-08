import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type MetadataInput = {
  description: string;
  image?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
  path?: string;
  title: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function createMetadata({
  description,
  image = "/assets/legal-document-hero.webp",
  keywords = siteConfig.keywords,
  noIndex = false,
  path = "/",
  title
}: MetadataInput): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    alternates: {
      canonical: canonicalUrl
    },
    applicationName: siteConfig.name,
    description,
    keywords: [...keywords],
    metadataBase: new URL(siteConfig.siteUrl),
    openGraph: {
      description,
      images: [
        {
          alt: fullTitle,
          height: 630,
          url: imageUrl,
          width: 1200
        }
      ],
      locale: "en_US",
      siteName: siteConfig.name,
      title: fullTitle,
      type: "website",
      url: canonicalUrl
    },
    robots: noIndex
      ? {
          follow: false,
          index: false
        }
      : undefined,
    title: fullTitle,
    twitter: {
      card: "summary_large_image",
      description,
      images: [imageUrl],
      title: fullTitle
    }
  };
}
