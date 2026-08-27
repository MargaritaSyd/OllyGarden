import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { SolutionsHeroField } from "@/components/solutions-hero-field";
import { financialHero } from "@/lib/financial";

type HeroContent = {
  badge: string;
  title: readonly string[];
  lede: string;
  cta: string;
};

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

export function FinancialHero({
  content = financialHero,
  imageSrc = "/images/solutions/financial/hero.svg",
  ctaHref = "/contact",
  labelledBy = "fs-title",
}: {
  content?: HeroContent;
  imageSrc?: string;
  ctaHref?: string;
  labelledBy?: string;
}) {
  return (
    <section
      className="relative h-[clamp(560px,60vw,864px)] overflow-hidden bg-forest max-[880px]:h-auto"
      aria-labelledby={labelledBy}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 z-[1] hidden h-full aspect-[754/864] min-[881px]:block"
        aria-hidden="true"
      >
        <div className="fs-mask-in absolute inset-0 overflow-hidden">
          <div data-ov-img-par className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              width={754}
              height={864}
              fetchPriority="high"
              className="fs-img-in h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <SolutionsHeroField variant="financial" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden max-[880px]:block" aria-hidden="true">
        {mobilePixels.map((pixel) => (
          <div key={pixel.className} className={`absolute opacity-30 ${pixel.className}`} />
        ))}
      </div>

      <div className="relative z-[2] flex h-full max-w-[900px] flex-col items-start justify-center gap-[clamp(1.25rem,3.2vh,2rem)] pr-6 pl-[clamp(3rem,7.25vw,6.5rem)] max-[880px]:mx-auto max-[880px]:h-auto max-[880px]:max-w-none max-[880px]:items-center max-[880px]:px-6 max-[880px]:pt-[148px] max-[880px]:pb-[72px] max-[880px]:text-center max-[479px]:gap-5 max-[479px]:pt-[132px] max-[479px]:pb-16">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <BadgeChevrons />
          {content.badge}
        </div>
        <h1
          id={labelledBy}
          className="text-[clamp(2.125rem,3.5vw,3.125rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist max-[880px]:w-full max-[880px]:text-[clamp(2.125rem,8vw,2.75rem)] max-[479px]:text-[clamp(1.875rem,8.6vw,2.25rem)]"
        >
          {content.title.map((line, index) => (
            <span
              key={line}
              className={`ov-blur-rise block max-[880px]:whitespace-normal min-[881px]:whitespace-nowrap ${
                index === 0
                  ? "[animation-delay:0.25s]"
                  : index === 1
                    ? "[animation-delay:0.42s]"
                    : index === 2
                      ? "[animation-delay:0.59s]"
                      : "[animation-delay:0.76s]"
              }`}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="ov-fade-up mt-[calc(1.25rem-clamp(1.25rem,3.2vh,2rem))] max-w-[603px] text-base leading-[1.4] tracking-[0.02em] text-mist max-[880px]:mx-auto max-[880px]:w-full max-[479px]:mt-0 max-[479px]:text-sm max-[479px]:leading-5 [animation-delay:0.7s]">
          {content.lede}
        </p>
        <div className="ov-fade-up flex w-full max-[640px]:justify-center [animation-delay:0.9s]">
          <GetStartedLink
            href={ctaHref}
            className="group motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]"
          >
            {content.cta}
            <CtaArrow />
          </GetStartedLink>
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
