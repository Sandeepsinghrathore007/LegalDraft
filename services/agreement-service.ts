import type { AgreementGenerationResult, AgreementFormValues } from "@/features/agreement/types";
import { getAgreementChecklist } from "@/features/agreement/utils";
import { createReference } from "@/lib/utils";
import { getApiUrl } from "@/services/api-client";
import { simulateApiRequest } from "@/services/simulated-api";

export async function generateAgreementDraft(
  values: AgreementFormValues
): Promise<AgreementGenerationResult> {
  const summary = getAgreementChecklist(values);

  return simulateApiRequest(
    () => ({
      agreementId: createReference("AGR"),
      downloadUrl: getApiUrl("/agreements/download"),
      endpoint: getApiUrl("/agreements/generate"),
      generatedAt: new Date().toISOString(),
      summary,
      title: "Residential Lease Agreement",
      watermark: true
    }),
    {
      delayMs: 1600
    }
  );
}
