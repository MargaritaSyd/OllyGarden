import { HeroBlob } from "@/components/hero-blob";
import { pricingHero } from "@/lib/pricing";
import { registerOpenTelemetry } from "@/lib/trademarks";

export function PricingHero() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11.5rem)] pb-[clamp(3rem,6vw,5rem)] max-[880px]:px-6 max-[880px]:pt-[132px]"
      aria-labelledby="pricing-page-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <p className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {pricingHero.badge}
        </p>
        <h1
          id="pricing-page-title"
          className="ov-blur-rise mt-6 max-w-[760px] text-[clamp(2.375rem,4.45vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {pricingHero.title}
        </h1>
        <p className="ov-fade-up mt-6 max-w-[620px] text-base leading-[1.5] text-[#d1d5db] [animation-delay:0.7s]">
          {registerOpenTelemetry(pricingHero.lede)}
        </p>
        <nav aria-label="Products on this page" className="ov-fade-up mt-10 [animation-delay:0.85s]">
          <ul className="grid max-w-[640px] gap-3 sm:grid-cols-2">
            {pricingHero.jumps.map((jump) => (
              <li key={jump.href}>
                <a
                  href={jump.href}
                  className="flex h-full flex-col gap-1 rounded-xl border border-sunflower/32 bg-[#002810] px-5 py-4 transition-colors hover:border-sunflower/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#9ca703]/90"
                >
                  <span className="text-lg font-semibold text-mist">
                    {jump.label} <span aria-hidden="true">↓</span>
                  </span>
                  <span className="text-sm text-mist/70">{jump.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
