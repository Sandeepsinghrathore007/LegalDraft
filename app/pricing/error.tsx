"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function PricingError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <EmptyState
        action={
          <Button onClick={reset} size="lg">
            Retry Pricing
          </Button>
        }
        description="We couldn't load pricing details right now."
        icon="payments"
        title="Pricing temporarily unavailable"
      />
    </main>
  );
}
