import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { BlogTrending } from "@/components/blog-trending";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import {
  blogAuthor,
  blogPostHref,
  blogPosts,
  getAdjacentPosts,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog";
import { getBlogHtml } from "@/lib/blog-content";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesBlogPostGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createPageMetadata({
      title: "Article not found",
      description: "This article does not exist.",
      path: blogPostHref(slug),
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${post.title} — OllyGarden`,
    description: post.excerpt,
    path: blogPostHref(post.slug),
    type: "article",
    image: post.image,
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [blogAuthor],
    absoluteTitle: true,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const html = post ? await getBlogHtml(slug) : null;

  if (!post || !html) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <JsonLd data={resourcesBlogPostGraph(post)} />
      <BlogArticle
        post={post}
        html={html}
        prev={prev}
        next={next}
        related={getRelatedPosts(slug)}
      />
      <BlogTrending />
      <SiteCta />
    </>
  );
}
