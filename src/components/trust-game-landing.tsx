import { FaqAccordion } from "@/components/faq-accordion";
import { PageBody, PageHero } from "@/components/page-hero";
import { QuizHeroDeco } from "@/components/quiz-hero-deco";
import { SiteCta } from "@/components/site-cta";
import { TrustGame } from "@/components/trust-game";
import { TrustGameCards } from "@/components/trust-game-cards";
import { TrustGameCta } from "@/components/trust-game-cta";
import {
  trustGameCta,
  trustGameFaq,
  trustGameHero,
  trustGamePractice,
} from "@/lib/trust-game/copy";
import { trustRoundSize, trustTierRange, trustTiers } from "@/lib/trust-game/score";

export function TrustGameLanding({ sharedScore }: { sharedScore?: number }) {
  return (
    <>
      <PageHero
        className="quiz-hero"
        decoration={<QuizHeroDeco />}
        aside={<TrustGameCards />}
        eyebrow={<TrustEyebrow />}
        titleId="trust-game-title"
        title={trustGameHero.title}
        lede={trustGameHero.lede}
      >
        <TrustGameCta />
      </PageHero>
      <PageBody width="wide">
        <TrustGame sharedScore={sharedScore} />
        <section className="mx-auto mt-[clamp(3rem,6vw,5rem)]" aria-labelledby="trust-practice">
          <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">{trustGamePractice.eyebrow}</p>
          <h2 id="trust-practice" className="mt-3 text-3xl font-bold text-mist">
            {trustGamePractice.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-mist/70">{trustGamePractice.lede}</p>
          <ul className="mt-8 grid grid-cols-1 gap-4 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-3">
            {trustGamePractice.topics.map((topic, index) => (
              <li
                key={topic.title}
                className="surface-grain rounded-2xl border border-sunflower/32 bg-[#002810] p-6 transition-colors hover:border-sunflower/60"
              >
                <span className="text-sm font-bold text-sunflower">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg leading-snug font-bold text-mist">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist/70">{topic.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-base leading-7 text-mist/70">
            <b className="text-mist">{trustGamePractice.provenanceLead}</b> {trustGamePractice.provenance}
          </p>
          <div className="mt-10">
            <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Where will you land?</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {trustTiers.map((tier, index) => (
                <li key={tier.name} className="rounded-2xl border border-mist/10 px-4 py-3">
                  <span className="text-xl" aria-hidden="true">
                    {tier.emoji}
                  </span>
                  <span className="mt-2 block font-semibold text-mist">{tier.name}</span>
                  <span className="text-sm text-mist/60">
                    {trustTierRange(index)}/{trustRoundSize}
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
