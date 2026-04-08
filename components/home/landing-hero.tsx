import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 md:px-8 md:pb-32 md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold tracking-wider text-on-primary-fixed-variant">
            <MaterialIcon className="text-sm" fill icon="verified" />
            LEGALLY VALID IN ALL STATES
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl">
            Create Rent <br /> Agreement in <span className="text-on-primary-container">Minutes</span>
          </h1>
          <p className="max-w-xl text-lg font-medium leading-relaxed text-on-surface-variant md:text-xl">
            Say goodbye to complex legal jargon and expensive notary visits. Draft your professional
            rental contract digitally with verified clauses.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-10 py-4 text-lg font-bold text-on-primary shadow-lg transition-all hover:shadow-primary/20 active:scale-95"
              href="/agreement-generator"
            >
              Generate Now
              <MaterialIcon icon="arrow_forward" />
            </Link>
            <Link
              className="flex items-center justify-center gap-2 rounded-lg bg-surface-container-high px-10 py-4 text-lg font-bold text-on-surface transition-all hover:bg-surface-container-highest"
              href="/agreement-generator#document-preview"
            >
              View Sample
            </Link>
          </div>
        </div>
        <div className="group relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary-fixed to-secondary-fixed blur-2xl opacity-20 transition-opacity group-hover:opacity-30" />
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-lowest shadow-2xl md:aspect-square">
            <Image
              alt="Legal document on a desk"
              className="h-full w-full object-cover opacity-90"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/assets/legal-document-hero.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
