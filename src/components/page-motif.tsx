"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { MotifField } from "@/components/motif-field";
import type { MotifKind } from "@/lib/motif";

// Next reports this segment for the not-found boundary whatever path was
// requested, so it is the only reliable way to detect the 404 from the layout.
const NOT_FOUND_SEGMENT = "/_not-found";

export function PageMotif() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  // Product heroes own their motif so the canvas does not bleed
  // into later sections (that overlay was showing a grid artifact).
  // The not-found page owns its motif too; its pathname is whatever was
  // requested, so it is matched by segment instead.
  if (
    segments.includes(NOT_FOUND_SEGMENT) ||
    pathname.startsWith("/products/rose") ||
    pathname.startsWith("/products/insights") ||
    pathname === "/pricing" ||
    pathname.startsWith("/solutions/overview") ||
    pathname.startsWith("/solutions/financial-services") ||
    pathname.startsWith("/solutions/retail-ecommerce") ||
    pathname.startsWith("/solutions/enterprise-software") ||
    pathname === "/resources" ||
    pathname.startsWith("/resources/") ||
    pathname === "/company" ||
    pathname === "/contact" ||
    pathname === "/careers" ||
    pathname.startsWith("/otel-quiz")
  ) {
    return null;
  }

  const kind: MotifKind = "frame";

  return (
    <MotifField
      kind={kind}
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100dvh] overflow-hidden select-none"
    />
  );
}
