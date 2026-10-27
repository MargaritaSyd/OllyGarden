import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

const complete = {
  PATH: process.env.PATH,
  NEXT_PUBLIC_SITE_URL: "https://ollygarden.com",
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "token",
  NEXT_PUBLIC_POSTHOG_HOST: "https://eu.i.posthog.com",
  CLOUDFLARE_ACCOUNT_ID: "account",
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "key",
  SUPABASE_SEND_EMAIL: "true",
};
const check = (env) =>
  spawnSync("bash", ["scripts/check-cloudflare-vars.sh"], { env, encoding: "utf8" });

test("a deploy build with every variable and the public origin passes", () => {
  assert.equal(check(complete).status, 0);
});

test("a deploy build stops on a missing variable or any other origin", () => {
  const missing = check({ ...complete, NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "" });
  assert.equal(missing.status, 1);
  assert.match(missing.stdout, /NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN/);
  for (const origin of ["http://localhost:3000", "https://[::1]:3000", "http://ollygarden.com", "https://ollygarden.com/"]) {
    assert.equal(check({ ...complete, NEXT_PUBLIC_SITE_URL: origin }).status, 1, origin);
  }
});
