"use client";

import type { MouseEvent } from "react";
import { captureCtaClick } from "@/lib/posthog";
import { roseMvi } from "@/lib/rose";

type RoseMviStripProps = {
  /** Where "See How it Works" goes: the in-page anchor on Rose, the Rose page from Home. */
  href: string;
  /** Page section for the cta_clicked event. */
  section: string;
  className?: string;
};

/**
 * Announcement strip under the hero buttons. Figma 2371:32444: 910px wide, 24px vertical
 * padding, 34px horizontal, 25.6px radius, highlight/40 border on a translucent forest fill
 * with a soft olive glow bleeding in from the top. Client component only for the click event.
 */
export function RoseMviStrip({ href, section, className = "" }: RoseMviStripProps) {
  const { strip } = roseMvi;

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    captureCtaClick({
      buttonId: "rose_mvi_strip",
      buttonText: event.currentTarget.textContent?.trim() || strip.link,
      section,
      destination: href,
    });
  }

  return (
    <div
      className={`relative isolate flex w-full max-w-[910px] flex-col gap-4 overflow-hidden rounded-[25.6px] border border-bitmap-highlight/40 bg-[#00280e]/60 px-6 py-6 text-left sm:px-[34px] lg:flex-row lg:items-center lg:gap-[17px] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-full bg-[linear-gradient(182deg,rgba(66,126,39,0.35)_0%,rgba(7,24,13,0)_60%)]"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title and badge share one paragraph so the agent Markdown keeps them on one line. */}
        <p className="flex flex-wrap items-center gap-[9px] text-[21.33px] leading-[normal] font-bold tracking-[-0.01em] text-mist">
          <span>{strip.title}</span>
          <span className="surface-grain inline-flex items-center rounded-full border border-white/14 bg-muted px-[12.8px] py-1 text-[13.87px] leading-[normal] font-medium tracking-[0.01em] text-bitmap-highlight uppercase">
            {strip.badge}
          </span>
        </p>
        <p className="text-[17.07px] leading-[1.5] text-mist/75">{strip.body}</p>
      </div>
      <a
        href={href}
        onClick={onClick}
        className="group inline-flex shrink-0 items-center gap-[8.5px] text-[17.07px] leading-[normal] font-bold tracking-[-0.01em] text-bitmap-highlight transition-colors hover:text-sunflower focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bitmap-highlight"
      >
        {strip.link}
        {/* Figma rotates the right-pointing arrow 90° so it points at the section below. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/rose/icon-arrow-sm.svg"
          alt=""
          aria-hidden="true"
          width={12}
          height={12}
          className="size-[11.2px] rotate-90 transition-transform motion-safe:group-hover:translate-y-0.5"
        />
      </a>
    </div>
  );
}
