export const blogMeta = {
  title: "Blog — OllyGarden",
  path: "/resources/blog",
} as const;

export const blogHero = {
  badge: "Blog",
  title: "OllyGarden News",
  lede: "OpenTelemetry and observability insights from OllyGarden.",
} as const;

export const blogAll = {
  eyebrow: "All Posts",
  title: "Keep up to date with the news",
  sub: "See all articles and posts from our telemetry experts.",
} as const;

export const blogTrending = {
  eyebrow: "Learn More",
  title: "Trending today",
  sub: "Check our posts, videos, and much more in our social media. See our latest videos.",
  cta: "Check Resources",
  ctaHref: "/resources",
} as const;

export const blogAuthor = "Juraci Paixão Kröhling";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: readonly string[];
  featuredTags?: readonly string[];
  image: string;
  ribbon?: "Latest Post" | "Featured";
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "the-scrape-interval-nobody-chose",
    title: "The Scrape Interval Nobody Chose",
    excerpt:
      "A wrong metric scrape interval inflates ingest, egress, and compute. Learn how to measure DPM and match intervals to the decisions each metric supports.",
    date: "2026-07-31",
    tags: ["Metrics", "OpenTelemetry", "Observability"],
    featuredTags: ["Metrics", "OpenTelemetry", "Observability", "Cost"],
    image: "/images/blog/the-scrape-interval-nobody-chose.png",
    ribbon: "Latest Post",
  },
  {
    slug: "teach-your-coding-agent-opentelemetry",
    title: "Teach Your Coding Agent OpenTelemetry",
    excerpt:
      "We are releasing our OpenTelemetry Agent Skills as a mature, open source set: 14 skills that give any coding agent accurate, current OpenTelemetry knowledge.",
    date: "2026-07-14",
    tags: ["OpenTelemetry", "AI Agents", "Open Source"],
    image: "/images/blog/teach-your-coding-agent-opentelemetry.png",
    ribbon: "Featured",
  },
  {
    slug: "are-collector-exporters-sequential-or-parallel",
    title: "Are OpenTelemetry Collector Exporters Called Sequentially or in Parallel?",
    excerpt:
      'When you configure two exporters in one pipeline, does the Collector send to them in parallel? The honest answer is "sequentially, but it usually doesn\'t matter." The part that does matter changed defaults underneath a lot of advice still floating around.',
    date: "2026-06-29",
    tags: ["Collector", "OpenTelemetry", "Pipelines"],
    image: "/images/blog/are-collector-exporters-sequential-or-parallel.png",
    ribbon: "Featured",
  },
  {
    slug: "creating-your-own-collector-distribution-from-tulip",
    title: "Creating Your Own Collector Distribution from OllyGarden Tulip",
    excerpt:
      "Tulip gives you a commercially supported OpenTelemetry Collector with a curated component set. When you need more, you can derive your own distribution while keeping support for the core pipeline. This post walks through how.",
    date: "2026-05-27",
    tags: ["Tulip", "Collector", "OpenTelemetry"],
    image: "/images/blog/creating-your-own-collector-distribution-from-tulip.png",
  },
  {
    slug: "decomposing-opentelemetry-collector-configuration",
    title: "Decomposing OpenTelemetry Collector Configuration for Maintainability",
    excerpt:
      "When your collector configuration grows beyond a few hundred lines, you start feeling the friction. This post examines practical strategies for decomposing collector configurations into maintainable, testable units.",
    date: "2026-05-11",
    tags: ["Collector", "Configuration", "OpenTelemetry"],
    image: "/images/blog/decomposing-opentelemetry-collector-configuration.png",
  },
  {
    slug: "opentelemetry-is-not-hard",
    title: "OpenTelemetry is not hard",
    excerpt:
      "When I asked the community about their pain points with OpenTelemetry, one response kept appearing: 'it's complicated.' I think the framing is wrong.",
    date: "2026-05-04",
    tags: ["OpenTelemetry", "Observability"],
    image: "/images/blog/opentelemetry-is-not-hard.png",
  },
  {
    slug: "ollygarden-at-kubecon-eu-2026",
    title: "OllyGarden at KubeCon EU 2026",
    excerpt:
      "KubeCon EU 2026 in Amsterdam was a big week for OllyGarden. Our team delivered five recorded talks across Observability Day and the main conference, co-chaired the Observability Day program committee, ran a Prometheus Contribfest session, and announced the general availability of Rose.",
    date: "2026-04-15",
    tags: ["Events", "Community", "OpenTelemetry"],
    image: "/images/blog/ollygarden-at-kubecon-eu-2026.webp",
  },
  {
    slug: "when-to-use-each-telemetry-signal-logs-traces-and-metrics",
    title: "When to Use Each Telemetry Signal: Logs, Traces, and Metrics",
    excerpt:
      "Confused about logs, traces, and metrics? Learn when to use each telemetry signal in OpenTelemetry and build a stronger observability strategy.",
    date: "2026-02-17",
    tags: ["Logs", "Traces", "Metrics"],
    image: "/images/blog/when-to-use-each-telemetry-signal-logs-traces-and-metrics.png",
  },
  {
    slug: "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
    title: "You don't have too much telemetry. You have bad telemetry.",
    excerpt:
      "High observability costs are rarely a volume problem. Learn how to fix bad telemetry at the source before relying on sampling.",
    date: "2026-02-04",
    tags: ["Telemetry", "Cost", "Observability"],
    image: "/images/blog/you-dont-have-too-much-telemetry-you-have-bad-telemetry.png",
  },
  {
    slug: "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
    title: "Reducing Log Volume with the OpenTelemetry Log Deduplication Processor",
    excerpt:
      "Your logs are probably at least 80% repetitive noise. Connection retries, health checks, heartbeat messages: the same log line repeated thousands of times per day.",
    date: "2026-01-19",
    tags: ["Logs", "Collector", "Cost"],
    image: "/images/blog/reducing-log-volume-with-the-opentelemetry-log-deduplication-processor.png",
  },
  {
    slug: "what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges",
    title: "What 10,000 Slack Messages Reveal About OpenTelemetry Adoption Challenges",
    excerpt:
      "We analyzed 10,000 messages from the OpenTelemetry community Slack to find the most common adoption challenges, from Collector config to instrumentation.",
    date: "2026-01-06",
    tags: ["OpenTelemetry", "Community", "Adoption"],
    image: "/images/blog/what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges.png",
  },
  {
    slug: "meet-rose-ollygardens-ai-instrumentation-agent",
    title: "Meet Rose: OllyGarden's AI Instrumentation Agent",
    excerpt:
      "Imagine the perfect observability world: There is an incident, the on-call team gets paged in the middle of the night, wakes up and thanks to your telemetry, resolves it fast.",
    date: "2025-10-29",
    tags: ["Rose", "AI Agents", "Instrumentation"],
    image: "/images/blog/meet-rose-ollygardens-ai-instrumentation-agent.png",
  },
  {
    slug: "introducing-tulip-supported-otel-collector",
    title:
      "Introducing OllyGarden Tulip: Our Open-Source Distribution of the OpenTelemetry Collector",
    excerpt:
      "OllyGarden Tulip is a commercially supported OpenTelemetry Collector distribution: stable quarterly releases, LTS every 18 months, open source and free.",
    date: "2025-10-16",
    tags: ["Tulip", "Collector", "Open Source"],
    image: "/images/blog/introducing-tulip-supported-otel-collector.webp",
  },
  {
    slug: "what-deserves-a-span",
    title: "The Variability Principle: How to Decide What Deserves a Span",
    excerpt:
      "Discover how to manage spans effectively using the Variability Principle to improve trace readability and control costs in OpenTelemetry.",
    date: "2025-10-06",
    tags: ["Traces", "Spans", "OpenTelemetry"],
    image: "/images/blog/what-deserves-a-span.png",
  },
  {
    slug: "how-to-name-your-metrics",
    title: "How to Name Your Metrics",
    excerpt:
      "Learn how to name OpenTelemetry metrics: follow semantic conventions, keep the 'who' in attributes, and apply units and naming patterns that scale.",
    date: "2025-09-09",
    tags: ["Metrics", "Naming", "OpenTelemetry"],
    image: "/images/blog/how-to-name-your-metrics.png",
  },
  {
    slug: "how-to-name-your-span-attributes",
    title: "How to Name Your Span Attributes",
    excerpt:
      "A practical guide to naming OpenTelemetry span attributes: when to use semantic conventions, how to namespace custom attributes, and pitfalls to avoid.",
    date: "2025-08-26",
    tags: ["Traces", "Spans", "Naming"],
    image: "/images/blog/how-to-name-your-span-attributes.png",
  },
  {
    slug: "how-to-name-your-spans",
    title: "How to Name Your Spans",
    excerpt:
      "Good span names make traces readable. Learn the {verb} {object} pattern for naming OpenTelemetry spans and avoid the most common naming mistakes.",
    date: "2025-08-05",
    tags: ["Traces", "Spans", "Naming"],
    image: "/images/blog/how-to-name-your-spans.png",
  },
  {
    slug: "cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry",
    title: "🌱 Cultivating Unique service.instance.id on NGINX Ingress with OpenTelemetry",
    excerpt:
      "The NGINX Ingress Controller doesn't expose OpenTelemetry's service.instance.id knobs. Here's how to inject a unique ID per pod using the Helm chart.",
    date: "2025-07-31",
    tags: ["Collector", "Kubernetes", "OpenTelemetry"],
    image:
      "/images/blog/cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry.png",
  },
  {
    slug: "introducing-ollygarden",
    title: "Introducing OllyGarden",
    excerpt:
      "OllyGarden comes out of stealth with pre-seed funding to fight bad telemetry: helping teams understand, score, and improve the telemetry they generate.",
    date: "2025-07-09",
    tags: ["Company", "Telemetry", "Observability"],
    image: "/images/blog/introducing-ollygarden.png",
  },
  {
    slug: "instrumentation-score",
    title: "Introducing the Instrumentation Score",
    excerpt:
      "The Instrumentation Score is an open, standardized measure of OpenTelemetry instrumentation quality, scoring OTLP data against best-practice rules.",
    date: "2025-06-11",
    tags: ["Instrumentation", "OpenTelemetry", "Observability"],
    image: "/images/blog/instrumentation-score.png",
  },
  {
    slug: "concrete-applications-of-purposeful-instrumentation",
    title: "Concrete Applications of Purposeful Instrumentation",
    excerpt:
      "From NASA-grade telemetry design to code-level tips: concrete techniques for applying purposeful instrumentation in real-world OpenTelemetry systems.",
    date: "2025-06-04",
    tags: ["Instrumentation", "Observability"],
    image: "/images/blog/concrete-applications-of-purposeful-instrumentation.png",
  },
  {
    slug: "purposeful-instrumentation",
    title: "Purposeful Instrumentation",
    excerpt:
      "Purposeful instrumentation means gathering the right telemetry, not all of it. Cut noise, troubleshoot faster, and lower observability costs.",
    date: "2025-05-01",
    tags: ["Instrumentation", "Telemetry", "Cost"],
    image: "/images/blog/purposeful-instrumentation.png",
  },
  {
    slug: "theres-a-lot-of-bad-telemetry-out-there",
    title: "There's a Lot of Bad Telemetry Out There",
    excerpt:
      "Most telemetry is never queried. Learn what separates good telemetry from bad, what bad data costs you, and how to start improving quality at the source.",
    date: "2025-03-28",
    tags: ["Telemetry", "Observability", "Cost"],
    image: "/images/blog/theres-a-lot-of-bad-telemetry-out-there.jpeg",
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.ribbon);

export const blogVideos = [
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
