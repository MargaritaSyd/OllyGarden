import { GetStartedLink } from "@/components/get-started-link";
import { InsightsMascot } from "@/components/insights-mascot";
import { InsightsScore } from "@/components/insights-score";
import { MotifField } from "@/components/motif-field";
import { insightsHero } from "@/lib/insights";

export function InsightsHero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      aria-label="OllyGarden Insights"
    >
      <MotifField
        kind="insights"
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      />

      <div className="mx-auto grid min-h-svh w-full max-w-[1328px] items-center gap-12 px-6 pt-[130px] pb-24 sm:px-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6 lg:pb-32">
        <div className="max-w-[560px]">
          <InsightsMascot className="h-12 w-12 text-mist" />
          <div className="surface-grain mt-6 inline-flex h-[26px] items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight">
            <BadgeChevrons />
            {insightsHero.badge}
          </div>
          <h1 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-mist">
            {insightsHero.title}
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-[1.65] text-mist/85">
            {insightsHero.lede}
          </p>
          <div className="mt-8">
            <GetStartedLink>{insightsHero.cta}</GetStartedLink>
          </div>
        </div>

        <InsightsScore />
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
