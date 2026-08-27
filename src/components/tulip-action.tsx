import { tulipAction } from "@/lib/tulip";

export function TulipAction() {
  return (
    <section aria-labelledby="ta-title" className="px-6 py-16 sm:px-12 lg:px-[104px] lg:py-24">
      <div className="mx-auto max-w-[1328px]">
        <SectionMark />
        <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
          {tulipAction.eyebrow}
        </p>
        <h2
          id="ta-title"
          className="mt-4 max-w-[920px] text-[clamp(2rem,3.8vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
        >
          {tulipAction.title}
        </h2>
        <p className="mt-5 max-w-[760px] text-base leading-[1.66] text-mist/75">
          {tulipAction.body}
        </p>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {tulipAction.cards.map((card) => (
            <article
              key={card.title}
              className="surface-grain rounded-3xl border border-white/8 bg-[#19321e] p-7"
            >
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-mist/75">{card.body}</p>
            </article>
          ))}

          <span
            className="pointer-events-none absolute top-1/2 left-[calc(33.333%-28px)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-lg border border-[#34520b]/15 bg-white shadow-[0_4px_12px_rgba(1,30,12,0.1)] lg:grid"
            aria-hidden="true"
          >
            <FlowArrow />
          </span>
          <span
            className="pointer-events-none absolute top-1/2 left-[calc(66.667%-20px)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-lg border border-[#34520b]/15 bg-white shadow-[0_4px_12px_rgba(1,30,12,0.1)] lg:grid"
            aria-hidden="true"
          >
            <FlowArrow />
          </span>
        </div>
      </div>
    </section>
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
