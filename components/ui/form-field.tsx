import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

export function FormField({
  children,
  error,
  hint,
  htmlFor,
  label,
  required = false
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant" htmlFor={htmlFor}>
        {label}
        {required ? <span className="ml-1 text-error">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className={cn("text-sm text-error")} id={`${htmlFor}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-outline" id={`${htmlFor}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
