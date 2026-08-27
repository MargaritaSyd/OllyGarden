import { FinancialStat } from "@/components/financial-stat";
import { financialStats } from "@/lib/financial";

type StatsContent = {
  eyebrow: string;
  title: string;
  sub: string;
  cards: readonly {
    eyebrow: string;
    end: number;
    suffix: string;
    sep: boolean;
    prefix?: string;
    body: string;
  }[];
};

export function FinancialStats({ content = financialStats }: { content?: StatsContent }) {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,7.5rem)] max-[1100px]:px-[clamp(1.5rem,5vw,3.5rem)] max-[1100px]:py-[clamp(4rem,6vw,6rem)]"
      aria-labelledby="fi-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="mx-auto mb-16 max-w-[920px] text-center max-[880px]:mb-12">
          <PetalMark />
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="fi-title"
            className="mb-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist"
          >
            {content.title}
          </h2>
          <p className="mx-auto max-w-[720px] text-base leading-[1.5] tracking-[0.01em] text-[#e2e5c0]/72">
            {content.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 min-[881px]:grid-cols-2 min-[881px]:gap-8 min-[1101px]:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.eyebrow}
              className="surface-grain rounded-2xl border border-white/8 bg-[#19321e] px-10 pt-9 pb-11 shadow-[inset_0_1px_rgba(255,255,255,0.05)] max-[880px]:px-7 max-[880px]:pt-7 max-[880px]:pb-8"
            >
              <p className="mb-3.5 text-[13px] font-bold tracking-[0.12em] text-bitmap-mid uppercase">
                {card.eyebrow}
              </p>
              <FinancialStat
                end={card.end}
                suffix={card.suffix}
                sep={card.sep}
                prefix={card.prefix}
              />
              <p className="text-[15px] leading-6 text-[#e2e5c0]/72">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PetalMark() {
  return (
    <span className="mb-4 inline-block" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M6.48517 12.0618C4.11378 12.8111 1.88054 14.1211 1.39876e-06 16C1.88054 17.8805 4.11216 19.1906 6.48517 19.9382C5.33605 22.1455 4.68753 24.6534 4.68753 27.3125C7.34824 27.3125 9.85453 26.6623 12.0618 25.5148C12.8111 27.8862 14.1211 30.1195 16 32C17.8805 30.1195 19.1906 27.8878 19.9382 25.5148C22.1455 26.664 24.6534 27.3125 27.3125 27.3125C27.3125 24.6518 26.6623 22.1455 25.5148 19.9382C27.8862 19.1889 30.1195 17.8789 32 16C30.1195 14.1195 27.8879 12.8094 25.5148 12.0618C26.664 9.85453 27.3125 7.34661 27.3125 4.68752C24.6518 4.68752 22.1455 5.33767 19.9382 6.48517C19.189 4.11378 17.8789 1.88054 16 -1.39876e-06C14.1195 1.88054 12.8094 4.11215 12.0618 6.48517C9.85454 5.33604 7.34662 4.68752 4.68753 4.68752C4.68753 7.34823 5.33767 9.85453 6.48517 12.0618Z"
          fill="#9CA703"
        />
      </svg>
    </span>
  );
}
