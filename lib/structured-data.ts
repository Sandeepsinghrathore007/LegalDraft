import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    sameAs: [siteConfig.siteUrl],
    url: siteConfig.siteUrl
  };
}

export function getProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: {
      "@type": "Brand",
      name: siteConfig.name
    },
    description: siteConfig.description,
    name: "LegalDraft Rent Agreement Generator",
    offers: [
      {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "0",
          priceCurrency: "INR"
        },
        url: absoluteUrl("/pricing")
      },
      {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "199",
        priceCurrency: "INR",
        url: absoluteUrl("/pricing")
      },
      {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "399",
        priceCurrency: "INR",
        url: absoluteUrl("/pricing")
      }
    ],
    url: absoluteUrl("/")
  };
}
