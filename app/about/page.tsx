import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description:
    "Learn how LegalDraft helps landlords and tenants generate clear, professional rental agreements faster.",
  path: "/about",
  title: "About"
});

const highlights = [
  {
    description: "Draft and review legal-ready agreements in a guided step-by-step workflow.",
    icon: "edit_document",
    title: "Fast Drafting"
  },
  {
    description: "Transparent pricing from free usage to high-volume monthly plans.",
    icon: "payments",
    title: "Simple Plans"
  },
  {
    description: "Built-in validations and previews to reduce errors before download.",
    icon: "verified",
    title: "Reliable Output"
  }
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-8 md:py-16">
        <section className="space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About LegalDraft</p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Built for Modern Rental Workflows
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-on-surface-variant md:text-base">
            LegalDraft is a SaaS document platform focused on fast, structured agreement creation with
            clear plan limits and frictionless upgrades at the point of need.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card className="space-y-4 p-6" key={item.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <MaterialIcon className="text-2xl" fill icon={item.icon} />
              </div>
              <h2 className="font-headline text-2xl font-bold text-primary">{item.title}</h2>
              <p className="text-sm text-on-surface-variant">{item.description}</p>
            </Card>
          ))}
        </section>
      </main>
      <SiteFooter bordered />
    </div>
  );
}
