export const faqMeta = {
  title: "Documentation & FAQ — OllyGarden",
  path: "/resources/faq",
} as const;

export const faqHero = {
  badge: "OllyGarden FAQ",
  title: "Documentation & FAQ",
  lede: "Everything you need to know about OllyGarden Insights, from getting started to advanced features.",
} as const;

export const faqSupport = {
  title: "Can’t find what you’re looking for?",
  lede: "Our team is here to help. Get in touch with us for personalized support.",
  cta: "Contact Support",
  href: "/contact",
} as const;

export const faqCta = {
  title: "Ready to take control of your telemetry?",
  sub: "Tell us about your financial services telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;

export type FaqItem = {
  q: string;
  a: string;
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
        q: "How does OllyGarden work with my existing observability backend?",
        a: "OllyGarden is vendor-neutral and works alongside any observability backend. Send your OpenTelemetry data to OllyGarden for instrumentation quality analysis while continuing to use your existing platform for monitoring and alerting.",
      },
      {
        q: "What is the Instrumentation Score?",
        a: "The Instrumentation Score is an open-source specification that measures OpenTelemetry instrumentation quality from 0 to 100. It analyzes your telemetry against established rules and conventions, evaluating coverage, completeness, and efficiency.",
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
        q: "Does OllyGarden store my raw telemetry data?",
        a: "We process your OTLP data to generate insights and your Instrumentation Score. The raw data is not stored by OllyGarden long-term. Data is processed for insights and then discarded. To help you identify the source of an insight, we may store the attributes for a single request.",
      },
      {
        q: "What types of telemetry data do you analyze?",
        a: "We are highly opinionated on OpenTelemetry data. We know what good and bad look like for OTel data, and that’s where we provide the most value.",
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
        a: "OllyGarden provides actionable recommendations with specific implementation steps. You can track your score improvement over time and benchmark across services to prioritize efforts where they’ll have the biggest impact.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    items: [
      {
        q: "Is the Free Plan really free?",
        a: "Yes. Our Free Plan includes the Instrumentation Score and critical insights such as PII leakage detection and excessive attributes identification. No credit card required.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes! You can cancel at any time. Just send us an email, and we’ll cancel your subscription right away.",
      },
    ],
  },
];
