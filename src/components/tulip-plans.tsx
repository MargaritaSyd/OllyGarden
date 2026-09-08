import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { tulipPlans } from "@/lib/tulip";

export function TulipPlans() {
  return (
    <InView
      as="section"
      aria-labelledby="tp-title"
      className="tp-plans flex justify-center overflow-hidden px-5 py-16 sm:px-8 lg:px-[104px] lg:pt-[120px] lg:pb-24"
    >
      <div className="tp-inner flex w-full max-w-[1232px] flex-col gap-10 sm:gap-12 lg:gap-14">
        <div className="tp-head mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center">
          <PlansMark />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {tulipPlans.eyebrow}
          </p>
          <h2
            id="tp-title"
            className="max-w-[700px] text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {tulipPlans.title}
          </h2>
          <p className="mx-auto mt-1 max-w-[571px] text-base leading-[1.4] tracking-[0.02em] text-[#d1d5db]">
            {tulipPlans.sub}
          </p>
        </div>

        <div className="tp-grid grid items-stretch gap-6 lg:grid-cols-2">
          <PlanCard plan={tulipPlans.standard} />
          <PlanCard plan={tulipPlans.enterprise} />
        </div>
      </div>
    </InView>
  );
}

function PlanCard({
  plan,
}: {
  plan: typeof tulipPlans.standard | typeof tulipPlans.enterprise;
}) {
  return (
    <article className="tp-card surface-grain flex flex-col gap-5 rounded-2xl border border-sunflower/32 bg-[#002810] p-6 transition-[transform,border-color,box-shadow] duration-200">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.04em] text-mist/70 uppercase">{plan.tier}</p>
        <p className="flex items-baseline gap-2">
          <strong className="text-[clamp(2rem,3vw,2.25rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
            {plan.price}
          </strong>
          {plan.suffix ? (
            <span className="text-sm leading-[1.3] font-medium tracking-[0.02em] text-mist/90">
              {plan.suffix}
            </span>
          ) : null}
        </p>
        <p className="text-sm leading-[1.4] text-mist/85">{plan.note}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {plan.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-sm leading-[1.4] text-mist"
          >
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
      <GetStartedLink href={plan.href} fullWidth className="mt-auto rounded-xl">
        {plan.cta}
      </GetStartedLink>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      className="tp-check size-[18px] shrink-0 text-bitmap-mid transition-transform duration-200 ease-out"
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
    <svg className="mx-auto" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
