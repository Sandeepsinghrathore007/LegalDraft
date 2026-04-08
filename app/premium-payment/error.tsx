"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function PremiumPaymentError({
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
            Retry Payment
          </Button>
        }
        description="Payment services are temporarily unavailable. Please try again."
        icon="credit_card_off"
        title="Payment could not start"
      />
    </main>
  );
}
