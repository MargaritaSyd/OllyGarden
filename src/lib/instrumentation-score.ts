import { blogPostHref } from "@/lib/blog";
import { caseStudyHref } from "@/lib/case-studies";
import type { FaqContent } from "@/lib/faq";
import {
  specRules,
  specSource,
  type ScoreImpact,
  type SpecRule,
  type SpecRuleId,
} from "@/lib/instrumentation-score-rules";
import { siteConfig } from "@/lib/site";

export { specSource };

const specRepository = specSource.repository;
const ruleCount = specRules.length;

/** Weight of each impact level in the score, from the specification. */
export const impactWeights: Record<ScoreImpact, number> = {
  Critical: 40,
  Important: 30,
  Normal: 20,
  Low: 10,
};

const impactOrder = Object.keys(impactWeights) as ScoreImpact[];

export function rulesWithImpact(impact: ScoreImpact) {
  return specRules.filter((rule) => rule.impact === impact);
}

/** The qualitative categories from the specification, best first. */
export const scoreCategories = [
  { range: "90–100", min: 90, name: "Excellent", meaning: "A high standard of instrumentation quality." },
  { range: "75–89", min: 75, name: "Good", meaning: "Solid quality; minor improvements are possible." },
  { range: "50–74", min: 50, name: "Needs Improvement", meaning: "Tangible issues that need attention." },
  { range: "0–49", min: 0, name: "Poor", meaning: "Significant problems that need urgent action." },
] as const;

export function scoreCategory(score: number) {
  return scoreCategories.find((category) => score >= category.min) ?? scoreCategories.at(-1)!;
}

/** The weighted share of passed rules, from 0 to 100, for a service that fails the given rules. */
export function instrumentationScore(failed: readonly SpecRuleId[]) {
  const weight = (rule: SpecRule) => impactWeights[rule.impact];
  const total = specRules.reduce((sum, rule) => sum + weight(rule), 0);
  const passed = specRules
    .filter((rule) => !failed.includes(rule.id))
    .reduce((sum, rule) => sum + weight(rule), 0);
  return (passed / total) * 100;
}

export const formatScore = (score: number) => score.toFixed(1).replace(/\.0$/, "");

type RuleNote = {
  /** One line on why the rule matters, for the rules table. */
  why: string;
  /** Blog post slug with a how-to for the rule. */
  post?: string;
};

const sensitiveDataPost = "where-sensitive-data-hides-in-opentelemetry-pipelines";
const metricNamesPost = "how-to-name-your-metrics";
const instanceIdPost = "cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry";

/** Our one-line rationale for every rule; a new rule in the specification is a type error here. */
const ruleNotes: Record<SpecRuleId, RuleNote> = {
  "LOG-001": { why: "Debug logs left on in production cost storage, can carry sensitive values, and bury the records you need.", post: "you-dont-have-too-much-telemetry-you-have-bad-telemetry" },
  "LOG-002": { why: "Without a severity number every record looks the same, so you cannot filter or alert on errors." },
  "LOG-003": { why: "Backends give more people access than production databases do, so personal data in logs becomes a compliance problem.", post: sensitiveDataPost },
  "MET-001": { why: "Unbounded attribute values multiply time series, which slows queries and raises storage cost.", post: metricNamesPost },
  "MET-002": { why: "A value without a unit cannot be read: 1% of memory, 1 MB, and 1 GB look the same.", post: metricNamesPost },
  "MET-003": { why: "When one metric name carries different units, every query across services mixes them.", post: metricNamesPost },
  "MET-004": { why: "Different buckets for the same histogram make aggregated quantiles less precise." },
  "MET-005": { why: "The unit belongs in the unit field; a name that repeats it breaks when the unit changes.", post: metricNamesPost },
  "MET-006": { why: "A metric named like a semantic convention attribute, such as http.response.status_code, confuses queries and readers." },
  "MET-008": { why: "Personal data in metric names, labels, or exemplars reaches everyone with dashboard access.", post: sensitiveDataPost },
  "RES-001": { why: "service.instance.id tells instances of a service apart without combining other attributes.", post: instanceIdPost },
  "RES-002": { why: "An instance ID shared by several pods is worse than none: it merges their telemetry.", post: instanceIdPost },
  "RES-003": { why: "k8s.pod.uid lets the Collector attach Kubernetes metadata reliably, even behind a service mesh." },
  "RES-004": { why: "Attributes at the wrong level, such as service.name on a span, break queries that look where the conventions say they live." },
  "RES-005": { why: "service.name is required by the semantic conventions; without it, telemetry belongs to nobody." },
  "RES-006": { why: "Standard criticality values let tooling rank alerts and incidents consistently across teams." },
  "RES-007": { why: "Without an environment, staging and production data mix in the same views and alerts." },
  "RES-010": { why: "Credentials in resource attributes, often from command-line arguments, are copied onto every record a process sends.", post: sensitiveDataPost },
  "SDK-001": { why: "Languages and runtimes outside the SDK's support window miss fixes and current semantic conventions." },
  "SPA-001": { why: "Many INTERNAL spans in one trace usually mean over-instrumented code paths that add noise and cost.", post: "what-deserves-a-span" },
  "SPA-002": { why: "A span whose parent never arrives means context propagation broke and the trace is incomplete.", post: "you-dont-have-too-much-telemetry-you-have-bad-telemetry" },
  "SPA-003": { why: "Span names with IDs or literal URLs defeat grouping and can blow up backend indexes.", post: "how-to-name-your-spans" },
  "SPA-004": { why: "A trace that starts with a CLIENT span is missing the work that caused the call, or lost its context." },
  "SPA-005": { why: "Dozens of spans shorter than 5 ms in one trace add overhead and hide the operations that matter.", post: "what-deserves-a-span" },
  "SPA-006": { why: "Spans record query text, URLs, and headers, which is where personal data and tokens leak.", post: sensitiveDataPost },
};

export type ScoreRule = SpecRule & RuleNote & { weight: number; href: string; postHref?: string };

/** Every rule with its weight and our notes, most severe first. */
export const scoreRules: readonly ScoreRule[] = impactOrder.flatMap((impact) =>
  rulesWithImpact(impact).map((rule) => {
    const note = ruleNotes[rule.id];
    return {
      ...rule,
      ...note,
      weight: impactWeights[rule.impact],
      href: `${specRepository}/blob/${specSource.commit}/rules/${rule.id}.md`,
      postHref: note.post ? blogPostHref(note.post) : undefined,
    };
  }),
);

export function getScoreRule(id: SpecRuleId) {
  return scoreRules.find((rule) => rule.id === id)!;
}

/** Strips the spec's Markdown code marks for plain-text uses such as JSON-LD. */
export const plainRuleText = (text: string) => text.replaceAll("`", "");

export const instrumentationScoreMeta = {
  title: "Instrumentation Score — Measure OpenTelemetry Quality",
  description: `The Instrumentation Score rates OpenTelemetry instrumentation from 0 to 100. See how it is calculated, all ${ruleCount} rules, and a worked example.`,
  path: "/resources/instrumentation-score",
} as const;

/** The quotable definition: the hero lede, the FAQ, JSON-LD, and llms.txt all use it. */
export const instrumentationScoreDefinition = `The Instrumentation Score is a 0–100 measure of how well a service's OpenTelemetry telemetry follows best practices and semantic conventions. It checks the traces, metrics, logs, and resource attributes a service already sends against ${ruleCount} open rules, and weighs each failed rule by its impact.`;

export const instrumentationScoreHero = {
  badge: "Open specification · Apache 2.0",
  title: "The Instrumentation Score",
  lede: instrumentationScoreDefinition,
  spec: { label: "Read the specification", href: specRepository },
  cta: { label: "Get your score", href: siteConfig.appUrl },
} as const;

export const scoreCalculation = {
  eyebrow: "How it is calculated",
  title: "Weighted rules, one number",
  lede: "The score is a meta-signal: a signal about the quality of your signals. Every rule passes or fails for a service, and failed rules cost points in proportion to their impact, so one Critical failure costs four times as much as one Low failure. Nothing is capped, and fixing the most severe problems first always moves the score the most.",
  steps: [
    {
      title: "Analyze the telemetry",
      body: "An implementation reads the OTLP data a service already sends, grouped by service.name, over a sliding window that defaults to 30 days. The score follows the service as it changes: spans that helped during development can become noise once it is stable.",
    },
    {
      title: "Check every rule",
      body: `Each of the ${ruleCount} rules is a pass or fail condition on resources, spans, metrics, logs, or the SDK. A rule with several conditions passes only when all of them hold.`,
    },
    {
      title: "Weigh the results",
      body: "The score is the weighted share of passed rules: the sum of passed rules times their weight, divided by the sum of all rules times their weight, times 100.",
    },
  ],
  formula: "Score = Σ (passed rules × weight) ÷ Σ (all rules × weight) × 100",
  weightsTitle: "Impact levels and weights",
  categoriesTitle: "What a score means",
  conformance:
    "The design borrows from scores engineers already trust: CVSS for vulnerabilities, Google Lighthouse for web pages, and SSL Labs for TLS configuration. Like them, it is strict about comparability. An implementation must not add its own rules to the score, and must tell users when it does not implement every rule, so the same telemetry gets the same score in any tool.",
} as const;

export const scoreRulesSection = {
  eyebrow: "The rules",
  title: `All ${ruleCount} rules`,
  lede: `The rules come from OpenTelemetry semantic conventions and community practice. This table is generated from the specification repository, most severe first; each rule ID links to its full definition and criteria.`,
  synced: `Synced from the specification on ${specSource.date} (commit ${specSource.commit.slice(0, 7)}).`,
  pending: "Criteria still being defined in the specification.",
  howTo: "How-to",
} as const;

/** A sample checkout service; its numbers are computed from the current rule set. */
const exampleFailures = ["SPA-006", "RES-007", "MET-002", "RES-001"] as const satisfies readonly SpecRuleId[];
const exampleFindings: Record<(typeof exampleFailures)[number], string> = {
  "SPA-006": "url.full on password-reset spans carries the reset token in its query string.",
  "RES-007": "No deployment.environment.name, so staging and production share dashboards.",
  "MET-002": "Custom queue metrics are exported without a unit.",
  "RES-001": "No service.instance.id, so the three replicas cannot be told apart.",
};

const exampleScore = instrumentationScore(exampleFailures);
const afterCritical = instrumentationScore(exampleFailures.filter((id) => getScoreRule(id).impact !== "Critical"));
const afterImportant = instrumentationScore(
  exampleFailures.filter((id) => !["Critical", "Important"].includes(getScoreRule(id).impact)),
);
const maxPoints = specRules.reduce((sum, rule) => sum + impactWeights[rule.impact], 0);
const lostPoints = exampleFailures.reduce((sum, id) => sum + getScoreRule(id).weight, 0);

export const scoreExample = {
  eyebrow: "Worked example",
  title: "Scoring a checkout service",
  lede: `A checkout service sends traces, metrics, and logs and fails ${exampleFailures.length} of the ${ruleCount} rules. Here is how those findings become its score.`,
  service: "checkout",
  findings: exampleFailures.map((id) => ({ rule: getScoreRule(id), finding: exampleFindings[id] })),
  maxPoints,
  lostPoints,
  score: formatScore(exampleScore),
  category: scoreCategory(exampleScore).name,
  math: `(${maxPoints} − ${lostPoints}) ÷ ${maxPoints} × 100 = ${formatScore(exampleScore)}`,
  steps: [
    `With every rule passing, the service would hold all ${maxPoints} weighted points. The ${exampleFailures.length} failures cost ${lostPoints}, which leaves ${formatScore(exampleScore)}: ${scoreCategory(exampleScore).name}.`,
    `Fixing the Critical token leak alone raises the score to ${formatScore(afterCritical)}. Adding the two Important fixes reaches ${formatScore(afterImportant)}, which is ${scoreCategory(afterImportant).name}.`,
    "That ordering is the point of the weights: the score tells a team which fix to make first.",
  ],
} as const;

export const scoreGetYours = {
  eyebrow: "Get your score",
  title: "Compute it yourself, or let Insights do it",
  lede: "The specification is open, so anyone can implement it. OllyGarden Insights is a hosted implementation that keeps the score current for every service.",
  spec: {
    title: "Use the open specification",
    body: "Read the rules and the formula on GitHub, run them against your own OTLP data, and propose changes. Discussion happens in the #instrumentation-score channel on the CNCF Slack.",
    link: "instrumentation-score/spec on GitHub",
    href: specRepository,
    slackHref: "https://cloud-native.slack.com/archives/C090FEG5R0F",
    slackLabel: "Join #instrumentation-score",
  },
  insights: {
    title: "Get it continuously with Insights",
    body: "Send a sample of your OTLP data to OllyGarden Insights and get a score for every service, the findings behind it, and remediation guidance. The Free plan includes the Instrumentation Score, with no credit card.",
    cta: "Get your score",
    href: siteConfig.appUrl,
    link: "Learn more about Insights",
    productHref: "/products/insights",
  },
} as const;

type ScoreProof = {
  study: string;
  value: string;
  label: string;
  rules: readonly SpecRuleId[];
};

/** Findings from the published case studies that map to specific rules. */
const proofItems: readonly ScoreProof[] = [
  {
    study: "enterprise-platform-half-the-spans-had-no-name",
    value: "9%",
    label: "of about 500 services set a deployment environment; 56% set service.instance.id.",
    rules: ["RES-007", "RES-001"],
  },
  {
    study: "digital-health-pii-leak-was-a-logger-setting",
    value: "12 of ~70",
    label: "services were flagged for personal data in logs in the first week.",
    rules: ["LOG-003"],
  },
  {
    study: "digital-health-pii-leak-was-a-logger-setting",
    value: "100%",
    label: "of log records arrived with no severity, because the log bridge dropped the level.",
    rules: ["LOG-002"],
  },
  {
    study: "b2b-saas-cuts-logs-and-metrics-at-the-source",
    value: "1 day",
    label: "to catch real user email addresses copied into a metric label by a new log-to-metric rule.",
    rules: ["MET-008"],
  },
];

export const scoreProof = {
  eyebrow: "In real fleets",
  title: "What the rules catch",
  lede: "These findings come from our anonymized case studies. Each one is a rule that failed in production or staging telemetry, and a real cost behind it.",
  items: proofItems.map((item) => ({ ...item, href: caseStudyHref(item.study) })),
  link: "Read the case studies",
  href: "/resources/case-studies",
} as const;

const criticalIds = rulesWithImpact("Critical").map((rule) => rule.id);
const oneCritical = instrumentationScore(criticalIds.slice(0, 1));
const twoCritical = instrumentationScore(criticalIds.slice(0, 2));

const [critical, important, normal, low] = impactOrder.map((impact) => rulesWithImpact(impact).length);

export const instrumentationScoreFaq = {
  title: "Frequently Asked Questions",
  sub: "What teams ask us about the Instrumentation Score, the specification, and how to use it.",
  items: [
    {
      q: "What is the Instrumentation Score?",
      a: instrumentationScoreDefinition,
    },
    {
      q: "How is the Instrumentation Score calculated?",
      a: `Each rule has an impact level with a weight: Critical 40, Important 30, Normal 20, and Low 10. The score is the sum of the weights of the rules a service passes, divided by the sum of the weights of all rules, times 100. The current specification has ${critical} Critical, ${important} Important, ${normal} Normal, and ${low} Low rules.`,
    },
    {
      q: "What is a good Instrumentation Score?",
      a: `The specification maps scores to four categories: 90 to 100 is Excellent, 75 to 89 is Good, 50 to 74 is Needs Improvement, and 0 to 49 is Poor. Do not chase 100; a score of 75 or more is a sound target for most services. Fix Critical failures first: one of them, such as personal data in spans, costs ${impactWeights.Critical} of ${maxPoints} points and leaves ${formatScore(oneCritical)}, and two leave ${formatScore(twoCritical)}, which is ${scoreCategory(twoCritical).name}.`,
    },
    {
      q: "Is the Instrumentation Score vendor-neutral?",
      a: "Yes. The specification is open source under the Apache 2.0 license, and its maintainers work at Splunk, New Relic, Dash0, and OllyGarden. Implementations may not add rules of their own, so the same telemetry gets the same score in any tool.",
    },
    {
      q: "Who maintains the Instrumentation Score specification?",
      a: "OllyGarden started the specification in 2025 and hosts it today under an open governance model. Maintainers from Splunk, New Relic, Dash0, and OllyGarden review changes, and the goal is to move it to a neutral foundation such as the CNCF or the OpenTelemetry project.",
    },
    {
      q: "How is the Instrumentation Score different from SLOs?",
      a: "An SLO measures how a service behaves for its users, such as latency or error rate. The Instrumentation Score measures the telemetry itself: whether the data your SLOs, dashboards, and alerts are built on is complete, consistent, and safe. A service can meet its SLOs while its telemetry hides problems.",
    },
    {
      q: "How is the Instrumentation Score different from data quality checks?",
      a: "Generic data quality checks validate schemas, freshness, or volumes. The Instrumentation Score checks telemetry against OpenTelemetry semantic conventions and instrumentation practice, such as service identity, units, cardinality, broken traces, and sensitive data, and summarizes the result in one number you can compare across services and tools.",
    },
    {
      q: "Do I have to change application code to improve my score?",
      a: "Not always. Many failed rules can be fixed in the OpenTelemetry Collector: the transform processor, written in the OpenTelemetry Transformation Language (OTTL), can add missing resource attributes, move attributes to the right level, or redact sensitive values, and the filter processor can drop debug logs and noisy spans. Fixing the instrumentation at the source is still the better long-term answer.",
    },
    {
      q: "Has the scoring formula changed since the 2025 launch?",
      a: "Yes. The first draft, published in June 2025, started every service at 80 and added or subtracted fixed points per rule. The community replaced it with the weighted share of passed rules described on this page, which keeps the score between 0 and 100 without clamping and makes every rule's effect proportional to its impact.",
    },
    {
      q: "Which signals does the Instrumentation Score cover?",
      a: "The rules cover resource attributes, spans, metrics, and logs, plus one rule on SDK support for the language and runtime. New rules are added through the specification repository.",
    },
    {
      q: "How do I get an Instrumentation Score for my services?",
      a: "Implement the open specification against your own OTLP data, or use OllyGarden Insights, which computes the score continuously for every service and shows the findings behind it. The Insights Free plan includes the Instrumentation Score, with no credit card.",
    },
    {
      q: "Can I propose a new rule?",
      a: "Yes. Open an issue or pull request in the instrumentation-score/spec repository on GitHub, or start a discussion in the #instrumentation-score channel on the CNCF Slack. Every rule needs a rationale, pass or fail criteria, a target, and an impact level.",
    },
  ],
} as const satisfies FaqContent;

export const instrumentationScoreCta = {
  title: ["Get your", "Instrumentation Score"],
  titleAccent: "Instrumentation Score",
  sub: "Send a sample of your OpenTelemetry data to Insights and see the score for every service, with the findings behind it.",
  primary: { label: "Get Started", href: siteConfig.appUrl },
  secondary: { label: "Book a Demo", href: "/contact" },
} as const;
