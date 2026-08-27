"use client";

import { usePathname } from "next/navigation";
import { MotifField } from "@/components/motif-field";
import type { MotifKind } from "@/lib/motif";

export function PageMotif() {
  const pathname = usePathname();

  // Product heroes own their motif so the canvas does not bleed
  // into later sections (that overlay was showing a grid artifact).
  if (
    pathname.startsWith("/products/rose") ||
    pathname.startsWith("/products/tulip") ||
    pathname.startsWith("/products/insights") ||
    pathname.startsWith("/solutions/overview") ||
    pathname.startsWith("/solutions/financial-services") ||
    pathname.startsWith("/solutions/retail-ecommerce") ||
    pathname.startsWith("/solutions/enterprise-software") ||
    pathname === "/resources/blog" ||
    pathname === "/resources/community" ||
    pathname === "/resources/press-releases" ||
    pathname === "/resources/webinars-conferences" ||
    pathname === "/resources/faq" ||
    pathname === "/company" ||
    pathname === "/contact" ||
    pathname === "/careers"
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
