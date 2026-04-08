import { env } from "@/lib/env";

const normalizedSiteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export const siteConfig = {
  apiBaseUrl: (env.NEXT_PUBLIC_API_BASE_URL ?? `${normalizedSiteUrl}/api`).replace(/\/$/, ""),
  companyName: "LegalDraft Digital Notary",
  description:
    "Generate residential lease agreements, preview legal clauses, and upgrade to premium delivery in minutes.",
  featureFlags: {
    enablePaymentRetry: env.NEXT_PUBLIC_ENABLE_PAYMENT_RETRY,
    enableTestimonials: env.NEXT_PUBLIC_ENABLE_TESTIMONIALS,
    forcePaymentFailure: env.NEXT_PUBLIC_FORCE_PAYMENT_FAILURE
  },
  keywords: [
    "rent agreement generator",
    "lease agreement",
    "digital rental contract",
    "legal draft",
    "premium PDF agreement"
  ],
  name: "LegalDraft",
  siteUrl: normalizedSiteUrl,
  supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL
} as const;
