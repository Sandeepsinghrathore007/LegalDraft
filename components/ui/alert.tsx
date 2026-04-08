import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { cn } from "@/lib/utils";

type AlertTone = "error" | "info" | "success" | "warning";

type AlertProps = {
  action?: ReactNode;
  className?: string;
  description: string;
  title: string;
  tone?: AlertTone;
};

const toneClasses: Record<AlertTone, string> = {
  error: "border-error-container bg-error-container/70 text-on-error-container",
  info: "border-primary-fixed bg-primary-fixed/50 text-primary",
  success: "border-secondary-fixed bg-secondary-fixed/60 text-on-secondary-fixed-variant",
  warning: "border-tertiary-fixed bg-tertiary-fixed/60 text-on-tertiary-fixed-variant"
};

const toneIcons: Record<AlertTone, string> = {
  error: "error",
  info: "info",
  success: "check_circle",
  warning: "warning"
};

export function Alert({ action, className, description, title, tone = "info" }: AlertProps) {
  return (
    <div className={cn("rounded-2xl border p-4", toneClasses[tone], className)} role="status">
      <div className="flex items-start gap-3">
        <MaterialIcon className="mt-0.5 text-lg" fill={tone !== "info"} icon={toneIcons[tone]} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm opacity-90">{description}</p>
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}
