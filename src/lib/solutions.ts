export const solutionsHero = {
  badge: "OllyGarden for Industry",
  titleLead: "Clean telemetry",
  titleRest: "for your industry",
  lede: "Every industry has unique telemetry challenges — from PII in traces to 100K-collector deployments. We’ve talked to dozens of teams to understand what matters most and built tools that improve telemetry quality at the source.",
} as const;

export const solutionsMeta = {
  title: "OllyGarden Solutions — Clean telemetry for your industry",
  path: "/solutions/overview",
} as const;

export const solutionIndustries = [
  {
    href: "/solutions/financial-services",
    badge: "Finance Industry",
    title: "Financial Services",
    image: "/images/solutions/financial.webp",
    imageWidth: 1240,
    imageHeight: 647,
    flip: false,
    body: "Financial institutions generate massive volumes of telemetry while navigating strict compliance, PII controls, and vendor lock-in. OllyGarden helps you improve telemetry quality at the source and take control of your pipeline without compromising on security or cost.",
  },
  {
    href: "/solutions/retail-ecommerce",
    badge: "Commerce Industry",
    title: "Retail & E-commerce",
    image: "/images/solutions/ecommerce.webp",
    imageWidth: 1240,
    imageHeight: 654,
    flip: true,
    body: "Retail and e-commerce platforms live or die by peak-season reliability. Noisy, inconsistent telemetry hides the failures that cost revenue at checkout. OllyGarden helps you clean up instrumentation at the source, so your signals stay trustworthy when traffic spikes the most.",
  },
  {
    href: "/solutions/enterprise-software",
    badge: "Software Industry",
    title: "Enterprise Software",
    image: "/images/solutions/software.webp",
    imageWidth: 1240,
    imageHeight: 654,
    flip: false,
    body: "Enterprise software companies instrument thousands of services across multi-tenant platforms. OllyGarden helps you improve instrumentation quality at scale, run a supported Collector, and give every developer the guidance they need to ship clean telemetry.",
  },
] as const;

export type SolutionIndustry = (typeof solutionIndustries)[number];
