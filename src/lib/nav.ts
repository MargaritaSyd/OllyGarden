export type MenuIconName =
  | "insights"
  | "rose"
  | "tulip"
  | "polder"
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
    href: "/products/tulip",
    label: "Tulip",
    heading: "OllyGarden Tulip",
    description: "Run OpenTelemetry Collector with confidence.",
    icon: "tulip",
  },
  {
    href: "/products/insights",
    label: "Insights",
    heading: "OllyGarden Insights",
    description: "Analyze and score telemetry quality.",
    icon: "insights",
  },
  {
    href: "/products/polder",
    label: "Polder",
    heading: "OllyGarden Polder",
    description: "Coming soon!",
    icon: "polder",
    soon: true,
  },
];

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
  { href: "/resources", label: "Docs", soon: true },
  { href: "/resources/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

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

const headerResourceCommunity: NavLink = {
  href: "/resources/community",
  label: "Community & Events",
  description: "Meet the team at talks, meetups, and conferences.",
};

const headerResourceKnowledge: NavLink = {
  href: "/resources",
  label: "OllyGarden Knowledge",
  description: "Guides and references for every product.",
};

const headerResourcePress: NavLink = {
  href: "/resources/press-releases",
  label: "Press Releases",
  description: "Announcements and news from OllyGarden.",
};

const headerResourceFaq: NavLink = {
  href: "/resources/faq",
  label: "FAQ",
  description: "Answers to the questions we hear most.",
};

export const headerResourceColumns = {
  primary: [headerResourceBlog, headerResourceWebinars],
  secondary: [headerResourceCommunity, headerResourceKnowledge],
  tertiary: [headerResourcePress, headerResourceFaq],
} as const;

export const headerResourceLinks: NavLink[] = [
  headerResourceBlog,
  headerResourceWebinars,
  headerResourceCommunity,
  headerResourceKnowledge,
  headerResourcePress,
  headerResourceFaq,
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
    href: "/resources/blog/the-scrape-interval-nobody-chose",
    category: "Blog",
    date: "July 31, 2026",
    source: "OllyGarden",
    title: "The Scrape Interval Nobody Chose",
    image: "/images/blog/the-scrape-interval-nobody-chose.png",
    imageAlt: "Cover illustration for “The Scrape Interval Nobody Chose”",
  },
  {
    href: "/resources/webinars-conferences",
    category: "Webinars & Conferences",
    date: "July 30, 2026",
    source: "YouTube",
    sourceIcon: "youtube",
    title: "‘I Know OTel’ — Giving Expert-Level OTel Knowledge to Your AI Agents",
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
  { href: "/company", label: "Press" },
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
  { href: "#", label: "Terms & Conditions", hash: true },
  { href: "#", label: "Rose Terms of Service", hash: true },
  { href: "#", label: "Privacy Policy", hash: true },
];

export const headerMenus: NavGroup[] = [
  { id: "products", label: "Products", items: productLinks },
  { id: "solutions", label: "Solutions", items: solutionLinks },
  { id: "resources", label: "Resources", items: headerResourceLinks },
  { id: "company", label: "Company", items: headerCompanyLinks },
];

const footerProductHrefs = [
  "/products/rose",
  "/products/tulip",
  "/products/insights",
] as const;

export const footerColumns: NavGroup[] = [
  {
    id: "products",
    label: "Products",
    items: footerProductHrefs.flatMap((href) =>
      productLinks.filter((link) => link.href === href && !link.soon),
    ),
  },
  {
    id: "solutions",
    label: "Solutions",
    items: solutionLinks.filter((link) => link.href !== "/solutions/overview"),
  },
  { id: "resources", label: "Resources", items: resourceLinks },
  { id: "company", label: "Company", items: companyLinks },
  { id: "legal", label: "Legal", items: legalLinks },
];
