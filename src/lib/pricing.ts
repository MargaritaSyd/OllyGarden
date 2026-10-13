import type { FaqContent } from "@/lib/faq";
import { insightsPlans } from "@/lib/insights";
import { rosePlans } from "@/lib/rose";
import { siteConfig } from "@/lib/site";

const insightsFree = insightsPlans.cards[0];
const insightsEssentials = insightsPlans.cards[1];

export const pricingMeta = {
  title: "OllyGarden Pricing — Insights and Rose plans",
  description: `Compare OllyGarden Insights and Rose plans: free tiers with no credit card, Insights Essentials at ${insightsEssentials.price}/month, and custom Enterprise pricing.`,
  path: "/pricing",
} as const;

export const pricingHero = {
  badge: "Pricing",
  title: "Plans for better telemetry",
  lede: "Measure the quality of your OpenTelemetry data with Insights, and fix instrumentation at the source with Rose. Both start free, with no credit card required.",
  jumps: [
    {
      href: "#insights",
      label: "Insights",
      note: "Score and analyze production telemetry",
    },
    {
      href: "#rose",
      label: "Rose",
      note: "Review and fix instrumentation in code",
    },
  ],
} as const;

export const pricingInsights = {
  eyebrow: "OllyGarden Insights",
  title: "Measure telemetry quality",
  sub: `Insights analyzes the traces, metrics, and logs your services already send and scores them with the Instrumentation Score. ${insightsPlans.sub}`,
  href: "/products/insights",
  link: "Learn more about Insights",
} as const;

export const pricingRose = {
  eyebrow: "OllyGarden Rose",
  title: "Fix instrumentation at the source",
  sub: `Rose reviews your repositories and opens pull requests that fix missing or low-value instrumentation. ${rosePlans.sub}`,
  href: "/products/rose",
  link: "Learn more about Rose",
} as const;

export const pricingFaq: FaqContent = {
  title: "Pricing questions",
  sub: "What each plan includes, and how billing works.",
  items: [
    {
      q: "Do Insights and Rose have free plans?",
      a: `Yes. The Insights Free plan costs ${insightsFree.price}/month and includes the Instrumentation Score and 2 insights, including suspicious PII leaks, for unlimited seats and services. The Rose Free plan covers up to ${rosePlans.free.repositories} repositories with a weekly automatic instrumentation review. Neither needs a credit card.`,
    },
    {
      q: "What does Insights Essentials add?",
      a: `Insights Essentials costs ${insightsEssentials.price}/month and adds all OllyGarden Insights, priority email support, and API access, with unlimited seats and services.`,
    },
    {
      q: "How much do extra Rose repositories cost?",
      a: `The Rose Free plan includes ${rosePlans.free.repositories} repositories. Each additional repository costs ${rosePlans.free.extraRepositoryPrice}/month.`,
    },
    {
      q: "Is Rose free for open source projects?",
      a: "Yes. Approved open source projects get Rose with unlimited public repositories, and CNCF projects get priority access. Apply from this page with a public GitHub repository; access is granted upon review.",
    },
    {
      q: "What do the Enterprise plans include?",
      a: "Enterprise pricing is custom for both products. Insights Enterprise adds Slack or phone support, custom SLAs, real-time notifications, and custom retention. Rose Enterprise adds on-demand reviews, autonomous instrumentation improvements, team integrations, and a dedicated support channel. Both offer zero data retention with AI providers as an add-on.",
    },
    {
      q: "Do Insights and Rose need to be bought together?",
      a: "No. Each product has its own plans, and you can start with either one. Insights works on the telemetry your services already send; Rose works on your source code.",
    },
  ],
};

export const pricingCta = {
  title: ["Start free,", "upgrade when ready"],
  sub: "Create an account to score your telemetry and scan your first repositories, or talk to us about Enterprise.",
  primary: { label: "Get Started", href: siteConfig.appUrl },
  secondary: { label: "Contact Sales", href: "/contact" },
} as const;
