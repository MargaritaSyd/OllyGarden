export const insightsHero = {
  badge: "OllyGarden Insights",
  title: "Find your bad telemetry",
  lede: "Insights analyzes your OpenTelemetry data to pinpoint where telemetry quality breaks down and show your team what needs attention first. Identify sensitive data leaks, noisy signals, incomplete instrumentation, and telemetry without clear ownership.",
  cta: "Get Started",
} as const;

export const insightsScore = {
  title: "Instrumentation Score",
  value: "89",
  verdict: "Excellent",
  hide: "Hide details",
  show: "Show details",
  findings: [
    {
      name: "Suspicious PII Leakage",
      delta: "-5 pts",
      severity: "Critical" as const,
      kind: "Trace",
    },
    {
      name: "Semantic Convention Attribute Level",
      delta: "-3 pts",
      severity: "Important" as const,
      kind: "Resource",
    },
    {
      name: "Root Client Span",
      delta: "-3 pts",
      severity: "Important" as const,
      kind: "Trace",
    },
  ],
} as const;

export const insightsHow = {
  eyebrow: "How OllyGarden Insights Works",
  title: "Analyze telemetry quality without changing your observability stack",
  body: "Your telemetry keeps flowing through your existing OpenTelemetry pipeline. OllyGarden analyzes a sample alongside that flow, so teams can surface quality issues without replacing their observability backend.",
  caption:
    "OllyGarden works alongside your existing telemetry flow to analyze quality and surface issues.",
  replay: "Replay animation",
  infra: "Your infrastructure",
  destinations: "Destinations",
  apps: "Applications",
  collector: "OTel Collector",
  backends: "Backends",
  bridge: "Auto-routed via OllyGarden",
  engine: "OllyGarden telemetry validation engine",
  status: "Inline filter active",
  ingestion: "Ingestion",
  insights: "Insights",
  rulesLabel: "Active quality rules (5)",
  repairing: "Auto-repairing",
  moreRules: "12 More Rules Running",
  rules: [
    "Suspicious PII Leakage",
    "Missing Service Name",
    "Client Root Span",
    "High Cardinality Metric",
    "Semantic Convention Level",
  ],
  steps: [
    {
      title: "Data Ingestion",
      body: "OllyGarden receives a sample of your OpenTelemetry data through the OTLP protocol.",
    },
    {
      title: "Insight Analyzers",
      body: "Specialized analyzers inspect telemetry patterns such as suspicious PII leakage, missing service names, client root spans, high-cardinality metrics, and semantic convention issues.",
    },
    {
      title: "OllyGarden Insights",
      body: "The Insights dashboard turns those findings into scores, detailed reports, and recommendations your team can review and act on.",
    },
  ],
} as const;

export const insightsAction = {
  eyebrow: "Insights in Action",
  title: "See OllyGarden Insights in action",
  sub: "Watch how teams use the Insights dashboard to review organization health, inspect service-level findings, and share specific insights with the right people.",
  video: {
    src: "https://ollygarden-website.pages.dev/videos/insights-demo.mp4",
    label:
      "Demo video: OllyGarden Insights dashboard reviewing telemetry quality",
  },
} as const;

export const insightsLevels = {
  eyebrow: "From Overview to Insight Details",
  title: "Understand telemetry quality at every level",
  sub: "Start with a high-level view of telemetry health, then drill into the services, findings, and details behind each score.",
  cards: [
    {
      title: "Dashboard Overview",
      body: "Get a bird’s-eye view of your telemetry health with organization-level scores, telemetry volume across spans, logs, and metrics, and recommended actions prioritized by impact.",
      image: "/images/insights/dashboard.png",
      imageAlt:
        "OllyGarden Insights dashboard showing an Instrumentation Score of 97 rated Excellent, a volume metrics chart for spans, logs, and metrics, and a row of next recommended actions",
      wide: false,
    },
    {
      title: "Service-Level Insights",
      body: "Drill down into individual services to review their score, version history, telemetry volume, and the issues affecting quality.",
      image: "/images/insights/service.png",
      imageAlt:
        "Service view with an Instrumentation Score of 89, a version history table listing scores per release, and a semantic convention attribute level insight",
      wide: false,
    },
    {
      title: "Insight Details",
      body: "Explore each insight in depth, including the problem description, impact analysis, affected attributes, remediation guidance, and additional resources.",
      image: "/images/insights/detail.png",
      imageAlt:
        "Insight detail view for Suspicious PII Leakage on the Cart service, showing the problem description, critical impact level, scope, and attribute lists",
      wide: true,
    },
  ],
} as const;

export const insightsVoices = {
  title: "What Observability Leaders Are Saying",
  quotes: [
    {
      name: "Blake Irvin",
      role: "Platform Engineering Leader",
      quote: "Most teams don’t look at telemetry quality until there’s an incident.",
      image: "/images/insights/blake.png",
      imageAlt: "Portrait of Blake Irvin",
    },
    {
      name: "André Fiche",
      role: "Head of Observability",
      quote:
        "The insights you’re bringing are gold. No backend today brings this so digested.",
      image: "/images/insights/andre.png",
      imageAlt: "Portrait of André Fiche",
    },
  ],
} as const;

export const insightsPlans = {
  eyebrow: "Pricing",
  title: "Start measuring telemetry quality today",
  sub: "Start with our Free Plan - Full access to the Instrumentation Score and critical insights including PII leakage detection. No credit card required.",
  cards: [
    {
      tier: "Free",
      price: "$0",
      suffix: "/mo",
      note: "For small projects and getting started.",
      cta: "Start Free",
      href: "/get-started",
      items: [
        "Instrumentation Score calculation",
        "2 insights (incl. suspicious PII leaks)",
        "100 requests/second per organization",
        "Unlimited seats",
        "Unlimited services",
        "Community support",
        "No credit card required",
      ],
    },
    {
      tier: "Essentials",
      price: "$990",
      suffix: "/mo",
      note: "For teams shipping production telemetry.",
      cta: "Get Started",
      href: "/get-started",
      items: [
        "Instrumentation Score calculation",
        "All OllyGarden Insights",
        "100 requests/second per organization",
        "Unlimited seats",
        "Unlimited services",
        "Priority email support",
        "API access",
      ],
    },
    {
      tier: "Enterprise",
      price: "Custom",
      suffix: "",
      note: "For scale, security, and governance.",
      cta: "Contact Sales",
      href: "/contact",
      items: [
        "Instrumentation Score calculation",
        "All OllyGarden Insights",
        "Custom rate limits",
        "Unlimited seats",
        "Unlimited services",
        "Slack/phone support",
        "API access",
        "Custom SLA agreements",
        "Real-time notifications",
        "Custom rules (coming soon)",
      ],
    },
  ],
} as const;

export const insightsCta = {
  title: ["Start with your", "Instrumentation Score"],
  sub: "Get your first score, review your findings, and start improving telemetry quality across your OpenTelemetry services.",
  primary: { label: "Get Started" },
  secondary: { label: "Book a Demo", href: "/contact" },
} as const;

export const insightsMeta = {
  title: "OllyGarden Insights — Know your bad telemetry",
  path: "/products/insights",
} as const;
