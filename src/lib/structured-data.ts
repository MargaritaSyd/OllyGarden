import type {
  AboutPage,
  Blog,
  BlogPosting,
  BreadcrumbList,
  ContactPage,
  FAQPage,
  Graph,
  Organization,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import {
  blogAuthor,
  blogHero,
  blogMeta,
  blogPostHref,
  type BlogPost,
} from "@/lib/blog";
import { communityHero, communityMeta } from "@/lib/community";
import { companyHero, companyMeta } from "@/lib/company";
import { contactHero, contactMeta } from "@/lib/contact";
import { careersHero, careersMeta } from "@/lib/careers";
import { faqHero, faqMeta, faqSections } from "@/lib/faq";
import { pressHero, pressMeta } from "@/lib/press";
import { webinarsHero, webinarsMeta } from "@/lib/webinars";
import { enterpriseHero, enterpriseMeta } from "@/lib/enterprise";
import { financialHero, financialMeta } from "@/lib/financial";
import { insightsHero, insightsMeta } from "@/lib/insights";
import { retailHero, retailMeta } from "@/lib/retail";
import { roseHero, roseMeta } from "@/lib/rose";
import { solutionsHero, solutionsMeta } from "@/lib/solutions";
import { tulipHero, tulipMeta } from "@/lib/tulip";
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

export function roseGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/products/rose#webpage"),
    url: getAbsoluteUrl("/products/rose"),
    name: roseMeta.title,
    description: roseHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/products/rose#product") },
  };

  const product: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": getAbsoluteUrl("/products/rose#product"),
    name: "OllyGarden Rose",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getAbsoluteUrl("/products/rose"),
    description: roseHero.lede,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rose",
        item: getAbsoluteUrl("/products/rose"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, product, crumbs],
  };
}

export function insightsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/products/insights#webpage"),
    url: getAbsoluteUrl("/products/insights"),
    name: insightsMeta.title,
    description: insightsHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/products/insights#product") },
  };

  const product: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": getAbsoluteUrl("/products/insights#product"),
    name: "OllyGarden Insights",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getAbsoluteUrl("/products/insights"),
    description: insightsHero.lede,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: getAbsoluteUrl("/products/insights"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, product, crumbs],
  };
}

export function tulipGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/products/tulip#webpage"),
    url: getAbsoluteUrl("/products/tulip"),
    name: tulipMeta.title,
    description: tulipHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/products/tulip#product") },
  };

  const product: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": getAbsoluteUrl("/products/tulip#product"),
    name: "OllyGarden Tulip",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getAbsoluteUrl("/products/tulip"),
    description: tulipHero.lede,
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tulip",
        item: getAbsoluteUrl("/products/tulip"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, product, crumbs],
  };
}

export function solutionsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/solutions/overview#webpage"),
    url: getAbsoluteUrl("/solutions/overview"),
    name: solutionsMeta.title,
    description: solutionsHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: getAbsoluteUrl("/solutions/overview"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function financialGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/solutions/financial-services#webpage"),
    url: getAbsoluteUrl("/solutions/financial-services"),
    name: financialMeta.title,
    description: financialHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: getAbsoluteUrl("/solutions/overview"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Financial Services",
        item: getAbsoluteUrl("/solutions/financial-services"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function retailGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/solutions/retail-ecommerce#webpage"),
    url: getAbsoluteUrl("/solutions/retail-ecommerce"),
    name: retailMeta.title,
    description: retailHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: getAbsoluteUrl("/solutions/overview"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Retail & E-commerce",
        item: getAbsoluteUrl("/solutions/retail-ecommerce"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function enterpriseGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/solutions/enterprise-software#webpage"),
    url: getAbsoluteUrl("/solutions/enterprise-software"),
    name: enterpriseMeta.title,
    description: enterpriseHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: getAbsoluteUrl("/solutions/overview"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Enterprise Software",
        item: getAbsoluteUrl("/solutions/enterprise-software"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function resourcesBlogGraph(): Graph {
  const webPage: Blog = {
    "@type": "Blog",
    "@id": getAbsoluteUrl("/resources/blog#webpage"),
    url: getAbsoluteUrl("/resources/blog"),
    name: blogMeta.title,
    description: blogHero.title,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: getAbsoluteUrl("/resources/blog"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function resourcesBlogPostGraph(post: BlogPost): Graph {
  const path = blogPostHref(post.slug);
  const url = getAbsoluteUrl(path);

  const article: BlogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: post.title,
    description: post.excerpt,
    image: getAbsoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: siteConfig.language,
    author: {
      "@type": "Person",
      name: blogAuthor,
    },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    isPartOf: { "@id": getAbsoluteUrl("/resources/blog#webpage") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: getAbsoluteUrl("/resources/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), article, crumbs],
  };
}

export function resourcesEventsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/resources/events#webpage"),
    url: getAbsoluteUrl("/resources/events"),
    name: communityMeta.title,
    description: communityHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: getAbsoluteUrl("/resources/events"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function resourcesPressGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/resources/press-releases#webpage"),
    url: getAbsoluteUrl("/resources/press-releases"),
    name: pressMeta.title,
    description: pressHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Press Releases",
        item: getAbsoluteUrl("/resources/press-releases"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function resourcesWebinarsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/resources/webinars-conferences#webpage"),
    url: getAbsoluteUrl("/resources/webinars-conferences"),
    name: webinarsMeta.title,
    description: webinarsHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Webinars & Conferences",
        item: getAbsoluteUrl("/resources/webinars-conferences"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function resourcesFaqGraph(): Graph {
  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": getAbsoluteUrl("/resources/faq#webpage"),
    url: getAbsoluteUrl("/resources/faq"),
    name: faqMeta.title,
    description: faqHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question" as const,
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: item.a,
        },
      })),
    ),
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Documentation & FAQ",
        item: getAbsoluteUrl("/resources/faq"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function companyGraph(): Graph {
  const webPage: AboutPage = {
    "@type": "AboutPage",
    "@id": getAbsoluteUrl("/company#webpage"),
    url: getAbsoluteUrl("/company"),
    name: companyMeta.title,
    description: companyHero.ledes[0],
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Company",
        item: getAbsoluteUrl("/company"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function contactGraph(): Graph {
  const webPage: ContactPage = {
    "@type": "ContactPage",
    "@id": getAbsoluteUrl("/contact#webpage"),
    url: getAbsoluteUrl("/contact"),
    name: contactMeta.title,
    description: contactHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: getAbsoluteUrl("/contact"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function careersGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/careers#webpage"),
    url: getAbsoluteUrl("/careers"),
    name: careersMeta.title,
    description: careersHero.lede,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: getAbsoluteUrl("/careers"),
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
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
