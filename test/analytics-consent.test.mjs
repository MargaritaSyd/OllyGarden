import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import {
  clearAnalyticsConsent,
  getAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "../src/lib/analytics-consent.ts";
import { applyPostHogConsent } from "../src/lib/posthog-config.ts";

const consentKey = "ollygarden-cookie-consent";
const originalWindow = globalThis.window;

beforeEach(() => {
  const events = new EventTarget();
  globalThis.window = {
    localStorage: createLocalStorage(),
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
});

afterEach(() => {
  if (originalWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = originalWindow;
  }
});

test("returns no decision before the visitor chooses", () => {
  assert.equal(getAnalyticsConsent(), null);
});

test("persists and reads both analytics choices", () => {
  saveAnalyticsConsent(true);
  assert.equal(getAnalyticsConsent(), true);

  saveAnalyticsConsent(false);
  assert.equal(getAnalyticsConsent(), false);
});

test("notifies subscribers when the analytics choice changes", () => {
  let changes = 0;
  const unsubscribe = subscribeAnalyticsConsent(() => {
    changes += 1;
  });

  saveAnalyticsConsent(true);
  unsubscribe();
  saveAnalyticsConsent(false);

  assert.equal(changes, 1);
});

test("applies same-tab consent changes to the analytics client", () => {
  const { calls, unsubscribe } = subscribeAnalyticsClient();

  saveAnalyticsConsent(true);
  clearAnalyticsConsent();
  unsubscribe();

  assert.deepEqual(calls, ["opt-in", "opt-out"]);
});

test("applies cross-tab consent changes to the analytics client", () => {
  const { calls, unsubscribe } = subscribeAnalyticsClient();

  window.localStorage.setItem(
    consentKey,
    JSON.stringify({ analytics: true, necessary: true, timestamp: Date.now() }),
  );
  window.dispatchEvent(createStorageEvent(consentKey));
  window.localStorage.setItem(
    consentKey,
    JSON.stringify({ analytics: false, necessary: true, timestamp: Date.now() }),
  );
  window.dispatchEvent(createStorageEvent(consentKey));
  unsubscribe();

  assert.deepEqual(calls, ["opt-in", "opt-out"]);
});

test("opts the analytics client out when consent storage cannot be cleared", () => {
  const { calls, unsubscribe } = subscribeAnalyticsClient();
  window.localStorage.removeItem = () => {
    throw new Error("storage unavailable");
  };

  clearAnalyticsConsent();
  unsubscribe();

  assert.deepEqual(calls, ["opt-out"]);
  assert.equal(getAnalyticsConsent(), null);
});

test("opts the analytics client in when consent storage cannot be saved", () => {
  const { calls, unsubscribe } = subscribeAnalyticsClient();
  window.localStorage.setItem = () => {
    throw new Error("storage unavailable");
  };

  saveAnalyticsConsent(true);
  unsubscribe();

  assert.deepEqual(calls, ["opt-in"]);
  assert.equal(getAnalyticsConsent(), true);
});

test("clears a choice so the visitor can choose again", () => {
  saveAnalyticsConsent(true);
  clearAnalyticsConsent();

  assert.equal(getAnalyticsConsent(), null);
});

test("expires a stored choice after one year", () => {
  window.localStorage.setItem(
    consentKey,
    JSON.stringify({
      analytics: true,
      necessary: true,
      timestamp: Date.now() - 366 * 24 * 60 * 60 * 1000,
    }),
  );

  assert.equal(getAnalyticsConsent(), null);
});

test("ignores malformed stored consent", () => {
  window.localStorage.setItem(consentKey, "not-json");

  assert.equal(getAnalyticsConsent(), null);
});

function createLocalStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function createStorageEvent(key) {
  const event = new Event("storage");
  Object.defineProperty(event, "key", { value: key });
  return event;
}

function subscribeAnalyticsClient() {
  const calls = [];
  const client = {
    opt_in_capturing: () => calls.push("opt-in"),
    opt_out_capturing: () => calls.push("opt-out"),
  };
  const unsubscribe = subscribeAnalyticsConsent((analytics) => {
    applyPostHogConsent(client, analytics === true);
  });

  return { calls, unsubscribe };
}
