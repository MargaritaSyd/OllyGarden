const pngCoverSlugs = [
  "are-collector-exporters-sequential-or-parallel",
  "concrete-applications-of-purposeful-instrumentation",
  "creating-your-own-collector-distribution-from-tulip",
  "decomposing-opentelemetry-collector-configuration",
  "how-to-name-your-metrics",
  "how-to-name-your-span-attributes",
  "how-to-name-your-spans",
  "introducing-ollygarden",
  "opentelemetry-is-not-hard",
  "opentelemetry-vendor-lock-in-since-2024",
  "purposeful-instrumentation",
  "reducing-log-volume-with-the-opentelemetry-log-deduplication-processor",
  "teach-your-coding-agent-opentelemetry",
  "the-scrape-interval-nobody-chose",
  "what-10000-slack-messages-reveal-about-opentelemetry-adoption-challenges",
  "what-deserves-a-span",
  "when-to-use-each-telemetry-signal-logs-traces-and-metrics",
  "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
] as const;

const pngOgSlugs = [
  "cultivating-unique-serviceinstanceid-on-nginx-ingress-with-opentelemetry",
  "how-to-name-your-metrics",
  "how-to-name-your-spans",
  "instrumentation-score",
  "meet-rose-ollygardens-ai-instrumentation-agent",
] as const;

export const legacyBlogAssetRedirects = [
  ...pngCoverSlugs.map((slug) => ({
    source: "/blog-images/" + slug + "/cover.png",
    destination: "/images/blog/" + slug + ".png",
  })),
  ...pngOgSlugs.map((slug) => ({
    source: "/blog-images/" + slug + "/og.png",
    destination: "/images/blog/" + slug + ".png",
  })),
  {
    source:
      "/blog-images/meet-rose-ollygardens-ai-instrumentation-agent/image-1.png",
    destination:
      "/images/blog/meet-rose-ollygardens-ai-instrumentation-agent.png",
  },
  {
    source:
      "/blog-images/introducing-tulip-supported-otel-collector/cover.webp",
    destination: "/images/blog/introducing-tulip-supported-otel-collector.webp",
  },
  {
    source: "/blog-images/introducing-tulip-supported-otel-collector/og.webp",
    destination: "/images/blog/introducing-tulip-supported-otel-collector.webp",
  },
  {
    source: "/blog-images/ollygarden-at-kubecon-eu-2026/og.webp",
    destination: "/images/blog/ollygarden-at-kubecon-eu-2026.webp",
  },
  {
    source: "/blog-images/theres-a-lot-of-bad-telemetry-out-there/cover.jpeg",
    destination: "/images/blog/theres-a-lot-of-bad-telemetry-out-there.jpeg",
  },
] as const;
