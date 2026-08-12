export const siteConfig = {
  name: "OllyGarden",
  tagline: "Grow something beautiful",
  description:
    "OllyGarden helps you plan, nurture, and enjoy your garden with simple tools and expert guidance for every season.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ollygarden.com",
  locale: "en_US",
  language: "en",
  twitter: "@ollygarden",
  keywords: [
    "garden",
    "gardening",
    "plants",
    "landscaping",
    "home garden",
    "vegetable garden",
    "OllyGarden",
  ],
  author: "OllyGarden",
  email: "hello@ollygarden.com",
  routes: [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ],
} as const;

export type SiteRoute = (typeof siteConfig.routes)[number]["path"];
