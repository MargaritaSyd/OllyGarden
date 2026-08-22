export const siteConfig = {
  name: "OllyGarden",
  shortName: "OllyGarden",
  description:
    "Observability starts with good telemetry. Identify bad telemetry with Insights, fix quality issues at the source with Rose, and transmit data confidently using Tulip.",
  tagline:
    "Transforming bad telemetry into actionable insights. Built by OpenTelemetry experts for the observability community.",
  locale: "en_US",
  language: "en",
  author: "OllyGarden",
  keywords: [
    "OllyGarden",
    "OpenTelemetry",
    "observability",
    "telemetry",
    "Insights",
    "Rose",
    "Tulip",
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
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;

  if (fromEnv) {
    return new URL(fromEnv);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
