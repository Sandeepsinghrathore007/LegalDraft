"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import { Alert } from "@/components/ui/alert";
import { Stepper } from "@/components/ui/stepper";
import { useAuth } from "@/features/auth/auth-context";
import { UpgradePromptModal } from "@/features/agreement/components/upgrade-prompt-modal";
import { agreementSteps, initialAgreementFormValues } from "@/features/agreement/constants";
import { AgreementDocumentPreview } from "@/features/agreement/components/agreement-document-preview";
import { AgreementFormStep } from "@/features/agreement/components/agreement-form-step";
import { AgreementReviewStep } from "@/features/agreement/components/agreement-review-step";
import { AgreementSuccessStep } from "@/features/agreement/components/agreement-success-step";
import {
  clearPendingDownloadSnapshot,
  readPendingDownloadSnapshot,
  savePendingDownloadSnapshot
} from "@/features/agreement/storage";
import type {
  AgreementFieldErrors,
  AgreementFieldName,
  AgreementFormValues,
  AgreementGenerationResult,
  AgreementStep
} from "@/features/agreement/types";
import { sanitizeAgreementField, validateAgreementField, validateAgreementForm } from "@/features/agreement/utils";
import { useAsyncTask } from "@/hooks/use-async-task";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { sleep } from "@/lib/utils";
import {
  getDownloadLimit,
  getRemainingDownloads,
  hasReachedDownloadLimit,
  planById,
  type PaidPlanId
} from "@/features/pricing/plans";
import { generateAgreementDraft } from "@/services/agreement-service";

function getTouchedFields() {
  return {
    additionalTerms: true,
    durationMonths: true,
    landlordName: true,
    monthlyRent: true,
    propertyAddress: true,
    securityDeposit: true,
    startDate: true,
    tenantName: true
  } as const;
}

type DownloadFeedback = {
  description: string;
  title: string;
  tone: "error" | "info" | "success" | "warning";
};

const downloadRequiredRedirectPath = `/sign-up?reason=download_required&returnTo=${encodeURIComponent(
  "/agreement-generator?resumeDownload=1"
)}`;

export function AgreementGenerator() {
  const [downloadFeedback, setDownloadFeedback] = useState<DownloadFeedback | null>(null);
  const [errors, setErrors] = useState<AgreementFieldErrors>({});
  const [generatedResult, setGeneratedResult] = useState<AgreementGenerationResult | null>(null);
  const [isPreparingDownload, setIsPreparingDownload] = useState(false);
  const [isRoutingToCheckout, setIsRoutingToCheckout] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [step, setStep] = useState<AgreementStep>(1);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<AgreementFieldName, boolean>>>({});
  const [values, setValues] = useState<AgreementFormValues>(initialAgreementFormValues);

  const { isHydrated, recordDownload, userState } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deferredValues = useDeferredValue(values);
  const generationTask = useAsyncTask(generateAgreementDraft);
  const { isOffline } = useNetworkStatus();

  const currentResult = generatedResult ?? generationTask.data;
  const resumeDownload = searchParams?.get("resumeDownload") === "1";
  const activePlan = planById[userState.plan];
  const activeDownloadLimit = getDownloadLimit(userState.plan);
  const remainingDownloads = getRemainingDownloads(userState.plan, userState.downloadsUsed);

  useEffect(() => {
    if (!isHydrated || !resumeDownload) {
      return;
    }

    const pendingSnapshot = readPendingDownloadSnapshot();

    if (pendingSnapshot) {
      setValues(pendingSnapshot.values);
      setGeneratedResult(pendingSnapshot.generatedResult);
      setStep(3);
      setErrors({});
      setTouchedFields({});
      setDownloadFeedback({
        description: "Your generated draft was restored. Continue with Download to finish the flow.",
        title: "You are signed in and ready to download",
        tone: "success"
      });
      clearPendingDownloadSnapshot();
    } else {
      setDownloadFeedback({
        description: "Your session expired. Generate a new draft to continue.",
        title: "No pending draft found",
        tone: "warning"
      });
    }

    startTransition(() => {
      router.replace("/agreement-generator");
    });
  }, [isHydrated, resumeDownload, router]);

  const handleChange = (field: AgreementFieldName, value: string) => {
    const sanitizedValue = sanitizeAgreementField(field, value);

    setValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [field]: sanitizedValue
      };

      if (touchedFields[field]) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [field]: validateAgreementField(field, nextValues)
        }));
      }

      return nextValues;
    });
  };

  const handleBlur = (field: AgreementFieldName) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [field]: true
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateAgreementField(field, values)
    }));
  };

  const validateAndGoToPreview = () => {
    const nextErrors = validateAgreementForm(values);

    setTouchedFields(getTouchedFields());
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    generationTask.reset();
    setGeneratedResult(null);
    setDownloadFeedback(null);
    setIsUpgradeModalOpen(false);
    startTransition(() => {
      setStep(2);
    });
  };

  const handleGenerate = async () => {
    const nextErrors = validateAgreementForm(values);
    setErrors(nextErrors);
    setTouchedFields(getTouchedFields());

    if (Object.values(nextErrors).some(Boolean)) {
      startTransition(() => {
        setStep(1);
      });
      return;
    }

    const result = await generationTask.execute(values);

    if (result.ok) {
      setGeneratedResult(result.result);
      setDownloadFeedback(null);
      startTransition(() => {
        setStep(3);
      });
    }
  };

  const handleDownload = async () => {
    if (!currentResult || isPreparingDownload) {
      return;
    }

    if (!userState.isLoggedIn) {
      savePendingDownloadSnapshot({
        generatedResult: currentResult,
        values
      });

      startTransition(() => {
        router.push(downloadRequiredRedirectPath);
      });
      return;
    }

    if (hasReachedDownloadLimit(userState.plan, userState.downloadsUsed)) {
      setDownloadFeedback({
        description: `You reached the ${activePlan.name} plan limit. Upgrade to continue downloading.`,
        title: "Download limit reached",
        tone: "warning"
      });
      setIsUpgradeModalOpen(true);
      pushToast({
        description: "Choose Starter or Pro to unlock more downloads.",
        title: "Limit reached",
        tone: "warning"
      });
      return;
    }

    setIsPreparingDownload(true);
    setDownloadFeedback({
      description: "Your document is opening in print/export mode.",
      title: "Preparing download",
      tone: "info"
    });

    await sleep(700);
    window.print();
    recordDownload();

    const nextRemaining =
      activeDownloadLimit === null ? null : Math.max(activeDownloadLimit - (userState.downloadsUsed + 1), 0);
    const successDescription =
      nextRemaining === null
        ? "Your Pro plan includes unlimited monthly downloads."
        : `${nextRemaining} download${nextRemaining === 1 ? "" : "s"} remaining in your monthly ${activePlan.name} plan.`;

    setDownloadFeedback({
      description: successDescription,
      title: "Download completed",
      tone: "success"
    });
    pushToast({
      description: successDescription,
      title: "Document downloaded",
      tone: "success"
    });

    setIsPreparingDownload(false);
  };

  const policyAlert = useMemo<DownloadFeedback | null>(() => {
    if (!isHydrated) {
      return null;
    }

    if (!userState.isLoggedIn) {
      return {
        description: "You can generate drafts without login. Sign up is required only when you download.",
        title: "Guest mode active",
        tone: "info"
      };
    }

    if (activeDownloadLimit === null) {
      return {
        description: "Pro plan active with unlimited downloads.",
        title: "Pro access active",
        tone: "success"
      };
    }

    if ((remainingDownloads ?? 0) <= 0) {
      return {
        description: `You've reached your ${activePlan.name} plan limit. Upgrade to continue exporting documents.`,
        title: "Plan limit reached",
        tone: "warning"
      };
    }

    return {
      description: `${remainingDownloads ?? 0}/${activeDownloadLimit} downloads remaining on your ${activePlan.name} plan.`,
      title: `${activePlan.name} plan active`,
      tone: "info"
    };
  }, [activeDownloadLimit, activePlan.name, isHydrated, remainingDownloads, userState.isLoggedIn]);

  const downloadButtonLabel = useMemo(() => {
    if (isPreparingDownload) {
      return "Preparing Download...";
    }

    if (!isHydrated) {
      return "Download Document";
    }

    if (!userState.isLoggedIn) {
      return "Sign Up to Download";
    }

    if (activeDownloadLimit === null) {
      return "Download Document";
    }

    if ((remainingDownloads ?? 0) <= 0) {
      return "Upgrade Plan to Download";
    }

    return `Download Document (${remainingDownloads ?? 0} left)`;
  }, [activeDownloadLimit, isHydrated, isPreparingDownload, remainingDownloads, userState.isLoggedIn]);

  const handleUpgradeFromModal = async (planId: PaidPlanId) => {
    setIsRoutingToCheckout(true);
    setIsUpgradeModalOpen(false);

    startTransition(() => {
      router.push(`/premium-payment?plan=${planId}&source=download_gate&returnTo=/agreement-generator`);
    });
  };

  const leftPanel = useMemo(() => {
    if (step === 1) {
      return (
        <AgreementFormStep
          errors={errors}
          isOffline={isOffline}
          onBlur={handleBlur}
          onChange={handleChange}
          onContinue={validateAndGoToPreview}
          values={values}
        />
      );
    }

    if (step === 2) {
      return (
        <AgreementReviewStep
          error={generationTask.error}
          isGenerating={generationTask.isPending}
          isOffline={isOffline}
          onBack={() => {
            generationTask.reset();
            setGeneratedResult(null);
            setDownloadFeedback(null);
            setIsUpgradeModalOpen(false);
            startTransition(() => {
              setStep(1);
            });
          }}
          onGenerate={handleGenerate}
          values={values}
        />
      );
    }

    if (!currentResult) {
      return null;
    }

    return (
      <section className="space-y-6">
        {policyAlert ? (
          <Alert
            description={policyAlert.description}
            title={policyAlert.title}
            tone={policyAlert.tone}
          />
        ) : null}
        {downloadFeedback ? (
          <Alert
            description={downloadFeedback.description}
            title={downloadFeedback.title}
            tone={downloadFeedback.tone}
          />
        ) : null}
        <AgreementSuccessStep
          downloadActionLabel={downloadButtonLabel}
          isDownloading={isPreparingDownload}
          onDownload={handleDownload}
          onStartOver={() => {
            generationTask.reset();
            clearPendingDownloadSnapshot();
            setDownloadFeedback(null);
            setErrors({});
            setGeneratedResult(null);
            setTouchedFields({});
            setValues(initialAgreementFormValues);
            setStep(1);
          }}
          result={currentResult}
        />
      </section>
    );
  }, [
    currentResult,
    downloadButtonLabel,
    downloadFeedback,
    errors,
    generationTask,
    handleDownload,
    isOffline,
    isPreparingDownload,
    policyAlert,
    step,
    values
  ]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
        <div className="mb-12">
          <Stepper activeStep={step} steps={[...agreementSteps]} />
        </div>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <section className="space-y-8 lg:col-span-5">{leftPanel}</section>
          <section className="sticky top-28 lg:col-span-7" id="document-preview">
            <AgreementDocumentPreview values={deferredValues} />
          </section>
        </div>
      </main>
      {step === 1 ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant bg-surface/80 p-4 backdrop-blur-md md:hidden">
          <a
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-on-primary transition-colors hover:bg-primary-container"
            href="#document-preview"
          >
            Continue to Preview
            <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : null}
      <UpgradePromptModal
        currentPlan={userState.plan}
        isOpen={isUpgradeModalOpen}
        isUpdating={isRoutingToCheckout}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={handleUpgradeFromModal}
      />
    </>
  );
}
