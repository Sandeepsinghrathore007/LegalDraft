import { z } from "zod";

const booleanFlag = z
  .enum(["true", "false"])
  .optional()
  .default("false")
  .transform((value) => value === "true");

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_ENABLE_PAYMENT_RETRY: booleanFlag,
  NEXT_PUBLIC_ENABLE_TESTIMONIALS: booleanFlag,
  NEXT_PUBLIC_FORCE_PAYMENT_FAILURE: booleanFlag,
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z
    .string()
    .email()
    .optional()
    .default("support@legaldraft.co")
});

const parsedEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_ENABLE_PAYMENT_RETRY: process.env.NEXT_PUBLIC_ENABLE_PAYMENT_RETRY,
  NEXT_PUBLIC_ENABLE_TESTIMONIALS: process.env.NEXT_PUBLIC_ENABLE_TESTIMONIALS,
  NEXT_PUBLIC_FORCE_PAYMENT_FAILURE: process.env.NEXT_PUBLIC_FORCE_PAYMENT_FAILURE,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL
});

if (!parsedEnv.success) {
  console.error("Environment validation failed", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration.");
}

export const env = parsedEnv.data;
