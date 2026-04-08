import { LegalPageTemplate } from "@/components/legal/legal-page-template";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { privacyContent } from "@/features/legal/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Read how LegalDraft collects, stores, and protects user data.",
  path: "/privacy",
  title: "Privacy Policy"
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <LegalPageTemplate {...privacyContent} />
      <SiteFooter bordered />
    </>
  );
}
