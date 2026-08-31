import { ResourceCard, ResourceCardPoster } from "@/components/resource-card";
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

        <ul
          className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3"
          aria-label="Next Events"
        >
          {communityEvents.map((event) => (
            <li key={event.href} className="h-full">
              <ResourceCard
                href={event.href}
                external
                ariaLabel={`${event.title}, ${event.date} in ${event.place} — register (opens in a new tab)`}
                media={
                  <ResourceCardPoster
                    host={event.host}
                    hostLogos={event.hostLogos}
                    posterTitle={event.posterTitle}
                    highlight={event.highlight}
                    note={event.note}
                  />
                }
                date={event.date}
                suffix={event.place}
                title={event.title}
                description={event.summary}
                cta="Register"
              />
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
