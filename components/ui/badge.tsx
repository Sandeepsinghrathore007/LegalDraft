import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "primary" | "success" | "warning";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClassNames: Record<BadgeTone, string> = {
  primary: "bg-primary-fixed text-on-primary-fixed-variant",
  success: "bg-secondary-fixed text-on-secondary-fixed-variant",
  warning: "bg-tertiary-fixed text-on-tertiary-fixed-variant"
};

export function Badge({ children, className, tone = "primary", ...properties }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        toneClassNames[tone],
        className
      )}
      {...properties}
    >
      {children}
    </span>
  );
}
