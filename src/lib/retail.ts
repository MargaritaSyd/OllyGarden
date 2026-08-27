export const retailHero = {
  badge: "OllyGarden for Retail & E-commerce",
  title: [
    "Manage telemetry at",
    "retail scale — from",
    "100K collectors to",
    "billions of spans",
  ],
  lede: "Retail and e-commerce platforms operate at a scale where telemetry noise drowns out signal. OllyGarden helps you improve instrumentation quality, run a supported Collector, and cut through noise so your telemetry pipeline stays reliable across every release.",
  cta: "Talk to our Team",
} as const;

export const retailMeta = {
  title: "Retail & E-commerce — OllyGarden Solutions",
  path: "/solutions/retail-ecommerce",
} as const;

export const retailPains = {
  eyebrow: "Retail & E-commerce Pain Points",
  titleLead: "Challenges we hear",
  titleRest: "every week",
  sub: "From dozens of customer interviews, these are the pain points that come up again and again.",
  glyph: "/images/solutions/financial/glyph.svg",
  cards: [
    {
      iconPath:
        "M22.666 31.9998C22.6654 32.2548 22.7379 32.5047 22.875 32.7198C23.012 32.9348 23.2079 33.106 23.4394 33.2132L34.906 38.4265C35.2516 38.583 35.6266 38.6639 36.006 38.6639C36.3854 38.6639 36.7604 38.583 37.106 38.4265L48.546 33.2265C48.782 33.1204 48.9821 32.9479 49.1218 32.7301C49.2614 32.5123 49.3347 32.2586 49.3327 31.9998M22.666 38.6665C22.6654 38.9215 22.7379 39.1714 22.875 39.3864C23.012 39.6015 23.2079 39.7727 23.4394 39.8798L34.906 45.0932C35.2516 45.2497 35.6266 45.3306 36.006 45.3306C36.3854 45.3306 36.7604 45.2497 37.106 45.0932L48.546 39.8932C48.782 39.7871 48.9821 39.6146 49.1218 39.3968C49.2614 39.179 49.3347 38.9252 49.3327 38.6665M37.106 18.9065C36.7586 18.748 36.3812 18.666 35.9994 18.666C35.6175 18.666 35.2401 18.748 34.8927 18.9065L23.466 24.1065C23.2294 24.2108 23.0283 24.3817 22.887 24.5983C22.7458 24.8149 22.6706 25.0679 22.6706 25.3265C22.6706 25.5851 22.7458 25.8381 22.887 26.0547C23.0283 26.2713 23.2294 26.4422 23.466 26.5465L34.906 31.7598C35.2534 31.9183 35.6308 32.0003 36.0127 32.0003C36.3945 32.0003 36.7719 31.9183 37.1194 31.7598L48.5594 26.5598C48.796 26.4555 48.9971 26.2846 49.1383 26.068C49.2796 25.8514 49.3547 25.5984 49.3547 25.3398C49.3547 25.0812 49.2796 24.8282 49.1383 24.6116C48.9971 24.395 48.796 24.2242 48.5594 24.1198L37.106 18.9065Z",
      title: "Fleet management at 100K+ collectors",
      body: "Deploying, configuring, and upgrading tens of thousands of collectors across regions and environments is a full-time operations challenge.",
    },
    {
      iconPath:
        "M35.9993 37.3333V44M41.3327 35.5187V44M46.666 30.208V44M49.3327 20L37.8047 31.528C37.7428 31.5901 37.6692 31.6393 37.5882 31.6729C37.5072 31.7066 37.4204 31.7239 37.3327 31.7239C37.245 31.7239 37.1582 31.7066 37.0772 31.6729C36.9962 31.6393 36.9226 31.5901 36.8607 31.528L32.4713 27.1387C32.3463 27.0137 32.1768 26.9435 32 26.9435C31.8232 26.9435 31.6537 27.0137 31.5287 27.1387L22.666 36M25.3327 40.6173V44M30.666 35.5413V44",
      title: "Up to 90% noise in key services",
      body: "Without intelligent sampling and filtering, specific services can generate up to 90% noise — driving up costs without improving signal.",
    },
    {
      iconPath:
        "M38.6667 21.3333C38.6667 20.9797 38.8071 20.6406 39.0572 20.3905C39.3072 20.1405 39.6464 20 40 20M40 29.3333C39.6464 29.3333 39.3072 29.1929 39.0572 28.9428C38.8071 28.6928 38.6667 28.3536 38.6667 28M48 21.3333C48 20.9797 47.8595 20.6406 47.6095 20.3905C47.3594 20.1405 47.0203 20 46.6667 20M48 28C48 28.3536 47.8595 28.6928 47.6095 28.9428C47.3594 29.1929 47.0203 29.3333 46.6667 29.3333M32 25.3333L28 29.3333L24 25.3333M28 29.3333L28 22.6667C28 21.9594 28.281 21.2811 28.781 20.781C29.2811 20.281 29.9594 20 30.6667 20H33.3333M25.3333 34.6667H32C32.7364 34.6667 33.3333 35.2636 33.3333 36V42.6667C33.3333 43.403 32.7364 44 32 44H25.3333C24.597 44 24 43.403 24 42.6667V36C24 35.2636 24.597 34.6667 25.3333 34.6667Z",
      title: "Breaking changes across collector versions",
      body: "Upstream collector releases can introduce breaking changes. At scale, an unplanned upgrade can cascade into production incidents.",
    },
    {
      iconPath:
        "M35.9993 25.3333V44M35.9993 25.3333C35.9993 23.9188 35.4374 22.5623 34.4373 21.5621C33.4371 20.5619 32.0805 20 30.666 20H23.9993C23.6457 20 23.3066 20.1405 23.0565 20.3905C22.8065 20.6406 22.666 20.9797 22.666 21.3333V38.6667C22.666 39.0203 22.8065 39.3594 23.0565 39.6095C23.3066 39.8595 23.6457 40 23.9993 40H31.9993C33.0602 40 34.0776 40.4214 34.8278 41.1716C35.5779 41.9217 35.9993 42.9391 35.9993 44M35.9993 25.3333C35.9993 23.9188 36.5613 22.5623 37.5614 21.5621C38.5616 20.5619 39.9182 20 41.3327 20H47.9993C48.353 20 48.6921 20.1405 48.9422 20.3905C49.1922 20.6406 49.3327 20.9797 49.3327 21.3333V38.6667C49.3327 39.0203 49.1922 39.3594 48.9422 39.6095C48.6921 39.8595 48.353 40 47.9993 40H39.9993C38.9385 40 37.9211 40.4214 37.1709 41.1716C36.4208 41.9217 35.9993 42.9391 35.9993 44",
      title: "Developer education gap",
      body: "Application teams instrument inconsistently. Without guidance, the platform team becomes a bottleneck for every telemetry question.",
    },
  ],
} as const;

export const retailStats = {
  eyebrow: "Interviews with Companies",
  title: "What we’ve learned from the field",
  sub: "Anonymized data points from our customer interviews — the scale and challenges are real.",
  cards: [
    {
      eyebrow: "collectors",
      end: 100000,
      suffix: "+",
      sep: true,
      body: "Deployed by a single global retailer across regions, clouds, and on-prem environments",
    },
    {
      eyebrow: "spans per day",
      end: 750,
      suffix: " TB",
      sep: false,
      body: "Produced by one e-commerce platform before any sampling or filtering optimization",
    },
    {
      eyebrow: "noise",
      end: 90,
      suffix: "%",
      sep: false,
      body: "One retailer found up to 90% of telemetry from key services was pure noise, burying actionable signals",
    },
  ],
} as const;

export const retailProducts = {
  eyebrow: "Products & Services",
  title: "How OllyGarden helps",
  sub: "Purpose-built tools to improve telemetry quality, manage your pipeline, and support your collectors.",
  glyph: "/images/solutions/financial/target.svg",
  cards: [
    {
      href: "/products/tulip",
      icon: "/images/solutions/financial/tulip.svg",
      family: "OllyGarden Tulip",
      title: "Tulip",
      body: "Run a curated, commercially supported Collector with predictable quarterly releases and patch guarantees — even at 100K+ scale.",
    },
    {
      href: "/products/insights",
      icon: "/images/solutions/financial/insights.svg",
      family: "OllyGarden Insights",
      title: "Insights",
      body: "Score instrumentation quality across thousands of services. Identify noise sources, missing context, and sampling opportunities.",
    },
    {
      href: "/products/rose",
      icon: "/images/solutions/financial/rose.svg",
      family: "OllyGarden Rose",
      title: "Rose",
      body: "AI-powered instrumentation guidance that scales developer education beyond your platform team.",
    },
  ],
} as const;

export const retailCta = {
  title: ["Ready to take control", "of your telemetry?"],
  sub: "Tell us about your retail and e-commerce telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;
