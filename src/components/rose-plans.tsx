import { GetStartedLink } from "@/components/get-started-link";
import { rosePlans } from "@/lib/rose";

export function RosePlans() {
  return (
    <section aria-labelledby="plans-title">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(5.25rem,9vw,8.75rem)] sm:px-12">
        <div className="mx-auto mb-[clamp(2.75rem,5vw,4rem)] max-w-[720px] text-center">
          <PlansMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {rosePlans.eyebrow}
          </p>
          <h2
            id="plans-title"
            className="mt-4 text-[clamp(2rem,3.8vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {rosePlans.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-[1.66] text-mist/75">
            {rosePlans.sub}
          </p>
        </div>

        <div className="grid gap-[clamp(1.75rem,3vw,2.75rem)] lg:grid-cols-2">
          <PlanCard plan={rosePlans.free} motif />
          <PlanCard plan={rosePlans.enterprise} darker />
          <article className="surface-grain relative grid items-center gap-x-10 gap-y-[18px] overflow-hidden rounded-3xl border border-[#d9e533]/45 bg-[#19321e] p-[clamp(1.625rem,3.2vw,2.75rem)] lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h3 className="text-[clamp(1.625rem,2.4vw,2rem)] font-semibold tracking-[-0.01em] text-mist">
                {rosePlans.openSource.title}
              </h3>
              <p className="mt-1.5 text-sm text-mist/60">{rosePlans.openSource.note}</p>
            </div>
            <GetStartedLink
              href={rosePlans.openSource.href}
              className="rounded-xl lg:justify-self-end"
            >
              {rosePlans.openSource.cta}
            </GetStartedLink>
            <ul className="flex flex-wrap gap-x-11 gap-y-3.5 lg:col-span-2">
              {rosePlans.openSource.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#e9ece0]/85"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  motif = false,
  darker = false,
}: {
  plan: typeof rosePlans.free | typeof rosePlans.enterprise;
  motif?: boolean;
  darker?: boolean;
}) {
  return (
    <article
      className={`surface-grain relative flex flex-col overflow-hidden rounded-3xl border p-[clamp(1.625rem,3.2vw,2.75rem)] ${
        darker ? "border-white/8 bg-[#071008]" : "border-[#d9e533]/20 bg-[#19321e]"
      }`}
    >
      {motif ? <PlanPixels /> : null}
      <h3 className="text-[clamp(1.625rem,2.4vw,2rem)] font-semibold tracking-[-0.01em] text-mist">
        {plan.title}
      </h3>
      <p className="mt-1.5 mb-7 text-sm text-mist/60">{plan.note}</p>
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
        d="M15 4.5 6.75 12.75 3 9"
        stroke="#9CA703"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlanPixels() {
  return (
    <span
      className="plan-pixels pointer-events-none absolute top-[6%] right-0 opacity-90"
      aria-hidden="true"
    >
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        <rect x="72" y="0" width="24" height="24" fill="#4A5D16" />
        <rect x="96" y="24" width="24" height="24" fill="#697D07" />
        <rect x="48" y="24" width="24" height="24" fill="#86971F" />
        <rect x="72" y="48" width="24" height="24" fill="#3F5A21" />
        <rect x="96" y="72" width="24" height="24" fill="#697D07" />
        <rect x="72" y="96" width="24" height="24" fill="#4A5D16" />
        <rect x="96" y="120" width="24" height="24" fill="#86971F" />
      </svg>
    </span>
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
