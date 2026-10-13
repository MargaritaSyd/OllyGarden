import { blogPostHref, getBlogPost } from "@/lib/blog";
import { caseStudyHref } from "@/lib/case-studies";
import type { FaqContent } from "@/lib/faq";
import { instrumentationScoreMeta } from "@/lib/instrumentation-score";
import { siteConfig } from "@/lib/site";

export const telemetryQualityMeta = {
  title: "What Is Telemetry Quality? Signs of Bad OpenTelemetry Data",
  description:
    "Telemetry quality is how well your OpenTelemetry data helps you run your systems. Learn its five dimensions, the signs of bad telemetry, and how to measure it.",
  path: "/resources/telemetry-quality",
  /** Date of the last substantive revision; the sitemap uses it as lastmod. */
  updated: "2026-10-04",
} as const;

/** The quotable definition: the hero lede, the FAQ, JSON-LD, and llms.txt all use it. */
export const telemetryQualityDefinition =
  "Telemetry quality is how well the traces, metrics, and logs a system emits help people and tools understand it at runtime. Good telemetry belongs to a known service, is worth what it costs to keep, carries no personal data or secrets, and follows the conventions that make it correct to query.";

export const telemetryQualityHero = {
  badge: "Guide",
  title: "What is telemetry quality?",
  lede: telemetryQualityDefinition,
  sub: "Bad telemetry is the opposite: data that costs money to collect and store but does not help anyone operate a system, or that slows an investigation down. This guide covers what makes OpenTelemetry data good, the signs that it is not, and where to start.",
  cta: { label: "Measure your telemetry", href: siteConfig.appUrl },
  score: { label: "How to measure it", href: instrumentationScoreMeta.path },
} as const;

function postLink(slug: string) {
  const post = getBlogPost(slug);
  if (!post) throw new Error(`Unknown blog post ${slug}`);
  return { href: blogPostHref(slug), label: post.title };
}

export const qualityGood = {
  eyebrow: "Good and bad telemetry",
  title: "Quality is alignment, not volume",
  paragraphs: [
    "Good telemetry gives an accurate, relevant, timely, and actionable picture of a system: just enough to find and fix a problem, without the noise that hides it. Bad telemetry is inaccurate, irrelevant, incomplete, stale, or simply too much. It slows investigations, inflates the observability bill, and can turn the telemetry backend into a compliance risk.",
    "Telemetry quality is not a property of a single span or metric. It measures how well what you collect matches what you need right now, so it drifts: a span that helped during development becomes noise once the service is stable, and a new failure mode can leave a well-instrumented service blind. That is why quality has to be measured continuously, per service, instead of audited once.",
    "Most bad telemetry is not written by careless developers. It comes from defaults: auto-instrumentation that records every internal call, a logger configured to print query values, a scrape interval nobody chose. The best way to fix bad telemetry is to fix the instrumentation that produces it.",
  ],
  links: [
    postLink("theres-a-lot-of-bad-telemetry-out-there"),
    postLink("purposeful-instrumentation"),
    postLink("concrete-applications-of-purposeful-instrumentation"),
  ],
} as const;

export type QualityDimension = {
  id: string;
  name: string;
  question: string;
  body: string;
  /** Signs that this dimension is failing; attribute names render as code. */
  signs: readonly string[];
  proof: { value: string; label: string; study: string };
  posts: readonly string[];
};

/** The five dimensions, each with signs, one number from a published case study, and the posts that go deeper. */
const dimensions: readonly QualityDimension[] = [
  {
    id: "identity",
    name: "Identity",
    question: "Can every signal be traced to the service and team that produced it?",
    body: "Telemetry without an owner cannot be debugged, filtered, or charged back. The OpenTelemetry semantic conventions make `service.name` required, and `deployment.environment.name` and `service.instance.id` tell production from staging and one replica from another. Tracer defaults are the common failure: a process that reports as `unknown_service` or a library default looks like a real service in every dashboard.",
    signs: [
      "`service.name` missing, or set to a default such as `unknown_service`",
      "No `deployment.environment.name`, so staging and production share views",
      "No `service.instance.id`, or one shared by several pods",
    ],
    proof: {
      value: "45%",
      label: "of all spans at a 500-service enterprise platform came from one worker reporting under its tracer's default name, cli.",
      study: "enterprise-platform-half-the-spans-had-no-name",
    },
    posts: ["cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry"],
  },
  {
    id: "volume",
    name: "Volume and waste",
    question: "Does each record add information that the ones before it did not?",
    body: "Most telemetry waste is repetition. Health and readiness checks produce millions of single-span traces that only confirm a service is up. Debug logs enabled during an incident stay on. The same log line repeats thousands of times a day, and access logs record per-request detail that request, error, and latency metrics carry more cheaply.",
    signs: [
      "Exact duplicate log records, or logs that reduce to a handful of patterns",
      "Traces from health checks, liveness probes, and pings",
      "Debug logs in production",
      "Dozens of internal spans shorter than a few milliseconds in one trace",
    ],
    proof: {
      value: "32%",
      label: "of log records at the same platform were exact duplicates, and about a third were HTTP access logs.",
      study: "enterprise-platform-half-the-spans-had-no-name",
    },
    posts: [
      "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
      "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
      "what-deserves-a-span",
    ],
  },
  {
    id: "cost",
    name: "Cost drivers",
    question: "Is each series worth what it costs to send, store, and query?",
    body: "Metric cost grows with the number of time series and how often each one reports. An unbounded attribute, such as a user ID or a raw URL path, multiplies series with every new value. A scrape or export interval that nobody chose can send a value six times a minute when it changes once an hour, and static series that never change still cost a datapoint each time.",
    signs: [
      "Metric attributes with user IDs, request IDs, or literal URL paths",
      "Series whose value never changes",
      "Scrape intervals set by a chart default rather than by the decisions a metric supports",
      "Infrastructure metrics collected twice by different agents",
    ],
    proof: {
      value: "25%",
      label: "fewer metric datapoints, and 24% fewer log records, at a B2B SaaS platform after fixes in its own Collector pipelines.",
      study: "b2b-saas-cuts-logs-and-metrics-at-the-source",
    },
    posts: ["the-scrape-interval-nobody-chose", "how-to-name-your-metrics"],
  },
  {
    id: "safety",
    name: "Safety",
    question: "Is the telemetry free of personal data and secrets?",
    body: "Spans, logs, and metrics capture query text, URLs, headers, and command-line arguments, which is where personal data and credentials leak. Observability backends usually give more people access than production databases do, so a leak there is a compliance problem. Most leaks come from tool configuration, such as an ORM that logs every query with its values, rather than from individual developers.",
    signs: [
      "Email addresses, names, or phone numbers in log bodies or span attributes",
      "Tokens in `url.query` or in recorded `Authorization` headers",
      "Passwords in `process.command_line` or other resource attributes",
      "Personal data copied into metric labels",
    ],
    proof: {
      value: "1 in 6",
      label: "services at a digital-health platform logged personal data, most of it from one shared ORM logging setting.",
      study: "digital-health-pii-leak-was-a-logger-setting",
    },
    posts: ["where-sensitive-data-hides-in-opentelemetry-pipelines"],
  },
  {
    id: "correctness",
    name: "Correctness",
    question: "Does the data mean what queries, dashboards, and alerts assume it means?",
    body: "Telemetry can be complete and still wrong. Span names with IDs defeat grouping, metrics without units cannot be read, and attributes outside the semantic conventions break queries that look where the conventions say they live. When context propagation breaks, spans arrive without their parents and a trace stops at a service boundary. When a log bridge drops the level, every record looks the same.",
    signs: [
      "Span names with IDs, literal URLs, or other unbounded values",
      "Metrics without units, or the same name with different units",
      "Orphan spans and traces that never cross a service boundary",
      "Logs with no severity, or one level spelled several ways",
    ],
    proof: {
      value: "100%",
      label: "of log records at the digital-health platform arrived with no severity, because the log bridge dropped the level.",
      study: "digital-health-pii-leak-was-a-logger-setting",
    },
    posts: ["how-to-name-your-spans", "how-to-name-your-span-attributes"],
  },
];

export const qualityDimensions = {
  eyebrow: "The dimensions",
  title: "Five dimensions of telemetry quality",
  lede: "Each dimension asks one question of your telemetry. A failure in any of them makes the data slower to use, more expensive to keep, or risky to store. Every number below comes from an anonymized OllyGarden case study, measured on a customer's own telemetry.",
  signsTitle: "Signs of bad telemetry",
  caseStudiesLink: "Read the case studies",
  caseStudiesHref: "/resources/case-studies",
  items: dimensions.map((dimension) => ({
    ...dimension,
    proofHref: caseStudyHref(dimension.proof.study),
    links: dimension.posts.map(postLink),
  })),
} as const;

export const qualityNext = {
  eyebrow: "Measure and fix",
  title: "How to measure telemetry quality, and how to fix it",
  lede: "Quality improves when it is measured per service and fixed where the telemetry is produced. The Collector is a safety net for what cannot be fixed at the source, not the primary mechanism.",
  measure: {
    title: "Measure it",
    body: "The Instrumentation Score is an open, vendor-neutral 0–100 score that checks the telemetry a service already sends against weighted rules for identity, waste, cost, safety, and correctness. OllyGarden Insights computes it continuously for every service and shows the findings behind it.",
    links: [
      { href: instrumentationScoreMeta.path, label: "How the Instrumentation Score works" },
      { href: "/products/insights", label: "Measure it with Insights" },
    ],
  },
  fix: {
    title: "Fix it",
    body: "Fix instrumentation in the code that produces it: OllyGarden Rose reviews your repositories and prepares source-level fixes. For legacy and third-party services, filter, deduplicate, and redact in the OpenTelemetry Collector, then sample what is left with intention.",
    links: [
      { href: "/products/rose", label: "Fix it at the source with Rose" },
      postLink("reducing-log-volume-with-the-opentelemetry-log-deduplication-processor"),
      postLink("decomposing-opentelemetry-collector-configuration"),
    ],
  },
} as const;

export const telemetryQualityFaq = {
  title: "Frequently Asked Questions",
  sub: "What teams ask us about telemetry quality, bad telemetry, and where to begin.",
  items: [
    {
      q: "What is telemetry quality?",
      a: telemetryQualityDefinition,
    },
    {
      q: "What is bad telemetry?",
      a: "Bad telemetry is data that costs money to collect and store but does not help anyone understand or operate a system, or that gets in the way: telemetry without a service name, duplicated or excessive logs, health-check traces, high-cardinality metrics, broken traces, and personal data or secrets that should never have been recorded.",
    },
    {
      q: "Isn't telemetry quality just data quality?",
      a: "It is a kind of data quality, but generic data quality checks validate schemas, freshness, and volumes in a warehouse. Telemetry quality is judged against how the data is used at runtime and against the OpenTelemetry semantic conventions: whether a span can be attributed to its service, whether a trace survives a service boundary, whether a metric's cardinality is bounded, and whether a log carries a password. Its root cause is usually instrumentation code or configuration, so that is where it gets fixed.",
    },
    {
      q: "Does sampling fix bad telemetry?",
      a: "No. Sampling cuts useful and useless data at the same rate, so sampling bad telemetry gives you a smaller pile of bad telemetry, and it can discard the traces you need in the next incident. It does nothing for missing service names, personal data, or high-cardinality metrics. Remove the waste at the source first; then sampling becomes an intentional trade-off on data that is worth keeping, and is often less necessary.",
    },
    {
      q: "Is telemetry quality the same as observability cost optimization?",
      a: "No, although better telemetry usually costs less. Cost optimization asks how to pay less for the data you have. Telemetry quality asks whether that data is worth having, which also covers problems that do not show on the bill, such as personal data in logs, broken traces, and services nobody can identify. Sometimes the right fix adds telemetry: a few more attributes can turn a metric nobody uses into one that answers a real question.",
    },
    {
      q: "Where should we start improving telemetry quality?",
      a: "Start with identity: give every process a real service.name and a deployment environment, because nothing else can be attributed without them. Then find the few services and messages that produce most of your volume, ask when each last helped resolve an incident, and fix the worst offenders at the source. Check for personal data and secrets early, since one shared setting can leak them from many services at once.",
    },
    {
      q: "Should bad telemetry be fixed in the Collector or in the application?",
      a: "In the application, when you can. By the time data reaches the Collector it has already been created, serialized, and sent over the network. The Collector is the right place for services you cannot change, such as legacy and third-party software, and as a safety net: the filter processor drops noise, the transform processor written in the OpenTelemetry Transformation Language (OTTL) fixes attributes and redacts values, and the log deduplication processor collapses repeats.",
    },
    {
      q: "How do I measure telemetry quality?",
      a: "Use the Instrumentation Score, an open 0–100 score that checks the telemetry each service already sends against weighted rules, so the same data gets the same score in any tool. You can implement the open specification yourself, or use OllyGarden Insights, which computes it continuously for every service on its Free plan.",
      link: { href: instrumentationScoreMeta.path, label: "How the Instrumentation Score works" },
    },
  ],
} as const satisfies FaqContent;

export const telemetryQualityCta = {
  title: ["See the quality of", "your telemetry"],
  titleAccent: "your telemetry",
  sub: "Send a sample of your OpenTelemetry data to Insights and see, per service, where identity, waste, cost, safety, and correctness break down.",
  primary: { label: "Get Started", href: siteConfig.appUrl },
  secondary: { label: "Book a Demo", href: "/contact" },
} as const;
