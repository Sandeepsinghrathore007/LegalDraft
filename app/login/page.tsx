import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LoginForm } from "@/features/auth/components/login-form";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Log in to manage plan usage and continue your agreement workflow.",
  path: "/login",
  title: "Log In"
});

export default function LoginPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <section className="mx-auto max-w-xl">
          <Suspense fallback={<div className="h-80 animate-pulse rounded-3xl bg-surface-container-highest" />}>
            <LoginForm />
          </Suspense>
        </section>
      </main>
      <SiteFooter bordered />
    </>
  );
}
