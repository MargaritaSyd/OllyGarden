"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";
import { capturePostHogEvent, urlWithoutQuery } from "@/lib/posthog";

export function PageNotFoundEvent() {
  const hasAnalyticsConsent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    () => getAnalyticsConsent() === true,
    () => false,
  );

  useEffect(() => {
    if (!hasAnalyticsConsent) {
      return;
    }

    capturePostHogEvent("page_not_found", {
      page_path: window.location.pathname,
      current_url: urlWithoutQuery(window.location.href),
      referrer: urlWithoutQuery(document.referrer),
    });
  }, [hasAnalyticsConsent]);

  return null;
}
