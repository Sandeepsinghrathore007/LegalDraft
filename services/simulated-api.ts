import { sleep } from "@/lib/utils";
import { ApiError, NetworkUnavailableError } from "@/services/api-errors";

type SimulatedApiOptions = {
  delayMs?: number;
  errorMessage?: string;
  shouldFail?: boolean;
};

function isOffline() {
  return typeof navigator !== "undefined" && !navigator.onLine;
}

export async function simulateApiRequest<TResult>(
  createResult: () => TResult,
  options: SimulatedApiOptions = {}
) {
  if (isOffline()) {
    throw new NetworkUnavailableError();
  }

  await sleep(options.delayMs ?? 1200);

  if (options.shouldFail) {
    throw new ApiError(options.errorMessage ?? "The request could not be completed.", {
      code: "REQUEST_FAILED",
      status: 500
    });
  }

  return createResult();
}
