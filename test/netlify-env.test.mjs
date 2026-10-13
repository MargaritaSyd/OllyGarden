import assert from "node:assert/strict";
import { test } from "node:test";
import { validateNetlifyEnvironment } from "../scripts/validate-netlify-env.mjs";

test("does not require PostHog outside Netlify", () => {
  assert.equal(validateNetlifyEnvironment({}), null);
});

test("accepts the current PostHog project token", () => {
  assert.equal(
    validateNetlifyEnvironment({
      NETLIFY: "true",
      NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "project-token",
    }),
    null,
  );
});

test("accepts the legacy PostHog token during migration", () => {
  assert.equal(
    validateNetlifyEnvironment({
      NETLIFY: "true",
      VITE_POSTHOG_API_KEY: "legacy-token",
    }),
    null,
  );
});

test("explains a missing or misnamed Netlify token", () => {
  const error = validateNetlifyEnvironment({
    NETLIFY: "true",
    CONTEXT: "production",
    NEXT_PUBLIC_POSTHOG_TOKEN: "unsupported-token",
  });

  assert.match(error, /Netlify production build/);
  assert.match(error, /NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN/);
  assert.match(error, /NEXT_PUBLIC_POSTHOG_TOKEN is present/);
});
