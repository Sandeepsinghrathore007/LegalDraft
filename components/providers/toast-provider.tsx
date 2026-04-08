"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { cn } from "@/lib/utils";

type ToastTone = "error" | "info" | "success" | "warning";

type ToastInput = {
  description: string;
  durationMs?: number;
  title: string;
  tone?: ToastTone;
};

type ToastItem = ToastInput & {
  id: number;
  tone: ToastTone;
};

type ToastContextValue = {
  pushToast: (toast: ToastInput) => void;
};

const toneClasses: Record<ToastTone, string> = {
  error: "border-error-container bg-error-container/90 text-on-error-container",
  info: "border-primary-fixed bg-primary-fixed/90 text-primary",
  success: "border-secondary-fixed bg-secondary-fixed/90 text-on-secondary-fixed-variant",
  warning: "border-tertiary-fixed bg-tertiary-fixed/90 text-on-tertiary-fixed-variant"
};

const toneIcons: Record<ToastTone, string> = {
  error: "error",
  info: "info",
  success: "check_circle",
  warning: "warning"
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ description, durationMs = 3200, title, tone = "info" }: ToastInput) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);

      setToasts((current) => [...current, { description, id, title, tone }]);

      window.setTimeout(() => {
        removeToast(id);
      }, durationMs);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      pushToast
    }),
    [pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-[90] flex flex-col gap-3 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm">
        {toasts.map((toast) => (
          <div
            className={cn(
              "pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm transition-all",
              toneClasses[toast.tone]
            )}
            key={toast.id}
            role="status"
          >
            <div className="flex items-start gap-3">
              <MaterialIcon className="mt-0.5 text-lg" fill={toast.tone !== "info"} icon={toneIcons[toast.tone]} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                <p className="mt-0.5 text-xs opacity-90">{toast.description}</p>
              </div>
              <button
                aria-label="Dismiss notification"
                className="rounded-full p-0.5 opacity-80 transition hover:bg-black/5 hover:opacity-100"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                <MaterialIcon className="text-sm" icon="close" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
