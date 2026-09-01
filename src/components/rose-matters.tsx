import { InView } from "@/components/in-view";
import { roseMatters } from "@/lib/rose";

const delayClass: Record<(typeof roseMatters.cards)[number]["place"], string> = {
  tl: "m-a",
  tr: "m-c",
  bl: "m-b",
  br: "m-d",
};

export function RoseMatters() {
  return (
    <InView
      as="section"
      aria-labelledby="matters-title"
      className="relative overflow-hidden"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-0 w-full max-w-[1440px] flex-col items-center justify-center px-5 py-[clamp(5.625rem,10vw,9.375rem)] sm:px-12 min-[1140px]:min-h-[560px]">
        <div className="ov-stagger relative z-10 max-w-[620px] text-center">
          <p className="text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {roseMatters.eyebrow}
          </p>
          <h2
            id="matters-title"
            className="mt-4 text-[clamp(1.875rem,3.6vw,3.125rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {roseMatters.title}
          </h2>
          <div className="mt-5 space-y-4 text-[16.5px] leading-[1.68] text-mist/75">
            {roseMatters.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul
          aria-label="Common instrumentation problems"
          className="mt-12 grid w-full max-w-[620px] grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1140px]:pointer-events-none min-[1140px]:absolute min-[1140px]:inset-0 min-[1140px]:mt-0 min-[1140px]:block min-[1140px]:max-w-none"
        >
          {roseMatters.cards.map((card) => (
            <li
              key={card.title}
              className={`m-card ${delayClass[card.place]} min-[1140px]:pointer-events-auto min-[1140px]:absolute min-[1140px]:w-[min(20rem,24vw)]`}
            >
              <article className="rose-card-float surface-grain h-full rounded-2xl border border-[#d9e533]/22 bg-[#19321e] px-6 py-5 shadow-[0_18px_44px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold text-mist">{card.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-mist/70">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

