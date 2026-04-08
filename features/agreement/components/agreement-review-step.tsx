import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Skeleton } from "@/components/ui/skeleton";
import type { AgreementFormValues } from "@/features/agreement/types";
import { getAgreementChecklist } from "@/features/agreement/utils";

type AgreementReviewStepProps = {
  error: string | null;
  isGenerating: boolean;
  isOffline: boolean;
  onBack: () => void;
  onGenerate: () => void;
  values: AgreementFormValues;
};

export function AgreementReviewStep({
  error,
  isGenerating,
  isOffline,
  onBack,
  onGenerate,
  values
}: AgreementReviewStepProps) {
  const checklist = getAgreementChecklist(values);

  return (
    <section className="space-y-6" aria-labelledby="agreement-review-heading">
      <div className="space-y-2">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary" id="agreement-review-heading">
          Review Before You Generate
        </h1>
        <p className="text-base text-on-surface-variant">
          Everything below will be used for the generated draft. This is the last step to catch missing
          dates, money values, or spelling.
        </p>
      </div>

      {isOffline ? (
        <Alert
          description="Reconnect to continue. Generation is temporarily unavailable while your device is offline."
          title="Generation paused"
          tone="warning"
        />
      ) : null}

      {error ? (
        <Alert
          description={error}
          title="We couldn't generate your agreement yet"
          tone="error"
        />
      ) : null}

      <Card className="space-y-5 p-6" tone="muted">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="fact_check" />
          <h2 className="font-headline text-lg font-bold">Generation Checklist</h2>
        </div>
        <ul className="space-y-4">
          {checklist.map((item) => (
            <li className="flex items-start gap-3 text-sm text-on-surface-variant" key={item}>
              <MaterialIcon className="mt-0.5 text-primary" fill icon="check_circle" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="inventory_2" />
          <h2 className="font-headline text-lg font-bold">What you get next</h2>
        </div>
        <ul className="space-y-4 text-sm text-on-surface-variant">
          <li className="flex items-start gap-3">
            <MaterialIcon className="mt-0.5 text-primary" icon="description" />
            <span>A sanitized, watermarked draft with your lease information locked in.</span>
          </li>
          <li className="flex items-start gap-3">
            <MaterialIcon className="mt-0.5 text-primary" icon="download" />
            <span>A printable version for review and signatures.</span>
          </li>
          <li className="flex items-start gap-3">
            <MaterialIcon className="mt-0.5 text-primary" icon="workspace_premium" />
            <span>A direct path to premium checkout if you want the polished export immediately.</span>
          </li>
        </ul>
      </Card>

      {isGenerating ? (
        <Card className="space-y-4 p-6" tone="muted">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-fixed-dim border-t-primary" />
            <div>
              <p className="font-semibold text-primary">Generating your draft</p>
              <p className="text-sm text-on-surface-variant">
                We&apos;re preparing the agreement structure and document summary now.
              </p>
            </div>
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </Card>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button fullWidth icon={<MaterialIcon icon="arrow_back" />} onClick={onBack} size="lg" variant="surface">
          Edit Details
        </Button>
        <Button
          disabled={isGenerating || isOffline}
          fullWidth
          iconTrailing={<MaterialIcon icon="arrow_forward" />}
          onClick={onGenerate}
          size="lg"
        >
          {isGenerating ? "Generating Draft..." : "Generate Draft"}
        </Button>
      </div>
    </section>
  );
}
