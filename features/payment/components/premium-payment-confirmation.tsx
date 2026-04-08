"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { formatPlanPrice, planById, type PaidPlanId } from "@/features/pricing/plans";

function resolvePlan(value: string | null): PaidPlanId {
  return value === "pro" ? "pro" : "starter";
}

export function PremiumPaymentConfirmation() {
  const searchParams = useSearchParams();
  const plan = resolvePlan(searchParams?.get("plan") ?? null);
  const transactionId = searchParams?.get("tx") ?? "Pending";
  const planDetails = planById[plan];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Card className="mx-auto max-w-3xl space-y-6 p-8 md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed-variant">
          <MaterialIcon className="text-3xl" fill icon="check_circle" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="font-headline text-3xl font-extrabold text-primary md:text-4xl">
            Payment Confirmed
          </h1>
          <p className="text-sm text-on-surface-variant md:text-base">
            Your {planDetails.name} subscription is active at {formatPlanPrice(plan)}.
          </p>
        </div>
        <div className="rounded-2xl bg-surface-container-low p-5 text-sm text-on-surface-variant">
          <p className="font-semibold text-primary">Transaction ID</p>
          <p className="break-all">{transactionId}</p>
          <p className="mt-3 font-semibold text-primary">Plan</p>
          <p>{planDetails.name}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-all hover:bg-primary-container"
            href="/agreement-generator"
          >
            Continue to Generator
          </Link>
          <Link
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface transition-all hover:bg-surface-container-highest"
            href="/pricing"
          >
            View Plans
          </Link>
        </div>
      </Card>
    </main>
  );
}
