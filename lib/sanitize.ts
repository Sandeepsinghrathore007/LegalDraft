const TAG_CHARACTERS = /[<>]/g;

export function sanitizeInlineText(value: string, maxLength = 120) {
  return value
    .replace(TAG_CHARACTERS, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, maxLength);
}

export function sanitizeName(value: string) {
  return value
    .replace(TAG_CHARACTERS, "")
    .replace(/[^a-zA-Z\s'.-]/g, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, 80);
}

export function sanitizeAddress(value: string) {
  return value
    .replace(TAG_CHARACTERS, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trimStart()
    .slice(0, 280);
}

export function sanitizeParagraph(value: string, maxLength = 500) {
  return value
    .replace(TAG_CHARACTERS, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trimStart()
    .slice(0, maxLength);
}

export function sanitizeCurrencyInput(value: string) {
  const sanitized = value
    .replace(/[^\d.]/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\..*?)\..*/g, "$1");

  const [whole = "", decimal = ""] = sanitized.split(".");

  if (!sanitized.includes(".")) {
    return whole.slice(0, 7);
  }

  return `${whole.slice(0, 7)}.${decimal.slice(0, 2)}`;
}

export function sanitizeIntegerInput(
  value: string,
  options: {
    max?: number;
    min?: number;
  } = {}
) {
  const numericValue = value.replace(/[^\d]/g, "");

  if (!numericValue) {
    return "";
  }

  const parsedValue = Number(numericValue);
  const min = options.min ?? parsedValue;
  const max = options.max ?? parsedValue;
  const clampedValue = Math.min(Math.max(parsedValue, min), max);

  return String(clampedValue);
}
