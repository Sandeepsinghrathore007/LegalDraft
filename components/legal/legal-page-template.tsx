import { siteConfig } from "@/lib/config";

type LegalSection = {
  body: string[];
  heading: string;
};

type LegalPageTemplateProps = {
  description: string;
  eyebrow: string;
  sections: LegalSection[];
  title: string;
};

export function LegalPageTemplate({
  description,
  eyebrow,
  sections,
  title
}: LegalPageTemplateProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <div className="rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">{eyebrow}</p>
        <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">{description}</p>
        <p className="mt-4 text-sm text-outline">
          Questions about this policy? Email {siteConfig.supportEmail}.
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-headline text-2xl font-bold text-primary">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-on-surface-variant md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
