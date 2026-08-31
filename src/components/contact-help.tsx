import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import {
  contactHelp,
  contactIcons,
  type ContactHelpIcon,
} from "@/lib/contact";

export function ContactHelp() {
  return (
    <section
      className="px-[clamp(1.25rem,7.25vw,6.5rem)] py-[clamp(3.5rem,7vw,6rem)] pb-[clamp(5rem,10vw,9.2rem)] max-[1023px]:px-16 max-[1023px]:py-[72px] max-[1023px]:pb-24 max-[767px]:px-5 max-[767px]:py-14 max-[767px]:pb-20"
      aria-labelledby="hcw-title"
    >
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12 max-[767px]:gap-8">
        <header className="flex max-w-[720px] flex-col items-start">
          <HelpMotif />
          <p className="mt-4 text-base leading-5 font-bold tracking-[0.1em] text-bitmap-mid uppercase max-[767px]:text-sm max-[767px]:leading-[18px]">
            {contactHelp.eyebrow}
          </p>
          <h2
            id="hcw-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[1023px]:text-[clamp(2.25rem,5vw,2.5rem)] max-[767px]:text-[2rem] max-[767px]:leading-[1.14]"
          >
            {contactHelp.title}
          </h2>
          <p className="mt-5 text-base leading-[1.5] text-mist">{contactHelp.lede}</p>
        </header>

        <div className="grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1280px]:grid-cols-4 max-[767px]:gap-5">
          {contactHelp.cards.map((card) => (
            <article
              key={card.key}
              className="ct-help-card group relative flex min-h-[284px] flex-col overflow-hidden rounded-3xl border border-bitmap-highlight/40 p-8 transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out motion-safe:hover:-translate-y-1 hover:border-bitmap-highlight/70 hover:bg-[rgba(0,40,14,0.7)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.4),0_0_28px_rgba(217,229,51,0.1),inset_0_1px_rgba(255,255,255,0.08)] max-[1279px]:min-h-0"
            >
              <span
                className="mb-5 grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,20,8,0.35)] transition-[border-color,transform] duration-200 ease-out group-hover:border-bitmap-mid/50 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <HelpIcon d={contactIcons[card.key]} />
              </span>
              <h3 className="mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-base leading-[1.5] text-mist/75 transition-colors duration-200 group-hover:text-mist/90">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          {contactHelp.stripes.map((stripe) => (
            <article
              key={stripe.key}
              className="ct-stripe relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl border border-sunflower/32 px-[clamp(1.75rem,3.3vw,3rem)] py-[clamp(1.75rem,3vw,2.5rem)] min-[768px]:flex-row min-[768px]:items-center max-[767px]:gap-5"
            >
              <div className="flex max-w-[900px] flex-col items-start">
                <span
                  className="mb-5 grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,20,8,0.35)]"
                  aria-hidden="true"
                >
                  {stripe.key === "about" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/brand/logo.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="block size-8"
                    />
                  ) : (
                    <HelpIcon d={contactIcons[stripe.key as ContactHelpIcon]} />
                  )}
                </span>
                <h3 className="mb-3 text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                  {stripe.title}
                </h3>
                <p className="text-base leading-[1.5] text-[#bbc4b7]">{stripe.body}</p>
              </div>
              <GetStartedLink
                href={stripe.href}
                className="group shrink-0 rounded-xl px-6 max-[767px]:w-full max-[767px]:max-w-none"
              >
                {stripe.cta}
                <CtaArrow />
              </GetStartedLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HelpMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M24.0326 0H7.96752V7.96748H24.0326V0Z" fill="#9CA703" />
      <path d="M24.0326 24.0325H7.96751V32H24.0326V24.0325Z" fill="#9CA703" />
      <path
        d="M7.96752 7.96748L0 7.96752V24.0326L7.96751 24.0325L7.96752 7.96748Z"
        fill="#9CA703"
      />
      <path
        d="M32 7.96752L24.0326 7.96748L24.0326 24.0325L32 24.0326V7.96752Z"
        fill="#9CA703"
      />
    </svg>
  );
}

function HelpIcon({ d }: { d: string }) {
  return (
    <svg width="32" height="32" viewBox="12 8 48 48" fill="none" aria-hidden="true">
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
