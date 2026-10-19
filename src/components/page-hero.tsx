import type { ReactNode } from "react";

/**
 * Horizontal inset shared by `PageHero` and `PageBody`. At phone width it
 * clears the single 48px motif column; wider up it clears the two to three
 * columns the frame paints on each side.
 */
const inset = "px-[clamp(3rem,14vw,9rem)]";

type PageHeroProps = {
  /** Small line above the title: a breadcrumb link, a location line, a badge. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Id for the h1; the section is labelled by it. */
  titleId: string;
  lede?: ReactNode;
  /** Anything that belongs with the title, usually a CTA. */
  children?: ReactNode;
  /** Sits beside the title on wide screens and below it on narrow ones. */
  aside?: ReactNode;
  /** Painted behind the title block. The quiz uses this for its mosaic. */
  decoration?: ReactNode;
  className?: string;
};

/**
 * Hero for pages that sit under the global frame motif (see `PageMotif`).
 *
 * The motif paints bitmap cells around the edges of the first viewport, so
 * copy that lands there is unreadable. This hero fills that first viewport
 * with only the title block, keeps it away from the side columns, and pushes
 * everything that follows below the motif. `min-h-dvh` here must match the
 * motif's `h-[100dvh]`.
 */
export function PageHero({
  eyebrow,
  title,
  titleId,
  lede,
  children,
  aside,
  decoration,
  className,
}: PageHeroProps) {
  const copy = (
    <>
      {eyebrow ? (
        <div className="text-sm font-bold tracking-[.14em] text-bitmap-mid uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h1
        id={titleId}
        className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[.98] tracking-[-.04em] text-mist"
      >
        {title}
      </h1>
      {lede ? (
        <p className="mt-7 max-w-3xl text-xl leading-8 text-mist/75">{lede}</p>
      ) : null}
      {children ? <div className="mt-8 max-w-max">{children}</div> : null}
    </>
  );

  return (
    <section
      className={`relative flex min-h-dvh flex-col ${aside ? "justify-start lg:justify-center" : "justify-center"} ${inset} pt-32 pb-16 lg:pt-40 ${className ?? ""}`}
      aria-labelledby={titleId}
    >
      {decoration}
      {aside ? (
        <div className="relative z-[1] mx-auto flex w-full max-w-[1232px] flex-col gap-12 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">{copy}</div>
          {aside}
        </div>
      ) : (
        <div className="relative z-[1] mx-auto w-full max-w-5xl">{copy}</div>
      )}
    </section>
  );
}

/** Body container that shares `PageHero`'s inset and column width. */
export function PageBody({
  children,
  width = "default",
}: {
  children: ReactNode;
  /** "wide" fills the motif inset. The quiz topic grid needs the extra room. */
  width?: "default" | "wide";
}) {
  return (
    <div className={`${inset} pt-12 pb-24`}>
      <div className={width === "wide" ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl"}>
        {children}
      </div>
    </div>
  );
}
