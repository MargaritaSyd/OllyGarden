import type { CSSProperties, ReactNode } from "react";

const hoverClass = {
  none: "",
  tint: "transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:border-bitmap-highlight/60 hover:bg-[rgba(0,44,16,0.66)]",
  lift: "group transition-[transform,border-color,background-color,box-shadow] duration-[180ms] ease-out motion-safe:hover:-translate-y-0.5 hover:border-bitmap-highlight/70 hover:bg-[rgba(0,44,16,0.66)] hover:shadow-[0_16px_38px_rgba(0,0,0,0.36),0_0_24px_rgba(217,229,51,0.08),inset_0_1px_rgba(255,255,255,0.08)]",
  rise: "group transition-[transform,border-color,background-color,box-shadow] duration-[180ms] ease-out motion-safe:hover:-translate-y-1 hover:border-bitmap-highlight/70 hover:bg-[rgba(0,44,16,0.66)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.4),0_0_26px_rgba(217,229,51,0.1),inset_0_1px_rgba(255,255,255,0.08)]",
} as const;

export function CareersCard({
  children,
  className = "",
  hover = "none",
  style,
}: {
  children: ReactNode;
  className?: string;
  hover?: keyof typeof hoverClass;
  style?: CSSProperties;
}) {
  return (
    <article
      style={style}
      className={`cr-card relative overflow-hidden rounded-3xl border border-bitmap-highlight/40 p-8 ${hoverClass[hover]} ${className}`.trim()}
    >
      {children}
    </article>
  );
}

export function CareersIconTile({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)] transition-[border-color,background-color] duration-[180ms] ease-out group-hover:border-bitmap-mid/50 group-hover:bg-bitmap-mid/28"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function CareersStrokeIcon({ d }: { d: string }) {
  return (
    <svg width="32" height="32" viewBox="12 8 48 48" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="#9CA703"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const careersCtaClassName =
  "group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-mist px-6 py-3.5 text-base leading-none font-semibold whitespace-nowrap text-forest transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] sm:w-auto max-[767px]:w-full";
