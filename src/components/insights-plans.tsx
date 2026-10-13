import Link from "next/link";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { insightsPlans } from "@/lib/insights";

export type PlansHeading = {
  eyebrow: string;
  title: string;
  sub: string;
  /** Optional link under the intro: the product page, or the score explainer on the product page itself. */
  href?: string;
  link?: string;
};

export function InsightsPlans({
  id,
  heading = insightsPlans,
}: {
  id?: string;
  heading?: PlansHeading;
}) {
  return (
    <InView
      as="section"
      id={id}
      aria-labelledby="pricing-title"
      className="insights-pricing relative scroll-mt-24 overflow-hidden"
    >
      <PricingPixels />
      <div className="relative z-10 mx-auto flex w-full max-w-[1232px] flex-col gap-14 px-5 py-[clamp(5.25rem,9vw,6rem)] sm:px-12 lg:px-[104px]">
        <div className="ov-stagger mx-auto max-w-[672px] text-center">
          <PlansMark />
          <p className="mt-2 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {heading.eyebrow}
          </p>
          <h2
            id="pricing-title"
            className="mt-2 text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-white"
          >
            {heading.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[672px] text-base leading-[1.66] text-mist/75">
            {heading.sub}
          </p>
          <PlansLink heading={heading} />
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {insightsPlans.cards.map((plan) => (
            <PlanCard key={plan.tier} plan={plan} />
          ))}
        </div>
      </div>
    </InView>
  );
}

function PlanCard({ plan }: { plan: (typeof insightsPlans.cards)[number] }) {
  return (
    <article
      className={`ig-plan-card plan-card relative flex flex-col gap-5 overflow-visible rounded-2xl border border-sunflower/32 p-6 ${
        plan.recommended ? "is-recommended" : ""
      }`}
    >
      {plan.recommended ? (
        <span className="ig-plan-badge">{insightsPlans.recommended}</span>
      ) : null}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-normal tracking-[0.04em] text-mist/80 uppercase">
          {plan.tier}
        </p>
        <p className="flex items-baseline gap-1.5">
          <strong className="text-[clamp(2rem,3vw,2.25rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
            {plan.price}
          </strong>
          {plan.suffix ? (
            <span className="text-sm leading-[1.3] font-medium tracking-[0.02em] text-mist/80">
              {plan.suffix}
            </span>
          ) : null}
        </p>
        <p className="text-sm leading-[1.4] tracking-[0.02em] text-mist">
          {plan.note}
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {plan.items.map((item) => (
          <li
            key={typeof item === "string" ? item : item.label}
            className="flex items-start gap-2.5 text-sm leading-5 tracking-[0.02em] text-mist"
          >
            <CheckIcon />
            {typeof item === "string" ? (
              item
            ) : (
              <Link
                href={item.href}
                className="underline decoration-mist/35 underline-offset-4 hover:text-sunflower hover:decoration-sunflower"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <GetStartedLink
        href={plan.href}
        variant={plan.recommended ? "primary" : "secondary"}
        fullWidth
        className="mt-auto min-h-[46px] rounded-xl"
        analytics={{ id: `insights_pricing_${plan.tier.toLowerCase()}`, section: "pricing" }}
      >
        {plan.cta}
      </GetStartedLink>
    </article>
  );
}

/** The optional link under a plan section's intro. */
export function PlansLink({ heading }: { heading: PlansHeading }) {
  if (!heading.href || !heading.link) return null;
  return (
    <Link
      href={heading.href}
      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bitmap-highlight underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bitmap-mid"
    >
      {heading.link}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 size-[18px] shrink-0 text-bitmap-mid"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 9.6l3.6 3.6 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlansMark() {
  return (
    <svg
      className="mx-auto text-bitmap-mid"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.838 0 16 0Zm0 28.087C9.324 28.087 3.913 22.676 3.913 16S9.325 3.913 16 3.913 28.087 9.324 28.087 16 22.676 28.087 16 28.087Z"
        fill="currentColor"
      />
      <path
        d="M16.034 8.005c-4.398 0-7.961 3.565-7.961 7.961 0 4.396 3.565 7.961 7.961 7.961s7.961-3.565 7.961-7.961c0-4.396-3.565-7.961-7.961-7.961Zm0 11.576c-1.995 0-3.614-1.618-3.614-3.614s1.619-3.614 3.614-3.614 3.614 1.618 3.614 3.614-1.619 3.614-3.614 3.614Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PricingPixels() {
  return (
    <div className="ig-pricing-frame pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg
        className="ig-pr-sq ig-pr-sq--r absolute"
        viewBox="0 0 136 342"
        shapeRendering="crispEdges"
        focusable="false"
      >
        <rect x="68" y="0" width="68" height="69" fill="#E3E270" />
        <rect x="68" y="69" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="205" width="68" height="68" fill="#D1D100" />
        <rect x="0" y="273" width="68" height="68" fill="#D1D100" />
      </svg>
      <svg
        className="ig-pr-sq ig-pr-sq--l absolute"
        viewBox="0 0 119 295"
        shapeRendering="crispEdges"
        focusable="false"
      >
        <rect x="0" y="0" width="59" height="59" fill="#E3E270" />
        <rect x="0" y="59" width="59" height="59" fill="#D1D100" />
        <rect x="60" y="118" width="59" height="59" fill="#D1D100" />
        <rect x="0" y="177" width="59" height="59" fill="#D1D100" />
        <rect x="60" y="236" width="59" height="59" fill="#D1D100" />
      </svg>
    </div>
  );
}
