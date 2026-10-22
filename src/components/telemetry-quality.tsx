import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { SectionHeader, grainCard, sectionPad } from "@/components/guide-ui";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
import { QualityDimensionTabs } from "@/components/telemetry-quality-tabs";
import {
  qualityDimensions,
  qualityGood,
  qualityNext,
  telemetryQualityHero,
} from "@/lib/telemetry-quality";
import { registerOpenTelemetry } from "@/lib/trademarks";

function LinkList({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group text-lg leading-[1.28] font-bold tracking-[-0.01em] text-sunflower"
          >
            <span className="underline-offset-4 group-hover:underline">{link.label}</span>
            <CtaArrow className="ml-1.5 inline-block translate-y-px" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function QualityHero() {
  const { badge, title, lede, sub, cta, score } = telemetryQualityHero;

  return (
    <section
      className="relative flex min-h-[814px] items-center overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[120px] pb-20 max-lg:min-h-0 max-lg:pt-[clamp(7.5rem,13vw,11rem)] max-lg:pb-16 max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="quality-title"
    >
      <HeroBlob variant="guide" />
      <div className="relative z-[1] mx-auto w-full max-w-[1232px] max-[1199px]:pr-[calc(341px-clamp(24px,7.25vw,104px))] max-[767px]:pr-0">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1.5 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/docs/badge-chevrons.svg" alt="" width={14} height={14} />
          {badge}
        </div>
        <h1
          id="quality-title"
          className="ov-blur-rise mt-6 max-w-[728px] text-[clamp(36px,4.45vw,64px)] leading-[1.125] font-bold tracking-[-0.02em] text-mist [animation-delay:0.25s]"
        >
          {title}
        </h1>
        <div className="ov-fade-up mt-4 flex max-w-[698px] flex-col gap-4 text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
          <p>{lede}</p>
          <p>{registerOpenTelemetry(sub)}</p>
        </div>
        <div className="ov-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:0.85s] max-sm:flex-col">
          <GetStartedLink href={cta.href} analytics={{ id: "quality_hero_get_started", section: "hero" }}>
            {cta.label}
          </GetStartedLink>
          <GetStartedLink href={score.href} variant="secondary">
            {score.label}
          </GetStartedLink>
        </div>
      </div>
    </section>
  );
}

export function QualityGood() {
  const [first, ...rest] = qualityGood.paragraphs;

  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="good-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto grid max-w-[1232px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:gap-14">
        <SectionHeader
          id="good-title"
          eyebrow={qualityGood.eyebrow}
          title={
            <>
              Quality is alignment,
              <br />
              not volume
            </>
          }
          lede={first}
          mark={qualityGood.mark}
        >
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-base leading-[1.4] tracking-[0.02em] text-mist">
              {paragraph}
            </p>
          ))}
        </SectionHeader>
        <aside className={`${grainCard} rz-card flex h-max flex-col gap-4`} aria-labelledby="deeper-title">
          <h3 id="deeper-title" className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">
            Go Deeper
          </h3>
          <LinkList links={qualityGood.links} />
        </aside>
      </div>
    </InView>
  );
}

export function QualityDimensions() {
  const { more } = qualityDimensions;

  return (
    <InView
      as="section"
      id="dimensions"
      className={`${sectionPad} relative scroll-mt-24 overflow-hidden`}
      aria-labelledby="dimensions-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <div className="grid items-center gap-10 min-[1200px]:grid-cols-[minmax(0,1fr)_340px]">
          <SectionHeader
            id="dimensions-title"
            eyebrow={qualityDimensions.eyebrow}
            title={qualityDimensions.title}
            lede={qualityDimensions.lede}
            mark={qualityDimensions.mark}
          />
          <aside className={`${grainCard} rz-card flex flex-col gap-4`} aria-labelledby="dimensions-more-title">
            <h3 id="dimensions-more-title" className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">
              {more.title}
            </h3>
            <p className="text-base leading-[1.4] tracking-[0.02em] text-mist/80">{more.body}</p>
            <GetStartedLink href={more.href} fullWidth>
              {more.label}
              <CtaArrow />
            </GetStartedLink>
          </aside>
        </div>
        <QualityDimensionTabs
          items={qualityDimensions.items}
          signsTitle={qualityDimensions.signsTitle}
          learnTitle={qualityDimensions.learnTitle}
          learnIcon={qualityDimensions.learnIcon}
          caseStudyLabel={qualityDimensions.caseStudyLabel}
        />
      </div>
    </InView>
  );
}

export function QualityNext() {
  const { measure, fix } = qualityNext;

  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="next-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <SectionHeader
          id="next-title"
          eyebrow={qualityNext.eyebrow}
          title={<span className="block max-w-[620px]">{qualityNext.title}</span>}
          lede={qualityNext.lede}
          mark={qualityNext.mark}
        />
        <div className="grid grid-cols-2 gap-8 max-[767px]:grid-cols-1 max-[767px]:gap-6">
          {[measure, fix].map((column) => (
            <article key={column.title} className={`${grainCard} rz-card flex flex-col gap-4`}>
              <h3 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{column.title}</h3>
              <p className="text-base leading-[1.5] text-mist/80">{column.body}</p>
              <div className="mt-auto pt-2">
                <LinkList links={column.links} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </InView>
  );
}
