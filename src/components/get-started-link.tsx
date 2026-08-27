import Link from "next/link";
import type { ReactNode } from "react";

type GetStartedLinkProps = {
  href?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-mist text-forest hover:bg-sunflower",
  secondary: "border border-mist/50 bg-mist/12 text-mist hover:bg-mist/22",
} as const;

export function GetStartedLink({
  href = "/get-started",
  children = "Get Started",
  variant = "primary",
  fullWidth = false,
  className = "",
}: GetStartedLinkProps) {
  const classes = `group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl px-[30px] text-base font-semibold transition-colors ${
    fullWidth ? "w-full max-w-none" : "w-full max-w-[340px] sm:w-auto"
  } ${variants[variant]} ${className}`;

  // Native anchors scroll to in-page hashes; Next Link often swallows them.
  if (href.startsWith("#") || href.startsWith("mailto:") || href.includes("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
