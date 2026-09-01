export const pressMeta = {
  title: "Press Releases — OllyGarden",
  path: "/resources/press-releases",
} as const;

export const pressHero = {
  badge: "OllyGarden Press",
  title: "Press Releases",
  lede: "The latest news and announcements from OllyGarden.",
} as const;

export const pressArticlePage = {
  back: "Back to Press Releases",
} as const;

export const pressCta = {
  title: ["Ready to take control", "of your telemetry?"],
  sub: "Tell us about your financial services telemetry challenges and we’ll show you how OllyGarden can help.",
  primary: { label: "Talk to our Team", href: "/contact", arrow: true },
} as const;

export type PressCapability = {
  title: string;
  description: string;
};

export type PressEmail = {
  label: string;
  address: string;
};

export type PressBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; quote: string; attribution?: string; compact?: boolean }
  | { type: "capabilities"; items: readonly PressCapability[] }
  | { type: "list"; items: readonly string[] }
  | { type: "about"; kicker?: string; title: string; body: string }
  | { type: "media"; title: string; sub: string; emails: readonly PressEmail[] };

export type PressNotice = {
  label: string;
  text: string;
};

export type PressRelease = {
  slug: string;
  title: string;
  summary: string;
  dek: string;
  date: string;
  location: string;
  partner?: string;
  notice?: PressNotice;
  body: readonly PressBlock[];
};

export const pressReleases: readonly PressRelease[] = [
  {
    slug: "ollygarden-dash0-portel",
    title:
      "OllyGarden and Dash0 Announce Portel: The Industry's First Observability Platform for Portlet-Based Generative UI",
    summary:
      "OllyGarden and Dash0 announce Portel, the first observability solution purpose-built for portlet-based generative UI architectures with full JSR-286 and JSR-362 lifecycle compliance.",
    dek: "Two founders bonded by their portal server past join forces to tackle the telemetry quality crisis in JSR-286 compliant AI-generated portal fragments.",
    date: "2026-04-01",
    location: "Berlin, Germany & New York, USA",
    partner: "OllyGarden + Dash0",
    notice: {
      label: "Editorial note",
      text: "April Fools'! This press release was published on April 1, 2026 as an April Fools' Day joke. Portel is not a real product — no such effort exists (yet?). We're keeping this page for historical and entertainment purposes.",
    },
    body: [
      {
        type: "lead",
        text: "OllyGarden, the company on a mission to fix bad telemetry, and Dash0, the billion-dollar OpenTelemetry-native observability platform, today announce Portel, the first and only observability solution purpose-built for portlet-based generative UI architectures. Portel enables engineering teams to instrument, track, and monitor AI-generated portlet fragments across distributed portal containers with full JSR-286 and JSR-362 lifecycle compliance.",
      },
      {
        type: "p",
        text: "The announcement follows a conversation between the two founders on the Dash0 Code RED podcast, where OllyGarden CEO Juraci Paixão Kröhling and Dash0 CEO Mirko Novakovic discovered they shared a deep and previously unspoken bond: both had spent formative years working with Java portal servers. The realization that portlet technology was not, in fact, dead — but was instead being reborn through generative AI — led to an intense three-week engineering sprint that produced Portel.",
      },
      {
        type: "p",
        text: "As enterprises increasingly adopt generative AI to dynamically produce portal page content, traditional observability tools have struggled to keep pace with the unique challenges of portlet-scoped rendering contexts, inter-portlet communication (IPC) event propagation, and the inherently non-deterministic nature of LLM-generated markup within portlet windows. Worse still, OllyGarden's research has found that portlet-generated telemetry exhibits the highest rate of bad telemetry of any application architecture — with up to 97% of spans produced by AI-generated portlets being either malformed, missing semantic conventions, or containing hallucinated attribute values.",
      },
      { type: "h2", text: "There's a Lot of Bad Telemetry in Portlets" },
      {
        type: "quote",
        quote:
          "There's a lot of bad telemetry out there. We've been saying this since we founded OllyGarden. But nothing prepared us for what we found inside portlet containers. The telemetry coming out of AI-generated portlets is, frankly, the worst I have ever seen. Hallucinated span names like 'PortletPhase.VIBE_CHECK' and attributes referencing portlet preferences that do not exist. As a former GateIn Portal maintainer at Red Hat, I spent years deep inside the portlet container lifecycle — I know what a proper ACTION_PHASE, EVENT_PHASE, and RENDER_PHASE should look like. Portel brings that institutional knowledge to every team running generative portlet workloads. Rose catches bad portlet telemetry at the source — in pull requests — before it ever reaches production, while Dash0 shows you exactly which portlets are broken in real time.",
        attribution:
          "Juraci Paixão Kröhling, Founder and CEO, OllyGarden; Member, OpenTelemetry Governance Committee",
      },
      { type: "h2", text: "The Portal Renaissance Is Real" },
      {
        type: "quote",
        quote:
          "When Juraci came on Code RED and mentioned he had worked on portlets at Red Hat, I almost fell off my chair. I started my career at IBM Deutschland, where the Jetspeed portlet API was the foundation of WebSphere Portal. I built codecentric, I built Instana, I sold it to IBM for half a billion dollars — and in all that time, the thing I never told anyone is that I missed portlets. When Juraci and I started talking about how LLMs are now generating entire portlet fragments on the fly, we both immediately understood: this is the portal renaissance, and it needs proper observability. With Dash0, you can see exactly which portlets are producing broken telemetry and monitor their health in real time. And with OllyGarden's Rose, you can fix it at the source — before bad telemetry ever ships.",
        attribution:
          "Mirko Novakovic, Founder and CEO, Dash0; formerly Founder and CEO of Instana (acquired by IBM)",
      },
      { type: "h2", text: "Key Capabilities" },
      {
        type: "capabilities",
        items: [
          {
            title: "Portlet Span Propagator",
            description:
              "Automatically injects W3C Trace Context headers into portlet rendering pipelines, preserving distributed trace continuity across portal page aggregation boundaries.",
          },
          {
            title: "GenUI Fragment Analyzer",
            description:
              "Inspects LLM-generated portlet markup in real time, detecting hallucinated CSS class names, non-existent portlet preferences, syntactically invalid portlet.xml descriptors, and telemetry that violates OpenTelemetry semantic conventions.",
          },
          {
            title: "IPC Event Tracer",
            description:
              "Provides full distributed tracing across inter-portlet communication events, enabling teams to visualize how an AI-generated portlet in one window triggers cascading renders in neighboring portlets.",
          },
          {
            title: "Dash0 Observability Integration",
            description:
              "Monitors portlet health in real time, surfaces which portlets are producing broken telemetry, and provides out-of-the-box dashboards for portlet rendering performance.",
          },
          {
            title: "OllyGarden Rose Integration",
            description:
              "Automatically reviews pull requests that modify portlet instrumentation code, fixing bad telemetry at the source before it reaches production.",
          },
        ],
      },
      { type: "h2", text: "Technical Integration" },
      {
        type: "p",
        text: "Portel is distributed as an OllyGarden Tulip module and requires no changes to existing portal server deployments. The solution supports GateIn, Apache Jetspeed, Liferay DXP (portal mode), IBM WebSphere Portal, and the recently revived Apache Pluto reference implementation. A dedicated Helm chart is available for teams running portlet containers on Kubernetes, because in 2026, every modern enterprise naturally runs their portal servers in Kubernetes.",
      },
      {
        type: "p",
        text: "The Dash0 integration provides out-of-the-box dashboards including Portal Page Render Latency (P99 broken down by portlet window), GenUI Hallucination Rate (percentage of AI-generated fragments rejected by the portlet container), Broken Portlet Detector (highlights which portlets are producing malformed or missing telemetry), and the Portal Nostalgia Index — a proprietary metric that quantifies how closely the deployment resembles a 2008-era enterprise intranet. Early beta customers have reported Portal Nostalgia Index scores exceeding 94, which Dash0 engineers describe as “deeply concerning yet oddly comforting.”",
      },
      { type: "h2", text: "Industry Context" },
      {
        type: "p",
        text: "The partnership between OllyGarden and Dash0 extends an existing relationship: Dash0 participated in OllyGarden's pre-seed funding round alongside DIG Ventures, Datadog Ventures, and Grafana Labs. This joint product represents a deepening of that collaboration, combining OllyGarden's expertise in identifying and fixing bad telemetry with Dash0's AI-native observability platform and agentic operations capabilities.",
      },
      {
        type: "quote",
        compact: true,
        quote:
          "We have spoken with over 200 enterprises about their telemetry quality challenges. Not a single one mentioned portlets. That is how we knew this was an underserved market.",
      },
      { type: "h2", text: "Availability and Pricing" },
      {
        type: "p",
        text: "Portel is available immediately in public beta. Pricing follows a Portal-Based Pricing model where organizations are charged per portlet render phase instrumented, with a generous free tier of 10,000 ACTION_PHASE spans per month. Enterprise customers with more than 500 concurrent portlet windows qualify for the Portal Whale tier, which includes dedicated Rose onboarding, priority Dash0 dashboard customization, and support from engineers who actually remember what a portlet is.",
      },
      {
        type: "about",
        kicker: "About",
        title: "About OllyGarden",
        body: "OllyGarden is on a mission to fix bad telemetry. The company helps engineering teams identify, measure, and eliminate wasteful and low-quality telemetry data, leveraging the Instrumentation Score — a community-driven, vendor-neutral standard that quantifies the quality of OpenTelemetry instrumentation on a scale from 0 to 100. OllyGarden's product portfolio includes Tulip (a commercially supported OpenTelemetry Collector distribution), Rose (AI code review for telemetry pipelines), and Insights (telemetry quality monitoring). Founded by Juraci Paixão Kröhling, a member of the OpenTelemetry Governance Committee and former GateIn Portal maintainer at Red Hat, OllyGarden is backed by DIG Ventures, Datadog Ventures, Grafana Labs, and Dash0. The company is headquartered in Berlin, Germany.",
      },
      {
        type: "about",
        title: "About Dash0",
        body: "Dash0 is the AI-native observability platform built on OpenTelemetry. Powered by Agent0 and the SIFT framework, Dash0 transforms logs, traces, and metrics into guided, autonomous actions. Founded in 2023 by Mirko Novakovic, the serial entrepreneur behind Instana (acquired by IBM for $500M) and codecentric, Dash0 has grown to over 270 customers and recently raised $110M in Series B funding at a $1B valuation. Mirko began his career at IBM Deutschland, where an early and formative encounter with the Jetspeed portlet API left a mark he has carried through every subsequent engineering role. Dash0 is headquartered in New York, with a growing team across the US and Europe.",
      },
      {
        type: "media",
        title: "Media Content",
        sub: "Contact us for more!",
        emails: [
          { label: "press@ollygarden.com", address: "press@ollygarden.com" },
          { label: "press@dash0.com", address: "press@dash0.com" },
        ],
      },
    ],
  },
  {
    slug: "ollygarden-rose-ga",
    title:
      "OllyGarden Introduces Rose: An AI Agent That Fixes Bad OpenTelemetry Instrumentation Through Pull Requests",
    summary:
      "OllyGarden announces the general availability of Rose — an AI agent that analyzes OpenTelemetry instrumentation in source code and autonomously opens pull requests with fixes.",
    dek: "At KubeCon + CloudNativeCon Europe 2026, OllyGarden announces the general availability of Rose — an AI agent that analyzes OpenTelemetry instrumentation in source code and autonomously opens pull requests with fixes.",
    date: "2026-03-24",
    location: "Amsterdam, Netherlands",
    body: [
      { type: "h2", text: "The Problem: Telemetry Governance at Scale" },
      {
        type: "p",
        text: "Organizations adopting OpenTelemetry face a persistent challenge: instrumentation guidelines exist, but they aren't followed. Developer teams lack the domain knowledge to implement instrumentation best practices, and the engineering capacity to manually fix telemetry quality issues is always competing with feature work.",
      },
      {
        type: "p",
        text: "The result is low-quality telemetry data that increases observability costs, creates blind spots in production systems, and undermines the value of monitoring investments. Fixing telemetry at the pipeline level — by dropping or transforming data after collection — treats symptoms rather than root causes.",
      },
      { type: "h2", text: "Rose: Fix Telemetry at the Source" },
      {
        type: "p",
        text: "Rose addresses this problem where it originates: in the source code. By analyzing instrumentation across repositories, Rose identifies quality issues and delivers code-level fixes directly as pull requests — no manual engineering effort required.",
      },
      {
        type: "p",
        text: "All changes go through standard code review. Rose opens pull requests that require human review and approval before merging, keeping engineering teams in full control of their codebase while eliminating the manual work of finding and fixing instrumentation problems.",
      },
      { type: "h2", text: "Key Capabilities" },
      {
        type: "list",
        items: [
          "Analyzes OpenTelemetry instrumentation in source code repositories and opens pull requests with targeted fixes",
          "Enforces governance policies — from naming conventions and semantic attributes to PII detection and cardinality control",
          "Every change requires human review and approval before merging",
          "Built on deep OpenTelemetry expertise from contributors who helped shape the project",
        ],
      },
      { type: "h2", text: "From Diagnosis to Remediation" },
      {
        type: "p",
        text: "Rose works alongside OllyGarden Insights, which scores instrumentation quality on a 0–100 scale across an organization's services. Where Insights identifies what's wrong, Rose fixes it — completing an autonomous loop that delivers on OllyGarden's core promise: fix your bad telemetry, autonomously.",
      },
      { type: "h2", text: "Addressing a Validated Pain Point" },
      {
        type: "p",
        text: "Through conversations with engineering teams across the OpenTelemetry ecosystem, OllyGarden has consistently heard the same challenge: organizations have instrumentation guidelines, but no scalable way to enforce them. Engineering teams know what good telemetry looks like, but lack the bandwidth to bring existing instrumentation up to standard across dozens or hundreds of services.",
      },
      {
        type: "p",
        text: "Rose eliminates this bottleneck, turning instrumentation governance from an aspiration into an automated process.",
      },
      {
        type: "quote",
        quote:
          "We built Rose because we kept hearing the same thing from platform teams: 'We know our instrumentation needs work, but we can't justify pulling engineers off feature development to fix it.' Rose removes that trade-off entirely.",
        attribution: "Juraci Paixão Kröhling, CEO, OllyGarden",
      },
      { type: "h2", text: "Availability" },
      {
        type: "p",
        text: "Rose is generally available starting March 24, 2026. OllyGarden will be demonstrating Rose at KubeCon + CloudNativeCon Europe 2026 in Amsterdam. To learn more or get started, visit ollygarden.com/rose.",
      },
      {
        type: "about",
        kicker: "About",
        title: "About OllyGarden",
        body: "OllyGarden is building the standard for telemetry quality. Founded by OpenTelemetry contributors who helped shape the project, OllyGarden provides tools that help organizations assess, improve, and maintain the quality of their OpenTelemetry instrumentation. The company's products — Insights, Rose, and Tulip — work together to diagnose instrumentation problems, deliver automated fixes, and provide supported OpenTelemetry Collector operations, turning telemetry governance into a solved problem.",
      },
      { type: "p", text: "Learn more at ollygarden.com." },
      {
        type: "media",
        title: "Press Contact",
        sub: "Juraci Paixão Kröhling, CEO · Erika Hahn, Marketing",
        emails: [
          { label: "press@ollygarden.com", address: "press@ollygarden.com" },
        ],
      },
    ],
  },
];

export function getPressRelease(slug: string) {
  return pressReleases.find((release) => release.slug === slug);
}

export function pressReleaseHref(slug: string) {
  return `/resources/press-releases/${slug}`;
}

export function formatPressDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
