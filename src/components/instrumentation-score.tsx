import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { GitHubMark } from "@/components/company-opensource";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { SectionHeader, grainCard, sectionPad, textLink } from "@/components/guide-ui";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
import { ScoreExampleDemo } from "@/components/instrumentation-score-example";
import { ScoreRulesTable } from "@/components/instrumentation-score-rules";
import { ScoreCategoriesCard } from "@/components/instrumentation-score-scale";
import { ImpactBadge, RuleText, impactDot } from "@/components/instrumentation-score-ui";
import { FinancialStat } from "@/components/financial-stat";
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
  scoreTargets,
} from "@/lib/instrumentation-score";
import { registerOpenTelemetry } from "@/lib/trademarks";

const kicker = "text-[12px] font-bold tracking-[0.1em] text-bitmap-mid uppercase";

function ScoreFormula() {
  const { tag, label, numerator, denominator } = scoreCalculation.formula;
  const op = "text-mist/50";
  const term = (rules: string) => (
    <>
      <span className="text-[1.2em] text-sunflower">Σ</span> <span className={op}>(</span>
      {rules} <span className={op}>×</span> weight<span className={op}>)</span>
    </>
  );

  return (
    <InView
      role="img"
      aria-label={label}
      threshold={0.4}
      className="is-formula flex items-center gap-8 rounded-[20px] border border-bitmap-highlight/28 bg-[#04160a] bg-[radial-gradient(60%_140%_at_50%_0,rgb(209_209_0/0.09),transparent_70%)] px-10 py-7 max-md:flex-col max-md:items-start max-md:gap-4 max-md:p-5"
    >
      <p className="m-0 flex-none text-xs font-bold tracking-[0.1em] text-bitmap-mid uppercase" aria-hidden="true">
        {tag}
      </p>
      <p
        className="m-0 flex flex-auto flex-wrap items-center justify-center gap-x-3.5 gap-y-3 font-mono text-[19px] leading-[1.5] text-mist max-md:justify-start max-md:gap-x-2.5 max-md:gap-y-2 max-md:text-[13px]"
        aria-hidden="true"
      >
        <span className="inline-flex items-center gap-3.5 whitespace-nowrap max-md:gap-2.5">
          <span className="font-bold">Score</span> <span className={op}>=</span>
        </span>
        <span className="inline-flex items-center gap-3.5 whitespace-nowrap max-md:gap-2.5">
          <span className="is-frac relative inline-flex flex-col items-center gap-2.5 max-md:gap-2">
            <span className="whitespace-nowrap">{term(numerator)}</span>
            <span className="whitespace-nowrap text-mist/86">{term(denominator)}</span>
          </span>
          <span>
            <span className={op}>×</span> <span className="text-bitmap-highlight">100</span>
          </span>
        </span>
      </p>
    </InView>
  );
}

export function ScoreHero() {
  const { badge, title, lede, spec, cta, facts } = instrumentationScoreHero;

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
        <ul className="ov-fade-up mt-12 flex max-w-[698px] flex-wrap gap-x-12 gap-y-4 border-t border-dashed border-bitmap-highlight/28 pt-6 text-sm leading-[1.4] text-mist/70 [animation-delay:1s] max-md:mt-9 max-md:gap-x-7">
          {facts.map((fact) => (
            <li key={fact.label} className="max-md:last:basis-full">
              <strong className="mb-0.5 block text-[28px] leading-[1.2] font-bold tracking-[-0.01em] text-sunflower max-md:text-[22px]">
                {fact.value}
              </strong>{" "}
              {fact.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ScoreCalculation() {
  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="calculation-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12 max-lg:gap-10">
        <SectionHeader
          id="calculation-title"
          eyebrow={scoreCalculation.eyebrow}
          title={scoreCalculation.title}
          lede={scoreCalculation.lede}
          mark={scoreCalculation.mark}
        />

        <ol className="grid gap-5 lg:grid-cols-3 lg:gap-8">
          {scoreCalculation.steps.map((step, index) => (
            <li key={step.title} className={`${grainCard} is-step group relative flex flex-col gap-3`}>
              <span
                className="mb-2 grid size-11 place-items-center border border-sunflower/50 bg-sunflower/8 font-mono text-sm font-semibold text-sunflower transition-colors duration-300 group-hover:border-sunflower group-hover:bg-sunflower group-hover:text-forest motion-reduce:transition-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{step.title}</h3>
              <p className="text-base leading-[1.5] text-mist/75">
                <RuleText text={step.body} />
              </p>
            </li>
          ))}
        </ol>

        <ScoreFormula />

        <div className="grid gap-6 lg:grid-cols-2">
          <InView threshold={0.3} className={`${grainCard} is-weights flex flex-col gap-5`}>
            <h3 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{scoreCalculation.weightsTitle}</h3>
            <table className="w-full border-collapse text-left text-[15px] leading-[1.45] text-mist max-md:text-[13.5px]">
              <thead>
                <tr className="text-xs tracking-[0.1em] text-mist/55 uppercase max-md:text-[11px] max-md:tracking-[0.08em]">
                  <th scope="col" className="pr-3 pb-3 font-bold">Impact</th>
                  <th scope="col" className="pr-3 pb-3 font-bold">Weight</th>
                  <th scope="col" className="pr-3 pb-3 font-bold">Rules</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(impactWeights) as [ScoreImpact, number][]).map(([impact, weight], row) => {
                  const count = rulesWithImpact(impact).length;
                  return (
                    <tr key={impact} className="border-t border-mist/8" style={{ "--i": row } as CSSProperties}>
                      <th scope="row" className="py-3.5 pr-3 align-middle">
                        <ImpactBadge impact={impact} />
                      </th>
                      <td className="py-3.5 pr-3 align-middle whitespace-nowrap">
                        <span
                          className="inline-block h-2 w-[clamp(64px,9vw,120px)] overflow-hidden rounded-[4px] bg-white/7 align-middle max-md:w-10"
                          aria-hidden="true"
                        >
                          <span
                            className={`is-wbar block h-full ${impactDot[impact]}`}
                            style={{ width: `${(weight / impactWeights.Critical) * 100}%` }}
                          />
                        </span>
                        <span className="ml-3 inline-block align-middle font-mono text-sm tabular-nums max-md:ml-2 max-md:text-[13px]">
                          {weight}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3 align-middle whitespace-nowrap">
                        <span className="inline-flex max-w-24 flex-wrap gap-[3px] align-middle max-md:max-w-[66px]" aria-hidden="true">
                          {Array.from({ length: count }, (_, index) => (
                            <span
                              key={index}
                              className={`is-sq block size-2 ${impactDot[impact]}`}
                              style={{ "--n": index } as CSSProperties}
                            />
                          ))}
                        </span>
                        <span className="ml-3 inline-block align-middle font-mono text-sm tabular-nums max-md:ml-2 max-md:text-[13px]">
                          {count}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-auto pt-1 text-sm text-mist/65">
              {scoreCalculation.weightsTotal.label}{" "}
              <strong className="font-mono text-sunflower">{scoreCalculation.weightsTotal.points}</strong>{" "}
              {scoreCalculation.weightsTotal.unit}
            </p>
          </InView>

          <ScoreCategoriesCard
            className={grainCard}
            title={scoreCalculation.categoriesTitle}
            categories={scoreCategories}
            ticks={scoreCalculation.scaleTicks}
          />
        </div>

        <aside
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-12 rounded-3xl border border-sunflower/32 bg-[#19321e] bg-[linear-gradient(rgb(0_40_16/0.66),rgb(0_40_16/0.66)),url('/images/texture-grain.png')] bg-repeat [background-size:100%_100%,328px_140px] p-8 transition-[border-color,box-shadow] duration-500 hover:border-sunflower/60 hover:shadow-[0_14px_34px_rgb(0_0_0/0.26)] max-[1199px]:grid-cols-1 max-[1199px]:gap-6 max-md:p-6 motion-reduce:transition-none"
          aria-label="Prior art"
        >
          <p className="max-w-[700px] text-base leading-[1.55] text-mist/86">{scoreCalculation.conformance}</p>
          <ul className="flex max-md:flex-col max-md:gap-3" aria-hidden="true">
            {scoreCalculation.priorArt.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-1 border-l border-dashed border-bitmap-highlight/30 px-6 py-1 max-[1199px]:first:border-l-0 max-[1199px]:first:pl-0 max-md:border-l-2 max-md:border-solid max-md:px-0 max-md:py-0 max-md:pl-3.5 max-md:first:border-l-2 max-md:first:pl-3.5"
              >
                <strong className="text-lg leading-[1.3] font-bold whitespace-nowrap text-mist">{item.name}</strong>
                <span className="text-[13px] whitespace-nowrap text-mist/60">{item.for}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </InView>
  );
}

export function ScoreRules() {
  const { synced } = scoreRulesSection;

  return (
    <InView as="section" id="rules" className={`${sectionPad} scroll-mt-24`} aria-labelledby="rules-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="rules-title"
          eyebrow={scoreRulesSection.eyebrow}
          title={scoreRulesSection.title}
          lede={scoreRulesSection.lede}
          mark={scoreRulesSection.mark}
        >
          <p className="text-sm text-mist/55">
            {synced.label}{" "}
            <a href={synced.href} target="_blank" rel="noopener noreferrer" className={`${textLink} font-mono`}>
              {synced.commit}
            </a>
            ).
          </p>
        </SectionHeader>

        <ScoreRulesTable
          rules={scoreRules}
          impacts={Object.keys(impactWeights) as ScoreImpact[]}
          targets={scoreTargets}
          copy={scoreRulesSection}
        />
      </div>
    </InView>
  );
}

export function ScoreExample() {
  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="example-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="example-title"
          eyebrow={scoreExample.eyebrow}
          title={scoreExample.title}
          lede={scoreExample.lede}
          mark={scoreExample.mark}
        />

        <ScoreExampleDemo example={scoreExample} categories={scoreCategories} />

        <div className="flex max-w-[760px] flex-col gap-3 text-base leading-[1.6] text-mist/80">
          {scoreExample.steps.map((step, index) => (
            <p key={step} className={index === scoreExample.steps.length - 1 ? "font-semibold text-mist" : undefined}>
              {step}
            </p>
          ))}
        </div>
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
          mark={scoreGetYours.mark}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <article className={`${grainCard} flex flex-col gap-4`} aria-labelledby="get-spec-title">
            <p className={kicker}>{spec.kicker}</p>
            <h3 id="get-spec-title" className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.2] font-bold text-mist">
              {spec.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-mist/80">
              <RuleText text={spec.body} />
            </p>
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
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] font-mono text-[13px]" aria-hidden="true">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="text-mist/55">{spec.tree.label}</span>
              </div>
              <ul className="flex flex-col gap-1.5 px-4 py-3 text-mist/80">
                {spec.tree.files.map((file) => (
                  <li key={file.name} className="flex items-center gap-2.5">
                    <span className={`size-2 shrink-0 rounded-[2px] ${impactDot[file.impact]}`} />
                    {file.name}
                  </li>
                ))}
                <li className="text-mist/50">{spec.tree.more}</li>
              </ul>
            </div>
          </article>
          <article className={`${grainCard} flex flex-col gap-4`} aria-labelledby="get-insights-title">
            <p className={kicker}>{insights.kicker}</p>
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
            <Image
              src={insights.shot.src}
              alt={insights.shot.alt}
              width={insights.shot.width}
              height={insights.shot.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-xl border border-white/10"
            />
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
        <SectionHeader
          id="proof-title"
          eyebrow={scoreProof.eyebrow}
          title={scoreProof.title}
          lede={scoreProof.lede}
          mark={scoreProof.mark}
        >
          <Link href={scoreProof.href} className={`${textLink} w-max`}>
            {scoreProof.link} →
          </Link>
        </SectionHeader>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {scoreProof.items.map((item) => (
            <li key={`${item.study}-${item.rules.join()}`} className={`${grainCard} flex flex-col gap-3`}>
              <FinancialStat
                end={item.value}
                suffix={item.suffix}
                sep={false}
                className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-bold tracking-[-0.02em] text-bitmap-highlight tabular-nums"
              />
              <p className="text-[15px] leading-[1.5] text-mist/80">
                <RuleText text={item.label} />
              </p>
              <p className="flex flex-wrap gap-1.5">
                {item.rules.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full border border-mist/20 px-2 py-0.5 font-mono text-[12px] text-mist/80 hover:border-sunflower hover:text-sunflower"
                  >
                    {id}
                    <span className="sr-only"> (show the rule)</span>
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
