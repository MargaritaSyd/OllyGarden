import type { ReactNode } from "react";
import { BrandGlyph } from "@/components/brand-kit/glyph";

export function BrandSection({
  id,
  eyebrow,
  title,
  lede,
  icon,
  aside,
  grid = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  icon: string;
  aside?: ReactNode;
  /** Dashed field behind this section only. It stops at the section edge. */
  grid?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={grid ? "bk-grid-sec scroll-mt-28" : "scroll-mt-28"}>
      {grid ? <div className="tulip-grid" aria-hidden="true" /> : null}
      <div className="relative z-[1] mx-auto w-full max-w-[1232px] px-5 sm:px-8 lg:px-12">
        <div className={aside ? "bk-head-split" : undefined}>
          <div className="bk-head">
            <BrandGlyph name={icon} size={32} className="bk-mark" />
            <p className="bk-kicker">{eyebrow}</p>
            <h2 id={`${id}-title`} className="bk-h2">
              {title}
            </h2>
            <p className="bk-sub">{lede}</p>
          </div>
          {aside}
        </div>
        <div className="bk-section-body">{children}</div>
      </div>
    </section>
  );
}

export function BrandRules({ rules }: { rules: readonly { title: string; text: string }[] }) {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {rules.map((rule, index) => (
        <article key={rule.title} className="bk-card">
          <span className="bk-rule-n">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="bk-card-title">{rule.title}</h3>
          <p className="bk-card-desc">{rule.text}</p>
        </article>
      ))}
    </div>
  );
}
