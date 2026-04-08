import { z } from "zod";
import { sanitizeInlineText, sanitizeParagraph } from "@/lib/sanitize";

export type ContactFormValues = {
  email: string;
  message: string;
  name: string;
};

export type ContactFieldName = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

const contactSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Describe your request in at least 20 characters.")
    .max(800, "Please keep your message within 800 characters."),
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Name is too long.")
});

function mapErrors(values: ContactFormValues) {
  const parsed = contactSchema.safeParse(values);

  if (parsed.success) {
    return {};
  }

  return parsed.error.issues.reduce<ContactFieldErrors>((errors, issue) => {
    const field = issue.path[0] as ContactFieldName;

    if (!errors[field]) {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
}

export function sanitizeContactField(field: ContactFieldName, value: string) {
  switch (field) {
    case "name":
      return sanitizeInlineText(value, 80);
    case "email":
      return sanitizeInlineText(value, 120);
    case "message":
      return sanitizeParagraph(value, 800);
    default:
      return value;
  }
}

export function validateContactForm(values: ContactFormValues) {
  return mapErrors(values);
}
