import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { SectionHeader, card, sectionPad, textLink } from "@/components/guide-ui";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
import {
  qualityDimensions,
  qualityGood,
  qualityNext,
  telemetryQualityHero,
} from "@/lib/telemetry-quality";
import { registerOpenTelemetry } from "@/lib/trademarks";

/** Renders `code` marks as code spans. */
function CodeText({ text }: { text: string }) {
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

function LinkList({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-col gap-2 text-[15px]">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={textLink}>
            {link.label} →
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
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="quality-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {badge}
        </div>
        <h1
          id="quality-title"
          className="ov-blur-rise mt-5 max-w-[880px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {title}
        </h1>
        <p className="ov-fade-up mt-4 max-w-[760px] text-lg leading-[1.5] text-mist/90 [animation-delay:0.7s]">
          {lede}
        </p>
        <p className="ov-fade-up mt-4 max-w-[760px] text-base leading-[1.6] text-mist/70 [animation-delay:0.75s]">
          {registerOpenTelemetry(sub)}
        </p>
        <div className="ov-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:0.85s] max-sm:flex-col">
          <GetStartedLink href={cta.href} analytics={{ id: "quality_hero_get_started", section: "hero" }}>
            {cta.label}
            <CtaArrow />
          </GetStartedLink>
          <Link
            href={score.href}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-mist/25 px-[30px] text-base font-semibold text-mist transition-colors hover:border-sunflower hover:text-sunflower max-sm:w-full max-sm:max-w-[340px]"
          >
            {score.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function QualityGood() {
  const [first, ...rest] = qualityGood.paragraphs;

  return (
    <InView as="section" className={sectionPad} aria-labelledby="good-title">
      <div className="mx-auto grid max-w-[1232px] gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <SectionHeader id="good-title" eyebrow={qualityGood.eyebrow} title={qualityGood.title} lede={first}>
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-base leading-[1.6] text-mist/75">
              {paragraph}
            </p>
          ))}
        </SectionHeader>
        <aside className={`${card} flex h-max flex-col gap-4 lg:mt-10`} aria-label="Further reading">
          <p className="text-sm font-bold tracking-[0.1em] text-mist/60 uppercase">Go deeper</p>
          <LinkList links={qualityGood.links} />
        </aside>
      </div>
    </InView>
  );
}

export function QualityDimensions() {
  return (
    <InView as="section" id="dimensions" className={`${sectionPad} scroll-mt-24`} aria-labelledby="dimensions-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader
          id="dimensions-title"
          eyebrow={qualityDimensions.eyebrow}
          title={qualityDimensions.title}
          lede={qualityDimensions.lede}
        >
          <nav aria-label="Dimensions">
            <ol className="flex flex-wrap gap-2">
              {qualityDimensions.items.map((dimension, index) => (
                <li key={dimension.id}>
                  <a
                    href={`#${dimension.id}`}
                    className="inline-block rounded-full border border-mist/20 px-3 py-1 text-sm text-mist/80 hover:border-sunflower hover:text-sunflower"
                  >
                    {index + 1}. {dimension.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Link href={qualityDimensions.caseStudiesHref} className={`${textLink} w-max`}>
            {qualityDimensions.caseStudiesLink} →
          </Link>
        </SectionHeader>

        <ol className="flex flex-col gap-6">
          {qualityDimensions.items.map((dimension, index) => (
            <li
              key={dimension.id}
              id={dimension.id}
              className={`${card} grid scroll-mt-24 gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]`}
            >
              <article className="flex flex-col gap-3" aria-labelledby={`${dimension.id}-title`}>
                <span className="font-mono text-sm font-bold text-bitmap-mid">0{index + 1}</span>
                <h3
                  id={`${dimension.id}-title`}
                  className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.2] font-bold text-mist"
                >
                  {dimension.name}
                </h3>
                <p className="text-lg leading-[1.45] font-semibold text-bitmap-highlight">{dimension.question}</p>
                <p className="text-[15px] leading-[1.6] text-mist/80">
                  <CodeText text={dimension.body} />
                </p>
                <div className="mt-auto pt-2">
                  <LinkList links={dimension.links} />
                </div>
              </article>
              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-[12px] font-bold tracking-[0.1em] text-mist/55 uppercase">
                    {qualityDimensions.signsTitle}
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-[1.5] text-mist/80">
                    {dimension.signs.map((sign) => (
                      <li key={sign} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sunflower" />
                        <span>
                          <CodeText text={sign} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className="rounded-[14px] border border-[#384038] bg-[#0d1117] px-4 py-3">
                  <p className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-bold tracking-[-0.02em] text-bitmap-highlight">
                    {dimension.proof.value}
                  </p>
                  <figcaption className="mt-2 text-[15px] leading-[1.5] text-mist/80">
                    {dimension.proof.label}{" "}
                    <Link href={dimension.proofHref} className={`${textLink} whitespace-nowrap`}>
                      Case study →
                    </Link>
                  </figcaption>
                </figure>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </InView>
  );
}

export function QualityNext() {
  const { measure, fix } = qualityNext;

  return (
    <InView as="section" className={sectionPad} aria-labelledby="next-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-10">
        <SectionHeader id="next-title" eyebrow={qualityNext.eyebrow} title={qualityNext.title} lede={qualityNext.lede} />
        <div className="grid gap-6 lg:grid-cols-2">
          {[measure, fix].map((column) => (
            <article key={column.title} className={`${card} flex flex-col gap-4`}>
              <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.2] font-bold text-mist">{column.title}</h3>
              <p className="text-[15px] leading-[1.6] text-mist/80">{column.body}</p>
              <div className="mt-auto">
                <LinkList links={column.links} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </InView>
  );
}
