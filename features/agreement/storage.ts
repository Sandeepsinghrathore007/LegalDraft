import type { AgreementFormValues, AgreementGenerationResult } from "@/features/agreement/types";

export const PENDING_DOWNLOAD_STORAGE_KEY = "legaldraft:pending-download";

type PendingDownloadSnapshot = {
  generatedResult: AgreementGenerationResult;
  values: AgreementFormValues;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function clearPendingDownloadSnapshot() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(PENDING_DOWNLOAD_STORAGE_KEY);
}

export function readPendingDownloadSnapshot() {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(PENDING_DOWNLOAD_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<PendingDownloadSnapshot>;

    if (!parsedValue.generatedResult || !parsedValue.values) {
      return null;
    }

    return parsedValue as PendingDownloadSnapshot;
  } catch {
    return null;
  }
}

export function savePendingDownloadSnapshot(snapshot: PendingDownloadSnapshot) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(PENDING_DOWNLOAD_STORAGE_KEY, JSON.stringify(snapshot));
}
