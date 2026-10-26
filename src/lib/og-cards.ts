// Imported by scripts/render-og-images.mjs and tests outside the tsconfig path aliases.
// Import only other import-free modules, by relative path with the .ts extension.
import {
  quizCardPath,
  quizPitch,
  quizQuestionCount,
  quizScores,
  quizTier,
} from "./quiz/score.ts";
import {
  trustCardPath,
  trustPitch,
  trustRoundSize,
  trustScores,
  trustTier,
} from "./trust-game/score.ts";

export type OgTheme = "olive" | "forest" | "cream" | "ink";

export type OgCard = {
  /** Wrap one to three words in *asterisks* for the accent colour; "\n" forces a line break. */
  headline: string;
  body: string;
  theme?: OgTheme;
};

const quizResultCards: Record<string, OgCard> = Object.fromEntries(
  quizScores.map((score) => [
    quizCardPath(score),
    { headline: `*${score}/${quizQuestionCount}*\n${quizTier(score).name}`, body: quizPitch },
  ]),
);

const trustResultCards: Record<string, OgCard> = Object.fromEntries(
  trustScores.map((score) => [
    trustCardPath(score),
    { headline: `*${score}/${trustRoundSize}*\n${trustTier(score).name}`, body: trustPitch },
  ]),
);

/** Open Graph card copy for every indexable page and quiz result, keyed by canonical path. */
export const ogCards: Record<string, OgCard> = {
  "/": {
    headline: "Observability starts with *good telemetry*",
    body: "OllyGarden helps teams find and fix bad telemetry before it reaches any observability backend.",
  },
  "/otel-quiz": {
    headline: "How well do you know *OpenTelemetry*?",
    body: "Take the quiz on semantic conventions, SDKs, signals, the Collector, OTTL, sampling, Weaver, and otelc.",
  },
  ...quizResultCards,
  "/resources/trust-game": {
    headline: "Would you trust *this telemetry*?",
    body: "Ten anonymized OpenTelemetry cases. Decide whether each conclusion holds, then see the tell and the fix.",
  },
  ...trustResultCards,
  "/pricing": {
    headline: "Start free,\n*grow when ready*",
    body: "Plans for OllyGarden Insights and Rose, from free tiers with no credit card to custom Enterprise plans.",
  },
  "/products/insights": {
    headline: "Find your *bad telemetry*",
    body: "Insights pinpoints where telemetry quality breaks down and shows your team what needs attention first.",
  },
  "/products/rose": {
    headline: "Fix instrumentation\n*at the source*",
    body: "Rose is your AI engineer for observability. It reviews your services and opens pull requests that fix missing or low-value telemetry.",
  },
  "/solutions/overview": {
    headline: "Clean telemetry *for your industry*",
    body: "From PII in traces to 100K-collector deployments, OllyGarden improves telemetry quality at the source.",
  },
  "/solutions/enterprise-software": {
    headline: "Help every engineer ship *better telemetry*",
    body: "Improve instrumentation quality across thousands of repositories and guide every developer.",
  },
  "/solutions/financial-services": {
    headline: "Clean, *compliant* telemetry for financial services",
    body: "Improve telemetry quality at the source and take control of your pipeline without compromising on security or cost.",
  },
  "/solutions/retail-ecommerce": {
    headline: "Telemetry at *retail scale*",
    body: "From 100K collectors to billions of spans, cut through the noise so your pipeline stays reliable across every release.",
  },
  "/company": {
    headline: "Cultivating *clarity* in observability",
    body: "Founded by OpenTelemetry contributors, OllyGarden makes telemetry cleaner, more trustworthy, and easier to use.",
  },
  "/careers": {
    headline: "Join *our team*",
    body: "Help us build the observability tools that make complex systems more transparent, reliable, and easier to debug.",
  },
  "/careers/founding-enterprise-account-executive": {
    headline: "Founding Enterprise *Account Executive*",
    body: "United States, remote, full-time. Build OllyGarden's first enterprise sales motion and turn what works into a repeatable playbook.",
  },
  "/careers/executive-assistant": {
    headline: "Executive *Assistant*",
    body: "Remote, CET hours, full-time. Own the scheduling, finance operations, company events, and paperwork that keep OllyGarden moving.",
  },
  "/careers/ai-software-engineer": {
    headline: "AI Software *Engineer*",
    body: "Europe or Latin America, remote, full-time. Build Rose, our AI agent for OpenTelemetry instrumentation, and own our open source agent skills.",
  },
  "/contact": {
    headline: "Let's talk about *your telemetry*",
    body: "Questions about Insights, Rose, the Instrumentation Score, or partnerships? Our team is ready to connect.",
  },
  "/resources": {
    headline: "Everything we know about\n*good telemetry*",
    body: "Guides, case studies, articles, and talks for engineers who run OpenTelemetry in production.",
  },
  "/resources/blog": {
    headline: "OpenTelemetry and observability *insights*",
    body: "Articles from OllyGarden's telemetry experts on instrumentation, the Collector, and telemetry quality.",
  },
  "/resources/events": {
    headline: "Meet us at the *next event*",
    body: "Where to find OllyGarden next: conferences, meetups, and community days.",
  },
  "/resources/webinars-conferences": {
    headline: "Webinars and *conference talks*",
    body: "Deep dives, demos, and conference talks from the OllyGarden team.",
  },
  "/resources/press-releases": {
    headline: "OllyGarden *press releases*",
    body: "The latest news and announcements from OllyGarden.",
  },
  "/resources/case-studies": {
    headline: "Real teams,\n*real telemetry*",
    body: "Anonymized but real customer stories: what we found, what changed at the source, and the numbers that moved.",
  },
  "/resources/case-studies/enterprise-platform-half-the-spans-had-no-name": {
    headline: "Nearly half the spans\nhad *no name*",
    body: "What we found in the real telemetry of an enterprise software platform with about 500 services.",
  },
  "/resources/case-studies/digital-health-pii-leak-was-a-logger-setting": {
    headline: "The PII leak was\na *logger setting*",
    body: "What OllyGarden found in the telemetry and code of a European digital-health platform.",
  },
  "/resources/case-studies/b2b-saas-cuts-logs-and-metrics-at-the-source": {
    headline: "*24% fewer logs*,\nzero customer logs touched",
    body: "How a B2B SaaS platform beat its six-week proof of value by fixing telemetry in its own Collector pipelines.",
  },
  "/resources/telemetry-quality": {
    headline: "What is\n*telemetry*\n*quality*?",
    body: "The five dimensions of good OpenTelemetry data, the signs of bad telemetry, and how to measure and fix it.",
  },
  "/resources/instrumentation-score": {
    headline: "What is the\n*Instrumentation*\n*Score*?",
    body: "The open 0–100 score for OpenTelemetry instrumentation quality: how it is calculated, every rule, and how to get yours.",
  },
  "/resources/agent-skills": {
    headline: "OpenTelemetry skills\nfor *coding agents*",
    body: "Open source facts and OllyGarden opinions for any agent. The same skills power Rose.",
  },
  "/resources/faq": {
    headline: "Documentation *and FAQ*",
    body: "Everything you need to know about OllyGarden Insights, from getting started to advanced features.",
  },
  "/privacy-policy": {
    headline: "Privacy *policy*",
    body: "What personal data OllyGarden collects, why, who processes it, and your rights.",
    theme: "cream",
  },
  "/data-protection-policy": {
    headline: "Data protection *policy*",
    body: "The technical and organizational controls OllyGarden uses to protect customer data.",
    theme: "cream",
  },
  "/terms-of-use": {
    headline: "Terms *of use*",
    body: "The terms that govern your use of OllyGarden.",
    theme: "cream",
  },
  "/rose-terms-of-service": {
    headline: "Rose terms *of service*",
    body: "The terms that govern your use of OllyGarden Rose.",
    theme: "cream",
  },
  "/subprocessors": {
    headline: "*Subprocessors*",
    body: "The third parties OllyGarden uses to process customer data, what they do, and where.",
    theme: "cream",
  },
  "/security": {
    headline: "*Security* at OllyGarden",
    body: "How we protect customer data, and how to report a security vulnerability.",
    theme: "cream",
  },
  "/imprint": {
    headline: "*Imprint*",
    body: "Legal information about OllyGarden, Inc. and OllyGarden GmbH.",
    theme: "cream",
  },
  "/resources/blog/observability-for-humans-and-agents-in-the-ai-age": {
    headline: "Observability for\n*humans and agents*",
    body: "OllyGarden and Bronto on where AI agents help with instrumentation and analysis, and what they need from your telemetry.",
  },
  "/resources/blog/opentelemetry-vendor-lock-in-since-2024": {
    headline: "*Vendor lock-in* since 2024:\nwhat changed",
    body: "Agents, CLIs, and MCP servers have made switching observability backends noticeably less painful.",
  },
  "/resources/blog/introducing-minimum-viable-instrumentation": {
    headline: "Introducing *Minimum Viable*\nInstrumentation",
    body: "Low-volume, high-quality instrumentation for code written by agents and operated by agents, delivered by Rose as a pull request.",
  },
  "/resources/blog/where-sensitive-data-hides-in-opentelemetry-pipelines": {
    headline: "Where *sensitive data* hides in your pipelines",
    body: "Passwords in resource attributes, OAuth tokens in query strings, tax IDs in metrics. What we found, and how to find yours.",
  },
  "/resources/blog/the-scrape-interval-nobody-chose": {
    headline: "The scrape interval *nobody chose*",
    body: "A wrong scrape interval inflates ingest, egress, and compute. Measure DPM and match intervals to the decisions each metric supports.",
  },
  "/resources/blog/teach-your-coding-agent-opentelemetry": {
    headline: "Teach your coding agent *OpenTelemetry*",
    body: "14 open source Agent Skills that give any coding agent accurate, current OpenTelemetry knowledge.",
  },
  "/resources/blog/are-collector-exporters-sequential-or-parallel": {
    headline: "Collector exporters:\n*sequential or parallel*?",
    body: "Sequentially, but it usually doesn't matter. The part that does matter changed defaults underneath a lot of old advice.",
  },
  "/resources/blog/creating-your-own-collector-distribution-from-tulip": {
    headline: "Build your own *Collector distribution* from Tulip",
    body: "Derive your own distribution when you need more components, while keeping support for the core pipeline.",
  },
  "/resources/blog/decomposing-opentelemetry-collector-configuration": {
    headline: "Decomposing your\n*Collector config*",
    body: "Practical strategies for splitting a growing Collector configuration into maintainable, testable units.",
  },
  "/resources/blog/opentelemetry-is-not-hard": {
    headline: "OpenTelemetry *is not hard*",
    body: "One response kept appearing when we asked about OpenTelemetry pain points: it's complicated. The framing is wrong.",
  },
  "/resources/blog/ollygarden-at-kubecon-eu-2026": {
    headline: "Our week at *KubeCon*\n*+ CloudNativeCon*\nEurope 2026",
    body: "Five recorded talks, the Observability Day program committee, a Prometheus Contribfest, and Rose's general availability.",
  },
  "/resources/blog/when-to-use-each-telemetry-signal-logs-traces-and-metrics": {
    headline: "When to use *logs, traces, and metrics*",
    body: "Learn when to use each OpenTelemetry signal and build a stronger observability strategy.",
  },
  "/resources/blog/you-dont-have-too-much-telemetry-you-have-bad-telemetry": {
    headline: "You don't have too much telemetry. You have *bad telemetry*.",
    body: "High observability costs are rarely a volume problem. Fix bad telemetry at the source before relying on sampling.",
  },
  "/resources/blog/reducing-log-volume-with-the-opentelemetry-log-deduplication-processor": {
    headline: "Reducing log volume with *log deduplication*",
    body: "Connection retries, health checks, and heartbeats repeat thousands of times per day. The Collector's log deduplication processor cuts that noise.",
  },
  "/resources/blog/what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges": {
    headline: "What *10,000 Slack*\n*messages* say about\nOpenTelemetry",
    body: "The most common adoption challenges in the OpenTelemetry community Slack, from Collector config to instrumentation.",
  },
  "/resources/blog/meet-rose-ollygardens-ai-instrumentation-agent": {
    headline: "Meet Rose, our AI\n*instrumentation agent*",
    body: "Rose reviews your code and fixes the instrumentation your on-call team will need at 3 a.m.",
  },
  "/resources/blog/introducing-tulip-supported-otel-collector": {
    headline: "Introducing\n*OllyGarden Tulip*",
    body: "A commercially supported, open source OpenTelemetry Collector distribution with stable quarterly releases and LTS every 18 months.",
  },
  "/resources/blog/what-deserves-a-span": {
    headline: "How to decide what *deserves a span*",
    body: "Use the Variability Principle to improve trace readability and control costs in OpenTelemetry.",
  },
  "/resources/blog/how-to-name-your-metrics": {
    headline: "How to name *your metrics*",
    body: "Follow semantic conventions, keep the who in attributes, and apply units and naming patterns that scale.",
  },
  "/resources/blog/how-to-name-your-span-attributes": {
    headline: "How to name your\n*span attributes*",
    body: "When to use semantic conventions, how to namespace custom attributes, and pitfalls to avoid.",
  },
  "/resources/blog/how-to-name-your-spans": {
    headline: "How to name *your spans*",
    body: "Good span names make traces readable. Learn the {verb} {object} pattern and avoid the most common naming mistakes.",
  },
  "/resources/blog/cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry": {
    headline: "Unique *service.instance.id* on NGINX Ingress",
    body: "The NGINX Ingress Controller doesn't expose the knobs. Here's how to inject a unique ID per pod using the Helm chart.",
  },
  "/resources/blog/introducing-ollygarden": {
    headline: "Introducing\n*OllyGarden*",
    body: "OllyGarden comes out of stealth with pre-seed funding to help teams understand, score, and improve their telemetry.",
  },
  "/resources/blog/instrumentation-score": {
    headline: "Introducing the *Instrumentation Score*",
    body: "An open, standardized measure of OpenTelemetry instrumentation quality, scoring OTLP data against best-practice rules.",
  },
  "/resources/blog/concrete-applications-of-purposeful-instrumentation": {
    headline: "Purposeful instrumentation *in practice*",
    body: "From NASA-grade telemetry design to code-level tips for real-world OpenTelemetry systems.",
  },
  "/resources/blog/purposeful-instrumentation": {
    headline: "Purposeful *instrumentation*",
    body: "Gather the right telemetry, not all of it. Cut noise, troubleshoot faster, and lower observability costs.",
  },
  "/resources/blog/theres-a-lot-of-bad-telemetry-out-there": {
    headline: "There's a lot of *bad telemetry* out there",
    body: "Most telemetry is never queried. Learn what bad data costs you and how to improve quality at the source.",
  },
  "/resources/press-releases/ollygarden-raises-4m-launches-minimum-viable-instrumentation": {
    headline: "OllyGarden raises *$4m*",
    body: "And launches Minimum Viable Instrumentation, so Rose can set an instrumentation baseline where none exists yet.",
  },
  "/resources/press-releases/ollygarden-rose-ga": {
    headline: "OllyGarden introduces *Rose*",
    body: "An AI agent that fixes bad OpenTelemetry instrumentation through pull requests, now generally available.",
  },
};

export const ogImageSize = { width: 1200, height: 630 } as const;

export function ogCardTheme(path: string): OgTheme {
  const theme = ogCards[path]?.theme;
  if (theme) return theme;
  if (path.startsWith("/resources/blog/")) return "ink";
  if (path.startsWith("/resources/press-releases/")) return "forest";
  return "olive";
}

/** Public URL of the rendered card, relative to the site origin. */
export function ogImageUrl(path: string) {
  return path === "/" ? "/og/index.png" : `/og${path}.png`;
}

export function ogImageAlt(path: string) {
  return ogCards[path].headline.replaceAll("*", "").replace(/\s+/g, " ");
}
