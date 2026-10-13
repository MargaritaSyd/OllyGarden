import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";

export const APOLLO_TRACKER_SRC =
  "https://assets.apollo.io/micro/website-tracker/tracker.iife.js";

const appId = process.env.NEXT_PUBLIC_APOLLO_APP_ID?.trim();

type ApolloWindow = Window & {
  trackingFunctions?: { onLoad(options: { appId: string }): void };
};

/**
 * Loads Apollo's company-level website visitor tracker once analytics consent is
 * granted. Withdrawing consent clears the tracker's storage; the already-loaded
 * script stops at the next page load.
 */
export function initApolloTracker(): void {
  if (!appId) return;

  let loaded = false;
  const apply = () => {
    if (getAnalyticsConsent() !== true) {
      clearApolloStorage(appId);
    } else if (!loaded) {
      loaded = true;
      const script = document.createElement("script");
      script.src = APOLLO_TRACKER_SRC;
      script.async = true;
      script.onload = () => {
        if (getAnalyticsConsent() === true) {
          (window as ApolloWindow).trackingFunctions?.onLoad({ appId });
        }
      };
      document.head.appendChild(script);
    }
  };

  apply();
  subscribeAnalyticsConsent(apply);
}

function clearApolloStorage(id: string): void {
  try {
    for (const key of ["apolloAnonId", "liveIntentData", `${id}_eventQueue`, `${id}_canTrack`]) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Storage may be unavailable; the tracker is not loaded without consent.
  }
}
