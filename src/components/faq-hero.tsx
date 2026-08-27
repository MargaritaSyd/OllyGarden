import { HeroBlob } from "@/components/hero-blob";
import { faqHero } from "@/lib/faq";

export function FaqHero() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11.5rem)] pb-[clamp(5.5rem,10vw,9rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-16"
      aria-labelledby="faq-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <BadgeChevrons />
          {faqHero.badge}
        </div>
        <h1
          id="faq-title"
          className="ov-blur-rise mt-6 max-w-[760px] text-[clamp(2.375rem,4.45vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {faqHero.title}
        </h1>
        <p className="ov-fade-up mt-6 max-w-[620px] text-base leading-[1.375] text-[#d1d5db] [animation-delay:0.7s]">
          {faqHero.lede}
        </p>
      </div>
    </section>
  );
}

function BadgeChevrons() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
        stroke="#E3E270"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
