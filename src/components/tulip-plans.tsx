import { GetStartedLink } from "@/components/get-started-link";
import { tulipPlans } from "@/lib/tulip";

export function TulipPlans() {
  return (
    <section aria-labelledby="tp-title" className="px-6 py-20 sm:px-12 lg:px-[104px] lg:py-24">
      <div className="mx-auto max-w-[1328px]">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <PlansMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {tulipPlans.eyebrow}
          </p>
          <h2
            id="tp-title"
            className="mt-4 text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {tulipPlans.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] text-base leading-[1.66] text-mist/75">
            {tulipPlans.sub}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PlanCard plan={tulipPlans.standard} />
          <PlanCard plan={tulipPlans.enterprise} darker />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  darker = false,
}: {
  plan: typeof tulipPlans.standard | typeof tulipPlans.enterprise;
  darker?: boolean;
}) {
  return (
    <article
      className={`surface-grain relative flex flex-col overflow-hidden rounded-3xl border p-[clamp(1.625rem,3.2vw,2.75rem)] ${
        darker ? "border-white/8 bg-[#071008]" : "border-[#d9e533]/20 bg-[#19321e]"
      }`}
    >
      <p className="text-xs font-bold tracking-[0.14em] text-bitmap-mid uppercase">
        {plan.tier}
      </p>
      <p className="mt-3 text-[clamp(2rem,3vw,2.5rem)] leading-none font-bold text-mist">
        {plan.price}
        {plan.suffix ? (
          <span className="ml-1 text-lg font-medium text-mist/60">{plan.suffix}</span>
        ) : null}
      </p>
      <p className="mt-3 mb-8 text-sm leading-[1.55] text-mist/65">{plan.note}</p>
      <ul className="mb-9 flex flex-col gap-3.5">
        {plan.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#e9ece0]/85"
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
    <svg className="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.2 9.6l3.6 3.6 8-9"
        stroke="#9CA703"
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
