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

type Context = {
  next(options?: { sendConditionalRequest?: boolean }): Promise<Response>;
};

function includeAccept(response: Response) {
  const headers = new Headers(response.headers);
  const values = (headers.get("Vary") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!values.some((value) => value.toLowerCase() === "accept"))
    values.push("Accept");
  headers.set("Vary", values.join(", "));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const markdownNegotiation = async (
  request: Request,
  context: Context,
): Promise<URL | Response | undefined> => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return;
  }
  if (request.headers.has("x-ollygarden-markdown-source")) {
    return;
  }
  const markdownUrl = markdownRepresentationUrl(request.url);
  if (!markdownUrl) return;
  if (acceptsMarkdown(request.headers.get("accept"))) {
    return markdownUrl;
  }
  return includeAccept(await context.next({ sendConditionalRequest: true }));
};

export default markdownNegotiation;
