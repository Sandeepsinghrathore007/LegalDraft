import Link from "next/link";

type SiteFooterProps = {
  bordered?: boolean;
  className?: string;
  variant?: "default" | "payment";
};

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/refund-policy", label: "Refund Policy" }
] as const;

export function SiteFooter({
  bordered = false,
  className = "",
  variant = "default"
}: SiteFooterProps) {
  if (variant === "payment") {
    return (
      <footer className={`relative z-10 mt-auto bg-slate-50 dark:bg-slate-950 ${className}`.trim()}>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-4 py-12 md:flex-row md:px-8">
          <div className="mb-4 text-lg font-bold text-[#002045] dark:text-white md:mb-0">LegalDraft</div>
          <div className="mb-6 flex flex-wrap justify-center gap-4 md:mb-0 md:justify-start md:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                className="Inter text-sm font-normal text-slate-500 transition-colors hover:text-[#002045] dark:text-slate-400 dark:hover:text-white"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="Inter text-sm font-normal text-slate-500 dark:text-slate-400">
            © 2024 LegalDraft Digital Notary. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`bg-slate-50 dark:bg-slate-950 ${bordered ? "border-t border-outline-variant/10" : ""} ${className}`.trim()}
      id="contact"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-4 py-12 md:flex-row md:px-8">
        <div className="mb-8 md:mb-0">
          <div className="mb-2 text-lg font-bold text-[#002045] dark:text-white">LegalDraft</div>
          <p className="Inter text-sm font-normal text-slate-500 dark:text-slate-400">
            © 2024 LegalDraft Digital Notary. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              className="Inter text-sm font-normal text-slate-500 opacity-80 transition-opacity duration-200 hover:text-[#002045] hover:opacity-100 dark:text-slate-400 dark:hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
