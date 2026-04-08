import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Payment confirmation for your LegalDraft subscription upgrade.",
  path: "/premium-payment/confirmation",
  title: "Payment Confirmation"
});

const PremiumPaymentConfirmation = dynamic(
  () =>
    import("@/features/payment/components/premium-payment-confirmation").then(
      (module) => module.PremiumPaymentConfirmation
    ),
  {
    ssr: false
  }
);

export default function PremiumPaymentConfirmationPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Back to Generator" />
      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto h-72 max-w-3xl animate-pulse rounded-3xl bg-surface-container-highest" />
          </main>
        }
      >
        <PremiumPaymentConfirmation />
      </Suspense>
      <SiteFooter bordered />
    </>
  );
}
