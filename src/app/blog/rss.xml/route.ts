import {
  blogAuthorNames,
  blogHero,
  blogPostHref,
  blogPosts,
} from "@/lib/blog";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const items = blogPosts
    .map((post) => {
      const url = getAbsoluteUrl(blogPostHref(post.slug));
      const guid = getAbsoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${guid}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>blog@ollygarden.com (${escapeXml(blogAuthorNames(post))})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} Blog`)}</title>
    <link>${getAbsoluteUrl("/resources/blog")}</link>
    <description>${escapeXml(blogHero.title)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${new Date(blogPosts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${getAbsoluteUrl(siteConfig.blogFeedPath)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
