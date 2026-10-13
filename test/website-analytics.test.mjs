import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyLink, createPageEngagement } from "../src/lib/page-engagement.ts";
import { createPostHogConfig, sanitizeAnalyticsEvent } from "../src/lib/posthog-config.ts";

test("engagement requires both thirty visible seconds and half the page, once per visit", () => {
  const measure = createPageEngagement(0, true);
  assert.equal(measure(29_000, true, 80), null);
  assert.deepEqual(measure(30_000, true, 20), { engaged_seconds: 30, max_scroll_percent: 80 });
  assert.equal(measure(60_000, true, 100), null);
  const shallow = createPageEngagement(0, true);
  assert.equal(shallow(60_000, true, 49), null);
  assert.ok(shallow(61_000, true, 50));
});

test("background time and scroll do not count as engagement", () => {
  const measure = createPageEngagement(0, true);
  assert.equal(measure(10_000, false, 20), null);
  assert.equal(measure(100_000, false, 100), null);
  assert.equal(measure(110_000, true, 20), null);
  assert.equal(measure(130_000, true, 20), null);
  assert.deepEqual(measure(131_000, true, 50), { engaged_seconds: 31, max_scroll_percent: 50 });
});

test("new visits and new consent periods start fresh", () => {
  const first = createPageEngagement(0, true);
  assert.ok(first(30_000, true, 50));
  const second = createPageEngagement(30_000, true);
  assert.equal(second(31_000, true, 100), null);
  assert.ok(second(60_000, true, 50));
});

test("link classification excludes private schemes and separates downloads from outbound clicks", () => {
  const origin = "https://ollygarden.com";
  for (const href of ["mailto:private@example.com", "tel:123", "javascript:void(0)", "/products/rose", "#pricing"]) {
    assert.equal(classifyLink(href, origin, false), null);
  }
  assert.deepEqual(classifyLink("https://docs.ollygarden.com/start?email=private#token", origin, false), {
    event: "outbound_link_clicked",
    properties: { destination_url: "https://docs.ollygarden.com/start", destination_host: "docs.ollygarden.com" },
  });
  assert.equal(classifyLink("/legal/terms.pdf?key=private", origin, false).event, "file_download_clicked");
  assert.equal(classifyLink("/export", origin, true).event, "file_download_clicked");
});

test("SDK sanitization removes URL queries, fragments, credentials, and private schemes while retaining campaign dimensions", () => {
  const event = { event: "$pageview", $set_once: { $initial_current_url: "https://ollygarden.com/?secret=private" }, properties: {
    $current_url: "https://user:secret@ollygarden.com/contact?email=private#secret",
    $referrer: "https://example.com/article?token=secret",
    utm_source: "newsletter",
    utm_campaign: "launch",
    $set_once: { $initial_current_url: "https://ollygarden.com/?email=private" },
    $elements: [{ attr__href: "mailto:private@example.com" }],
    $elements_chain: 'a:attr__href="/file.pdf?secret=private"href="/file.pdf?secret=private"nth-child="2";body',
    $session_id: "session",
  } };
  const result = sanitizeAnalyticsEvent(event);
  assert.equal(result.$set_once.$initial_current_url, "https://ollygarden.com/");
  assert.equal(result.properties.$current_url, "https://ollygarden.com/contact");
  assert.equal(result.properties.$referrer, "https://example.com/article");
  assert.equal(result.properties.$set_once.$initial_current_url, "https://ollygarden.com/");
  assert.equal(result.properties.$elements[0].attr__href, undefined);
  assert.equal(result.properties.$elements_chain, 'a:nth-child="2";body');
  assert.equal(result.properties.utm_source, "newsletter");
  assert.equal(result.properties.utm_campaign, "launch");
  assert.equal(result.properties.$session_id, "session");
  assert.equal(sanitizeAnalyticsEvent(null), null);
});

test("performance collection and masked autocapture preserve consent and replay restrictions", () => {
  const config = createPostHogConfig("https://eu.i.posthog.com", false);
  assert.equal(config.capture_performance.web_vitals, true);
  assert.equal(config.capture_performance.network_timing, false);
  assert.equal(config.mask_all_text, true);
  assert.equal(config.mask_all_element_attributes, true);
  assert.equal(config.disable_session_recording, true);
  assert.equal(config.opt_out_capturing_by_default, true);
});

async function loadAnalyticsClient({ consent = true, failCapture = false } = {}) {
  const { readFileSync } = await import('node:fs');
  const { runInNewContext } = await import('node:vm');
  const { default: ts } = await import('typescript');
  const captures = [];
  let config;
  let updateConsent;
  const client = {
    init: (_token, value) => { config = value; },
    capture: (event, properties, options) => {
      if (failCapture) throw new Error('SDK unavailable');
      captures.push({ event, properties, options });
    },
    opt_in_capturing() {},
    opt_out_capturing() {},
  };
  const source = ts.transpileModule(readFileSync(new URL('../src/lib/posthog.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const exports = {};
  runInNewContext(source, {
    exports,
    process: { env: { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: 'test' } },
    URL,
    window: { location: { pathname: '/contact', href: 'https://ollygarden.com/contact?secret=private', origin: 'https://ollygarden.com' }, addEventListener() {} },
    require: (name) => {
      if (name === 'posthog-js') return client;
      if (name === '@/lib/analytics-consent') return {
        getAnalyticsConsent: () => consent,
        subscribeAnalyticsConsent: (fn) => { updateConsent = fn; },
      };
      if (name === '@/lib/posthog-config') return { createPostHogConfig, sanitizeAnalyticsEvent, applyPostHogConsent: () => {} };
      throw new Error(name);
    },
  });
  exports.initPostHog();
  return { exports, captures, get config() { return config; }, setConsent(value) { consent = value; updateConsent(value); } };
}

test('custom and automatic SDK events require current consent, including expiry', async () => {
  const client = await loadAnalyticsClient({ consent: null });
  assert.equal(client.exports.capturePostHogEvent('form_started'), false);
  assert.equal(client.config.before_send({ properties: {} }), null);
  client.setConsent(true);
  assert.equal(client.exports.capturePostHogEvent('form_started'), true);
  assert.equal(client.captures[0].properties.current_url, 'https://ollygarden.com/contact');
  assert.equal(client.captures[0].properties.analytics_version, 2);
  client.setConsent(null);
  assert.equal(client.exports.capturePostHogEvent('form_submitted'), false);
  assert.equal(client.config.before_send({ properties: {} }), null);
  assert.equal(client.captures.length, 1);
});

test('SDK failures cannot break a website interaction', async () => {
  const client = await loadAnalyticsClient({ failCapture: true });
  assert.equal(client.exports.capturePostHogEvent('form_submitted'), false);
});

test('navigation conversions can bypass SDK batching', async () => {
  const client = await loadAnalyticsClient();
  client.exports.capturePostHogEvent('app_handoff_confirmed', {}, { transport: 'sendBeacon' });
  assert.equal(client.captures[0].options.transport, 'sendBeacon');
});
