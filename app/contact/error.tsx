"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function ContactError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <EmptyState
        action={
          <Button onClick={reset} size="lg">
            Retry Contact Page
          </Button>
        }
        description="The contact experience failed to load."
        icon="support_agent"
        title="Contact page unavailable"
      />
    </main>
  );
}
