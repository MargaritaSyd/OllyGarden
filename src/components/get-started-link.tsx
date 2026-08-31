import Link from "next/link";
import type { ReactNode } from "react";

type GetStartedLinkProps = {
  href?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
};

const variants = {
  primary:
    "bg-mist text-forest hover:bg-sunflower motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]",
  secondary:
    "border border-mist/50 bg-mist/12 text-mist hover:bg-mist/22 motion-safe:hover:scale-[1.03]",
} as const;

export function GetStartedLink({
  href = "/get-started",
  children = "Get Started",
  variant = "primary",
  fullWidth = false,
  className = "",
  "aria-label": ariaLabel,
}: GetStartedLinkProps) {
  const classes = `group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl px-[30px] text-base font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
    fullWidth ? "w-full max-w-none" : "w-full max-w-[340px] sm:w-auto"
  } ${variants[variant]} ${className}`;

  // Native anchors scroll to in-page hashes; Next Link often swallows them.
  if (href.startsWith("#") || href.startsWith("mailto:") || href.includes("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
