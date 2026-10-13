import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { BlogTrending } from "@/components/blog-trending";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import {
  blogPostAuthors,
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
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: blogPostHref(post.slug),
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    authors: blogPostAuthors(post).map((author) => author.name),
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
