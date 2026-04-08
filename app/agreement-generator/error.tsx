"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function AgreementGeneratorError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
      <EmptyState
        action={
          <Button onClick={reset} size="lg">
            Reload Generator
          </Button>
        }
        description="The generator could not be loaded right now. Please try again."
        icon="description"
        title="Generator unavailable"
      />
    </main>
  );
}
