import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Create and preview a residential lease agreement before download.",
  path: "/agreement-generator",
  title: "Agreement Generator"
});

const AgreementGenerator = dynamic(
  () => import("@/features/agreement/components/agreement-generator").then((module) => module.AgreementGenerator),
  {
    ssr: false
  }
);

export default function AgreementGeneratorPage() {
  return (
    <>
      <SiteHeader ctaHref="/pricing" ctaLabel="Upgrade" />
      <Suspense
        fallback={
          <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
            <div className="h-12 w-48 animate-pulse rounded-xl bg-surface-container-highest" />
          </main>
        }
      >
        <AgreementGenerator />
      </Suspense>
      <SiteFooter className="mt-24" />
    </>
  );
}
