"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { announcement } from "@/lib/announcement";
import { captureCtaClick } from "@/lib/posthog";

/** Read by the header: the open mobile nav caps its height at the viewport minus this. */
const ANNOUNCEMENT_HEIGHT_VAR = "--announcement-height";

/**
 * Full-width highlight bar above the header on the home page only. Figma 2383:42299: 40px tall,
 * 16px/10px padding, 8px gap, centred; forest "NEW" pill (11px bold, 0.1em tracking) and
 * 14.5px medium forest copy with the trailing link underlined. The whole bar is the link,
 * as in the design. In normal flow, so it scrolls away with the header. The pill is inline
 * with the copy so phone widths wrap it with the sentence instead of giving it its own row.
 * Client component for the route check, the click event, and the measured height.
 */
export function AnnouncementBar() {
  const pathname = usePathname();
  const visible = pathname === "/";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.removeProperty(ANNOUNCEMENT_HEIGHT_VAR);
      return;
    }

    const bar = ref.current;
    if (!bar) {
      root.style.removeProperty(ANNOUNCEMENT_HEIGHT_VAR);
      return;
    }
    const update = () =>
      root.style.setProperty(ANNOUNCEMENT_HEIGHT_VAR, `${bar.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty(ANNOUNCEMENT_HEIGHT_VAR);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div ref={ref} className="bg-bitmap-highlight text-forest">
      <Link
        href={announcement.href}
        className="block px-4 py-2.5 text-center text-[14.5px] leading-[1.35] font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
        onClick={() =>
          captureCtaClick({
            buttonId: "announcement_bar",
            buttonText: announcement.link,
            section: "announcement",
            destination: announcement.href,
          })
        }
      >
        <span className="mr-2 inline-flex items-center rounded-full bg-forest px-2 py-0.5 align-[2px] text-[11px] leading-4 font-bold tracking-[0.1em] text-bitmap-highlight uppercase">
          {announcement.badge}
        </span>
        {announcement.text}{" "}
        <span className="underline decoration-1 underline-offset-2">
          {announcement.link} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
