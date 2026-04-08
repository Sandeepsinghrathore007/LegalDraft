"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/providers/toast-provider";
import { AuthProvider } from "@/features/auth/auth-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
