export const enterpriseHero = {
  badge: "OllyGarden for Enterprise Software",
  title: [
    "Help every engineer",
    "ship better telemetry",
    "— across thousands",
    "of repositories",
  ],
  lede: "Enterprise software companies instrument thousands of services across multi-tenant platforms. OllyGarden helps you improve instrumentation quality at scale, run a supported Collector, and give every developer the guidance they need to ship clean telemetry.",
  cta: "Talk to our Team",
} as const;

export const enterpriseMeta = {
  title: "Enterprise Software — OllyGarden Solutions",
  path: "/solutions/enterprise-software",
} as const;

export const enterprisePains = {
  eyebrow: "Enterprise Software Pain Points",
  titleLead: "Challenges we hear",
  titleRest: "every week",
  sub: "From dozens of customer interviews, these are the pain points that come up again and again.",
  glyph: "/images/solutions/financial/glyph.svg",
  cards: [
    {
      iconPath:
        "M25.3327 32.2003V21.3337C25.3327 20.6264 25.6136 19.9481 26.1137 19.4481C26.6138 18.948 27.2921 18.667 27.9993 18.667H38.666M38.666 18.667C39.0885 18.666 39.5071 18.7486 39.8975 18.9102C40.2879 19.0717 40.6425 19.309 40.9407 19.6083L45.7247 24.3923C46.024 24.6906 46.2613 25.0451 46.4228 25.4355C46.5844 25.8259 46.6671 26.2445 46.666 26.667M38.666 18.667V25.3337C38.666 25.6873 38.8065 26.0264 39.0565 26.2765C39.3066 26.5265 39.6457 26.667 39.9993 26.667H46.666M46.666 26.667V42.667C46.666 43.3742 46.3851 44.0525 45.885 44.5526C45.3849 45.0527 44.7066 45.3337 43.9993 45.3337H39.5327M26.666 37.3337L22.666 41.3337L26.666 45.3337M31.9993 45.3337L35.9993 41.3337L31.9993 37.3337",
      title: "Developer education at 3,000+ repo scale",
      body: "Inconsistent instrumentation across thousands of repositories means your platform team can never review everything manually.",
    },
    {
      iconPath:
        "M29.3333 30.6667V36C29.3333 36.7072 29.6143 37.3855 30.1144 37.8856C30.6145 38.3857 31.2928 38.6667 32 38.6667H37.3333M26.6667 20H32C33.4728 20 34.6667 21.1939 34.6667 22.6667V28C34.6667 29.4728 33.4728 30.6667 32 30.6667H26.6667C25.1939 30.6667 24 29.4728 24 28V22.6667C24 21.1939 25.1939 20 26.6667 20ZM40 33.3333H45.3333C46.8061 33.3333 48 34.5272 48 36V41.3333C48 42.8061 46.8061 44 45.3333 44H40C38.5272 44 37.3333 42.8061 37.3333 41.3333V36C37.3333 34.5272 38.5272 33.3333 40 33.3333Z",
      title: "Collector reliability at scale",
      body: "Running collectors across hundreds of thousands of nodes demands predictable releases, CVE backports, and commercial-grade support.",
    },
    {
      iconPath: [
        "M40.7143 31.0569C40.4643 31.307 40.3239 31.646 40.3239 31.9996C40.3239 32.3531 40.4643 32.6922 40.7143 32.9423L43.8823 36.1116C44.1323 36.3616 44.4714 36.502 44.8249 36.502C45.1785 36.502 45.5176 36.3616 45.7676 36.1116L48.9369 32.9423C49.1869 32.6922 49.3273 32.3531 49.3273 31.9996C49.3273 31.646 49.1869 31.307 48.9369 31.0569L45.7676 27.8876C45.5176 27.6376 45.1785 27.4972 44.8249 27.4972C44.4714 27.4972 44.1323 27.6376 43.8823 27.8876L40.7143 31.0569Z",
        "M23.0623 31.0569C22.8123 31.307 22.6719 31.646 22.6719 31.9996C22.6719 32.3531 22.8123 32.6922 23.0623 32.9423L26.2316 36.1116C26.4816 36.3616 26.8207 36.502 27.1743 36.502C27.5278 36.502 27.8669 36.3616 28.1169 36.1116L31.2863 32.9423C31.5362 32.6922 31.6766 32.3531 31.6766 31.9996C31.6766 31.646 31.5362 31.307 31.2863 31.0569L28.1169 27.8876C27.8669 27.6376 27.5278 27.4972 27.1743 27.4972C26.8207 27.4972 26.4816 27.6376 26.2316 27.8876L23.0623 31.0569Z",
        "M31.8876 39.8823C31.7636 40.0061 31.6653 40.1531 31.5982 40.315C31.5311 40.4769 31.4965 40.6504 31.4965 40.8256C31.4965 41.0008 31.5311 41.1743 31.5982 41.3362C31.6653 41.498 31.7636 41.6451 31.8876 41.7689L35.0569 44.9369C35.307 45.1869 35.646 45.3273 35.9996 45.3273C36.3531 45.3273 36.6922 45.1869 36.9423 44.9369L40.1116 41.7689C40.2356 41.6451 40.3339 41.498 40.401 41.3362C40.4681 41.1743 40.5026 41.0008 40.5026 40.8256C40.5026 40.6504 40.4681 40.4769 40.401 40.315C40.3339 40.1531 40.2356 40.0061 40.1116 39.8823L36.9423 36.7143C36.6922 36.4643 36.3531 36.3239 35.9996 36.3239C35.646 36.3239 35.307 36.4643 35.0569 36.7143L31.8876 39.8823Z",
        "M31.8876 22.2316C31.6376 22.4816 31.4972 22.8207 31.4972 23.1743C31.4972 23.5278 31.6376 23.8669 31.8876 24.1169L35.0569 27.2849C35.307 27.5349 35.646 27.6753 35.9996 27.6753C36.3531 27.6753 36.6922 27.5349 36.9423 27.2849L40.1116 24.1169C40.3616 23.8669 40.502 23.5278 40.502 23.1743C40.502 22.8207 40.3616 22.4816 40.1116 22.2316L36.9423 19.0623C36.6922 18.8123 36.3531 18.6719 35.9996 18.6719C35.646 18.6719 35.307 18.8123 35.0569 19.0623L31.8876 22.2316Z",
      ].join(" "),
      title: "Multi-tenant telemetry complexity",
      body: "Routing telemetry correctly across tenants, environments, and regions adds layers of configuration that are hard to validate.",
    },
    {
      iconPath:
        "M46.6673 33.3333C46.6673 39.9999 42.0007 43.3333 36.454 45.2666C36.1635 45.365 35.848 45.3603 35.5607 45.2533C30.0007 43.3333 25.334 39.9999 25.334 33.3333V23.9999C25.334 23.6463 25.4745 23.3072 25.7245 23.0571C25.9746 22.8071 26.3137 22.6666 26.6673 22.6666C29.334 22.6666 32.6673 21.0666 34.9873 19.0399C35.2698 18.7986 35.6291 18.666 36.0007 18.666C36.3722 18.666 36.7315 18.7986 37.014 19.0399C39.3473 21.0799 42.6673 22.6666 45.334 22.6666C45.6876 22.6666 46.0267 22.8071 46.2768 23.0571C46.5268 23.3072 46.6673 23.6463 46.6673 23.9999V33.3333Z",
      title: "Security reviews blocking SaaS adoption",
      body: "Internal security teams require lengthy reviews before adopting any new SaaS tool, slowing down telemetry quality improvements.",
    },
  ],
} as const;

export const enterpriseStats = {
  eyebrow: "Interviews with Companies",
  title: "What we’ve learned from the field",
  sub: "Anonymized data points from our customer interviews — the scale and challenges are real.",
  cards: [
    {
      eyebrow: "noise traces",
      end: 94,
      suffix: "%",
      sep: false,
      body: "One integration platform discovered that 94% of their traces were operational noise from internal service calls, obscuring real customer issues",
    },
    {
      eyebrow: "service names",
      end: 4000,
      suffix: "+",
      sep: true,
      body: "A platform generates over 4,000 dynamically created service names, making instrumentation tracking nearly impossible without automation",
    },
    {
      eyebrow: "annotation bloat",
      end: 50,
      prefix: "~",
      suffix: " MB",
      sep: false,
      body: "A software company found ~50 MB of vendor-injected annotation payloads per batch, inflating telemetry costs with zero observability value",
    },
  ],
} as const;

export const enterpriseProducts = {
  eyebrow: "Products & Services",
  title: "How OllyGarden helps",
  sub: "Purpose-built tools to improve telemetry quality, manage your pipeline, and support your collectors.",
  glyph: "/images/solutions/financial/target.svg",
  cards: [
    {
      href: "/products/rose",
      icon: "/images/solutions/financial/rose.svg",
      family: "OllyGarden Rose",
      title: "Rose",
      body: "AI-powered instrumentation guidance that scales across thousands of repositories, helping every developer ship better telemetry.",
    },
    {
      href: "/products/tulip",
      icon: "/images/solutions/financial/tulip.svg",
      family: "OllyGarden Tulip",
      title: "Tulip",
      body: "Commercially supported Collector distribution with predictable releases, CVE backports, and patch guarantees — built for enterprise demands.",
    },
    {
      href: "/products/insights",
      icon: "/images/solutions/financial/insights.svg",
      family: "OllyGarden Insights",
      title: "Insights",
      body: "Score and track instrumentation quality at the organizational level. Identify patterns and set standards across your entire platform.",
    },
  ],
} as const;

export const enterpriseCta = {
  title: ["Ready to take control", "of your telemetry?"],
  sub: "Tell us about your enterprise software telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;
