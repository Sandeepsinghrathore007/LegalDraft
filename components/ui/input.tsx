import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, hasError = false, ...properties },
  reference
) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-transparent bg-surface-container-highest px-4 py-3 text-sm text-on-surface transition-all duration-200 placeholder:text-outline focus:border-primary-fixed-dim focus:bg-primary-fixed/30 focus:outline-none focus:ring-2 focus:ring-primary-fixed",
        hasError && "border-error-container bg-error-container/50 text-on-error-container focus:ring-error-container",
        className
      )}
      ref={reference}
      {...properties}
    />
  );
});
