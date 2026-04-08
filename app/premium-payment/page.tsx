import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "Complete secure checkout to activate Starter or Pro subscription plans.",
  path: "/premium-payment",
  title: "Premium Payment"
});

const PremiumPaymentFlow = dynamic(
  () => import("@/features/payment/components/premium-payment-flow").then((module) => module.PremiumPaymentFlow),
  {
    ssr: false
  }
);

export default function PremiumPaymentPage() {
  return (
    <>
      <SiteHeader ctaHref="/pricing" ctaLabel="View Plans" variant="payment" />
      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="h-12 w-72 animate-pulse rounded-xl bg-surface-container-highest" />
          </main>
        }
      >
        <PremiumPaymentFlow />
      </Suspense>
      <SiteFooter bordered />
    </>
  );
}
