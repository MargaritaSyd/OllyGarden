import type { Metadata } from "next";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { MotifField } from "@/components/motif-field";
import { NotFoundLinks } from "@/components/not-found-links";
import { PageNotFoundEvent } from "@/components/page-not-found-event";
import { createPageMetadata } from "@/lib/metadata";
import { notFoundCopy, notFoundMeta } from "@/lib/not-found";

export const metadata: Metadata = createPageMetadata({
  title: notFoundMeta.title,
  description: notFoundMeta.description,
  path: notFoundMeta.path,
  noIndex: true,
});

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(8rem,12vw,11rem)] pb-[clamp(4rem,7vw,6.5rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-16"
      aria-labelledby="nf-title"
    >
      <PageNotFoundEvent />
      <MotifField
        kind="corners"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col items-center text-center">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <BadgeChevrons />
          {notFoundCopy.badge}
        </div>
        <h1
          id="nf-title"
          className="mt-6 text-[clamp(2.75rem,5.4vw,4rem)] leading-[1.12] font-bold tracking-[-0.02em] text-mist max-[767px]:text-[clamp(2.5rem,8vw,2.75rem)] max-[479px]:text-[2.25rem] max-[479px]:leading-[1.22]"
        >
          {notFoundCopy.title.map((line, index) => (
            <span
              key={line}
              className={`ov-blur-rise block ${
                index === 0 ? "[animation-delay:0.25s]" : "[animation-delay:0.42s]"
              }`}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="ov-fade-up mt-6 max-w-[560px] text-base leading-[1.5] text-mist/75 [animation-delay:0.55s]">
          {notFoundCopy.lede}
        </p>
        <div className="ov-fade-up mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-4 sm:flex-row [animation-delay:0.65s]">
          <GetStartedLink
            href="/"
            analytics={{ id: "not_found_home", section: "not_found" }}
          >
            {notFoundCopy.primary}
            <CtaArrow />
          </GetStartedLink>
          <GetStartedLink
            href="/contact"
            variant="secondary"
            analytics={{ id: "not_found_contact", section: "not_found" }}
          >
            {notFoundCopy.secondary}
          </GetStartedLink>
        </div>
        <div className="ov-fade-up mt-14 w-full max-w-[960px] [animation-delay:0.75s]">
          <NotFoundLinks
            heading={notFoundCopy.linksHeading}
            links={notFoundCopy.links}
          />
        </div>
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
