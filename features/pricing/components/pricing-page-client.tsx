"use client";

import { startTransition, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/providers/toast-provider";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useAuth } from "@/features/auth/auth-context";
import {
  formatPlanPrice,
  getDownloadLimit,
  planById,
  planDefinitions,
  type PlanId
} from "@/features/pricing/plans";

const comparisonRows = [
  {
    feature: "Monthly Price",
    free: "₹0",
    pro: "₹399/month",
    starter: "₹199/month"
  },
  {
    feature: "Download Limit",
    free: "1 download",
    pro: "Unlimited",
    starter: "10 downloads"
  },
  {
    feature: "Live Document Preview",
    free: "Included",
    pro: "Included",
    starter: "Included"
  },
  {
    feature: "Priority Access",
    free: "No",
    pro: "Yes",
    starter: "Yes"
  }
] as const;

function buildSignUpHref(planId: PlanId) {
  return `/sign-up?reason=upgrade_required&returnTo=${encodeURIComponent(`/premium-payment?plan=${planId}&source=pricing`)}`;
}

export function PricingPageClient() {
  const [routingPlan, setRoutingPlan] = useState<PlanId | null>(null);
  const { downloadLimit, remainingDownloads, userState } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const intentPlanId = searchParams?.get("intent");
  const currentPlan = planById[userState.plan];

  const activeLimitLabel = useMemo(() => {
    if (downloadLimit === null) {
      return "Unlimited downloads active";
    }

    return `${remainingDownloads ?? 0}/${downloadLimit} downloads remaining this month`;
  }, [downloadLimit, remainingDownloads]);

  const handleChoosePlan = async (planId: PlanId) => {
    if (planId === "free") {
      pushToast({
        description: "Free plan gives 1 document download.",
        title: "Free plan selected",
        tone: "info"
      });
      return;
    }

    if (!userState.isLoggedIn) {
      startTransition(() => {
        router.push(buildSignUpHref(planId));
      });
      return;
    }

    if (userState.plan === planId) {
      pushToast({
        description: "This plan is already active for your account.",
        title: "No plan change needed",
        tone: "info"
      });
      return;
    }

    setRoutingPlan(planId);
    startTransition(() => {
      router.push(`/premium-payment?plan=${planId}&source=pricing`);
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <section className="space-y-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Pricing Plans</p>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Choose the Right Plan
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-on-surface-variant md:text-base">
          Upgrade only when you need more downloads. Plan prompts appear at download time, so drafting
          stays frictionless.
        </p>
      </section>

      <section className="mt-8">
        {userState.isLoggedIn ? (
          <Alert
            description={`${currentPlan.name} plan active. ${activeLimitLabel}.`}
            title="Current subscription status"
            tone={currentPlan.id === "pro" ? "success" : "info"}
          />
        ) : (
          <Alert
            description="You can generate documents without login. Sign up is required when you download or upgrade."
            title="Guest mode enabled"
            tone="info"
          />
        )}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {planDefinitions.map((plan) => {
          const isActive = userState.plan === plan.id && userState.isLoggedIn;
          const isIntent = intentPlanId === plan.id;
          const isBusy = routingPlan === plan.id;
          const shouldHighlight = plan.id === "pro";
          const planLimit = getDownloadLimit(plan.id);
          const limitText = planLimit === null ? "Unlimited downloads" : `${planLimit} downloads per month`;

          return (
            <Card
              className={`flex h-full flex-col p-7 text-left md:p-8 ${shouldHighlight ? "ring-2 ring-primary/15" : ""} ${isIntent ? "border-primary" : ""}`}
              key={plan.id}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-headline text-2xl font-extrabold text-primary">{plan.name}</p>
                  {isActive ? (
                    <span className="rounded-full bg-secondary-fixed px-3 py-1 text-xs font-semibold text-on-secondary-fixed-variant">
                      Active
                    </span>
                  ) : null}
                </div>
                <p className="text-lg font-bold text-primary">{formatPlanPrice(plan.id)}</p>
                <p className="text-xs font-semibold text-on-surface-variant">
                  {plan.summary}
                </p>
              </div>

              <p className="min-h-[72px] text-sm leading-6 text-on-surface-variant">{plan.description}</p>

              <ul className="space-y-2.5 text-sm leading-6 text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
                  <span>{limitText}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
                  <span>Live preview before download</span>
                </li>
              </ul>

              <div className="mt-auto pt-3">
                <Button
                  disabled={Boolean(routingPlan) || isActive}
                  fullWidth
                  onClick={() => handleChoosePlan(plan.id)}
                  size="lg"
                  variant={plan.id === "pro" ? "primary" : "secondary"}
                >
                  {isBusy ? "Opening Checkout..." : isActive ? "Current Plan" : plan.ctaLabel}
                </Button>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="mt-12 space-y-4">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Plan Comparison</h2>
          <p className="text-sm text-on-surface-variant">
            Compare limits and choose the plan that fits your monthly document volume.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-outline-variant/15 bg-surface-container-lowest">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container-low text-left">
                <th className="px-4 py-3 font-semibold text-primary">Feature</th>
                <th className="px-4 py-3 font-semibold text-primary">Free</th>
                <th className="px-4 py-3 font-semibold text-primary">Starter</th>
                <th className="px-4 py-3 font-semibold text-primary">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr className="border-t border-outline-variant/15" key={row.feature}>
                  <td className="px-4 py-3 font-medium text-on-surface">{row.feature}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{row.free}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{row.starter}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
