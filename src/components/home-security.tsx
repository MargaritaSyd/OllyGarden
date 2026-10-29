import { InView } from "@/components/in-view";
import { homeSecurity } from "@/lib/home";

// Flat #011e0c panel with the dashed grid. Desktop puts the copy on the left
// and the SOC seal on the right; from the md breakpoint down the card stacks
// and centers the seal.
export function HomeSecurity() {
  return (
    <InView as="section" aria-labelledby="ogsec-title" className="ogsec">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="ogsec-inner">
        <div className="ogsec-card surface-grain">
          <div className="ogsec-copy">
            <p className="ogsec-eyebrow">{homeSecurity.eyebrow}</p>
            <h2 id="ogsec-title" className="ogsec-title">
              {homeSecurity.title}
            </h2>
            <p className="ogsec-body">{homeSecurity.body}</p>
          </div>
          <div className="ogsec-badge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={homeSecurity.badgeSrc}
            alt={homeSecurity.badgeAlt}
            width={171}
            height={171}
            loading="lazy"
            decoding="async"
          />
            <span className="ogsec-tm" aria-hidden="true">
              TM
            </span>
          </div>
        </div>
      </div>
    </InView>
  );
}
