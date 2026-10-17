import { HomeHowFlow } from "@/components/home-how-flow";
import { InView } from "@/components/in-view";
import { roseHow } from "@/lib/rose";

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
          </div>

          <div className="hh-panel surface-grain">
            <HomeHowFlow duration={7000} flowClassName="hh-flow--rose" label={roseHow.diagramLabel}>
              <FlowNode className="hh-rose hh-node--lime" title="OllyGarden Rose" detail="AI instrumentation agent" />
              <FlowLink className="hh-a2" label="open pull request" n="2" arrow="long" />
              <FlowNode className="hh-service hh-node--lime" title="Your service" />
              <FlowLink className="hh-a1" n="1" arrow="step1" flip />
              <FlowLink className="hh-a3" label="telemetry" n="3" arrow="step3" />
              <FlowNode className="hh-org" title="Org context & skills" />
              <FlowNode className="hh-collector" title="Collector" detail="OpenTelemetry Collector" />
              <FlowLink className="hh-ad" label="telemetry" arrow="down" small />
              <FlowNode className="hh-backend hh-node--soft" title="Your observability backend" />
              <FlowLink className="hh-ai" label="telemetry" arrow="insights" />
              <div className="hh-node hh-insights hh-node--dashed">
                <strong>OllyGarden Insights</strong>
                <em>Optional</em>
              </div>
            </HomeHowFlow>
          </div>

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

function FlowNode({
  className,
  title,
  detail,
}: {
  className: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className={`hh-node ${className}`}>
      <strong>{title}</strong>
      {detail ? <span>{detail}</span> : null}
    </div>
  );
}

function FlowLink({
  className,
  label,
  n,
  arrow,
  flip = false,
  small = false,
}: {
  className: string;
  label?: string;
  n?: string;
  arrow: "long" | "step1" | "step3" | "down" | "insights";
  flip?: boolean;
  small?: boolean;
}) {
  const src = {
    long: "/images/rose/arr-down-long.svg",
    step1: "/images/rose/arr-step1.svg",
    step3: "/images/rose/arr-step3.svg",
    down: "/images/rose/arr-down-short.svg",
    insights: "/images/rose/arr-insights.svg",
  }[arrow];

  const tag = label ? (
    <span className={`hh-tag${small ? " hh-tag--sm" : ""}`}>
      {n ? <b className="hh-num">{n}</b> : null}
      {label}
    </span>
  ) : null;
  const arrowImg = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img className={`hh-arrow${flip ? " hh-arrow--flip" : ""}`} src={src} alt="" />
  );

  return (
    <div className={`hh-link ${className}`}>
      {arrow === "down" ? arrowImg : null}
      {tag}
      {arrow === "down" ? null : arrowImg}
      {n && !label ? <b className="hh-num">{n}</b> : null}
      {arrow === "down" ? null : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="hh-down" src="/images/rose/arr-down-short.svg" alt="" />
      )}
      <span className="hh-pk" aria-hidden="true" />
    </div>
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
