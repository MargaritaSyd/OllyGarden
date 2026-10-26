import type { FaqContent } from "@/lib/faq";

export const trustGameMeta = {
  title: "OllyGarden Trust Game: Would You Trust This Telemetry?",
  description:
    "Ten anonymized OpenTelemetry cases. Decide whether each conclusion holds, then see the tell and the fix. No timer and no sign-up.",
  path: "/resources/trust-game",
} as const;

export const trustGameHero = {
  eyebrow: "Trust Game",
  title: "Would you trust this telemetry?",
  lede: "Each case shows real, anonymized OpenTelemetry® data and a conclusion someone drew from it. Some conclusions hold up, some don't. Make the call, then see the tell and the fix.",
} as const;

export const trustGameIntro = {
  kicker: "Ready when you are",
  title: "10 conclusions. Does the telemetry back them up?",
  lede: "Someone read this telemetry and drew a conclusion. Sometimes the data is broken, sometimes the reading is. Half the conclusions hold. No timer and no sign-up.",
  start: "Start the game",
  hint: "Make the call with Y or N, then Enter for the next case.",
} as const;

export const trustGameHow = [
  {
    title: "Read the situation",
    description:
      "An on-call moment and the conclusion someone drew from the telemetry, the way it would come up in an incident channel.",
  },
  {
    title: "Inspect the telemetry",
    description:
      "A trace waterfall, log records, a span, a table, a chart, or a service map, as your backend would show it.",
  },
  {
    title: "Make the call",
    description:
      "Does the telemetry back the conclusion up? Half the conclusions hold, so doubting everything won't win.",
  },
  {
    title: "See the tell",
    description:
      "Each reveal says whether the data or the reading was at fault, points at the detail that settles it, and shows the fix.",
  },
] as const;

export const trustGamePractice = {
  eyebrow: "20 cases",
  title: "What you'll practice",
  lede: "20 cases across traces, logs, spans, and metrics. Each game deals 10 of them, half that hold up and half that don't.",
  topics: [
    {
      title: "Span status and span kinds",
      description: "When ERROR marks a real failure, and which parent and child spans may overlap.",
    },
    {
      title: "Log severity",
      description: "Why a severity filter can come back empty while the service is failing.",
    },
    {
      title: "Timestamps",
      description: "Event time, observed time, and what a time-range search can miss.",
    },
    {
      title: "Trace context",
      description: "How parent and child links carry a request across services and message brokers.",
    },
    {
      title: "Service identity",
      description: "What service.name tells you, and what an SDK default hides.",
    },
    {
      title: "Protocol status",
      description: "Where HTTP and gRPC each report success and failure.",
    },
  ],
  provenanceLead: "Anonymized, but real.",
  provenance:
    "Every case comes from production OpenTelemetry data that OllyGarden sampled and analyzed. We invented every service, host, endpoint, and ID name and removed anything that could identify the source. Status codes, span structure, and ratios are as measured.",
} as const;

export const trustGameFaq: FaqContent = {
  title: "About the game",
  sub: "Where the cases come from and what OllyGarden does with telemetry like this.",
  items: [
    {
      q: "Is this real customer data?",
      a: "Yes, anonymized. Every case comes from OpenTelemetry data that OllyGarden sampled from production systems. Every service, host, endpoint, and ID name is invented, and nothing identifies the source. Status codes, span structure, and ratios are kept as measured; where a timing is illustrative, the reveal says so.",
    },
    {
      q: "What makes telemetry deceptive?",
      a: "Two things. Sometimes the data itself says the wrong thing: errors logged at INFO or with no severity, timestamps at the Unix epoch or an hour off, traces missing their root, or services reporting under an SDK default name. Sometimes accurate data is easy to misread: a gRPC failure behind HTTP 200, a long-poll wait that looks like latency, or a retry loop that looks like an outage. Queries, alerts, and dashboards inherit both mistakes.",
      link: { href: "/resources/telemetry-quality", label: "What is telemetry quality?" },
    },
    {
      q: "How does OllyGarden catch these problems?",
      a: "OllyGarden Insights analyzes the telemetry you already send and flags quality problems per service, such as missing service names, single-span traces, and duplicate log records, with the fix for each. Rose reviews the instrumentation code that produces it.",
      link: { href: "/products/insights", label: "Explore OllyGarden Insights" },
    },
  ],
};

export const trustGameCta = {
  title: ["Turn OpenTelemetry knowledge", "into better instrumentation"],
  sub: "OllyGarden Insights scores the telemetry you already send, and Rose fixes it at the source.",
  primary: {
    label: "Explore OllyGarden Insights",
    href: "/products/insights",
    className: "hover:!bg-mist",
  },
  secondary: { label: "Meet OllyGarden Rose", href: "/products/rose" },
} as const;

export const trustGamePitch = {
  title: "Your telemetry can lie to you. OllyGarden catches it before your on-call does.",
  lede: "OllyGarden reads the OpenTelemetry data you already send and flags what makes it untrustworthy:",
  points: [
    "Missing service names and broken trace context",
    "Duplicate and mislabeled logs",
    "Wasteful, noisy, or leaking data",
  ],
  close: "Then it shows you the fix.",
} as const;
