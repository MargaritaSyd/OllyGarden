import { ContentCard } from "@/components/content-card";
import { InView } from "@/components/in-view";
import { homeWhy, type WhyMotif } from "@/lib/home";

export function HomeWhy() {
  return (
    <InView as="section" aria-labelledby="why-title" className="relative">
      <div className="mx-auto grid w-full max-w-[1328px] items-center gap-12 px-6 py-24 sm:px-12 lg:grid-cols-[minmax(0,560px)_minmax(0,576px)] lg:gap-24 lg:py-[140px]">
        <div className="why-copy">
          <SunMark />
          <p className="mt-7 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {homeWhy.eyebrow}
          </p>
          <h2
            id="why-title"
            className="mt-5 text-[clamp(2rem,4vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {homeWhy.title}
          </h2>
          {homeWhy.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`text-[16.5px] leading-[1.68] text-mist/75 ${
                index === 0 ? "mt-7" : "mt-[18px]"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="flex flex-col gap-4">
          {homeWhy.cards.map((card) => (
            <InView as="li" mark="rv-in" key={card.title} className="why-card-wrap">
              <ContentCard
                title={card.title}
                subtitle={card.body}
                image={<CardMotif motif={card.motif} />}
              />
            </InView>
          ))}
        </ul>
      </div>
    </InView>
  );
}

function SunMark() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="#C9D32A" aria-hidden="true">
      <circle cx="21" cy="21" r="6" />
      <circle cx="21" cy="7" r="2.6" />
      <circle cx="21" cy="35" r="2.6" />
      <circle cx="7" cy="21" r="2.6" />
      <circle cx="35" cy="21" r="2.6" />
      <circle cx="11" cy="11" r="2.2" />
      <circle cx="31" cy="11" r="2.2" />
      <circle cx="11" cy="31" r="2.2" />
      <circle cx="31" cy="31" r="2.2" />
    </svg>
  );
}

function CardMotif({ motif }: { motif: WhyMotif }) {
  const className = "h-[140px] w-24";

  switch (motif) {
    case "chevrons":
      return (
        <svg className={className} viewBox="0 0 96 140" fill="currentColor" aria-hidden="true">
          <path d="M40 20 68 70 40 120Z" />
          <path d="M64 20 92 70 64 120Z" />
          <path d="M88 20 116 70 88 120Z" />
        </svg>
      );
    case "pixels":
      return (
        <svg className={className} viewBox="0 0 96 140" fill="currentColor" aria-hidden="true">
          <rect x="44" y="14" width="26" height="26" />
          <rect x="70" y="40" width="26" height="26" />
          <rect x="44" y="66" width="26" height="26" />
          <rect x="70" y="92" width="26" height="26" />
          <rect x="70" y="-12" width="26" height="26" />
          <rect x="44" y="118" width="26" height="26" />
        </svg>
      );
    case "diamonds":
      return (
        <svg className={className} viewBox="0 0 96 140" fill="currentColor" aria-hidden="true">
          <path d="M62 14 84 42 62 70 40 42Z" />
          <path d="M62 70 84 98 62 126 40 98Z" />
          <path d="M92 42 114 70 92 98 70 70Z" />
        </svg>
      );
    case "bars":
      return (
        <svg className={className} viewBox="0 0 96 140" fill="currentColor" aria-hidden="true">
          <rect x="44" y="10" width="52" height="22" />
          <rect x="66" y="36" width="30" height="22" />
          <rect x="44" y="62" width="52" height="22" />
          <rect x="78" y="88" width="18" height="22" />
          <rect x="56" y="114" width="40" height="22" />
        </svg>
      );
  }
}
