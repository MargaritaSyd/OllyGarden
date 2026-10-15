import assert from "node:assert/strict";
import { test } from "node:test";
import {
  validateNetlifyEnvironment,
  validateProductionDeploy,
} from "../scripts/validate-netlify-env.mjs";

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

test("leaves deploy previews and local builds to build freely", () => {
  assert.equal(validateProductionDeploy({}), null);
  assert.equal(
    validateProductionDeploy({ NETLIFY: "true", CONTEXT: "deploy-preview" }),
    null,
  );
});

test("builds production only for the commit the deploy workflow migrated", () => {
  assert.equal(
    validateProductionDeploy({
      NETLIFY: "true",
      CONTEXT: "production",
      COMMIT_REF: "abc123",
      INCOMING_HOOK_BODY: "abc123\n",
    }),
    null,
  );
});

test("refuses a production build that did not come from the deploy workflow", () => {
  const error = validateProductionDeploy({
    NETLIFY: "true",
    CONTEXT: "production",
    COMMIT_REF: "abc123",
  });

  assert.match(error, /Deploy production/);
  assert.match(error, /migrations/);
});

test("refuses to build a newer commit than the one that was migrated", () => {
  const error = validateProductionDeploy({
    NETLIFY: "true",
    CONTEXT: "production",
    COMMIT_REF: "def456",
    INCOMING_HOOK_BODY: "abc123",
  });

  assert.match(error, /def456/);
  assert.match(error, /abc123/);
});
