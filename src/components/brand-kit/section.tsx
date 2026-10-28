import type { ReactNode } from "react";
import { BrandGlyph } from "@/components/brand-kit/glyph";

export function BrandSection({
  id,
  eyebrow,
  title,
  lede,
  icon,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  icon: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
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
