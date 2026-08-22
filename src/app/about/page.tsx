import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "About",
  description: `Learn what ${siteConfig.name} is and how this starter approaches technical SEO in Next.js.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <JsonLd data={aboutPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <p className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        About
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        About {siteConfig.name}
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        <p>
          {siteConfig.name} is a Next.js 16 project set up for search engines
          from the first commit. Pages render on the server, metadata is typed,
          and crawl files are generated from the same site configuration used
          for canonical URLs.
        </p>
        <p>
          Add a page by creating a route in <code>src/app</code>, exporting
          metadata with a unique title and description, and including JSON-LD
          when the page maps to a schema.org type. Keep copy in English and
          visible in the HTML so crawlers do not have to execute client
          JavaScript to understand the content.
        </p>
        <p>
          Set <code>NEXT_PUBLIC_SITE_URL</code> to your production origin before
          deploying. That value drives canonical links, Open Graph URLs, the
          sitemap, and robots.txt.
        </p>
      </div>
    </article>
  );
}
