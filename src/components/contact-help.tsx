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
      className="px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="hcw-title"
    >
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[720px] flex-col items-start gap-4">
          <HelpMotif />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {contactHelp.eyebrow}
          </p>
          <h2
            id="hcw-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {contactHelp.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{contactHelp.lede}</p>
        </header>

        <div className="grid gap-8 min-[721px]:grid-cols-2 min-[1101px]:grid-cols-4">
          {contactHelp.cards.map((card) => (
            <article
              key={card.key}
              className="flex flex-col gap-4 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8"
            >
              <span
                className="grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20"
                aria-hidden="true"
              >
                <HelpIcon d={contactIcons[card.key]} />
              </span>
              <h3 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-base leading-[1.4] text-mist/75">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          {contactHelp.stripes.map((stripe) => (
            <article
              key={stripe.key}
              className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-sunflower/32 bg-[#002810] px-8 py-10 min-[881px]:flex-row min-[881px]:items-center min-[881px]:px-12"
            >
              <div className="flex max-w-[820px] flex-col items-start gap-4">
                <span
                  className="grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20"
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
                <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
                  {stripe.title}
                </h3>
                <p className="text-base leading-[1.4] tracking-[0.02em] text-mist/80">
                  {stripe.body}
                </p>
              </div>
              <GetStartedLink
                href={stripe.href}
                className="group shrink-0 rounded-xl px-6"
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
