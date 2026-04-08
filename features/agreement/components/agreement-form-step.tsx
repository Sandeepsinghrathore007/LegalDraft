import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Textarea } from "@/components/ui/textarea";
import { agreementFieldHints } from "@/features/agreement/constants";
import type { AgreementFieldErrors, AgreementFieldName, AgreementFormValues } from "@/features/agreement/types";

type AgreementFormStepProps = {
  errors: AgreementFieldErrors;
  isOffline: boolean;
  onBlur: (field: AgreementFieldName) => void;
  onChange: (field: AgreementFieldName, value: string) => void;
  onContinue: () => void;
  values: AgreementFormValues;
};

export function AgreementFormStep({
  errors,
  isOffline,
  onBlur,
  onChange,
  onContinue,
  values
}: AgreementFormStepProps) {
  return (
    <section className="space-y-6" aria-labelledby="agreement-generator-heading">
      <div className="space-y-2">
        <h1
          className="font-headline text-4xl font-extrabold tracking-tight text-primary"
          id="agreement-generator-heading"
        >
          Draft Your Agreement
        </h1>
        <p className="text-base text-on-surface-variant">
          Fill in the core lease details. We&apos;ll validate everything, then give you a full preview
          before generation.
        </p>
      </div>

      {isOffline ? (
        <Alert
          description="You can keep drafting offline, but generation and payment will stay disabled until your connection returns."
          title="You're currently offline"
          tone="warning"
        />
      ) : null}

      <Card className="space-y-6 p-6" tone="muted">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="person" />
          <h2 className="font-headline text-lg font-bold">Parties Involved</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            error={errors.landlordName}
            hint={agreementFieldHints.landlordName}
            htmlFor="landlordName"
            label="Landlord Full Name"
            required
          >
            <Input
              aria-describedby={errors.landlordName ? "landlordName-error" : "landlordName-hint"}
              aria-invalid={Boolean(errors.landlordName)}
              hasError={Boolean(errors.landlordName)}
              id="landlordName"
              onBlur={() => onBlur("landlordName")}
              onChange={(event) => onChange("landlordName", event.target.value)}
              placeholder="e.g. Jonathan Sterling"
              value={values.landlordName}
            />
          </FormField>
          <FormField
            error={errors.tenantName}
            hint={agreementFieldHints.tenantName}
            htmlFor="tenantName"
            label="Tenant Full Name"
            required
          >
            <Input
              aria-describedby={errors.tenantName ? "tenantName-error" : "tenantName-hint"}
              aria-invalid={Boolean(errors.tenantName)}
              hasError={Boolean(errors.tenantName)}
              id="tenantName"
              onBlur={() => onBlur("tenantName")}
              onChange={(event) => onChange("tenantName", event.target.value)}
              placeholder="e.g. Sarah Mitchell"
              value={values.tenantName}
            />
          </FormField>
        </div>
      </Card>

      <Card className="space-y-6 p-6" tone="muted">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="home" />
          <h2 className="font-headline text-lg font-bold">Property Details</h2>
        </div>
        <FormField
          error={errors.propertyAddress}
          hint={agreementFieldHints.propertyAddress}
          htmlFor="propertyAddress"
          label="Property Address"
          required
        >
          <Textarea
            aria-describedby={errors.propertyAddress ? "propertyAddress-error" : "propertyAddress-hint"}
            aria-invalid={Boolean(errors.propertyAddress)}
            hasError={Boolean(errors.propertyAddress)}
            id="propertyAddress"
            onBlur={() => onBlur("propertyAddress")}
            onChange={(event) => onChange("propertyAddress", event.target.value)}
            placeholder="Full legal address of the rental unit"
            rows={3}
            value={values.propertyAddress}
          />
        </FormField>
      </Card>

      <Card className="space-y-6 p-6" tone="muted">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="payments" />
          <h2 className="font-headline text-lg font-bold">Lease &amp; Financials</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            error={errors.monthlyRent}
            hint={agreementFieldHints.monthlyRent}
            htmlFor="monthlyRent"
            label="Monthly Rent"
            required
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
              <Input
                aria-describedby={errors.monthlyRent ? "monthlyRent-error" : "monthlyRent-hint"}
                aria-invalid={Boolean(errors.monthlyRent)}
                className="pl-8"
                hasError={Boolean(errors.monthlyRent)}
                id="monthlyRent"
                inputMode="decimal"
                onBlur={() => onBlur("monthlyRent")}
                onChange={(event) => onChange("monthlyRent", event.target.value)}
                placeholder="1250.00"
                value={values.monthlyRent}
              />
            </div>
          </FormField>
          <FormField
            error={errors.securityDeposit}
            hint={agreementFieldHints.securityDeposit}
            htmlFor="securityDeposit"
            label="Security Deposit"
            required
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
              <Input
                aria-describedby={errors.securityDeposit ? "securityDeposit-error" : "securityDeposit-hint"}
                aria-invalid={Boolean(errors.securityDeposit)}
                className="pl-8"
                hasError={Boolean(errors.securityDeposit)}
                id="securityDeposit"
                inputMode="decimal"
                onBlur={() => onBlur("securityDeposit")}
                onChange={(event) => onChange("securityDeposit", event.target.value)}
                placeholder="1250.00"
                value={values.securityDeposit}
              />
            </div>
          </FormField>
          <FormField
            error={errors.durationMonths}
            hint={agreementFieldHints.durationMonths}
            htmlFor="durationMonths"
            label="Duration (Months)"
            required
          >
            <Input
              aria-describedby={errors.durationMonths ? "durationMonths-error" : "durationMonths-hint"}
              aria-invalid={Boolean(errors.durationMonths)}
              hasError={Boolean(errors.durationMonths)}
              id="durationMonths"
              inputMode="numeric"
              onBlur={() => onBlur("durationMonths")}
              onChange={(event) => onChange("durationMonths", event.target.value)}
              placeholder="12"
              value={values.durationMonths}
            />
          </FormField>
          <FormField
            error={errors.startDate}
            hint={agreementFieldHints.startDate}
            htmlFor="startDate"
            label="Start Date"
            required
          >
            <Input
              aria-describedby={errors.startDate ? "startDate-error" : "startDate-hint"}
              aria-invalid={Boolean(errors.startDate)}
              hasError={Boolean(errors.startDate)}
              id="startDate"
              onBlur={() => onBlur("startDate")}
              onChange={(event) => onChange("startDate", event.target.value)}
              type="date"
              value={values.startDate}
            />
          </FormField>
        </div>
      </Card>

      <Card className="space-y-6 p-6" tone="muted">
        <div className="flex items-center gap-2 text-primary">
          <MaterialIcon icon="description" />
          <h2 className="font-headline text-lg font-bold">Additional Terms</h2>
        </div>
        <FormField
          error={errors.additionalTerms}
          hint={agreementFieldHints.additionalTerms}
          htmlFor="additionalTerms"
          label="Additional Terms"
        >
          <Textarea
            aria-describedby={errors.additionalTerms ? "additionalTerms-error" : "additionalTerms-hint"}
            aria-invalid={Boolean(errors.additionalTerms)}
            hasError={Boolean(errors.additionalTerms)}
            id="additionalTerms"
            onBlur={() => onBlur("additionalTerms")}
            onChange={(event) => onChange("additionalTerms", event.target.value)}
            placeholder="Add specific rules such as no pets, utility responsibilities, or parking details."
            rows={4}
            value={values.additionalTerms}
          />
        </FormField>
      </Card>

      <Card className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Secure Drafting</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Inputs are sanitized before rendering and reviewed again before generation.
          </p>
        </div>
        <Button iconTrailing={<MaterialIcon icon="arrow_forward" />} onClick={onContinue} size="lg">
          Continue to Preview
        </Button>
      </Card>
    </section>
  );
}
