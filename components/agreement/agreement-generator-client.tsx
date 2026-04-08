"use client";

import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";

type AgreementFormState = {
  additionalTerms: string;
  duration: string;
  landlordName: string;
  monthlyRent: string;
  propertyAddress: string;
  securityDeposit: string;
  startDate: string;
  tenantName: string;
};

const initialFormState: AgreementFormState = {
  additionalTerms: "",
  duration: "12",
  landlordName: "",
  monthlyRent: "",
  propertyAddress: "",
  securityDeposit: "",
  startDate: "",
  tenantName: ""
};

function displayValue(value: string, placeholder: string) {
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : placeholder;
}

function formatDate(dateValue: string, placeholder: string) {
  if (!dateValue) {
    return placeholder;
  }

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatCurrency(amount: string, placeholder: string) {
  if (!amount) {
    return placeholder;
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return placeholder;
  }

  return `$${numericAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function calculateEndDate(startDate: string, duration: string) {
  if (!startDate || !duration) {
    return "[End Date]";
  }

  const date = new Date(`${startDate}T00:00:00`);
  date.setMonth(date.getMonth() + Number(duration));

  return formatDate(date.toISOString().slice(0, 10), "[End Date]");
}

export function AgreementGeneratorClient() {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange =
    (field: keyof AgreementFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
              1
            </div>
            <span className="font-headline font-bold text-primary">Form</span>
          </div>
          <div className="h-px w-12 bg-outline-variant" />
          <div className="flex items-center gap-3 opacity-40">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest font-bold text-on-surface-variant">
              2
            </div>
            <span className="font-headline font-bold">Preview</span>
          </div>
          <div className="h-px w-12 bg-outline-variant" />
          <div className="flex items-center gap-3 opacity-40">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest font-bold text-on-surface-variant">
              3
            </div>
            <span className="font-headline font-bold">Download</span>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <section className="space-y-8 lg:col-span-5">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
                Draft Your Agreement
              </h1>
              <p className="body-lg text-on-surface-variant">
                Fill in the details below to generate your legally binding document instantly.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-6 rounded-xl bg-surface-container-low p-6">
                <div className="flex items-center gap-2 text-primary">
                  <MaterialIcon icon="person" />
                  <h2 className="font-headline text-lg font-bold">Parties Involved</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Landlord Full Name
                    </label>
                    <input
                      className="w-full rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                      onChange={handleChange("landlordName")}
                      placeholder="e.g. Jonathan Sterling"
                      type="text"
                      value={formState.landlordName}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Tenant Full Name
                    </label>
                    <input
                      className="w-full rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                      onChange={handleChange("tenantName")}
                      placeholder="e.g. Sarah Mitchell"
                      type="text"
                      value={formState.tenantName}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6 rounded-xl bg-surface-container-low p-6">
                <div className="flex items-center gap-2 text-primary">
                  <MaterialIcon icon="home" />
                  <h2 className="font-headline text-lg font-bold">Property Details</h2>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Property Address
                  </label>
                  <textarea
                    className="w-full resize-none rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                    onChange={handleChange("propertyAddress")}
                    placeholder="Full legal address of the rental unit"
                    rows={3}
                    value={formState.propertyAddress}
                  />
                </div>
              </div>
              <div className="space-y-6 rounded-xl bg-surface-container-low p-6">
                <div className="flex items-center gap-2 text-primary">
                  <MaterialIcon icon="payments" />
                  <h2 className="font-headline text-lg font-bold">Lease &amp; Financials</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Monthly Rent
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                      <input
                        className="w-full rounded-md border-none bg-surface-container-highest p-4 pl-8 transition-colors focus:bg-primary-fixed focus:ring-0"
                        onChange={handleChange("monthlyRent")}
                        placeholder="0.00"
                        type="number"
                        value={formState.monthlyRent}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Security Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                      <input
                        className="w-full rounded-md border-none bg-surface-container-highest p-4 pl-8 transition-colors focus:bg-primary-fixed focus:ring-0"
                        onChange={handleChange("securityDeposit")}
                        placeholder="0.00"
                        type="number"
                        value={formState.securityDeposit}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Duration (Months)
                    </label>
                    <input
                      className="w-full rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                      onChange={handleChange("duration")}
                      placeholder="12"
                      type="number"
                      value={formState.duration}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Start Date
                    </label>
                    <input
                      className="w-full rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                      onChange={handleChange("startDate")}
                      type="date"
                      value={formState.startDate}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
                <div className="flex items-center gap-2 text-primary">
                  <MaterialIcon icon="description" />
                  <h2 className="font-headline text-lg font-bold">Additional Terms</h2>
                </div>
                <textarea
                  className="w-full resize-none rounded-md border-none bg-surface-container-highest p-4 transition-colors focus:bg-primary-fixed focus:ring-0"
                  onChange={handleChange("additionalTerms")}
                  placeholder="Add specific rules (e.g., no pets, utility responsibilities...)"
                  rows={4}
                  value={formState.additionalTerms}
                />
              </div>
            </div>
          </section>
          <section className="sticky top-28 lg:col-span-7" id="document-preview">
            <div className="group relative">
              <div className="absolute -top-6 right-0 flex items-center gap-2 rounded-t-lg bg-primary px-3 py-1">
                <MaterialIcon className="text-sm text-on-primary" icon="visibility" />
                <span className="text-xs font-bold uppercase tracking-widest text-on-primary">
                  Live Document Preview
                </span>
              </div>
              <div className="watermark relative min-h-[800px] overflow-hidden rounded-xl border-t-8 border-primary bg-surface-container-lowest p-12 shadow-2xl md:p-16">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container-lowest/40 p-8 backdrop-blur-[2px]">
                  <div className="max-w-sm space-y-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 text-center shadow-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-fixed">
                      <MaterialIcon
                        className="text-3xl text-on-tertiary-fixed-variant"
                        fill
                        icon="lock"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline text-xl font-extrabold text-primary">
                        Premium Document
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        Unlock the full legal text, removal of watermarks, and high-resolution PDF
                        exports.
                      </p>
                    </div>
                    <Link
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:bg-primary-container"
                      href="/pricing"
                    >
                      Upgrade to Premium
                      <MaterialIcon className="text-sm" icon="arrow_forward" />
                    </Link>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                      Starting at $9.99 per document
                    </p>
                  </div>
                </div>
                <div className="blur-legal space-y-12">
                  <div className="space-y-4 text-center">
                    <h2 className="inline-block border-b-2 border-primary pb-4 font-headline text-2xl font-extrabold uppercase tracking-[0.2em]">
                      Residential Lease Agreement
                    </h2>
                    <p className="text-sm font-medium">
                      This Residential Lease Agreement (the &quot;Agreement&quot;) is made and entered
                      into on this ____ day of ________, 20__.
                    </p>
                  </div>
                  <div className="space-y-8 text-justify text-sm leading-relaxed">
                    <div className="space-y-4">
                      <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                        1. Parties
                      </h3>
                      <p>
                        Between <strong>{displayValue(formState.landlordName, "[Landlord Name]")}</strong>,
                        hereinafter referred to as the &quot;Landlord,&quot; and{" "}
                        <strong>{displayValue(formState.tenantName, "[Tenant Name]")}</strong>,
                        hereinafter referred to as the &quot;Tenant.&quot;
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                        2. Property
                      </h3>
                      <p>
                        The Landlord hereby leases to the Tenant the following premises located at{" "}
                        <strong>{displayValue(formState.propertyAddress, "[Property Address]")}</strong>.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                        3. Term
                      </h3>
                      <p>
                        The lease term shall begin on{" "}
                        <strong>{formatDate(formState.startDate, "[Start Date]")}</strong> and shall
                        continue for a duration of{" "}
                        <strong>{displayValue(formState.duration, "[Duration]")}</strong> months,
                        ending on <strong>{calculateEndDate(formState.startDate, formState.duration)}</strong>.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                        4. Rent &amp; Security Deposit
                      </h3>
                      <p>
                        Tenant agrees to pay a monthly rent of{" "}
                        <strong>{formatCurrency(formState.monthlyRent, "$[Monthly Rent]")}</strong> due
                        on the first day of each month. A security deposit of{" "}
                        <strong>{formatCurrency(formState.securityDeposit, "$[Security Deposit]")}</strong>{" "}
                        shall be held by the Landlord for the duration of the lease.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-headline font-bold uppercase tracking-wider text-primary">
                        5. Terms &amp; Conditions
                      </h3>
                      <p>
                        The Tenant agrees to maintain the property in a clean and habitable condition.{" "}
                        <strong>{displayValue(formState.additionalTerms, "[Additional Terms]")}</strong>{" "}
                        shall apply as part of this binding agreement.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-16 pt-16">
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
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant bg-surface/80 p-4 backdrop-blur-md md:hidden">
        <a
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-on-primary"
          href="#document-preview"
        >
          Continue to Preview
          <MaterialIcon icon="arrow_forward" />
        </a>
      </div>
    </>
  );
}
