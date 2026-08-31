import type { CSSProperties } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { CareersCard, CareersMailLink } from "@/components/careers-card";
import { InView } from "@/components/in-view";
import { careersJoin } from "@/lib/careers";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function CareersJoin() {
  return (
    <InView
      as="section"
      id="open-positions"
      threshold={0.08}
      rootMargin="0px"
      className="ju relative isolate scroll-mt-[132px] overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3.5rem,7vw,6rem)] max-[1023px]:px-16 max-[1023px]:py-[72px] max-[767px]:scroll-mt-24 max-[767px]:px-6 max-[767px]:py-14"
      aria-labelledby="ju-title"
    >
      <div className="ju-deco" aria-hidden="true">
        <JoinDeco />
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12 max-[767px]:gap-8">
        <header className="rv flex max-w-[720px] flex-col items-start" style={delay(0)}>
          <JoinStar />
          <p className="mt-4 text-base leading-5 font-bold tracking-[0.1em] text-bitmap-mid uppercase max-[767px]:text-sm max-[767px]:leading-[18px]">
            {careersJoin.eyebrow}
          </p>
          <h2
            id="ju-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[1023px]:text-[clamp(2.25rem,5vw,2.5rem)] max-[767px]:text-[2rem] max-[767px]:leading-[1.14]"
          >
            {careersJoin.title}
          </h2>
          <p className="mt-5 max-w-[480px] text-base leading-[1.5] tracking-[0.02em] text-mist">
            {careersJoin.lede}
          </p>
        </header>

        <div className="flex flex-col gap-10 max-[767px]:gap-6">
          <CareersCard
            className="rv max-[767px]:rounded-2xl max-[767px]:p-5"
            hover="tint"
            style={delay(1)}
          >
            <div className="flex flex-col items-start justify-between gap-8 min-[768px]:flex-row min-[768px]:items-center max-[767px]:gap-5">
              <div className="max-w-[760px]">
                <h3 className="mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                  {careersJoin.openApp.title}
                </h3>
                <p className="text-base leading-[1.5] tracking-[0.02em] text-mist/75">
                  {careersJoin.openApp.body}
                </p>
              </div>
              <CareersMailLink href={careersJoin.openApp.href}>
                {careersJoin.openApp.cta}
                <CtaArrow />
              </CareersMailLink>
            </div>
          </CareersCard>
          <CareersCard
            className="rv max-[767px]:rounded-2xl max-[767px]:p-5"
            hover="tint"
            style={delay(2)}
          >
            <h3 className="mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
              {careersJoin.empty.title}
            </h3>
            <p className="max-w-[760px] text-base leading-[1.5] tracking-[0.02em] text-mist/75">
              {careersJoin.empty.body}
            </p>
          </CareersCard>
        </div>
      </div>
    </InView>
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

function JoinDeco() {
  return (
    <svg width="201" height="335" viewBox="0 0 201 335" fill="none" aria-hidden="true">
      <rect opacity="0.2" x="66.5581" y="199.674" width="66.5599" height="66.5599" fill="#9CA703" />
      <rect opacity="0.2" x="133.117" y="266.536" width="67.8828" height="67.8828" fill="#9CA703" />
      <rect opacity="0.08" width="66.5599" height="66.5599" fill="#D1D100" />
      <rect opacity="0.2" x="0.00146484" y="66.5605" width="66.5599" height="66.5599" fill="#D1D100" />
      <rect opacity="0.08" x="66.5581" y="66.5605" width="66.5599" height="66.5599" fill="#D1D100" />
      <rect opacity="0.2" x="133.118" y="131.961" width="68.8823" height="68.8823" fill="#E3E270" />
      <g opacity="0.2">
        <path
          d="M132.478 233.913C132.478 252.845 147.815 268.191 166.737 268.191C166.737 249.259 151.4 233.913 132.478 233.913Z"
          fill="#9CA703"
        />
        <path
          d="M200.999 233.919C200.999 252.851 185.662 268.197 166.741 268.197C166.741 249.265 182.078 233.919 200.999 233.919Z"
          fill="#9CA703"
        />
        <path
          d="M166.736 233.953C185.658 233.953 200.995 218.607 200.995 199.675L132.478 199.675C132.478 218.607 147.815 233.953 166.736 233.953Z"
          fill="#9CA703"
        />
      </g>
    </svg>
  );
}
