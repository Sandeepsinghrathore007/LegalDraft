"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useAuth } from "@/features/auth/auth-context";
import { getDownloadLimit, getRemainingDownloads, planById } from "@/features/pricing/plans";

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
  variant?: "default" | "payment";
};

const navLinks = [
  {
    href: "/",
    label: "Home",
    match: "/"
  },
  {
    href: "/about",
    label: "About",
    match: "/about"
  },
  {
    href: "/contact",
    label: "Contact",
    match: "/contact"
  },
  {
    href: "/pricing",
    label: "Pricing",
    match: "/pricing"
  }
] as const;

export function SiteHeader({
  ctaHref = "/agreement-generator",
  ctaLabel = "Get Started",
  variant = "default"
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isHydrated, logOut, remainingDownloads, userState } = useAuth();
  const currentPlan = planById[userState.plan];
  const currentLimit = getDownloadLimit(userState.plan);
  const resolvedRemaining = getRemainingDownloads(userState.plan, userState.downloadsUsed);
  const canUpgrade = userState.plan !== "pro";

  return (
    <header
      className={`sticky top-0 z-50 bg-slate-50 dark:bg-slate-900 ${
        variant === "payment" ? "border-none" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          className="text-2xl font-bold tracking-tight text-[#002045] dark:text-white font-['Manrope']"
          href="/"
        >
          LegalDraft
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className={
                pathname === link.match
                  ? "Inter border-b-2 border-[#002045] pb-1 text-sm font-semibold text-[#002045] dark:text-white"
                  : "Inter text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-[#002045] dark:text-slate-400"
              }
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          {variant === "default" ? (
            <Link
              className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-on-primary transition-transform hover:bg-primary-container active:scale-95"
              href={ctaHref}
            >
              {ctaLabel}
            </Link>
          ) : null}
          {isHydrated ? (
            userState.isLoggedIn ? (
              <>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    userState.plan === "pro"
                      ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                      : "bg-primary-fixed text-primary"
                  }`}
                >
                  {currentPlan.name}
                </span>
                <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
                  {currentLimit === null ? "Unlimited downloads" : `${resolvedRemaining ?? remainingDownloads ?? 0}/${currentLimit} left`}
                </span>
                {canUpgrade ? (
                  <Link
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-on-primary transition-transform hover:bg-primary-container active:scale-95"
                    href="/pricing"
                  >
                    Upgrade
                  </Link>
                ) : null}
                <button
                  className="Inter text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-[#002045] dark:text-slate-400"
                  onClick={logOut}
                  type="button"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="Inter text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-[#002045] dark:text-slate-400"
                  href="/login"
                >
                  Log In
                </Link>
                <Link
                  className="rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-semibold text-[#002045] transition-colors duration-200 hover:bg-surface-container-highest dark:text-white"
                  href="/sign-up"
                >
                  Sign Up
                </Link>
              </>
            )
          ) : null}
        </nav>
        {variant === "payment" ? (
          <div className="flex items-center gap-4">
            <Link
              className="rounded-lg bg-primary px-6 py-2 font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-container"
              href={ctaHref}
            >
              {ctaLabel}
            </Link>
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="rounded-full p-2 text-[#002045] transition-all hover:bg-slate-200/50 dark:text-[#d6e3ff]"
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <MaterialIcon icon="menu" />
            </button>
          </div>
        ) : (
          <div className="flex items-center md:hidden">
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="rounded-full p-2 transition-colors hover:bg-slate-200/50"
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <MaterialIcon className="text-[#002045]" icon="menu" />
            </button>
          </div>
        )}
      </div>
      {isMenuOpen ? (
        <div className="border-t border-outline-variant/10 bg-slate-50 px-4 pb-6 pt-2 dark:bg-slate-900 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className={
                  pathname === link.match
                    ? "Inter border-b-2 border-[#002045] pb-1 text-sm font-semibold text-[#002045] dark:text-white"
                    : "Inter text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-[#002045] dark:text-slate-400"
                }
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-on-primary transition-transform hover:bg-primary-container active:scale-95"
              href={ctaHref}
              onClick={() => setIsMenuOpen(false)}
            >
              {ctaLabel}
            </Link>
            {isHydrated ? (
              userState.isLoggedIn ? (
                <>
                  <div
                    className={`rounded-lg px-4 py-2 text-center text-xs font-bold uppercase tracking-wide ${
                      userState.plan === "pro"
                        ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                        : "bg-primary-fixed text-primary"
                    }`}
                  >
                    {`${currentPlan.name} plan`}
                  </div>
                  <div className="rounded-lg bg-surface-container-high px-4 py-2 text-center text-xs font-semibold text-on-surface-variant">
                    {currentLimit === null ? "Unlimited downloads active" : `${resolvedRemaining ?? remainingDownloads ?? 0}/${currentLimit} downloads left`}
                  </div>
                  {canUpgrade ? (
                    <Link
                      className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-on-primary transition-transform hover:bg-primary-container active:scale-95"
                      href="/pricing"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Upgrade Plan
                    </Link>
                  ) : null}
                  <button
                    className="rounded-lg border border-outline-variant/20 px-6 py-3 text-center text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    type="button"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    className="rounded-lg border border-outline-variant/20 px-6 py-3 text-center text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-on-primary transition-transform hover:bg-primary-container active:scale-95"
                    href="/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
