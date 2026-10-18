import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLinks } from "@/components/blog-ui";
import { CtaArrow } from "@/components/cta-arrow";
import { InView } from "@/components/in-view";
import type { RelatedLink } from "@/lib/related";

/** Server-rendered links to the case studies, products, and posts that go with a page. */
export function RelatedReading({
  title,
  links,
  more = [],
  eyebrow,
  explore,
}: {
  title: string;
  links: readonly RelatedLink[];
  more?: readonly { href: string; label: string }[];
  eyebrow?: string;
  explore?: { eyebrow: string; title: string; body: string };
}) {
  if (eyebrow && explore) {
    return (
      <InView as="section" aria-labelledby="related-reading" className="rz-work">
        <div className="rz-work-inner">
          <div className="rz-work-head">
            <p className="rz-work-eyebrow">{eyebrow}</p>
            <h2 id="related-reading" className="rz-work-title">
              {title}
            </h2>
          </div>
          <ul className="rz-work-list">
            {links.map((link, index) => (
              <li key={link.href} style={{ "--i": index } as CSSProperties}>
                <Link href={link.href} className="rz-work-card">
                  <span className="rz-work-kind">{link.kicker}</span>
                  <span className="rz-work-card-title">{link.title}</span>
                  <span className="rz-work-card-desc">{link.description}</span>
                  <span className="rz-work-read">
                    <span>{readingAction(link.kicker)}</span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="rz-banner rz-work-more">
            <div className="rz-work-copy">
              <p className="rz-work-eyebrow">{explore.eyebrow}</p>
              <h3 className="rz-work-more-title">{explore.title}</h3>
              <p className="rz-work-more-desc">{explore.body}</p>
            </div>
            <ul className="rz-work-links">
              {more.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rz-work-link group">
                    <span>{link.label}</span>
                    <CtaArrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </InView>
    );
  }

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

function readingAction(kicker: string) {
  if (/^blog/i.test(kicker)) return "Read Article";
  if (/^case study/i.test(kicker)) return "Read the Story";
  return "Learn More";
}
