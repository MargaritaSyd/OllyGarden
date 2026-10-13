import Link from "next/link";
import { InView } from "@/components/in-view";
import { roseHow } from "@/lib/rose";

type FlowEdge = {
  n?: string;
  label?: string;
  from: string;
  to: string;
};

const { nodes, edges } = roseHow.diagram;
const edge = (index: number) => edges[index] as FlowEdge;

/** Figma 2371:31522. Rose and Insights centers sit half a 247px column into a 1080px grid. */
const LOOP_INSET = "11.435%";
const LOOP_RISE = "45px";

export function RoseHow() {
  return (
    <InView as="section" aria-labelledby="how-title">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(3.5rem,6.7vw,6rem)] sm:px-12">
        <div className="ov-stagger flex flex-col gap-14">
          <div className="flex max-w-[704px] flex-col items-start gap-4">
            <HowMark />
            <p className="text-base leading-[normal] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
              {roseHow.eyebrow}
            </p>
            <h2
              id="how-title"
              className="text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
            >
              {roseHow.title}
            </h2>
            <p className="max-w-[640px] text-base leading-[1.4] tracking-[0.02em] text-mist">
              {roseHow.sub}
            </p>
            <Link
              href={roseHow.skillsHref}
              className="inline-block font-semibold text-sunflower underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bitmap-highlight"
            >
              {roseHow.skillsLink}
            </Link>
          </div>

          <figure
            role="group"
            aria-labelledby="rose-flow-label"
            aria-describedby="rose-flow-summary"
            className="relative w-full rounded-3xl border border-bitmap-highlight/40 bg-[#0c2317]/60 px-6 py-8 shadow-[0_8px_32px_rgba(227,226,112,0.05)] lg:px-10 lg:pt-[88px] lg:pb-12"
          >
            <figcaption id="rose-flow-label" className="sr-only">
              {roseHow.diagram.label}
            </figcaption>
            <FlowGrid />
            <FlowList />
            <p
              id="rose-flow-summary"
              className="mt-6 text-sm leading-[1.5] text-mist/75 lg:sr-only"
            >
              {roseHow.diagram.summary}
            </p>
          </figure>

          <ol className="ov-stagger grid grid-cols-1 gap-8 lg:grid-cols-3">
            {roseHow.steps.map((step) => (
              <li key={step.n} className="flex">
                <article className="flex w-full flex-col gap-4 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 bg-[radial-gradient(125%_80%_at_50%_-10%,rgba(156,167,3,0.14),transparent_60%)] p-8 shadow-[inset_0_1px_rgba(255,255,255,0.05)]">
                  <span
                    className="flex size-12 items-center justify-center rounded-lg border border-bitmap-shadow/15 bg-white text-2xl leading-[normal] font-bold tracking-[-0.02em] text-[#75a105] shadow-[0_4px_12px_rgba(0,40,14,0.1)]"
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] text-mist">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-[1.5] text-mist/75">
                      {step.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </InView>
  );
}

/** Desktop layout (≥1024px): five columns, four rows, CSS return loop. Figma 2371:31523. */
function FlowGrid() {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[1080px] grid-cols-[247fr_135fr_220fr_135fr_247fr] grid-rows-[auto_130px_auto_auto] gap-x-[2.22%] lg:grid"
      aria-hidden="true"
    >
      {/* Insights → Rose return loop (Figma Vector 24, 2371:31569) */}
      <div className="pointer-events-none relative col-span-full col-start-1 row-start-1 row-end-3">
        <div
          className="absolute border-t-2 border-r-2 border-bitmap-highlight"
          style={{
            top: `-${LOOP_RISE}`,
            left: LOOP_INSET,
            right: `calc(${LOOP_INSET} - 1px)`,
            bottom: "23.5px",
          }}
        />
        <div
          className="absolute border-l-2 border-bitmap-highlight"
          style={{
            top: `-${LOOP_RISE}`,
            left: `calc(${LOOP_INSET} - 1px)`,
            height: LOOP_RISE,
          }}
        >
          <ArrowHead className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px] rotate-90" />
        </div>
      </div>

      {/* Row 1 */}
      <FlowNode
        tone="rose"
        className="col-start-1 row-start-1"
        {...nodes.rose}
      />
      <div className="col-start-2 row-start-1 flex items-center gap-1.5 self-center">
        <ArrowH dir="left" className="flex-1" />
        <StepBadge n={edge(0).n} />
      </div>
      <FlowNode
        tone="context"
        className="col-start-3 row-start-1"
        {...nodes.context}
      />

      {/* Row 2: Rose → Your service */}
      <div className="col-start-1 row-start-2 flex flex-col items-center gap-1 py-2">
        <div className="flex h-6 items-center gap-2">
          <StepBadge n={edge(1).n} />
          <EdgeLabel>{edge(1).label}</EdgeLabel>
        </div>
        <ArrowV className="flex-1" />
      </div>

      {/* Row 3 */}
      <FlowNode
        tone="service"
        className="col-start-1 row-start-3"
        {...nodes.service}
      />
      <div className="col-start-2 row-start-3 flex items-center gap-1.5 self-center">
        <StepBadge n={edge(2).n} />
        <EdgeLabel>{edge(2).label}</EdgeLabel>
        <ArrowH dir="right" className="min-w-6 flex-1" />
      </div>
      <FlowNode
        tone="collector"
        className="col-start-3 row-start-3"
        {...nodes.collector}
      />
      <div className="relative col-start-4 row-start-3 self-center">
        <EdgeLabel className="absolute bottom-full left-0 mb-1.5 w-full text-center">
          {edge(4).label}
        </EdgeLabel>
        <ArrowH dir="right" />
      </div>
      <div className="relative col-start-5 row-start-3 h-[73px]">
        <FlowNode
          tone="insights"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          {...nodes.insights}
        />
      </div>

      {/* Row 4: Collector → backend */}
      <div className="col-start-3 row-start-4 flex flex-col gap-2 pt-2">
        <div className="flex h-[34px] items-center justify-center gap-1">
          <ArrowV className="h-full" />
          <EdgeLabel className="text-[11px]">{edge(3).label}</EdgeLabel>
        </div>
        <FlowNode tone="backend" {...nodes.backend} />
      </div>
    </div>
  );
}

/** Below 1024px the loop reads top-down; the visible summary stands in for the return edge. */
function FlowList() {
  return (
    <ol
      className="mx-auto flex max-w-[360px] flex-col lg:hidden"
      aria-hidden="true"
    >
      <li>
        <FlowNode tone="context" {...nodes.context} />
        <FlowConnector n={edge(0).n} />
      </li>
      <li>
        <FlowNode tone="rose" {...nodes.rose} />
        <FlowConnector n={edge(1).n} label={edge(1).label} />
      </li>
      <li>
        <FlowNode tone="service" {...nodes.service} />
        <FlowConnector n={edge(2).n} label={edge(2).label} />
      </li>
      <li>
        <FlowNode tone="collector" {...nodes.collector} />
        <FlowConnector label={edge(3).label} />
      </li>
      <li>
        <FlowNode tone="backend" {...nodes.backend} />
      </li>
      <li className="mt-6 border-t border-dashed border-bitmap-shadow pt-6">
        <FlowConnector
          label={edge(4).label}
          hint={nodes.collector.title}
          dashed
        />
        <FlowNode tone="insights" {...nodes.insights} />
      </li>
    </ol>
  );
}

type FlowTone =
  "rose" | "service" | "context" | "collector" | "backend" | "insights";

const toneClass: Record<
  FlowTone,
  { frame: string; title: string; sub: string }
> = {
  rose: {
    frame:
      "gap-1.5 border border-bitmap-highlight bg-bitmap-highlight/[0.07] px-5 py-4",
    title: "text-base text-bitmap-highlight",
    sub: "text-bitmap-mid",
  },
  service: {
    frame:
      "h-[73px] justify-center border border-bitmap-highlight bg-bitmap-highlight/[0.07] px-5 py-4",
    title: "text-base text-bitmap-highlight",
    sub: "",
  },
  context: {
    frame:
      "h-[73px] justify-center border border-bitmap-shadow bg-[#0c2317] px-5 py-4",
    title: "text-[15px] text-white",
    sub: "",
  },
  collector: {
    frame:
      "h-[73px] gap-1.5 border border-bitmap-shadow bg-[#0c2317] px-5 py-4",
    title: "text-[15px] text-white",
    sub: "text-bitmap-highlight",
  },
  backend: {
    frame: "border border-bitmap-shadow/50 bg-[#0c2317] px-5 py-3.5",
    title: "text-sm text-white",
    sub: "",
  },
  insights: {
    frame:
      "h-[120px] justify-center gap-2 border-[1.5px] border-dashed border-bitmap-shadow p-5",
    title: "text-[15px] text-white",
    sub: "",
  },
};

function FlowNode({
  tone,
  title,
  sub,
  tag,
  className = "",
}: {
  tone: FlowTone;
  title: string;
  sub?: string;
  tag?: string;
  className?: string;
}) {
  const styles = toneClass[tone];
  return (
    <div
      className={`flex w-full flex-col items-center rounded-xl text-center leading-[normal] ${styles.frame} ${className}`}
    >
      <p className={`w-full leading-[normal] font-bold ${styles.title}`}>
        {title}
      </p>
      {sub ? (
        <p className={`w-full text-xs leading-[normal] ${styles.sub}`}>{sub}</p>
      ) : null}
      {tag ? (
        <span className="rounded bg-bitmap-highlight/[0.08] px-2 py-0.5 text-[10px] font-bold text-bitmap-mid uppercase">
          {tag}
        </span>
      ) : null}
    </div>
  );
}

function StepBadge({ n }: { n?: string }) {
  if (!n) {
    return null;
  }
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-[1.29px] border-bitmap-highlight bg-[#1a3d2b] text-[11px] leading-none font-bold text-bitmap-highlight">
      {n}
    </span>
  );
}

function EdgeLabel({
  children,
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  if (!children) {
    return null;
  }
  return (
    <span
      className={`text-xs leading-[normal] font-medium whitespace-nowrap text-bitmap-highlight ${className}`}
    >
      {children}
    </span>
  );
}

/** Vertical connector with its badge and label inline, used by the stacked layout. */
function FlowConnector({
  n,
  label,
  hint,
  dashed = false,
}: {
  n?: string;
  label?: string;
  hint?: string;
  dashed?: boolean;
}) {
  return (
    <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
      <span />
      <ArrowV className="h-full" dashed={dashed} />
      <span className="flex items-center gap-2 pl-3">
        <StepBadge n={n} />
        <span className="flex flex-col">
          <EdgeLabel>{label}</EdgeLabel>
          {hint ? (
            <span className="text-[11px] leading-[normal] text-mist/60">
              from {hint}
            </span>
          ) : null}
        </span>
      </span>
    </div>
  );
}

/* Connectors: 2px highlight stroke with the Figma arrowhead (2371:31546). */

function ArrowHead({ className = "" }: { className?: string }) {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 7.25 12.5"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M1 11.5012L6.2506 6.2506L1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-bitmap-highlight"
      />
    </svg>
  );
}

function ArrowH({
  dir,
  className = "",
}: {
  dir: "left" | "right";
  className?: string;
}) {
  return (
    <span className={`flex items-center ${className}`}>
      {dir === "left" ? <ArrowHead className="-mr-[7px] rotate-180" /> : null}
      <span className="h-0.5 min-w-4 flex-1 rounded-full bg-bitmap-highlight" />
      {dir === "right" ? <ArrowHead className="-ml-[7px]" /> : null}
    </span>
  );
}

function ArrowV({
  className = "",
  dashed = false,
}: {
  className?: string;
  dashed?: boolean;
}) {
  return (
    <span className={`flex flex-col items-center ${className}`}>
      <span
        className={`w-0 flex-1 border-l-2 border-bitmap-highlight ${dashed ? "border-dashed" : ""}`}
      />
      <ArrowHead className="-mt-[7px] rotate-90" />
    </span>
  );
}

/** Figma 2371:31518 — 3×3 pixel cross, exported path data. */
function HowMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="text-bitmap-mid"
      aria-hidden="true"
    >
      <path d="M24.0326 0H7.96752V7.96748H24.0326V0Z" />
      <path d="M24.0326 24.0325H7.96751V32H24.0326V24.0325Z" />
      <path d="M7.96752 7.96748L0 7.96752V24.0326L7.96751 24.0325L7.96752 7.96748Z" />
      <path d="M32 7.96752L24.0326 7.96748L24.0326 24.0325L32 24.0326V7.96752Z" />
    </svg>
  );
}
