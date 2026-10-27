import { appendVary } from "./headers.ts";

const AGENT_CONTENT_ROOT = "/agent-content";

export function acceptsMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false;
  }

  return accept.split(",").some((range) => {
    const [mediaType, ...parameters] = range.trim().toLowerCase().split(";");
    if (mediaType !== "text/markdown") {
      return false;
    }

    const quality = parameters
      .map((parameter) => parameter.trim().match(/^q\s*=\s*(.+)$/)?.[1])
      .find((value) => value !== undefined);

    return quality === undefined || Number.parseFloat(quality) > 0;
  });
}

export function markdownRepresentationUrl(requestUrl: string): URL | null {
  const url = new URL(requestUrl);
  const normalizedPath = url.pathname.replace(/\/+$/, "");
  const lastSegment = normalizedPath.split("/").pop() || "";

  if (lastSegment.includes(".")) {
    return null;
  }

  url.pathname = normalizedPath
    ? AGENT_CONTENT_ROOT + normalizedPath + ".md"
    : AGENT_CONTENT_ROOT + "/index.md";
  url.search = "";
  return url;
}

function includeAccept(response: Response) {
  const headers = new Headers(response.headers);
  appendVary(headers, "Accept");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Serves `Accept: text/markdown` page requests from their `/agent-content`
 * representation, and marks every other page response as varying on Accept.
 * `next` renders a request.
 */
export async function negotiateMarkdown(
  request: Request,
  next: (request: Request) => Promise<Response>,
): Promise<Response> {
  const markdownUrl =
    (request.method === "GET" || request.method === "HEAD") &&
    !request.headers.has("x-ollygarden-markdown-source") &&
    !new URL(request.url).pathname.startsWith(AGENT_CONTENT_ROOT + "/")
      ? markdownRepresentationUrl(request.url)
      : null;
  if (!markdownUrl) return next(request);
  if (acceptsMarkdown(request.headers.get("accept"))) {
    return next(new Request(markdownUrl, request));
  }
  return includeAccept(await next(request));
}
