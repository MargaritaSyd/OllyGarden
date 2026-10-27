import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics-consent";

const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID?.trim();

const HUBSPOT_COOKIE = /^(__hs|hubspotutk)/;

type HubSpotWindow = Window & {
  _hsp?: unknown[][];
  _hsq?: unknown[][];
  disableHubSpotCookieBanner?: boolean;
};

let loaded = false;
let ready = false;
let revoked = false;
let lastTrackedPath: string | undefined;

/**
 * Loads HubSpot's tracking code once analytics consent is granted, so page views
 * reach HubSpot's website visitor and contact timelines. Our banner is the only
 * consent source: HubSpot's banner is disabled and our choice is passed to it.
 * Withdrawing consent revokes HubSpot's consent, which stops its tracking at
 * once, and deletes its cookies.
 */
export function initHubSpotTracker(): void {
  if (!portalId || !/^\d+$/.test(portalId)) return;
  const hs = window as HubSpotWindow;

  const apply = () => {
    if (getAnalyticsConsent() !== true) {
      if (loaded && !revoked) {
        revoked = true;
        (hs._hsp ??= []).push(["revokeCookieConsent"]);
      }
      clearHubSpotCookies();
    } else if (!loaded) {
      loaded = true;
      lastTrackedPath = window.location.pathname;
      hs.disableHubSpotCookieBanner = true;
      grantHubSpotConsent(hs);
      const script = document.createElement("script");
      script.id = "hs-script-loader";
      script.src = `https://js.hs-scripts.com/${portalId}.js`;
      script.async = true;
      script.onload = () => {
        ready = true;
        // Consent may have been withdrawn while the script was loading.
        if (getAnalyticsConsent() !== true) apply();
      };
      document.head.appendChild(script);
    } else if (revoked) {
      revoked = false;
      grantHubSpotConsent(hs);
    }
  };

  apply();
  subscribeAnalyticsConsent(apply);
}

/**
 * The tracking code records only full page loads, so App Router navigations are
 * reported here after the new route renders. Until the script has loaded, its
 * own initial page view covers the current path.
 */
export function trackHubSpotPageView(path: string): void {
  if (!loaded || revoked || getAnalyticsConsent() !== true || path === lastTrackedPath) return;
  lastTrackedPath = path;
  if (!ready) return;
  const queue = ((window as HubSpotWindow)._hsq ??= []);
  // HubSpot's queue handles one command per push call.
  queue.push(["setPath", path + window.location.search]);
  queue.push(["trackPageView"]);
}

function grantHubSpotConsent(hs: HubSpotWindow): void {
  (hs._hsp ??= []).push([
    "setHubSpotConsent",
    { analytics: true, advertisement: false, functionality: true },
  ]);
}

function clearHubSpotCookies(): void {
  const names = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter((name) => HUBSPOT_COOKIE.test(name));
  if (!names.length) return;
  const expired = "=; Max-Age=0; path=/";
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const name of names) {
    document.cookie = name + expired;
    document.cookie = `${name}${expired}; domain=.${domain}`;
  }
}
