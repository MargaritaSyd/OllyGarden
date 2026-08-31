import Link from "next/link";

type ComingSoonProps = {
  badge?: string;
  title: string;
  soon?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  fillViewport?: boolean;
};

const PIXELS = [
  { className: "top-8 right-0 bg-bitmap-shadow", key: "tr-a" },
  { className: "top-[76px] right-11 bg-sunflower", key: "tr-b" },
  { className: "bottom-11 left-0 bg-sunflower", key: "bl-a" },
  { className: "bottom-0 left-11 bg-bitmap-mid", key: "bl-b" },
] as const;

export function ComingSoon({
  badge,
  title,
  soon = "Coming soon",
  description,
  homeHref = "/",
  homeLabel = "← Back to Home",
  fillViewport = false,
}: ComingSoonProps) {
  return (
    <div
      className={`ph relative flex items-center justify-center overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[120px] pb-24 ${
        fillViewport ? "min-h-dvh flex-1" : "min-h-full"
      }`}
    >
      <div className="ph-media pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      {PIXELS.map((pixel) => (
        <div
          key={pixel.key}
          className={`pointer-events-none absolute z-[1] size-11 opacity-30 max-[880px]:size-7 ${pixel.className}`}
          aria-hidden="true"
        />
      ))}
      <div className="ph-inner relative z-[2] flex max-w-[720px] flex-col items-center gap-6 text-center">
        {badge ? (
          <span className="inline-flex h-[52px] items-center bg-[#c8d99b] px-6 text-base font-bold text-[#00280e]">
            {badge}
          </span>
        ) : null}
        <h1 className="text-[clamp(1.875rem,8.6vw,2.375rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white min-[480px]:text-[3.75rem]">
          {title}
        </h1>
        <span className="surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium text-bitmap-highlight">
          <SoonChevrons />
          {soon}
        </span>
        {description ? (
          <p className="text-lg leading-[1.55] text-mist/85">{description}</p>
        ) : null}
        <Link
          href={homeHref}
          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-[30px] py-4 text-base leading-none font-semibold text-black transition-[transform,box-shadow,background] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]"
        >
          {homeLabel}
        </Link>
      </div>
    </div>
  );
}

function SoonChevrons() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
        stroke="#E3E270"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
