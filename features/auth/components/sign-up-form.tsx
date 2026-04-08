"use client";

import Link from "next/link";
import { startTransition, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { saveStoredAccount } from "@/features/auth/account-storage";
import { AuthQuickAccess } from "@/features/auth/components/auth-quick-access";
import { useAuth } from "@/features/auth/auth-context";
import type { SignUpFormValues } from "@/features/auth/utils";
import { buildSignUpPayload, validateSignUpForm } from "@/features/auth/utils";
import { sleep } from "@/lib/utils";

const initialSignUpValues: SignUpFormValues = {
  confirmPassword: "",
  email: "",
  fullName: "",
  password: ""
};

function buildLoginHref(returnTo: string, reason: string | null) {
  const query = new URLSearchParams({
    returnTo
  });

  if (reason) {
    query.set("reason", reason);
  }

  return `/login?${query.toString()}`;
}

function getReasonAlert(reason: string | null) {
  if (reason === "download_required") {
    return {
      description: "Create a free account to unlock your first document download.",
      title: "Sign up to download your document"
    };
  }

  if (reason === "upgrade_required") {
    return {
      description: "Create your account first, then choose Starter or Pro to increase your limit.",
      title: "Create account to upgrade"
    };
  }

  return null;
}

export function SignUpForm() {
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormValues, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<SignUpFormValues>(initialSignUpValues);
  const { signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams?.get("reason") ?? null;
  const returnTo = searchParams?.get("returnTo") ?? "/agreement-generator";
  const reasonAlert = getReasonAlert(reason);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateSignUpForm(values);
    setErrors(validationErrors);
    setFormError(null);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    await sleep(800);

    try {
      const payload = buildSignUpPayload(values);

      saveStoredAccount({
        createdAt: new Date().toISOString(),
        email: payload.email,
        fullName: payload.fullName,
        password: values.password
      });

      signUp(payload);

      startTransition(() => {
        router.push(returnTo);
      });
    } catch {
      setFormError("We couldn't complete sign-up right now. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="space-y-6 p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          Create Account
        </h1>
        <p className="text-sm text-on-surface-variant md:text-base">
          Set up your free LegalDraft account in under a minute.
        </p>
      </div>

      {reasonAlert ? <Alert description={reasonAlert.description} title={reasonAlert.title} tone="info" /> : null}

      {formError ? (
        <Alert
          description={formError}
          title="Unable to create account"
          tone="error"
        />
      ) : null}

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <FormField error={errors.fullName} htmlFor="signup-full-name" label="Full Name" required>
          <Input
            autoComplete="name"
            hasError={Boolean(errors.fullName)}
            id="signup-full-name"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                fullName: event.target.value
              }));
            }}
            placeholder="Your legal full name"
            value={values.fullName}
          />
        </FormField>

        <FormField error={errors.email} htmlFor="signup-email" label="Email or Phone Number" required>
          <Input
            autoComplete="username"
            hasError={Boolean(errors.email)}
            id="signup-email"
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

        <FormField error={errors.password} htmlFor="signup-password" label="Password" required>
          <Input
            autoComplete="new-password"
            hasError={Boolean(errors.password)}
            id="signup-password"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                password: event.target.value
              }));
            }}
            placeholder="At least 8 characters"
            type="password"
            value={values.password}
          />
        </FormField>

        <FormField
          error={errors.confirmPassword}
          htmlFor="signup-confirm-password"
          label="Confirm Password"
          required
        >
          <Input
            autoComplete="new-password"
            hasError={Boolean(errors.confirmPassword)}
            id="signup-confirm-password"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                confirmPassword: event.target.value
              }));
            }}
            placeholder="Re-enter your password"
            type="password"
            value={values.confirmPassword}
          />
        </FormField>

        <Button disabled={isSubmitting} fullWidth size="lg" type="submit">
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <AuthQuickAccess mode="signup" returnTo={returnTo} />

      <p className="text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link className="font-semibold text-primary hover:underline" href={buildLoginHref(returnTo, reason)}>
          Log In
        </Link>
      </p>
    </Card>
  );
}
