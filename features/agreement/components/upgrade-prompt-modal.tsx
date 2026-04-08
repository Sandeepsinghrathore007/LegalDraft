import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import { formatPlanPrice, planById, type PaidPlanId, type PlanId } from "@/features/pricing/plans";

type UpgradePromptModalProps = {
  currentPlan: PlanId;
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onUpgrade: (plan: PaidPlanId) => void;
};

const paidPlans: readonly PaidPlanId[] = [
  "starter",
  "pro"
] as const;

export function UpgradePromptModal({
  currentPlan,
  isOpen,
  isUpdating,
  onClose,
  onUpgrade
}: UpgradePromptModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label="Close upgrade modal"
        className="absolute inset-0 bg-primary/20 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />
      <div className="editorial-shadow relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface-container-lowest">
        <div className="h-2 w-full bg-primary" />
        <div className="space-y-6 p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Plan limit reached</p>
              <h3 className="mt-2 font-headline text-2xl font-extrabold text-primary">Upgrade to Continue</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                You&apos;ve reached your current plan limit. Choose a higher plan to unlock more downloads.
              </p>
            </div>
            <button
              aria-label="Close upgrade modal"
              className="rounded-full p-1 text-outline transition-colors hover:bg-surface-container-high hover:text-primary"
              onClick={onClose}
              type="button"
            >
              <MaterialIcon icon="close" />
            </button>
          </div>

          <div className="space-y-3">
            {paidPlans.map((planId) => {
              const plan = planById[planId];
              const isCurrent = currentPlan === planId;

              return (
                <div
                  className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4"
                  key={plan.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-headline text-lg font-bold text-primary">{plan.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-on-surface-variant">
                        {formatPlanPrice(plan.id)}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                      {plan.summary}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-on-surface-variant">{plan.description}</p>
                  <div className="mt-3">
                    <Button
                      disabled={isUpdating || isCurrent}
                      fullWidth
                      onClick={() => onUpgrade(planId)}
                      size="sm"
                      variant={planId === "pro" ? "primary" : "secondary"}
                    >
                      {isCurrent ? "Current Plan" : `Choose ${plan.name}`}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button disabled={isUpdating} fullWidth onClick={onClose} size="lg" variant="surface">
              Close
            </Button>
            <Link
              className="inline-flex min-h-14 items-center justify-center rounded-lg bg-primary px-6 py-4 text-center text-base font-semibold text-on-primary transition-all duration-200 hover:bg-primary-container"
              href="/pricing"
              onClick={onClose}
            >
              Full Plan Comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
