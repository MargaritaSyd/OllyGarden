import Link from "next/link";
import { GitHubMark } from "@/components/company-opensource";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { SectionHeader, card, sectionPad, textLink } from "@/components/guide-ui";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
import type { ScoreImpact } from "@/lib/instrumentation-score-rules";
import {
  impactWeights,
  instrumentationScoreHero,
  rulesWithImpact,
  scoreCalculation,
  scoreCategories,
  scoreExample,
  scoreGetYours,
  scoreProof,
  scoreRules,
  scoreRulesSection,
} from "@/lib/instrumentation-score";
import { registerOpenTelemetry } from "@/lib/trademarks";

const impactBadge: Record<ScoreImpact, string> = {
  Critical: "bg-[#d33f3f] text-white",
  Important: "bg-[#e3b23c] text-[#2a1d05]",
  Normal: "bg-mist/15 text-mist",
  Low: "border border-mist/20 text-mist/75",
};

/** Renders the specification's `code` marks as code spans. */
function RuleText({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="font-mono text-[0.92em] text-bitmap-highlight">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function ImpactBadge({ impact }: { impact: ScoreImpact }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] whitespace-nowrap uppercase ${impactBadge[impact]}`}
    >
      {impact}
    </span>
  );
}

export function ScoreHero() {
  const { badge, title, lede, spec, cta } = instrumentationScoreHero;

  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="score-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {badge}
        </div>
        <h1
          id="score-title"
          className="ov-blur-rise mt-5 max-w-[880px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {title}
        </h1>
        <p className="ov-fade-up mt-4 max-w-[760px] text-lg leading-[1.5] text-mist/80 [animation-delay:0.7s]">
          {registerOpenTelemetry(lede)}
        </p>
        <div className="ov-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:0.85s] max-sm:flex-col">
          <GetStartedLink href={cta.href} analytics={{ id: "score_hero_get_score", section: "hero" }}>
            {cta.label}
            <CtaArrow />
          </GetStartedLink>
          <a
            href={spec.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-mist/25 px-[30px] text-base font-semibold text-mist transition-colors hover:border-sunflower hover:text-sunflower max-sm:w-full max-sm:max-w-[340px]"
          >
            <GitHubMark />
            {spec.label}
          </a>
        </div>
      </div>
    </section>
  );
}

export function ScoreCalculation() {
  return (
    <InView as="section" className={sectionPad} aria-labelledby="calculation-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12">
        <SectionHeader
          id="calculation-title"
          eyebrow={scoreCalculation.eyebrow}
          title={scoreCalculation.title}
          lede={scoreCalculation.lede}
        />

        <ol className="grid gap-4 md:grid-cols-3">
          {scoreCalculation.steps.map((step, index) => (
            <li key={step.title} className={`${card} flex flex-col gap-2`}>
              <span className="font-mono text-sm font-bold text-bitmap-mid">0{index + 1}</span>
              <h3 className="text-lg font-bold text-mist">{step.title}</h3>
              <p className="text-[15px] leading-[1.6] text-mist/75">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="rounded-2xl border border-white/10 bg-[#0d1117] px-5 py-4 text-center font-mono text-[clamp(0.85rem,1.6vw,1.05rem)] leading-[1.6] text-bitmap-highlight">
          {scoreCalculation.formula}
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={card}>
            <h3 className="text-lg font-bold text-mist">{scoreCalculation.weightsTitle}</h3>
            <table className="mt-4 w-full text-left text-[15px] text-mist/80">
              <thead>
                <tr className="border-b border-mist/12 text-[12px] tracking-[0.08em] text-mist/55 uppercase">
                  <th scope="col" className="py-2 pr-3 font-bold">Impact</th>
                  <th scope="col" className="py-2 pr-3 font-bold">Weight</th>
                  <th scope="col" className="py-2 font-bold">Rules</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(impactWeights) as [ScoreImpact, number][]).map(([impact, weight]) => (
                  <tr key={impact} className="border-b border-mist/8 last:border-0">
                    <th scope="row" className="py-2.5 pr-3 font-normal">
                      <ImpactBadge impact={impact} />
                    </th>
                    <td className="py-2.5 pr-3 font-mono text-mist">{weight}</td>
                    <td className="py-2.5">{rulesWithImpact(impact).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={card}>
            <h3 className="text-lg font-bold text-mist">{scoreCalculation.categoriesTitle}</h3>
            <table className="mt-4 w-full text-left text-[15px] text-mist/80">
              <thead>
                <tr className="border-b border-mist/12 text-[12px] tracking-[0.08em] text-mist/55 uppercase">
                  <th scope="col" className="py-2 pr-3 font-bold">Score</th>
                  <th scope="col" className="py-2 pr-3 font-bold">Category</th>
                  <th scope="col" className="py-2 font-bold max-sm:sr-only">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {scoreCategories.map((category) => (
                  <tr key={category.name} className="border-b border-mist/8 align-top last:border-0">
                    <td className="py-2.5 pr-3 font-mono whitespace-nowrap text-mist">{category.range}</td>
                    <th scope="row" className="py-2.5 pr-3 font-semibold text-mist">
                      {category.name}
                    </th>
                    <td className="py-2.5 max-sm:sr-only">{category.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="max-w-[760px] text-base leading-[1.6] text-mist/75">{scoreCalculation.conformance}</p>
      </div>
    </InView>
  );
}

export function ScoreRules() {
  return (
    <InView as="section" id="rules" className={`${sectionPad} scroll-mt-24`} aria-labelledby="rules-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="rules-title"
          eyebrow={scoreRulesSection.eyebrow}
          title={scoreRulesSection.title}
          lede={scoreRulesSection.lede}
        >
          <p className="text-sm text-mist/55">{scoreRulesSection.synced}</p>
        </SectionHeader>

        <div className="relative overflow-x-auto rounded-2xl border border-sunflower/25 bg-[#002810]">
          <table className="w-full min-w-[760px] text-left text-[15px] text-mist/80">
            <caption className="sr-only">
              Instrumentation Score rules with their target, impact level, weight, and rationale
            </caption>
            <thead>
              <tr className="border-b border-mist/12 text-[12px] tracking-[0.08em] text-mist/55 uppercase">
                <th scope="col" className="px-5 py-3 font-bold">Rule</th>
                <th scope="col" className="px-3 py-3 font-bold">Applies to</th>
                <th scope="col" className="px-3 py-3 font-bold">Impact</th>
                <th scope="col" className="px-5 py-3 font-bold">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {scoreRules.map((rule) => (
                <tr key={rule.id} id={rule.id} className="scroll-mt-24 border-b border-mist/8 align-top last:border-0">
                  <th scope="row" className="w-[34%] px-5 py-4 font-normal">
                    <a
                      href={rule.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-bold text-sunflower underline-offset-2 hover:underline"
                    >
                      {rule.id}
                    </a>
                    <span className="sr-only">: </span>
                    <span className="mt-1 block leading-[1.5] text-mist">
                      <RuleText text={rule.description} />
                    </span>
                    {rule.criteriaDefined ? null : (
                      <span className="mt-1 block text-[13px] text-mist/55">{scoreRulesSection.pending}</span>
                    )}
                  </th>
                  <td className="px-3 py-4 whitespace-nowrap">{rule.target}</td>
                  <td className="px-3 py-4">
                    <ImpactBadge impact={rule.impact} />
                    <span className="mt-1 block font-mono text-[13px] text-mist/55">
                      <span className="sr-only">weight </span>
                      {rule.weight} pts
                    </span>
                  </td>
                  <td className="px-5 py-4 leading-[1.5]">
                    {rule.why}
                    {rule.postHref ? (
                      <>
                        {" "}
                        <Link href={rule.postHref} className={`${textLink} whitespace-nowrap`}>
                          {scoreRulesSection.howTo} →
                        </Link>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InView>
  );
}

export function ScoreExample() {
  return (
    <InView as="section" className={sectionPad} aria-labelledby="example-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="example-title"
          eyebrow={scoreExample.eyebrow}
          title={scoreExample.title}
          lede={scoreExample.lede}
        />

        <figure className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0d1117] p-[clamp(1.25rem,3vw,2rem)] lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <p className="text-[12px] font-bold tracking-[0.1em] text-mist/55 uppercase">
              service.name = <span className="font-mono text-bitmap-highlight normal-case">{scoreExample.service}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {scoreExample.findings.map(({ rule, finding }) => (
                <li key={rule.id} className="rounded-[14px] border border-[#384038] bg-[#161b22] px-4 py-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <a href={`#${rule.id}`} className="font-mono text-sm font-bold text-sunflower underline-offset-2 hover:underline">
                      {rule.id}
                    </a>
                    <ImpactBadge impact={rule.impact} />
                    <span className="ml-auto font-mono text-sm text-mist/60">−{rule.weight} pts</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-[1.5] text-mist/80">{finding}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-sunflower/30 bg-[#002810] p-6 text-center">
            <p className="text-sm font-bold tracking-[0.1em] text-mist/60 uppercase">Instrumentation Score</p>
            <p className="mt-2 text-[clamp(3.5rem,8vw,4.5rem)] leading-none font-bold tracking-[-0.03em] text-bitmap-highlight tabular-nums">
              {scoreExample.score}
            </p>
            <p className="mt-2 text-lg font-semibold text-bitmap-highlight">{scoreExample.category}</p>
            <p className="mt-4 font-mono text-[13px] leading-[1.6] text-mist/65">{scoreExample.math}</p>
          </div>
          <figcaption className="flex flex-col gap-3 text-base leading-[1.6] text-mist/80 lg:col-span-2">
            {scoreExample.steps.map((step) => (
              <span key={step} className="block">
                {step}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </InView>
  );
}

export function ScoreGetYours() {
  const { spec, insights } = scoreGetYours;

  return (
    <InView as="section" className={sectionPad} aria-labelledby="get-score-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="get-score-title"
          eyebrow={scoreGetYours.eyebrow}
          title={scoreGetYours.title}
          lede={scoreGetYours.lede}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <article className={`${card} flex flex-col gap-4`} aria-labelledby="get-spec-title">
            <h3 id="get-spec-title" className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.2] font-bold text-mist">
              {spec.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-mist/80">{spec.body}</p>
            <ul className="mt-auto flex flex-col gap-2 text-[15px]">
              <li>
                <a href={spec.href} target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex items-center gap-2`}>
                  <GitHubMark />
                  {spec.link}
                </a>
              </li>
              <li>
                <a href={spec.slackHref} target="_blank" rel="noopener noreferrer" className={textLink}>
                  {spec.slackLabel} →
                </a>
              </li>
            </ul>
          </article>
          <article className={`${card} flex flex-col gap-4`} aria-labelledby="get-insights-title">
            <h3 id="get-insights-title" className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.2] font-bold text-mist">
              {insights.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-mist/80">{insights.body}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              <GetStartedLink href={insights.href} analytics={{ id: "score_get_yours_insights", section: "get_score" }}>
                {insights.cta}
              </GetStartedLink>
              <Link href={insights.productHref} className={`${textLink} text-[15px]`}>
                {insights.link} →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </InView>
  );
}

export function ScoreProof() {
  return (
    <InView as="section" className={sectionPad} aria-labelledby="proof-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader id="proof-title" eyebrow={scoreProof.eyebrow} title={scoreProof.title} lede={scoreProof.lede}>
          <Link href={scoreProof.href} className={`${textLink} w-max`}>
            {scoreProof.link} →
          </Link>
        </SectionHeader>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {scoreProof.items.map((item) => (
            <li key={`${item.study}-${item.rules.join()}`} className={`${card} flex flex-col gap-3`}>
              <p className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-bold tracking-[-0.02em] text-bitmap-highlight">
                {item.value}
              </p>
              <p className="text-[15px] leading-[1.5] text-mist/80">{item.label}</p>
              <p className="flex flex-wrap gap-1.5">
                {item.rules.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full border border-mist/20 px-2 py-0.5 font-mono text-[12px] text-mist/80 hover:border-sunflower hover:text-sunflower"
                  >
                    {id}
                  </a>
                ))}
              </p>
              <Link href={item.href} className={`${textLink} mt-auto text-sm`}>
                Read the case study →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}
