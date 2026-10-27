import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { PageBody, PageHero } from "@/components/page-hero";
import { TrustGame, TrustNotice } from "@/components/trust-game";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameGraph } from "@/lib/structured-data";
import { registerOpenTelemetry } from "@/lib/trademarks";
import {
  trustGameFaq,
  trustGameHero,
  trustGameHowItWorks,
  trustGameMeta,
  trustGamePractice,
} from "@/lib/trust-game/content";
import { trustGameDeckSize, trustGameTierStops } from "@/lib/trust-game/score";
import "@/components/trust-game.css";

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
        eyebrow={<TrustEyebrow />}
        titleId="trust-title"
        title={<TrustTitle title={trustGameHero.title} />}
        lede={registerOpenTelemetry(trustGameHero.lede)}
      >
        <a
          href="#trust-game"
          className="inline-flex h-12 items-center rounded-xl bg-sunflower px-6 font-semibold text-forest"
        >
          Start the game
        </a>
      </PageHero>
      <PageBody wide>
        <div id="trust-game">
          <TrustGame mode="web" />
        </div>
        <section className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-3xl" aria-labelledby="trust-how">
          <h2 id="trust-how" className="text-3xl font-bold text-mist">
            {trustGameHowItWorks.title}
          </h2>
          <ol className="tg-how">
            {trustGameHowItWorks.steps.map((step, index) => (
              <li key={step.title} className="tg-how-step">
                <span className="tg-how-num">0{index + 1}</span>
                <div>
                  <p className="tg-how-title">{step.title}</p>
                  <p className="tg-how-desc">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-[clamp(3rem,6vw,5rem)]" aria-labelledby="trust-practice">
          <h2 id="trust-practice" className="text-3xl font-bold text-mist">
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
          <div className="tg-tiers">
            <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Where will you land?</p>
            <ul className="tg-tier-list">
              {stops.map((stop) => (
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
          <TrustNotice className="tg-provenance" />
        </section>
      </PageBody>
      <FaqAccordion content={trustGameFaq} />
    </>
  );
}

function TrustTitle({ title }: { title: string }) {
  const parts = title.split(/(trust)/i);
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === "trust" ? (
          <span key={index} className="text-sunflower">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function TrustEyebrow() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sunflower/35 bg-[#082312]/80 px-3 py-1 text-xs font-bold tracking-[0.14em] text-bitmap-highlight normal-case">
      {trustGameHero.eyebrow}
    </span>
  );
}
