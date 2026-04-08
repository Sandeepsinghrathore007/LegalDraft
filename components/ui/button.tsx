import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "ghost" | "primary" | "secondary" | "surface";
type ButtonSize = "lg" | "md" | "sm";

type SharedButtonProps = {
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconTrailing?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SharedButtonProps;

type ButtonLinkProps = SharedButtonProps & {
  children: ReactNode;
  href: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60";

const sizeClasses: Record<ButtonSize, string> = {
  lg: "min-h-14 px-6 py-4 text-base",
  md: "min-h-11 px-5 py-3 text-sm",
  sm: "min-h-9 px-4 py-2 text-sm"
};

const variantClasses: Record<ButtonVariant, string> = {
  ghost: "bg-transparent text-primary hover:bg-primary-fixed/60",
  primary:
    "bg-primary text-on-primary shadow-lg shadow-primary/10 hover:-translate-y-0.5 hover:bg-primary-container",
  secondary: "bg-primary-container text-on-primary hover:bg-primary",
  surface:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/20"
};

function buttonClassName({
  className,
  fullWidth,
  size = "md",
  variant = "primary"
}: SharedButtonProps) {
  return cn(baseClasses, sizeClasses[size], variantClasses[variant], fullWidth && "w-full", className);
}

export function Button({
  children,
  className,
  fullWidth,
  icon,
  iconTrailing,
  size = "md",
  type = "button",
  variant = "primary",
  ...properties
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({
        className,
        fullWidth,
        size,
        variant
      })}
      type={type}
      {...properties}
    >
      {icon}
      <span>{children}</span>
      {iconTrailing}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  fullWidth,
  href,
  icon,
  iconTrailing,
  size = "md",
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClassName({
        className,
        fullWidth,
        size,
        variant
      })}
      href={href}
    >
      {icon}
      <span>{children}</span>
      {iconTrailing}
    </Link>
  );
}
