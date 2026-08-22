import Link from "next/link";
export function HomeHero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-5 pt-[6.875rem] pb-14 text-center sm:px-6 sm:pt-[8.125rem] sm:pb-16">
      <div className="flex w-full max-w-[1920px] flex-col items-center gap-[clamp(1.25rem,3.2vh,2rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/title-image.svg"
          alt=""
          width={32}
          height={32}
          className="h-10 w-10"
        />
        <p className="surface-grain relative inline-flex h-[26px] items-center rounded-full border border-mist/15 bg-forest px-4 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight">
          <span className="inline-flex items-center gap-2">
            <BadgeChevrons />
            Telemetry your AI can trust
          </span>
        </p>
        <h1 className="text-[clamp(2.375rem,5vw,3.75rem)] leading-[1.12] font-bold tracking-[-0.02em] text-balance text-mist">
          <span className="block">Observability starts</span>
          <span className="block">
            with <span className="text-sunflower">good telemetry</span>
          </span>
        </h1>
        <p className="max-w-[780px] text-[17px] leading-[1.65] text-mist/80">
          OllyGarden helps teams find and fix bad telemetry before it reaches any
          observability backend, giving engineers and AI agents data they can
          rely on — from pull request to production.
        </p>
        <Link
          href="/get-started"
          className="inline-flex h-12 w-full max-w-[340px] items-center justify-center rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
        >
          Get Started
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
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}