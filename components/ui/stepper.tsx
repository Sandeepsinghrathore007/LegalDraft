import { cn } from "@/lib/utils";

type Step = {
  description?: string;
  label: string;
};

type StepperProps = {
  activeStep: number;
  steps: Step[];
};

export function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <ol aria-label="Progress" className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isComplete = stepNumber < activeStep;

        return (
          <li className="flex items-center gap-3" key={step.label}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors duration-200",
                  isActive && "bg-primary text-on-primary",
                  isComplete && "bg-primary-fixed text-primary",
                  !isActive && !isComplete && "bg-surface-container-highest text-on-surface-variant"
                )}
              >
                {stepNumber}
              </div>
              <div>
                <p
                  className={cn(
                    "font-headline text-sm font-bold",
                    isActive || isComplete ? "text-primary" : "text-on-surface-variant"
                  )}
                >
                  {step.label}
                </p>
                {step.description ? (
                  <p className="hidden text-xs text-outline sm:block">{step.description}</p>
                ) : null}
              </div>
            </div>
            {index < steps.length - 1 ? <div className="h-px w-8 bg-outline-variant/70 md:w-12" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
