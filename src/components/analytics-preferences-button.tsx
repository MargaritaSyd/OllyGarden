"use client";

import { clearAnalyticsConsent } from "@/lib/analytics-consent";
import { isPostHogConfigured } from "@/lib/posthog";

export function AnalyticsPreferencesButton() {
  if (!isPostHogConfigured()) {
    return null;
  }

  function openPreferences() {
    clearAnalyticsConsent();
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="transition-colors hover:text-sunflower"
    >
      Cookie settings
    </button>
  );
}
