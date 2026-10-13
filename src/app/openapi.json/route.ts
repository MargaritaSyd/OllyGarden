const upstream = "https://api.ollygarden.cloud/openapi.json";

async function respond(request: Request) {
  try {
    const response = await fetch(upstream, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error("upstream response was not successful");
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("json"))
      throw new Error("upstream response was not JSON");
    const body = request.method === "HEAD" ? null : await response.text();
    return new Response(body, {
      headers: {
        "Content-Type": "application/vnd.oai.openapi+json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    const body =
      request.method === "HEAD"
        ? null
        : JSON.stringify({
            type: "about:blank",
            title: "OpenAPI description unavailable",
            status: 502,
          });
    return new Response(body, {
      status: 502,
      headers: {
        "Content-Type": "application/problem+json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}

export const GET = respond;
export const HEAD = respond;
