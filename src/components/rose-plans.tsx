import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { PlansLink, type PlansHeading } from "@/components/insights-plans";
import { RoseOpenSourceApplication } from "@/components/rose-open-source-application";
import { rosePlans } from "@/lib/rose";

const planTitleClass =
  "text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.16] font-bold tracking-[-0.02em] text-mist";
const featureClass =
  "flex items-start gap-2.5 text-sm leading-[1.4] tracking-[0.02em] text-mist";

export function RosePlans({
  id,
  heading = rosePlans,
}: {
  id?: string;
  heading?: PlansHeading;
}) {
  return (
    <InView as="section" id={id} aria-labelledby="plans-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(4.75rem,8vw,6rem)] sm:px-12">
        <div className="ov-stagger mx-auto mb-14 max-w-[800px] text-center">
          <PlansMark />
          <p className="mt-4 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {heading.eyebrow}
          </p>
          <h2
            id="plans-title"
            className="mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
          >
            {heading.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[718px] text-base leading-[1.4] tracking-[0.02em] text-mist">
            {heading.sub}
          </p>
          <PlansLink heading={heading} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <PlanCard plan={rosePlans.free} />
          <PlanCard plan={rosePlans.enterprise} darker />
          <article className="plan-os relative grid items-center gap-x-10 gap-y-5 overflow-hidden rounded-2xl border border-sunflower/32 p-5 sm:p-6 lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h3 className={planTitleClass}>{rosePlans.openSource.title}</h3>
              <p className="mt-2 text-sm leading-[1.4] tracking-[0.02em] text-mist/90">
                {rosePlans.openSource.note}
              </p>
            </div>
            <RoseOpenSourceApplication label={rosePlans.openSource.cta} />
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-2">
              {rosePlans.openSource.items.map((item) => (
                <li key={item} className={featureClass}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </InView>
  );
}

function PlanCard({
  plan,
  darker = false,
}: {
  plan: typeof rosePlans.free | typeof rosePlans.enterprise;
  darker?: boolean;
}) {
  return (
    <article
      className={`plan-card relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 ${
        darker ? "plan-ent border-[#556812]/36" : "plan-free border-[#556812]/32"
      }`}
    >
      <h3 className={planTitleClass}>{plan.title}</h3>
      <p
        className={`mt-2 mb-5 text-sm leading-[1.4] tracking-[0.02em] ${
          darker ? "text-mist/80" : "text-mist/90"
        }`}
      >
        {plan.note}
      </p>
      <ul className="mb-5 flex flex-col gap-3">
        {plan.items.map((item) => (
          <li key={item} className={featureClass}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
      <GetStartedLink
        href={plan.href}
        fullWidth
        className="mt-auto rounded-xl"
        analytics={{
          id: `rose_pricing_${plan.title.toLowerCase()}`,
          section: "pricing",
        }}
      >
        {plan.cta}
      </GetStartedLink>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-px shrink-0"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 4.5 6.75 12.75 3 9"
        stroke="#9CA703"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlansMark() {
  return (
    <svg
      className="mx-auto"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.838 0 16 0Zm0 28.087C9.324 28.087 3.913 22.676 3.913 16S9.325 3.913 16 3.913 28.087 9.324 28.087 16 22.676 28.087 16 28.087Z"
        fill="#9CA703"
      />
      <path
        d="M16.034 8.005c-4.398 0-7.961 3.565-7.961 7.961 0 4.396 3.565 7.961 7.961 7.961s7.961-3.565 7.961-7.961c0-4.396-3.565-7.961-7.961-7.961Zm0 11.576c-1.995 0-3.614-1.618-3.614-3.614s1.619-3.614 3.614-3.614 3.614 1.618 3.614 3.614-1.619 3.614-3.614 3.614Z"
        fill="#9CA703"
      />
    </svg>
  );
}
