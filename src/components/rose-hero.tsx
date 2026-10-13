import { GetStartedLink } from "@/components/get-started-link";
import { RoseMascot } from "@/components/rose-mascot";
import { RoseMviStrip } from "@/components/rose-mvi-strip";
import { roseHero, roseMvi } from "@/lib/rose";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bitmap-highlight";

/**
 * Figma 2371:32331 (centered variant). The pixel motif (Group 216, 609×950) sits on both
 * sides with 406.72px of its width pushed past the frame edge, so only the outer 202px show;
 * the left copy is the same asset mirrored. 406.72 / 608.717 = 66.8% of the image width.
 */
const pixelImg =
  "ov-fade-up-slow pointer-events-none absolute top-1/2 -z-10 hidden h-[950px] w-auto max-w-none -translate-y-1/2 select-none [animation-delay:0.3s] min-[1140px]:block";

export function RoseHero() {
  return (
    <section
      aria-labelledby="rose-hero-title"
      className="relative isolate min-h-svh overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rose/hero-pixels.svg"
        alt=""
        aria-hidden="true"
        width={609}
        height={950}
        className={`${pixelImg} right-0 translate-x-[66.8%]`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rose/hero-pixels.svg"
        alt=""
        aria-hidden="true"
        width={609}
        height={950}
        className={`${pixelImg} left-0 -translate-x-[66.8%] -scale-x-100`}
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-[1440px] items-center justify-center px-5 pt-[130px] pb-16 sm:px-12 xl:px-[104px]">
        <div className="flex w-full max-w-[1070px] flex-col items-center py-6 text-center">
          <div className="flex w-full flex-col items-center gap-6">
            <RoseMascot className="ov-fade-up-slow h-12 w-12 text-white [animation-delay:0.12s]" />

            <p className="ov-fade-up-slow surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-muted px-4 py-1 text-[13px] leading-normal font-medium tracking-[0.01em] text-bitmap-highlight [animation-delay:0.28s]">
              <BadgeChevrons />
              {roseHero.badge}
            </p>

            {/* Figma: 52px / 72px / -1.04px (-0.02em), centered. */}
            <h1
              id="rose-hero-title"
              className="text-[clamp(2.125rem,4.6vw,3.25rem)] leading-[1.385] font-bold tracking-[-0.02em] text-mist"
            >
              <span className="ov-blur-rise-slow block [animation-delay:0.48s]">
                {roseHero.titleLead}
              </span>
              <span className="ov-blur-rise-slow block [animation-delay:0.72s]">
                {roseHero.titleRest}
              </span>
            </h1>

            <div className="max-w-[782px] text-base leading-[1.4] tracking-[0.02em] text-mist">
              <p className="ov-fade-up-slow [animation-delay:1.1s]">{roseHero.lede}</p>
              <p className="ov-fade-up-slow mt-3 [animation-delay:1.2s]">
                {roseHero.scopeLead}
                <strong className="font-bold">{roseHero.scopeStrong}</strong>
              </p>
            </div>
          </div>

          <div className="ov-fade-up-slow mt-8 flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row [animation-delay:1.35s]">
            <GetStartedLink
              size="lg"
              href={roseHero.ctaHref}
              analytics={{ id: "rose_hero_primary", section: "hero" }}
              className={focusRing}
            >
              {roseHero.cta}
            </GetStartedLink>
            <GetStartedLink
              size="lg"
              variant="secondary"
              href={roseHero.secondaryHref}
              analytics={{ id: "rose_hero_secondary", section: "hero" }}
              className={focusRing}
            >
              {roseHero.secondaryCta}
            </GetStartedLink>
          </div>

          {/* Figma 2371:32428: 56px below the buttons. */}
          <RoseMviStrip
            href={`#${roseMvi.id}`}
            section="hero"
            className="ov-fade-up-slow mt-14 [animation-delay:1.5s]"
          />
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
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
