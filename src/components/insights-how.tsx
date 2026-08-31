import { InsightsFlow } from "@/components/insights-flow";
import { InView } from "@/components/in-view";
import { insightsHow } from "@/lib/insights";

export function InsightsHow() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-title"
      className="px-6 py-20 sm:px-12 lg:px-[104px] lg:py-24"
    >
      <div className="mx-auto max-w-[1328px]">
        <InView className="ov-stagger mx-auto max-w-[940px] text-center">
          <HowMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {insightsHow.eyebrow}
          </p>
          <h2
            id="hiw-title"
            className="mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
          >
            Analyze telemetry quality without
            <br />
            changing your observability stack
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-[1.66] text-mist/75">
            {insightsHow.body}
          </p>
        </InView>

        <InsightsFlow />

        <InView className="ov-stagger mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {insightsHow.steps.map((step) => (
            <article
              key={step.title}
              className="surface-grain rounded-3xl border border-white/8 bg-[#19321e] p-7"
            >
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-mist">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-mist/75">{step.body}</p>
            </article>
          ))}
        </InView>
      </div>
    </section>
  );
}

function HowMark() {
  return (
    <svg
      className="mx-auto text-bitmap-mid"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M24.0326 0H7.96752V7.96748H24.0326V0Z" fill="currentColor" />
      <path d="M24.0326 24.0325H7.96751V32H24.0326V24.0325Z" fill="currentColor" />
      <path d="M7.96752 7.96748L0 7.96752V24.0326L7.96751 24.0325L7.96752 7.96748Z" fill="currentColor" />
      <path d="M32 7.96752L24.0326 7.96748L24.0326 24.0325L32 24.0326V7.96752Z" fill="currentColor" />
    </svg>
  );
}
