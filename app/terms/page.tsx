import { LegalPageTemplate } from "@/components/legal/legal-page-template";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { termsContent } from "@/features/legal/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Review LegalDraft terms covering account access, plans, and platform usage.",
  path: "/terms",
  title: "Terms of Service"
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <LegalPageTemplate {...termsContent} />
      <SiteFooter bordered />
    </>
  );
}
