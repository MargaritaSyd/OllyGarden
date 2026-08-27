import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { stubMetadata } from "@/lib/stub";

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

  return stubMetadata(post?.title ?? "Article", `/resources/blog/${slug}`);
}

export default async function BlogArticleStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <ComingSoon title={post.title} />;
}
