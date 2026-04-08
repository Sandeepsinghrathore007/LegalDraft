import { createReference } from "@/lib/utils";
import { simulateApiRequest } from "@/services/simulated-api";

type ContactSubmissionInput = {
  email: string;
  message: string;
  name: string;
};

export async function submitContactRequest(payload: ContactSubmissionInput) {
  return simulateApiRequest(
    () => ({
      receivedAt: new Date().toISOString(),
      reference: createReference("SUP"),
      requestSummary: `${payload.name} (${payload.email})`
    }),
    {
      delayMs: 1400
    }
  );
}
