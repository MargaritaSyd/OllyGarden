"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const BARE_PATHS = new Set(["/get-started"]);

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const bare = BARE_PATHS.has(pathname);

  return (
    <>
      {bare ? null : header}
      <main className={bare ? "flex min-h-dvh flex-1 flex-col" : "flex-1"}>
        {children}
      </main>
      {bare ? null : footer}
    </>
  );
}
