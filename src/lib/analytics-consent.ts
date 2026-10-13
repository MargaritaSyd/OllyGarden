type AnalyticsConsent = {
  analytics: boolean;
  necessary: true;
  timestamp: number;
};

const CONSENT_KEY = "ollygarden-cookie-consent";
const CONSENT_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;
const CONSENT_CHANGE_EVENT = "ollygarden:analytics-consent-change";
let inMemoryConsent:
  | { owner: Window; value: AnalyticsConsent | null }
  | undefined;

export function getAnalyticsConsent(): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (inMemoryConsent?.owner === window) {
    return readAnalyticsConsent(inMemoryConsent.value);
  }

  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      return null;
    }

    return readAnalyticsConsent(JSON.parse(stored) as Partial<AnalyticsConsent>);
  } catch {
    return null;
  }
}

export function saveAnalyticsConsent(analytics: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  const consent: AnalyticsConsent = {
    analytics,
    necessary: true,
    timestamp: Date.now(),
  };
  inMemoryConsent = { owner: window, value: consent };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // The change event still applies the choice if local storage is unavailable.
  } finally {
    window.dispatchEvent(
      new CustomEvent<boolean>(CONSENT_CHANGE_EVENT, { detail: analytics }),
    );
  }
}

export function clearAnalyticsConsent(): void {
  if (typeof window === "undefined") {
    return;
  }
  inMemoryConsent = { owner: window, value: null };

  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // The change event still opts PostHog out if local storage is unavailable.
  } finally {
    window.dispatchEvent(
      new CustomEvent<boolean>(CONSENT_CHANGE_EVENT, { detail: false }),
    );
  }
}

export function subscribeAnalyticsConsent(
  onChange: (analytics?: boolean | null) => void,
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleConsentChange = (event: Event) => {
    onChange((event as CustomEvent<boolean>).detail);
  };
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) {
      inMemoryConsent = undefined;
      onChange(getAnalyticsConsent());
    }
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function readAnalyticsConsent(
  consent: Partial<AnalyticsConsent> | null,
): boolean | null {
  if (
    typeof consent?.analytics !== "boolean" ||
    typeof consent.timestamp !== "number" ||
    consent.timestamp <= Date.now() - CONSENT_LIFETIME_MS
  ) {
    return null;
  }

  return consent.analytics;
}
