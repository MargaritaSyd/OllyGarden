import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";

const host = "127.0.0.1";
let origin;
let server;
let serverOutput = "";

before(async () => {
  const port = await getAvailablePort();
  origin = `http://${host}:${port}`;
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      host,
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL: "https://ollygarden.com",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  await waitForServer();
});

after(async () => {
  if (server?.exitCode === null && server.signalCode === null) {
    const exited = once(server, "exit");
    server.kill();
    await exited;
  }
});

test("serves the canonical RSS feed and generated artifact", async () => {
  const response = await fetch(`${origin}/blog/rss.xml`);
  const xml = await response.text();
  const artifact = await readFile(
    path.join(process.cwd(), ".next/server/app/blog/rss.xml.body"),
    "utf8",
  );
  const postSlugs = (await readdir(path.join(process.cwd(), "content/blog")))
    .filter((name) => name.endsWith(".html"))
    .map((name) => name.slice(0, -".html".length));
  const expectedGuids = postSlugs
    .map((slug) => `https://ollygarden.com/blog/${slug}`)
    .sort();
  const guids = [...xml.matchAll(/<guid>([^<]+)<\/guid>/g)]
    .map((match) => match[1])
    .sort();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^application\/rss\+xml/);
  assert.match(xml, /<rss version="2\.0"/);
  assert.match(
    xml,
    /<atom:link href="https:\/\/ollygarden\.com\/blog\/rss\.xml" rel="self" type="application\/rss\+xml"\/>/,
  );
  assert.match(xml, /<\/channel>\s*<\/rss>$/);
  assert.deepEqual(guids, expectedGuids);
  assert.equal(artifact, xml);
});

for (const alias of ["/rss.xml", "/feed.xml"]) {
  test(`${alias} redirects permanently to the canonical feed`, async () => {
    const response = await fetch(`${origin}${alias}`, { redirect: "manual" });

    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), "/blog/rss.xml");
  });
}

test("keeps legacy blog post redirects", async () => {
  const response = await fetch(
    `${origin}/blog/opentelemetry-vendor-lock-in-since-2024`,
    { redirect: "manual" },
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "/resources/blog/opentelemetry-vendor-lock-in-since-2024",
  );
});

for (const [source, destination] of [
  ["/product", "/products/insights"],
  ["/early-access", "/products/insights"],
  ["/insights", "/products/insights"],
  ["/tulip", "/products/insights"],
  ["/products/tulip", "/products/insights"],
  ["/rose", "/products/rose"],
  ["/about", "/company"],
  ["/docs", "https://docs.ollygarden.com/"],
  ["/solutions", "/solutions/overview"],
  ["/solutions/retail", "/solutions/retail-ecommerce"],
  ["/kubecon-eu-2026", "/resources/blog/ollygarden-at-kubecon-eu-2026"],
  ["/kubecon-na-2026", "/resources/events/kubecon-na-2026"],
  ["/press", "/resources/press-releases"],
  [
    "/press/portel-april-2026",
    "/resources/press-releases/ollygarden-dash0-portel",
  ],
  ["/press/rose-kubecon-2026", "/resources/press-releases/ollygarden-rose-ga"],
  ["/blog", "/resources/blog"],
  ["/resources/webinars", "/resources/webinars-conferences"],
  ["/resources/community", "/resources/events"],
  ["/otel-quiz/result/7", "/otel-quiz"],
  ["/trust-your-telemetry", "/resources/trust-your-telemetry"],
  ["/trust-your-telemetry/booth", "/resources/trust-your-telemetry/booth"],
  ["/resources/trust-game", "/resources/trust-your-telemetry"],
  ["/resources/trust-game/booth", "/resources/trust-your-telemetry/booth"],
  ["/careers/engineering-manager", "/careers"],
  ["/careers/executive-assistant", "/careers"],
  ["/careers/chief-of-staff", "/careers"],
  ["/careers/ai-software-engineer", "/careers"],
]) {
  test(`${source} redirects permanently to ${destination}`, async () => {
    const response = await fetch(`${origin}${source}`, { redirect: "manual" });

    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), destination);
  });
}

for (const [page, heading] of [
  ["/otel-quiz", "How deep are your OpenTelemetry® roots?"],
  ["/resources/trust-your-telemetry", "Would you trust this telemetry?"],
  [
    "/careers/founding-enterprise-account-executive",
    "Founding Enterprise Account Executive",
  ],
  ["/privacy-policy", "Your rights"],
  ["/data-protection-policy", "Data Protection Policy"],
  ["/terms-of-use", "OllyGarden, Inc. Terms of Service"],
  ["/rose-terms-of-service", "Rose Terms of Service"],
]) {
  test(`${page} is canonical content`, async () => {
    const response = await fetch(`${origin}${page}`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(
      html,
      new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  });
}

test("pages carry the Linux Foundation trademark notice and ® on first use", async () => {
  const { trademarkNotice } = await import("../../src/lib/trademarks.ts");
  const response = await fetch(`${origin}/resources/blog/purposeful-instrumentation`);
  const html = await response.text();

  assert.ok(html.includes(trademarkNotice));
  assert.match(html, /using OpenTelemetry® APIs/);
});

test("shared quiz results carry their score card and stay out of search", async () => {
  const { quizResultPath, quizResultToken } = await import("../../src/lib/quiz/score.ts");
  const response = await fetch(`${origin}${quizResultPath(quizResultToken(7))}`);
  const html = await response.text();
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();

  assert.equal(response.status, 200);
  assert.match(html, /Someone scored 7\/10: sprouting nicely\. Your turn\./);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/ollygarden\.com\/og\/otel-quiz\/score\/7\.png"/,
  );
  assert.doesNotMatch(sitemap, /otel-quiz\/result/);
  assert.equal((await fetch(`${origin}/otel-quiz/result/NOT-A-TOKEN`)).status, 404);
});

test("shared trust game results carry their tier card and stay out of search", async () => {
  const { trustGameResultPath, trustGameResultToken } = await import(
    "../../src/lib/trust-game/score.ts"
  );
  const response = await fetch(`${origin}${trustGameResultPath(trustGameResultToken(7))}`);
  const html = await response.text();
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();

  assert.equal(response.status, 200);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/ollygarden\.com\/og\/resources\/trust-your-telemetry\/tier\/skeptic\.png"/,
  );
  assert.doesNotMatch(sitemap, /trust-your-telemetry\/(result|booth)/);
  assert.equal((await fetch(`${origin}/resources/trust-your-telemetry/result/NOT-A-TOKEN`)).status, 404);
});

test("the trust game page never server-renders a verdict", async () => {
  const html = await (await fetch(`${origin}/resources/trust-your-telemetry`)).text();
  const markdown = await (await fetch(`${origin}/resources/trust-your-telemetry.md`)).text();
  const { trustGameCases } = await import("../../src/lib/trust-game/cases.ts");
  for (const body of [html, markdown]) {
    for (const item of trustGameCases) {
      for (const reveal of [item.headline, item.tell]) assert.ok(!body.includes(reveal), `${item.id} reveal leaked`);
    }
  }
  assert.match(markdown, /What you.ll practice/);
});

test("the booth kiosk renders without site chrome or analytics", async () => {
  const response = await fetch(`${origin}/resources/trust-your-telemetry/booth`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /<header|<footer|Cookie settings/);
});

for (const page of [
  "/resources/blog",
  "/resources/blog/opentelemetry-vendor-lock-in-since-2024",
]) {
  test(`${page} advertises the canonical feed`, async () => {
    const response = await fetch(`${origin}${page}`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(
      html,
      /<link(?=[^>]*rel="alternate")(?=[^>]*type="application\/rss\+xml")(?=[^>]*href="https:\/\/ollygarden\.com\/blog\/rss\.xml")[^>]*>/,
    );
  });
}

for (const [path, contentType] of [
  ["/llms.txt", "text/plain"],
  ["/llms-full.txt", "text/plain"],
  ["/developers.md", "text/markdown"],
  ["/cli.md", "text/markdown"],
  ["/api-docs.md", "text/markdown"],
  ["/api-versioning.md", "text/markdown"],
  ["/api-docs", "text/markdown"],
  ["/api-versioning", "text/markdown"],
]) {
  test(`${path} serves its discovery content type`, async () => {
    const response = await fetch(`${origin}${path}`);

    assert.equal(response.status, 200);
    assert.match(
      response.headers.get("content-type"),
      new RegExp(`^${contentType}`),
    );
  });
}

test("agent content serves canonical blog Markdown for GET and HEAD", async () => {
  const path =
    "/agent-content/resources/blog/opentelemetry-vendor-lock-in-since-2024.md";
  const response = await fetch(`${origin}${path}`);
  const markdown = await response.text();
  const head = await fetch(`${origin}${path}`, { method: "HEAD" });

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/markdown/);
  assert.match(
    markdown,
    /^# What's changed about OpenTelemetry vendor lock-in since 2024/,
  );
  assert.match(markdown, /## /);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

for (const [path, expected] of [
  ["api-docs", "# OllyGarden API Documentation"],
  ["api-versioning", "# OllyGarden API Versioning"],
  ["terms-of-use", "Governing Law"],
  ["products/rose", "Rose gets the instrumentation right"],
  [
    "resources/press-releases/ollygarden-rose-ga",
    "Rose: Fix Telemetry at the Source",
  ],
]) {
  test(`agent content renders the substantive ${path} page`, async () => {
    const response = await fetch(`${origin}/agent-content/${path}.md`);
    const markdown = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /^text\/markdown/);
    assert.match(markdown, new RegExp(expected));
    assert.ok(markdown.length > 500, `${path} Markdown should be substantive`);
  });
}

test("page.md URLs serve the Markdown version with a canonical link", async () => {
  const response = await fetch(`${origin}/products/rose.md`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/markdown/);
  assert.equal(
    response.headers.get("link"),
    '<https://ollygarden.com/products/rose>; rel="canonical"',
  );
  assert.match(await response.text(), /Rose gets the instrumentation right/);

  const home = await fetch(`${origin}/index.md`);
  assert.equal(home.status, 200);
  assert.match(home.headers.get("content-type"), /^text\/markdown/);

  const html = await (await fetch(`${origin}/products/rose`)).text();
  assert.match(
    html,
    /<link(?=[^>]*rel="alternate")(?=[^>]*type="text\/markdown")(?=[^>]*href="https:\/\/ollygarden\.com\/products\/rose\.md")[^>]*>/,
  );
});

test("llms.txt lists every blog post and llms-full.txt includes their text", async () => {
  const index = await (await fetch(`${origin}/llms.txt`)).text();
  assert.match(index, /^# OllyGarden/);
  assert.match(index, /resources\/blog\/opentelemetry-vendor-lock-in-since-2024/);
  assert.doesNotMatch(index, /ollygarden-dash0-portel/);

  const full = await (await fetch(`${origin}/llms-full.txt`)).text();
  assert.match(full, /## Frequently asked questions/);
  assert.match(full, /\*\*What is Rose\?\*\*/);
  assert.doesNotMatch(full, /\*\*What is Tulip\?\*\*/);
  assert.doesNotMatch(index, /products\/tulip/);
  assert.ok(full.length > index.length * 5, "llms-full.txt should carry article text");
});

test("Markdown requests for redirected pages redirect to the destination's Markdown", async () => {
  for (const [source, destination] of [
    ["/careers/chief-of-staff", "/careers.md"],
    ["/careers/ai-software-engineer", "/careers.md"],
    ["/about", "/company.md"],
  ]) {
    for (const response of [
      await fetch(`${origin}${source}.md`, { redirect: "manual" }),
      await fetch(`${origin}/agent-content${source}.md`, { redirect: "manual" }),
    ]) {
      assert.equal(response.status, 308, source);
      assert.equal(response.headers.get("location"), destination, source);
      assert.match(response.headers.get("vary") ?? "", /Accept/, source);
    }
  }
});

test("unknown agent content returns a useful Markdown 404", async () => {
  const response = await fetch(`${origin}/agent-content/not-real.md`);
  const markdown = await response.text();

  assert.equal(response.status, 404);
  assert.match(markdown, /Sitemap/);
  assert.match(markdown, /LLM index/);
  assert.match(markdown, /Developer resources/);
});

async function getAvailablePort() {
  const listener = createServer();
  listener.listen(0, host);
  await once(listener, "listening");
  const address = listener.address();
  await new Promise((resolve, reject) => {
    listener.close((error) => (error ? reject(error) : resolve()));
  });
  return address.port;
}

async function waitForServer() {
  const timeoutAt = Date.now() + 15_000;

  while (Date.now() < timeoutAt) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready:\n${serverOutput}`);
    }

    try {
      const response = await fetch(origin);
      if (response.ok) {
        return;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`Timed out waiting for Next.js:\n${serverOutput}`);
}

test("every sitemap page fits search-result title and description limits", async () => {
  const decode = (text) =>
    text
      .replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  assert.ok(paths.length > 0);

  const problems = [];
  for (const path of paths) {
    const html = await (await fetch(`${origin}${path}`)).text();
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    if (title.length > 60) problems.push(`${path}: title is ${title.length} chars`);
    if (description.length < 110 || description.length > 160)
      problems.push(`${path}: description is ${description.length} chars`);
  }
  assert.deepEqual(problems, [], "set a shorter `seo` override or *Meta copy (see doc/seo.md)");
});
