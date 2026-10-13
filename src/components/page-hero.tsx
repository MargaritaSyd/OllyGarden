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
}: PageHeroProps) {
  return (
    <section
      className={`relative flex min-h-dvh flex-col justify-center ${inset} pt-32 pb-16 lg:pt-40`}
      aria-labelledby={titleId}
    >
      <div className="mx-auto w-full max-w-5xl">
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
          <p className="mt-7 max-w-3xl text-xl leading-8 text-mist/75">
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-8 max-w-max">{children}</div> : null}
      </div>
    </section>
  );
}

/** Body container that shares `PageHero`'s inset and column width. */
export function PageBody({ children }: { children: ReactNode }) {
  return (
    <div className={`${inset} pt-12 pb-24`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}
