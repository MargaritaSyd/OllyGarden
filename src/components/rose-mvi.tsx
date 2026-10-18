import type { CSSProperties } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { roseMvi } from "@/lib/rose";

/* Figma 2371:31604: translucent forest card with an olive glow bleeding in from above. */
const bentoCard =
  "rz-card relative isolate flex flex-col gap-2 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8";
const bentoGlow =
  "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(182deg,rgba(120,126,39,0.28)_0%,rgba(14,45,25,0)_55%)]";

type WaterfallRow = {
  label: string;
  depth: number;
  bar: readonly [number, number];
  tone?: "root" | "noise" | "key";
};

/** Figma 2371:31595: "New in Rose" section with the before/after trace panels. */
export function RoseMvi() {
  return (
    <InView
      as="section"
      id={roseMvi.id}
      aria-labelledby="mvi-title"
      className="relative scroll-mt-24"
    >
      <div className="ov-stagger mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-24 sm:px-12 xl:px-[104px]">
        <div className="flex max-w-[725px] flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/rose/glyph-mvi.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="size-8"
          />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {roseMvi.eyebrow}
          </p>
          <h2
            id="mvi-title"
            className="text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
          >
            {roseMvi.title}
          </h2>
          <p className="text-base leading-[1.4] tracking-[0.02em] text-mist">{roseMvi.body}</p>
        </div>

        {/* Arrows sit on the row, over the 24px gaps. They are hidden once the steps stack. */}
        <ol className="relative grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {roseMvi.steps.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
          <StepArrow className="left-[calc(33.333%-28px)]" />
          <StepArrow className="left-[calc(66.666%-20px)]" />
        </ol>

        <div className="grid grid-cols-1 items-stretch gap-6 min-[900px]:grid-cols-2 min-[1100px]:gap-10">
          <Waterfall
            label={roseMvi.before.label}
            rows={roseMvi.before.rows}
            caption={roseMvi.before.caption}
          >
            <p className="rz-mvx-more">{roseMvi.before.more}</p>
          </Waterfall>
          <Waterfall
            label={roseMvi.after.label}
            accent
            rows={roseMvi.after.rows}
            caption={roseMvi.after.caption}
          >
            <div className="rz-term-note rz-mvx-attrs">
              <p className="rz-mvx-attrs-ctx">{roseMvi.after.context}</p>
              <p className="rz-mvx-attrs-head">{roseMvi.after.attributesHead}</p>
              <p className="rz-mvx-attrs-names">
                {roseMvi.after.attributes.map((attribute, index) => (
                  <span key={attribute}>
                    {attribute}
                    {index < roseMvi.after.attributes.length - 1 ? (
                      <span className="sr-only">, </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>
          </Waterfall>
        </div>

        <div className="rz-banner rz-mvi-band flex flex-col items-start gap-6 p-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-5 min-[900px]:p-8">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] text-mist">
              {roseMvi.band.title}
            </h3>
            <p className="max-w-[820px] text-base leading-[1.4] tracking-[0.02em] text-[#bbc4b7]">
              {roseMvi.band.body}
            </p>
          </div>
          <GetStartedLink
            href={roseMvi.band.announcementHref}
            className="rz-banner-cta rounded-xl"
            analytics={{ id: "rose_mvi_announcement", section: "mvi" }}
          >
            {roseMvi.band.cta}
            <CtaArrow />
          </GetStartedLink>
        </div>
      </div>
    </InView>
  );
}

function StepCard({ step }: { step: { title: string; body: string } }) {
  return (
    <li className={bentoCard}>
      <div aria-hidden="true" className={bentoGlow} />
      <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] text-mist">
        {step.title}
      </h3>
      <p className="text-base leading-[1.5] text-mist/75">{step.body}</p>
    </li>
  );
}

/** Solid white tile. The exported SVG carries a noise filter that reads as grain. */
function StepArrow({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-[calc(50%-24px)] z-2 hidden size-12 place-items-center rounded-lg border border-[#34520b]/15 bg-white shadow-[0_4px_12px_rgba(0,40,14,0.1)] min-[900px]:grid ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 10h12M12 6l4 4-4 4"
          stroke="#75A105"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Waterfall({
  label,
  accent = false,
  rows,
  caption,
  children,
}: {
  label: string;
  accent?: boolean;
  rows: readonly WaterfallRow[];
  caption: string;
  children?: React.ReactNode;
}) {
  return (
    <figure className="rz-term rz-mvx">
      <div className="rz-term-bar">
        <span className="rz-term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={`rz-term-label${accent ? " is-accent" : ""}`}>{label}</span>
      </div>
      <div className="rz-term-body">
        <div className="rz-mvx-cols" aria-hidden="true">
          <span>Operation</span>
          <span>Time</span>
        </div>
        <ul className="rz-mvx-rows">
          {rows.map((row, index) => (
            <li
              key={`${row.label}-${index}`}
              className={`rz-mvx-row${row.tone ? ` is-${row.tone}` : ""}`}
              style={{ "--depth": row.depth } as CSSProperties}
            >
              <span className="rz-mvx-op">
                {row.tone === "root" ? null : <ChildArrow />}
                {row.label}
              </span>
              <span className="rz-mvx-track" aria-hidden="true">
                <i style={{ left: `${row.bar[0]}%`, width: `${row.bar[1]}%` }} />
              </span>
            </li>
          ))}
        </ul>
        {children}
        <figcaption className="rz-term-note">{caption}</figcaption>
      </div>
    </figure>
  );
}

/** U+21B3 is outside the JetBrains Mono subset, so the child marker is drawn. */
function ChildArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      className="mr-1 inline-block h-[1em] w-[1ch] align-[-0.12em]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 0.5v5.5h6.5M6 3.5l2.5 2.5L6 8.5" />
    </svg>
  );
}
