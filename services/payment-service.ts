import { getDownloadLimit, planById, type PaidPlanId } from "@/features/pricing/plans";
import { createReference } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { simulateApiRequest } from "@/services/simulated-api";

type PaymentRequest = {
  plan: PaidPlanId;
  shouldFail?: boolean;
};

export type PaymentResult = {
  amountInr: number;
  paidAt: string;
  plan: PaidPlanId;
  planLimit: number | null;
  transactionId: string;
};

export async function processPayment({ plan, shouldFail = false }: PaymentRequest): Promise<PaymentResult> {
  const planDetails = planById[plan];
  const forceFailure = siteConfig.featureFlags.forcePaymentFailure;
  const resolvedFailure = forceFailure || shouldFail;

  return simulateApiRequest(
    () => ({
      amountInr: planDetails.monthlyPriceInr,
      paidAt: new Date().toISOString(),
      plan,
      planLimit: getDownloadLimit(plan),
      transactionId: createReference("PAY")
    }),
    {
      delayMs: 1600,
      errorMessage: "Payment authorization failed. Please retry or use another method.",
      shouldFail: resolvedFailure
    }
  );
}
