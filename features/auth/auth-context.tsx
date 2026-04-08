"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AUTH_STATE_STORAGE_KEY } from "@/features/auth/constants";
import type { LoginPayload, SignUpPayload, UserState } from "@/features/auth/types";
import { getDownloadLimit, getRemainingDownloads, type PaidPlanId } from "@/features/pricing/plans";
import { normalizeAuthEmail } from "@/features/auth/utils";

type AuthContextValue = {
  downloadLimit: number | null;
  isHydrated: boolean;
  logIn: (payload: LoginPayload) => void;
  logOut: () => void;
  remainingDownloads: number | null;
  recordDownload: () => void;
  signUp: (payload: SignUpPayload) => void;
  upgradePlan: (plan: PaidPlanId) => void;
  userState: UserState;
};

const initialUserState: UserState = {
  downloadsUsed: 0,
  email: "",
  fullName: "",
  isLoggedIn: false,
  plan: "free"
};

const AuthContext = createContext<AuthContextValue | null>(null);

function sanitizeUserState(candidate: Partial<UserState>) {
  const downloadsUsed =
    typeof candidate.downloadsUsed === "number" && candidate.downloadsUsed > 0
      ? Math.floor(candidate.downloadsUsed)
      : 0;

  return {
    downloadsUsed,
    email: typeof candidate.email === "string" ? normalizeAuthEmail(candidate.email) : "",
    fullName: typeof candidate.fullName === "string" ? candidate.fullName : "",
    isLoggedIn: Boolean(candidate.isLoggedIn),
    plan: resolveStoredPlan(candidate)
  };
}

function resolveStoredPlan(candidate: Partial<UserState>) {
  if (candidate.plan === "free" || candidate.plan === "starter" || candidate.plan === "pro") {
    return candidate.plan;
  }

  const legacyCandidate = candidate as Partial<UserState & { isPremium?: boolean }>;

  if (legacyCandidate.isPremium) {
    return "pro";
  }

  return "free";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [userState, setUserState] = useState<UserState>(initialUserState);

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(AUTH_STATE_STORAGE_KEY);

      if (!rawValue) {
        setIsHydrated(true);
        return;
      }

      const parsedValue = JSON.parse(rawValue) as Partial<UserState>;
      setUserState(sanitizeUserState(parsedValue));
    } catch {
      setUserState(initialUserState);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(AUTH_STATE_STORAGE_KEY, JSON.stringify(userState));
  }, [isHydrated, userState]);

  const value = useMemo<AuthContextValue>(() => {
    const remainingDownloads = getRemainingDownloads(userState.plan, userState.downloadsUsed);
    const downloadLimit = getDownloadLimit(userState.plan);

    return {
      downloadLimit,
      isHydrated,
      logIn(payload) {
        setUserState((currentState) => ({
          ...currentState,
          email: normalizeAuthEmail(payload.email),
          fullName: payload.fullName ?? currentState.fullName,
          isLoggedIn: true
        }));
      },
      logOut() {
        setUserState((currentState) => ({
          ...currentState,
          isLoggedIn: false
        }));
      },
      remainingDownloads,
      recordDownload() {
        setUserState((currentState) => {
          const limit = getDownloadLimit(currentState.plan);

          if (!currentState.isLoggedIn || limit === null || currentState.downloadsUsed >= limit) {
            return currentState;
          }

          return {
            ...currentState,
            downloadsUsed: currentState.downloadsUsed + 1
          };
        });
      },
      signUp(payload) {
        setUserState({
          downloadsUsed: 0,
          email: normalizeAuthEmail(payload.email),
          fullName: payload.fullName,
          isLoggedIn: true,
          plan: "free"
        });
      },
      upgradePlan(plan: PaidPlanId) {
        setUserState((currentState) => ({
          ...currentState,
          downloadsUsed: 0,
          isLoggedIn: true,
          plan
        }));
      },
      userState
    };
  }, [isHydrated, userState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
