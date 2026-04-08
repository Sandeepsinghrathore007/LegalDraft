import { z } from "zod";
import { sanitizeAddress, sanitizeCurrencyInput, sanitizeIntegerInput, sanitizeName, sanitizeParagraph } from "@/lib/sanitize";
import { formatCurrency, formatDate } from "@/lib/utils";
import type {
  AgreementFieldErrors,
  AgreementFieldName,
  AgreementFormValues,
  AgreementPreviewModel
} from "@/features/agreement/types";

const agreementSchema = z.object({
  additionalTerms: z.string().max(500, "Keep additional terms within 500 characters."),
  durationMonths: z
    .string()
    .min(1, "Enter the lease duration.")
    .refine((value) => {
      const duration = Number(value);

      return Number.isInteger(duration) && duration >= 1 && duration <= 36;
    }, "Use a duration between 1 and 36 months."),
  landlordName: z
    .string()
    .min(2, "Enter the landlord's full legal name.")
    .max(80, "Landlord name is too long."),
  monthlyRent: z
    .string()
    .min(1, "Enter the monthly rent amount.")
    .refine((value) => Number(value) > 0, "Monthly rent must be greater than $0.")
    .refine((value) => Number(value) <= 1000000, "Monthly rent looks unusually high."),
  propertyAddress: z
    .string()
    .min(12, "Enter the full rental property address.")
    .max(280, "Property address is too long."),
  securityDeposit: z
    .string()
    .min(1, "Enter the security deposit amount.")
    .refine((value) => Number(value) >= 0, "Security deposit cannot be negative.")
    .refine((value) => Number(value) <= 1000000, "Security deposit looks unusually high."),
  startDate: z
    .string()
    .min(1, "Select a lease start date.")
    .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).valueOf()), "Use a valid start date."),
  tenantName: z
    .string()
    .min(2, "Enter the tenant's full legal name.")
    .max(80, "Tenant name is too long.")
});

function displayValue(value: string, placeholder: string) {
  const trimmedValue = value.trim();

  return trimmedValue ? trimmedValue : placeholder;
}

function mapAgreementErrors(values: AgreementFormValues) {
  const result = agreementSchema.safeParse(values);

  if (result.success) {
    return {};
  }

  return result.error.issues.reduce<AgreementFieldErrors>((errors, issue) => {
    const fieldName = issue.path[0] as AgreementFieldName;

    if (!errors[fieldName]) {
      errors[fieldName] = issue.message;
    }

    return errors;
  }, {});
}

export function sanitizeAgreementField(field: AgreementFieldName, value: string) {
  switch (field) {
    case "landlordName":
    case "tenantName":
      return sanitizeName(value);
    case "propertyAddress":
      return sanitizeAddress(value);
    case "additionalTerms":
      return sanitizeParagraph(value);
    case "monthlyRent":
    case "securityDeposit":
      return sanitizeCurrencyInput(value);
    case "durationMonths":
      return sanitizeIntegerInput(value, {
        max: 36,
        min: 1
      });
    case "startDate":
      return value;
    default:
      return value;
  }
}

export function validateAgreementForm(values: AgreementFormValues) {
  return mapAgreementErrors(values);
}

export function validateAgreementField(field: AgreementFieldName, values: AgreementFormValues) {
  return mapAgreementErrors(values)[field];
}

export function hasAgreementPreviewContent(values: AgreementFormValues) {
  return Boolean(
    values.landlordName.trim() ||
      values.tenantName.trim() ||
      values.propertyAddress.trim() ||
      values.monthlyRent.trim()
  );
}

export function calculateAgreementEndDate(startDate: string, durationMonths: string, placeholder = "[End Date]") {
  if (!startDate || !durationMonths) {
    return placeholder;
  }

  const parsedDuration = Number(durationMonths);

  if (Number.isNaN(parsedDuration)) {
    return placeholder;
  }

  const start = new Date(`${startDate}T00:00:00`);

  if (Number.isNaN(start.valueOf())) {
    return placeholder;
  }

  const dayOfMonth = start.getDate();
  const end = new Date(start);
  end.setDate(1);
  end.setMonth(end.getMonth() + parsedDuration);

  const lastDayOfTargetMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  end.setDate(Math.min(dayOfMonth, lastDayOfTargetMonth));

  return formatDate(end);
}

export function formatAgreementDate(dateValue: string, placeholder = "[Start Date]") {
  if (!dateValue) {
    return placeholder;
  }

  try {
    return formatDate(dateValue);
  } catch {
    return placeholder;
  }
}

export function formatAgreementCurrency(amount: string, placeholder = "$[Amount]") {
  if (!amount) {
    return placeholder;
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return placeholder;
  }

  return formatCurrency(numericAmount, {
    currency: "USD",
    locale: "en-US"
  });
}

export function getAgreementPreviewModel(values: AgreementFormValues): AgreementPreviewModel {
  return {
    additionalTerms: displayValue(
      values.additionalTerms,
      "No additional custom clauses were added to this draft."
    ),
    durationMonths: displayValue(values.durationMonths, "[Duration]"),
    endDate: calculateAgreementEndDate(values.startDate, values.durationMonths),
    landlordName: displayValue(values.landlordName, "[Landlord Name]"),
    monthlyRent: formatAgreementCurrency(values.monthlyRent, "$[Monthly Rent]"),
    propertyAddress: displayValue(values.propertyAddress, "[Property Address]"),
    securityDeposit: formatAgreementCurrency(values.securityDeposit, "$[Security Deposit]"),
    startDate: formatAgreementDate(values.startDate),
    tenantName: displayValue(values.tenantName, "[Tenant Name]")
  };
}

export function getAgreementChecklist(values: AgreementFormValues) {
  const preview = getAgreementPreviewModel(values);

  return [
    `${preview.landlordName} leasing to ${preview.tenantName}`,
    `${preview.durationMonths} month term beginning ${preview.startDate}`,
    `${preview.monthlyRent} monthly rent with ${preview.securityDeposit} security deposit`,
    `Property located at ${preview.propertyAddress}`
  ];
}
