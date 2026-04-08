import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: "The page you requested could not be found.",
  noIndex: true,
  path: "/not-found",
  title: "Page Not Found"
});

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader ctaHref="/agreement-generator" ctaLabel="Generate Document" />
      <main className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <EmptyState
          action={
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-all hover:bg-primary-container"
              href="/"
            >
              Return Home
            </Link>
          }
          description="The page may have been moved, deleted, or the URL may be incorrect."
          icon="search_off"
          title="Page not found"
        />
      </main>
      <SiteFooter bordered />
    </>
  );
}
