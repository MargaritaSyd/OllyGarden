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
      <div className={aside ? "grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,420px)]" : undefined}>
        <div>
          <p className="flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] text-olive uppercase">
            <BrandGlyph name={icon} size={16} className="text-bitmap-highlight" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em]"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-mist/75">{lede}</p>
        </div>
        {aside}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function BrandRules({ rules }: { rules: readonly { title: string; text: string }[] }) {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {rules.map((rule, index) => (
        <article key={rule.title} className="bk-card">
          <span className="bk-rule-n">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-lg font-bold">{rule.title}</h3>
          <p className="text-[15px] leading-6 text-mist/75">{rule.text}</p>
        </article>
      ))}
    </div>
  );
}
