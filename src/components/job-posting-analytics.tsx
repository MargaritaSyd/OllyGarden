"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";
import { capturePostHogEvent } from "@/lib/posthog";

export function JobPostingAnalytics({
  jobId,
  jobTitle,
  pagePath,
}: {
  jobId: string;
  jobTitle: string;
  pagePath: string;
}) {
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, () => null);
  const captured = useRef<string | null>(null);
  useEffect(() => {
    if (!consent || captured.current === pagePath) return;
    const sent = capturePostHogEvent("job_posting_viewed", {
      job_id: jobId,
      job_title: jobTitle,
      page_path: pagePath,
    });
    if (sent) captured.current = pagePath;
  }, [consent, jobId, jobTitle, pagePath]);

  return null;
}
