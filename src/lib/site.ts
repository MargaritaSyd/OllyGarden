// Imported by next.config.ts, which loads outside the tsconfig path aliases.
// Keep this file free of imports and "@/" aliases or next dev/build will fail.
export const siteConfig = {
  name: "OllyGarden",
  legalName: "OllyGarden, Inc.",
  shortName: "OllyGarden",
  description:
    "Observability starts with good telemetry. Identify bad telemetry with Insights and fix it at the source with Rose.",
  tagline:
    "Transforming bad telemetry into actionable insights. Built by OpenTelemetry experts for the observability community.",
  appUrl: "https://ollygarden.app",
  docsUrl: "https://docs.ollygarden.com",
  logoPath: "/brand/logo.svg",
  contactEmail: "contact@olly.garden",
  address: {
    locality: "Berlin",
    country: "DE",
  },
  locale: "en_US",
  language: "en",
  author: "OllyGarden",
  blogFeedPath: "/blog/rss.xml",
  keywords: [
    "OllyGarden",
    "OpenTelemetry",
    "observability",
    "telemetry",
    "Insights",
    "Rose",
    "instrumentation",
  ],
  social: {
    github: "https://github.com/ollygarden",
    linkedin: "https://www.linkedin.com/company/ollygarden",
    youtube: "https://www.youtube.com/@ollygarden",
    email: "mailto:contact@olly.garden",
  },
} as const;

export const madeInCountries = [
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇩🇪", name: "Germany" },
] as const;

export function getSiteUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (fromEnv) {
    return new URL(fromEnv.replace(/\/+$/, ""));
  }

  return new URL("http://localhost:3000");
}

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
