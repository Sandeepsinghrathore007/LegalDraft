"use client";

import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useToast } from "@/components/providers/toast-provider";
import { useAuth } from "@/features/auth/auth-context";
import { sleep } from "@/lib/utils";

type AuthQuickAccessProps = {
  mode: "login" | "signup";
  returnTo: string;
};

export function AuthQuickAccess({ mode, returnTo }: AuthQuickAccessProps) {
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const { logIn, signUp } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  const isBusy = isGooglePending;

  const modeCopy = useMemo(() => {
    if (mode === "signup") {
      return {
        googleLabel: "Continue with Google",
        successTitle: "Google authentication successful"
      };
    }

    return {
      googleLabel: "Sign in with Google",
      successTitle: "Google authentication successful"
    };
  }, [mode]);

  const completeAuth = (identity: { email: string; fullName: string }) => {
    if (mode === "signup") {
      signUp(identity);
    } else {
      logIn(identity);
    }

    startTransition(() => {
      router.push(returnTo);
    });
  };

  const handleGoogle = async () => {
    setGoogleError(null);
    setIsGooglePending(true);

    await sleep(850);

    try {
      completeAuth({
        email: "google.user@legaldraft.app",
        fullName: "Google User"
      });

      pushToast({
        description: "Google sign-in is running in demo mode with simulated authentication.",
        title: modeCopy.successTitle,
        tone: "success"
      });
    } catch {
      setGoogleError("Google sign-in is unavailable right now. Please use email or phone number above.");
      setIsGooglePending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="h-px w-full bg-outline-variant/60" />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-container-lowest px-3 text-xs font-semibold uppercase tracking-[0.16em] text-outline">
          Or continue with
        </p>
      </div>

      <Button
        disabled={isBusy}
        fullWidth
        icon={<MaterialIcon icon="account_circle" />}
        onClick={handleGoogle}
        size="lg"
        variant="surface"
      >
        {isGooglePending ? "Connecting to Google..." : modeCopy.googleLabel}
      </Button>

      {googleError ? <p className="text-sm text-error">{googleError}</p> : null}
      <p className="text-center text-xs text-on-surface-variant">
        Use the field above to continue with your email or phone number.
      </p>
    </div>
  );
}
