"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";
import { classifyLink, createPageEngagement } from "@/lib/page-engagement";
import { capturePostHogEvent, isPostHogConfigured } from "@/lib/posthog";

export function WebsiteAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, () => null);

  useEffect(() => {
    if (!consent || !isPostHogConfigured()) return;
    const measure = createPageEngagement(performance.now(), document.visibilityState === "visible");
    function checkEngagement() {
      const height = document.documentElement.scrollHeight;
      const depth = Math.min(100, ((window.scrollY + window.innerHeight) / Math.max(1, height)) * 100);
      const result = measure(performance.now(), document.visibilityState === "visible", depth);
      if (result) {
        capturePostHogEvent("page_engaged", { ...result, page_path: pathname });
        cleanup();
      }
    }
    const timer = window.setInterval(checkEngagement, 1000);
    document.addEventListener("visibilitychange", checkEngagement);
    function cleanup() {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", checkEngagement);
    }
    return cleanup;
  }, [pathname, consent]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.type === "auxclick" && event.button !== 1) return;
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("data-analytics-handoff")) return;
      const result = classifyLink(link.href, window.location.origin, link.hasAttribute("download"));
      const section = link.closest("footer") ? "footer" : link.closest("header") ? "header" : "content";
      if (result && !event.defaultPrevented) {
        capturePostHogEvent(result.event, { ...result.properties, section }, { transport: "sendBeacon" });
      }
      if (link.closest("nav") && link.origin === window.location.origin) {
        capturePostHogEvent("navigation_clicked", { destination_path: link.pathname, section });
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, []);

  return null;
}
