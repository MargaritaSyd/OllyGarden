import { InView } from "@/components/in-view";
import { roseTeams, type RoseTeamsIcon } from "@/lib/rose";

/** Figma 2371:31768 / 31775 / 31782, exported as-is (lucide chevrons, sliders, parasol). */
const iconSrc: Record<RoseTeamsIcon, string> = {
  chevrons: "/images/rose/icon-incidents.svg",
  sliders: "/images/rose/icon-expertise.svg",
  gauge: "/images/rose/icon-signal.svg",
};

const cardClass =
  "flex h-full flex-col gap-4 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8";

export function RoseTeams() {
  const { stat } = roseTeams;

  return (
    <InView
      as="section"
      aria-labelledby="teams-title"
      className="relative overflow-hidden"
    >
      {/* Figma 2371:31740 — decorative pixel cluster, flush top-right. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rose/teams-pixels.svg"
        alt=""
        aria-hidden="true"
        width={628}
        height={228}
        className="pointer-events-none absolute top-0 right-0 hidden h-auto w-[min(628px,44vw)] select-none min-[1140px]:block"
      />
      <div className="relative mx-auto w-full max-w-[1328px] px-5 py-[clamp(3.5rem,6.7vw,6rem)] sm:px-12">
        <div className="ov-stagger flex flex-col gap-10">
          <div className="flex max-w-[571px] flex-col items-start gap-4">
            <TeamsMark />
            <p className="text-base leading-[normal] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
              {roseTeams.eyebrow}
            </p>
            <h2
              id="teams-title"
              className="max-w-[491px] text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
            >
              {roseTeams.title}
            </h2>
          </div>

          <ul className="ov-stagger grid grid-cols-1 gap-6 min-[900px]:grid-cols-3 min-[1100px]:gap-10">
            {roseTeams.cards.map((card) => (
              <li key={card.title}>
                <article className={cardClass}>
                  <span
                    className="flex size-12 items-center justify-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)]"
                    aria-hidden="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iconSrc[card.icon]}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8"
                    />
                  </span>
                  <div>
                    <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] text-mist">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-base leading-[1.5] text-mist/75">
                      {card.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Figma 2371:31787 — stat band */}
          <div className="flex flex-col items-start gap-8 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-14">
            <p className="flex shrink-0 flex-col gap-3 whitespace-nowrap">
              <span className="text-base leading-[normal] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                {stat.label}
              </span>
              <span className="text-[clamp(2.75rem,4.7vw,4.25rem)] leading-[normal] font-bold tracking-[-0.01em] text-sunflower">
                <span aria-hidden="true">
                  {stat.from} → {stat.to}
                </span>
                <span className="sr-only">
                  from {stat.from} to {stat.to}
                </span>
              </span>
            </p>
            <figure className="flex min-w-0 flex-1 flex-col gap-3">
              <QuoteMark />
              <blockquote>
                <p className="text-xl leading-[1.3] text-[#e9ece0]">
                  {stat.quote}
                </p>
              </blockquote>
              <figcaption className="text-base leading-[normal] tracking-[0.01em] text-mist">
                <strong className="font-bold">{stat.name}, </strong>
                <span>{stat.role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </InView>
  );
}

/** Figma 2371:31761 — eight-point star glyph, exported path data. */
function TeamsMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="text-sunflower"
      aria-hidden="true"
    >
      <path d="M25.5148 19.9382C27.8862 19.1889 30.1195 17.8789 32 16C30.1195 14.1195 27.8879 12.8094 25.5148 12.0618C26.664 9.85453 27.3125 7.34661 27.3125 4.68753C24.6518 4.68753 22.1455 5.33767 19.9382 6.48517C19.1889 4.11377 17.8789 1.88054 16 0C14.1195 1.88054 12.8094 4.11215 12.0618 6.48517C9.85453 5.33604 7.34661 4.68753 4.68753 4.68753C4.68753 7.34823 5.33767 9.85453 6.48517 12.0618C4.11377 12.8111 1.88054 14.1211 0 16C1.88054 17.8805 4.11215 19.1906 6.48517 19.9382C5.33604 22.1455 4.68753 24.6534 4.68753 27.3125C7.34823 27.3125 9.85453 26.6623 12.0618 25.5148C12.8111 27.8862 14.1211 30.1195 16 32C17.8805 30.1195 19.1906 27.8878 19.9382 25.5148C22.1455 26.664 24.6534 27.3125 27.3125 27.3125C27.3125 24.6518 26.6623 22.1455 25.5148 19.9382Z" />
    </svg>
  );
}

/** Same glyph as `QuoteMark` in rose-clients.tsx, scaled to Figma's 19px (2371:31792). */
function QuoteMark() {
  return (
    <svg
      width="24"
      height="19"
      viewBox="0 0 31 25"
      fill="currentColor"
      className="text-olive"
      aria-hidden="true"
    >
      <path d="M28.842 0v5.148h-2.952c-2.322 0-3.482 1.16-3.482 3.482v2.422h1.287c2.019 0 3.684.606 4.996 1.817 1.363 1.211 2.044 2.75 2.044 4.618 0 2.019-.681 3.659-2.044 4.92-1.312 1.262-2.977 1.893-4.996 1.893-2.069 0-3.76-.631-5.072-1.893C16.31 21.095 15.654 19.354 15.654 17.184V8.479C15.654 2.826 18.48 0 24.133 0h4.709ZM12.188 0v5.148H9.236c-2.322 0-3.482 1.16-3.482 3.482v2.422h1.287c2.019 0 3.684.606 4.996 1.817 1.363 1.211 2.044 2.75 2.044 4.618 0 2.019-.681 3.659-2.044 4.92-1.312 1.262-2.977 1.893-4.996 1.893-2.069 0-3.76-.631-5.072-1.893C.656 21.095 0 19.354 0 17.184V8.479C0 2.826 2.826 0 8.479 0h3.709Z" />
    </svg>
  );
}
