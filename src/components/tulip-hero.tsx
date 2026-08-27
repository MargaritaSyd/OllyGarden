import { GetStartedLink } from "@/components/get-started-link";
import { MotifField } from "@/components/motif-field";
import { TulipMascot } from "@/components/tulip-mascot";
import { tulipHero } from "@/lib/tulip";

export function TulipHero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <MotifField
        kind="tulip"
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-[1232px] flex-col items-center justify-center px-6 pt-[130px] pb-24 text-center">
        <TulipMascot className="h-12 w-12 text-mist" />

        <div className="surface-grain mt-6 inline-flex h-[26px] items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight">
          <BadgeChevrons />
          {tulipHero.badge}
        </div>

        <h1 className="mt-6 max-w-[1000px] text-[clamp(2.125rem,4.6vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-balance text-mist">
          {tulipHero.title}
        </h1>

        <p className="mt-6 max-w-[660px] text-base leading-[1.4] text-mist/90">
          {tulipHero.lede}
        </p>

        <div className="mt-6 flex w-full max-w-[420px] flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row">
          <GetStartedLink href="/products/tulip#ta-title">{tulipHero.primary}</GetStartedLink>
          <GetStartedLink href="/products/tulip#lead-title" variant="secondary">
            {tulipHero.secondary}
          </GetStartedLink>
        </div>

        <p className="paper-grain texture-grain mt-6 max-w-[720px] rounded-2xl border border-[#e3e270]/40 px-6 py-4 text-sm leading-5 text-[#c9cb65]">
          {tulipHero.note}
        </p>
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
