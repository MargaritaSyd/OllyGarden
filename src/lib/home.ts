export const homeHero = {
  badge: "Telemetry your AI can trust",
  titleLead: "Observability starts",
  titleAccent: "good telemetry",
  lede: "OllyGarden helps teams find and fix bad telemetry before it reaches any observability backend, giving engineers and AI agents data they can rely on — from pull request to production.",
  cta: "See How It Works",
  ctaHref: "#how",
} as const;

export const homeSecurity = {
  eyebrow: "We take security seriously",
  title: "Security you can trust",
  body: "OllyGarden has completed a SOC 2® Type II examination.",
  badgeAlt: "AICPA SOC seal for service organizations",
  badgeSrc: "/images/soc-badge.png",
} as const;

export const homeWhy = {
  eyebrow: "Why Telemetry Quality Matters",
  title: "Bad telemetry makes observability harder to trust",
  paragraphs: [
    "As systems grow, telemetry often becomes noisy, incomplete, inconsistent, or unsafe. This creates problems that show up too late: higher observability bills, slower incident response, unreliable AI recommendations, and sensitive data ending up where it should not.",
    "OllyGarden helps teams catch and fix these issues earlier, before bad telemetry becomes expensive, risky, or misleading.",
  ],
  cards: [
    {
      title: "Noisy telemetry",
      body: "Too many low-value signals make it harder to find what actually matters.",
      motif: "chevrons",
    },
    {
      title: "Missing context",
      body: "Incomplete traces, logs, or metrics slow down debugging and incident investigation.",
      motif: "pixels",
    },
    {
      title: "Sensitive data leakage",
      body: "PII, credentials, or unsafe attributes can appear inside telemetry pipelines.",
      motif: "diamonds",
    },
    {
      title: "Unreliable AI decisions",
      body: "AI agents depend on telemetry. If the data is wrong, their recommendations are wrong too.",
      motif: "bars",
    },
  ],
} as const;

export type WhyMotif = (typeof homeWhy.cards)[number]["motif"];

export const homeReality = {
  eyebrow: "The New Reality",
  title: "Humans wrote code",
  titleAccent: "Now agents do too",
  cards: [
    {
      title: "More code, same context",
      body: "Coding agents now write much of the new code. They instrument it with the context they have, which rarely includes your conventions or what your team needs to see during an incident.",
      icon: "/images/home/nr-blend.svg",
    },
    {
      title: "Review can’t keep up",
      body: "Your observability engineers know what good instrumentation looks like. They can’t read every pull request in every repository.",
      icon: "/images/home/nr-square-stack.svg",
    },
    {
      title: "The gap grows with every merge",
      body: "A pattern that slips through gets copied into the next service. By the time it shows up on a bill or in an incident, it is in every repository.",
      icon: "/images/home/nr-gap-horizontal.svg",
    },
    {
      title: "More code, more telemetry",
      body: "More services, more signals, more to run. Your Collectors carry it and your backend stores it, whether or not the data is worth keeping.",
      icon: "/images/home/nr-layers-arrow-down.svg",
    },
  ],
  stats: [
    {
      value: "82%",
      body: "Of logs were duplicates at a fintech we audited.",
    },
    {
      value: "63%",
      body: "Of trace data was waste at another company.",
    },
    {
      value: "5 of 6",
      body: "Audits surfaced leaked credentials or personal data.",
    },
  ],
  note: "From OllyGarden telemetry audits.",
} as const;

export const homeVoices = {
  title: "What people are saying",
  sub: "Voices from engineers and observability leaders working with OpenTelemetry®, telemetry quality, and production systems.",
  quotes: [
    {
      name: "Blake Irvin",
      role: "Platform Engineering Leader",
      quote: "Most teams don’t look at telemetry quality until there’s an incident.",
      image: "/images/insights/blake.png",
      imageAlt: "Portrait of Blake Irvin",
      wide: false,
    },
    {
      name: "André Fiche",
      role: "Head of Observability",
      quote:
        "The insights you’re bringing are gold. No backend today brings this so digested.",
      image: "/images/insights/andre.png",
      imageAlt: "Portrait of André Fiche",
      wide: false,
    },
    {
      name: "Adriel Cardoso",
      role: "Engineering Leader",
      quote:
        "We’re focused on operational efficiency. OllyGarden makes a lot of sense for us.",
      image: "/images/insights/adriel.png",
      imageAlt: "Portrait of Adriel Cardoso",
      wide: false,
    },
    {
      name: "Luke Mundy",
      role: "Staff Security and Reliability Engineer",
      quote:
        "I feel like we can now effectively make ’instrumentation quality’ an actual engineering KPI instead of maintaining a vague best-practice doc nobody reads.",
      image: "/images/insights/luke.png",
      imageAlt: "Portrait of Luke Mundy",
      wide: true,
    },
  ],
} as const;

export const homeHow = {
  eyebrow: "How OllyGarden Works",
  title: "From pull request",
  titleAccent: "to production",
  sub: "We don’t replace your observability backend. We make whatever you run send cleaner, cheaper, more trustworthy data.",
  diagramLabel:
    "How OllyGarden works: your service sends telemetry through the OpenTelemetry Collector to your observability backend and to OllyGarden Insights. Insights analyzes the telemetry and sends findings to OllyGarden Rose. Rose, using your org context and skills, opens a pull request into your service. New telemetry is sent and the loop starts over.",
  steps: [
    {
      n: "1",
      parts: [
        { text: "Insights analyzes your telemetry", strong: true },
        { text: " and finds what’s missing or wrong in your instrumentation.", strong: false },
      ],
    },
    {
      n: "2",
      parts: [
        { text: "Rose opens a pull request", strong: true },
        { text: " to fix it at the source, guided by your org context and skills.", strong: false },
      ],
    },
    {
      n: "3",
      parts: [
        { text: "Your team ", strong: false },
        { text: "reviews and merges", strong: true },
        { text: " it, ", strong: false },
        { text: "new telemetry is sent", strong: true },
        { text: ", and the loop starts over.", strong: false },
      ],
    },
  ],
  noteLead: "Use one or both.",
  note: " Rose and Insights each work independently, so you can choose the product that fits your needs.",
  productsCta: "Explore the Products",
  contactCta: "Talk to Us",
  products: [
    {
      icon: "rose" as const,
      label: "OllyGarden Rose",
      title: "Fix instrumentation at the source",
      body: "Rose reviews your code and helps improve OpenTelemetry instrumentation before bad patterns spread across repositories.",
      href: "/products/rose",
      cta: "Learn More",
    },
    {
      icon: "insights" as const,
      label: "OllyGarden Insights",
      title: "Analyze and score telemetry quality",
      body: "Insights detects quality issues across your services and helps teams understand where telemetry is breaking down.",
      href: "/products/insights",
      cta: "Learn More",
    },
  ],
} as const;

// Default SiteCta on other pages: single-color title, 57px buttons, quiz as the
// secondary action. The homepage omits that button; see src/app/page.tsx.
export const homeCta = {
  title: ["Keep your observability backend", "Send it better telemetry"],
  secondary: { label: "Test Your OTel Knowledge", href: "/otel-quiz" },
  buttonSize: "lg",
} as const;

export const homeBlog = {
  eyebrow: "Learn More",
  title: "Latest from our blog",
  sub: "Deep dives on OpenTelemetry, telemetry quality, and the pipelines that carry it — written by the engineers building OllyGarden.",
  cta: "Read Our Blog",
  ctaHref: "/resources/blog",
} as const;
