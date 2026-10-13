import { InView } from "@/components/in-view";
import { roseDoes, type RoseDoesIcon } from "@/lib/rose";

/** Figma lucide icons exported as-is (stroke #9ca703). */
const iconSrc: Record<RoseDoesIcon, string> = {
  instrument: "/images/rose/icon-instrument.svg",
  migrate: "/images/rose/icon-migrate.svg",
  review: "/images/rose/icon-review.svg",
  fix: "/images/rose/icon-fix.svg",
};

/** Figma 2371:31433 — left-aligned head and four equal-height cards. */
export function RoseDoes() {
  return (
    <InView as="section" aria-labelledby="does-title" className="relative overflow-hidden">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-12 xl:px-[104px]">
        <div className="ov-stagger max-w-[599px]">
          <DoesMark />
          <p className="mt-4 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {roseDoes.eyebrow}
          </p>
          <h2
            id="does-title"
            className="mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[1.25] font-bold tracking-[-0.02em] text-mist"
          >
            {roseDoes.title}
          </h2>
        </div>

        <ul className="ov-stagger mt-16 grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[640px]:gap-8 min-[1140px]:grid-cols-4">
          {roseDoes.cards.map((card) => (
            <li key={card.title} className="flex">
              <article className="texture-grain paper-grain relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl border border-bitmap-highlight/40 p-8 shadow-[inset_0_1px_rgba(255,255,255,0.05)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(125%_80%_at_50%_-10%,rgba(156,167,3,0.14),transparent_60%)]">
                <span
                  aria-hidden="true"
                  className="relative flex size-12 items-center justify-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)]"
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
                <div className="relative">
                  <h3 className="text-xl font-bold tracking-[-0.01em] text-mist">{card.title}</h3>
                  <p className="mt-2 text-base leading-[1.5] text-mist/75">{card.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

/** Four-lobe eyebrow glyph, Figma 2371:31475 (formerly `ContextMark` in the retired context section). */
function DoesMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="text-bitmap-mid"
      aria-hidden="true"
    >
      <path d="M8 16c0 8.836 1.791 16 4.002 16S16.003 24.836 16.003 16H8Z" />
      <path d="M8 16C8 7.164 6.21 0 4 0S0 7.164 0 16h8Z" />
      <path d="M24 16c0 8.836 1.791 16 4.001 16S32 24.836 32 16H24Z" />
      <path d="M24 16C24 7.164 22.209 0 20 0S16 7.164 16 16h8Z" />
    </svg>
  );
}
