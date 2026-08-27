import { FaqSidenav } from "@/components/faq-sidenav";
import { GetStartedLink } from "@/components/get-started-link";
import { faqSections, faqSupport } from "@/lib/faq";

export function FaqTopics() {
  return (
    <section className="px-[clamp(1.5rem,7.25vw,6.5rem)] pb-24 max-[880px]:px-6 max-[700px]:pb-[4.5rem]">
      <div className="mx-auto grid max-w-[1232px] grid-cols-[232px_minmax(0,1fr)] gap-16 max-[1100px]:grid-cols-[196px_minmax(0,1fr)] max-[1100px]:gap-10 max-[900px]:block">
        <FaqSidenav />
        <div>
          {faqSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-[132px] max-[900px]:scroll-mt-24 [&:not(:first-child)]:mt-16 max-[900px]:[&:not(:first-child)]:mt-12"
              aria-labelledby={`${section.id}-title`}
            >
              <h2
                id={`${section.id}-title`}
                className="mb-4 text-[clamp(1.75rem,2.5vw,2.25rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist"
              >
                {section.title}
              </h2>
              <ul className="flex flex-col gap-4">
                {section.items.map((item) => (
                  <li
                    key={item.q}
                    className="rounded-2xl border border-sunflower/32 bg-[#002810]"
                  >
                    <h3 className="px-6 pt-6 pb-5 text-base leading-[22px] font-medium text-mist max-[700px]:px-5 max-[700px]:pt-5 max-[700px]:pb-4">
                      {item.q}
                    </h3>
                    <p className="px-6 pb-6 text-sm leading-[18px] text-[#9dafa3] max-[700px]:px-5 max-[700px]:pb-5">
                      {item.a}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="surface-grain mt-12 grid items-center gap-x-10 gap-y-[18px] rounded-3xl border border-[#d9e533]/45 bg-[#002810] px-[clamp(1.625rem,3.2vw,2.75rem)] py-[clamp(1.625rem,3vw,2.5rem)] min-[901px]:grid-cols-[minmax(0,1fr)_auto] motion-safe:transition-[transform,box-shadow] motion-safe:duration-[450ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:min-[901px]:hover:-translate-y-1.5 motion-safe:min-[901px]:hover:shadow-[0_0_0_1px_rgba(217,229,51,0.4),0_22px_44px_rgba(0,0,0,0.35),0_0_34px_rgba(217,229,51,0.12)]">
            <div>
              <h2 className="text-[clamp(1.625rem,2.4vw,2rem)] leading-[1.2] font-semibold tracking-[-0.01em] text-mist">
                {faqSupport.title}
              </h2>
              <p className="mt-1.5 text-sm leading-[1.5] text-[#e2e5c0]/62">
                {faqSupport.lede}
              </p>
            </div>
            <GetStartedLink
              href={faqSupport.href}
              className="rounded-xl px-[30px] py-3.5 max-[900px]:max-w-none"
            >
              {faqSupport.cta}
            </GetStartedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
