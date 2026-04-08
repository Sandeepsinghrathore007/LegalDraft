"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function RootError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root route error", error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <EmptyState
        action={
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
        }
        description="An unexpected error occurred while loading this page."
        icon="error"
        title="Something went wrong"
      />
    </main>
  );
}
