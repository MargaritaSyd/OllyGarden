import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { PageBody, PageHero } from "@/components/page-hero";
import { QuizHeroDeco } from "@/components/quiz-hero-deco";
import { SiteCta } from "@/components/site-cta";
import { TrustGame, TrustNotice } from "@/components/trust-game";
import { TrustGameCards } from "@/components/trust-game-cards";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameGraph } from "@/lib/structured-data";
import { registerOpenTelemetry } from "@/lib/trademarks";
import { trustGameFaq, trustGameHero, trustGameMeta, trustGamePractice } from "@/lib/trust-game/content";
import { trustGameDeckSize, trustGameTierStops } from "@/lib/trust-game/score";
import "@/components/trust-game.css";

const trustGameCta = {
  title: ["Turn OpenTelemetry knowledge", "into better instrumentation"],
  sub: "OllyGarden Insights scores the telemetry you already send, and Rose fixes it at the source.",
  primary: {
    label: "Explore OllyGarden Insights",
    href: "/products/insights",
    className: "hover:!bg-mist",
  },
  secondary: { label: "Meet OllyGarden Rose", href: "/products/rose" },
} as const;

export const metadata = createPageMetadata({
  title: trustGameMeta.title,
  description: trustGameMeta.description,
  path: trustGameMeta.path,
});

export default function TrustGamePage() {
  const stops = trustGameTierStops(trustGameDeckSize);

  return (
    <>
      <JsonLd data={trustGameGraph()} />
      <PageHero
        className="quiz-hero"
        decoration={<QuizHeroDeco />}
        aside={<TrustGameCards />}
        eyebrow={<TrustEyebrow />}
        titleId="trust-title"
        title={trustGameHero.title}
        lede={registerOpenTelemetry(trustGameHero.lede)}
      >
        <a
          href="#trust-game"
          className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-8 text-base font-medium text-forest transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]"
        >
          Play Now
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="motion-safe:group-hover:translate-y-0.5">
            <path
              d="M8 2v11M3.5 8.5 8 13l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </PageHero>
      <PageBody wide>
        <div id="trust-game">
          <TrustGame mode="web" />
        </div>
        <section className="mt-[clamp(3rem,6vw,5rem)]" aria-labelledby="trust-practice">
          <p className="text-xs font-bold tracking-[.15em] text-sunflower uppercase">{trustGamePractice.eyebrow}</p>
          <h2 id="trust-practice" className="mt-3 text-3xl font-bold text-mist">
            {trustGamePractice.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-mist/70">{trustGamePractice.lede}</p>
          <ul className="tg-practice-grid">
            {trustGamePractice.skills.map((skill, index) => (
              <li key={skill.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{skill.label}</h3>
                <p>{skill.description}</p>
              </li>
            ))}
          </ul>
          <TrustNotice className="tg-provenance" />
          <div className="tg-tiers">
            <p className="text-xs font-bold tracking-[.15em] text-sunflower uppercase">Where will you land?</p>
            <ul className="tg-tier-list">
              {[...stops].reverse().map((stop) => (
                <li key={stop.tier.id}>
                  <span className="tg-tier-emoji" aria-hidden="true">
                    {stop.tier.emoji}
                  </span>
                  <span className="tg-tier-name">{stop.tier.name}</span>
                  <span className="tg-tier-range">
                    {stop.low === stop.high ? stop.low : `${stop.low}–${stop.high}`}
                    <span>/{trustGameDeckSize}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PageBody>
      <FaqAccordion content={trustGameFaq} />
      <SiteCta content={trustGameCta} />
    </>
  );
}

function TrustEyebrow() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sunflower/35 bg-[#082312]/80 px-3 py-1 text-xs font-bold tracking-[0.14em] text-bitmap-highlight normal-case">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <path
          d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {trustGameHero.eyebrow}
    </span>
  );
}
