export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function sleep(durationMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export function formatCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
  } = {}
) {
  const { currency = "USD", locale = "en-US" } = options;

  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency"
  }).format(amount);
}

export function formatDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
) {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function createReference(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function toTitleCase(value: string) {
  return value.replace(/\w\S*/g, (segment) => {
    return `${segment.charAt(0).toUpperCase()}${segment.slice(1).toLowerCase()}`;
  });
}
