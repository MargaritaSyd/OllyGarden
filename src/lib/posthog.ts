import posthog, { type CaptureOptions } from "posthog-js";
import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";
import {
  applyPostHogConsent,
  createPostHogConfig,
  sanitizeAnalyticsEvent,
} from "@/lib/posthog-config";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com";

let errorTrackingInitialized = false;

export function isPostHogConfigured(): boolean {
  return Boolean(projectToken);
}

export function initPostHog(): void {
  if (!projectToken) {
    return;
  }

  posthog.init(projectToken, {
    ...createPostHogConfig(apiHost, getAnalyticsConsent() === true),
    before_send: (event) =>
      getAnalyticsConsent() === true ? sanitizeAnalyticsEvent(event) : null,
  });
  subscribeAnalyticsConsent((analytics) => {
    applyPostHogConsent(posthog, analytics === true);
  });
  initializeErrorTracking();
}

export function capturePostHogEvent(
  event: string,
  properties?: Record<string, unknown>,
  options?: Pick<CaptureOptions, "transport">,
): boolean {
  if (!projectToken || getAnalyticsConsent() !== true) return false;
  try {
    posthog.capture(
      event,
      {
        page_path: window.location.pathname,
        current_url: urlWithoutQuery(window.location.href),
        analytics_version: 2,
        ...properties,
      },
      options,
    );
    return true;
  } catch {
    return false;
  }
}

export function captureCtaClick({
  buttonId,
  buttonText,
  section,
  destination,
}: {
  buttonId: string;
  buttonText: string;
  section: string;
  destination?: string;
}): void {
  capturePostHogEvent("cta_clicked", {
    button_id: buttonId,
    button_text: buttonText,
    section,
    destination_url: destination ? urlWithoutQuery(destination) : undefined,
  });
}

function initializeErrorTracking(): void {
  if (errorTrackingInitialized) {
    return;
  }

  window.addEventListener("error", (event) => {
    capturePostHogEvent("client_side_error", {
      error_type: event.error instanceof Error ? event.error.name : "Error",
      error_source: urlWithoutQuery(event.filename),
      line_number: event.lineno,
      column_number: event.colno,
      page_path: window.location.pathname,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    capturePostHogEvent("unhandled_promise_rejection", {
      error_type: reason instanceof Error ? reason.name : typeof reason,
      page_path: window.location.pathname,
    });
  });

  errorTrackingInitialized = true;
}

export function urlWithoutQuery(value: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}
