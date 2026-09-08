import { InView } from "@/components/in-view";
import { tulipAction } from "@/lib/tulip";

export function TulipAction() {
  return (
    <InView
      as="section"
      aria-labelledby="ta-title"
      className="ta-action relative isolate overflow-hidden px-6 py-14 sm:px-12 lg:px-[104px] lg:py-24"
    >
      <div className="ta-inner relative z-10 mx-auto flex max-w-[1232px] flex-col gap-10 lg:gap-16">
        <div className="ta-head flex max-w-[670px] flex-col">
          <SectionMark />
          <p className="mt-6 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {tulipAction.eyebrow}
          </p>
          <h2
            id="ta-title"
            className="mt-4 text-[clamp(2rem,3.8vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {tulipAction.title}
          </h2>
          <p className="mt-4 text-base leading-[1.4] tracking-[0.02em] text-mist">
            {tulipAction.body}
          </p>
        </div>

        <div className="ta-grid relative grid gap-[18px] lg:grid-cols-3 lg:gap-6">
          {tulipAction.cards.map((card) => (
            <article
              key={card.title}
              className="ta-card paper-grain texture-grain flex min-h-0 flex-col gap-4 rounded-3xl border border-[#e3e270]/40 p-8 transition-[opacity,transform,border-color,background-color,box-shadow] duration-[400ms] ease-out lg:min-h-[218px]"
            >
              <h3 className="text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-base leading-[1.5] text-mist/75">{card.body}</p>
            </article>
          ))}

          <span
            className="ta-arrow ta-arrow-1 pointer-events-none absolute top-1/2 left-[calc(33.333%-28px)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-lg border border-[#34520b]/15 bg-white shadow-[0_4px_12px_rgba(1,30,12,0.1)] lg:grid"
            aria-hidden="true"
          >
            <FlowArrow />
          </span>
          <span
            className="ta-arrow ta-arrow-2 pointer-events-none absolute top-1/2 left-[calc(66.667%-20px)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-lg border border-[#34520b]/15 bg-white shadow-[0_4px_12px_rgba(1,30,12,0.1)] lg:grid"
            aria-hidden="true"
          >
            <FlowArrow />
          </span>
        </div>
      </div>
    </InView>
  );
}

function FlowArrow() {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden="true">
      <path
        d="M24 15L33 24L24 33M33 24H15"
        stroke="#75A105"
        strokeWidth="2.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M8.003 8.003 16.003 0 23.998 8.003H8.003Z" fill="#9CA703" />
      <path d="M23.998 23.998 15.998 32 8.003 23.998h15.995Z" fill="#9CA703" />
      <path d="M23.998 8.003 32 16.003l-8.002 7.995V8.003Z" fill="#9CA703" />
      <path d="M8.003 23.998 0 15.998l8.003-7.995v15.995Z" fill="#9CA703" />
    </svg>
  );
}
