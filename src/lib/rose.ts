import { announcement } from "@/lib/announcement";
import { siteConfig } from "@/lib/site";

export const roseHero = {
  badge: "OllyGarden Rose",
  titleLead: "Your teams and their agents write the code.",
  titleRest: "Rose gets the instrumentation right.",
  lede: "OllyGarden Rose adds missing instrumentation, migrates vendor SDKs to OpenTelemetry®, reviews what’s already there for gaps and inconsistencies, and fixes the issues you select.",
  scopeLead: "Across your repositories: ",
  scopeStrong:
    "autonomously in the background, locally on your machine, or inside your favorite coding agent.",
  cta: "Scan your Repo for Free",
  ctaHref: siteConfig.appUrl,
  secondaryCta: "Book a Demo",
  secondaryHref: "/contact",
} as const;

export const roseProblem = {
  eyebrow: "The Problem",
  title: "Why good instrumentation is so hard to get right",
  body: "An observability engineer knows exactly what good instrumentation should look like. What they cannot do is sit with every team, in every repository, on every pull request.",
  highlight: "Rose is the telemetry expert for all your teams.",
  cards: [
    {
      title: "Inconsistent patterns",
      body: "Different teams, frameworks and vendor SDKs lead to inconsistent instrumentation across your codebase",
      place: "tl",
    },
    {
      title: "Low-value telemetry",
      body: "Telemetry without business context makes it harder to understand and resolve issues.",
      place: "bl",
    },
    {
      title: "Missing instrumentation",
      body: "New services and features often ship with little or no instrumentation.",
      place: "tr",
    },
    {
      title: "Agent-generated mistakes",
      body: "AI coding agents can introduce gaps, duplication or other poor instrumentation practices.",
      place: "br",
    },
  ],
} as const;

export const roseDoes = {
  eyebrow: "Meet Rose",
  title: "What Rose does",
  cards: [
    {
      icon: "instrument",
      title: "Instrument",
      body: "Adds missing instrumentation and expands coverage in already instrumented services with targeted business context.",
    },
    {
      icon: "migrate",
      title: "Migrate",
      body: "Moves vendor-specific or custom instrumentation to OpenTelemetry.",
    },
    {
      icon: "review",
      title: "Review",
      body: "Continuously reviews the whole codebase in the background as your code evolves.",
    },
    {
      icon: "fix",
      title: "Fix",
      body: "Turns selected findings into pull requests your team reviews and controls.",
    },
  ],
} as const;

export type RoseDoesIcon = (typeof roseDoes.cards)[number]["icon"];

export const roseHow = {
  eyebrow: "How Rose Works",
  title: "Instrumentation that improves with your code",
  sub: "Rooted in OpenTelemetry. Curated by OllyGarden. Rose connects patterns across your services with OpenTelemetry standards, OllyGarden’s instrumentation expertise, and your organization’s context and skills.",
  diagramLabel:
    "How Rose works: Rose reviews your code using your org context and skills, then opens a pull request on your service. The service sends telemetry through the OpenTelemetry Collector to your observability backend and, optionally, to OllyGarden Insights.",
  steps: [
    {
      n: "1",
      title: "Review",
      body: "Rose reviews your code using your org context and skills, plus Insights findings from your telemetry when available.",
    },
    {
      n: "2",
      title: "Fix",
      body: "Rose opens a pull request to fix the instrumentation at the source.",
    },
    {
      n: "3",
      title: "Merge",
      body: "Your team reviews and merges it, new telemetry is sent, and the loop starts over.",
    },
  ],
} as const;

/**
 * Minimum Viable Instrumentation announcement. Figma: hero strip 2371:32444, section 2371:31595.
 * The launch post URL lives in `src/lib/announcement.ts`, shared with the site-wide bar.
 */
export const roseMvi = {
  id: "mvi",
  strip: {
    title: "Minimum Viable Instrumentation (MVI)",
    badge: "New",
    body: "Rose can make your currently unobservable services observable.",
    link: "See How it Works",
  },
  eyebrow: "New in Rose",
  title: "Minimum Viable Instrumentation",
  body: "For repositories with no instrumentation, Rose creates an OpenTelemetry baseline, combining zero-code instrumentation with the business context needed to investigate problems.",
  steps: [
    {
      title: "Your repository",
      body: "Point Rose at a repository with no instrumentation.",
    },
    {
      title: "Rose adds MVI",
      body: "One repository at a time, or many at once.",
    },
    {
      title: "Pull request",
      body: "Your team reviews it and decides what ships.",
    },
  ],
  before: {
    label: "Zero-code instrumentation",
    rows: [
      { label: "POST /orders", depth: 0, tone: "root", bar: [0, 100] },
      { label: "SELECT orders", depth: 1, bar: [3.6, 26] },
      { label: "repository.saveAll", depth: 1, tone: "noise", bar: [32.6, 43.4] },
      { label: "Session.persist", depth: 2, tone: "noise", bar: [34, 7] },
      { label: "INSERT order_items", depth: 3, tone: "noise", bar: [35.2, 5] },
      { label: "Session.persist", depth: 2, tone: "noise", bar: [43.4, 7] },
      { label: "INSERT order_items", depth: 3, tone: "noise", bar: [44.6, 5] },
      { label: "Session.persist", depth: 2, tone: "noise", bar: [52.6, 7] },
      { label: "INSERT order_items", depth: 3, tone: "noise", bar: [53.8, 5] },
      { label: "Session.persist", depth: 2, tone: "noise", bar: [61.7, 7] },
      { label: "INSERT order_items", depth: 3, tone: "noise", bar: [62.9, 5] },
      { label: "POST payments-api", depth: 1, bar: [77, 13] },
      { label: "publish order.created", depth: 1, bar: [93, 6.5] },
    ],
    more: "... repeated for each item",
    caption:
      "Lots of technical detail, but not the checkout outcome, payment method, or number of items in the cart.",
  },
  after: {
    label: "With MVI",
    rows: [
      { label: "POST /orders", depth: 0, tone: "root", bar: [0, 100] },
      { label: "checkout.submit", depth: 1, tone: "key", bar: [3, 96.5] },
      { label: "SELECT orders", depth: 2, bar: [3.6, 26] },
      { label: "order_items.persist_batch", depth: 2, tone: "key", bar: [32, 44] },
      { label: "POST payments-api", depth: 2, bar: [77, 13] },
      { label: "publish order.created", depth: 2, bar: [93, 6.5] },
    ],
    context: "CHECKOUT CONTEXT: result / payment method / item count",
    attributesHead: "Batch span / example attributes",
    attributes: ["records.attempted", "records.written", "outcome"],
    caption:
      "Less repetition, and now you see the checkout outcome, payment method, and number of items in the cart.",
  },
  band: {
    title: "Less noise. More context.",
    body: "Useful coverage and meaningful context, with less unnecessary telemetry.",
    cta: "Read the Announcement",
    announcementHref: announcement.href,
  },
} as const;

export const roseTeams = {
  eyebrow: "Improve your team",
  title: "What changes for your teams",
  cards: [
    {
      icon: "chevrons",
      title: "Resolve incidents faster",
      body: "Telemetry that explains why, not just what.",
    },
    {
      icon: "sliders",
      title: "OpenTelemetry expertise for every team",
      body: "Every team gets expert-level instrumentation. Engineers stay in control.",
    },
    {
      icon: "gauge",
      title: "Pay for signal, not noise",
      body: "Useful coverage without unnecessary telemetry.",
    },
  ],
  stat: {
    label: "Spans/sec",
    from: "14",
    to: "8",
    quote:
      "I reduced the span rate from 14 spans/sec to 8 spans/sec, lowering telemetry volume.",
    name: "Marcin Siennicki",
    role: "Advanced Software Engineer",
  },
} as const;

export type RoseTeamsIcon = (typeof roseTeams.cards)[number]["icon"];

export const roseClients = {
  title: "What teams say about Rose",
  quotes: [
    {
      name: "Rob Chapman",
      role: "Founder / Observability Consultant",
      image: "/images/rose/avatar-rob.png",
      imageAlt: "Rob Chapman, Founder and Observability Consultant",
      paragraphs: [
        "Juraci gave me a demo of Rose yesterday. I left the call excited. Wired it up to my repo, ran it on a project I suspected had issues, and was gobsmacked. It found a real instrumentation problem on the first pass, it then raised a perfect PR to fix it.",
        "I want to be embarrassed about my own instrumentation.",
        "I am not though. I am excited for the possibilities, even if that means I need a new career.",
      ],
    },
    {
      name: "Elena Kovalenko",
      role: "Principal Software Engineer",
      image: "/images/rose/avatar-elena.png",
      imageAlt: "Elena Kovalenko, Principal Software Engineer",
      paragraphs: [
        "By offloading a tedious migration with Rose, we save our engineering capacity for key business priorities and creative work.",
      ],
    },
    {
      name: "Marcin Siennicki",
      role: "Advanced Software Engineer",
      image: "/images/rose/avatar-marcin.png",
      imageAlt: "Marcin Siennicki, Advanced Software Engineer",
      paragraphs: [
        "Another great result from ROSE 🚀 It helped me identify that operational spans generated by route such as /metrics were being ingested without sampling, despite providing minimal value to the team. After introducing sampling, I reduced the span rate from 14 spans/sec to 8 spans/sec, lowering telemetry volume (can't past the screen unfortunately).",
      ],
    },
  ],
} as const;

export const roseSecurity = {
  eyebrow: "We care about security",
  title: "Security and control",
  run: {
    title: "Run Rose your way",
    lines: [
      "Works with any observability backend. We don’t replace your observability backend.",
      "Tuned for Go, Java, JavaScript/TypeScript and Python, and runs on other languages too.",
    ],
    chips: ["Run locally", "Self-host", "Bring your own key"],
  },
  cards: [
    {
      icon: "shield",
      title: "Isolated, credential-free sandbox",
      body: "Every run happens in an environment created for that run and destroyed when it ends",
    },
    {
      icon: "branch",
      title: "Never merges or writes to your default branch",
      body: "Every change arrives as a pull request your team reviews and controls.",
    },
    {
      icon: "copy",
      title: "Never stores a copy of the repo",
      body: "The sandbox is torn down with everything in it when the run finishes.",
    },
  ],
  enterprise: {
    title: "Enterprise",
    body: "EU-only processing and zero data retention with AI providers are available as add-ons.",
    cta: "Security and Data Handling",
    href: "/security",
  },
} as const;

export type RoseSecurityIcon = (typeof roseSecurity.cards)[number]["icon"];

const roseFreeRepositories = 5;
const roseExtraRepositoryPrice = "$5";

export const rosePlans = {
  eyebrow: "Get Started",
  title: "Choose how you want to use Rose",
  sub: "All plans include the full codebase scan, the instrumentation dashboard, and access to the REST API (e.g. via OllyGarden CLI). Open Source access is granted upon review.",
  free: {
    title: "Free",
    note: "No credit card required",
    cta: "Get Started",
    href: siteConfig.appUrl,
    repositories: roseFreeRepositories,
    extraRepositoryPrice: roseExtraRepositoryPrice,
    items: [
      `Up to ${roseFreeRepositories} repositories included`,
      "Weekly automatic instrumentation review",
      "Instrumentation dashboard",
      "REST API and CLI access",
      "Custom review instructions",
      `Additional repositories for ${roseExtraRepositoryPrice}/month each`,
    ],
  },
  enterprise: {
    title: "Enterprise",
    note: "Contact us to start",
    cta: "Contact Us",
    href: "/contact",
    items: [
      "Everything in Free",
      "On-demand instrumentation reviews",
      "Autonomous instrumentation improvements",
      "Agentic Instrumentation (MVI)",
      "Team integrations for Slack, Discord, and more",
      "Priority support with a dedicated channel",
      "Zero data retention with AI providers (add-on)",
    ],
  },
  openSource: {
    title: "Open Source",
    note: "Access granted upon request",
    cta: "Apply Now",
    href: "/contact",
    items: [
      "Everything in Free",
      "Unlimited public repositories",
      "Priority access for CNCF projects",
    ],
  },
} as const;

export const roseFaq = {
  title: "Frequently Asked Questions",
  sub: "Common questions about what Rose does, how it treats your code, and how it fits your observability stack.",
  items: [
    {
      q: "What is Minimum Viable Instrumentation (MVI)?",
      a: "For repositories with no instrumentation, Rose creates an OpenTelemetry baseline, combining zero-code instrumentation with the business context needed to investigate problems, and delivers it as a pull request.",
    },
    {
      q: "Do I need OllyGarden Insights to use Rose?",
      a: "No. Rose works on its own. With Insights, Rose also uses findings from your production telemetry.",
    },
    {
      q: "Which languages does Rose support?",
      a: "Rose is tuned for Go, Java, JavaScript/TypeScript and Python, and runs on other languages too.",
    },
    {
      q: "Will Rose change my code without approval?",
      a: "No. Rose never merges or writes to your default branch. Every change arrives as a pull request your team reviews.",
    },
    {
      q: "What happens to my code?",
      a: "Each run happens in an isolated, credential-free sandbox that is destroyed when the run ends. Rose never stores a copy of your repository.",
    },
    {
      q: "Does Rose replace my observability backend?",
      a: "No. Rose works with any observability backend and improves the telemetry you send to it.",
    },
  ],
} as const;

export const roseCta = {
  title: ["Telemetry your teams and", "their agents can trust"],
  sub: "Start with the right instrumentation. Improve what you already have.",
  primary: {
    label: "Scan your Repo for Free",
    href: siteConfig.appUrl,
    className: "rz-cta-steady",
  },
  secondary: { label: "Book a Demo", href: "/contact" },
  buttonSize: "lg",
  variant: "product",
} as const;

/** Closing CTA reused by resource pages that hand off to Rose. */
export const roseScanCta = {
  title: ["Start with a", "repository scan"],
  sub: "Connect Rose to your repository and see where your OpenTelemetry instrumentation can be improved. Get actionable findings, review the recommendations, and help your team fix telemetry issues at the source.",
  primary: { label: "Scan Your Repo for Free", href: siteConfig.appUrl },
  secondary: { label: "Book a Demo", href: "/contact" },
  variant: "scan",
} as const;

export const roseMeta = {
  title: "OllyGarden Rose — AI OpenTelemetry instrumentation review",
  description:
    "Rose is an AI engineer for OpenTelemetry. It reviews your services, finds missing or low-value telemetry, and helps your team apply the right fix.",
  path: "/products/rose",
} as const;
