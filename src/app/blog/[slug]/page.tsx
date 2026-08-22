import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts, getPost } from "@/lib/posts";
import { blogPostSchema, breadcrumbSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return createPageMetadata({
      title: "Article not found",
      description: "This article does not exist.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const published = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
  }).format(new Date(post.date));

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              Blog
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>
      <header className="mt-4">
        <p className="text-sm text-zinc-500">
          <time dateTime={post.date}>{published}</time>
          <span aria-hidden="true"> · </span>
          {post.author}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      </header>
      <div className="mt-10 space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
