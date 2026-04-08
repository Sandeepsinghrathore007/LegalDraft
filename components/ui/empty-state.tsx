import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  action?: ReactNode;
  description: string;
  icon: string;
  title: string;
};

export function EmptyState({ action, description, icon, title }: EmptyStateProps) {
  return (
    <Card className="p-8 text-center" tone="muted">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
        <MaterialIcon className="text-2xl" fill icon={icon} />
      </div>
      <h2 className="mt-5 font-headline text-2xl font-extrabold text-primary">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-on-surface-variant">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
