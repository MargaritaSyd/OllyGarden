import { readFileSync } from "node:fs";

const html = readFileSync(".tmp-web/brand-kit.html", "utf8");
const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
const desc = html.match(/name="description" content="([^"]*)"/)?.[1];
const canon = html.match(/rel="canonical" href="([^"]*)"/)?.[1];
const og = html.match(/property="og:image" content="([^"]*)"/)?.[1];
const headings = [...html.matchAll(/<h([1-3])[^>]*>(.*?)<\/h\1>/gs)].map((match) => {
  const text = match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return `${match[1]} ${text}`;
});
const ids = [...new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]))];

console.log("TITLE", title);
console.log("DESC_LEN", desc?.length);
console.log("DESC", desc);
console.log("CANON", canon);
console.log("OG", og);
console.log("HEADINGS");
for (const line of headings) console.log(line);
console.log("IDS", ids.join(", "));
console.log("HAS_ERROR", /Application error|Unhandled Runtime Error/.test(html));
console.log("OTEL_MARK", html.includes("OpenTelemetry®") || html.includes("OpenTelemetry\u00ae"));
console.log("DOCK", html.includes("Brand Kit sections"));
console.log("CTA", html.includes("that isn’t here") || html.includes("that isn't here"));
