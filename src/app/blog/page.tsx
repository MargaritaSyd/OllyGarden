import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { blogIndexSchema, breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Blog",
  description: `Articles on technical SEO, metadata, and structured data from ${siteConfig.name}.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <JsonLd data={blogIndexSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <p className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Guides that show how this starter handles crawlability, metadata, and
        structured data.
      </p>
      <ul className="mt-12 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <p className="text-sm text-zinc-500">
                <time dateTime={post.date}>
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "long",
                  }).format(new Date(post.date))}
                </time>
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
