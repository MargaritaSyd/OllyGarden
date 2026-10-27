#!/usr/bin/env node
// Audits every sitemap URL of a running wicket deployment for the SEO/AEO rules in doc/seo.md.
// Usage: node check-site.mjs <base-url> [path ...]
//   base-url  e.g. http://localhost:3000, a local Worker preview, or https://ollygarden.com
//   path      optional canonical paths to check instead of the whole sitemap
// Canonical URLs must use NEXT_PUBLIC_SITE_URL (default https://ollygarden.com); when auditing a
// local build made without it, localhost canonicals are accepted.
// Prints only pages with findings (every page when paths are given) and exits 1 on any error;
// warnings are judgment calls for the reviewer.

const [base, ...only] = process.argv.slice(2);
if (!base) {
  console.error("usage: node check-site.mjs <base-url> [path ...]");
  process.exit(2);
}
const origin = new URL(base).origin;
const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ollygarden.com").origin;
const isLocal = (url) => ["localhost", "127.0.0.1"].includes(new URL(url).hostname);

const AI_BOTS = {
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot",
  ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com",
  PerplexityBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot",
  "OAI-SearchBot": "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
};

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metaTags = (html) => html.match(/<meta\b[^>]*>/g) ?? [];
const linkTags = (html) => html.match(/<link\b[^>]*>/g) ?? [];

// Sitemap and canonical URLs use the production origin; fetch them from the deployment under test.
const local = (url) => {
  const u = new URL(url);
  return `${origin}${u.pathname}${u.search}`;
};

async function get(url, init) {
  return fetch(url, { redirect: "manual", ...init });
}

function checkPage(path, html, llmsPaths) {
  const errors = [];
  const warnings = [];
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const description = decode(
    attr(metaTags(html).find((t) => attr(t, "name") === "description") ?? "", "content") ?? "",
  );
  const robots = metaTags(html)
    .filter((t) => attr(t, "name") === "robots")
    .map((t) => attr(t, "content"))
    .join(",");
  const canonical = attr(linkTags(html).find((t) => attr(t, "rel") === "canonical") ?? "", "href");
  const markdown = attr(
    linkTags(html).find((t) => attr(t, "rel") === "alternate" && attr(t, "type") === "text/markdown") ?? "",
    "href",
  );
  const ogImage = attr(metaTags(html).find((t) => attr(t, "property") === "og:image") ?? "", "content");
  const h1s = (html.match(/<h1\b/g) ?? []).length;
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const [, body] of jsonLd) {
    try {
      const data = JSON.parse(body);
      for (const node of data["@graph"] ?? [data]) types.push([node["@type"]].flat().join("+"));
    } catch {
      errors.push("JSON-LD does not parse");
    }
  }
  // Code samples legitimately contain literal zeros, and React splits "01" into "0<!-- -->1".
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html)
    .replace(/<pre[\s\S]*?<\/pre>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "");
  const text = main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;

  if (!title) errors.push("missing <title>");
  else {
    if (title.length > 60) warnings.push(`title is ${title.length} chars (search results show ~60)`);
    if (/^OpenTelemetry\b/i.test(title))
      warnings.push(
        path.startsWith("/resources/blog/")
          ? "title leads with “OpenTelemetry”; make sure it can’t read as official project docs"
          : "title leads with “OpenTelemetry”; lead with OllyGarden so it can’t read as an official project page",
      );
  }
  if (!description) errors.push("missing meta description");
  else if (description.length < 110 || description.length > 160)
    warnings.push(`description is ${description.length} chars (aim for 110–160)`);
  if (/noindex/.test(robots)) errors.push("in the sitemap but marked noindex");
  if (!canonical) errors.push("missing canonical");
  else {
    const url = new URL(canonical);
    const localBuild = isLocal(origin) && isLocal(canonical);
    if (url.pathname !== path || (url.origin !== siteOrigin && !localBuild))
      errors.push(`canonical points to ${canonical}`);
  }
  if (h1s !== 1) errors.push(`${h1s} <h1> elements (want exactly 1)`);
  if (!types.length) errors.push("no JSON-LD");
  if (!ogImage) errors.push("no og:image");
  if (!markdown) errors.push("no text/markdown alternate link");
  if (words < 150) warnings.push(`only ${words} words of server-rendered copy in <main>`);
  const zeroes = [...main.matchAll(/>\s*0(?:[+%]|\.0)?\s*</g)].length;
  if (zeroes) warnings.push(`${zeroes} element(s) render “0”/“0+”/“0%” on the server — a client-only counter hides the real number from crawlers`);
  if (/^\/resources\/(blog|press-releases)\/./.test(path) && !llmsPaths.has(path))
    errors.push("not listed in /llms.txt");

  return { errors, warnings, title, description, ogImage, markdown };
}

async function audit(path, llmsPaths) {
  const res = await get(`${origin}${path}`);
  if (res.status !== 200) {
    const to = res.headers.get("location");
    return { mark: "✗", lines: [`✗ ${path}`, `    error: HTTP ${res.status}${to ? ` → ${to}` : ""}`] };
  }
  const page = checkPage(path, await res.text(), llmsPaths);
  if (page.ogImage && (await get(local(page.ogImage), { method: "HEAD" })).status !== 200)
    page.errors.push(`og:image ${page.ogImage} does not load`);
  if (page.markdown) {
    const md = await get(local(page.markdown));
    if (md.status !== 200 || !/markdown/.test(md.headers.get("content-type") ?? ""))
      page.errors.push(`Markdown version ${page.markdown} returns ${md.status}`);
  }
  const mark = page.errors.length ? "✗" : page.warnings.length ? "!" : "✓";
  const findings = [...page.errors, ...page.warnings];
  const about = (word) => findings.some((f) => f.startsWith(word));
  return {
    path,
    mark,
    title: page.title,
    description: page.description,
    lines: [
      `${mark} ${path}`,
      ...(about("title") ? [`    title: ${page.title}`] : []),
      ...(about("description") ? [`    desc:  ${page.description}`] : []),
      ...page.errors.map((e) => `    error: ${e}`),
      ...page.warnings.map((w) => `    warn:  ${w}`),
    ],
  };
}

// The rules that apply to a crawler: every group naming it, else every `*` group (RFC 9309).
function robotsBlocks(robots, bot) {
  const groups = [];
  let current = null;
  for (const raw of robots.split("\n")) {
    const [field, ...rest] = raw.replace(/#.*/, "").split(":");
    const key = field.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      if (!current || current.rules.length) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.toLowerCase());
    } else if (current && (key === "allow" || key === "disallow")) {
      current.rules.push({ key, value });
    }
  }
  const named = groups.filter((g) => g.agents.includes(bot.toLowerCase()));
  const rules = (named.length ? named : groups.filter((g) => g.agents.includes("*"))).flatMap(
    (g) => g.rules,
  );
  return (
    rules.some((r) => r.key === "disallow" && r.value === "/") &&
    !rules.some((r) => r.key === "allow" && r.value === "/")
  );
}

async function main() {
  const siteFailures = [];
  const sitemap = await get(`${origin}/sitemap.xml`);
  if (sitemap.status !== 200) siteFailures.push(`/sitemap.xml returns HTTP ${sitemap.status}`);
  const sitemapXml = await sitemap.text();
  const paths = only.length
    ? only
    : [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  if (!paths.length) siteFailures.push("the sitemap lists no pages");
  const llms = await (await get(`${origin}/llms.txt`)).text();
  const llmsPaths = new Set(
    [...llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map(([, url]) => new URL(url).pathname),
  );

  const results = [];
  for (let i = 0; i < paths.length; i += 6) {
    results.push(...(await Promise.all(paths.slice(i, i + 6).map((path) => audit(path, llmsPaths)))));
  }

  let failed = 0;
  let warned = 0;
  for (const { mark, lines } of results) {
    if (mark === "✗") failed++;
    else if (mark === "!") warned++;
    if (mark !== "✓" || only.length) console.log(lines.join("\n"));
  }

  for (const field of ["title", "description"]) {
    const byValue = Map.groupBy(
      results.filter((r) => r[field]),
      (r) => r[field],
    );
    for (const [value, pages] of byValue)
      if (pages.length > 1)
        siteFailures.push(`duplicate ${field} “${value}” on ${pages.map((r) => r.path).join(", ")}`);
  }

  const robots = await (await get(`${origin}/robots.txt`)).text();
  for (const bot of ["*", ...Object.keys(AI_BOTS)])
    if (robotsBlocks(robots, bot)) siteFailures.push(`robots.txt disallows ${bot === "*" ? "all crawlers" : bot}`);
  for (const file of ["/llms.txt", "/llms-full.txt"]) {
    const res = await get(`${origin}${file}`);
    if (res.status !== 200) siteFailures.push(`${file} returns HTTP ${res.status}`);
  }
  for (const [bot, ua] of Object.entries(AI_BOTS)) {
    const res = await get(`${origin}/`, { headers: { "User-Agent": ua } });
    if (res.status !== 200)
      siteFailures.push(`${bot} gets HTTP ${res.status} on / (check Cloudflare AI Crawl Control)`);
  }
  for (const failure of siteFailures) console.log(`✗ site: ${failure}`);

  const ok = paths.length - failed - warned;
  console.log(
    `${paths.length} pages: ${ok} ok, ${failed} with errors, ${warned} with warnings only; ` +
      `site-wide checks ${siteFailures.length ? `${siteFailures.length} failed` : "ok"}.`,
  );
  process.exit(failed || siteFailures.length ? 1 : 0);
}

await main();
