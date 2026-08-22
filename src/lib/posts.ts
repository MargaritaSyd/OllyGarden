export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "seo-foundations-in-next-js",
    title: "SEO foundations in Next.js",
    description:
      "How metadata, sitemaps, robots rules, and server-rendered HTML work together in the App Router.",
    date: "2026-08-01",
    author: "Wicket",
    tags: ["SEO", "Next.js", "metadata"],
    content: [
      "Search engines rank pages they can crawl, understand, and trust. Next.js helps by sending complete HTML from the server, then attaching metadata that describes the page.",
      "Start with a single source of truth for the site name, description, and origin URL. Every canonical link, Open Graph tag, and sitemap entry should resolve from that origin.",
      "Use the Metadata API for titles, descriptions, and social cards. Add robots.ts and sitemap.ts so crawlers know what to index. Finish with JSON-LD so search engines can map the page to a known entity type.",
    ],
  },
  {
    slug: "structured-data-and-sharing",
    title: "Structured data and social sharing",
    description:
      "Use JSON-LD, Open Graph, and generated share images so search engines and social platforms can present your pages clearly.",
    date: "2026-08-08",
    author: "Wicket",
    tags: ["JSON-LD", "Open Graph", "sharing"],
    content: [
      "Structured data does not replace visible content. It explains the same content in a machine-readable format that search engines and AI systems can parse.",
      "Open Graph and Twitter cards control how a URL looks when it is shared. Generated OG images keep titles readable on every post without exporting a static asset for each route.",
      "Validate markup with Google's Rich Results Test and the Schema Markup Validator before you ship. Small type mistakes can prevent rich results from appearing.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
