export const pressMeta = {
  title: "Press Releases — OllyGarden",
  path: "/resources/press-releases",
} as const;

export const pressHero = {
  badge: "OllyGarden Press",
  title: "Press Releases",
  lede: "The latest news and announcements from OllyGarden.",
} as const;

export type PressRelease = {
  slug: string;
  title: string;
  summary: string;
  date: string;
};

export const pressReleases: readonly PressRelease[] = [
  {
    slug: "ollygarden-dash0-portel",
    title:
      "OllyGarden and Dash0 Announce Portel: The Industry's First Observability Platform for Portlet-Based Generative UI",
    summary:
      "OllyGarden and Dash0 announce Portel, the first observability solution purpose-built for portlet-based generative UI architectures with full JSR-286 and JSR-362 lifecycle compliance.",
    date: "2026-04-01",
  },
  {
    slug: "ollygarden-rose-ga",
    title:
      "OllyGarden Introduces Rose: An AI Agent That Fixes Bad OpenTelemetry Instrumentation Through Pull Requests",
    summary:
      "OllyGarden announces the general availability of Rose — an AI agent that analyzes OpenTelemetry instrumentation in source code and autonomously opens pull requests with fixes.",
    date: "2026-03-24",
  },
];

export function getPressRelease(slug: string) {
  return pressReleases.find((release) => release.slug === slug);
}

export function pressReleaseHref(slug: string) {
  return `/resources/press-releases/${slug}`;
}

export function formatPressDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
