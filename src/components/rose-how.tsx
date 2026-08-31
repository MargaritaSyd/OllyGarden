import { InView } from "@/components/in-view";
import { roseHow } from "@/lib/rose";

export function RoseHow() {
  return (
    <section aria-label="How Rose works">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(5.25rem,9vw,8.75rem)] pb-[clamp(2.5rem,4vw,3.5rem)] sm:px-12">
        <div className="grid gap-[clamp(1.75rem,3vw,2.75rem)] lg:grid-cols-2">
          {roseHow.steps.map((step) => (
            <InView
              as="article"
              mark="rv-in"
              key={step.n}
              className="rose-step surface-grain relative overflow-hidden rounded-3xl border border-[#d9e533]/16 bg-[#19321e] p-[clamp(1.625rem,3.2vw,2.625rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <StepNum n={step.n} />
              <h3 className="rs-el mt-6 text-[clamp(1.375rem,2vw,1.625rem)] leading-snug font-semibold tracking-[-0.01em] text-mist">
                {step.title}
              </h3>
              <p className="rs-el mt-3 max-w-[46ch] text-[15.5px] leading-[1.66] text-mist/75">
                {step.body}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.image}
                alt={step.imageAlt}
                width={540}
                height={254}
                className="rose-step-visual mt-[30px] h-auto w-full"
              />
            </InView>
          ))}

          <InView
            as="article"
            mark="rv-in"
            className="rose-step surface-grain relative grid overflow-hidden rounded-3xl border border-[#d9e533]/16 bg-[#19321e] p-[clamp(1.625rem,3.2vw,2.625rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] lg:items-center lg:gap-[clamp(1.75rem,4vw,3.5rem)]"
          >
            <div>
              <StepNum n={roseHow.apply.n} />
              <h3 className="rs-el mt-6 text-[clamp(1.375rem,2vw,1.625rem)] leading-snug font-semibold tracking-[-0.01em] text-mist">
                {roseHow.apply.title}
              </h3>
              <p className="rs-el mt-3 max-w-[46ch] text-[15.5px] leading-[1.66] text-mist/75">
                {roseHow.apply.body}
              </p>
              {roseHow.apply.substeps.map((substep) => (
                <div key={substep.title} className="rs-el mt-[22px]">
                  <h4 className="mb-[7px] flex flex-wrap items-center gap-2.5 text-[16.5px] font-semibold text-mist">
                    {substep.title}
                    {"soon" in substep && substep.soon ? (
                      <span className="rounded-full border border-[#d9e533]/50 px-3 py-0.5 text-[11.5px] font-semibold tracking-[0.02em] text-[#d9e533]">
                        Coming soon
                      </span>
                    ) : null}
                  </h4>
                  <p className="max-w-[52ch] text-[14.5px] leading-[1.62] text-mist/70">
                    {substep.body}
                  </p>
                </div>
              ))}
            </div>
            <DashboardMock />
          </InView>
        </div>
      </div>
    </section>
  );
}

function StepNum({ n }: { n: string }) {
  return (
    <span
      className="rose-step-num rs-el flex size-[46px] items-center justify-center rounded-xl border border-[#0e3a1c]/14 bg-mist text-[19px] font-semibold text-olive shadow-[0_10px_24px_rgba(22,48,22,0.28)]"
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

function DashboardMock() {
  return (
    <div
      className="rose-step-visual relative mt-8 aspect-[636/411] overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0a0b0a] lg:mt-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0_100%,rgba(157,183,13,0.22),transparent_55%),radial-gradient(110%_80%_at_100%_0,rgba(217,229,51,0.1),transparent_60%)]" />
      <span className="dash-shield d-el absolute top-[8%] right-[6%] flex size-14 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(217,229,51,0.3),rgba(217,229,51,0.05)_72%)] text-[#d9e533]">
        <ShieldIcon />
      </span>
      <IssueCard className="d-el top-[14%] right-[16%] left-[11%]" title="Dashboard issue" />
      <span className="d-el absolute top-[42%] left-[14%] h-[15px] w-[58%] rounded-lg bg-white/7" />
      <span className="d-el absolute top-[48%] left-[14%] h-[15px] w-[40%] rounded-lg bg-white/7" />
      <IssueCard className="d-el top-[57%] right-[7%] left-[21%]" title="HTTP error" />
      <span className="d-el absolute top-[80%] left-[24%] h-[15px] w-[48%] rounded-lg bg-white/7" />
      <span className="dash-shield dash-shield-b d-el absolute bottom-[9%] left-[7%] flex size-14 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(217,229,51,0.3),rgba(217,229,51,0.05)_72%)] text-[#d9e533]">
        <ShieldIcon />
      </span>
    </div>
  );
}

function IssueCard({ className, title }: { className: string; title: string }) {
  return (
    <div
      className={`absolute flex items-center justify-between gap-4 rounded-[14px] bg-[#141613] px-[18px] py-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div>
        <span className="mb-2 inline-block rounded-full bg-[#d33f3f] px-2.5 py-0.5 text-[9.5px] font-bold tracking-[0.07em] text-white uppercase">
          Critical
        </span>
        <div className="text-[15px] font-semibold text-mist">{title}</div>
      </div>
      <span className="shrink-0 rounded-lg bg-mist px-3.5 py-2 text-[12.5px] font-semibold text-[#0a0f0a]">
        Apply fixes
      </span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 2.5v5c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5v-5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8v4M12 15.5v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
