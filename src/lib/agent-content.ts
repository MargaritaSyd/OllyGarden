import { readFile } from "node:fs/promises";
import { blogPostHref, blogPosts } from "@/lib/blog";
import { brandKitMeta } from "@/lib/brand-kit/content";
import { expandBlogCta } from "@/lib/blog-cta";
import { caseStudiesMeta } from "@/lib/case-studies";
import { caseStudyMarkdown } from "@/lib/case-study-markdown";
import { htmlTextContent, htmlToMarkdown } from "@/lib/html-to-markdown";
import { instrumentationScoreMeta } from "@/lib/instrumentation-score";
import { kubeconNa2026Meta } from "@/lib/kubecon-na-2026";
import { legalPages } from "@/lib/legal";
import { telemetryQualityMeta } from "@/lib/telemetry-quality";
import { quizMeta } from "@/lib/quiz/topics";
import { trustGameMeta } from "@/lib/trust-game/content";
import { resourcesHero, resourcesMeta } from "@/lib/resources";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

type AgentPage = { title: string; description: string };

const agentPages: Record<string, AgentPage> = {
  "/": { title: "OllyGarden", description: siteConfig.description },
  "/company": {
    title: "Company",
    description: "Meet the team cultivating clarity in observability.",
  },
  "/contact": {
    title: "Contact OllyGarden",
    description:
      "Talk with OllyGarden about telemetry quality and OpenTelemetry.",
  },
  "/careers": {
    title: "Careers",
    description: "Join OllyGarden's remote-first team.",
  },
  "/otel-quiz": {
    title: quizMeta.title,
    description: "Test your OpenTelemetry knowledge with ten scored questions.",
  },
  [trustGameMeta.path]: {
    title: trustGameMeta.name,
    description: trustGameMeta.description,
  },
  "/pricing": {
    title: "OllyGarden Pricing",
    description: "Plans and prices for OllyGarden Insights and Rose.",
  },
  "/products/insights": {
    title: "OllyGarden Insights",
    description: "Measure and improve the quality of production telemetry.",
  },
  "/products/rose": {
    title: "OllyGarden Rose",
    description: "Find and fix instrumentation gaps in source code.",
  },
  [resourcesMeta.path]: {
    title: resourcesHero.badge,
    description: resourcesMeta.description,
  },
  [telemetryQualityMeta.path]: {
    title: "What is telemetry quality?",
    description: telemetryQualityMeta.description,
  },
  [instrumentationScoreMeta.path]: {
    title: "The Instrumentation Score",
    description: instrumentationScoreMeta.description,
  },
  "/resources/agent-skills": {
    title: "OllyGarden Agent Skills",
    description:
      "Open source OpenTelemetry skills for coding agents, and how Rose uses them.",
  },
  [brandKitMeta.path]: {
    title: "OllyGarden Brand Kit",
    description: brandKitMeta.description,
  },
  [caseStudiesMeta.path]: {
    title: caseStudiesMeta.title,
    description: caseStudiesMeta.description,
  },
  "/resources/blog": {
    title: "OllyGarden Blog",
    description: "Practical OpenTelemetry and observability guidance.",
  },
  "/resources/events": {
    title: "Events",
    description: "Meet OllyGarden at observability and OpenTelemetry events.",
  },
  [kubeconNa2026Meta.path]: {
    title: kubeconNa2026Meta.title,
    description: kubeconNa2026Meta.description,
  },
  "/resources/faq": {
    title: "Frequently Asked Questions",
    description: "Answers about OllyGarden products, privacy, and pricing.",
  },
  "/resources/press-releases": {
    title: "Press Releases",
    description: "OllyGarden news and announcements.",
  },
  "/resources/webinars-conferences": {
    title: "Webinars and Conferences",
    description: "Recorded and upcoming OllyGarden sessions.",
  },
  "/solutions/overview": {
    title: "Solutions",
    description: "Telemetry-quality solutions for engineering organizations.",
  },
  "/solutions/enterprise-software": {
    title: "Enterprise Software",
    description: "Improve telemetry across complex enterprise software.",
  },
  "/solutions/financial-services": {
    title: "Financial Services",
    description: "Reliable, efficient telemetry for financial systems.",
  },
  "/solutions/retail-ecommerce": {
    title: "Retail and Ecommerce",
    description: "Improve telemetry for high-volume digital commerce.",
  },
  ...legalPages,
  "/careers/founding-enterprise-account-executive": {
    title: "Founding Enterprise Account Executive",
    description:
      "Build OllyGarden's first enterprise sales motion in the United States.",
  },
};

const markdownAliases: Record<string, string> = {
  "/api-docs": "api-docs.md",
  "/api-versioning": "api-versioning.md",
};

function staticMarkdown(path: string, page: AgentPage) {
  const extras =
    path === "/resources/blog"
      ? `\n\n## Articles\n\n${blogPosts.map((post) => `- [${post.title}](${getAbsoluteUrl(blogPostHref(post.slug))}) — ${post.excerpt}`).join("\n")}`
      : "";
  return `# ${page.title}\n\n${page.description}\n\nCanonical URL: ${getAbsoluteUrl(path)}${extras}\n\n## Agent resources\n\n- [Developer resources](${getAbsoluteUrl("/developers.md")})\n- [LLM index](${getAbsoluteUrl("/llms.txt")})\n- [Sitemap](${getAbsoluteUrl("/sitemap.xml")})`;
}

// Redirects are not followed: a redirected path is not a page, and following
// it would label the destination's content with this path as canonical.
async function fetchOwnPage(path: string, requestUrl: string) {
  // Encoded slashes in the slug can turn the path into `//host`, which
  // resolves off-site; only ever re-render this site's own pages.
  const target = new URL(path, requestUrl);
  if (target.origin !== new URL(requestUrl).origin) return null;
  return fetch(target, {
    cache: "no-store",
    redirect: "manual",
    headers: {
      Accept: "text/html",
      "X-OllyGarden-Markdown-Source": "1",
    },
  });
}

/** The same-origin path that `path` redirects to, or null. */
export async function agentPageRedirect(path: string, requestUrl: string) {
  try {
    const response = await fetchOwnPage(path, requestUrl);
    const location = response?.headers.get("location");
    if (!location || response!.status < 300 || response!.status > 399) {
      return null;
    }
    const target = new URL(location, requestUrl);
    return target.origin === new URL(requestUrl).origin ? target.pathname : null;
  } catch {
    return null;
  }
}

async function renderedPageMarkdown(path: string, requestUrl: string) {
  try {
    const response = await fetchOwnPage(path, requestUrl);
    if (!response?.ok) return null;
    const html = await response.text();
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    if (!main) return null;
    const content = htmlToMarkdown(main);
    if (!content) return null;
    const page = agentPages[path];
    const title = htmlTextContent(
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? path,
    );
    const prefix = /^# /m.test(content.replace(/```[\s\S]*?```/g, ""))
      ? ""
      : `# ${page?.title ?? title}\n\n`;
    return `${prefix}${content}\n\nCanonical URL: ${getAbsoluteUrl(path)}`;
  } catch {
    return null;
  }
}

export async function getAgentMarkdown(path: string, requestUrl?: string) {
  const normalized = path === "" ? "/" : path.replace(/\/$/, "") || "/";
  const alias = markdownAliases[normalized];
  if (alias) {
    return readFile(`${process.cwd()}/public/${alias}`, "utf8");
  }

  const post = blogPosts.find(
    (candidate) => blogPostHref(candidate.slug) === normalized,
  );
  if (post) {
    const html = await readFile(
      `${process.cwd()}/content/blog/${post.slug}.html`,
      "utf8",
    );
    return `# ${post.title}\n\n${post.excerpt}\n\nPublished: ${post.date}\nCanonical URL: ${getAbsoluteUrl(normalized)}\n\n${htmlToMarkdown(expandBlogCta(html, post.cta))}`;
  }

  const story = await caseStudyMarkdown(normalized);
  if (story) return story;

  if (requestUrl) {
    const rendered = await renderedPageMarkdown(normalized, requestUrl);
    if (rendered) return rendered;
  }

  const page = agentPages[normalized];
  return page ? staticMarkdown(normalized, page) : null;
}

export function agentNotFoundMarkdown(path: string) {
  return `# Page not found\n\nNo Markdown representation exists for \`${path}\`.\n\n- [Sitemap](${getAbsoluteUrl("/sitemap.xml")})\n- [LLM index](${getAbsoluteUrl("/llms.txt")})\n- [Developer resources](${getAbsoluteUrl("/developers.md")})`;
}
