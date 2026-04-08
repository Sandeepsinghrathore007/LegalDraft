import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardTone = "default" | "muted" | "primary";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone;
};

const toneClassNames: Record<CardTone, string> = {
  default: "bg-surface-container-lowest border border-outline-variant/10 shadow-sm",
  muted: "bg-surface-container-low border border-outline-variant/10",
  primary: "bg-primary-container text-on-primary shadow-xl"
};

export function Card({ children, className, tone = "default", ...properties }: CardProps) {
  return (
    <div className={cn("rounded-3xl", toneClassNames[tone], className)} {...properties}>
      {children}
    </div>
  );
}
