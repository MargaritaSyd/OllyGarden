import Link from "next/link";
import { ArrowLinks } from "@/components/blog-ui";
import type { RelatedLink } from "@/lib/related";

/** Server-rendered links to the case studies, products, and posts that go with a page. */
export function RelatedReading({
  title,
  links,
  more = [],
}: {
  title: string;
  links: readonly RelatedLink[];
  more?: readonly { href: string; label: string }[];
}) {
  return (
    <section
      aria-labelledby="related-reading"
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3rem,6vw,5rem)] max-[880px]:px-6"
    >
      <div className="mx-auto max-w-[1232px]">
        <h2
          id="related-reading"
          className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.25] font-bold text-mist"
        >
          {title}
        </h2>
        <ul className="mt-6 grid grid-cols-3 gap-4 max-[991px]:grid-cols-2 max-[640px]:grid-cols-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group surface-grain flex h-full flex-col rounded-3xl border border-mist/12 bg-[#00280e] p-6 transition-[border-color] duration-250 hover:border-sunflower/60 focus-visible:border-sunflower max-[767px]:rounded-2xl max-[767px]:p-5"
              >
                <span className="text-xs font-semibold tracking-[0.08em] text-bitmap-mid uppercase">
                  {link.kicker}
                </span>
                <span className="mt-2 text-lg leading-[26px] font-bold text-mist group-hover:text-bitmap-highlight">
                  {link.title}
                </span>
                <span className="mt-2 text-[15px] leading-[22px] text-[#9dafa3]">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ArrowLinks links={more} />
      </div>
    </section>
  );
}
