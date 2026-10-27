import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  markdownRepresentationUrl,
  negotiateMarkdown,
} from "../src/edge/markdown-negotiation.ts";
import { finalizeResponse, httpsRedirect } from "../src/edge/responses.ts";

function recorder() {
  const seen = [];
  const next = async (request) => {
    seen.push(request);
    return new Response("html", {
      headers: { Vary: "RSC, Accept-Encoding" },
    });
  };
  return { seen, next };
}

const page = (accept, init = {}) =>
  new Request("https://ollygarden.com/pricing?ref=x", {
    ...init,
    headers: { Accept: accept, ...init.headers },
  });

test("Markdown requests render the page's /agent-content representation", async () => {
  const { seen, next } = recorder();
  await negotiateMarkdown(page("text/markdown", { method: "HEAD" }), next);
  assert.equal(seen[0].url, "https://ollygarden.com/agent-content/pricing.md");
  assert.equal(seen[0].method, "HEAD");

  await negotiateMarkdown(
    new Request("https://ollygarden.com/", {
      headers: { Accept: "text/html;q=0.9, text/markdown" },
    }),
    next,
  );
  assert.equal(seen[1].url, "https://ollygarden.com/agent-content/index.md");
});

test("HTML and explicit Markdown opt-outs pass through and vary on Accept", async () => {
  for (const accept of ["text/html", "text/markdown;q=0"]) {
    const { seen, next } = recorder();
    const request = page(accept);
    const response = await negotiateMarkdown(request, next);
    assert.equal(seen[0], request);
    assert.equal(response.headers.get("Vary"), "RSC, Accept-Encoding, Accept");
  }
});

test("files, non-GET methods, agent content, and self-fetches are not negotiated", async () => {
  const cases = [
    new Request("https://ollygarden.com/images/logo.svg", {
      headers: { Accept: "text/markdown" },
    }),
    page("text/markdown", { method: "POST", body: "x" }),
    new Request("https://ollygarden.com/agent-content/pricing", {
      headers: { Accept: "text/markdown" },
    }),
    page("text/markdown", {
      headers: { "X-OllyGarden-Markdown-Source": "1" },
    }),
  ];
  for (const request of cases) {
    const { seen, next } = recorder();
    const response = await negotiateMarkdown(request, next);
    assert.equal(seen[0], request);
    assert.equal(response.headers.get("Vary"), "RSC, Accept-Encoding");
  }
  assert.equal(
    markdownRepresentationUrl("https://ollygarden.com/api-docs/").pathname,
    "/agent-content/api-docs.md",
  );
});

test("prerendered pages revalidate on every visit and responses vary on encoding", () => {
  const prerendered = new Response("html", {
    headers: { "Cache-Control": "s-maxage=31536000, stale-while-revalidate=60" },
  });
  const page = finalizeResponse(new Request("https://ollygarden.com/"), prerendered);
  assert.equal(page.headers.get("Cache-Control"), "public, max-age=0, must-revalidate");
  assert.equal(page.headers.get("Vary"), "Accept-Encoding");
  assert.equal(page.headers.get("X-Robots-Tag"), null);
  const preview = finalizeResponse(
    new Request("https://feature-wicket.ollygarden.workers.dev/"),
    new Response("html"),
  );
  assert.equal(preview.headers.get("X-Robots-Tag"), "noindex");

  const markdown = finalizeResponse(
    new Request("https://ollygarden.com/pricing.md"),
    new Response("md", {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
        Vary: "rsc, Accept, accept-encoding",
      },
    }),
  );
  assert.equal(
    markdown.headers.get("Cache-Control"),
    "public, s-maxage=3600, stale-while-revalidate",
  );
  assert.equal(markdown.headers.get("Vary"), "rsc, Accept, accept-encoding");
});

test("visitors on plain HTTP to the canonical host redirect to HTTPS", () => {
  const visit = (url, scheme) =>
    new Request(url, {
      headers: scheme ? { "CF-Visitor": `{"scheme":"${scheme}"}` } : {},
    });
  const redirect = httpsRedirect(visit("http://ollygarden.com/pricing?ref=x", "http"));
  assert.equal(redirect.status, 301);
  assert.equal(
    redirect.headers.get("Location"),
    "https://ollygarden.com/pricing?ref=x",
  );
  assert.equal(httpsRedirect(visit("https://ollygarden.com/", "https")), null);
  const post = new Request("http://ollygarden.com/contact", {
    method: "POST",
    body: "x",
    headers: { "CF-Visitor": '{"scheme":"http"}' },
  });
  assert.equal(httpsRedirect(post).status, 308);
  // Local wrangler dev presents the route host over HTTP with no CF-Visitor.
  assert.equal(httpsRedirect(visit("http://ollygarden.com/")), null);
  assert.equal(httpsRedirect(visit("http://localhost:8787/", "http")), null);
});

test("the Worker serves the content files its route handlers read at runtime", () => {
  const wrangler = readFileSync("wrangler.jsonc", "utf8");
  for (const glob of ["content/**/*.html", "content/**/*.txt", "public/*.md"]) {
    assert.ok(wrangler.includes(`"${glob}"`), `${glob} must be a Worker module`);
  }
  assert.match(wrangler, /"main": "worker\.ts"/);
  assert.match(wrangler, /"pattern": "ollygarden\.com\/\*"/);
  const previews = wrangler.slice(wrangler.indexOf('"previews"'));
  assert.match(previews, /"SUPABASE_SEND_EMAIL": "false"/, "previews must never send email");
  assert.match(readFileSync("public/_headers", "utf8"), /\/_next\/static\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/);
});
