import { z } from "zod";
import type { LoginPayload, SignUpPayload } from "@/features/auth/types";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
};

type LoginFieldName = keyof LoginFormValues;
type SignUpFieldName = keyof SignUpFormValues;

export type LoginFormErrors = Partial<Record<LoginFieldName, string>>;
export type SignUpFormErrors = Partial<Record<SignUpFieldName, string>>;

function normalizePhoneNumber(value: string) {
  const trimmedValue = value.trim();
  const hasLeadingPlus = trimmedValue.startsWith("+");
  const digits = trimmedValue.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  return hasLeadingPlus ? `+${digits}` : digits;
}

function isValidPhoneNumber(value: string) {
  const normalizedPhone = normalizePhoneNumber(value);
  const digitCount = normalizedPhone.replace(/\D/g, "").length;

  if (digitCount < 10 || digitCount > 15) {
    return false;
  }

  return /^\+?\d+$/.test(normalizedPhone);
}

function isValidEmail(value: string) {
  return z.string().email().safeParse(value.trim().toLowerCase()).success;
}

export function isValidAuthIdentifier(value: string) {
  return isValidEmail(value) || isValidPhoneNumber(value);
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email or phone number.")
    .refine(isValidAuthIdentifier, "Enter a valid email address or phone number."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password is too long.")
});

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(1, "Confirm your password."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email or phone number.")
      .refine(isValidAuthIdentifier, "Enter a valid email address or phone number."),
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(80, "Full name is too long."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password is too long.")
      .refine((value) => /[A-Za-z]/.test(value) && /\d/.test(value), {
        message: "Password must include at least one letter and one number."
      })
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

function mapZodErrors<TFieldName extends string>(
  issues: z.ZodIssue[]
) {
  return issues.reduce<Partial<Record<TFieldName, string>>>((errors, issue) => {
    const field = issue.path[0] as TFieldName;

    if (!errors[field]) {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
}

export function normalizeAuthEmail(value: string) {
  const trimmedValue = value.trim();

  if (isValidPhoneNumber(trimmedValue)) {
    return normalizePhoneNumber(trimmedValue);
  }

  return trimmedValue.toLowerCase();
}

export function sanitizeAuthName(value: string) {
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, 80);
}

export function validateLoginForm(values: LoginFormValues) {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    return {} as LoginFormErrors;
  }

  return mapZodErrors<LoginFieldName>(result.error.issues);
}

export function validateSignUpForm(values: SignUpFormValues) {
  const result = signUpSchema.safeParse(values);

  if (result.success) {
    return {} as SignUpFormErrors;
  }

  return mapZodErrors<SignUpFieldName>(result.error.issues);
}

export function buildLoginPayload(values: LoginFormValues): LoginPayload {
  return {
    email: normalizeAuthEmail(values.email)
  };
}

export function buildSignUpPayload(values: SignUpFormValues): SignUpPayload {
  return {
    email: normalizeAuthEmail(values.email),
    fullName: sanitizeAuthName(values.fullName).trim()
  };
}
