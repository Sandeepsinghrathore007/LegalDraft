import { JsonLd } from "@/components/seo/json-ld";
import { LandingHero } from "@/components/home/landing-hero";
import { PricingSection } from "@/components/home/pricing-section";
import { TrustSection } from "@/components/home/trust-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";
import { getOrganizationJsonLd, getProductJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  description:
    "Generate rental agreements in minutes with live preview, clear download limits, and flexible subscription plans.",
  path: "/",
  title: "LegalDraft"
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[getOrganizationJsonLd(), getProductJsonLd()]} />
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Get Started" />
      <main>
        <LandingHero />
        <TrustSection />
        <PricingSection />
      </main>
      <SiteFooter bordered />
    </>
  );
}
