import assert from "node:assert/strict";
import { test } from "node:test";
import {
  applyPostHogConsent,
  createPostHogConfig,
} from "../src/lib/posthog-config.ts";

test("captures navigation without session recording after consent", () => {
  const config = createPostHogConfig("https://eu.i.posthog.com", true);

  assert.equal(config.capture_pageview, "history_change");
  assert.equal(config.capture_pageleave, true);
  assert.equal(config.autocapture, true);
  assert.equal(config.disable_session_recording, true);
  assert.equal(config.opt_out_capturing_by_default, false);
  assert.equal(config.opt_out_persistence_by_default, true);
});

test("starts capture and persistence opted out before consent", () => {
  const config = createPostHogConfig("https://eu.i.posthog.com", false);

  assert.equal(config.opt_out_capturing_by_default, true);
  assert.equal(config.opt_out_persistence_by_default, true);
});

test("delegates consent to the SDK without capturing a duplicate pageview", () => {
  const calls = [];
  const client = {
    opt_in_capturing: () => calls.push("opt-in"),
    opt_out_capturing: () => calls.push("opt-out"),
  };

  applyPostHogConsent(client, true);
  applyPostHogConsent(client, false);

  assert.deepEqual(calls, ["opt-in", "opt-out"]);
});
