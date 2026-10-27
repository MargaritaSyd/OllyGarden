import type { MetadataRoute } from "next";
import { blogPostHref, blogPosts } from "@/lib/blog";
import {
  caseStudies,
  caseStudiesMeta,
  caseStudyHref,
} from "@/lib/case-studies";
import { instrumentationScoreMeta, specSource } from "@/lib/instrumentation-score";
import { legalPages } from "@/lib/legal";
import { telemetryQualityMeta } from "@/lib/telemetry-quality";
import { indexablePressReleases, pressReleaseHref } from "@/lib/press";
import { resourcesMeta } from "@/lib/resources";
import { getAbsoluteUrl } from "@/lib/site";

// Static pages carry no lastmod: an always-current date tells crawlers nothing.
// Legal pages carry the date they last changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = new Date(
    Math.max(...blogPosts.map((post) => Date.parse(post.updated ?? post.date))),
  );
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(resourcesMeta.path),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/blog"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/events"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/press-releases"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/webinars-conferences"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(caseStudiesMeta.path),
      lastModified: new Date(
        Math.max(...caseStudies.map((study) => Date.parse(study.date))),
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(telemetryQualityMeta.path),
      lastModified: new Date(telemetryQualityMeta.updated),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(instrumentationScoreMeta.path),
      lastModified: new Date(specSource.date),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/agent-skills"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/resources/faq"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/pricing"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/products/insights"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/products/rose"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/solutions/overview"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/solutions/financial-services"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/solutions/retail-ecommerce"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/solutions/enterprise-software"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/company"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/contact"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/careers"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/careers/founding-enterprise-account-executive"),
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/careers/chief-of-staff"),
      lastModified: new Date("2026-10-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/careers/ai-software-engineer"),
      lastModified: new Date("2026-10-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/otel-quiz"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/trust-your-telemetry"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...Object.entries(legalPages).map(([path, { updated }]) => ({
      url: getAbsoluteUrl(path),
      lastModified: new Date(updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const articles: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getAbsoluteUrl(blogPostHref(post.slug)),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const press: MetadataRoute.Sitemap = indexablePressReleases.map((release) => ({
    url: getAbsoluteUrl(pressReleaseHref(release.slug)),
    lastModified: new Date(release.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const stories: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: getAbsoluteUrl(caseStudyHref(study.slug)),
    lastModified: new Date(study.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articles, ...stories, ...press];
}
