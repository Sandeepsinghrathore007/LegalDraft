import type { AgreementFieldName, AgreementFormValues } from "@/features/agreement/types";

export const initialAgreementFormValues: AgreementFormValues = {
  additionalTerms: "",
  durationMonths: "12",
  landlordName: "",
  monthlyRent: "",
  propertyAddress: "",
  securityDeposit: "",
  startDate: "",
  tenantName: ""
};

export const agreementSteps = [
  {
    description: "Capture property details and parties.",
    label: "Details"
  },
  {
    description: "Review the live agreement preview.",
    label: "Preview"
  },
  {
    description: "Generate the draft and continue.",
    label: "Generate"
  }
] as const;

export const agreementFieldHints: Record<AgreementFieldName, string> = {
  additionalTerms: "Optional. Include utilities, guest limits, pet policies, or late-fee rules.",
  durationMonths: "Most residential leases range between 6 and 24 months.",
  landlordName: "Use the full legal name that appears on the property documents.",
  monthlyRent: "Enter the agreed recurring monthly amount before utilities.",
  propertyAddress: "Include the full street address, unit number, city, state, and ZIP code.",
  securityDeposit: "This can be $0 if no deposit is required.",
  startDate: "Choose the first day the tenant can legally take possession.",
  tenantName: "Use the tenant's legal full name for signing."
};
