"use client";

import Link from "next/link";
import { startTransition, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { getStoredAccount } from "@/features/auth/account-storage";
import { AuthQuickAccess } from "@/features/auth/components/auth-quick-access";
import { useAuth } from "@/features/auth/auth-context";
import type { LoginFormValues } from "@/features/auth/utils";
import { normalizeAuthEmail, validateLoginForm } from "@/features/auth/utils";
import { sleep } from "@/lib/utils";

const initialLoginValues: LoginFormValues = {
  email: "",
  password: ""
};

function buildSignUpHref(returnTo: string, reason: string | null) {
  const query = new URLSearchParams({
    returnTo
  });

  if (reason) {
    query.set("reason", reason);
  }

  return `/sign-up?${query.toString()}`;
}

function getReasonAlert(reason: string | null) {
  if (reason === "download_required") {
    return {
      description: "Sign in to continue and download your generated document.",
      title: "Your document is ready"
    };
  }

  if (reason === "upgrade_required") {
    return {
      description: "Sign in to upgrade your plan and unlock higher download limits.",
      title: "Authentication required for upgrade"
    };
  }

  return null;
}

export function LoginForm() {
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<LoginFormValues>(initialLoginValues);
  const { logIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams?.get("reason") ?? null;
  const returnTo = searchParams?.get("returnTo") ?? "/agreement-generator";
  const reasonAlert = getReasonAlert(reason);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    setFormError(null);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    await sleep(700);

    const storedAccount = getStoredAccount();
    const normalizedEmail = normalizeAuthEmail(values.email);

    if (!storedAccount) {
      setFormError("No account found on this browser. Create a new account to continue.");
      setIsSubmitting(false);
      return;
    }

    if (normalizedEmail !== normalizeAuthEmail(storedAccount.email) || values.password !== storedAccount.password) {
      setFormError("Invalid email/phone number or password. Check your credentials and try again.");
      setIsSubmitting(false);
      return;
    }

    logIn({
      email: storedAccount.email,
      fullName: storedAccount.fullName
    });

    startTransition(() => {
      router.push(returnTo);
    });
  };

  return (
    <Card className="space-y-6 p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          Log In
        </h1>
        <p className="text-sm text-on-surface-variant md:text-base">
          Access your saved drafts and continue your download flow.
        </p>
      </div>

      {reasonAlert ? <Alert description={reasonAlert.description} title={reasonAlert.title} tone="info" /> : null}

      {formError ? (
        <Alert
          description={formError}
          title="Unable to sign in"
          tone="error"
        />
      ) : null}

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <FormField error={errors.email} htmlFor="login-email" label="Email or Phone Number" required>
          <Input
            autoComplete="username"
            hasError={Boolean(errors.email)}
            id="login-email"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                email: event.target.value
              }));
            }}
            placeholder="you@example.com or +91 98765 43210"
            type="text"
            value={values.email}
          />
        </FormField>

        <FormField error={errors.password} htmlFor="login-password" label="Password" required>
          <Input
            autoComplete="current-password"
            hasError={Boolean(errors.password)}
            id="login-password"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                password: event.target.value
              }));
            }}
            placeholder="Enter your password"
            type="password"
            value={values.password}
          />
        </FormField>

        <Button disabled={isSubmitting} fullWidth size="lg" type="submit">
          {isSubmitting ? "Signing In..." : "Log In"}
        </Button>
      </form>

      <AuthQuickAccess mode="login" returnTo={returnTo} />

      <p className="text-center text-sm text-on-surface-variant">
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold text-primary hover:underline"
          href={buildSignUpHref(returnTo, reason)}
        >
          Sign Up
        </Link>
      </p>
    </Card>
  );
}
