import {
  CareersCard,
  CareersIconTile,
  CareersStrokeIcon,
} from "@/components/careers-card";
import { careersIcons, careersWhy } from "@/lib/careers";

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
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="wy-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[760px] flex-col items-start gap-4">
          <WhyMotif />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {careersWhy.eyebrow}
          </p>
          <h2
            id="wy-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {careersWhy.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{careersWhy.lede}</p>
        </header>

        <ul className="grid list-none gap-8 p-0 min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {careersWhy.cards.map((card) => (
            <li key={card.key}>
              <CareersCard className="h-full">
                <div className="flex flex-col gap-4">
                  <CareersIconTile>
                    <CareersStrokeIcon d={whyIcons[card.key]} />
                  </CareersIconTile>
                  <h3 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                    {card.title}
                  </h3>
                  <p className="text-base leading-[1.4] text-mist/75">{card.body}</p>
                </div>
              </CareersCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
