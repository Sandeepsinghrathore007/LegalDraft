import { ButtonLink } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import type { AgreementFormValues } from "@/features/agreement/types";
import { getAgreementPreviewModel, hasAgreementPreviewContent } from "@/features/agreement/utils";
import { cn } from "@/lib/utils";

type AgreementDocumentPreviewProps = {
  values: AgreementFormValues;
};

export function AgreementDocumentPreview({ values }: AgreementDocumentPreviewProps) {
  const preview = getAgreementPreviewModel(values);
  const hasPreviewContent = hasAgreementPreviewContent(values);

  return (
    <div className="group relative">
      <div className="absolute -top-6 right-0 flex items-center gap-2 rounded-t-lg bg-primary px-3 py-1">
        <MaterialIcon className="text-sm text-on-primary" icon="visibility" />
        <span className="text-xs font-bold uppercase tracking-widest text-on-primary">
          Live Document Preview
        </span>
      </div>
      <div className="watermark relative min-h-[760px] overflow-hidden rounded-xl border-t-8 border-primary bg-surface-container-lowest p-6 shadow-2xl md:p-12">
        {!hasPreviewContent ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container-lowest/80 p-8 backdrop-blur-[2px]">
            <div className="max-w-sm space-y-5 rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-8 text-center shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <MaterialIcon className="text-3xl" fill icon="edit_document" />
              </div>
              <div className="space-y-2">
                <h2 className="font-headline text-2xl font-extrabold text-primary">
                  Your preview will appear here
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Add the landlord, tenant, address, and lease details to unlock the document preview
                  before generation.
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className={cn("space-y-12", !hasPreviewContent && "blur-legal")}>
          <div className="space-y-4 text-center">
            <h2 className="inline-block border-b-2 border-primary pb-4 font-headline text-2xl font-extrabold uppercase tracking-[0.2em]">
              Residential Lease Agreement
            </h2>
            <p className="text-sm font-medium">
              This Residential Lease Agreement is prepared for review before final generation and
              premium export.
            </p>
          </div>
          <div className="space-y-8 text-justify text-sm leading-relaxed">
            <section className="space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-wider text-primary">1. Parties</h3>
              <p>
                Between <strong>{preview.landlordName}</strong>, hereinafter referred to as the
                &quot;Landlord,&quot; and <strong>{preview.tenantName}</strong>, hereinafter referred to as
                the &quot;Tenant.&quot;
              </p>
            </section>
            <section className="space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-wider text-primary">2. Property</h3>
              <p>
                The Landlord hereby leases to the Tenant the following premises located at{" "}
                <strong>{preview.propertyAddress}</strong>.
              </p>
            </section>
            <section className="space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-wider text-primary">3. Term</h3>
              <p>
                The lease term shall begin on <strong>{preview.startDate}</strong> and shall continue
                for <strong> {preview.durationMonths} </strong> months, ending on{" "}
                <strong>{preview.endDate}</strong>.
              </p>
            </section>
            <section className="space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                4. Rent &amp; Security Deposit
              </h3>
              <p>
                Tenant agrees to pay a monthly rent of <strong>{preview.monthlyRent}</strong> due on
                the first day of each month. A security deposit of{" "}
                <strong>{preview.securityDeposit}</strong> shall be held by the Landlord for the
                duration of the lease.
              </p>
            </section>
            <section className="space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                5. Additional Terms
              </h3>
              <p>{preview.additionalTerms}</p>
            </section>
            <div className="grid grid-cols-1 gap-12 pt-16 md:grid-cols-2">
              <div className="space-y-8">
                <div className="signature-line h-12" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Landlord Signature
                </p>
              </div>
              <div className="space-y-8">
                <div className="signature-line h-12" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Tenant Signature
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-primary-fixed/40 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Premium Export
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                Remove watermarks, unlock polished PDF formatting, and receive instant delivery after
                checkout.
              </p>
            </div>
            <ButtonLink href="/pricing" size="sm">
              View Paid Plans
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
