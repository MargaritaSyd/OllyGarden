import { BlogFeatured } from "@/components/blog-featured";
import { BlogHero } from "@/components/blog-hero";
import { BlogPosts } from "@/components/blog-posts";
import { BlogTrending } from "@/components/blog-trending";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { blogHero, blogMeta } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesBlogGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: blogMeta.title,
  description: blogHero.title,
  path: blogMeta.path,
  absoluteTitle: true,
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={resourcesBlogGraph()} />
      <BlogHero />
      <BlogFeatured />
      <BlogPosts />
      <BlogTrending />
      <SiteCta />
    </>
  );
}
