import { siteConfig } from "@/lib/config";

export function getApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.apiBaseUrl}${normalizedPath}`;
}
