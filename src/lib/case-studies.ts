import type { SeoOverride } from "@/lib/metadata";
import type { ProductHref } from "@/lib/nav";

export const caseStudiesMeta = {
  title: "OllyGarden Case Studies: Real Telemetry Quality Results",
  description:
    "Anonymized but real OllyGarden customer stories: what bad telemetry we found, what changed at the source, and the numbers that moved.",
  path: "/resources/case-studies",
} as const;

export const caseStudiesHero = {
  badge: "OllyGarden Case Studies",
  title: "Real teams, real telemetry",
  lede: "Stories from our customer work, told with the numbers: what we found in their OpenTelemetry data, what changed at the source, and what is still left to do. Every story is anonymized and every story is real.",
} as const;

export const caseStudiesPromise = {
  title: "How we write these stories",
  items: [
    "Every story comes from a real OllyGarden engagement. We remove the customer's name, people, products, and anything else that could identify them, and round numbers that could.",
    "Numbers come from the telemetry samples and measurements we took during the work, reported as ratios. We say how each one was measured and what it does not claim.",
    "We include what did not go well and what is still open, not only the wins.",
  ],
} as const;

/** Points readers of the case studies at the guide that names what the stories measure. */
export const caseStudyGuide = {
  text: "The findings in these stories fall into five dimensions of telemetry quality: identity, volume and waste, cost drivers, safety, and correctness.",
  link: "What is telemetry quality?",
  href: "/resources/telemetry-quality",
} as const;

export const caseStudyPage = {
  back: "All case studies",
  glance: "At a glance",
  listen: "Listen to the story",
  transcript: "Read the transcript",
  method: "About these numbers",
  related: "Keep reading",
} as const;

export const anonymizedNotice = {
  label: "Anonymized, but real",
  text: "This story comes from a real OllyGarden customer engagement. To protect the customer, we removed their name, people, products, and anything else that could identify them, and rounded some numbers. Everything else happened as described.",
} as const;

export const caseStudyCta = {
  title: ["Want a story like this", "for your telemetry?"],
  sub: "Send us a sample and we will show you where your volume, cost, and risk really come from.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
  secondary: { label: "See OllyGarden Insights", href: "/products/insights" },
} as const;

/** Industries with a solution page; a story whose `industry` matches one appears on that page. */
export const solutionIndustries = {
  financial: "Financial services",
  retail: "Retail & e-commerce",
  enterprise: "Enterprise software",
} as const;

export type CaseStudyStat = {
  value: string;
  label: string;
  detail: string;
};

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudyBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; quote: string; attribution: string }
  | { type: "list"; items: readonly string[] }
  | { type: "callout"; title: string; text: string };

export type CaseStudyAudio = {
  /** Public path of the MP3 rendered from the script in `content/case-studies/<slug>.txt`. */
  src: string;
  /** ISO 8601 duration of the rendered file. */
  duration: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short title for cards, menus, and breadcrumbs. */
  shortTitle: string;
  dek: string;
  summary: string;
  date: string;
  industry: string;
  region: string;
  /** Product pages the story links to, and that list it among their case studies. */
  products: readonly ProductHref[];
  /** Blog post slugs that continue the story. */
  relatedPosts: readonly string[];
  seo?: SeoOverride;
  facts: readonly CaseStudyFact[];
  stats: readonly CaseStudyStat[];
  audio?: CaseStudyAudio;
  body: readonly CaseStudyBlock[];
  method: string;
};

/** Introduces the OTel Drops episode on every case study that has one. */
export const caseStudyAudioIntro =
  "Bianca and Florian, who you might know from the OTel Drops podcast, tell this story in a short conversation. The voices are AI-generated; the facts are the ones on this page.";

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "enterprise-platform-half-the-spans-had-no-name",
    title:
      "Nearly half the spans came from a service called cli: what we found at a 500-service enterprise platform",
    shortTitle: "An enterprise platform: nearly half the spans had no name",
    dek: "OllyGarden Insights looked at staging OpenTelemetry data from about 500 services at a large enterprise software company. One unnamed worker made 45% of all spans, and most logs were repeats.",
    summary:
      "One background worker named cli made 45% of all spans, a third of logs were exact duplicates, a third were access logs, and the Collector shipped its own logs again.",
    date: "2026-10-03",
    industry: solutionIndustries.enterprise,
    region: "North America",
    products: ["/products/insights"],
    relatedPosts: [
      "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
      "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
    ],
    seo: {
      title: "OllyGarden Case Study: Nearly Half the Spans Had No Name",
      description:
        "Staging telemetry from about 500 services: one unnamed worker made 45% of spans, a third of logs were duplicates, and the Collector re-shipped its own logs.",
    },
    facts: [
      { label: "Company", value: "Large enterprise software company" },
      { label: "Region", value: "North America" },
      {
        label: "Stack",
        value:
          "Multi-region internal Kubernetes platform; mostly Java, plus Python, Node.js, and PHP; an in-house OpenTelemetry Collector fed by OpenTelemetry SDKs and a vendor tracer",
      },
      { label: "Scale", value: "About 500 services" },
      { label: "OllyGarden", value: "Insights" },
      { label: "Timeline", value: "September 2026" },
    ],
    stats: [
      {
        value: "45%",
        label: "of all spans came from one unnamed worker",
        detail: "Reported as cli",
      },
      {
        value: "32%",
        label: "of log records were exact duplicates",
        detail: "About 60% reducible to patterns",
      },
      {
        value: "4.5%",
        label: "of logs were the Collector re-shipping its own output",
        detail: "Every week",
      },
      {
        value: "9%",
        label: "of services set a deployment environment",
        detail: "Across about 500 services",
      },
    ],
    audio: {
      src: "/audio/case-studies/enterprise-platform-half-the-spans-had-no-name.mp3",
      duration: "PT3M33S",
    },
    body: [
      {
        type: "lead",
        text: "Across about 500 services at a large enterprise software company, one background worker with a default name produced 45% of all spans, a third of the log records were exact duplicates, and the Collector was logging its own exports and shipping them again.",
      },
      { type: "h2", text: "The setup" },
      {
        type: "p",
        text: "The company runs a polyglot fleet, mostly Java with Python, Node.js, and PHP, on a multi-region internal Kubernetes platform. Telemetry flows through an in-house Collector, from a mix of OpenTelemetry SDKs and a vendor tracer. A central team pays for all of it, with no chargeback to the teams that produce it.",
      },
      {
        type: "p",
        text: "OllyGarden Insights analyzed the platform's staging telemetry in September 2026. This story covers what it showed.",
      },
      { type: "h2", text: "The biggest producer had no name" },
      {
        type: "p",
        text: "45% of all spans came from a single PHP background worker running on two clusters. It reported under its tracer's default service name, cli. The biggest trace producer in the fleet had no real identity, so the telemetry could not say who owned it.",
      },
      {
        type: "p",
        text: "Its traces also showed why it was so busy. Each queued message produced about 14 spans: a new database connection for every message, about six cache loads, and about four queries. Reusing connections would cut both latency and span volume.",
      },
      {
        type: "p",
        text: "Span volume was concentrated in a few places. 5 services on a vendor tracer produced 47% of all spans, while 343 services on OpenTelemetry SDKs produced 38%.",
      },
      { type: "h2", text: "Most logs were repeats" },
      {
        type: "list",
        items: [
          "32% of log records were exact duplicates, and about 60% were reducible once IDs and numbers were normalized into patterns.",
          "About a third of logs were HTTP access logs. One service's ingress-request logs alone were 16.5% of all logs. Request rate, errors, and latency by route are better kept as metrics.",
          "13% of logs were health, readiness, or ping checks.",
          "Stored-procedure timing messages, \"executed in N ms\", were metrics written as logs.",
        ],
      },
      { type: "h2", text: "A Collector shipping its own logs" },
      {
        type: "p",
        text: "Every week, 4.5% of all logs were the Collector printing log records it had already shipped, which were then collected and shipped again. That loop grows with traffic: the more the Collector exports, the more it logs.",
      },
      {
        type: "callout",
        title: "Is your Collector shipping its own logs twice?",
        text: "Check what your Collector writes to its own logs, and whether your log collection picks that output up again.",
      },
      { type: "h2", text: "Logs nobody could attribute" },
      {
        type: "p",
        text: "26% of log records had no service name, so they could not be attributed to a team or charged back. 43% of log bodies were unparsed JSON, 16% carried no severity, and INFO was spelled three different ways.",
      },
      {
        type: "p",
        text: "Pattern detectors also matched a bearer-token format in about 17% of log records across 3 services, and email addresses in a few hundred records across 3 services. These are unverified pattern matches: the values were not inspected, and a human review has to confirm them.",
      },
      { type: "h2", text: "Traces and metadata" },
      {
        type: "list",
        items: [
          "35% of traces were single-span, and only about 5% crossed a service boundary. The largest trace held about 11,600 spans.",
          "Only 9% of services set a deployment environment, and 56% set service.instance.id.",
          "kubelet and kube-state-metrics produced 48% of metric datapoints, data that cluster monitoring already collects.",
        ],
      },
      { type: "h2", text: "What to check in your own telemetry" },
      {
        type: "list",
        items: [
          "Give every process a real service name. Tracer defaults like cli hide your biggest producers.",
          "Look at the per-message work in background workers. A new database connection per message costs latency and spans.",
          "Turn access logs into request, error, and latency metrics.",
          "Check whether your Collector's own logs are collected and shipped again.",
        ],
      },
    ],
    method:
      "All numbers come from short staging samples taken weekly in September 2026 and are reported as ratios. Sensitive-data matches are unverified pattern matches.",
  },
  {
    slug: "digital-health-pii-leak-was-a-logger-setting",
    title:
      "The PII leak was a logger setting, not a developer problem: what we found at a European digital-health platform",
    shortTitle: "A digital-health platform: the PII leak was a logger setting",
    dek: "OllyGarden Insights and Rose looked at staging OpenTelemetry data and code from a European digital-health platform. Most of the personal data in its logs came from one shared ORM setting.",
    summary:
      "Personal data in 1 in 6 services traced to one ORM logging setting, logs with no severity at all, one worker writing most of the logs, and auth tokens Rose found in a day.",
    date: "2026-10-03",
    industry: "Digital health",
    region: "Europe",
    products: ["/products/insights", "/products/rose"],
    relatedPosts: [
      "where-sensitive-data-hides-in-opentelemetry-pipelines",
      "teach-your-coding-agent-opentelemetry",
    ],
    seo: {
      title: "OllyGarden Case Study: PII Leak From One Logger Setting",
      description:
        "Staging telemetry from a European digital-health platform traced personal data in logs to one ORM setting, and found logs with no severity and tokens in logs.",
    },
    facts: [
      {
        label: "Company",
        value: "Small-to-mid-size digital-health platform with a small engineering team",
      },
      { label: "Region", value: "Europe" },
      {
        label: "Stack",
        value:
          "Node.js and TypeScript microservices with shared OpenTelemetry auto-instrumentation, a self-hosted open-source observability stack",
      },
      {
        label: "Scale",
        value:
          "50 to 120 services; in staging, about 15 million log records and 28 million metric datapoints a day",
      },
      {
        label: "OllyGarden",
        value: "Insights, with weekly written assessments, and Rose reviewing the code",
      },
      { label: "Timeline", value: "April to June 2026" },
    ],
    stats: [
      {
        value: "17%",
        label: "of services flagged for personal data in week one",
        detail: "12 of about 70",
      },
      {
        value: "100k",
        label: "log lines a week with personal data, from one service",
        detail: "One ORM logging setting",
      },
      { value: "100%", label: "of logs arrived with no severity", detail: "In every sample" },
      {
        value: "1 day",
        label: "for Rose to find auth tokens in logs",
        detail: "Confirmed by the customer",
      },
    ],
    audio: {
      src: "/audio/case-studies/digital-health-pii-leak-was-a-logger-setting.mp3",
      duration: "PT3M56S",
    },
    body: [
      {
        type: "lead",
        text: "A European digital-health platform knew personal data might be in its logs, but not where it came from. Five weekly staging samples and a code review later, the answer was mostly a single shared setting: an ORM configured to log every SQL query with its values. On one service, that came to about 100,000 log lines a week carrying clinicians' personal data.",
      },
      { type: "h2", text: "The setup" },
      {
        type: "p",
        text: "The platform runs a fleet of Node.js and TypeScript microservices, between 50 and 120 depending on the sample, instrumented through a shared internal auto-instrumentation package. Telemetry goes to a self-hosted open-source observability stack. The engineering team is small, and nobody owned observability full time. With security and privacy audits ahead, personal data in logs was the engineering lead's top priority.",
      },
      {
        type: "quote",
        quote:
          "However careful a team is, it never feels sure it isn't leaking secrets or personal data.",
        attribution: "CTO (paraphrased)",
      },
      {
        type: "p",
        text: "OllyGarden Insights analyzed short staging samples and sent five written assessments between April and June 2026, and Rose reviewed the code. This story covers what they found.",
      },
      { type: "h2", text: "Personal data in 1 in 6 services" },
      {
        type: "p",
        text: "In the first weekly sample, Insights flagged personal data in 12 of about 70 services, or 17% of the fleet. As more services started sending traces, the count grew to 18 and then 25 over the next two weeks.",
      },
      {
        type: "p",
        text: "The source was not careless developers. One shared ORM configuration logged every SQL query with its bound values at INFO level. On a service that handles clinician records, about 60% of the query logs in a 30-minute window touched personal-data columns: email, phone, full name, and address. Over a full week, that is roughly 170,000 query logs from one service, about 100,000 of them carrying personal data. Two more services used the same configuration.",
      },
      {
        type: "callout",
        title: "Fix the setting, not the people",
        text: "When one shared setting causes most of a leak, the fix belongs in that setting, not in a reminder to developers to be more careful.",
      },
      {
        type: "p",
        text: "Later samples found more: a bundle of customer personal data (email, name, phone, street, and postal code) in one service, authorization headers in three services, a date of birth on a trace attribute, and OAuth tokens captured verbatim in spans.",
      },
      { type: "h2", text: "Tokens in the headers" },
      {
        type: "p",
        text: "Within about a day of being connected to the repositories, Rose found authentication tokens being written to logs inside HTTP request headers. The customer's DevOps lead checked the finding against their own logs, confirmed it, and called it critical.",
      },
      { type: "h2", text: "The hits we ruled out" },
      {
        type: "p",
        text: "A scanner that cries wolf gets ignored. Several hits were checked and ruled out as false positives: git SSH URLs, millisecond timestamps that looked like phone numbers, and cloud service-account addresses. In the first week, traces were clean, so only the log pipeline needed work.",
      },
      {
        type: "p",
        text: "One trace-side issue did show up: medical-image and signature file fetches were traced as one span per file, which created high-cardinality spans and exposed storage bucket paths.",
      },
      { type: "h2", text: "Logs with no severity" },
      {
        type: "p",
        text: "Every log record in every sample, about 50,000 to 60,000 per sample, arrived with no severity. The bridge that converted the logs to OTLP was dropping the level. That one cause accounted for about 70% of all active insights in the first week, 90 of 128, and a single collector transform would close almost all of them.",
      },
      { type: "h2", text: "Where the volume came from" },
      {
        type: "list",
        items: [
          "16% of logs were exact duplicates in the first week, mostly from a secrets-cache loop that logged on every check. By June, the staging application logs were 84% to 99% reducible by deduplication.",
          "One background worker produced about 60% to 65% of all log volume, three weeks in a row.",
          "Once metrics arrived, the monitoring stack's own self-monitoring was about 40% of all metric volume. Scrape intervals were already efficient, so the lever was dropping series, not slowing scrapes.",
        ],
      },
      { type: "h2", text: "Gaps in the picture" },
      {
        type: "p",
        text: "Tracing barely existed. In the first week, about 3 of 72 services sent traces, and every trace was a single span, so there was no distributed tracing at all. There were no metrics for the first three weeks, and deployment.environment.name was set on 2 of 72 services, so staging and production could not be told apart.",
      },
      {
        type: "p",
        text: "Some checks came back clean: no metric attribute exceeded 1,000 distinct values, and no attribute values were oversized.",
      },
      { type: "h2", text: "What to check in your own telemetry" },
      {
        type: "list",
        items: [
          "Before looking for careless code, look at shared settings. ORM and HTTP logging that records query values or headers can put personal data in every service that uses it.",
          "Check that your log pipeline keeps severity. A bridge that drops it makes every log look the same.",
          "Find the one service or worker that writes most of your logs.",
          "Review PII hits before acting on them. Timestamps and service accounts can look like personal data.",
        ],
      },
    ],
    method:
      "All numbers come from short staging samples, about five minutes each, analyzed between April and June 2026, plus Rose's review of the code. Figures are rounded, and the weekly figures for the clinician-records service are extrapolated from a 30-minute window. Production was not analyzed. Several PII hits were checked and ruled out as false positives before reporting.",
  },
  {
    slug: "b2b-saas-cuts-logs-and-metrics-at-the-source",
    title:
      "How a B2B SaaS platform cut logs 24% and metrics 25% in six weeks, without touching a single customer log",
    shortTitle: "A B2B SaaS platform cuts logs 24% and metrics 25%",
    dek: "A Latin American SaaS platform paid its observability backend per record. OllyGarden found where the volume came from and fixed it in their own OpenTelemetry Collector pipelines, with customer data off limits from day one.",
    summary:
      "Repeated logs, metrics that never change, and a pipeline complaining about itself. How replay-verified Collector changes beat a six-week proof of value, and what happened after.",
    date: "2026-10-03",
    industry: solutionIndustries.enterprise,
    region: "Latin America",
    products: ["/products/insights"],
    relatedPosts: [
      "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
      "the-scrape-interval-nobody-chose",
    ],
    seo: {
      title: "OllyGarden Case Study: SaaS Platform Cuts Logs 24%",
      description:
        "A Latin American B2B SaaS platform cut log records 24% and metric datapoints 25% at the source in a six-week proof of value, without touching customer data.",
    },
    facts: [
      {
        label: "Company",
        value:
          "Mid-size, multi-tenant B2B SaaS platform that runs its customers' workloads",
      },
      { label: "Region", value: "Latin America" },
      {
        label: "Stack",
        value:
          "Kubernetes on two public clouds, upstream OpenTelemetry Collector, a backend built for OpenTelemetry, billed per record",
      },
      {
        label: "OllyGarden",
        value: "Insights, telemetry assessments, and a six-week proof of value",
      },
      { label: "Timeline", value: "November 2025 to September 2026" },
    ],
    stats: [
      { value: "24%", label: "fewer log records", detail: "Target was 20%" },
      {
        value: "25%",
        label: "fewer metric datapoints",
        detail: "Target was 10%",
      },
      {
        value: "61%",
        label: "less volume on dedup-eligible logs",
        detail: "Counts preserved",
      },
      {
        value: "Zero",
        label: "customer workload logs touched",
        detail: "Passed through one to one",
      },
    ],
    audio: {
      src: "/audio/case-studies/b2b-saas-cuts-logs-and-metrics-at-the-source.mp3",
      duration: "PT6M20S",
    },
    body: [
      {
        type: "lead",
        text: "The bill grew with every pod. A Latin American B2B SaaS platform paid its observability backend for every log record and every metric datapoint, and nobody on the team could see, at the source, what was driving the volume. Six weeks later, log records reaching the backend were down 24% and metric datapoints about 25%, and not one customer workload log had been touched.",
      },
      { type: "h2", text: "A bill that grew with every pod" },
      {
        type: "p",
        text: "The company runs a multi-tenant platform that executes its customers' workloads on Kubernetes, across several production clusters on two public clouds. After moving away from a legacy APM vendor, it chose an observability SaaS built for OpenTelemetry that bills per ingested record. That model is fair, but unforgiving: every duplicate log line and every metric series nobody reads shows up on the invoice.",
      },
      {
        type: "p",
        text: "The platform team suspected waste. Nobody could say where the volume came from, and more than half of their metric data arrived without a service name, so they could not even say which team was paying for what.",
      },
      {
        type: "quote",
        quote:
          "Once a log reaches the backend, the backend can't make it better. We want to fix telemetry where it's born.",
        attribution: "Platform lead (paraphrased)",
      },
      {
        type: "p",
        text: "That conviction shaped the whole engagement. Rather than add more filtering in the backend, the team wanted control at the edge, in their own Collector pipelines, where they decide what leaves the cluster at all.",
      },
      { type: "h2", text: "One rule that could not bend" },
      {
        type: "p",
        text: "Most of the platform's log volume is customer workload output: the content of jobs that its customers run. That content may contain personal data, and for regulatory reasons it had to stay out of any reduction policy and out of any analysis. Whatever we changed, customer content had to pass through exactly as it came in.",
      },
      {
        type: "p",
        text: "The security review was just as strict. Work started in staging and pre-production, and production samples were shared only after the contract and the security review had cleared.",
      },
      {
        type: "p",
        text: "Then the team set the bar for a paid six-week proof of value, with pass/fail targets: at least 20% fewer log records and 10% fewer metric datapoints reaching the backend.",
      },
      { type: "h2", text: "What the first samples showed" },
      {
        type: "p",
        text: "OllyGarden Insights analyzed recurring telemetry samples, first from staging and then from production. The staging assessment, based on about 1.8 million records sampled over a week, was blunt:",
      },
      {
        type: "list",
        items: [
          "Metrics made up about 97% of all records, and more than half of the metric data had no service.name. Cost could not be attributed.",
          "About 89% of logs were duplicates. Deduplication alone could remove about 70% of log volume.",
          "About 29% of traces were single-span noise from cache health pings and liveness probes.",
          "No signal set deployment.environment.name, and SDK versions were fragmented across services.",
        ],
      },
      {
        type: "p",
        text: "Earlier in the pilot, something more urgent had already surfaced: passwords, usernames, API keys, and Authorization headers were leaking into logs from about five internal services. Insights flagged them, and the team fixed them at the source.",
      },
      {
        type: "callout",
        title: "Metrics that carry no signal",
        text: "About 57% of the Kubernetes volume-metric series came from static mounts: config maps, secrets, projected volumes, and the downward API. Those volumes never change size, and the same metric family was scraped three times more often than needed.",
      },
      {
        type: "p",
        text: "High-volume access logs from the API gateway and an HTTP trigger service, about 14% of log records, could become request-rate, error-rate, and latency metrics without losing anything an on-call engineer would look for.",
      },
      { type: "h2", text: "Six weeks, in waves" },
      {
        type: "p",
        text: "We delivered the fixes as numbered waves of drop-in Collector configurations. Every wave was replayed against real production samples before it went anywhere near production.",
      },
      {
        type: "list",
        items: [
          "Wave 1 cut the volume-metric scrape from three datapoints per minute to one.",
          "Wave 2 converted API gateway access logs into metrics.",
          "Wave 3 dropped the static-mount series and converted trigger access logs into metrics.",
          "Wave 5 added a log pipeline with template mining, attribute stripping, and count-preserving deduplication, which keeps how many times an event happened while dropping the copies.",
          "Wave 7 filtered pipeline self-noise on a newly onboarded cluster.",
        ],
      },
      {
        type: "p",
        text: "Customer workload content was routed around every one of these pipelines and passed through one to one.",
      },
      { type: "h2", text: "The day the replay paid for itself" },
      {
        type: "p",
        text: "Turning access logs into metrics is a well-known win, but it has a trap. One per-user path segment in the gateway routes was not templated, so a new log-to-metric rule copied real user email addresses into a metric route label. That was a privacy leak and an unbounded cardinality problem at the same time.",
      },
      {
        type: "p",
        text: "The next sample caught it. A fix shipped right away, and the following day's sample confirmed zero personal data in the metric. Without the replay-and-verify loop, those addresses would have sat in a backend that nobody was auditing for them.",
      },
      { type: "h2", text: "Noise that hid an outage" },
      {
        type: "p",
        text: "When a new cluster joined in June, about 78% of its log volume turned out to be the telemetry pipeline complaining about itself. An in-app agent could not reach its export endpoint and logged a stack trace on every pod, nonstop. Another 24% of the cluster's metrics was the logging stack observing itself.",
      },
      {
        type: "p",
        text: "The noise was hiding something worse: the cluster's application traces and metrics were not reaching the backend at all. Wave 7 removed about 70% of the cluster's log records and about 24% of its metrics, touched zero business logs, and made the real export failure impossible to miss.",
      },
      { type: "h2", text: "The results" },
      {
        type: "p",
        text: "In production, Wave 5 alone removed about 24% of log records overall and about 61% on the deduplication-eligible branch, consistently across two samples taken at midday and at midnight. Measured service by service, deduplication cut eligible log volume by 63% to 69%.",
      },
      {
        type: "p",
        text: "The proof of value closed at 24% fewer log records and a 24.6% average reduction in metric datapoints, against targets of 20% and 10%. The customer accepted it and kept OllyGarden on for continuous optimization. An engineering lead on their side called it a success for both teams.",
      },
      { type: "h2", text: "What happened next, honestly" },
      {
        type: "p",
        text: "A proof of value is a snapshot, and production keeps moving. After the six weeks, the production clusters moved off the vendor's operator and onto a self-managed upstream Collector, with OllyGarden checking each cutover.",
      },
      {
        type: "p",
        text: "Those checks found the hidden tax of a Collector migration. Service-name resolution had lived in the operator's configuration and was never carried over: after the cutover, 99.5% of logs and 77% of metrics reported service.name as unknown, which breaks dashboards and cost attribution alike.",
      },
      {
        type: "p",
        text: "Then, in August, the monthly backend bill still jumped by about a third, driven by incident-related metrics and deployments with hundreds to thousands of replicas. The analysis that followed showed that 10 metric groups made up about 48% of all metric volume, that self-monitoring was about 13% of metric datapoints, and that the median series sent about one datapoint per minute. The bill was driven by series count, not by scrape frequency.",
      },
      {
        type: "p",
        text: "So the relationship changed shape. Wave 8 moved 20 slow Kubernetes metric families to one datapoint per minute, added a selective log deduplication policy, and delivered a narrowly scoped email-redaction rule for cloud load-balancer logs. The team now brings OllyGarden in early whenever the bill starts to move, and the backlog is real: restoring service and cluster names, investigating single-span traces, and a filter that would remove about 43% of the in-scope logs.",
      },
      { type: "h2", text: "What other teams can take from this" },
      {
        type: "list",
        items: [
          "Decide what is off limits before you optimize. Routing customer content around every reduction made the rest of the work safe to do.",
          "Replay every change against real samples. That is how an email address in a metric label was caught within a day.",
          "Treat a Collector migration as a telemetry change. Logic that lived in a vendor operator, like service-name resolution, does not move by itself.",
          "Count series, not scrapes. Cardinality drives a per-datapoint bill far more than scrape intervals do.",
        ],
      },
    ],
    method:
      "The proof-of-value results were measured on the pilot cluster with count-preserving pipeline measurements, not as a bill-to-bill comparison. Sample-based counts are subsampled, so this story reports ratios rather than absolute volumes. We do not publish dollar savings here: none have been confirmed, and the August bill increase shows why a single savings number would mislead.",
  },
];

export function caseStudyHref(slug: string) {
  return `${caseStudiesMeta.path}/${slug}`;
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
