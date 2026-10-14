import { InView } from "@/components/in-view";
import { homeSecurity } from "@/lib/home";

// Figma 2371:27005: flat #011e0c panel with the same dashed grid as the blog
// section, copy on the left and the SOC seal on the right. No glyph, no pixel
// art, no gradient.
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
            width={180}
            height={180}
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
