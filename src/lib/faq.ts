import { insightsPlans } from "@/lib/insights";
import { instrumentationScoreDefinition, instrumentationScoreMeta } from "@/lib/instrumentation-score";
import { telemetryQualityMeta } from "@/lib/telemetry-quality";
import { rosePlans } from "@/lib/rose";

const [insightsFree, insightsEssentials] = insightsPlans.cards;
const rosePricing = `The Free plan covers up to ${rosePlans.free.repositories} repositories with a weekly automatic review; additional repositories cost ${rosePlans.free.extraRepositoryPrice}/month each, and Enterprise pricing is custom.`;

export const faqMeta = {
  title: "Documentation & FAQ — OllyGarden",
  path: "/resources/faq",
} as const;

export const faqHero = {
  badge: "OllyGarden FAQ",
  title: "Documentation & FAQ",
  lede: "Answers about OllyGarden, Insights, and Rose: how they work, what they cost, how they fit your stack, and how we handle your data.",
} as const;

export const faqSupport = {
  title: "Can’t find what you’re looking for?",
  lede: "Our team is here to help. Get in touch with us for personalized support.",
  cta: "Contact Support",
  href: "/contact",
} as const;

export const faqCta = {
  title: "Ready to take control of your telemetry?",
  sub: "Tell us about your telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;

export type FaqItem = {
  q: string;
  a: string;
  /** Follow-up page, shown after the answer; JSON-LD keeps only the answer text. */
  link?: { href: string; label: string };
};

export type FaqContent = {
  title: string;
  sub: string;
  items: readonly FaqItem[];
};

export type FaqSection = {
  id: string;
  title: string;
  items: readonly FaqItem[];
};

export const faqSections: readonly FaqSection[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is OllyGarden?",
        a: "OllyGarden helps engineering teams improve the quality of their OpenTelemetry instrumentation. Founded by OpenTelemetry contributors and headquartered in Berlin, it offers two products: Insights measures the quality of the telemetry you already send, and Rose finds and fixes instrumentation gaps in your source code.",
      },
      {
        q: "What is bad telemetry?",
        a: "Bad telemetry is data that costs money to collect and store but doesn’t help anyone understand or operate a system: duplicated or excessive logs, high-cardinality metrics, spans with missing or non-standard attributes, broken traces, and sensitive data such as PII that should never have been recorded. OllyGarden finds it and helps fix it at the source.",
        link: { href: telemetryQualityMeta.path, label: "The five dimensions of telemetry quality" },
      },
      {
        q: "Is OllyGarden an observability backend?",
        a: "No. OllyGarden doesn’t replace Datadog, Grafana, Honeycomb, or any other backend for storing telemetry, dashboards, queries, or alerts. It improves the telemetry you send to them, so every backend you use receives cleaner, cheaper, more useful data.",
      },
      {
        q: "What is Rose?",
        a: `Rose is OllyGarden’s AI engineer for OpenTelemetry instrumentation. It reviews your repositories, finds missing or low-value telemetry, and helps your team apply the right fix. ${rosePricing} Approved open-source projects get unlimited public repositories.`,
      },
      {
        q: "How much does OllyGarden cost?",
        a: `Insights has a Free plan (${insightsFree.price}, no credit card), Essentials at ${insightsEssentials.price}/month, and custom Enterprise pricing. Rose: ${rosePricing}`,
      },
      {
        q: "How does OllyGarden work with my existing observability backend?",
        a: "OllyGarden is vendor-neutral and works alongside any observability backend. Send your OpenTelemetry data to OllyGarden for instrumentation quality analysis while continuing to use your existing platform for monitoring and alerting.",
      },
      {
        q: "What is the Instrumentation Score?",
        a: instrumentationScoreDefinition,
        link: { href: instrumentationScoreMeta.path, label: "How the Instrumentation Score works" },
      },
      {
        q: "What data does OllyGarden analyze?",
        a: "OllyGarden analyzes your OpenTelemetry telemetry data—traces, metrics, and logs—to calculate your Instrumentation Score and identify quality issues, waste, and optimization opportunities.",
      },
      {
        q: "Which OpenTelemetry signals does OllyGarden support?",
        a: "OllyGarden analyzes all three OpenTelemetry signals: traces, metrics, and logs.",
      },
      {
        q: "Can I use OllyGarden with multiple observability backends?",
        a: "Yes. OllyGarden is vendor-neutral and works with any observability backend. You can send telemetry to multiple destinations simultaneously.",
      },
      {
        q: "Who should use OllyGarden?",
        a: "OllyGarden is built for engineering teams using or adopting OpenTelemetry—including platform engineers optimizing observability costs, SREs improving service reliability, and team leads tracking instrumentation quality across services.",
      },
    ],
  },
  {
    id: "rate-limits",
    title: "Rate Limits & Performance",
    items: [
      {
        q: "What are the request rate limits for each pricing tier?",
        a: "Our pricing tiers offer different processing capacities: Free provides 100 requests/second, Essentials provides 1,000 requests/second, and Enterprise offers custom request capacity tailored to your needs.",
      },
      {
        q: "What happens if my application exceeds my plan's rate limit?",
        a: "We’ll analyze requests up to your plan’s limit each second. Any additional requests beyond your limit will be accepted by our endpoint but discarded from the current analysis queue to maintain system performance. Your data flow won’t be blocked, and analysis of new data will continue as normal in the next second.",
      },
      {
        q: "Will I receive an HTTP 429 error if I exceed the rate limit?",
        a: "No. We accept all requests without returning HTTP 429 errors. Requests beyond your plan’s limit are received successfully but not analyzed, ensuring your telemetry pipeline remains uninterrupted.",
      },
      {
        q: "How do I know which tier is right for my application?",
        a: "The Free plan (100 rps) is perfect for individual developers and small teams getting started. Essentials (1,000 rps) provides a substantial sample for most growing applications. This isn’t about capturing 100% of your production data for storage (that’s what your backend vendor is for), but about analyzing a statistically significant portion to understand quality and efficiency. For high-volume needs, Enterprise offers custom capacity.",
      },
      {
        q: "Is the rate limit applied per service or for my whole organization?",
        a: "The rate limit is applied per organization. You can direct data from multiple services within your organization’s total capacity (100 rps for Free, 1,000 rps for Essentials, or custom for Enterprise).",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "Data & Privacy",
    items: [
      {
        q: "Does OllyGarden store my telemetry data?",
        a: "We may store samples of your telemetry for deeper analysis, such as our telemetry analysis reports. Samples are currently kept for up to 31 days. Insights, scores, and the attributes of a single example request that help you find the source of an insight are kept while your account exists. Enterprise customers can opt out of sampling or request specific retention windows.",
      },
      {
        q: "Do AI providers retain the data OllyGarden sends them?",
        a: "OllyGarden does not use your code or telemetry to train AI models. The AI providers we use process requests under their standard terms, which may allow them to keep prompts and outputs for a limited period, for example for abuse monitoring. Zero data retention with AI providers is available as an add-on for Enterprise plans.",
      },
      {
        q: "Where is my data processed?",
        a: "The OllyGarden platform runs on Amazon Web Services in Frankfurt, Germany, by default, and its databases are in the EU. Rose analyzes repositories in isolated sandboxes and with AI models hosted in the United States. Every provider that processes customer data, with its location, is listed at ollygarden.com/subprocessors.",
      },
      {
        q: "Is OllyGarden SOC 2 compliant?",
        a: "Yes. OllyGarden, Inc. has completed a SOC 2 Type II examination covering security, availability, and confidentiality. Customers and prospects can request the report under NDA. Our security practices and vulnerability disclosure policy are at ollygarden.com/security.",
      },
      {
        q: "What types of telemetry data do you analyze?",
        a: "Insights analyzes OpenTelemetry data sent over OTLP: traces, metrics, and logs. We focus on OpenTelemetry because it is where we know best what good and bad telemetry look like, including its semantic conventions.",
      },
      {
        q: "Does OllyGarden detect sensitive data in my telemetry?",
        a: "Yes. OllyGarden includes PII (Personally Identifiable Information) leakage detection as one of the critical insights, helping you maintain compliance and security best practices.",
      },
    ],
  },
  {
    id: "service-insights",
    title: "Service & Insights",
    items: [
      {
        q: "How long does it take to get my insights report?",
        a: "The first insights will start appearing a few minutes after you send us data. Within 24–48 hours, we will have received a sufficient data sample to generate meaningful insights and calculate your Instrumentation Score.",
      },
      {
        q: "What types of quality issues does OllyGarden identify?",
        a: "OllyGarden identifies: Wasteful data (excessive, redundant, or low-value telemetry), Incompleteness (missing critical attributes like service.name, broken traces, and deviations from OpenTelemetry semantic conventions), Inefficiencies (overly verbose traces and high-cardinality metrics that increase costs), and Security issues (potential PII leakage in telemetry).",
      },
      {
        q: "How do I improve my Instrumentation Score?",
        a: "Fix failed rules in order of impact: a Critical rule weighs four times as much as a Low one, so it moves the score the most. OllyGarden shows the findings behind each failed rule with specific remediation steps, and you can track the score over time and compare it across services.",
        link: { href: `${instrumentationScoreMeta.path}#rules`, label: "See every rule and its weight" },
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    items: [
      {
        q: "Is the Insights Free plan really free?",
        a: "Yes. Our Free Plan includes the Instrumentation Score and critical insights such as PII leakage detection and excessive attributes identification. No credit card required.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes! You can cancel at any time. Just send us an email, and we’ll cancel your subscription right away.",
      },
    ],
  },
];
