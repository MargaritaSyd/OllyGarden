import type { CSSProperties } from "react";
import { HomeRealityStats } from "@/components/home-reality-stats";
import { InView } from "@/components/in-view";
import { homeReality } from "@/lib/home";

export function HomeReality() {
  return (
    <InView
      as="section"
      aria-labelledby="reality-title"
      className="home-reality relative overflow-hidden px-5 py-16 sm:px-12 lg:px-[104px] lg:py-24"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="home-reality-head mb-10 lg:mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/solutions/financial/glyph.svg"
            alt=""
            width={32}
            height={32}
            className="mb-4"
          />
          <p className="mb-4 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {homeReality.eyebrow}
          </p>
          <h2
            id="reality-title"
            className="text-[clamp(2rem,3.34vw,3rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist"
          >
            <span className="block">{homeReality.title}</span>
            <span className="block w-fit bg-linear-to-r from-[#d9e533] via-[#c4d336] via-55% to-[#7e9230] bg-clip-text text-[1.125em] leading-[1.16] font-semibold text-transparent">
              {homeReality.titleAccent}
            </span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2 min-[1101px]:grid-cols-4 sm:gap-8">
          {homeReality.cards.map((card, index) => (
            <InView as="li" mark="rv-in" key={card.title}>
              <article
                className="home-reality-card surface-grain h-full rounded-3xl border border-bitmap-highlight/40 p-6 sm:p-8"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.icon} alt="" width={32} height={32} />
                </span>
                <h3 className="mb-2 text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                  {card.title}
                </h3>
                <p className="text-base leading-normal text-mist/75">{card.body}</p>
              </article>
            </InView>
          ))}
        </ul>

        <HomeRealityStats />

        <p className="mt-6 text-[15.5px] leading-[1.62] text-[#e2e5c0]/75 italic">
          {homeReality.note}
        </p>
      </div>
    </InView>
  );
}
