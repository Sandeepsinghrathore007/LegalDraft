"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useAuth } from "@/features/auth/auth-context";
import { formatPlanPrice, planById, type PaidPlanId } from "@/features/pricing/plans";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import { processPayment, type PaymentResult } from "@/services/payment-service";

type PaymentStage = "failure" | "processing" | "review" | "success";

function resolvePlan(value: string | null): PaidPlanId {
  return value === "pro" ? "pro" : "starter";
}

export function PremiumPaymentFlow() {
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [stage, setStage] = useState<PaymentStage>("review");
  const { upgradePlan, userState } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPlan = resolvePlan(searchParams?.get("plan") ?? null);
  const planDetails = planById[selectedPlan];
  const returnTo = searchParams?.get("returnTo") ?? "/agreement-generator";
  const source = searchParams?.get("source") ?? "pricing";

  const shouldSimulateFailure = useMemo(() => {
    return searchParams?.get("fail") === "1";
  }, [searchParams]);

  const startPayment = async () => {
    setStage("processing");
    setPaymentError(null);

    try {
      const result = await processPayment({
        plan: selectedPlan,
        shouldFail: shouldSimulateFailure
      });

      upgradePlan(selectedPlan);
      setPaymentResult(result);
      setStage("success");

      pushToast({
        description: `${planDetails.name} plan activated successfully.`,
        title: "Payment completed",
        tone: "success"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Payment failed. Please try again.";
      setPaymentError(message);
      setStage("failure");
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Secure Checkout</p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Upgrade to {planDetails.name}
          </h1>
          <p className="text-sm text-on-surface-variant md:text-base">
            Complete your subscription to unlock {planDetails.summary.toLowerCase()}.
          </p>

          <Card className="space-y-4 p-6" tone="muted">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-headline text-xl font-bold text-primary">{planDetails.name} Plan</p>
                <p className="text-sm text-on-surface-variant">{formatPlanPrice(selectedPlan)}</p>
              </div>
              <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                Source: {source}
              </span>
            </div>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
                <span>{planDetails.summary}</span>
              </li>
              <li className="flex items-start gap-2">
                <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
                <span>Plan upgrades apply immediately after successful payment.</span>
              </li>
              <li className="flex items-start gap-2">
                <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
                <span>Retry enabled: {siteConfig.featureFlags.enablePaymentRetry ? "Yes" : "No"}</span>
              </li>
            </ul>
          </Card>
        </section>

        <aside className="space-y-4 lg:col-span-5">
          {stage === "review" ? (
            <Card className="space-y-4 p-6">
              <h2 className="font-headline text-2xl font-extrabold text-primary">Ready to Pay</h2>
              <p className="text-sm text-on-surface-variant">
                Confirm this payment to activate your {planDetails.name} subscription.
              </p>
              <Button fullWidth onClick={startPayment} size="lg">
                Proceed to Payment
              </Button>
            </Card>
          ) : null}

          {stage === "processing" ? (
            <Card className="space-y-4 p-6" tone="muted">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-fixed-dim border-t-primary" />
                <div>
                  <p className="font-semibold text-primary">Processing Payment</p>
                  <p className="text-sm text-on-surface-variant">Please do not close this tab.</p>
                </div>
              </div>
            </Card>
          ) : null}

          {stage === "failure" ? (
            <Card className="space-y-4 p-6">
              <Alert
                description={paymentError ?? "Payment failed unexpectedly."}
                title="Payment Failed"
                tone="error"
              />
              <div className="flex flex-col gap-3">
                {siteConfig.featureFlags.enablePaymentRetry ? (
                  <Button fullWidth onClick={startPayment} size="lg">
                    Retry Payment
                  </Button>
                ) : (
                  <ButtonLink fullWidth href="/contact" size="lg" variant="surface">
                    Contact Support
                  </ButtonLink>
                )}
                <Button
                  fullWidth
                  onClick={() => {
                    startTransition(() => {
                      router.push("/pricing");
                    });
                  }}
                  size="lg"
                  variant="surface"
                >
                  Back to Pricing
                </Button>
              </div>
            </Card>
          ) : null}

          {stage === "success" && paymentResult ? (
            <Card className="space-y-4 p-6">
              <Alert
                description={`${planDetails.name} plan is now active on ${userState.email || "your account"}.`}
                title="Payment Successful"
                tone="success"
              />
              <div className="rounded-2xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
                <p className="font-semibold text-primary">Transaction</p>
                <p>{paymentResult.transactionId}</p>
                <p className="mt-2 font-semibold text-primary">Paid At</p>
                <p>{formatDate(new Date(paymentResult.paidAt), { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>
              </div>
              <div className="flex flex-col gap-3">
                <ButtonLink
                  fullWidth
                  href={`/premium-payment/confirmation?plan=${selectedPlan}&tx=${paymentResult.transactionId}`}
                  size="lg"
                >
                  View Confirmation
                </ButtonLink>
                <ButtonLink fullWidth href={returnTo} size="lg" variant="surface">
                  Return to Generator
                </ButtonLink>
              </div>
            </Card>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
