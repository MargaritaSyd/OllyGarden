import type { NextConfig } from "next";
import { legacyBlogAssetRedirects } from "./src/lib/legacy-blog-assets";
import { siteConfig } from "./src/lib/site";

const permanentRedirects = [
  ["/product", "/products/insights"],
  ["/early-access", "/products/insights"],
  ["/insights", "/products/insights"],
  ["/tulip", "/products/insights"],
  ["/products/tulip", "/products/insights"],
  ["/rose", "/products/rose"],
  ["/about", "/company"],
  ["/docs", "https://docs.ollygarden.com"],
  ["/solutions", "/solutions/overview"],
  ["/solutions/retail", "/solutions/retail-ecommerce"],
  ["/kubecon-eu-2026", "/resources/blog/ollygarden-at-kubecon-eu-2026"],
  ["/kubecon-na-2026", "/resources/events/kubecon-na-2026"],
  ["/press", "/resources/press-releases"],
  [
    "/press/portel-april-2026",
    "/resources/press-releases/ollygarden-dash0-portel",
  ],
  ["/press/rose-kubecon-2026", "/resources/press-releases/ollygarden-rose-ga"],
  ["/blog", "/resources/blog"],
  ["/blog/:slug((?!rss\\.xml$).*)", "/resources/blog/:slug"],
  ["/resources/webinars", "/resources/webinars-conferences"],
  ["/resources/community", "/resources/events"],
  ["/otel-quiz/result/:score(\\d{1,2})", "/otel-quiz"],
  ["/trust-your-telemetry", "/resources/trust-your-telemetry"],
  ["/trust-your-telemetry/booth", "/resources/trust-your-telemetry/booth"],
  ["/trust-your-telemetry/result/:token", "/resources/trust-your-telemetry/result/:token"],
  ["/resources/trust-game", "/resources/trust-your-telemetry"],
  ["/resources/trust-game/booth", "/resources/trust-your-telemetry/booth"],
  ["/resources/trust-game/result/:token", "/resources/trust-your-telemetry/result/:token"],
  ["/careers/engineering-manager", "/careers"],
  ["/careers/executive-assistant", "/careers"],
  ["/careers/chief-of-staff", "/careers"],
  ["/careers/ai-software-engineer", "/careers"],
] as const;

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
      process.env.VITE_POSTHOG_API_KEY ??
      "",
  },
  async rewrites() {
    return [
      { source: "/api-docs", destination: "/agent-content/api-docs.md" },
      {
        source: "/api-versioning",
        destination: "/agent-content/api-versioning.md",
      },
      // Public .md files take precedence; any other page.md is its Markdown version.
      {
        source: "/:path((?!agent-content/).+)\\.md",
        destination: "/agent-content/:path.md",
      },
    ];
  },
  async redirects() {
    return [
      ...legacyBlogAssetRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
      ...permanentRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      {
        source: "/rss.xml",
        destination: siteConfig.blogFeedPath,
        statusCode: 301,
      },
      {
        source: "/feed.xml",
        destination: siteConfig.blogFeedPath,
        statusCode: 301,
      },
      {
        source: "/get-started",
        destination: siteConfig.appUrl,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.posthog.com https://*.i.posthog.com https://eu-assets.i.posthog.com https://assets.apollo.io https://js.hs-scripts.com https://js.hs-analytics.net https://js.hs-banner.com; connect-src 'self' https://*.posthog.com https://*.i.posthog.com https://eu.posthog.com https://eu.i.posthog.com wss://*.posthog.com https://*.supabase.co https://*.supabase.com https://aplo-evnt.com https://track.hubspot.com https://*.hs-banner.com; img-src 'self' data: blob: https:; media-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; worker-src 'self' blob:",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      ...[
        "/developers.md",
        "/cli.md",
        "/api-docs.md",
        "/api-versioning.md",
      ].map((source) => ({
        source,
        headers: [
          {
            key: "Content-Type",
            value: "text/markdown; charset=utf-8",
          },
        ],
      })),
    ];
  },
};

export default nextConfig;
