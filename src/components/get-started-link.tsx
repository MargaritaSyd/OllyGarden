"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { AppRedirectLink } from "@/components/app-redirect-link";
import { captureCtaClick } from "@/lib/posthog";
import { siteConfig } from "@/lib/site";

type GetStartedLinkProps = {
  href?: string;
  children?: ReactNode;
  /** "inverse" is the forest button for light (mist) panels. */
  variant?: "primary" | "secondary" | "inverse";
  /** "lg" matches the 57px hero buttons in the Figma product pages. "og" matches the preview's 51px pills. */
  size?: "md" | "lg" | "og";
  /** "paper" is the white and glass pair used on the agent-skills closing band. */
  tone?: "default" | "paper";
  fullWidth?: boolean;
  className?: string;
  analytics?: { id: string; section: string };
  "aria-label"?: string;
};

const variants = {
  primary:
    "bg-mist text-forest motion-safe:hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]",
  secondary:
    "border border-mist/50 bg-white/20 text-mist hover:bg-white/30 motion-safe:hover:scale-[1.03]",
  inverse: "bg-forest text-mist hover:bg-olive motion-safe:hover:scale-[1.03]",
} as const;

const sizes = {
  md: "h-12 px-8 text-base font-medium tracking-[0.02em]",
  lg: "h-[57px] px-4 text-lg font-medium tracking-[0.02em]",
  og: "h-[51px] px-[30px] text-base font-semibold",
} as const;

const paper = {
  primary:
    "bg-white text-black motion-safe:hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]",
  secondary:
    "border border-white/50 bg-white/12 text-mist hover:bg-white/22 motion-safe:hover:scale-[1.03]",
} as const;

export function GetStartedLink({
  href = siteConfig.appUrl,
  children = "Get Started",
  variant = "primary",
  size = "md",
  tone = "default",
  fullWidth = false,
  className = "",
  analytics,
  "aria-label": ariaLabel,
}: GetStartedLinkProps) {
  const appearance =
    tone === "paper" && variant !== "inverse" ? paper[variant] : variants[variant];
  const classes = `group inline-flex items-center justify-center gap-2.5 rounded-2xl ${sizes[size]} transition-[color,background-color,border-color,transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
    fullWidth ? "w-full max-w-none" : "w-full max-w-[340px] sm:w-auto"
  } ${appearance} ${className}`;

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!analytics) {
      return;
    }

    captureCtaClick({
      buttonId: analytics.id,
      buttonText: event.currentTarget.textContent?.trim() || ariaLabel || analytics.id,
      section: analytics.section,
      destination: href,
    });
  }

  // The app is where accounts get created, so confirm the hand-off first.
  if (href === siteConfig.appUrl || href.startsWith(`${siteConfig.appUrl}/`)) {
    return (
      <AppRedirectLink
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        analytics={analytics}
      >
        {children}
      </AppRedirectLink>
    );
  }

  // Next Link only helps internal routes and often swallows in-page hashes.
  if (!href.startsWith("/") || href.includes("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
}
