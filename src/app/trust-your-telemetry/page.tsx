import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { PageBody, PageHero } from "@/components/page-hero";
import { TrustGame, TrustNotice } from "@/components/trust-game";
import { mono } from "@/components/trust-game-panels";
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

export const metadata = createPageMetadata({
  title: trustGameMeta.title,
  description: trustGameMeta.description,
  path: trustGameMeta.path,
});

export default function TrustGamePage() {
  return (
    <>
      <JsonLd data={trustGameGraph()} />
      <PageHero
        eyebrow={trustGameHero.eyebrow}
        titleId="trust-title"
        title={trustGameHero.title}
        lede={registerOpenTelemetry(trustGameHero.lede)}
      />
      <PageBody wide>
        <TrustGame mode="web" />
        <TrustNotice className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/10 px-5 py-4" />
        <section className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-3xl" aria-labelledby="trust-how">
          <h2 id="trust-how" className="text-3xl font-bold text-mist">
            {trustGameHowItWorks.title}
          </h2>
          <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {trustGameHowItWorks.steps.map((step, index) => (
              <li key={step.title}>
                <p className="font-semibold text-mist">
                  <span className={`mr-2 text-sm text-bitmap-mid ${mono}`}>
                    0{index + 1}
                  </span>{" "}
                  {step.title}
                </p>
                <p className="mt-1 leading-7 text-mist/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-3xl" aria-labelledby="trust-practice">
          <h2 id="trust-practice" className="text-3xl font-bold text-mist">
            {trustGamePractice.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-mist/70">{trustGamePractice.lede}</p>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {trustGamePractice.skills.map((skill) => (
              <div key={skill.label}>
                <dt className="font-semibold text-mist">{skill.label}</dt>
                <dd className="mt-1 leading-7 text-mist/70">{skill.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </PageBody>
      <FaqAccordion content={trustGameFaq} />
    </>
  );
}
