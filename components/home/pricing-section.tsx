import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";

type StandardFeature = {
  icon: string;
  text: string;
  tone: string;
  wrapperClassName?: string;
};

const standardFeatures: StandardFeature[] = [
  {
    icon: "check_circle",
    text: "Generate and preview full document",
    tone: "text-primary"
  },
  {
    icon: "check_circle",
    text: "1 document download included",
    tone: "text-primary"
  },
  {
    icon: "check_circle",
    text: "Upgrade shown only when limit is reached",
    tone: "text-primary"
  }
];

const premiumFeatures = [
  "Starter: ₹199/month for up to 10 downloads",
  "Pro: ₹399/month with unlimited downloads",
  "Instant in-app upgrade flow at download time",
  "Clear plan comparison and limit messaging"
] as const;

export function PricingSection() {
  return (
    <section className="bg-surface px-4 py-24 md:px-8 md:py-32" id="pricing">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl font-medium text-on-surface-variant">
            Start free and upgrade only when your download usage grows.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-3xl bg-surface-container-low p-10 text-center">
            <h3 className="mb-2 text-xl font-bold text-primary">Free</h3>
            <div className="mb-8 text-5xl font-extrabold tracking-tighter text-primary">₹0</div>
            <ul className="mb-10 w-full space-y-4 text-left">
              {standardFeatures.map((feature) => (
                <li
                  className={`flex items-center gap-3 text-on-surface-variant ${feature.wrapperClassName ?? ""}`.trim()}
                  key={feature.text}
                >
                  <MaterialIcon className={`${feature.tone} text-lg`.trim()} icon={feature.icon} />
                  {feature.text}
                </li>
              ))}
            </ul>
            <Link
              className="w-full rounded-xl bg-surface-container-high py-4 text-center font-bold text-on-surface transition-all hover:bg-surface-container-highest"
              href="/agreement-generator"
            >
              Start Free
            </Link>
          </div>
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-primary-container p-10 text-center shadow-2xl">
            <div className="absolute right-6 top-6">
              <span className="rounded-full bg-tertiary-fixed px-4 py-1.5 text-xs font-black uppercase tracking-widest text-on-tertiary-fixed shadow-lg">
                Most Popular
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-on-primary">Starter + Pro</h3>
            <div className="mb-2 text-5xl font-extrabold tracking-tighter text-on-primary">From ₹199</div>
            <p className="mb-8 text-sm font-medium text-on-primary-container">Monthly plans</p>
            <ul className="mb-10 w-full space-y-4 text-left">
              {premiumFeatures.map((feature) => (
                <li className="flex items-center gap-3 text-on-primary" key={feature}>
                  <MaterialIcon className="text-lg text-on-primary-container" fill icon="check_circle" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              className="w-full rounded-xl bg-primary py-4 text-center font-bold text-on-primary shadow-lg transition-all hover:-translate-y-1 hover:shadow-primary/40"
              href="/pricing"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
