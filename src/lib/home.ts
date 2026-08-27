export const homeHero = {
  badge: "Telemetry your AI can trust",
  titleLead: "Observability starts",
  titleAccent: "good telemetry",
  lede: "OllyGarden helps teams find and fix bad telemetry before it reaches any observability backend, giving engineers and AI agents data they can rely on — from pull request to production.",
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

export const homeVoices = {
  title: "What people are saying",
  sub: "Voices from engineers and observability leaders working with OpenTelemetry, telemetry quality, and production systems.",
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
  title: ["Ingest", "Analyze", "Score", "Fix"] as const,
  sub: "OllyGarden continuously evaluates telemetry quality, scores issues by impact, and turns findings into source-level fixes or pipeline improvements.",
  video: {
    src: "/videos/how-ollygarden-works.webm",
    label: "How OllyGarden works — product walkthrough video",
  },
  steps: [
    {
      n: "1",
      icon: "rose" as const,
      label: "OllyGarden Rose",
      title: "Fix instrumentation at the source",
      body: "Rose reviews your code and helps improve OpenTelemetry instrumentation before bad patterns spread across repositories.",
      flip: false,
      video: {
        src: "/videos/meet-rose.mp4",
        label: "Meet OllyGarden Rose — product demo video",
      },
    },
    {
      n: "2",
      icon: "tulip" as const,
      label: "OllyGarden Tulip",
      title: "Run OpenTelemetry Collector with confidence",
      body: "Tulip is a supported distribution of the OpenTelemetry Collector. It helps teams operate collector-based telemetry pipelines with curated components, predictable releases, security fixes, and enterprise support — while staying vendor-neutral.",
      flip: true,
      video: {
        src: "/videos/tulip-demo.mp4",
        label: "OllyGarden Tulip — product demo video",
      },
    },
    {
      n: "3",
      icon: "insights" as const,
      label: "OllyGarden Insights",
      title: "Analyze and score telemetry quality",
      body: "Insights detects quality issues across your services and helps teams understand where telemetry is breaking down.",
      flip: false,
      video: {
        src: "/videos/insights-demo.mp4",
        label: "OllyGarden Insights — product demo video",
      },
    },
  ],
} as const;

export const homeCta = {
  title: ["Keep your observability backend", "Send it better telemetry"],
  titleAccent: "better telemetry",
} as const;

export const homeBlog = {
  eyebrow: "Learn More",
  title: "Latest from our blog",
  sub: "Deep dives on OpenTelemetry, telemetry quality, and the pipelines that carry it — written by the engineers building OllyGarden.",
  cta: "Read Our Blog",
  ctaHref: "/resources/blog",
} as const;
