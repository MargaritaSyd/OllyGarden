import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { homeGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — SEO-ready Next.js starter`,
  description: siteConfig.description,
  path: "/",
});

const features = [
  {
    title: "Metadata API",
    body: "Titles, descriptions, canonical URLs, Open Graph, and Twitter cards are defined per route and resolved on the server.",
  },
  {
    title: "Crawl files",
    body: "robots.ts and sitemap.ts tell search engines what to index, including static pages and blog posts.",
  },
  {
    title: "Structured data",
    body: "JSON-LD describes the organization, website, and articles so crawlers can understand the page type.",
  },
  {
    title: "Share images",
    body: "Generated Open Graph images keep social previews consistent without exporting a static asset for every URL.",
  },
];

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <JsonLd data={homeGraph()} />
      <section className="max-w-3xl">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Next.js 16 · React 19 · App Router
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          A production baseline for SEO-first React apps
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {siteConfig.description} Server Components ship HTML that crawlers can
          read. Metadata, sitemaps, and schema stay in one place so every new
          route can inherit the same rules.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Read the blog
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            About this starter
          </Link>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="seo-features">
        <h2 id="seo-features" className="text-2xl font-semibold tracking-tight">
          What is already wired up
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="latest-articles">
        <div className="flex items-end justify-between gap-4">
          <h2 id="latest-articles" className="text-2xl font-semibold tracking-tight">
            Latest articles
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View all
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <article className="h-full rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500">
                  <time dateTime={post.date}>
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                    }).format(new Date(post.date))}
                  </time>
                </p>
                <h3 className="mt-3 text-lg font-medium">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
