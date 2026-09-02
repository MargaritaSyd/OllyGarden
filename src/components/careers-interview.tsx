import type { CSSProperties } from "react";
import { CareersApplyCta } from "@/components/careers-apply-cta";
import {
  CareersCard,
  CareersIconTile,
  CareersStrokeIcon,
} from "@/components/careers-card";
import { InView } from "@/components/in-view";
import { careersIcons, careersInterview } from "@/lib/careers";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function CareersInterview() {
  return (
    <InView
      as="section"
      threshold={0.08}
      rootMargin="0px"
      className="iv relative isolate overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3.5rem,7vw,6rem)] max-[1023px]:px-16 max-[1023px]:py-[72px] max-[767px]:px-6 max-[767px]:py-14"
      aria-labelledby="iv-title"
    >
      <div className="iv-deco" aria-hidden="true">
        <InterviewDeco />
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-16 max-[1023px]:gap-12 max-[767px]:gap-10">
        <header className="rv flex max-w-[640px] flex-col items-start" style={delay(0)}>
          <InterviewMotif />
          <p className="mt-4 text-base leading-5 font-bold tracking-[0.1em] text-bitmap-mid uppercase max-[767px]:text-sm max-[767px]:leading-[18px]">
            {careersInterview.eyebrow}
          </p>
          <h2
            id="iv-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[1023px]:text-[clamp(2.25rem,5vw,2.5rem)] max-[767px]:text-[2rem] max-[767px]:leading-[1.14]"
          >
            {careersInterview.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-[470px] text-base leading-[1.5] text-mist">
            {careersInterview.lede}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 max-[767px]:gap-y-5">
          {careersInterview.cards.map((card, index) => (
            <CareersCard key={card.key} className="rv flex flex-col" hover="lift" style={delay(index + 1)}>
              <CareersIconTile>
                <CareersStrokeIcon d={careersIcons[card.key]} />
              </CareersIconTile>
              <h3 className="mt-5 mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-base leading-[1.5] text-mist/75 transition-colors duration-[180ms] group-hover:text-mist/90">
                {card.body}
              </p>
            </CareersCard>
          ))}
        </div>

        <CareersCard className="rv" hover="none" style={delay(7)}>
          <div className="flex flex-col items-start justify-between gap-10 min-[768px]:flex-row min-[768px]:items-center max-[767px]:gap-5">
            <div className="flex max-w-[860px] items-start gap-5">
              <CareersIconTile>
                <CareersStrokeIcon d={careersIcons.atom} />
              </CareersIconTile>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                  {careersInterview.cta.title}
                </h3>
                <p className="text-base leading-[1.5] text-mist/75">
                  {careersInterview.cta.body}
                </p>
              </div>
            </div>
            <CareersApplyCta label={careersInterview.cta.label} />
          </div>
        </CareersCard>
      </div>
    </InView>
  );
}

function InterviewMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M8.0008 15.9992C8.0008 24.8356 9.79159 32 12.002 32C14.2125 32 16.0032 24.8356 16.0032 15.9992H8.0008Z"
        fill="#D1D100"
      />
      <path
        d="M8.00081 16.0008C8.00081 7.16442 6.21002 0 4.00122 0C1.79079 0 0 7.16442 0 16.0008H8.00081Z"
        fill="#D1D100"
      />
      <path
        d="M23.9976 15.9992C23.9976 24.8356 25.7884 32 27.9988 32C30.2092 32 32 24.8356 32 15.9992H23.9976Z"
        fill="#D1D100"
      />
      <path
        d="M23.9976 16.0008C23.9976 7.16442 22.2068 0 19.998 0C17.7892 0 15.9968 7.16442 15.9968 16.0008H23.9976Z"
        fill="#D1D100"
      />
    </svg>
  );
}

function InterviewDeco() {
  return (
    <svg width="409" height="204" viewBox="0 0 409 204" fill="none" aria-hidden="true">
      <rect opacity="0.3" x="0" y="0" width="68" height="68" fill="#D1D100" />
      <rect opacity="0.3" x="205" y="0" width="68" height="68" fill="#D1D100" />
      <rect opacity="0.3" x="341" y="0" width="68" height="68" fill="#D1D100" />
      <rect opacity="0.3" x="68" y="68" width="68" height="69" fill="#E3E270" />
      <rect opacity="0.3" x="137" y="68" width="68" height="68" fill="#D1D100" />
      <rect opacity="0.3" x="273" y="68" width="68" height="68" fill="#D1D100" />
      <rect opacity="0.3" x="341" y="136" width="68" height="68" fill="#D1D100" />
    </svg>
  );
}
