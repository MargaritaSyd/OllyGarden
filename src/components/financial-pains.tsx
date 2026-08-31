import { InView } from "@/components/in-view";
import { financialPains, type FinancialPainIcon } from "@/lib/financial";
import type { CSSProperties } from "react";

type PainCard = {
  title: string;
  body: string;
  icon?: FinancialPainIcon;
  iconPath?: string;
};

type PainsContent = {
  eyebrow: string;
  titleLead: string;
  titleRest: string;
  sub: string;
  cards: readonly PainCard[];
};

const decoPixels = [
  { className: "top-0 right-[340px] bg-sunflower", parallax: "-0.08" },
  { className: "top-0 right-[136px] bg-sunflower", parallax: "-0.08" },
  { className: "top-0 right-0 bg-sunflower", parallax: "-0.08" },
  { className: "top-[68px] right-[272px] bg-bitmap-highlight", parallax: "-0.08" },
  { className: "top-[68px] right-[204px] bg-sunflower", parallax: "-0.08" },
  { className: "top-[68px] right-[68px] bg-sunflower", parallax: "-0.08" },
  { className: "top-[136px] right-0 bg-sunflower", parallax: "-0.08" },
  { className: "bottom-[272px] left-[68px] bg-bitmap-highlight", parallax: "0.09" },
  { className: "bottom-[204px] left-[68px] bg-sunflower", parallax: "-0.10" },
  { className: "bottom-[340px] left-0 bg-sunflower", parallax: "0.11" },
  { className: "bottom-[136px] left-0 bg-sunflower", parallax: "-0.09" },
  { className: "bottom-[68px] left-[68px] bg-sunflower", parallax: "0.10" },
  { className: "bottom-0 left-[136px] bg-sunflower", parallax: "-0.12" },
  { className: "bottom-0 left-0 bg-sunflower", parallax: "0.08" },
] as const;

const iconPaths: Record<FinancialPainIcon, string> = {
  costs:
    "M34.668 35.9993H37.3346C38.0419 35.9993 38.7202 35.7184 39.2203 35.2183C39.7204 34.7182 40.0013 34.0399 40.0013 33.3327C40.0013 32.6254 39.7204 31.9472 39.2203 31.4471C38.7202 30.947 38.0419 30.666 37.3346 30.666H33.3346C32.5346 30.666 31.868 30.9327 31.468 31.466L24.0013 38.666M29.3346 43.9993L31.468 42.1327C31.868 41.5993 32.5346 41.3327 33.3346 41.3327H38.668C40.1346 41.3327 41.468 40.7993 42.4013 39.7327L48.5346 33.866C49.0492 33.3798 49.3494 32.7091 49.3695 32.0014C49.3895 31.2938 49.1275 30.6072 48.6413 30.0927C48.1551 29.5782 47.4844 29.2779 46.7767 29.2579C46.0691 29.2379 45.3825 29.4998 44.868 29.986L39.268 35.186M22.668 37.3327L30.668 45.3327M45.2013 27.9993C45.2013 30.1349 43.4701 31.866 41.3346 31.866C39.1991 31.866 37.468 30.1349 37.468 27.9993C37.468 25.8638 39.1991 24.1327 41.3346 24.1327C43.4701 24.1327 45.2013 25.8638 45.2013 27.9993ZM32.0013 22.666C32.0013 24.8752 30.2104 26.666 28.0013 26.666C25.7922 26.666 24.0013 24.8752 24.0013 22.666C24.0013 20.4569 25.7922 18.666 28.0013 18.666C30.2104 18.666 32.0013 20.4569 32.0013 22.666Z",
  pii: "M34.6673 45.3333C29.5927 43.4 25.334 40.0453 25.334 33.3333V23.9999C25.334 23.6463 25.4745 23.3072 25.7245 23.0571C25.9746 22.8071 26.3137 22.6666 26.6673 22.6666C29.334 22.6666 32.6673 21.0666 34.9873 19.0399C35.2698 18.7986 35.6291 18.666 36.0007 18.666C36.3722 18.666 36.7315 18.7986 37.014 19.0399C39.3473 21.0799 42.6673 22.6666 45.334 22.6666C45.6876 22.6666 46.0267 22.8071 46.2768 23.0571C46.5268 23.3072 46.6673 23.6463 46.6673 23.9999V29.3333M39.898 38.0626L38.6673 37.5519M39.898 41.1239L38.6673 41.6346M42.0633 35.8973L41.5527 34.6666M42.0633 43.2893L41.5527 44.5213M45.1247 35.8973L45.6353 34.6666M45.634 44.5213L45.1247 43.2893M47.29 38.0626L48.5207 37.5519M47.29 41.1239L48.5207 41.6346M47.594 39.5933C47.594 41.8024 45.8031 43.5933 43.594 43.5933C41.3848 43.5933 39.594 41.8024 39.594 39.5933C39.594 37.3841 41.3848 35.5933 43.594 35.5933C45.8031 35.5933 47.594 37.3841 47.594 39.5933Z",
  lockin:
    "M36 28V29.6773M41.3333 20V27.28M48 28.1573V22.6667C48 21.9594 47.719 21.2811 47.219 20.781C46.7189 20.281 46.0406 20 45.3333 20H26.6667C25.9594 20 25.2811 20.281 24.781 20.781C24.281 21.2811 24 21.9594 24 22.6667V41.3333C24 42.0406 24.281 42.7189 24.781 43.219C25.2811 43.719 25.9594 44 26.6667 44H34.3333M24 36H33.3333M24 28H40.1893M30.6667 36V44M30.6667 20V28M49.3333 39.3333C49.3333 42.6653 47 44.332 44.2267 45.2987C44.0814 45.3479 43.9237 45.3455 43.78 45.292C41 44.332 38.6667 42.6653 38.6667 39.332V34.6667C38.667 34.4901 38.7374 34.3209 38.8624 34.1961C38.9874 34.0714 39.1568 34.0013 39.3333 34.0013C40.6667 34.0013 42.3333 33.2013 43.4933 32.188C43.6361 32.0708 43.8151 32.0067 43.9998 32.0064C44.1845 32.0062 44.3636 32.0699 44.5067 32.1867C45.6733 33.2067 47.3333 34 48.6667 34C48.8435 34 49.013 34.0702 49.1381 34.1953C49.2631 34.3203 49.3333 34.4899 49.3333 34.6667V39.3333Z",
  audit:
    "M22.666 31.9998C22.6654 32.2548 22.7379 32.5047 22.875 32.7198C23.012 32.9348 23.2079 33.106 23.4394 33.2132L34.906 38.4265C35.2516 38.583 35.6266 38.6639 36.006 38.6639C36.3854 38.6639 36.7604 38.583 37.106 38.4265L48.546 33.2265C48.782 33.1204 48.9821 32.9479 49.1218 32.7301C49.2614 32.5123 49.3347 32.2586 49.3327 31.9998M22.666 38.6665C22.6654 38.9215 22.7379 39.1714 22.875 39.3864C23.012 39.6015 23.2079 39.7727 23.4394 39.8798L34.906 45.0932C35.2516 45.2497 35.6266 45.3306 36.006 45.3306C36.3854 45.3306 36.7604 45.2497 37.106 45.0932L48.546 39.8932C48.782 39.7871 48.9821 39.6146 49.1218 39.3968C49.2614 39.179 49.3347 38.9252 49.3327 38.6665M37.106 18.9065C36.7586 18.748 36.3812 18.666 35.9994 18.666C35.6175 18.666 35.2401 18.748 34.8927 18.9065L23.466 24.1065C23.2294 24.2108 23.0283 24.3817 22.887 24.5983C22.7458 24.8149 22.6706 25.0679 22.6706 25.3265C22.6706 25.5851 22.7458 25.8381 22.887 26.0547C23.0283 26.2713 23.2294 26.4422 23.466 26.5465L34.906 31.7598C35.2534 31.9183 35.6308 32.0003 36.0127 32.0003C36.3945 32.0003 36.7719 31.9183 37.1194 31.7598L48.5594 26.5598C48.796 26.4555 48.9971 26.2846 49.1383 26.068C49.2796 25.8514 49.3547 25.5984 49.3547 25.3398C49.3547 25.0812 49.2796 24.8282 49.1383 24.6116C48.9971 24.395 48.796 24.2242 48.5594 24.1198L37.106 18.9065Z",
};

export function FinancialPains({
  content = financialPains,
  glyph = "/images/solutions/financial/glyph.svg",
}: {
  content?: PainsContent;
  glyph?: string;
}) {
  return (
    <InView
      as="section"
      threshold={0.08}
      rootMargin="0px"
      data-fp=""
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,7.5rem)] max-[1100px]:px-[clamp(1.5rem,5vw,3.5rem)] max-[1100px]:py-[clamp(4rem,6vw,6rem)]"
      aria-labelledby="fp-title"
    >
      <div className="fp-deco pointer-events-none absolute inset-0" aria-hidden="true">
        {decoPixels.map((pixel) => (
          <div
            key={pixel.className}
            data-parallax={pixel.parallax}
            className={`fp-sq absolute size-[68px] opacity-30 max-[560px]:size-[42px] ${pixel.className}`}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <InView
          mark="rv-in"
          threshold={0.2}
          rootMargin="0px"
          className="fp-rv mb-[clamp(3rem,5vw,4.5rem)] max-w-[620px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={glyph}
            alt=""
            width={32}
            height={32}
            className="mb-4 block h-8 w-8"
          />
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="fp-title"
            className="mb-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.14] font-bold tracking-[-0.02em] text-mist"
          >
            <span>{content.titleLead}</span>
            <span className="block">{content.titleRest}</span>
          </h2>
          <p className="max-w-[470px] text-base leading-[1.5] tracking-[0.01em] text-[#e2e5c0]/72">
            {content.sub}
          </p>
        </InView>

        <div className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2 min-[561px]:gap-8 min-[1101px]:grid-cols-4 min-[1101px]:gap-[clamp(1.25rem,2vw,2rem)]">
          {content.cards.map((card, index) => (
            <InView
              key={card.title}
              as="article"
              mark="rv-in"
              threshold={0.2}
              rootMargin="0px"
              className="fp-rv fp-stagger surface-grain group relative overflow-hidden rounded-2xl border border-white/8 bg-[#19321e] px-7 pt-7 pb-8 shadow-[inset_0_1px_rgba(255,255,255,0.05)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1.5 hover:border-[#d3de3c]/35 hover:shadow-[0_24px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(217,229,51,0.12),inset_0_1px_rgba(255,255,255,0.08)]"
              style={{ "--i": index } as CSSProperties}
            >
              <PainIcon d={card.iconPath ?? iconPaths[card.icon!]} />
              <h3 className="mt-3 mb-3 text-[21px] leading-[1.24] font-semibold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#e2e5c0]/70">{card.body}</p>
            </InView>
          ))}
        </div>
      </div>
    </InView>
  );
}

function PainIcon({ d }: { d: string }) {
  return (
    <svg
      className="mb-3 block"
      width="48"
      height="48"
      viewBox="12 8 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect x="12" y="8" width="48" height="48" rx="8" fill="#9CA703" fillOpacity="0.2" />
      <rect
        x="12.5"
        y="8.5"
        width="47"
        height="47"
        rx="7.5"
        stroke="#34520B"
        strokeOpacity="0.15"
      />
      <path
        d={d}
        stroke="#9CA703"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
