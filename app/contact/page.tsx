import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/features/contact/components/contact-form";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";

export const metadata = createMetadata({
  description: "Contact LegalDraft support for billing, document workflow, or account-related questions.",
  path: "/contact",
  title: "Contact"
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              We&apos;re Here to Help
            </h1>
            <p className="text-sm text-on-surface-variant md:text-base">
              For product support, billing clarifications, or enterprise use-cases, contact us using the
              form.
            </p>
            <Card className="space-y-3 p-6" tone="muted">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                Support Email
              </p>
              <a className="break-all text-sm font-semibold text-primary hover:underline" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
            </Card>
          </section>
          <section className="lg:col-span-8">
            <ContactForm />
          </section>
        </div>
      </main>
      <SiteFooter bordered />
    </>
  );
}
