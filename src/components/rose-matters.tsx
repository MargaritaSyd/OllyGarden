import { roseMatters } from "@/lib/rose";

const placeClass: Record<(typeof roseMatters.cards)[number]["place"], string> = {
  tl: "lg:top-[15%] lg:left-[5%]",
  bl: "lg:bottom-[17%] lg:left-[4%]",
  tr: "lg:top-[15%] lg:right-[5%]",
  br: "lg:bottom-[15%] lg:right-[4%]",
};

const rotClass: Record<(typeof roseMatters.cards)[number]["place"], string> = {
  tl: "lg:[--rose-rot:-6deg]",
  bl: "lg:[--rose-rot:-4deg]",
  tr: "lg:[--rose-rot:4deg]",
  br: "lg:[--rose-rot:7deg]",
};

export function RoseMatters() {
  return (
    <section aria-labelledby="matters-title">
      <div className="relative mx-auto flex min-h-0 w-full max-w-[1440px] items-center justify-center px-5 py-[clamp(5.625rem,10vw,9.375rem)] sm:px-12 lg:min-h-[560px]">
        <div className="relative z-10 max-w-[620px] text-center">
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
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block"
        >
          {roseMatters.cards.map((card) => (
            <li
              key={card.title}
              className={`lg:pointer-events-auto lg:absolute lg:w-[min(20rem,24vw)] ${placeClass[card.place]}`}
            >
              <article
                className={`rose-card-float surface-grain h-full rounded-2xl border border-[#d9e533]/22 bg-[#19321e] px-6 py-5 shadow-[0_18px_44px_rgba(0,0,0,0.35)] ${rotClass[card.place]}`}
              >
                <h3 className="text-lg font-semibold text-mist">{card.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-mist/70">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
