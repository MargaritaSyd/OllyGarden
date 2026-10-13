import Link from "next/link";
import { MetaRow } from "@/components/case-studies";
import { InView } from "@/components/in-view";
import { PressBlockView } from "@/components/press-article";
import { formatBlogDate } from "@/lib/blog";
import {
  anonymizedNotice,
  caseStudiesMeta,
  caseStudyAudioIntro,
  caseStudyPage,
  type CaseStudy,
  type CaseStudyAudio,
  type CaseStudyBlock,
  type CaseStudyStat,
} from "@/lib/case-studies";
import {
  readCaseStudyTranscript,
  type TranscriptLine,
} from "@/lib/case-study-markdown";
import { registerFirstOpenTelemetry } from "@/lib/trademarks";

export async function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const [title, dek] = registerFirstOpenTelemetry(study.title, study.dek);
  const transcript = study.audio
    ? await readCaseStudyTranscript(study.slug)
    : [];

  return (
    <article className="pr-article relative">
      <div className="pr-grid-bg" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <InView className="pr-fx">
          <Link
            href={caseStudiesMeta.path}
            className="pr-back group inline-flex items-center gap-2 self-start text-base font-medium"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            {caseStudyPage.back}
          </Link>
        </InView>

        <header className="pr-header mt-10 max-w-[960px] max-[767px]:mt-[30px]">
          <InView className="pr-fx">
            <MetaRow
              className="text-[#9dafa3]"
              kicker="Case study"
              items={[
                study.industry,
                study.region,
                <time key="date" dateTime={study.date}>
                  {formatBlogDate(study.date, "long")}
                </time>,
              ]}
            />
          </InView>
          <InView className="pr-fx">
            <h1 className="mt-6 text-[clamp(2.125rem,4.6vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.02em] text-balance text-mist">
              {title}
            </h1>
          </InView>
          <InView className="pr-fx">
            <p className="mt-6 text-[clamp(1.125rem,1.6vw,1.25rem)] leading-[1.45] tracking-[0.02em] text-[#cdcdcd]">
              {dek}
            </p>
          </InView>
        </header>

        <InView className="pr-fx">
          <AnonymizedNotice />
        </InView>

        <InView className="pr-fx">
          <CaseStudyStats stats={study.stats} />
        </InView>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)_340px] items-start gap-[clamp(2rem,5vw,4.5rem)] max-[991px]:mt-10 max-[991px]:grid-cols-1">
          <div className="pr-body min-w-0">
            {study.audio ? (
              <InView className="pr-fx">
                <CaseStudyListen audio={study.audio} transcript={transcript} />
              </InView>
            ) : null}
            {study.body.map((block, index) => (
              <InView key={`${block.type}-${index}`} className="pr-fx">
                <CaseStudyBlockView block={block} />
              </InView>
            ))}
            <InView className="pr-fx">
              <aside
                aria-labelledby="case-study-method"
                className="rounded-2xl border border-mist/12 px-6 py-5"
              >
                <h2
                  id="case-study-method"
                  className="text-sm font-semibold tracking-[0.08em] text-bitmap-mid uppercase"
                >
                  {caseStudyPage.method}
                </h2>
                <p className="mt-2 text-[15px] leading-6 text-[#9dafa3]">
                  {study.method}
                </p>
              </aside>
            </InView>
          </div>

          <div className="sticky top-28 max-[991px]:static max-[991px]:order-first">
            <aside
              aria-labelledby="case-study-glance"
              className="surface-grain rounded-3xl border border-sunflower/40 bg-[#00280e] p-7 max-[767px]:rounded-2xl max-[767px]:p-5"
            >
              <h2
                id="case-study-glance"
                className="text-lg leading-[26px] font-bold text-mist"
              >
                {caseStudyPage.glance}
              </h2>
              <dl className="mt-5 flex flex-col gap-4">
                {study.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold tracking-[0.08em] text-bitmap-mid uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-[22px] text-[#cdcdcd]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}

function AnonymizedNotice() {
  return (
    <aside
      className="surface-grain mt-10 flex max-w-[960px] items-start gap-4 rounded-2xl border border-sunflower/40 bg-[#00280e] px-5 py-4 max-[767px]:mt-8 max-[767px]:gap-3 max-[767px]:px-4 max-[767px]:py-3.5"
      aria-label={anonymizedNotice.label}
    >
      <MaskIcon />
      <p className="text-sm leading-[22px] text-[#cdcdcd]">
        <strong className="font-semibold text-bitmap-highlight">
          {anonymizedNotice.label}.
        </strong>{" "}
        {anonymizedNotice.text}
      </p>
    </aside>
  );
}

function CaseStudyStats({ stats }: { stats: readonly CaseStudyStat[] }) {
  return (
    <ul className="mt-8 grid grid-cols-4 gap-4 max-[991px]:grid-cols-2 max-[480px]:grid-cols-1">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="surface-grain rounded-3xl border border-mist/12 bg-[#00280e] p-6 max-[767px]:rounded-2xl max-[767px]:p-5"
        >
          <p className="text-[clamp(2.5rem,4.4vw,3.5rem)] leading-none font-bold tracking-[-0.03em] text-sunflower">
            {stat.value}
          </p>
          <p className="mt-3 text-base leading-[22px] font-semibold text-mist">
            {stat.label}
          </p>
          <p className="mt-1 text-sm leading-5 text-[#9dafa3]">{stat.detail}</p>
        </li>
      ))}
    </ul>
  );
}

function CaseStudyListen({
  audio,
  transcript,
}: {
  audio: CaseStudyAudio;
  transcript: readonly TranscriptLine[];
}) {
  return (
    <section
      aria-labelledby="case-study-listen"
      className="surface-grain rounded-3xl border border-sunflower/40 bg-[#00280e] p-7 max-[767px]:rounded-2xl max-[767px]:p-5"
    >
      <div className="flex items-center gap-3">
        <HeadphonesIcon />
        <h2
          id="case-study-listen"
          className="text-lg leading-[26px] font-bold text-mist"
        >
          {caseStudyPage.listen}
        </h2>
      </div>
      <p className="mt-2 text-[15px] leading-6 text-[#9dafa3]">
        {caseStudyAudioIntro}
      </p>
      <audio
        controls
        preload="metadata"
        src={audio.src}
        className="mt-5 w-full [color-scheme:dark]"
      >
        <a href={audio.src}>Download the episode (MP3)</a>
      </audio>
      {transcript.length ? (
        <details className="group mt-5">
          <summary className="cursor-pointer text-[15px] font-medium text-bitmap-highlight marker:text-bitmap-mid hover:text-sunflower">
            {caseStudyPage.transcript}
          </summary>
          <div className="mt-4 flex flex-col gap-3 border-l border-mist/12 pl-4">
            {transcript.map((line, index) => (
              <p key={index} className="text-[15px] leading-6 text-[#a8a8a8]">
                <span className="font-semibold text-mist">{line.speaker}:</span>{" "}
                {line.text}
              </p>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  if (block.type !== "callout") return <PressBlockView block={block} />;
  return (
    <aside className="rounded-3xl border border-bitmap-mid/50 bg-[rgba(91,114,53,0.16)] p-7 max-[767px]:rounded-2xl max-[767px]:p-5">
      <h3 className="text-lg leading-[26px] font-bold text-bitmap-highlight">
        {block.title}
      </h3>
      <p className="mt-2 text-base leading-[1.65] text-[#cdcdcd]">
        {block.text}
      </p>
    </aside>
  );
}

function MaskIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D1D100"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D1D100"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}
