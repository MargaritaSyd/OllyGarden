"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";
import { isPostHogConfigured } from "@/lib/posthog";

export function AnalyticsConsentBanner() {
  const needsConsent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    () => isPostHogConfigured() && getAnalyticsConsent() === null,
    () => false,
  );

  function chooseConsent(analytics: boolean) {
    saveAnalyticsConsent(analytics);
  }

  if (!needsConsent) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-mist/15 bg-forest/96 px-6 py-5 shadow-[0_-16px_40px_rgba(0,0,0,0.3)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-mist/80">
          We use analytics cookies to understand how the website is used (PostHog), which companies
          visit (Apollo.io), and which companies and contacts engage (HubSpot), so we can improve
          it. You can accept analytics or continue with essential cookies only. Details are in
          our{" "}
          <Link href="/privacy-policy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-col gap-3 min-[420px]:flex-row">
          <button
            type="button"
            onClick={() => chooseConsent(true)}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-mist px-5 text-sm font-semibold text-forest transition-colors hover:bg-sunflower"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={() => chooseConsent(false)}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-mist/35 px-5 text-sm font-semibold text-mist transition-colors hover:bg-mist/10"
          >
            Essential only
          </button>
        </div>
      </div>
    </aside>
  );
}
