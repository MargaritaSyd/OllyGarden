import { CtaArrow } from "@/components/cta-arrow";
import { communityEvents, communityHero } from "@/lib/community";

export function CommunityEvents() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,12vw,11rem)] pb-24 max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-16"
      aria-labelledby="evsec-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <header className="mb-12">
          <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
            <BadgeChevrons />
            {communityHero.badge}
          </div>
          <h1
            id="evsec-title"
            className="ov-blur-rise mt-6 max-w-[704px] text-[clamp(2.5rem,4.45vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
          >
            {communityHero.title}
          </h1>
          <p className="ov-fade-up mt-5 max-w-[704px] text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
            {communityHero.lede}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {communityEvents.map((event) => (
            <li key={event.href}>
              <a
                href={event.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 text-mist"
                aria-label={`${event.title}, ${event.date} in ${event.place} — register (opens in a new tab)`}
              >
                <span className="flex h-[381px] flex-col rounded-2xl border border-sunflower/40 bg-[#00260d] p-6">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[13px] font-bold tracking-[0.02em]">
                      {event.host}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/brand/logo-group.svg"
                      alt=""
                      width={110}
                      height={17}
                      className="mt-0.5 h-[17px] w-auto"
                    />
                  </span>
                  <span className="mt-auto flex flex-col gap-1">
                    <span className="text-[15px] font-medium text-sunflower">
                      OllyGarden at
                    </span>
                    <span className="text-[clamp(1.25rem,1.7vw,1.675rem)] leading-[1.48] font-bold tracking-[0.01em] text-mist uppercase">
                      {event.posterTitle}
                    </span>
                    <span className="text-[13px] leading-[1.5] font-medium text-[#cdcdcd]">
                      {event.note}
                    </span>
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-3 text-sm text-mist/60">
                  <span>{event.date}</span>
                  <span className="h-3.5 w-px bg-mist/60" aria-hidden="true" />
                  <span>{event.place}</span>
                </span>
                <h3 className="text-2xl leading-[1.29] font-bold tracking-[-0.02em]">
                  {event.title}
                </h3>
                <p className="text-base leading-[1.2] text-[#cdcdcd]">{event.summary}</p>
                <span className="inline-flex items-center gap-2 pt-2 text-lg font-medium tracking-[0.02em] text-sunflower">
                  <span className="underline underline-offset-2">Register</span>
                  <CtaArrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
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
