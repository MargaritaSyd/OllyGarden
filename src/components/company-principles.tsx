import { companyPrinciples } from "@/lib/company";

export function CompanyPrinciples() {
  return (
    <section
      className="relative overflow-hidden py-[clamp(4rem,6.5vw,5rem)]"
      aria-labelledby="principles-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1440px] px-[clamp(1.5rem,7.25vw,6.5rem)] min-[1101px]:min-h-[760px] min-[1101px]:px-[104px]">
        <header className="mx-auto flex max-w-[620px] flex-col items-center gap-4 text-center min-[1101px]:absolute min-[1101px]:top-[228px] min-[1101px]:left-1/2 min-[1101px]:-translate-x-1/2">
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyPrinciples.eyebrow}
          </p>
          <h2
            id="principles-title"
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist"
          >
            {companyPrinciples.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist/75">{companyPrinciples.lede}</p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[721px]:grid-cols-2 min-[1101px]:absolute min-[1101px]:inset-0 min-[1101px]:mt-0 min-[1101px]:block min-[1101px]:gap-0">
          {companyPrinciples.cards.map((card) => (
            <li
              key={card.id}
              className={`min-[1101px]:absolute min-[1101px]:w-[300px] ${card.className}`}
            >
              <article className="rounded-[18px] border border-bitmap-highlight/45 bg-[#143d20] px-[26px] py-6">
                <h3 className="mb-2.5 text-xl leading-6 font-bold tracking-[-0.01em] text-mist">
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.5] text-mist/75">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
