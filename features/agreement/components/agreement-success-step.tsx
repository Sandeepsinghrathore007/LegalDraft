"use client";

import { startTransition } from "react";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import type { AgreementGenerationResult } from "@/features/agreement/types";
import { formatDate } from "@/lib/utils";

type AgreementSuccessStepProps = {
  downloadActionLabel?: string;
  isDownloading?: boolean;
  onDownload: () => void;
  onStartOver: () => void;
  result: AgreementGenerationResult;
};

export function AgreementSuccessStep({
  downloadActionLabel = "Print or Save Watermarked Draft",
  isDownloading = false,
  onDownload,
  onStartOver,
  result
}: AgreementSuccessStepProps) {
  return (
    <section className="space-y-6" aria-labelledby="agreement-success-heading">
      <div className="space-y-2">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary" id="agreement-success-heading">
          Draft Ready
        </h1>
        <p className="text-base text-on-surface-variant">
          Your watermarked agreement is prepared. You can print the draft now or continue to premium
          checkout for the polished PDF version.
        </p>
      </div>

      <Alert
        description="The current draft is safe to review and print. Premium checkout removes the watermark and unlocks document delivery."
        title="Agreement generated successfully"
        tone="success"
      />

      <Card className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
            <MaterialIcon className="text-3xl" fill icon="check_circle" />
          </div>
          <div>
            <p className="font-headline text-2xl font-extrabold text-primary">{result.title}</p>
            <p className="text-sm text-on-surface-variant">Reference {result.agreementId}</p>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-semibold text-primary">Generated</p>
            <p>{formatDate(new Date(result.generatedAt))}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Delivery</p>
            <p>{result.watermark ? "Watermarked draft PDF" : "Final premium PDF"}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">API endpoint</p>
            <p className="break-all">{result.endpoint}</p>
          </div>
        </div>
        <ul className="space-y-3">
          {result.summary.map((item) => (
            <li className="flex items-start gap-3 text-sm text-on-surface-variant" key={item}>
              <MaterialIcon className="mt-0.5 text-primary" icon="check_circle" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3">
        <Button
          disabled={isDownloading}
          fullWidth
          icon={<MaterialIcon icon="download" />}
          onClick={onDownload}
          size="lg"
        >
          {downloadActionLabel}
        </Button>
        <ButtonLink
          fullWidth
          href="/pricing"
          iconTrailing={<MaterialIcon icon="arrow_forward" />}
          size="lg"
          variant="secondary"
        >
          View Paid Plans
        </ButtonLink>
        <Button
          fullWidth
          icon={<MaterialIcon icon="restart_alt" />}
          onClick={() => {
            startTransition(() => {
              onStartOver();
            });
          }}
          variant="surface"
        >
          Start a New Agreement
        </Button>
      </div>
    </section>
  );
}
