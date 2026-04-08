import { AUTH_ACCOUNT_STORAGE_KEY } from "@/features/auth/constants";
import type { StoredAccount } from "@/features/auth/types";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getStoredAccount() {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_ACCOUNT_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<StoredAccount>;

    if (
      typeof parsedValue.email !== "string" ||
      typeof parsedValue.fullName !== "string" ||
      typeof parsedValue.password !== "string"
    ) {
      return null;
    }

    return {
      createdAt:
        typeof parsedValue.createdAt === "string" ? parsedValue.createdAt : new Date().toISOString(),
      email: parsedValue.email,
      fullName: parsedValue.fullName,
      password: parsedValue.password
    };
  } catch {
    return null;
  }
}

export function saveStoredAccount(account: StoredAccount) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_ACCOUNT_STORAGE_KEY, JSON.stringify(account));
}
