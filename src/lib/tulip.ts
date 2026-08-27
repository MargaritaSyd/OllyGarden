export const tulipHero = {
  badge: "OllyGarden Tulip",
  title: "A Supported OpenTelemetry Collector Distribution",
  lede: "Stability and expert support for a critical part of your observability infrastructure—without backend lock-in.",
  primary: "Explore Tulip",
  secondary: "Talk to an OpenTelemetry Expert",
  note: "Quarterly releases with LTS builds every 18 months—CVE backports and production-grade bug fixes.",
} as const;

export const tulipAction = {
  eyebrow: "Tulip in Action",
  title: "Operating the OpenTelemetry Collector in Production",
  body: "The OpenTelemetry Collector gives teams the flexibility to build vendor-neutral telemetry pipelines. OllyGarden Tulip builds on that flexibility with a predictable release lifecycle, consistent deployments, and expert support for organizations running the Collector in production.",
  cards: [
    {
      title: "Release planning",
      body: "Plan upgrades around predictable Tulip releases and long-term support options, while keeping control over when new Collector versions are introduced into production.",
    },
    {
      title: "Production stability",
      body: "Maintain consistent Collector deployments across teams, clusters, and environments, with targeted patch releases and security maintenance for supported versions.",
    },
    {
      title: "Specialized support",
      body: "Get expert guidance on upgrades, configuration decisions, performance, and production troubleshooting—independent of your observability backend.",
    },
  ],
} as const;

export const tulipSupport = {
  eyebrow: "Tulip Support",
  title: "Clear Support Coverage",
  body: "Each Tulip release includes a defined manifest of OpenTelemetry Collector components and versions, giving teams clear visibility into what is included in the distribution and covered by commercial support.",
  file: "bonsai-distribution.yaml",
  cardTitle: "View the Component Manifest",
  cardHref:
    "https://github.com/ollygarden/tulip/blob/main/distributions/tulip/manifest.yaml",
  lines: [
    { kind: "head", text: "dist:" },
    { kind: "kv", key: "module", value: "github.com/ollygarden/tulip" },
    { kind: "kv", key: "name", value: "tulip" },
    {
      kind: "kv",
      key: "description",
      value: "OllyGarden Tulip — supported OpenTelemetry Collector",
    },
    { kind: "kv", key: "output_path", value: "./_build" },
    { kind: "kv", key: "version", value: "26.05.1" },
    { kind: "blank" },
    { kind: "head", text: "receivers:" },
    {
      kind: "gomod",
      value: "go.opentelemetry.io/collector/receiver/otlpreceiver v0.104.0",
    },
    {
      kind: "gomod",
      value:
        "github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver v0.104.0",
    },
    { kind: "blank" },
    { kind: "head", text: "processors:" },
    {
      kind: "gomod",
      value: "go.opentelemetry.io/collector/processor/batchprocessor v0.104.0",
    },
    {
      kind: "gomod",
      value:
        "github.com/open-telemetry/opentelemetry-collector-contrib/processor/resourceprocessor v0.104.0",
    },
    { kind: "blank" },
    { kind: "head", text: "exporters:" },
    {
      kind: "gomod",
      value: "go.opentelemetry.io/collector/exporter/otlpexporter v0.104.0",
    },
    {
      kind: "gomod",
      value:
        "github.com/open-telemetry/opentelemetry-collector-contrib/exporter/debugexporter v0.104.0",
    },
  ],
} as const;

export const tulipDropin = {
  eyebrow: "Get Started",
  title: "Switch to Tulip with one line",
  body: "Replace the Collector image in your deployment while keeping your existing configuration and telemetry pipelines.",
  file: "deployment.yaml",
  tip: "Same configuration, same telemetry pipelines—now with expert support.",
  lines: [
    { kind: "plain", text: "apiVersion: apps/v1" },
    { kind: "plain", text: "kind: Deployment" },
    { kind: "plain", text: "metadata:" },
    { kind: "plain", text: "  name: otel-collector" },
    { kind: "plain", text: "spec:" },
    { kind: "plain", text: "  replicas: 2" },
    { kind: "plain", text: "  selector:" },
    { kind: "plain", text: "    matchLabels:" },
    { kind: "plain", text: "      app: otel-collector" },
    { kind: "plain", text: "  template:" },
    { kind: "plain", text: "    metadata:" },
    { kind: "plain", text: "      labels:" },
    { kind: "plain", text: "        app: otel-collector" },
    { kind: "plain", text: "    spec:" },
    { kind: "plain", text: "      containers:" },
    { kind: "plain", text: "        - name: otel-collector" },
    {
      kind: "rm",
      text: "          image: otel/opentelemetry-collector-contrib:latest",
    },
    {
      kind: "add",
      text: "          image: cr.olly.garden/ollygarden/tulip/tulip:26.05.1",
    },
    { kind: "plain", text: "          ports:" },
    { kind: "plain", text: "            - containerPort: 4317" },
    { kind: "plain", text: "            - containerPort: 4318" },
    { kind: "plain", text: "          volumeMounts:" },
    { kind: "plain", text: "            - name: config" },
    { kind: "plain", text: "              mountPath: /etc/otelcol-contrib" },
  ],
} as const;

export const tulipPlans = {
  eyebrow: "Tulip Support Plans",
  title: "Support Plans for Your Production Needs",
  sub: "Choose the level of coverage that matches your deployment, operational requirements, and support needs. Each plan covers the components and versions defined in the Tulip support manifest.",
  standard: {
    tier: "Standard Support",
    price: "$499",
    suffix: "/mo",
    note: "Best for teams adopting the curated Tulip manifest with predictable releases. Billed annually at $5,988.",
    cta: "Choose Standard Support",
    href: "/get-started",
    items: [
      "1 business hour response for critical issues",
      "Support portal and email access",
      "Up to 2 concurrent open cases",
      "3 designated contacts",
      "Bug fixes and security patches for supported versions",
      "Knowledge base and release advisories",
      "Guided version transitions with migration checklists",
    ],
  },
  enterprise: {
    tier: "Enterprise Support",
    price: "Custom",
    suffix: "",
    note: "Tailored coverage for platform teams with stringent SLAs or mission-critical deployments.",
    cta: "Contact Us",
    href: "/contact",
    items: [
      "1-hour response for critical issues (24×7)",
      "Dedicated Slack Connect channel",
      "Phone support for critical issues",
      "Named support engineer",
      "10 designated contacts",
      "Unlimited concurrent open cases",
      "Quarterly business reviews",
      "Priority access to new features and beta programs",
    ],
  },
} as const;

export const tulipFaq = {
  title: "Frequently Asked Questions",
  sub: "Common questions about Tulip support, releases, and how we work with teams running OpenTelemetry Collector at scale.",
  items: [
    {
      q: "What’s included in Tulip support?",
      a: "Commercial support for all components listed in the Tulip manifest. When issues arise in supported components, we deliver fixes through patch releases, without requiring disruptive upgrades or relying on new upstream releases. We also backport CVE fixes, provide security guidance, and assist with version transitions to keep telemetry pipelines stable in production.",
    },
    {
      q: "Can we add our own components?",
      a: "Yes. Tulip support covers the curated manifest end-to-end, and we’ll flag best-effort considerations when you extend it. Custom modules stay your responsibility, but we share integration tips along the way. Need a component that’s not in the manifest? Reach out—we’re always open to discussing additions that benefit the community.",
    },
    {
      q: "What hours do you cover?",
      a: "Standard support operates during business hours (09:00–18:00 CET, Monday–Friday) with response times starting at 1 business hour for critical issues. Enterprise support provides 24×7 coverage for Severity 1 and 2 issues, with business-hours coverage for lower severities. Enterprise customers also get a dedicated Slack Connect channel and phone support for critical incidents.",
    },
    {
      q: "What is your release cadence?",
      a: "Tulip ships quarterly stable releases. Every 18 months, we designate a Long-Term Support (LTS) release with extended maintenance. The first release is planned for November 2025, and the first LTS will be in May 2026.",
    },
    {
      q: "What gets backported to supported releases?",
      a: "CVEs rated Critical, High, or Medium (CVSS 7.0+) are backported to all supported releases. Severity 1 and selected Severity 2 bugs affecting production stability are evaluated and backported when confirmed. Critical upstream OpenTelemetry Collector fixes that affect Tulip users are also backported. Non-critical bugs and feature enhancements are not backported—we encourage upgrading to the latest stable release for those.",
    },
    {
      q: "How does Tulip relate to upstream OpenTelemetry?",
      a: "Tulip is built directly on upstream OpenTelemetry Collector releases. We curate and package specific versions with vetted components, but the core is pure upstream code. When we find bugs, we contribute fixes back to the OpenTelemetry project so the entire community benefits.",
    },
    {
      q: "What types of bugs do you fix?",
      a: "Tulip fixes bugs in supported components that impact production stability, correctness, or security. This includes issues such as data loss, core Collector failures, memory leaks, crashes, and security vulnerabilities (CVEs). When a bug is reported, we triage it to confirm whether it affects a supported component. If confirmed, we take ownership of the issue and deliver a fix through a patch release.",
    },
  ],
} as const;

export const tulipLead = {
  title: "Ready to add expert support to your OpenTelemetry Collector deployments?",
  lede: "Share a few details about your current deployment, and the Tulip team will help you evaluate the right support path for your production environment.",
  points: [
    {
      title: "Review your Collector topology",
      body: "Map your existing deployment and required components against the Tulip support manifest.",
    },
    {
      title: "Plan version transitions",
      body: "Prepare Collector upgrades with migration guidance and support for identifying potential regressions.",
    },
    {
      title: "Bring us complex production issues",
      body: "Work with engineers who have deep experience building, operating, and troubleshooting the OpenTelemetry Collector.",
    },
  ],
  cardTitle: "Talk to the Tulip team",
  cardSub:
    "Tell us how you run the collector today and what kind of support you need. We’ll follow up within the Tulip SLA.",
  submit: "Talk to an OpenTelemetry Expert",
  successTitle: "Thanks — your details are on their way!",
  successBody:
    "The Tulip team will follow up within the SLA for your chosen tier. Keep an eye on your inbox.",
  tiers: [
    {
      value: "standard",
      title: "Standard Support",
      desc: "Business-hours support with up to 2 concurrent cases.",
    },
    {
      value: "enterprise",
      title: "Enterprise Support",
      desc: "24×7 critical coverage, Slack Connect, named engineer.",
    },
  ],
} as const;

export const tulipMeta = {
  title: "OllyGarden Tulip — Products",
  path: "/products/tulip",
} as const;
