import { SolutionsHeroField } from "@/components/solutions-hero-field";
import { solutionsHero } from "@/lib/solutions";

const mobilePixels = [
  { className: "top-[104px] right-0 size-11 bg-bitmap-shadow" },
  { className: "top-[132px] right-7 size-11 bg-sunflower" },
  { className: "top-40 right-0 size-[18px] bg-bitmap-highlight" },
  { className: "top-[188px] right-14 size-[18px] bg-bitmap-mid" },
  { className: "top-[216px] right-0 size-[18px] bg-sunflower" },
  { className: "top-[280px] left-0 size-11 bg-bitmap-mid" },
  { className: "top-[308px] left-7 size-[18px] bg-bitmap-shadow" },
  { className: "bottom-[124px] left-7 size-[18px] bg-bitmap-mid" },
  { className: "bottom-24 left-0 size-11 bg-sunflower" },
  { className: "bottom-14 left-7 size-11 bg-bitmap-shadow" },
  { className: "bottom-7 left-0 size-[18px] bg-bitmap-highlight" },
  { className: "bottom-16 right-0 size-[18px] bg-sunflower" },
  { className: "bottom-7 right-7 size-11 bg-bitmap-mid" },
] as const;

export function SolutionsHero() {
  return (
    <section
      className="relative h-[clamp(460px,52.5vw,756px)] overflow-hidden bg-forest max-[880px]:h-auto"
      aria-labelledby="ov-title"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 hidden h-full aspect-[753/755] min-[881px]:block"
        aria-hidden="true"
      >
        <div className="ov-mask-in absolute inset-y-0 right-0 left-[14.34%] overflow-hidden">
          <div data-ov-img-par className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/solutions/hero.webp"
              alt=""
              width={1180}
              height={1372}
              fetchPriority="high"
              className="ov-img-in h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <SolutionsHeroField />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden max-[880px]:block" aria-hidden="true">
        {mobilePixels.map((pixel) => (
          <div
            key={pixel.className}
            className={`sol-ipx absolute opacity-30 ${pixel.className}`}
          />
        ))}
      </div>

      <div className="relative z-[2] flex h-full max-w-[660px] flex-col items-start justify-center pr-6 pl-[clamp(3rem,7.25vw,6.5rem)] max-[880px]:mx-auto max-[880px]:h-auto max-[880px]:max-w-none max-[880px]:items-center max-[880px]:px-6 max-[880px]:pt-[148px] max-[880px]:pb-[72px] max-[880px]:text-center">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <BadgeChevrons />
          {solutionsHero.badge}
        </div>
        <h1
          id="ov-title"
          className="mt-6 mb-5 text-[clamp(2.5rem,4.45vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)]"
        >
          <span className="ov-blur-rise block [animation-delay:0.25s]">
            {solutionsHero.titleLead}
          </span>
          <span className="ov-blur-rise block [animation-delay:0.42s]">
            {solutionsHero.titleRest}
          </span>
        </h1>
        <p className="ov-fade-up max-w-[510px] text-base leading-[1.4] tracking-[0.02em] text-mist max-[880px]:mx-auto [animation-delay:0.7s]">
          {solutionsHero.lede}
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
