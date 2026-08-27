export const financialHero = {
  badge: "OllyGarden for Financial Services",
  title: [
    "Clean, compliant",
    "telemetry for financial",
    "services — without the",
    "manual overhead",
  ],
  lede: "Financial institutions generate massive volumes of telemetry while navigating strict compliance, PII controls, and vendor lock-in. OllyGarden helps you improve telemetry quality at the source and take control of your pipeline without compromising on security or cost.",
  cta: "Talk to our Team",
} as const;

export const financialMeta = {
  title: "Financial Services — OllyGarden Solutions",
  path: "/solutions/financial-services",
} as const;

export const financialPains = {
  eyebrow: "Financial Pain Points",
  titleLead: "Challenges we hear",
  titleRest: "every week",
  sub: "From dozens of customer interviews, these are the pain points that come up again and again.",
  cards: [
    {
      icon: "costs",
      title: "Runaway telemetry costs",
      body: "Organizations are filtering 35% or more of telemetry before ingestion just to keep costs manageable. You need smarter controls, not less visibility.",
    },
    {
      icon: "pii",
      title: "PII and PCI data in telemetry",
      body: "Auto-instrumentation leaks access tokens, card numbers, and PII into traces and logs. Manual auditing teams struggle to keep up with the volume.",
    },
    {
      icon: "lockin",
      title: "Vendor lock-in",
      body: "Teams are building parallel open-source stacks to reduce dependency on proprietary backends. The migration path needs to be safe and incremental.",
    },
    {
      icon: "audit",
      title: "Manual compliance auditing",
      body: "Dedicated teams spend weeks doing what automation should handle in minutes. Instrumentation quality reviews remain manual and inconsistent.",
    },
  ],
} as const;

export type FinancialPainIcon = (typeof financialPains.cards)[number]["icon"];

export const financialStats = {
  eyebrow: "Interviews with Companies",
  title: "What we’ve learned from the field",
  sub: "Anonymized data points from our customer interviews — the scale and challenges are real.",
  cards: [
    {
      eyebrow: "PII Findings",
      end: 2000,
      suffix: "+",
      sep: true,
      body: "Passwords, account numbers, and taxpayer IDs found leaking through telemetry pipelines — and counting",
    },
    {
      eyebrow: "Duplicate Logs",
      end: 93,
      suffix: "%",
      sep: false,
      body: "A large financial institution found that 93% of their logs were duplicates, with an achievable 79% reduction in volume",
    },
    {
      eyebrow: "Services Instrumented",
      end: 9600,
      suffix: "+",
      sep: true,
      body: "A major bank instruments over 9,600 distinct services across hybrid cloud and mainframe infrastructure",
    },
  ],
} as const;

export const financialProducts = {
  eyebrow: "Products & Services",
  title: "How OllyGarden helps",
  sub: "Purpose-built tools to improve telemetry quality, manage your pipeline, and support your collectors.",
  cards: [
    {
      href: "/products/insights",
      icon: "/images/solutions/financial/insights.svg",
      family: "OllyGarden Insights",
      title: "Insights",
      body: "Score and audit instrumentation quality across your entire fleet. Identify PII leaks, missing attributes, and compliance gaps before they become incidents.",
    },
    {
      href: "/products/tulip",
      icon: "/images/solutions/financial/tulip.svg",
      family: "OllyGarden Tulip",
      title: "Tulip",
      body: "Run a commercially supported OpenTelemetry Collector with predictable releases, CVE backports, and patch guarantees — no vendor lock-in.",
    },
    {
      href: "/products/rose",
      icon: "/images/solutions/financial/rose.svg",
      family: "OllyGarden Rose",
      title: "Rose",
      body: "Give every developer AI-powered guidance on instrumentation best practices, reducing the burden on your platform and compliance teams.",
    },
  ],
} as const;

export const financialCta = {
  title: ["Ready to take control", "of your telemetry?"],
  sub: "Tell us about your financial services telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;
