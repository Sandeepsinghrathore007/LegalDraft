"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-surface font-body text-on-surface">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-12 md:px-8">
          <div className="w-full rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-on-error-container">
              <MaterialIcon className="text-3xl" fill icon="error" />
            </div>
            <h1 className="mt-6 font-headline text-3xl font-extrabold text-primary">Critical Error</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-variant md:text-base">
              A global rendering issue occurred. Please retry or refresh the page.
            </p>
            <div className="mt-8">
              <Button onClick={reset} size="lg">
                Retry Application
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
