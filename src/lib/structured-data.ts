import type {
  AboutPage,
  Article,
  AudioObject,
  Blog,
  BlogPosting,
  BreadcrumbList,
  CollectionPage,
  ContactPage,
  DefinedTerm,
  FAQPage,
  Graph,
  NewsArticle,
  Offer,
  Organization,
  Person,
  Quiz,
  JobPosting,
  SoftwareApplication,
  SoftwareSourceCode,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import {
  blogMeta,
  blogPostAuthors,
  blogPostHref,
  type BlogAuthor,
  type BlogPost,
} from "@/lib/blog";
import { agentSkillsFaq, agentSkillsMeta, skillRepositories } from "@/lib/agent-skills";
import { brandKitMeta } from "@/lib/brand-kit/content";
import {
  caseStudies,
  caseStudiesMeta,
  caseStudyAudioIntro,
  caseStudyHref,
  type CaseStudy,
} from "@/lib/case-studies";
import { communityMeta } from "@/lib/community";
import { companyMeta } from "@/lib/company";
import { contactMeta } from "@/lib/contact";
import { careersMeta } from "@/lib/careers";
import type { CareersRole } from "@/lib/careers";
import { faqHero, faqMeta, faqSections, type FaqItem } from "@/lib/faq";
import { pressMeta, pressReleaseHref, type PressRelease } from "@/lib/press";
import { webinarsMeta } from "@/lib/webinars";
import { enterpriseMeta } from "@/lib/enterprise";
import { financialMeta } from "@/lib/financial";
import { insightsMeta, insightsPlans } from "@/lib/insights";
import {
  instrumentationScoreDefinition,
  instrumentationScoreFaq,
  instrumentationScoreMeta,
  plainRuleText,
  specSource,
} from "@/lib/instrumentation-score";
import { legalPages, type LegalPath } from "@/lib/legal";
import {
  telemetryQualityDefinition,
  telemetryQualityFaq,
  telemetryQualityMeta,
} from "@/lib/telemetry-quality";
import { pricingFaq, pricingMeta } from "@/lib/pricing";
import { resourceGroups, resourcesMeta } from "@/lib/resources";
import { retailMeta } from "@/lib/retail";
import { roseFaq, roseMeta } from "@/lib/rose";
import { solutionsMeta } from "@/lib/solutions";
import type { Post } from "@/lib/posts";
import { quizMeta } from "@/lib/quiz/topics";
import { trustGameFaq, trustGameMeta } from "@/lib/trust-game/content";
import { trustGameDeckSize } from "@/lib/trust-game/score";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export function organizationSchema(): Organization {
  return {
    "@type": "Organization",
    "@id": getAbsoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl(siteConfig.logoPath),
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contactEmail,
      url: getAbsoluteUrl("/contact"),
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressCountry: siteConfig.address.country,
    },
  };
}

function faqQuestions(items: readonly FaqItem[]) {
  return items.map((item) => ({
    "@type": "Question" as const,
    name: item.q,
    acceptedAnswer: { "@type": "Answer" as const, text: plainRuleText(item.a) },
  }));
}

/** A published monthly plan price such as "$990"; custom-priced plans have none. */
function monthlyOffers(plans: readonly { tier: string; price: string }[]): Offer[] {
  return plans
    .filter((plan) => plan.price.startsWith("$"))
    .map((plan) => {
      const price = plan.price.replace(/[$,]/g, "");
      return {
        "@type": "Offer",
        name: plan.tier,
        price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "USD",
          unitCode: "MON",
        },
      };
    });
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

function roseProduct(): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": getAbsoluteUrl("/products/rose#product"),
    name: "OllyGarden Rose",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getAbsoluteUrl("/products/rose"),
    description: roseMeta.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

function insightsProduct(): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": getAbsoluteUrl("/products/insights#product"),
    name: "OllyGarden Insights",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getAbsoluteUrl("/products/insights"),
    description: insightsMeta.description,
    offers: monthlyOffers(insightsPlans.cards),
  };
}

export function roseGraph(): Graph {
  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": getAbsoluteUrl("/products/rose#webpage"),
    url: getAbsoluteUrl("/products/rose"),
    name: roseMeta.title,
    description: roseMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/products/rose#product") },
    mainEntity: faqQuestions(roseFaq.items),
  };

  const product = roseProduct();

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
    description: insightsMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/products/insights#product") },
  };

  const product = insightsProduct();

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

export function solutionsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/solutions/overview#webpage"),
    url: getAbsoluteUrl("/solutions/overview"),
    name: solutionsMeta.title,
    description: solutionsMeta.description,
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
    description: financialMeta.description,
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
    description: retailMeta.description,
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
    description: enterpriseMeta.description,
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
    description: blogMeta.description,
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

function blogAuthorSchema(author: BlogAuthor): Person {
  return {
    "@type": "Person",
    name: author.name,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.url
      ? { url: author.url.startsWith("http") ? author.url : getAbsoluteUrl(author.url) }
      : {}),
    ...(author.sameAs ? { sameAs: [...author.sameAs] } : {}),
    worksFor: author.affiliation
      ? { "@type": "Organization", name: author.affiliation.name, url: author.affiliation.url }
      : { "@id": getAbsoluteUrl("/#organization") },
  };
}

export function resourcesBlogPostGraph(post: BlogPost): Graph {
  const path = blogPostHref(post.slug);
  const url = getAbsoluteUrl(path);
  const authors = blogPostAuthors(post).map(blogAuthorSchema);

  const article: BlogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: post.title,
    description: post.excerpt,
    image: getAbsoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: siteConfig.language,
    author: authors.length === 1 ? authors[0] : authors,
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
    description: communityMeta.description,
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
    description: pressMeta.description,
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

export function resourcesPressReleaseGraph(release: PressRelease): Graph {
  const path = pressReleaseHref(release.slug);
  const url = getAbsoluteUrl(path);

  const article: NewsArticle = {
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    url,
    headline: release.title,
    description: release.dek,
    datePublished: release.date,
    dateModified: release.date,
    inLanguage: siteConfig.language,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: { "@id": getAbsoluteUrl("/resources/press-releases#webpage") },
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
      {
        "@type": "ListItem",
        position: 3,
        name: release.title,
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), article, crumbs],
  };
}

/** A `@graph`-ready trail that starts at Home. */
function crumbsFromHome(
  trail: readonly { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        item: getAbsoluteUrl(entry.path),
      }),
    ),
  };
}

function caseStudiesCrumbs(study?: CaseStudy): BreadcrumbList {
  return crumbsFromHome([
    { name: "Case Studies", path: caseStudiesMeta.path },
    ...(study
      ? [{ name: study.shortTitle, path: caseStudyHref(study.slug) }]
      : []),
  ]);
}

export function resourcesHubGraph(): Graph {
  const links = resourceGroups.flatMap((group) => group.items);
  const page: CollectionPage = {
    "@type": "CollectionPage",
    "@id": getAbsoluteUrl(`${resourcesMeta.path}#webpage`),
    url: getAbsoluteUrl(resourcesMeta.path),
    name: resourcesMeta.title,
    description: resourcesMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: links.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getAbsoluteUrl(link.href),
        name: link.label,
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      page,
      crumbsFromHome([{ name: "Resources", path: resourcesMeta.path }]),
    ],
  };
}

export function resourcesCaseStudiesGraph(): Graph {
  const page: CollectionPage = {
    "@type": "CollectionPage",
    "@id": getAbsoluteUrl(`${caseStudiesMeta.path}#webpage`),
    url: getAbsoluteUrl(caseStudiesMeta.path),
    name: caseStudiesMeta.title,
    description: caseStudiesMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getAbsoluteUrl(caseStudyHref(study.slug)),
        name: study.title,
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      page,
      caseStudiesCrumbs(),
    ],
  };
}

export function resourcesCaseStudyGraph(study: CaseStudy): Graph {
  const url = getAbsoluteUrl(caseStudyHref(study.slug));
  const audio: AudioObject | undefined = study.audio
    ? {
        "@type": "AudioObject",
        name: `${study.shortTitle}: the audio story`,
        description: caseStudyAudioIntro,
        contentUrl: getAbsoluteUrl(study.audio.src),
        encodingFormat: "audio/mpeg",
        duration: study.audio.duration,
        inLanguage: siteConfig.language,
      }
    : undefined;

  const article: Article = {
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: study.title,
    description: study.seo?.description ?? study.dek,
    abstract: study.summary,
    datePublished: study.date,
    dateModified: study.date,
    inLanguage: siteConfig.language,
    articleSection: "Case studies",
    author: { "@id": getAbsoluteUrl("/#organization") },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": getAbsoluteUrl(`${caseStudiesMeta.path}#webpage`) },
    ...(audio ? { audio } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      article,
      caseStudiesCrumbs(study),
    ],
  };
}

export function resourcesWebinarsGraph(): Graph {
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl("/resources/webinars-conferences#webpage"),
    url: getAbsoluteUrl("/resources/webinars-conferences"),
    name: webinarsMeta.title,
    description: webinarsMeta.description,
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

export function resourcesBrandKitGraph(): Graph {
  const url = getAbsoluteUrl(brandKitMeta.path);
  const page: WebPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: brandKitMeta.title,
    description: brandKitMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      page,
      crumbsFromHome([
        { name: "Resources", path: resourcesMeta.path },
        { name: "Brand Kit", path: brandKitMeta.path },
      ]),
    ],
  };
}

export function resourcesAgentSkillsGraph(): Graph {
  const url = getAbsoluteUrl(agentSkillsMeta.path);
  const repositories: SoftwareSourceCode[] = skillRepositories.map((repository) => ({
    "@type": "SoftwareSourceCode",
    "@id": `${url}#${repository.id}`,
    name: repository.title,
    description: repository.summary,
    codeRepository: repository.href,
    sameAs: `https://www.skills.sh/${repository.repo}`,
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    isAccessibleForFree: true,
    keywords: "OpenTelemetry, Agent Skills, coding agents, Claude Code, Cursor, Codex",
    author: { "@id": getAbsoluteUrl("/#organization") },
    hasPart: repository.groups.flatMap((group) =>
      group.skills.map((skill) => ({
        "@type": "SoftwareSourceCode" as const,
        name: skill.name,
        description: skill.description,
        url: `${url}#${skill.name}`,
        codeRepository: `${repository.href}/tree/main/skills/${skill.name}`,
      })),
    ),
  }));

  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: agentSkillsMeta.title,
    description: agentSkillsMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: skillRepositories.map((repository) => ({ "@id": `${url}#${repository.id}` })),
    mainEntity: faqQuestions(agentSkillsFaq.items),
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
        name: "Agent Skills",
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, ...repositories, crumbs],
  };
}

export function resourcesInstrumentationScoreGraph(): Graph {
  const url = getAbsoluteUrl(instrumentationScoreMeta.path);

  const term: DefinedTerm = {
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    name: "Instrumentation Score",
    description: instrumentationScoreDefinition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Instrumentation Score specification",
      url: specSource.repository,
    },
  };

  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: instrumentationScoreMeta.title,
    description: instrumentationScoreMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": `${url}#term` },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: faqQuestions(instrumentationScoreFaq.items),
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
        name: "Instrumentation Score",
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, term, crumbs],
  };
}

export function resourcesTelemetryQualityGraph(): Graph {
  const url = getAbsoluteUrl(telemetryQualityMeta.path);

  const term: DefinedTerm = {
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    name: "Telemetry quality",
    description: telemetryQualityDefinition,
    url,
  };

  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: telemetryQualityMeta.title,
    description: telemetryQualityMeta.description,
    inLanguage: siteConfig.language,
    dateModified: telemetryQualityMeta.updated,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": `${url}#term` },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: faqQuestions(telemetryQualityFaq.items),
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
        name: "Telemetry quality",
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, term, crumbs],
  };
}

export function pricingGraph(): Graph {
  const url = getAbsoluteUrl(pricingMeta.path);
  const products = [insightsProduct(), roseProduct()];

  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: pricingMeta.title,
    description: pricingMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: [
      { "@id": getAbsoluteUrl("/products/insights#product") },
      { "@id": getAbsoluteUrl("/products/rose#product") },
    ],
    mainEntity: faqQuestions(pricingFaq.items),
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
        name: "Pricing",
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, ...products, crumbs],
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
    mainEntity: faqSections.flatMap((section) => faqQuestions(section.items)),
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
    description: companyMeta.description,
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
    description: contactMeta.description,
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
    description: careersMeta.description,
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

export function legalPageGraph(path: LegalPath): Graph {
  const page = legalPages[path];
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": getAbsoluteUrl(`${path}#webpage`),
    url: getAbsoluteUrl(path),
    name: page.title,
    description: page.description,
    dateModified: page.updated,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": getAbsoluteUrl("/#organization") },
  };

  const crumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getAbsoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.title, item: getAbsoluteUrl(path) },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), webPage, crumbs],
  };
}

export function quizGraph(): Graph {
  const quiz: Quiz = {
    "@type": "Quiz",
    "@id": getAbsoluteUrl("/otel-quiz#quiz"),
    name: quizMeta.title,
    description:
      "Ten scored questions on OpenTelemetry semantic conventions, SDKs, signals, the Collector, OTTL, sampling, Weaver, and Go compile-time instrumentation.",
    about: { "@type": "Thing", name: "OpenTelemetry" },
    educationalLevel: "Advanced",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), quiz],
  };
}

/** The trust game; its page also carries the FAQ, which shared result pages leave out. */
export function trustGameGraph({ faq = true } = {}): Graph {
  const url = getAbsoluteUrl(trustGameMeta.path);
  const game: Quiz = {
    "@type": "Quiz",
    "@id": `${url}#quiz`,
    name: trustGameMeta.name,
    description: `${trustGameDeckSize} real, anonymized OpenTelemetry cases across traces, logs, spans, and metrics. Decide whether each conclusion holds up, then see the tell and the fix.`,
    about: { "@type": "Thing", name: "OpenTelemetry" },
    educationalLevel: "Intermediate",
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
  const webPage: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: trustGameMeta.title,
    description: trustGameMeta.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    about: { "@id": `${url}#quiz` },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
    mainEntity: faqQuestions(trustGameFaq.items),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), game, ...(faq ? [webPage] : [])],
  };
}

export function jobPostingGraph(role: CareersRole): Graph {
  const path = role.href;
  const job: JobPosting = {
    "@type": "JobPosting",
    "@id": `${getAbsoluteUrl(path)}#job`,
    title: role.title,
    description: role.description,
    datePosted: role.datePosted,
    employmentType: role.employmentType,
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: getAbsoluteUrl("/"),
      logo: getAbsoluteUrl(siteConfig.logoPath),
    },
    jobLocationType: "TELECOMMUTE",
    ...(role.applicantCountry && {
      applicantLocationRequirements: {
        "@type": "Country",
        name: role.applicantCountry,
      },
    }),
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
      {
        "@type": "ListItem",
        position: 3,
        name: role.title,
        item: getAbsoluteUrl(path),
      },
    ],
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), job, crumbs],
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
