import { InView } from "@/components/in-view";
import { companyPrinciples } from "@/lib/company";

const placeClass: Record<(typeof companyPrinciples.cards)[number]["id"], string> = {
  a: "xl:top-[16%] xl:left-[4%]",
  b: "xl:top-[11%] xl:right-[3%]",
  c: "xl:bottom-[140px] xl:left-[6%]",
  d: "xl:bottom-[120px] xl:left-1/2 xl:-translate-x-1/2",
  e: "xl:top-[48%] xl:right-[4%]",
};

const floatClass: Record<(typeof companyPrinciples.cards)[number]["id"], string> = {
  a: "p-a",
  b: "p-b",
  c: "p-c",
  d: "p-d",
  e: "p-e",
};

export function CompanyPrinciples() {
  return (
    <InView
      as="section"
      className="relative overflow-hidden py-[clamp(4rem,6.5vw,5rem)] xl:py-0"
      aria-labelledby="principles-title"
    >
      <div className="tulip-grid company-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1440px] px-[clamp(1.5rem,7.25vw,6.5rem)] xl:min-h-[760px]">
        <header className="ov-stagger mx-auto flex max-w-[620px] flex-col items-center gap-4 text-center xl:absolute xl:top-[30%] xl:left-1/2 xl:-translate-x-1/2">
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyPrinciples.eyebrow}
          </p>
          <h2
            id="principles-title"
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist"
          >
            {companyPrinciples.title}
          </h2>
          <p className="max-w-[480px] text-base leading-[1.5] text-mist/75">
            {companyPrinciples.lede}
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[721px]:mx-auto min-[721px]:max-w-[760px] min-[721px]:grid-cols-2 xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0 xl:block xl:max-w-none xl:gap-0">
          {companyPrinciples.cards.map((card) => (
            <li
              key={card.id}
              className={`xl:pointer-events-auto xl:absolute xl:w-[min(300px,22vw)] ${placeClass[card.id]}`}
            >
              <div className={`p-card ${floatClass[card.id]}`}>
                <article className="p-card-body h-full rounded-[18px] border border-bitmap-highlight/45 px-[26px] py-6 shadow-[0_18px_44px_rgba(0,0,0,0.35)] transition-[box-shadow,border-color] duration-[450ms] hover:border-bitmap-highlight/55 hover:shadow-[0_22px_50px_rgba(0,0,0,0.4),0_0_24px_rgba(217,229,51,0.1)]">
                  <h3 className="mb-2.5 text-xl leading-6 font-bold tracking-[-0.01em] text-mist">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-[1.5] text-mist/75">{card.body}</p>
                </article>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}
