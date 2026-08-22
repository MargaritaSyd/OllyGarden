import type {
  AboutPage,
  Blog,
  BlogPosting,
  BreadcrumbList,
  Graph,
  Organization,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import type { Post } from "@/lib/posts";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export function organizationSchema(): Organization {
  return {
    "@type": "Organization",
    "@id": getAbsoluteUrl("/#organization"),
    name: siteConfig.name,
    url: getAbsoluteUrl("/"),
    description: siteConfig.description,
  };
}

export function websiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": getAbsoluteUrl("/#website"),
    name: siteConfig.name,
    url: getAbsoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
}

export function homeGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/#webpage"),
    url: getAbsoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage],
  };
}

export function aboutPageSchema(): WithContext<AboutPage> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": getAbsoluteUrl("/about#webpage"),
    url: getAbsoluteUrl("/about"),
    name: `About ${siteConfig.name}`,
    description: `Learn what ${siteConfig.name} is and how this starter approaches technical SEO.`,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
  };
}

export function blogIndexSchema(): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": getAbsoluteUrl("/blog#webpage"),
    url: getAbsoluteUrl("/blog"),
    name: `${siteConfig.name} Blog`,
    description: `Articles on technical SEO, metadata, and structured data from ${siteConfig.name}.`,
    inLanguage: siteConfig.language,
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
}

export function blogPostSchema(post: Post): WithContext<BlogPosting> {
  const url = getAbsoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: siteConfig.language,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}
