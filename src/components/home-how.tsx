import type { CSSProperties } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { HomeHowFlow } from "@/components/home-how-flow";
import { InView } from "@/components/in-view";
import { InsightsMascot } from "@/components/insights-mascot";
import { RoseMascot } from "@/components/rose-mascot";
import { homeHow } from "@/lib/home";

export function HomeHow() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1328px] px-5 pt-[clamp(5.25rem,9vw,8.75rem)] pb-[clamp(6rem,10vw,9.375rem)] sm:px-12">
        <InView className="how-head mx-auto mb-[clamp(3rem,5.5vw,4.5rem)] max-w-[780px] text-center">
          <HowMark />
          <p className="mt-[18px] text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {homeHow.eyebrow}
          </p>
          <h2
            id="how-title"
            className="mt-[18px] text-[clamp(2rem,3.8vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {homeHow.title}{" "}
            <span className="bg-linear-to-r from-[#d9e533] via-[#c4d336] via-55% to-[#7e9230] bg-clip-text text-transparent">
              {homeHow.titleAccent}
            </span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[620px] text-[16.5px] leading-[1.68] text-[#e2e5c0]/75">
            {homeHow.sub}
          </p>
        </InView>

        <div className="hh-panel surface-grain">
          <HomeHowFlow label={homeHow.diagramLabel}>
            <FlowNode className="hh-rose hh-node--lime" title="OllyGarden Rose" detail="AI instrumentation agent" />
            <FlowLink className="hh-a2" label="open pull request" n="2" arrow="long" />
            <FlowNode className="hh-service hh-node--lime" title="Your service" />
            <FlowLink className="hh-a1" arrow="step1" flip />
            <FlowLink className="hh-a3" label="telemetry" n="3" arrow="step3" />
            <FlowNode className="hh-org" title="Org context & skills" />
            <FlowNode className="hh-collector" title="Collector" detail="OpenTelemetry Collector" />
            <FlowLink className="hh-ad" label="telemetry" arrow="down" small />
            <FlowNode className="hh-backend hh-node--soft" title="Your observability backend" />
            <FlowLink className="hh-ai" label="telemetry" arrow="insights" />
            <FlowNode className="hh-insights hh-node--lime" title="OllyGarden Insights" detail="AI telemetry analyzer" />
            <div className="hh-link hh-af">
              <svg className="hh-return" viewBox="0 0 846 244" fill="none" aria-hidden="true">
                <path
                  className="hh-af-line"
                  pathLength={1}
                  d="M839.5 243V7H6.5V37.5"
                  stroke="#E3E270"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="hh-af-head"
                  d="M1.25 32.75L6.5 38L11.75 32.75"
                  stroke="#E3E270"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hh-tag">
                <b className="hh-num">1</b>
                <i>
                  findings<u> back to Rose</u>
                </i>
              </span>
            </div>
          </HomeHowFlow>

          <ol className="hh-steps">
            {homeHow.steps.map((step) => (
              <li key={step.n}>
                <span className="hh-num" aria-hidden="true">
                  {step.n}
                </span>
                <p>
                  {step.parts.map((part, index) =>
                    part.strong ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>,
                  )}
                </p>
              </li>
            ))}
          </ol>
          <p className="hh-note">
            <strong>{homeHow.noteLead}</strong>
            {homeHow.note}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-6">
          <GetStartedLink
            href="#products"
            analytics={{ id: "home_how_products", section: "how" }}
            className="max-sm:max-w-none"
          >
            {homeHow.productsCta}
          </GetStartedLink>
          <GetStartedLink
            href="/contact"
            variant="secondary"
            analytics={{ id: "home_how_contact", section: "how" }}
            className="max-sm:max-w-none"
          >
            {homeHow.contactCta}
          </GetStartedLink>
        </div>

        <ul id="products" className="mx-auto mt-[clamp(3rem,5vw,4.5rem)] grid max-w-[1232px] scroll-mt-24 grid-cols-1 gap-[clamp(1.25rem,2.8vw,2.5rem)] min-[821px]:grid-cols-2">
          {homeHow.products.map((product, index) => (
            <InView as="li" mark="rv-in" key={product.href}>
              <article
                className="home-reality-card surface-grain flex h-full flex-col items-start rounded-3xl border border-bitmap-highlight/40 p-6 sm:p-8"
                style={{ "--i": index } as CSSProperties}
              >
                {product.icon === "rose" ? (
                  <RoseMascot className="mb-2 h-10 w-8 text-bitmap-mid" />
                ) : (
                  <InsightsMascot className="mb-2 h-10 w-8 text-bitmap-mid" />
                )}
                <p className="mb-4 text-base leading-[1.28] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                  {product.label}
                </p>
                <h3 className="mb-2 text-2xl leading-[1.28] font-bold tracking-[-0.02em] text-mist">
                  {product.title}
                </h3>
                <p className="mb-8 text-base leading-6 tracking-[-0.02em] text-mist">{product.body}</p>
                <GetStartedLink
                  href={product.href}
                  fullWidth
                  aria-label={`${product.cta} about ${product.label}`}
                  analytics={{ id: `home_how_${product.icon}`, section: "how" }}
                  className="mt-auto"
                >
                  {product.cta}
                  <CtaArrow />
                </GetStartedLink>
              </article>
            </InView>
          ))}
        </ul>
      </div>
    </section>
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

  return (
    <div className={`hh-link ${className}`}>
      {label ? (
        <span className={`hh-tag${small ? " hh-tag--sm" : ""}`}>
          {n ? <b className="hh-num">{n}</b> : null}
          {label}
        </span>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`hh-arrow${flip ? " hh-arrow--flip" : ""}`} src={src} alt="" />
      {arrow === "down" ? null : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="hh-down" src="/images/rose/arr-down-short.svg" alt="" />
      )}
      <span className="hh-pk" aria-hidden="true" />
    </div>
  );
}

function HowMark() {
  return (
    <svg
      className="mx-auto"
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 16C0 24.8371 7.16294 32 16 32C16 23.163 8.83705 16 0 16Z" fill="#C9D32A" />
      <path d="M32 16C32 24.8371 24.837 32 16 32C16 23.163 23.1629 16 32 16Z" fill="#EFF2C0" />
      <path
        d="M2.00028e-05 0C2.00028e-05 8.83703 7.16296 16 16 16C16 7.16292 8.83707 0 2.00028e-05 0Z"
        fill="#EFF2C0"
      />
      <path
        d="M32 8.09724e-05C32 8.83711 24.8371 16 16 16C16 7.16292 23.1629 8.09724e-05 32 8.09724e-05Z"
        fill="#C9D32A"
      />
    </svg>
  );
}
