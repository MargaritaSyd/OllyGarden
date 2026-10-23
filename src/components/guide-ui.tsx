import type { ReactNode } from "react";

/** Building blocks shared by the resource guides (Instrumentation Score, telemetry quality). */
export const sectionPad =
  "px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4rem,8vw,6rem)] max-[880px]:px-6";

export const card = "rounded-2xl border border-sunflower/25 bg-[#002810] p-[clamp(1.25rem,3vw,2rem)]";

/** `card` on the reference's grain surface. */
export const grainCard =
  "rounded-2xl border border-sunflower/25 bg-[#19321e] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] p-[clamp(1.25rem,3vw,2rem)]";

export const textLink = "font-semibold text-sunflower underline-offset-2 hover:underline";

export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  ledeClassName,
  mark,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  ledeClassName?: string;
  /** Path of the 32px section glyph shown above the eyebrow. */
  mark?: string;
  children?: ReactNode;
}) {
  return (
    <header className="ov-stagger flex max-w-[760px] flex-col gap-4">
      {mark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mark} alt="" width={32} height={32} className="size-8" />
      ) : null}
      <p className="text-base leading-none font-bold tracking-[0.1em] text-bitmap-mid uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="text-[clamp(32px,3.34vw,48px)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
      >
        {title}
      </h2>
      <p className={`text-base leading-[1.4] tracking-[0.02em] text-mist ${ledeClassName ?? ""}`}>{lede}</p>
      {children}
    </header>
  );
}
