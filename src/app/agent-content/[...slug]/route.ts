import { agentNotFoundMarkdown, getAgentMarkdown } from "@/lib/agent-content";
import { getAbsoluteUrl } from "@/lib/site";

const headers = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=0, must-revalidate",
  Vary: "Accept",
};

function originalPath(slug: string[]) {
  const joined = slug.join("/");
  if (joined === "index.md") return "/";
  return `/${joined.replace(/\.md$/, "")}`;
}

async function respond(
  request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;
  const path = originalPath(slug);
  const markdown = await getAgentMarkdown(path, request.url);
  const body =
    request.method === "HEAD"
      ? null
      : (markdown ?? agentNotFoundMarkdown(path));
  return new Response(body, {
    status: markdown ? 200 : 404,
    headers: markdown
      ? {
          ...headers,
          // Each Markdown version re-renders its page, so let the CDN keep it.
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
          Link: `<${getAbsoluteUrl(path)}>; rel="canonical"`,
        }
      : headers,
  });
}

export const GET = respond;
export const HEAD = respond;
