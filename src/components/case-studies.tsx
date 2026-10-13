import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { HeroBlob } from "@/components/hero-blob";
import { PetalMark } from "@/components/blog-ui";
import { Fragment, type ReactNode } from "react";
import {
  anonymizedNotice,
  caseStudies,
  caseStudiesHero,
  caseStudiesPromise,
  caseStudyGuide,
  caseStudyHref,
  type CaseStudy,
} from "@/lib/case-studies";
import { registerOpenTelemetry } from "@/lib/trademarks";

export function CaseStudiesHero() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="case-studies-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <PetalMark size={14} className="text-sunflower" />
          {caseStudiesHero.badge}
        </div>
        <h1
          id="case-studies-title"
          className="ov-blur-rise mt-5 max-w-[820px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {caseStudiesHero.title}
        </h1>
        <p className="ov-fade-up mt-3 max-w-[704px] text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
          {registerOpenTelemetry(caseStudiesHero.lede)}
        </p>
      </div>
    </section>
  );
}

export function CaseStudiesList() {
  return (
    <section
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-label="Case studies"
    >
      <div className="mx-auto flex max-w-[1232px] flex-col gap-[clamp(1.75rem,4vw,3rem)]">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
        <div className="max-w-[820px] pt-[clamp(1rem,3vw,2rem)]">
          <h2 className="pr-h2">{caseStudiesPromise.title}</h2>
          <ul className="pr-list mt-5">
            {caseStudiesPromise.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <GuideLine />
        </div>
      </div>
    </section>
  );
}

/** Sunflower-bordered card that is a link as a whole, used by case studies, press releases, and the resources hub. */
export const linkedCardClassName =
  "group surface-grain relative overflow-hidden rounded-3xl border border-sunflower/40 bg-[#00280e] p-[clamp(1.25rem,2.6vw,2rem)] transition-[border-color] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-sunflower/60 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-white/[0.06] after:opacity-0 after:transition-opacity after:duration-250 hover:after:opacity-100 max-[767px]:rounded-[20px]";

/** A linked summary card; also usable as a proof point on solution pages. */
function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={caseStudyHref(study.slug)}
      className={`block ${linkedCardClassName}`}
    >
      <MetaRow
        className="text-mist/60"
        kicker={study.industry}
        items={[
          study.region,
          anonymizedNotice.label,
          ...(study.audio ? ["Audio episode"] : []),
        ]}
      />
      <h2 className="mt-3.5 max-w-[1000px] text-[clamp(1.375rem,3.2vw,2rem)] leading-[1.28] font-bold text-mist max-[767px]:leading-[1.24]">
        {study.title}
      </h2>
      <p className="mt-4 max-w-[900px] text-base leading-[1.4] text-mist/80">
        {study.summary}
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
        {study.stats.slice(0, 3).map((stat) => (
          <li key={stat.label} className="flex items-baseline gap-2">
            <span className="text-[28px] leading-none font-bold tracking-[-0.02em] text-sunflower">
              {stat.value}
            </span>
            <span className="text-sm text-mist/70">{stat.label}</span>
          </li>
        ))}
      </ul>
      <span className="mt-[clamp(1.25rem,2.6vw,1.75rem)] inline-flex items-center gap-2 text-lg leading-[25px] font-medium text-sunflower transition-colors group-hover:text-bitmap-highlight">
        <span className="underline underline-offset-2">Read the story</span>
        <CtaArrow />
      </span>
    </Link>
  );
}

/** Case studies shown as proof points on another page: every study, or one industry's. */
export function CaseStudyProof({ industry }: { industry?: string }) {
  const studies = industry
    ? caseStudies.filter((study) => study.industry === industry)
    : caseStudies;
  if (studies.length === 0) return null;

  return (
    <section
      aria-labelledby="case-study-proof"
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3rem,6vw,5rem)] max-[880px]:px-6"
    >
      <div className="mx-auto max-w-[1232px]">
        <p
          id="case-study-proof"
          className="mb-5 text-sm leading-5 font-semibold tracking-[0.08em] text-bitmap-mid uppercase"
        >
          From the field
        </p>
        <div className="flex flex-col gap-[clamp(1.25rem,3vw,2rem)]">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <GuideLine />
      </div>
    </section>
  );
}

/** A server-rendered link to the telemetry quality guide. */
function GuideLine() {
  return (
    <p className="mt-6 text-base leading-[1.5] text-mist/75">
      {caseStudyGuide.text}{" "}
      <Link
        href={caseStudyGuide.href}
        className="font-semibold text-sunflower underline-offset-2 hover:underline"
      >
        {caseStudyGuide.link} →
      </Link>
    </p>
  );
}

/** A kicker followed by dot-separated items, as plain text in the Markdown version too. */
export function MetaRow({
  kicker,
  items,
  className = "",
}: {
  kicker: string;
  items: readonly ReactNode[];
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-3 text-sm leading-5 ${className}`}
    >
      <span className="font-semibold tracking-[0.08em] text-bitmap-mid uppercase">
        {kicker}
      </span>
      {items.map((item, index) => (
        <Fragment key={index}>
          <span className="text-[#96a495]/50">{" · "}</span>
          <span>{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
