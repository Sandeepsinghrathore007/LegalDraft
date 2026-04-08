export type PlanId = "free" | "pro" | "starter";

export type PaidPlanId = Exclude<PlanId, "free">;

export type PlanDefinition = {
  ctaLabel: string;
  description: string;
  downloadLimit: number | null;
  id: PlanId;
  monthlyPriceInr: number;
  name: string;
  summary: string;
};

export const planDefinitions: readonly PlanDefinition[] = [
  {
    ctaLabel: "Start Free",
    description: "Best for first-time users who need one completed document.",
    downloadLimit: 1,
    id: "free",
    monthlyPriceInr: 0,
    name: "Free",
    summary: "1 document download"
  },
  {
    ctaLabel: "Choose Starter",
    description: "For active users who need reliable monthly drafting volume.",
    downloadLimit: 10,
    id: "starter",
    monthlyPriceInr: 199,
    name: "Starter",
    summary: "Up to 10 downloads/month"
  },
  {
    ctaLabel: "Choose Pro",
    description: "For teams and power users who need unrestricted throughput.",
    downloadLimit: null,
    id: "pro",
    monthlyPriceInr: 399,
    name: "Pro",
    summary: "Unlimited downloads"
  }
] as const;

export const planById = planDefinitions.reduce<Record<PlanId, PlanDefinition>>((plans, plan) => {
  plans[plan.id] = plan;
  return plans;
}, {} as Record<PlanId, PlanDefinition>);

export function formatPlanPrice(planId: PlanId) {
  const plan = planById[planId];

  if (plan.monthlyPriceInr === 0) {
    return "₹0";
  }

  return `₹${plan.monthlyPriceInr}/month`;
}

export function getDownloadLimit(planId: PlanId) {
  return planById[planId].downloadLimit;
}

export function getRemainingDownloads(planId: PlanId, downloadsUsed: number) {
  const limit = getDownloadLimit(planId);

  if (limit === null) {
    return null;
  }

  return Math.max(limit - downloadsUsed, 0);
}

export function hasReachedDownloadLimit(planId: PlanId, downloadsUsed: number) {
  const remainingDownloads = getRemainingDownloads(planId, downloadsUsed);

  if (remainingDownloads === null) {
    return false;
  }

  return remainingDownloads <= 0;
}
