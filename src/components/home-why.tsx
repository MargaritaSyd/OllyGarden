import { ContentCard } from "@/components/content-card";
import { HomeWhyFx } from "@/components/home-why-fx";
import { InView } from "@/components/in-view";
import { homeWhy, type WhyMotif } from "@/lib/home";

// Positions and drift match the reference `.why-bg`: two lime glows and six
// squares, measured from the section, not the centred column.
const SQUARES = [
  { parallax: "0.18", color: "#D9E533", opacity: 0.5, style: { top: 120, left: 640 } },
  { parallax: "-0.14", color: "#6A7A2A", opacity: 0.3, style: { top: 250, right: 90 } },
  { parallax: "0.1", color: "#E3E270", opacity: 0.6, style: { top: 520, right: 560 } },
  { parallax: "-0.2", color: "#CDDC29", opacity: 0.4, style: { bottom: 150, right: 150 } },
  {
    parallax: "0.15",
    color: "#D9E533",
    opacity: 0.35,
    size: 32,
    style: { bottom: 90, left: 430 },
  },
  {
    parallax: "-0.09",
    color: "#A7B93B",
    opacity: 0.3,
    size: 32,
    style: { top: 340, left: 60 },
  },
] as const;

const CARD_PARALLAX = ["-0.08", "0.12", "-0.1", "0.07"] as const;

export function HomeWhy() {
  return (
    <InView
      as="section"
      data-why=""
      aria-labelledby="why-title"
      className="relative overflow-hidden"
    >
      <HomeWhyFx />
      <div className="why-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="why-blob why-blob-a" data-parallax="-0.12" />
        <div className="why-blob why-blob-b" data-parallax="0.09" />
        {SQUARES.map((square) => (
          <div
            key={square.parallax}
            className="why-px"
            data-parallax={square.parallax}
            style={{
              backgroundColor: square.color,
              opacity: square.opacity,
              width: "size" in square ? square.size : undefined,
              height: "size" in square ? square.size : undefined,
              ...square.style,
            }}
          />
        ))}
      </div>
      <div className="relative z-[1] mx-auto grid w-full max-w-[1328px] items-center gap-12 px-6 py-24 sm:px-12 lg:grid-cols-[minmax(0,560px)_minmax(0,576px)] lg:gap-[86px] lg:py-[130px]">
        <div className="why-copy relative" data-parallax="0.05">
          <SunMark />
          <p className="mt-7 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {homeWhy.eyebrow}
          </p>
          <h2
            id="why-title"
            className="mt-5 text-[clamp(2rem,4vw,3.375rem)] leading-[1.16] font-bold tracking-[-0.02em] text-mist"
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

        {/* 52px plus the 132px card gives the Figma 185px pitch. */}
        <ul className="relative flex flex-col gap-8 lg:gap-[52px]">
          {homeWhy.cards.map((card, index) => (
            <InView
              as="li"
              mark="rv-in"
              key={card.title}
              className="why-card-wrap"
              data-parallax={CARD_PARALLAX[index]}
            >
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
  // Fills the card height; the shapes past x=96 bleed off the card edge as in Figma.
  const className = "h-full w-auto";

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
