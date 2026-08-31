import { GetStartedLink } from "@/components/get-started-link";
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
        <RoseMascot className="ov-fade-up-slow h-12 w-12 text-white [animation-delay:0.12s]" />

        <div className="ov-fade-up-slow surface-grain inline-flex h-[26px] items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight [animation-delay:0.28s]">
          <BadgeChevrons />
          {roseHero.badge}
        </div>

        <h1 className="text-[clamp(2.125rem,4.6vw,3.75rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
          <span className="ov-blur-rise-slow block [animation-delay:0.48s]">
            {roseHero.titleLead}
          </span>
          <span className="ov-blur-rise-slow block [animation-delay:0.72s]">
            {roseHero.titleRest}
          </span>
        </h1>

        <p className="ov-fade-up-slow max-w-[780px] text-[clamp(15px,1.6vw,17px)] leading-[1.65] text-white/80 [animation-delay:1.1s]">
          {roseHero.lede}
        </p>

        <div className="ov-fade-up-slow [animation-delay:1.35s]">
          <GetStartedLink>{roseHero.cta}</GetStartedLink>
        </div>
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
