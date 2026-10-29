import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { textLink } from "@/components/guide-ui";
import { JsonLd } from "@/components/json-ld";
import { PageBody, PageHero } from "@/components/page-hero";
import {
  kubeconNa2026Booth,
  kubeconNa2026Hero,
  kubeconNa2026Highlights,
  kubeconNa2026Meta,
  kubeconNa2026Schedule,
  kubeconNa2026Talks as talks,
  type KubeconTalk,
} from "@/lib/kubecon-na-2026";
import { isExternalHref } from "@/lib/dom";
import { createPageMetadata } from "@/lib/metadata";
import { kubeconNa2026Graph } from "@/lib/structured-data";
import { registerFirstOpenTelemetry } from "@/lib/trademarks";

export const metadata = createPageMetadata({
  title: kubeconNa2026Meta.title,
  description: kubeconNa2026Meta.description,
  path: kubeconNa2026Meta.path,
  absoluteTitle: true,
});

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;
const highlightLink = `inline-flex items-center gap-2 ${textLink}`;

export default function KubeconNa2026Page() {
  // Visible copy in reading order, so the ® lands on the first OpenTelemetry mention only.
  const copy = registerFirstOpenTelemetry(
    ...talks.map((talk) => talk.summary),
    ...kubeconNa2026Highlights.items.map((item) => item.body),
    kubeconNa2026Booth.body,
  );
  const summaries = copy.splice(0, talks.length);
  const highlightBodies = copy.splice(0, kubeconNa2026Highlights.items.length);
  const [boothBody] = copy;
  const summaryByHref = Object.fromEntries(talks.map((talk, index) => [talk.href, summaries[index]]));

  return (
    <>
      <JsonLd data={kubeconNa2026Graph()} />
      <PageHero
        eyebrow={kubeconNa2026Hero.eyebrow}
        titleId="kubecon-title"
        title={kubeconNa2026Hero.title}
        lede={kubeconNa2026Hero.lede}
      >
        <GetStartedLink href="#schedule" analytics={{ id: "kubecon_na_2026_schedule", section: "hero" }}>
          {kubeconNa2026Hero.cta}
          <CtaArrow />
        </GetStartedLink>
      </PageHero>
      <PageBody>
        <section id="schedule" className="scroll-mt-28" aria-labelledby="kubecon-schedule">
          <h2 id="kubecon-schedule" className="text-3xl font-bold text-mist">
            Our talks
          </h2>
          <p className="mt-4 text-lg leading-8 text-mist/70">
            All times are local to Salt Lake City (MST).{" "}
            <a href={kubeconNa2026Meta.scheduleHref} {...externalLink} className={textLink}>
              Full KubeCon + CloudNativeCon schedule
            </a>{" "}
            ·{" "}
            <a href={kubeconNa2026Meta.registerHref} {...externalLink} className={textLink}>
              Register
            </a>
          </p>
          <div className="mt-10 space-y-12">
            {kubeconNa2026Schedule.map((day) => (
              <div key={day.date}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-mist">{day.date}</h3>
                  <p className="rounded-full border border-white/14 bg-[#19321e] px-3 py-0.5 text-[13px] font-medium tracking-[0.01em] text-bitmap-highlight">
                    {day.label}
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  {day.talks.map((talk) => (
                    <TalkCard key={talk.href} talk={talk} summary={summaryByHref[talk.href]} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[clamp(3rem,6vw,5rem)]" aria-labelledby="kubecon-highlights">
          <h2 id="kubecon-highlights" className="text-3xl font-bold text-mist">
            {kubeconNa2026Highlights.title}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {kubeconNa2026Highlights.items.map((item, index) => (
              <div key={item.title}>
                <h3 className="font-semibold text-mist">{item.title}</h3>
                <p className="mt-2 leading-7 text-mist/70">{highlightBodies[index]}</p>
                {isExternalHref(item.href) ? (
                  <a href={item.href} {...externalLink} className={`mt-3 ${highlightLink}`}>
                    {item.link}
                    <CtaArrow />
                  </a>
                ) : (
                  <Link href={item.href} className={`mt-3 ${highlightLink}`}>
                    {item.link}
                    <CtaArrow />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-[clamp(3rem,6vw,5rem)] flex flex-col items-start gap-5 rounded-3xl border border-sunflower/32 bg-[#002810] p-6 sm:p-8 md:flex-row md:items-center"
          aria-labelledby="kubecon-booth"
        >
          <div className="flex flex-1 flex-col gap-2">
            <h2 id="kubecon-booth" className="text-2xl font-bold text-mist">
              {kubeconNa2026Booth.title}
            </h2>
            <p className="leading-7 text-mist/75">{boothBody}</p>
          </div>
          <GetStartedLink
            href={kubeconNa2026Booth.ctaHref}
            className="rounded-xl"
            analytics={{ id: "kubecon_na_2026_contact", section: "booth" }}
          >
            {kubeconNa2026Booth.cta}
            <CtaArrow />
          </GetStartedLink>
        </section>
      </PageBody>
    </>
  );
}

function TalkCard({ talk, summary }: { talk: KubeconTalk; summary: string }) {
  return (
    <article className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div aria-hidden="true" className="w-1 shrink-0 bg-bitmap-highlight/60" />
      <div className="flex-1 p-5 sm:p-6">
        <p className="text-sm font-medium text-bitmap-mid">{talk.event}</p>
        <h4 className="mt-1 text-lg leading-snug font-semibold text-mist">
          <a href={talk.href} {...externalLink} className="hover:text-sunflower">
            {talk.title}
          </a>
        </h4>
        <p className="mt-2 text-sm text-mist/70">
          <time dateTime={talk.startsAt}>{talk.time}</time> · Salt Palace, {talk.room}
        </p>
        <p className="mt-3 leading-7 text-mist/70">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Speakers">
          {talk.speakers.map((speaker) => (
            <li
              key={speaker.name}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                speaker.company === "OllyGarden"
                  ? "border-bitmap-highlight/30 bg-bitmap-highlight/10 text-bitmap-highlight"
                  : "border-white/10 text-mist/70"
              }`}
            >
              {speaker.name} <span className="opacity-70">({speaker.company})</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
