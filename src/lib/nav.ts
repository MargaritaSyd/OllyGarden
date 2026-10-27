import { siteConfig } from "@/lib/site";
import { trustGamePath } from "@/lib/trust-game/score";

export type MenuIconName =
  | "insights"
  | "rose"
  // | "polder"
  | "overview"
  | "financial"
  | "retail"
  | "enterprise"
  | "blog"
  | "docs"
  | "quiz"
  | "community"
  | "sprout"
  | "contact"
  | "careers";

export type NavLink = {
  href: string;
  label: string;
  description?: string;
  heading?: string;
  icon?: MenuIconName;
  soon?: boolean;
  hash?: boolean;
};

export type NavGroup = {
  id: string;
  label: string;
  href?: string;
  items: NavLink[];
};

export const productLinks: NavLink[] = [
  {
    href: "/products/rose",
    label: "Rose",
    heading: "OllyGarden Rose",
    description: "Fix instrumentation at the source.",
    icon: "rose",
  },
  {
    href: "/products/insights",
    label: "Insights",
    heading: "OllyGarden Insights",
    description: "Analyze and score telemetry quality.",
    icon: "insights",
  },
  // Polder is not announced yet. Re-enable when it launches.
  // {
  //   href: "/products/polder",
  //   label: "Polder",
  //   heading: "OllyGarden Polder",
  //   description: "Coming soon!",
  //   icon: "polder",
  //   soon: true,
  // },
];

/** Top-level header link, shown after the menus. */
export const pricingLink: NavLink = { href: "/pricing", label: "Pricing" };

export const solutionLinks: NavLink[] = [
  {
    href: "/solutions/overview",
    label: "Overview",
    description: "See how OllyGarden helps your industry.",
    icon: "overview",
  },
  {
    href: "/solutions/financial-services",
    label: "Financial Services",
    description: "Compliant telemetry with PII protection.",
    icon: "financial",
  },
  {
    href: "/solutions/retail-ecommerce",
    label: "Retail & E-commerce",
    description: "Telemetry quality at massive scale.",
    icon: "retail",
  },
  {
    href: "/solutions/enterprise-software",
    label: "Enterprise Software",
    description: "Clean telemetry across thousands of repos.",
    icon: "enterprise",
  },
];

export const resourceLinks: NavLink[] = [
  { href: "/resources", label: "All Resources" },
  { href: siteConfig.docsUrl, label: "Docs" },
  { href: "/resources/blog", label: "Blog" },
  { href: "/resources/webinars-conferences", label: "Webinars" },
  { href: "/resources/events", label: "Events" },
  { href: "/resources/case-studies", label: "Case Studies" },
  { href: "/resources/telemetry-quality", label: "Telemetry Quality" },
  { href: "/resources/instrumentation-score", label: "Instrumentation Score" },
  { href: "/resources/agent-skills", label: "Agent Skills" },
  { href: "/resources/faq", label: "FAQ" },
  { href: "/otel-quiz", label: "OTel Quiz" },
  { href: trustGamePath, label: "Trust Your Telemetry?" },
  { href: "/contact", label: "Contact" },
];

const headerResourceDocs: NavLink = {
  href: siteConfig.docsUrl,
  label: "Docs",
  description: "Product guides and the API reference.",
};

const headerResourceBlog: NavLink = {
  href: "/resources/blog",
  label: "Blog",
  description: "Field notes on OpenTelemetry and telemetry health.",
};

const headerResourceWebinars: NavLink = {
  href: "/resources/webinars-conferences",
  label: "Webinars & Conferences",
  description: "Watch deep dives, demos, and conference talks.",
};

const headerResourceEvents: NavLink = {
  href: "/resources/events",
  label: "Events",
  description: "Meet the team at talks, meetups, and conferences.",
};

const headerResourcePress: NavLink = {
  href: "/resources/press-releases",
  label: "Press Releases",
  description: "Announcements and news from OllyGarden.",
};

const headerResourceCaseStudies: NavLink = {
  href: "/resources/case-studies",
  label: "Case Studies",
  description: "Anonymized, real stories with the numbers that moved.",
};

const headerResourceQuality: NavLink = {
  href: "/resources/telemetry-quality",
  label: "Telemetry Quality",
  description: "What good telemetry is, and the signs it is not.",
};

const headerResourceScore: NavLink = {
  href: "/resources/instrumentation-score",
  label: "Instrumentation Score",
  description: "The open 0–100 score for instrumentation quality.",
};

const headerResourceSkills: NavLink = {
  href: "/resources/agent-skills",
  label: "Agent Skills",
  description: "Open source OpenTelemetry skills for coding agents.",
};

const headerResourceFaq: NavLink = {
  href: "/resources/faq",
  label: "FAQ",
  description: "Answers to the questions we hear most.",
};

const headerResourceQuiz: NavLink = {
  href: "/otel-quiz",
  label: "OTel Quiz",
  description: "Ten questions that challenge even OpenTelemetry maintainers.",
};

const headerResourceTrustGame: NavLink = {
  href: trustGamePath,
  label: "Trust Your Telemetry?",
  description: "Real telemetry and the conclusions drawn from it. Which hold up?",
};

export const headerResourceLinks: NavLink[] = [
  headerResourceDocs,
  headerResourceBlog,
  headerResourceCaseStudies,
  headerResourceWebinars,
  headerResourceEvents,
  headerResourcePress,
  headerResourceQuality,
  headerResourceScore,
  headerResourceSkills,
  headerResourceFaq,
  headerResourceQuiz,
  headerResourceTrustGame,
];

export type FeaturedResource = {
  href: string;
  category: string;
  date: string;
  source: string;
  sourceIcon?: "youtube";
  title: string;
  image: string;
  imageAlt: string;
};

export const featuredResources: FeaturedResource[] = [
  {
    href: "/resources/blog/opentelemetry-vendor-lock-in-since-2024",
    category: "Blog",
    date: "August 21, 2026",
    source: "OllyGarden",
    title: "What's changed about OpenTelemetry vendor lock-in since 2024",
    image: "/images/blog/opentelemetry-vendor-lock-in-since-2024.png",
    imageAlt:
      "Cover illustration for “What's changed about OpenTelemetry vendor lock-in since 2024”",
  },
  {
    href: "/resources/webinars-conferences",
    category: "Webinars & Conferences",
    date: "July 30, 2026",
    source: "YouTube",
    sourceIcon: "youtube",
    title:
      "‘I Know OTel’ — Giving Expert-Level OTel Knowledge to Your AI Agents",
    image: "/images/blog/teach-your-coding-agent-opentelemetry.png",
    imageAlt: "‘I Know OTel’ video thumbnail",
  },
  {
    href: "/resources/blog/teach-your-coding-agent-opentelemetry",
    category: "Blog",
    date: "July 14, 2026",
    source: "OllyGarden",
    title: "Teach Your Coding Agent OpenTelemetry",
    image: "/images/blog/teach-your-coding-agent-opentelemetry.png",
    imageAlt: "Cover illustration for “Teach Your Coding Agent OpenTelemetry”",
  },
];

export const companyLinks: NavLink[] = [
  { href: "/company", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/resources/press-releases", label: "Press" },
];

export const headerCompanyLinks: NavLink[] = [
  {
    href: "/company",
    label: "Our Company",
    description: "Meet the team cultivating clarity in observability.",
    icon: "sprout",
  },
  {
    href: "/contact",
    label: "Contact Us",
    description: "Questions? We would love to hear from you.",
    icon: "contact",
  },
  {
    href: "/careers",
    label: "Careers",
    description: "Join us and help grow the garden.",
    icon: "careers",
  },
];

export const legalLinks: NavLink[] = [
  { href: "/terms-of-use", label: "Terms & Conditions" },
  { href: "/rose-terms-of-service", label: "Rose Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/data-protection-policy", label: "Data Protection Policy" },
  { href: "/subprocessors", label: "Subprocessors" },
  { href: "/security", label: "Security" },
  { href: "/imprint", label: "Imprint" },
];

export const headerMenus: NavGroup[] = [
  { id: "products", label: "Products", items: productLinks },
  { id: "solutions", label: "Solutions", items: solutionLinks },
  { id: "resources", label: "Resources", items: headerResourceLinks },
  { id: "company", label: "Company", items: headerCompanyLinks },
];

export const productHrefs = [
  "/products/rose",
  "/products/insights",
] as const;

export type ProductHref = (typeof productHrefs)[number];

/** The product's menu entry, which every product mention reuses for its name and pitch. */
export function getProductLink(href: ProductHref) {
  const link = productLinks.find((item) => item.href === href);
  if (!link?.icon || !link.heading || !link.description) {
    throw new Error(`No product link for ${href}`);
  }
  return { ...link, icon: link.icon, heading: link.heading, description: link.description };
}

export const footerColumns: NavGroup[] = [
  {
    id: "products",
    label: "Products",
    items: [
      ...productHrefs.flatMap((href) =>
        productLinks.filter((link) => link.href === href && !link.soon),
      ),
      pricingLink,
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    items: solutionLinks,
  },
  { id: "resources", label: "Resources", items: resourceLinks },
  { id: "company", label: "Company", items: companyLinks },
  { id: "legal", label: "Legal", items: legalLinks },
];
