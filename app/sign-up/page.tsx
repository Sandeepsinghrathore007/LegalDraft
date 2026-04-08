import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Create your LegalDraft account to download documents and manage plans.",
  path: "/sign-up",
  title: "Sign Up"
});

export default function SignUpPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <section className="mx-auto max-w-xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-surface-container-highest" />}>
            <SignUpForm />
          </Suspense>
        </section>
      </main>
      <SiteFooter bordered />
    </>
  );
}
