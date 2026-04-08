import { LegalPageTemplate } from "@/components/legal/legal-page-template";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { refundPolicyContent } from "@/features/legal/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Understand LegalDraft refund review criteria and request process.",
  path: "/refund-policy",
  title: "Refund Policy"
});

export default function RefundPolicyPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <LegalPageTemplate {...refundPolicyContent} />
      <SiteFooter bordered />
    </>
  );
}
