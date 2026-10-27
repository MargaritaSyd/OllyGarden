import { appendVary } from "./headers.ts";

// Keep equal to the host of NEXT_PUBLIC_SITE_URL.
const CANONICAL_HOST = "ollygarden.com";

/**
 * Fallback for the zone's Always Use HTTPS: redirects visitors on plain HTTP,
 * keeping the method and body of anything but GET and HEAD. It reads the scheme
 * from Cloudflare's CF-Visitor header, not request.url: `wrangler dev` presents
 * every request as plain HTTP to the route's host and sends no CF-Visitor.
 */
export function httpsRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.hostname !== CANONICAL_HOST || visitorScheme(request) !== "http")
    return null;
  url.protocol = "https:";
  const safe = request.method === "GET" || request.method === "HEAD";
  return Response.redirect(url.href, safe ? 301 : 308);
}

function visitorScheme(request: Request) {
  try {
    return JSON.parse(request.headers.get("CF-Visitor") ?? "{}").scheme;
  } catch {
    return undefined;
  }
}

// Next.js marks prerendered pages cacheable for a year by shared caches.
// Browsers and proxies revalidate them instead, so a deploy reaches every
// visitor at once.
const PRERENDERED_CACHE_CONTROL = /^s-maxage=31536000\b/;
const REVALIDATE = "public, max-age=0, must-revalidate";

/**
 * Revalidates prerendered pages on every visit, varies every response on
 * Accept-Encoding because Cloudflare compresses it per client, and keeps
 * preview hosts out of search indexes.
 */
export function finalizeResponse(request: Request, response: Response) {
  const headers = new Headers(response.headers);
  appendVary(headers, "Accept-Encoding");
  if (new URL(request.url).hostname !== CANONICAL_HOST)
    headers.set("X-Robots-Tag", "noindex");
  if (PRERENDERED_CACHE_CONTROL.test(headers.get("Cache-Control") ?? ""))
    headers.set("Cache-Control", REVALIDATE);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
