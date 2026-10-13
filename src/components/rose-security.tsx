import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { roseSecurity, type RoseSecurityIcon } from "@/lib/rose";

/* Lucide glyphs exported from Figma (2371:31896, 2371:31903, 2371:31910). */
const iconSrc: Record<RoseSecurityIcon, string> = {
  shield: "/images/rose/icon-sandbox.svg",
  branch: "/images/rose/icon-branch.svg",
  copy: "/images/rose/icon-copy.svg",
};

const bandClass =
  "flex flex-col items-start gap-5 rounded-3xl border border-sunflower/32 bg-[#002810] p-6 sm:p-8";

export function RoseSecurity() {
  return (
    <InView
      as="section"
      aria-labelledby="security-title"
      className="relative overflow-hidden"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="ov-stagger relative mx-auto flex w-full max-w-[1328px] flex-col gap-12 px-5 py-[clamp(4.75rem,8vw,6rem)] sm:px-12">
        <div className="flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/rose/glyph-security.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="size-8"
          />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {roseSecurity.eyebrow}
          </p>
          <h2
            id="security-title"
            className="max-w-[593px] text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
          >
            {roseSecurity.title}
          </h2>
        </div>

        <div className={`${bandClass} lg:flex-row lg:items-center`}>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.16] font-bold tracking-[-0.02em] text-mist">
              {roseSecurity.run.title}
            </h3>
            <div className="text-base leading-[1.7] tracking-[0.02em] text-mist/90">
              {roseSecurity.run.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <ul
            aria-label="Deployment options"
            className="flex w-full flex-wrap gap-5 lg:w-[374px] lg:justify-end"
          >
            {roseSecurity.run.chips.map((chip) => (
              <li
                key={chip}
                className="surface-grain inline-flex items-center rounded-full border border-white/14 bg-[#19321e] px-4 py-1.5 text-base font-medium tracking-[0.01em] text-bitmap-highlight"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-10 sm:[&>:last-child]:col-span-2 lg:grid-cols-3 lg:[&>:last-child]:col-span-1">
          {roseSecurity.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-3xl border border-bitmap-highlight/40 bg-[#00280e]/60 p-8"
            >
              <div className="grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconSrc[card.icon]}
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  className="size-8"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="mt-2 text-base leading-[1.5] text-mist/75">{card.body}</p>
            </li>
          ))}
        </ul>

        <div className={`${bandClass} md:flex-row md:items-center`}>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl font-bold tracking-[-0.01em] text-mist">
              {roseSecurity.enterprise.title}
            </h3>
            <p className="max-w-[820px] text-base leading-[1.4] tracking-[0.02em] text-[#bbc4b7]">
              {roseSecurity.enterprise.body}
            </p>
          </div>
          <GetStartedLink
            href={roseSecurity.enterprise.href}
            className="rounded-xl"
            analytics={{ id: "rose_security_data_handling", section: "security" }}
          >
            {roseSecurity.enterprise.cta}
            <CtaArrow />
          </GetStartedLink>
        </div>
      </div>
    </InView>
  );
}
