import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/hubspot.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

const json = (value) => JSON.stringify(value);

function loadTracker({ portalId = "123", consent = null, cookie = "", hostname = "www.ollygarden.com", pathname = "/" } = {}) {
  const scripts = [];
  const cookieWrites = [];
  const window = { location: { hostname, pathname, search: "" } };
  const document = {
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    get cookie() { return cookie; },
    set cookie(value) { cookieWrites.push(value); },
  };
  let onChange;
  const exports = {};
  runInNewContext(source, {
    exports,
    process: { env: { NEXT_PUBLIC_HUBSPOT_PORTAL_ID: portalId } },
    window,
    document,
    require: (name) => {
      if (name === "@/lib/analytics-consent") return {
        getAnalyticsConsent: () => consent,
        subscribeAnalyticsConsent: (fn) => { onChange = fn; },
      };
      throw new Error(name);
    },
  });
  exports.initHubSpotTracker();
  const pushes = [];
  return {
    exports, scripts, cookieWrites, window, pushes,
    setConsent(value) { consent = value; onChange?.(); },
    setCookie(value) { cookie = value; },
    // Stand in for HubSpot's loaded tracking code, which reads one command per push.
    loadScript() {
      window._hsq = { push: (...commands) => pushes.push(commands) };
      scripts[0].onload();
    },
  };
}

test("does nothing without a numeric portal ID", () => {
  for (const portalId of ["  ", "abc", "1/../x"]) {
    const tracker = loadTracker({ portalId, consent: true });
    assert.equal(tracker.scripts.length, 0);
  }
});

test("waits for analytics consent, disables HubSpot's banner, and passes our consent to HubSpot", () => {
  const tracker = loadTracker();
  assert.equal(tracker.scripts.length, 0);

  tracker.setConsent(true);
  tracker.setConsent(true);
  assert.equal(tracker.scripts.length, 1);
  assert.equal(tracker.scripts[0].src, "https://js.hs-scripts.com/123.js");
  assert.equal(tracker.scripts[0].id, "hs-script-loader");
  assert.equal(tracker.window.disableHubSpotCookieBanner, true);
  assert.equal(json(tracker.window._hsp), json([
    ["setHubSpotConsent", { analytics: true, advertisement: false, functionality: true }],
  ]));
});

test("withdrawing consent revokes once and deletes every HubSpot cookie on both domains", () => {
  const tracker = loadTracker({ consent: true, hostname: "ollygarden.com" });
  tracker.window._hsp.length = 0;
  tracker.setCookie("__hstc=1; hubspotutk=2; __hs_cookie_cat_pref=3; ph_x=4");
  tracker.setConsent(false);
  tracker.setConsent(null);

  assert.equal(json(tracker.window._hsp), json([["revokeCookieConsent"]]));
  for (const name of ["__hstc", "hubspotutk", "__hs_cookie_cat_pref"]) {
    assert.ok(tracker.cookieWrites.includes(`${name}=; Max-Age=0; path=/`));
    assert.ok(tracker.cookieWrites.includes(`${name}=; Max-Age=0; path=/; domain=.ollygarden.com`));
  }
  assert.ok(!tracker.cookieWrites.some((write) => write.startsWith("ph_x")));
});

test("withdrawing consent while the script loads clears the cookies it sets", () => {
  const tracker = loadTracker({ consent: true });
  tracker.setConsent(false);
  tracker.setCookie("__hstc=1");
  tracker.loadScript();
  assert.ok(tracker.cookieWrites.includes("__hstc=; Max-Age=0; path=/"));
});

test("granting consent again after withdrawing restores HubSpot's consent", () => {
  const tracker = loadTracker({ consent: true });
  tracker.setConsent(false);
  tracker.setConsent(true);
  assert.equal(json(tracker.window._hsp.map(([command]) => command)), json([
    "setHubSpotConsent", "revokeCookieConsent", "setHubSpotConsent",
  ]));
});

test("after consent is granted again, the page reached while revoked is reported once", () => {
  const tracker = loadTracker({ consent: true });
  tracker.loadScript();
  tracker.setConsent(false);
  tracker.exports.trackHubSpotPageView("/contact");
  assert.equal(tracker.pushes.length, 0);

  tracker.setConsent(true);
  tracker.exports.trackHubSpotPageView("/contact");
  tracker.exports.trackHubSpotPageView("/contact");
  assert.equal(json(tracker.pushes), json([[["setPath", "/contact"]], [["trackPageView"]]]));
});

test("reports App Router navigations once per path after the script loads", () => {
  const tracker = loadTracker({ consent: true });
  tracker.loadScript();
  tracker.window.location.search = "?utm_campaign=x";

  tracker.exports.trackHubSpotPageView("/");
  tracker.exports.trackHubSpotPageView("/pricing");
  tracker.exports.trackHubSpotPageView("/pricing");
  assert.equal(json(tracker.pushes), json([[["setPath", "/pricing?utm_campaign=x"]], [["trackPageView"]]]));
});

test("navigations before the script loads are covered by its initial page view", () => {
  const tracker = loadTracker({ consent: true });
  tracker.exports.trackHubSpotPageView("/pricing");
  tracker.loadScript();
  tracker.exports.trackHubSpotPageView("/pricing");
  assert.equal(tracker.pushes.length, 0);
});

test("granting consent on a deep link does not report that page twice", () => {
  const tracker = loadTracker({ pathname: "/pricing" });
  tracker.setConsent(true);
  tracker.loadScript();
  tracker.exports.trackHubSpotPageView("/pricing");
  assert.equal(tracker.pushes.length, 0);
});

test("without consent, nothing loads, nothing is reported, and no cookies are written", () => {
  const tracker = loadTracker({ consent: false });
  tracker.exports.trackHubSpotPageView("/pricing");
  assert.equal(tracker.scripts.length, 0);
  assert.equal(tracker.window._hsp, undefined);
  assert.equal(tracker.window._hsq, undefined);
  assert.equal(tracker.cookieWrites.length, 0);
});

test("CSP allows exactly HubSpot's tracking hosts and never its collected forms", () => {
  const csp = readFileSync("next.config.ts", "utf8").match(/"default-src[^"]*"/)[0];
  const directive = (name) => csp.match(new RegExp(`${name} ([^;]*)`))[1].split(" ");
  const hubspot = (hosts) => hosts.filter((host) => /hs-|hubspot|hscollected/.test(host));
  assert.deepEqual(hubspot(directive("script-src")), [
    "https://js.hs-scripts.com", "https://js.hs-analytics.net", "https://js.hs-banner.com",
  ]);
  assert.deepEqual(hubspot(directive("connect-src")), ["https://track.hubspot.com", "https://*.hs-banner.com"]);
  assert.ok(!directive("script-src").some((host) => host === "https:" || host === "*"));
});
