import { getAgentMarkdown } from "@/lib/agent-content";
import { agentSkillsFaq } from "@/lib/agent-skills";
import { blogPostHref, blogPosts } from "@/lib/blog";
import {
  caseStudies,
  caseStudiesMeta,
  caseStudyHref,
} from "@/lib/case-studies";
import { faqSections, type FaqItem } from "@/lib/faq";
import { insightsPlans } from "@/lib/insights";
import {
  instrumentationScoreFaq,
  instrumentationScoreMeta,
  specSource,
} from "@/lib/instrumentation-score";
import { specRules } from "@/lib/instrumentation-score-rules";
import { legalPages } from "@/lib/legal";
import { pricingFaq } from "@/lib/pricing";
import { resourcesMeta } from "@/lib/resources";
import { indexablePressReleases, pressReleaseHref } from "@/lib/press";
import { rosePlans } from "@/lib/rose";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { telemetryQualityDefinition, telemetryQualityFaq, telemetryQualityMeta } from "@/lib/telemetry-quality";

const link = (label: string, path: string, note?: string) =>
  `- [${label}](${path.startsWith("http") ? path : getAbsoluteUrl(path)})${note ? `: ${note}` : ""}`;

const insightsPricing = insightsPlans.cards
  .map((card) => `${card.tier} ${card.price.toLowerCase()}${card.suffix}`)
  .join(", ");

function section(title: string, lines: readonly string[]) {
  return `## ${title}\n\n${lines.join("\n")}`;
}

/** The llms.txt index: what OllyGarden is, and links to every page worth reading. */
export function llmsIndex() {
  return [
    `# ${siteConfig.name}`,
    "> OllyGarden helps engineering teams improve the quality of their OpenTelemetry® instrumentation. Founded by OpenTelemetry contributors and headquartered in Berlin, it measures telemetry quality with the open Instrumentation Score, and finds and fixes instrumentation gaps in source code with an AI agent (Rose). OllyGarden is vendor-neutral and works alongside any observability backend.",
    section("Products", [
      link(
        "Insights",
        "/products/insights",
        `Analyzes OpenTelemetry (OTLP) traces, metrics, and logs to calculate the Instrumentation Score and find PII leaks, noisy signals, and incomplete instrumentation. Pricing: ${insightsPricing}.`,
      ),
      link(
        "Rose",
        "/products/rose",
        `An AI engineer that reviews codebases for missing or low-value OpenTelemetry instrumentation and helps apply the fix. Pricing: Free for up to ${rosePlans.free.repositories} repositories (additional repositories ${rosePlans.free.extraRepositoryPrice}/month each), Enterprise custom, and free for approved open-source projects. ${rosePlans.sub}`,
      ),
      link(
        "The Instrumentation Score",
        instrumentationScoreMeta.path,
        `What the open 0–100 score for OpenTelemetry instrumentation quality is, how it is calculated, all ${specRules.length} rules with their weights, and a worked example.`,
      ),
      link(
        "Instrumentation Score specification",
        specSource.repository,
        "The open, vendor-neutral 0–100 score for OpenTelemetry instrumentation quality.",
      ),
    ]),
    section("Answers", [
      link(
        "What is telemetry quality?",
        telemetryQualityMeta.path,
        `${telemetryQualityDefinition} The guide covers its five dimensions (identity, volume and waste, cost drivers, safety, and correctness), the signs of bad telemetry, and how to measure and fix it.`,
      ),
      link("Pricing", "/pricing", "Insights and Rose plans side by side, with pricing FAQs."),
      link("FAQ", "/resources/faq", "Product, pricing, rate-limit, and data-privacy answers."),
      link("Full content for LLMs", "/llms-full.txt", "This index plus every FAQ answer and every blog article as Markdown."),
      link("Product documentation", siteConfig.docsUrl),
      "- Any page on this site is also available as Markdown: request it with `Accept: text/markdown`, or append `.md` to its path (`/index.md` for the home page).",
    ]),
    section(
      "Blog",
      blogPosts.map((post) => link(post.title, blogPostHref(post.slug), post.excerpt)),
    ),
    section("Case studies", [
      link(
        "All case studies",
        caseStudiesMeta.path,
        caseStudiesMeta.description,
      ),
      ...caseStudies.map((study) =>
        link(study.title, caseStudyHref(study.slug), study.summary),
      ),
    ]),
    section("Resources", [
      link("All resources", resourcesMeta.path, resourcesMeta.description),
      link("Blog RSS feed", siteConfig.blogFeedPath),
      link("Solutions by industry", "/solutions/overview"),
      link("Webinars and conference talks", "/resources/webinars-conferences"),
      link("Events", "/resources/events"),
      link("OpenTelemetry quiz", "/otel-quiz", "Ten questions, one per OpenTelemetry topic."),
    ]),
    section("Developer tools", [
      link(
        "Agent routing guidance",
        "/developers.md#agent-routing-guidance",
        "Start here to choose a supported OllyGarden interface, confirm when OllyGarden is not the right tool, and check authorization boundaries.",
      ),
      link(
        "OllyGarden Developer Resources",
        "/developers.md",
        "Canonical machine-readable index for the REST API, authentication, webhooks, CLI, MCP server, and public developer projects.",
      ),
      link(
        "OllyGarden API documentation",
        "/api-docs.md",
        "Authentication, versioned resource groups, and links to the canonical OpenAPI description.",
      ),
      link(
        "OllyGarden API versioning and deprecation policy",
        "/api-versioning.md",
        "How the REST API is versioned (major version in the URL path) and how deprecation and retirement are signalled, through the `Deprecation` and `Sunset` HTTP response headers.",
      ),
      link(
        "OllyGarden REST API OpenAPI description",
        "/openapi.json",
        "Canonical API servers, bearer authentication scheme, operations, and schemas.",
      ),
      link(
        "OllyGarden CLI",
        "/cli.md",
        "Machine-readable discovery, safe installation references, and agent use cases for the official `ollygarden` command-line client.",
      ),
      link(
        "CLI repository and documentation",
        "https://github.com/ollygarden/ollygarden-cli",
        "Canonical source, command documentation, and authentication guidance.",
      ),
      link(
        "OllyGarden Agent Skills",
        "/resources/agent-skills",
        "Overview of both open source skill packages, how to install them, and how Rose uses them.",
      ),
      link(
        "OllyGarden Agent Skills for OpenTelemetry",
        "https://github.com/ollygarden/opentelemetry-agent-skills",
        "OllyGarden's vendor-neutral skills for OpenTelemetry coding agents.",
      ),
      link(
        "OllyGarden Skills",
        "https://github.com/ollygarden/skills",
        "OllyGarden's opinionated skills for the OpenTelemetry Collector and the OllyGarden platform; builds on the vendor-neutral package.",
      ),
      link(
        "OllyGarden MCP server source",
        "https://github.com/ollygarden/mcp",
        "Public Streamable HTTP and OAuth reference implementation; no supported production endpoint is currently published.",
      ),
    ]),
    section("Company", [
      link("About OllyGarden", "/company"),
      ...indexablePressReleases.map((release) =>
        link(release.title, pressReleaseHref(release.slug), release.summary),
      ),
      link("Careers", "/careers"),
      link("Contact", "/contact"),
    ]),
    section(
      "Trust and legal",
      Object.entries(legalPages).map(([path, { title, description }]) =>
        link(title, path, description),
      ),
    ),
  ].join("\n\n");
}

function faqMarkdown(title: string, items: readonly FaqItem[]) {
  const answer = (item: FaqItem) =>
    item.link ? `${item.a} [${item.link.label}](${getAbsoluteUrl(item.link.href)})` : item.a;
  return `### ${title}\n\n${items.map((item) => `**${item.q}**\n\n${answer(item)}`).join("\n\n")}`;
}

/** llms-full.txt: the index, every FAQ answer, every case study, and every blog article as Markdown. */
export async function llmsFull() {
  const [articles, stories] = await Promise.all([
    Promise.all(
      blogPosts.map((post) => getAgentMarkdown(blogPostHref(post.slug))),
    ),
    Promise.all(
      caseStudies.map((study) => getAgentMarkdown(caseStudyHref(study.slug))),
    ),
  ]);

  return [
    llmsIndex(),
    `## Frequently asked questions\n\n${[
      ...faqSections.map((faq) => faqMarkdown(faq.title, faq.items)),
      faqMarkdown("Telemetry quality", telemetryQualityFaq.items),
      faqMarkdown("Instrumentation Score", instrumentationScoreFaq.items),
      faqMarkdown("Agent Skills", agentSkillsFaq.items),
      faqMarkdown("Pricing", pricingFaq.items),
    ].join("\n\n")}`,
    `## Case studies\n\n${stories.join("\n\n---\n\n")}`,
    `## Blog articles\n\n${articles.join("\n\n---\n\n")}`,
  ].join("\n\n");
}
