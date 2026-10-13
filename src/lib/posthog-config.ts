import type { CaptureResult } from "posthog-js";

export function sanitizeAnalyticsEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event) return null;

  function sanitize(properties: Record<string, unknown>) {
    for (const [key, value] of Object.entries(properties)) {
      if (key === "$elements_chain" && typeof value === "string") {
        properties[key] = value.replace(/(?:attr__)?href="(?:\\.|[^"\\])*"/g, "");
      } else if (typeof value === "string" && /(?:url|href|referrer)$/i.test(key)) {
        try {
          const url = new URL(value);
          properties[key] = ["https:", "http:"].includes(url.protocol)
            ? `${url.origin}${url.pathname}`
            : undefined;
        } catch {
          properties[key] = undefined;
        }
      } else if (value && typeof value === "object") {
        sanitize(value as Record<string, unknown>);
      }
    }
  }

  sanitize(event as unknown as Record<string, unknown>);
  return event;
}

export function createPostHogConfig(apiHost: string, analyticsConsent: boolean) {
  return {
    api_host: apiHost,
    ui_host: "https://eu.posthog.com",
    defaults: "2026-05-30" as const,
    autocapture: true,
    mask_all_text: true,
    mask_all_element_attributes: true,
    mask_personal_data_properties: true,
    disable_capture_url_hashes: true,
    capture_performance: {
      web_vitals: true,
      web_vitals_attribution: false,
      network_timing: false,
    },
    capture_pageview: "history_change" as const,
    capture_pageleave: true,
    capture_exceptions: false,
    disable_session_recording: true,
    opt_out_capturing_by_default: !analyticsConsent,
    opt_out_persistence_by_default: true,
  };
}

type ConsentClient = {
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
};

export function applyPostHogConsent(client: ConsentClient, analytics: boolean): void {
  if (analytics) {
    client.opt_in_capturing();
  } else {
    client.opt_out_capturing();
  }
}
