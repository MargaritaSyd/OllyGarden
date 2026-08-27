import { CtaArrow } from "@/components/cta-arrow";
import { CareersCard, CareersMailLink } from "@/components/careers-card";
import { careersJoin } from "@/lib/careers";

const decoPixels = [
  { className: "top-0 right-0 size-[66px] bg-bitmap-mid opacity-20" },
  { className: "top-[66px] right-[67px] size-[68px] bg-bitmap-highlight opacity-20" },
  { className: "top-[132px] right-0 size-[69px] bg-sunflower opacity-[0.08]" },
  { className: "top-[200px] right-0 size-[67px] bg-bitmap-mid opacity-20" },
] as const;

export function CareersJoin() {
  return (
    <section
      id="open-positions"
      className="relative scroll-mt-[132px] overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:scroll-mt-24 max-[880px]:px-6"
      aria-labelledby="ju-title"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 hidden min-[881px]:block"
        aria-hidden="true"
      >
        {decoPixels.map((pixel) => (
          <div key={pixel.className} className={`absolute ${pixel.className}`} />
        ))}
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[720px] flex-col items-start gap-4">
          <JoinStar />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {careersJoin.eyebrow}
          </p>
          <h2
            id="ju-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {careersJoin.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{careersJoin.lede}</p>
        </header>

        <div className="flex flex-col gap-8">
          <CareersCard>
            <div className="flex flex-col items-start justify-between gap-8 min-[881px]:flex-row min-[881px]:items-center">
              <div className="max-w-[820px]">
                <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
                  {careersJoin.openApp.title}
                </h3>
                <p className="mt-3 text-base leading-[1.4] tracking-[0.02em] text-mist/80">
                  {careersJoin.openApp.body}
                </p>
              </div>
              <CareersMailLink href={careersJoin.openApp.href}>
                {careersJoin.openApp.cta}
                <CtaArrow />
              </CareersMailLink>
            </div>
          </CareersCard>
          <CareersCard>
            <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
              {careersJoin.empty.title}
            </h3>
            <p className="mt-3 max-w-[820px] text-base leading-[1.4] tracking-[0.02em] text-mist/80">
              {careersJoin.empty.body}
            </p>
          </CareersCard>
        </div>
      </div>
    </section>
  );
}

function JoinStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6.48517 12.0618C4.11378 12.8111 1.88054 14.1211 1.39876e-06 16C1.88054 17.8805 4.11216 19.1906 6.48517 19.9382C5.33605 22.1455 4.68753 24.6534 4.68753 27.3125C7.34824 27.3125 9.85453 26.6623 12.0618 25.5148C12.8111 27.8862 14.1211 30.1195 16 32C17.8805 30.1195 19.1906 27.8878 19.9382 25.5148C22.1455 26.664 24.6534 27.3125 27.3125 27.3125C27.3125 24.6518 26.6623 22.1455 25.5148 19.9382C27.8862 19.1889 30.1195 17.8789 32 16C30.1195 14.1195 27.8879 12.8094 25.5148 12.0618C26.664 9.85453 27.3125 7.34661 27.3125 4.68752C24.6518 4.68752 22.1455 5.33767 19.9382 6.48517C19.189 4.11378 17.8789 1.88054 16 -1.39876e-06C14.1195 1.88054 12.8094 4.11215 12.0618 6.48517C9.85454 5.33604 7.34662 4.68752 4.68753 4.68752C4.68753 7.34823 5.33767 9.85453 6.48517 12.0618Z"
        fill="#D1D100"
      />
    </svg>
  );
}
