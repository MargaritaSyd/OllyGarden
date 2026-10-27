import { anonymizedNotice } from "@/lib/case-studies";
import type { FaqContent } from "@/lib/faq";
import { trustGameCases } from "@/lib/trust-game/cases";
import { trustGameDeckSize, trustGamePath } from "@/lib/trust-game/score";

export const trustGameMeta = {
  name: "Trust Your Telemetry?",
  title: "OllyGarden Game: Would You Trust This OpenTelemetry Data?",
  description:
    "Ten real, anonymized OpenTelemetry cases, each with a conclusion someone drew from the data. Decide which hold up, see the fix, and share your score.",
  path: trustGamePath,
} as const;

export const trustGameHero = {
  eyebrow: "Trust Game",
  title: "Would you trust this telemetry?",
  lede: "Each case shows real, anonymized OpenTelemetry data and a conclusion someone drew from it. Some conclusions hold up, some don't. Make the call, then see the tell and the fix.",
} as const;

/**
 * What every case asks. The player always judges the conclusion; the reveal then says whether the
 * data or the reading was at fault.
 */
export const trustGameRule = {
  question: "Does the telemetry back this up?",
  holds: "Yes, it holds",
  fails: "No, something's off",
  /** Booth keyboard shortcuts for the two answers. */
  keys: { holds: "Y", fails: "N" },
  explainer:
    "Someone read this telemetry and drew a conclusion. Sometimes the data is broken, sometimes the reading is.",
  /** The reveal's stamp. */
  verdict: { holds: "Holds up", fails: "Doesn’t hold up" },
  /** The reveal's "The data" line, by why the conclusion holds or fails. */
  data: {
    holds: "Accurate.",
    reading: "Accurate, but misread.",
    data: "Misleading: the data itself is wrong.",
  },
} as const;

/** Shown on the game page, the booth attract screen, and the results. */
export const trustGameNotice = {
  label: anonymizedNotice.label,
  text: "Every case comes from production OpenTelemetry data that OllyGarden sampled and analyzed. We invented every service, host, endpoint, and ID name and removed anything that could identify the source. Status codes, span structure, and ratios are as measured.",
} as const;

export const trustGameHowItWorks = {
  title: "How it works",
  steps: [
    {
      title: "Read the situation",
      body: "An on-call moment and the conclusion someone drew from the telemetry, the way it would come up in an incident channel.",
    },
    {
      title: "Inspect the telemetry",
      body: "A trace waterfall, log records, a span, a table, a chart, or a service map, as your backend would show it.",
    },
    {
      title: "Make the call",
      body: "Does the telemetry back the conclusion up? Half the conclusions hold, so doubting everything won't win.",
    },
    {
      title: "See the tell",
      body: "Each reveal says whether the data or the reading was at fault, points at the detail that settles it, and shows the fix.",
    },
  ],
} as const;

/** What the cases exercise, without saying which case is which. */
export const trustGamePractice = {
  eyebrow: `${trustGameCases.length} cases`,
  title: "What you'll practice",
  lede: `${trustGameCases.length} cases across traces, logs, spans, and metrics. Each game deals ${trustGameDeckSize} of them, half that hold up and half that don't.`,
  skills: [
    {
      label: "Span status and span kinds",
      description: "When ERROR marks a real failure, and which parent and child spans may overlap.",
    },
    {
      label: "Log severity",
      description: "Why a severity filter can come back empty while the service is failing.",
    },
    {
      label: "Timestamps",
      description: "Event time, observed time, and what a time-range search can miss.",
    },
    {
      label: "Trace context",
      description: "How parent and child links carry a request across services and message brokers.",
    },
    {
      label: "Service identity",
      description: "What service.name tells you, and what an SDK default hides.",
    },
    {
      label: "Protocol status",
      description: "Where HTTP and gRPC each report success and failure.",
    },
  ],
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
