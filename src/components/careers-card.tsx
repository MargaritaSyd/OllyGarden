import type { ReactNode } from "react";

export function CareersCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative isolate overflow-hidden rounded-3xl border border-bitmap-highlight/40 bg-forest ${className}`}
    >
      <div
        className="surface-grain pointer-events-none absolute inset-0 bg-forest"
        aria-hidden="true"
      />
      <div className="relative p-8">{children}</div>
    </article>
  );
}

export function CareersIconTile({ children }: { children: ReactNode }) {
  return (
    <span
      className="grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function CareersStrokeIcon({ d }: { d: string }) {
  return (
    <svg width="32" height="32" viewBox="12 8 48 48" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="#9CA703"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CareersMailLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-mist px-6 text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
    >
      {children}
    </a>
  );
}
