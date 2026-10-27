"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PageMotif } from "@/components/page-motif";
import { isChromeless } from "@/lib/chrome";

type SiteChromeProps = {
  announcement: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  /** Consent banner and analytics; the booth renders neither. */
  analytics: ReactNode;
  children: ReactNode;
};

/**
 * Site chrome around every page. Chromeless pages (see `isChromeless`) get the page alone: no
 * announcement bar, header, motif, footer, consent banner, or analytics.
 */
export function SiteChrome({ announcement, header, footer, analytics, children }: SiteChromeProps) {
  if (isChromeless(usePathname())) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      {announcement}
      {/* The motif is absolute at the top of this wrapper. The header is fixed over the page. */}
      <div className="relative flex flex-1 flex-col">
        <PageMotif />
        {header}
        <main className="flex-1">{children}</main>
      </div>
      {footer}
      {analytics}
    </>
  );
}
