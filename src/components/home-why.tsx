import { ContentCard } from "@/components/content-card";
import { InView } from "@/components/in-view";
import { homeWhy, type WhyMotif } from "@/lib/home";

// Figma 1:215: two soft lime glows and six scattered pixel squares sit behind
// the copy and the card column. Offsets are measured from the centred 1328px
// container (the frame's 56px side margins removed) so they track the content
// instead of the viewport, and the layer only renders from xl up, where the
// gutters are wide enough that nothing lands on the copy.
const GLOWS = [
  { size: 560, blur: 109, style: { top: 20, right: 4 } },
  { size: 460, blur: 169, style: { bottom: -120, right: 424 } },
] as const;

const SQUARES = [
  { size: 48, color: "#d9e533", opacity: 0.5, style: { top: 120, left: 584 } },
  { size: 48, color: "#6a7a2a", opacity: 0.3, style: { top: 250, right: 34 } },
  { size: 48, color: "#e3e270", opacity: 0.6, style: { top: 520, right: 504 } },
  { size: 48, color: "#cddc29", opacity: 0.4, style: { bottom: 150, right: 94 } },
  { size: 32, color: "#d9e533", opacity: 0.35, style: { bottom: 90, left: 374 } },
  { size: 32, color: "#a7b93b", opacity: 0.3, style: { top: 340, left: 4 } },
] as const;

export function HomeWhy() {
  return (
    <InView as="section" aria-labelledby="why-title" className="relative lg:overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-[1328px] items-center gap-12 px-6 py-24 sm:px-12 lg:grid-cols-[minmax(0,560px)_minmax(0,576px)] lg:gap-[86px] lg:py-[130px]">
        <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
          {GLOWS.map((glow, index) => (
            <span
              key={index}
              className="absolute rounded-full bg-[#d9e533] opacity-[0.07]"
              style={{
                width: glow.size,
                height: glow.size,
                filter: `blur(${glow.blur}px)`,
                ...glow.style,
              }}
            />
          ))}
          {SQUARES.map((square, index) => (
            <span
              key={index}
              className="absolute"
              style={{
                width: square.size,
                height: square.size,
                backgroundColor: square.color,
                opacity: square.opacity,
                ...square.style,
              }}
            />
          ))}
        </div>

        <div className="why-copy relative">
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
