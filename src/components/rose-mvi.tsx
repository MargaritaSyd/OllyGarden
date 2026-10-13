import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { roseMvi } from "@/lib/rose";

const mono = "font-[family-name:var(--font-jetbrains-mono)]";

/* Figma 2371:31604: translucent forest card with an olive glow bleeding in from above. */
const bentoCard =
  "relative isolate flex flex-col gap-2 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8";
const bentoGlow =
  "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(182deg,rgba(120,126,39,0.28)_0%,rgba(14,45,25,0)_55%)]";

type TraceLine = { text: string; indent: number; highlight: boolean };

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

        {/* Three steps; the arrow tiles hang off the first two cards, centred in the 24px gaps. */}
        <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {roseMvi.steps.map((step, index) => (
            <StepCard key={step.title} step={step} withArrow={index < roseMvi.steps.length - 1} />
          ))}
        </ol>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <TracePanel
            label={roseMvi.before.label}
            labelClassName="text-[#90a1b9]"
            lines={roseMvi.before.lines}
          >
            <p className="text-base leading-[1.5] text-mist">{roseMvi.before.note}</p>
          </TracePanel>
          <TracePanel
            label={roseMvi.after.label}
            labelClassName="text-bitmap-mid"
            lines={roseMvi.after.lines}
          >
            <p className="text-lg leading-[normal] font-bold tracking-[-0.01em] text-mist">
              {roseMvi.after.attributes.map((attribute, index) => (
                <span key={attribute}>
                  <code className="font-[inherit]">{attribute}</code>
                  {/* The visible dot is a pseudo-element, so screen readers and the agent
                      Markdown get a plain comma-separated list. */}
                  {index < roseMvi.after.attributes.length - 1 ? (
                    <>
                      <span className="sr-only">, </span>
                      <span aria-hidden="true" className="mx-2.5 before:content-['·']" />
                    </>
                  ) : null}
                </span>
              ))}
            </p>
          </TracePanel>
        </div>

        <div className="flex flex-col items-start gap-5 rounded-3xl border border-sunflower/32 bg-[#002810] p-6 sm:p-8 md:flex-row md:items-center">
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
            className="rounded-xl"
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

function StepCard({
  step,
  withArrow,
}: {
  step: { title: string; body: string };
  withArrow: boolean;
}) {
  return (
    <li className={bentoCard}>
      <div aria-hidden="true" className={bentoGlow} />
      <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] text-mist">
        {step.title}
      </h3>
      <p className="text-base leading-[1.5] text-mist/75">{step.body}</p>
      {withArrow ? (
        /* The export is the 48px tile plus its glow margin (72px). Figma places the tile 8px below
           the card top, centred in the gap: tile right edge = card right + 12 + 36 = 48px outside.
           Below lg it sits under the card, pointing down. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/rose/icon-arrow-step.svg"
          alt=""
          aria-hidden="true"
          width={72}
          height={72}
          className="mx-auto -mb-[60px] size-[72px] max-w-none rotate-90 lg:absolute lg:top-[41px] lg:-right-12 lg:m-0 lg:rotate-0"
        />
      ) : null}
    </li>
  );
}

const CHILD_ARROW = "↳ ";

/**
 * "↳" (U+21B3) is outside the JetBrains Mono latin subset and would fall back to a system
 * symbol font, so the connector is drawn as a 1ch SVG; the character stays for screen
 * readers and the agent Markdown.
 */
function TraceText({ text }: { text: string }) {
  if (!text.startsWith(CHILD_ARROW)) {
    return text;
  }

  return (
    <>
      <span className="sr-only">{CHILD_ARROW.trim()}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="inline-block h-[1em] w-[1ch] align-[-0.1em]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 0.5v5.5h6.5M6 3.5l2.5 2.5L6 8.5" />
      </svg>{" "}
      {text.slice(CHILD_ARROW.length)}
    </>
  );
}

function TracePanel({
  label,
  labelClassName,
  lines,
  children,
}: {
  label: string;
  labelClassName: string;
  lines: readonly TraceLine[];
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#212c25]/60 bg-[#031802]/90 p-px shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
      <figcaption className="flex items-center gap-2 border-b border-[#1d3d1d] bg-[#04160a] px-4 pt-3 pb-[13px]">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#fb2c36]/80" />
          <span className="size-3 rounded-full bg-[#f0b100]/80" />
          <span className="size-3 rounded-full bg-[#00c950]/80" />
        </span>
        <span className={`${mono} pl-2 text-xs leading-4 ${labelClassName}`}>{label}</span>
      </figcaption>
      <div className="bg-[#092611] py-5">
        {/* Real newlines inside <pre><code> so the agent Markdown gets a fenced block. */}
        <pre className={`${mono} overflow-x-auto text-sm leading-5 text-[#cad5e2]`}>
          <code className="font-[inherit]">
            {lines.map((line) => (
              <span
                key={line.text}
                className={`block py-1 pr-4 pl-12 ${line.highlight ? "bg-bitmap-highlight/30" : ""}`}
              >
                {"  ".repeat(line.indent)}
                <TraceText text={line.text} />
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
        <div className="px-6 pt-6">
          <div className="relative isolate overflow-hidden rounded-2xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-4">
            <div aria-hidden="true" className={bentoGlow} />
            {children}
          </div>
        </div>
      </div>
    </figure>
  );
}
