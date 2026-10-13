import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/apollo.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function loadTracker({ appId = "app", consent = null } = {}) {
  const scripts = [];
  const storage = new Map([["apolloAnonId", "anon"], ["app_eventQueue", "[]"], ["unrelated", "kept"]]);
  const window = { localStorage: { removeItem: (key) => storage.delete(key) } };
  let onChange;
  const exports = {};
  runInNewContext(source, {
    exports,
    process: { env: { NEXT_PUBLIC_APOLLO_APP_ID: appId } },
    window,
    document: { createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } },
    require: (name) => {
      if (name === "@/lib/analytics-consent") return {
        getAnalyticsConsent: () => consent,
        subscribeAnalyticsConsent: (fn) => { onChange = fn; },
      };
      throw new Error(name);
    },
  });
  exports.initApolloTracker();
  return {
    exports, scripts, storage, window,
    setConsent(value) { consent = value; onChange?.(); },
  };
}

test("does nothing without an app ID", () => {
  const tracker = loadTracker({ appId: "  ", consent: true });
  assert.equal(tracker.scripts.length, 0);
  assert.equal(tracker.storage.size, 3);
});

test("waits for analytics consent before loading the tracker, and loads it once", () => {
  const tracker = loadTracker();
  assert.equal(tracker.scripts.length, 0);

  tracker.setConsent(true);
  tracker.setConsent(true);
  assert.equal(tracker.scripts.length, 1);
  assert.equal(tracker.scripts[0].src, tracker.exports.APOLLO_TRACKER_SRC);

  let appId;
  tracker.window.trackingFunctions = { onLoad: (options) => (appId = options.appId) };
  tracker.scripts[0].onload();
  assert.equal(appId, "app");
});

test("does not start tracking when consent is withdrawn before the script loads", () => {
  const tracker = loadTracker({ consent: true });
  tracker.setConsent(false);

  let started = false;
  tracker.window.trackingFunctions = { onLoad: () => (started = true) };
  tracker.scripts[0].onload();
  assert.equal(started, false);
});

test("declining or withdrawing consent clears Apollo storage only", () => {
  const tracker = loadTracker({ consent: false });
  assert.equal(tracker.scripts.length, 0);
  assert.deepEqual([...tracker.storage.keys()], ["unrelated"]);
});

test("CSP allows the tracker and its event endpoint but not person-level identity resolution", () => {
  const config = readFileSync("next.config.ts", "utf8");
  assert.match(config, /script-src[^;]*https:\/\/assets\.apollo\.io/);
  assert.match(config, /connect-src[^;]*https:\/\/aplo-evnt\.com/);
  assert.doesNotMatch(config, /liadm\.com/);
});
