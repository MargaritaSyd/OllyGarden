import Link from "next/link";
import { linkedCardClassName } from "@/components/case-studies";
import { CtaArrow } from "@/components/cta-arrow";
import { PetalMark } from "@/components/blog-ui";
import { PressBlockView } from "@/components/press-article";
import {
  formatPressDate,
  pressKit,
  pressReleaseHref,
  pressReleases,
} from "@/lib/press";
import { registerFirstTitle } from "@/lib/trademarks";

const releases = registerFirstTitle(pressReleases);

export function PressList() {
  return (
    <section
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-label="Press releases"
    >
      <div className="mx-auto flex max-w-[1232px] flex-col gap-[clamp(1.75rem,4vw,4rem)]">
        {releases.map((release) => (
          <Link
            key={release.slug}
            href={pressReleaseHref(release.slug)}
            className={`block ${linkedCardClassName}`}
          >
            <PetalMark size={22} className="mb-5 block text-sunflower" />
            <time
              dateTime={release.date}
              className="block text-sm leading-[18px] text-mist/60"
            >
              {formatPressDate(release.date)}
            </time>
            <h2 className="mt-3.5 max-w-[1140px] text-[clamp(1.375rem,3.2vw,2rem)] leading-[1.28] font-bold text-mist max-[767px]:leading-[1.24]">
              {release.title}
            </h2>
            <p className="mt-4 max-w-[1140px] text-base leading-[1.4] text-mist/80">
              {release.summary}
            </p>
            <span className="mt-[clamp(1.25rem,2.6vw,1.75rem)] inline-flex items-center gap-2 text-lg leading-[25px] font-medium text-sunflower transition-colors group-hover:text-bitmap-highlight">
              <span className="underline underline-offset-2">Read Full Press Release</span>
              <CtaArrow />
            </span>
          </Link>
        ))}
        <div className="flex flex-col gap-8 pt-[clamp(1rem,3vw,2.5rem)]">
          {pressKit.map((block) => (
            <PressBlockView key={block.type} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
