import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { financialProducts } from "@/lib/financial";
import type { CSSProperties } from "react";

type ProductsContent = {
  eyebrow: string;
  title: string;
  sub: string;
  glyph?: string;
  cards: readonly {
    href: string;
    icon: string;
    family: string;
    title: string;
    body: string;
  }[];
};

export function FinancialProducts({
  content = financialProducts,
  glyph = "/images/solutions/financial/target.svg",
}: {
  content?: ProductsContent;
  glyph?: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(4rem,6vw,6rem)] pb-[clamp(4.5rem,8vw,7.5rem)] max-[1100px]:px-[clamp(1.5rem,5vw,4rem)] max-[1100px]:py-[4.5rem]"
      aria-labelledby="pr-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1]">
        <InView
          mark="rv-in"
          threshold={0.2}
          rootMargin="0px"
          className="pr-rv mb-12 max-w-[780px] max-[880px]:mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={glyph}
            alt=""
            width={32}
            height={32}
            className="mb-4 block h-8 w-8"
          />
          <p className="mb-4 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="pr-title"
            className="mb-5 text-[clamp(2rem,4vw,3rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist"
          >
            {content.title}
          </h2>
          <p className="max-w-[784px] text-base leading-[1.4] text-mist/80">
            {content.sub}
          </p>
        </InView>

        <div className="mx-auto grid grid-cols-1 gap-8 max-[720px]:max-w-[460px] min-[721px]:grid-cols-2 min-[721px]:gap-7 min-[1101px]:grid-cols-3 min-[1101px]:gap-10">
          {content.cards.map((card, index) => (
            <InView
              key={card.href}
              as="article"
              mark="rv-in"
              threshold={0.2}
              rootMargin="0px"
              className="fs-pr-card pr-rv pr-stagger group relative flex min-h-[348px] flex-col overflow-hidden rounded-3xl border border-bitmap-highlight/40 p-8 transition-[transform,border-color,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-1 hover:border-bitmap-highlight/70 hover:shadow-[0_20px_44px_rgba(0,0,0,0.4),0_0_28px_rgba(217,229,51,0.1)] max-[720px]:min-h-0"
              style={{ "--i": index } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.icon}
                alt=""
                width={33}
                height={40}
                loading="lazy"
                className="mb-4 block h-10 w-[33px]"
              />
              <p className="mb-3 text-sm font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                {card.family}
              </p>
              <h3 className="mb-3 text-2xl leading-[1.29] font-bold tracking-[-0.02em] text-mist">
                {card.title}
              </h3>
              <p className="mb-6 text-[15px] leading-[1.5] text-mist/75">{card.body}</p>
              <GetStartedLink
                href={card.href}
                fullWidth
                className="mt-auto h-[54px] min-h-[54px] bg-white text-black"
              >
                Learn More
                <CtaArrow />
              </GetStartedLink>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
