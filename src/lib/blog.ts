import type { BlogPostCta } from "@/lib/blog-cta";
import type { SeoOverride } from "@/lib/metadata";

export const blogMeta = {
  title: "OllyGarden Blog — Telemetry Quality & Instrumentation",
  description:
    "Practical guides on OpenTelemetry instrumentation, Collector configuration, naming conventions, and telemetry cost from the OllyGarden team.",
  path: "/resources/blog",
} as const;

export const blogHero = {
  badge: "Blog",
  title: "OpenTelemetry and Observability insights from OllyGarden",
} as const;

export const blogAll = {
  eyebrow: "All Blog Posts",
  title: "See all articles from our telemetry experts",
} as const;

export const blogTrending = {
  eyebrow: "Learn More",
  title: "Trending today",
  sub: "Check our posts, videos, and much more in our social media. See our latest videos.",
  cta: "Check Resources",
  ctaHref: "/resources",
} as const;

export const blogPostPage = {
  back: "Back to Blog",
  featuredEyebrow: "Other Posts",
  featuredTitle: "Featured blog posts",
  featuredSub: "Keep up to date with OllyGarden news and insights.",
  featuredCta: "Check Blog",
} as const;

export const blogAuthor = "Juraci Paixão Kröhling";

export const blogAuthorProfile = {
  jobTitle: "Founder and CEO, OllyGarden",
  path: "/company",
  sameAs: ["https://github.com/jpkrohling"],
} as const;

export type BlogAuthor = {
  name: string;
  jobTitle?: string;
  /** Site path or absolute URL of the author's profile. */
  url?: string;
  sameAs?: readonly string[];
  /** The author's company when it is not OllyGarden, as on posts co-written with partners. */
  affiliation?: { name: string; url: string };
};

const defaultBlogAuthor: BlogAuthor = {
  name: blogAuthor,
  jobTitle: blogAuthorProfile.jobTitle,
  url: blogAuthorProfile.path,
  sameAs: blogAuthorProfile.sameAs,
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  seo?: SeoOverride;
  /** Date of the last substantive revision, when the post changed after publishing. */
  updated?: string;
  /** Defaults to the founder; set it for posts written by other people. */
  authors?: readonly BlogAuthor[];
  tags: readonly string[];
  image: string;
  /** The call-to-action bubble placed at the `<!-- cta -->` marker in the article HTML. */
  cta: BlogPostCta;
  ribbon?: "Latest Post" | "Featured";
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "introducing-minimum-viable-instrumentation",
    title: "Introducing Minimum Viable Instrumentation",
    excerpt:
      "Coding agents write the code and AI SRE agents operate it, so telemetry is the source of truth between them. Rose now brings low-volume, high-quality OpenTelemetry instrumentation to every repository.",
    seo: {
      title: "Minimum Viable Instrumentation with OllyGarden Rose",
      description:
        "With coding agents writing code and AI SRE agents running it, wide-net telemetry fails. Rose MVI opens PRs with low-volume, high-quality OpenTelemetry.",
    },
    date: "2026-10-09",
    tags: ["Rose", "Instrumentation", "AI", "OpenTelemetry"],
    image: "/images/blog/introducing-minimum-viable-instrumentation.png",
    cta: {
      kind: "rose",
      title: "Find the services production cannot see",
      body:
        "OllyGarden Rose reviews the instrumentation in your repositories, and with Minimum Viable Instrumentation it also plans, implements, and verifies a baseline where none exists, as a pull request your developers review before anything merges.",
    },
    ribbon: "Latest Post",
  },
  {
    slug: "where-sensitive-data-hides-in-opentelemetry-pipelines",
    title: "Where Sensitive Data Hides in OpenTelemetry Pipelines, and How to Find It",
    excerpt:
      "Trust store passwords in resource attributes, OAuth tokens in query strings, tax IDs in metrics: what we found in real pipelines, why tools cause most of it, and what privacy laws allow.",
    seo: {
      title: "How to Find PII and Secrets in OpenTelemetry Data",
      description:
        "Tax IDs in metrics, passwords in traces, OAuth tokens in URLs: where sensitive data hides in OpenTelemetry pipelines, what GDPR allows, and how to find it.",
    },
    date: "2026-10-03",
    tags: ["Security", "PII", "OpenTelemetry", "Privacy"],
    image: "/images/blog/where-sensitive-data-hides-in-opentelemetry-pipelines.png",
    cta: {
      kind: "insights",
      title: "Ready to discover which sensitive data you are leaking?",
      body:
        "OllyGarden Insights inspects the traces and logs you already send, including resource attributes and URL query strings, and flags suspicious PII leaks per service. Staging data is enough, and the free plan includes PII leakage detection.",
    },
    ribbon: "Featured",
  },
  {
    slug: "observability-for-humans-and-agents-in-the-ai-age",
    title: "Observability for Humans and Agents in the AI Age",
    excerpt:
      "OllyGarden and Bronto on where AI agents help with instrumentation and analysis today, and why they only work when the telemetry is intentional and reachable.",
    date: "2026-09-28",
    authors: [
      { name: "Nicolas Wörner" },
      {
        name: "Severin Neumann",
        affiliation: { name: "Bronto", url: "https://bronto.io" },
      },
    ],
    tags: ["AI", "Instrumentation", "Observability", "OpenTelemetry"],
    image: "/images/blog/observability-for-humans-and-agents-in-the-ai-age.png",
    cta: {
      kind: "rose",
      title: "Put an instrumentation agent on your repos",
      body:
        "OllyGarden Rose connects to your GitHub repositories, reviews code for missing or low-value telemetry, explains each finding, and prepares source-level fixes for your developers to review before anything merges.",
    },
    ribbon: "Featured",
  },
  {
    slug: "opentelemetry-vendor-lock-in-since-2024",
    title: "What's changed about OpenTelemetry vendor lock-in since 2024",
    excerpt:
      "OpenTelemetry still does not make dashboards portable, but agents, CLIs, and MCP servers have made switching observability backends noticeably less painful.",
    date: "2026-08-21",
    tags: ["OpenTelemetry", "Observability", "Vendor Lock-in", "AI"],
    image: "/images/blog/opentelemetry-vendor-lock-in-since-2024.png",
    cta: {
      kind: "insights",
      title: "Check the telemetry your agents will read",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs you already send and flags per-service problems such as noisy signals, high cardinality, and incomplete instrumentation before agents start reasoning over that data.",
    },
    ribbon: "Featured",
  },
  {
    slug: "the-scrape-interval-nobody-chose",
    title: "The Scrape Interval Nobody Chose",
    excerpt:
      "A wrong metric scrape interval inflates ingest, egress, and compute. Learn how to measure DPM and match intervals to the decisions each metric supports.",
    date: "2026-07-31",
    tags: ["Metrics", "OpenTelemetry", "Observability", "Cost"],
    image: "/images/blog/the-scrape-interval-nobody-chose.png",
    cta: {
      kind: "insights",
      title: "Find the metric series worth thinning",
      body:
        "OllyGarden Insights analyzes the metrics your services already send, flags noisy and high-cardinality series per service, and gives each service an Instrumentation Score so you know where to start.",
    },
    ribbon: "Featured",
  },
  {
    slug: "teach-your-coding-agent-opentelemetry",
    title: "Teach Your Coding Agent OpenTelemetry",
    excerpt:
      "We’re releasing our Agent Skills for OpenTelemetry as a mature, open source set: 14 skills that give any coding agent accurate, current OpenTelemetry knowledge.",
    date: "2026-07-14",
    tags: ["OpenTelemetry", "AI Agents", "Open Source"],
    image: "/images/blog/teach-your-coding-agent-opentelemetry.png",
    cta: {
      kind: "rose",
      title: "Add organizational context with Rose",
      body:
        "Rose builds on these skills, reviews the instrumentation in your GitHub repositories for missing or low-value telemetry, and prepares source-level fixes as pull requests or context for your coding agent.",
    },
    ribbon: "Featured",
  },
  {
    slug: "are-collector-exporters-sequential-or-parallel",
    title: "Are OpenTelemetry Collector Exporters Called Sequentially or in Parallel?",
    excerpt:
      'When you configure two exporters in one pipeline, does the Collector send to them in parallel? The honest answer is "sequentially, but it usually doesn\'t matter." The part that does matter changed defaults underneath a lot of advice still floating around.',
    seo: {
      title: "Are Collector Exporters Sequential or Parallel?",
      description:
        "Does the Collector call two exporters in parallel? Sequentially, but it usually doesn't matter. What does matter changed defaults under much older advice.",
    },
    date: "2026-06-29",
    tags: ["Collector", "OpenTelemetry", "Pipelines"],
    image: "/images/blog/are-collector-exporters-sequential-or-parallel.png",
    cta: {
      kind: "skills",
      title: "Give your agent current Collector knowledge",
      body:
        "Our free, open source OpenTelemetry Agent Skills point Claude Code, Cursor, and other coding agents at upstream sources of truth, so their Collector advice reflects current behavior, not outdated defaults.",
    },
  },
  {
    slug: "creating-your-own-collector-distribution-from-tulip",
    title: "Creating Your Own Collector Distribution from OllyGarden Tulip",
    excerpt:
      "Tulip gives you a commercially supported OpenTelemetry Collector with a curated component set. When you need more, you can derive your own distribution while keeping support for the core pipeline. This post walks through how.",
    seo: {
      title: "Build Your Own Collector Distribution from Tulip",
      description:
        "Tulip ships a curated, supported OpenTelemetry Collector. Learn how to derive your own distribution with extra components while keeping support for the core.",
    },
    date: "2026-05-27",
    tags: ["Tulip", "Collector", "OpenTelemetry"],
    image: "/images/blog/creating-your-own-collector-distribution-from-tulip.png",
    cta: {
      kind: "skills",
      title: "Help your coding agent write Collector config",
      body:
        "OllyGarden's free, open source OpenTelemetry Agent Skills give Claude Code, Cursor, and other coding agents current Collector configuration knowledge, so the manifests and pipelines they draft draw on upstream documentation.",
    },
  },
  {
    slug: "decomposing-opentelemetry-collector-configuration",
    title: "Decomposing OpenTelemetry Collector Configuration for Maintainability",
    excerpt:
      "When your collector configuration grows beyond a few hundred lines, you start feeling the friction. This post examines practical strategies for decomposing collector configurations into maintainable, testable units.",
    seo: {
      title: "Decomposing OpenTelemetry Collector Configuration",
      description:
        "Practical strategies for splitting a large OpenTelemetry Collector configuration into maintainable, testable units once it grows past a few hundred lines.",
    },
    date: "2026-05-11",
    tags: ["Collector", "Configuration", "OpenTelemetry"],
    image: "/images/blog/decomposing-opentelemetry-collector-configuration.png",
    cta: {
      kind: "skills",
      title: "Bring Collector expertise to your coding agent",
      body:
        "Our free, open source OpenTelemetry Agent Skills give coding agents like Claude Code and Cursor current Collector configuration knowledge from upstream sources of truth, so they can help you split and validate configurations.",
    },
  },
  {
    slug: "opentelemetry-is-not-hard",
    title: "OpenTelemetry is not hard",
    excerpt:
      "When I asked the community about their pain points with OpenTelemetry, one response kept appearing: 'it's complicated.' I think the framing is wrong.",
    date: "2026-05-04",
    tags: ["OpenTelemetry", "Observability"],
    image: "/images/blog/opentelemetry-is-not-hard.png",
    cta: {
      kind: "skills",
      title: "Let your coding agent pick the right pieces",
      body:
        "OllyGarden's free, open source OpenTelemetry Agent Skills give coding agents current knowledge of SDK setup per language, Collector configuration, and semantic conventions, pointing them at upstream sources of truth.",
    },
  },
  {
    slug: "ollygarden-at-kubecon-eu-2026",
    title: "OllyGarden at KubeCon + CloudNativeCon Europe 2026",
    excerpt:
      "KubeCon + CloudNativeCon Europe 2026 in Amsterdam was a big week for OllyGarden. Our team delivered five recorded talks across Observability Day and the main conference, co-chaired the Observability Day program committee, ran a Prometheus Contribfest session, and announced the general availability of Rose.",
    seo: {
      description:
        "OllyGarden at KubeCon + CloudNativeCon Europe 2026: five recorded talks, co-chairing Observability Day, a Prometheus Contribfest, and Rose GA.",
    },
    date: "2026-04-15",
    tags: ["Events", "Community", "OpenTelemetry"],
    image: "/images/blog/ollygarden-at-kubecon-eu-2026.webp",
    cta: {
      kind: "skills",
      title: "Give your coding agent current OpenTelemetry knowledge",
      body:
        "OllyGarden's free, open source OpenTelemetry Agent Skills give coding agents current guidance on SDK setup, semantic conventions, Collector configuration, and OTTL by pointing them at upstream sources of truth.",
    },
  },
  {
    slug: "when-to-use-each-telemetry-signal-logs-traces-and-metrics",
    title: "When to Use Each Telemetry Signal: Logs, Traces, and Metrics",
    excerpt:
      "Confused about logs, traces, and metrics? Learn when to use each telemetry signal in OpenTelemetry and build a stronger observability strategy.",
    date: "2026-02-17",
    tags: ["Logs", "Traces", "Metrics"],
    image: "/images/blog/when-to-use-each-telemetry-signal-logs-traces-and-metrics.png",
    cta: {
      kind: "rose",
      title: "Check signal choices where they are made",
      body:
        "Rose reviews the instrumentation in your GitHub repositories for missing or low-value logs, spans, and metrics, explains each finding, and prepares source-level fixes your developers can review before merging.",
    },
  },
  {
    slug: "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
    title: "You don't have too much telemetry. You have bad telemetry.",
    excerpt:
      "High observability costs are rarely a volume problem. Learn how to fix bad telemetry at the source before relying on sampling.",
    date: "2026-02-04",
    tags: ["Telemetry", "Cost", "Observability"],
    image: "/images/blog/you-dont-have-too-much-telemetry-you-have-bad-telemetry.png",
    cta: {
      kind: "insights",
      title: "Find the bad telemetry in your own data",
      body:
        "Insights analyzes the OpenTelemetry data you already send and flags noisy signals, broken traces, and high-cardinality attributes per service, so you know what to fix before you reach for sampling.",
    },
  },
  {
    slug: "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
    title: "Reducing Log Volume with the OpenTelemetry Log Deduplication Processor",
    excerpt:
      "Your logs are probably at least 80% repetitive noise. Connection retries, health checks, heartbeat messages: the same log line repeated thousands of times per day.",
    seo: {
      title: "Cut Log Volume with the OpenTelemetry Log Dedup Processor",
      description:
        "Most logs are repetitive noise: retries, health checks, heartbeats. Learn how the Collector's log deduplication processor cuts that volume at the source.",
    },
    date: "2026-01-19",
    tags: ["Logs", "Collector", "Cost"],
    image: "/images/blog/reducing-log-volume-with-the-opentelemetry-log-deduplication-processor.png",
    cta: {
      kind: "insights",
      title: "Find your noisiest log streams first",
      body:
        "OllyGarden Insights analyzes the logs your services already send and flags noisy, repetitive signals per service, so you know where deduplication is worth configuring.",
    },
  },
  {
    slug: "what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges",
    title: "What 10,000 Slack Messages Reveal About OpenTelemetry Adoption Challenges",
    excerpt:
      "We analyzed 10,000 messages from the OpenTelemetry community Slack to find the most common adoption challenges, from Collector config to instrumentation.",
    seo: {
      title: "What 10,000 Slack Messages Reveal About OpenTelemetry",
    },
    date: "2026-01-06",
    tags: ["OpenTelemetry", "Community", "Adoption"],
    image: "/images/blog/what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges.png",
    cta: {
      kind: "skills",
      title: "Give your coding agent current Collector knowledge",
      body:
        "OllyGarden's free, open source OpenTelemetry Agent Skills point your coding agent at upstream sources for Collector configuration, OTTL, SDK setup, and semantic conventions, so it works from current documentation instead of stale training data.",
    },
  },
  {
    slug: "meet-rose-ollygardens-ai-instrumentation-agent",
    title: "Meet Rose: OllyGarden's AI Instrumentation Agent",
    excerpt:
      "Imagine the perfect observability world: There is an incident, the on-call team gets paged in the middle of the night, wakes up and thanks to your telemetry, resolves it fast.",
    seo: {
      description:
        "Meet Rose, OllyGarden's AI agent that reviews the OpenTelemetry instrumentation in your code and helps fix the gaps before an incident exposes them.",
    },
    date: "2025-10-29",
    tags: ["Rose", "AI Agents", "Instrumentation"],
    image: "/images/blog/meet-rose-ollygardens-ai-instrumentation-agent.png",
    cta: {
      kind: "insights",
      title: "Measure the telemetry you already send",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs your services already emit, flagging noisy signals, PII leaks, and incomplete instrumentation for each service before you decide what to instrument by hand.",
    },
  },
  {
    slug: "introducing-tulip-supported-otel-collector",
    title:
      "Introducing OllyGarden Tulip: Our Open-Source Distribution of the OpenTelemetry Collector",
    excerpt:
      "OllyGarden Tulip is a commercially supported OpenTelemetry Collector distribution: stable quarterly releases, LTS every 18 months, open source and free.",
    seo: {
      title: "Introducing Tulip, an OpenTelemetry Collector Distribution",
    },
    date: "2025-10-16",
    tags: ["Tulip", "Collector", "Open Source"],
    image: "/images/blog/introducing-tulip-supported-otel-collector.webp",
    cta: {
      kind: "skills",
      title: "Give your coding agent Collector knowledge",
      body:
        "OllyGarden's free, open source OpenTelemetry Agent Skills give coding agents like Claude Code and Cursor current Collector configuration, OTTL, and SDK setup knowledge, pointing them at upstream sources of truth.",
    },
  },
  {
    slug: "what-deserves-a-span",
    title: "The Variability Principle: How to Decide What Deserves a Span",
    excerpt:
      "Discover how to manage spans effectively using the Variability Principle to improve trace readability and control costs in OpenTelemetry.",
    seo: {
      title: "The Variability Principle: What Deserves a Span",
    },
    date: "2025-10-06",
    tags: ["Traces", "Spans", "OpenTelemetry"],
    image: "/images/blog/what-deserves-a-span.png",
    cta: {
      kind: "rose",
      title: "Catch span explosion in code review",
      body:
        "Rose reviews the code in your GitHub repositories for spans that add noise and operations missing telemetry, explains each finding, and prepares source-level fixes for your developers to review.",
    },
  },
  {
    slug: "how-to-name-your-metrics",
    title: "How to Name Your Metrics",
    excerpt:
      "Learn how to name OpenTelemetry metrics: follow semantic conventions, keep the 'who' in attributes, and apply units and naming patterns that scale.",
    date: "2025-09-09",
    tags: ["Metrics", "Naming", "OpenTelemetry"],
    image: "/images/blog/how-to-name-your-metrics.png",
    cta: {
      kind: "rose",
      title: "Fix metric instrumentation where it lives",
      body:
        "OllyGarden Rose reviews your GitHub repositories for missing or low-value metrics, explains each finding, and prepares source-level fixes for your review, so problems get fixed where the metrics are defined.",
    },
  },
  {
    slug: "how-to-name-your-span-attributes",
    title: "How to Name Your Span Attributes",
    excerpt:
      "A practical guide to naming OpenTelemetry span attributes: when to use semantic conventions, how to namespace custom attributes, and pitfalls to avoid.",
    date: "2025-08-26",
    tags: ["Traces", "Spans", "Naming"],
    image: "/images/blog/how-to-name-your-span-attributes.png",
    cta: {
      kind: "rose",
      title: "Review your span attributes at the source",
      body:
        "OllyGarden Rose connects to your GitHub repositories, reviews spans and attributes in your code for missing or low-value telemetry, explains each finding, and prepares source-level fixes you can review as pull requests.",
    },
  },
  {
    slug: "how-to-name-your-spans",
    title: "How to Name Your Spans",
    excerpt:
      "Good span names make traces readable. Learn the {verb} {object} pattern for naming OpenTelemetry spans and avoid the most common naming mistakes.",
    date: "2025-08-05",
    tags: ["Traces", "Spans", "Naming"],
    image: "/images/blog/how-to-name-your-spans.png",
    cta: {
      kind: "rose",
      title: "Get span naming feedback on your code",
      body:
        "OllyGarden Rose reviews your GitHub repositories for missing or low-value instrumentation, like spans that need better names, explains why, and prepares source-level fixes for your developers to review.",
    },
  },
  {
    slug: "cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry",
    title: "🌱 Cultivating Unique service.instance.id on NGINX Ingress with OpenTelemetry",
    excerpt:
      "The NGINX Ingress Controller has no knob for the OpenTelemetry service.instance.id attribute. Here's how to inject a unique ID per pod with the Helm chart.",
    seo: {
      title: "NGINX Ingress service.instance.id with OpenTelemetry",
    },
    date: "2025-07-31",
    tags: ["Collector", "Kubernetes", "OpenTelemetry"],
    image:
      "/images/blog/cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry.png",
    cta: {
      kind: "insights",
      title: "Check your own traces for gaps like this",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs you already send and flags quality problems per service, such as incomplete instrumentation, before they make a debugging session harder.",
    },
  },
  {
    slug: "introducing-ollygarden",
    title: "Introducing OllyGarden",
    excerpt:
      "OllyGarden comes out of stealth with pre-seed funding to fight bad telemetry: helping teams understand, score, and improve the telemetry they generate.",
    date: "2025-07-09",
    tags: ["Company", "Telemetry", "Observability"],
    image: "/images/blog/introducing-ollygarden.png",
    cta: {
      kind: "rose",
      title: "Fix bad telemetry in the code",
      body:
        "OllyGarden Rose reviews your GitHub repositories for missing or low-value telemetry, explains each finding, and prepares source-level fixes for your review, so noisy or incomplete telemetry gets fixed where it is produced.",
    },
  },
  {
    slug: "instrumentation-score",
    title: "Introducing the Instrumentation Score",
    excerpt:
      "The Instrumentation Score is an open, standardized measure of OpenTelemetry instrumentation quality, scoring OTLP data against best-practice rules.",
    date: "2025-06-11",
    updated: "2026-10-04",
    tags: ["Instrumentation", "OpenTelemetry", "Observability"],
    image: "/images/blog/instrumentation-score.png",
    cta: {
      kind: "insights",
      title: "See your own Instrumentation Score",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs you already send, gives you an Instrumentation Score, and flags the quality problems behind it for each service, from noisy signals to missing ownership.",
    },
  },
  {
    slug: "concrete-applications-of-purposeful-instrumentation",
    title: "Concrete Applications of Purposeful Instrumentation",
    excerpt:
      "From NASA-grade telemetry design to code-level tips: concrete techniques for applying purposeful instrumentation in real-world OpenTelemetry systems.",
    date: "2025-06-04",
    tags: ["Instrumentation", "Observability"],
    image: "/images/blog/concrete-applications-of-purposeful-instrumentation.png",
    cta: {
      kind: "insights",
      title: "See where your own telemetry is noisy",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs you already send and flags noisy signals, PII leaks, and high cardinality per service, so you can see where filtering and redaction would pay off.",
    },
  },
  {
    slug: "purposeful-instrumentation",
    title: "Purposeful Instrumentation",
    excerpt:
      "Purposeful instrumentation means gathering the right telemetry, not all of it. Cut noise, troubleshoot faster, and lower observability costs.",
    date: "2025-05-01",
    tags: ["Instrumentation", "Telemetry", "Cost"],
    image: "/images/blog/purposeful-instrumentation.png",
    cta: {
      kind: "rose",
      title: "Put purpose into every span and metric",
      body:
        "Rose reviews the code in your GitHub repositories for missing or low-value telemetry, explains why each finding matters, and prepares source-level fixes your developers can review.",
    },
  },
  {
    slug: "theres-a-lot-of-bad-telemetry-out-there",
    title: "There's a Lot of Bad Telemetry Out There",
    excerpt:
      "Most telemetry is never queried. Learn what separates good telemetry from bad, what bad data costs you, and how to start improving quality at the source.",
    date: "2025-03-28",
    tags: ["Telemetry", "Observability", "Cost"],
    image: "/images/blog/theres-a-lot-of-bad-telemetry-out-there.jpeg",
    cta: {
      kind: "insights",
      title: "See where your telemetry goes bad",
      body:
        "OllyGarden Insights analyzes the traces, metrics, and logs you already send, flags quality problems like noisy signals, PII leaks, and incomplete instrumentation per service, and scores each with an Instrumentation Score.",
    },
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.ribbon);

export function blogPostAuthors(post: BlogPost): readonly BlogAuthor[] {
  return post.authors ?? [defaultBlogAuthor];
}

const authorList = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

export function blogAuthorNames(post: BlogPost) {
  return authorList.format(blogPostAuthors(post).map((author) => author.name));
}

/** The "Author: …" line shown next to a post's date. */
export function blogAuthorLabel(post: BlogPost) {
  const label = blogPostAuthors(post).length > 1 ? "Authors" : "Author";
  return `${label}: ${blogAuthorNames(post)}`;
}

export const blogVideos = [
  {
    date: "2026-09-02",
    title: "OpenTelemetry Go Compile-time Instrumentation in Practice",
    href: "https://www.youtube.com/live/z4jCyGFhGW4",
    image: "/images/youtube/z4jCyGFhGW4.png",
    alt: "OllyGarden webinar: OpenTelemetry Go Compile-time Instrumentation in Practice",
  },
  {
    date: "2026-07-22",
    title: "'I Know OTel' Giving Expert-Level OTel Knowledge to Your AI Agents",
    href: "https://www.youtube.com/watch?v=ymEyjXBEDRs",
    image: "/images/youtube/ymEyjXBEDRs.jpg",
    alt: "OllyGarden video: 'I Know OTel' — Giving Expert-Level OTel Knowledge to Your AI Agents",
  },
  {
    date: "2026-05-13",
    title: "It's Tulip Season at OllyGarden 🌷",
    href: "https://www.youtube.com/watch?v=S6ERaiIqN-c",
    image: "/images/youtube/S6ERaiIqN-c.jpg",
    alt: "OllyGarden video: It's Tulip Season at OllyGarden",
  },
  {
    date: "2026-04-29",
    title: "Minimum Viable Instrumentation with AI Agents",
    href: "https://www.youtube.com/watch?v=GqXic9ohr8o",
    image: "/images/youtube/GqXic9ohr8o.jpg",
    alt: "OllyGarden video: Minimum Viable Instrumentation with AI Agents",
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);

  if (index < 0) {
    return { prev: undefined, next: undefined };
  }

  return {
    prev: blogPosts[index - 1],
    next: blogPosts[index + 1],
  };
}

const postsPerTag = blogPosts
  .flatMap((post) => post.tags)
  .reduce((counts, tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1), new Map<string, number>());

/** Posts sharing the rarest tags with `slug`; the stable sort keeps ties newest first. */
export function getRelatedPosts(slug: string, count = 3) {
  const tags = new Set(getBlogPost(slug)?.tags);
  // A tag on every post says nothing about the topic, so rarer tags weigh more.
  const score = (post: BlogPost) =>
    post.tags.reduce((sum, tag) => sum + (tags.has(tag) ? 1 / postsPerTag.get(tag)! : 0), 0);

  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count);
}

export function blogCardTags(post: BlogPost) {
  return post.tags.slice(0, 3);
}

export function blogCoverAlt(title: string) {
  return `Cover illustration for “${title}”`;
}

export function blogPostHref(slug: string) {
  return `/resources/blog/${slug}`;
}

export function formatBlogDate(iso: string, style: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en-US", {
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
