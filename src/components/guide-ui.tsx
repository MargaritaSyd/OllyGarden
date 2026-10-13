import type { ReactNode } from "react";

/** Building blocks shared by the resource guides (Instrumentation Score, telemetry quality). */
export const sectionPad =
  "px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4rem,8vw,6rem)] max-[880px]:px-6";

export const card = "rounded-2xl border border-sunflower/25 bg-[#002810] p-[clamp(1.25rem,3vw,2rem)]";

export const textLink = "font-semibold text-sunflower underline-offset-2 hover:underline";

export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="ov-stagger flex max-w-[760px] flex-col gap-4">
      <p className="text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
      >
        {title}
      </h2>
      <p className="text-base leading-[1.6] text-mist/75">{lede}</p>
      {children}
    </header>
  );
}
