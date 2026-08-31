import type { CSSProperties } from "react";
import {
  CareersCard,
  CareersIconTile,
  CareersStrokeIcon,
} from "@/components/careers-card";
import { InView } from "@/components/in-view";
import { careersIcons, careersWhy } from "@/lib/careers";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const whyIcons = {
  remote: careersIcons.remote,
  tech: careersIcons.tech,
  comp: careersIcons.comp,
  collab: careersIcons.collab,
  balance: careersIcons.balance,
  growth: careersIcons.proGrowth,
} as const;

export function CareersWhy() {
  return (
    <InView
      as="section"
      threshold={0.08}
      rootMargin="0px"
      className="wy relative isolate overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3.5rem,7vw,6rem)] max-[1023px]:px-16 max-[1023px]:py-20 max-[767px]:px-6 max-[767px]:py-16 max-[599px]:px-5 max-[599px]:py-12"
      aria-labelledby="wy-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="rv flex max-w-[640px] flex-col items-start" style={delay(0)}>
          <WhyMotif />
          <p className="mt-4 text-base leading-5 font-bold tracking-[0.1em] text-bitmap-mid uppercase max-[767px]:text-sm max-[767px]:leading-[18px]">
            {careersWhy.eyebrow}
          </p>
          <h2
            id="wy-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[1023px]:text-[clamp(2.25rem,5vw,2.5rem)] max-[767px]:text-[2.5rem] max-[767px]:leading-[1.1] max-[599px]:text-[2rem] max-[599px]:leading-[1.14]"
          >
            {careersWhy.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-base leading-[1.4] text-mist/75">
            {careersWhy.lede}
          </p>
        </header>

        <ul className="grid list-none grid-cols-1 gap-8 p-0 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3 max-[767px]:gap-5">
          {careersWhy.cards.map((card, index) => (
            <li key={card.key}>
              <CareersCard
                className="rv h-full max-[599px]:p-6"
                hover="rise"
                style={delay(index + 1)}
              >
                <CareersIconTile>
                  <CareersStrokeIcon d={whyIcons[card.key]} />
                </CareersIconTile>
                <h3 className="mt-4 mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                  {card.title}
                </h3>
                <p className="text-base leading-[1.5] text-mist/75 transition-colors duration-[180ms] group-hover:text-mist/90">
                  {card.body}
                </p>
              </CareersCard>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

function WhyMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 16C16 24.8371 23.1629 32 32 32C32 23.1629 24.8371 16 16 16Z"
        fill="#D1D100"
      />
      <path
        d="M16 16C16 24.8371 8.83706 32 0 32C0 23.1629 7.16294 16 16 16Z"
        fill="#D1D100"
      />
      <path
        d="M16 16C16 7.16294 8.83706 0 0 0C0 8.83706 7.16294 16 16 16Z"
        fill="#D1D100"
      />
      <path
        d="M16 16C16 7.16294 23.1629 0 32 0C32 8.83706 24.8371 16 16 16Z"
        fill="#D1D100"
      />
    </svg>
  );
}
