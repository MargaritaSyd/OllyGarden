import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { PetalMark } from "@/components/blog-ui";
import {
  formatPressDate,
  pressReleaseHref,
  pressReleases,
} from "@/lib/press";

export function PressList() {
  return (
    <section
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-label="Press releases"
    >
      <div className="mx-auto flex max-w-[1232px] flex-col gap-[clamp(1.75rem,4vw,4rem)]">
        {pressReleases.map((release) => (
          <Link
            key={release.slug}
            href={pressReleaseHref(release.slug)}
            className="group surface-grain relative block overflow-hidden rounded-3xl border border-sunflower/40 bg-[#00280e] p-[clamp(1.25rem,2.6vw,2rem)] transition-[border-color] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-sunflower/60 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-white/[0.06] after:opacity-0 after:transition-opacity after:duration-250 hover:after:opacity-100 max-[767px]:rounded-[20px]"
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
      </div>
    </section>
  );
}
