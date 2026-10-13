import { siteConfig } from "@/lib/site";

export const legalEntities = {
  inc: {
    name: siteConfig.legalName,
    address: ["251 Little Falls Drive", "Wilmington, DE 19808", "United States"],
    representative: "Juraci Paixão Kröhling, Chief Executive Officer",
  },
  gmbh: {
    name: "OllyGarden GmbH",
    address: ["Hauptstr. 14", "13158 Berlin", "Germany"],
    managingDirector: "Juraci Paixão Kröhling",
    register: "Commercial register of the Amtsgericht Charlottenburg, HRB 271260 B",
    vatId: "DE458644588",
  },
} as const;

export const legalContacts = {
  privacy: "support@ollygarden.com",
  security: "security@ollygarden.com",
} as const;

export const supervisoryAuthority = {
  name: "Berlin Commissioner for Data Protection and Freedom of Information",
  localName: "Berliner Beauftragte für Datenschutz und Informationsfreiheit",
  url: "https://www.datenschutz-berlin.de",
} as const;

type Subprocessor = {
  name: string;
  purpose: string;
  location: string;
};

type SubprocessorGroup = {
  title: string;
  description: string;
  entries: Subprocessor[];
};

/** Metadata for every legal page; drives page metadata, JSON-LD, "Last Updated", sitemap, and agent content. */
export const legalPages = {
  "/terms-of-use": {
    title: "Terms of Use",
    description:
      "The terms that govern your use of OllyGarden Insights and the OllyGarden website, including subscriptions, fees, acceptable use, liability, and support.",
    updated: "2026-09-26",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "What personal data OllyGarden collects on its website and platform, why, which providers process it, how long we keep it, and your rights under the GDPR.",
    updated: "2026-10-07",
  },
  "/data-protection-policy": {
    title: "Data Protection Policy",
    description:
      "The technical and organizational controls OllyGarden uses to protect customer data: encryption, access control, tenant isolation, monitoring, and deletion.",
    updated: "2026-06-03",
  },
  "/rose-terms-of-service": {
    title: "Rose Terms of Service",
    description:
      "The terms of service that govern your use of OllyGarden Rose, the AI engineer for OpenTelemetry instrumentation.",
    updated: "2026-09-30",
  },
  "/subprocessors": {
    title: "Subprocessors",
    description:
      "Every third party that processes OllyGarden customer data for Insights and Rose, what each one does, and where it processes the data.",
    updated: "2026-10-06",
  },
  "/security": {
    title: "Security",
    description:
      "How OllyGarden protects customer data with SOC 2 Type II controls, Rose execution safeguards, and encryption, and how to report a vulnerability.",
    updated: "2026-09-30",
  },
  "/imprint": {
    title: "Imprint",
    description:
      "Legal information about OllyGarden, Inc. and its German establishment, OllyGarden GmbH in Berlin: addresses, commercial register, VAT ID, and contact.",
    updated: "2026-09-25",
  },
} as const;

export type LegalPath = keyof typeof legalPages;

export function lastUpdated(path: LegalPath): string {
  return `Last Updated: ${new Date(legalPages[path].updated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })}`;
}

/** Recipients of website visitor and business contact data, listed in the privacy notice. */
export const websiteProcessors: [string, string][] = [
  ["Netlify", "Website hosting and delivery"],
  ["Supabase (EU)", "Storage of website form submissions"],
  ["Resend", "Delivery of form submissions to our team by email"],
  ["PostHog (EU)", "Website analytics"],
  ["Apollo.io", "Identification of visiting organizations, business contact data, sales outreach"],
  ["HubSpot", "Customer relationship management"],
  ["Google Workspace", "Email and documents"],
];

/** Third parties that process customer data on OllyGarden's behalf. */
export const subprocessorGroups: SubprocessorGroup[] = [
  {
    title: "Platform infrastructure",
    description: "Used by Insights and Rose to host and operate the OllyGarden platform.",
    entries: [
      {
        name: "Google Cloud Platform",
        purpose: "Hosting, storage, and encryption keys for the platform and telemetry analysis",
        location: "Netherlands (europe-west4)",
      },
      {
        name: "Amazon Web Services",
        purpose: "Cloud infrastructure",
        location: "Germany (eu-central-1)",
      },
      {
        name: "Supabase",
        purpose: "Application database",
        location: "Germany (eu-central-1), Sweden (eu-north-1) for Rose",
      },
      {
        name: "ClickHouse",
        purpose: "Telemetry analysis database",
        location: "Netherlands (Google Cloud europe-west4)",
      },
      {
        name: "Cloudflare",
        purpose: "DNS, network protection, and the Rose control plane",
        location: "Global network; Rose control-plane services use the EU jurisdiction",
      },
      {
        name: "Netlify",
        purpose: "Delivery of the web application",
        location: "United States, global edge network",
      },
      {
        name: "Clerk",
        purpose: "User authentication",
        location: "United States",
      },
      {
        name: "Stripe",
        purpose: "Billing and payment processing",
        location: "United States",
      },
      {
        name: "Resend",
        purpose: "Transactional email",
        location: "United States",
      },
      {
        name: "PostHog",
        purpose: "Product analytics, session recordings with masked text, and error monitoring",
        location: "EU (Germany)",
      },
      {
        name: "Datadog",
        purpose: "Monitoring of our own services; Rose traces can include excerpts of analyzed code",
        location: "EU (datadoghq.eu)",
      },
      {
        name: "Google (Gemini API)",
        purpose: "AI-generated summaries of Insights findings",
        location: "United States",
      },
      {
        name: "Grafana Labs",
        purpose:
          "Monitoring of our own services and on-call alerting; Rose traces can include excerpts of analyzed code",
        location: "United Kingdom (London)",
      },
    ],
  },
  {
    title: "Rose",
    description:
      "Used by the managed GitHub App when Rose analyzes a connected repository. Locations describe the default configuration; an agreed EU-only configuration covers AI processing, managed sandboxes, storage, and telemetry.",
    entries: [
      {
        name: "GitHub",
        purpose: "Source of repository code and destination for Rose issues and pull requests",
        location: "As configured by the customer with GitHub",
      },
      {
        name: "E2B",
        purpose: "Isolated sandboxes that clone and analyze repositories",
        location: "Managed United States region by default; no more-specific subregion is pinned",
      },
      {
        name: "OpenRouter",
        purpose:
          "Gateway for OpenAI and Anthropic model requests; optional EU and zero-data-retention routing",
        location: "Provider-managed by default; EU endpoints under an agreed EU-only configuration",
      },
      {
        name: "Amazon Web Services (Bedrock)",
        purpose: "Hosting for some Anthropic model inference",
        location: "Provider-managed by default",
      },
      {
        name: "OpenAI",
        purpose: "AI model inference through OpenRouter",
        location: "Provider-managed by default; EU endpoints under an agreed EU-only configuration",
      },
    ],
  },
  {
    title: "Support and business operations",
    description: "Used when customers contact us or work with our team.",
    entries: [
      {
        name: "Google Workspace",
        purpose: "Email and documents",
        location: "United States, EU",
      },
      {
        name: "Slack",
        purpose: "Shared support channels and internal communication",
        location: "United States",
      },
      {
        name: "HubSpot",
        purpose: "Customer relationship management",
        location: "United States, EU",
      },
    ],
  },
];
