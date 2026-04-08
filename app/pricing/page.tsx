import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getOrganizationJsonLd, getProductJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  description: "Compare Free, Starter, and Pro plans with clear monthly download limits.",
  path: "/pricing",
  title: "Pricing"
});

const PricingPageClient = dynamic(
  () => import("@/features/pricing/components/pricing-page-client").then((module) => module.PricingPageClient),
  {
    ssr: false
  }
);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[getOrganizationJsonLd(), getProductJsonLd()]} />
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="h-12 w-64 animate-pulse rounded-xl bg-surface-container-highest" />
          </main>
        }
      >
        <PricingPageClient />
      </Suspense>
      <SiteFooter bordered />
    </>
  );
}
