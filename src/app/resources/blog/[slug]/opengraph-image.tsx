import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { tokens } from "@/lib/tokens";

export const alt = "Blog article share image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Article not found";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: tokens.forest,
          color: tokens.mist,
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: -0.5, color: tokens.sunflower }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size,
  );
}
