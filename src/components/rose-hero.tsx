import Link from "next/link";
import { MotifField } from "@/components/motif-field";
import { RoseMascot } from "@/components/rose-mascot";
import { roseHero } from "@/lib/rose";

export function RoseHero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <MotifField
        kind="corners"
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      />
      <div className="mx-auto flex min-h-svh w-full max-w-[1920px] flex-col items-center justify-center gap-8 px-6 pt-[130px] pb-16 text-center">
        <RoseMascot className="h-12 w-12 text-white" />

        <div className="surface-grain inline-flex h-[26px] items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight">
          <BadgeChevrons />
          {roseHero.badge}
        </div>

        <h1 className="text-[clamp(2.125rem,4.6vw,3.75rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
          <span className="block">{roseHero.titleLead}</span>
          <span className="block">{roseHero.titleRest}</span>
        </h1>

        <p className="max-w-[780px] text-[clamp(15px,1.6vw,17px)] leading-[1.65] text-white/80">
          {roseHero.lede}
        </p>

        <Link
          href="/get-started"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-[30px] text-base font-semibold text-black transition-transform hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]"
        >
          {roseHero.cta}
        </Link>
      </div>
    </section>
  );
}

function BadgeChevrons() {
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
