import type { FaqContent } from "@/lib/faq";

type AgentSkill = { name: string; description: string };

type SkillGroup = { title: string; skills: readonly AgentSkill[] };

export type SkillRepository = {
  id: "facts" | "opinions";
  repo: string;
  href: string;
  layer: string;
  /** Second line of the repository's node in the Rose diagram. */
  origin: string;
  /** Tab label. The prefix hides below 768px, matching the preview. */
  tab: { prefix: string; label: string };
  title: string;
  summary: string;
  principles: readonly string[];
  groups: readonly SkillGroup[];
  install: { skillsSh: string; marketplace: string; plugin: string };
};

const otelFacts: SkillRepository = {
  id: "facts",
  repo: "ollygarden/opentelemetry-agent-skills",
  href: "https://github.com/ollygarden/opentelemetry-agent-skills",
  layer: "Public OpenTelemetry facts",
  origin: "Open source, curated by us",
  tab: { prefix: "OpenTelemetry", label: "facts" },
  title: "Agent Skills for OpenTelemetry",
  summary:
    "Vendor-neutral skills that point agents at upstream sources of truth: specifications, semantic conventions, SDK APIs, Collector components, and release data. Curated by us, non-opinionated by design.",
  principles: [
    "Grounded in upstream docs and source, not copied into context",
    "Token-efficient: small fetch tables, lookup indexes, and scripts",
    "Skill changes must show, with and without the skill, that it helps",
  ],
  groups: [
    {
      title: "Languages",
      skills: [
        { name: "otel-go", description: "Declarative SDK setup, API surface, otelhttp and otelgrpc, compile-time instrumentation, and breaking-change audits." },
        { name: "otel-java", description: "Javaagent zero-code instrumentation, the Spring Boot Starter, manual SDK setup, and BOM dependency management." },
        { name: "otel-js", description: "NodeSDK setup, declarative YAML configuration, auto-instrumentations, and ESM versus CJS import patterns." },
        { name: "otel-python", description: "File-based SDK setup, the logging bridge, zero-code instrumentation, and the contrib catalog." },
        { name: "otel-dotnet", description: "Hosting-extension SDK setup, ActivitySource, Meter, and ILogger, plus the zero-code CLR profiler." },
        { name: "otel-ruby", description: "SDK and Bundler setup, manual tracing, and contrib instrumentation for Rails, Rack, Sinatra, and Sidekiq." },
        { name: "otel-browser", description: "Web tracing SDK, web vitals and fetch instrumentation, sessions, and frontend-to-backend propagation." },
      ],
    },
    {
      title: "Collector",
      skills: [
        { name: "otel-collector", description: "Component config keys, defaults, signal support, stability, and gotchas, one component at a time." },
        { name: "otel-collector-builder", description: "Custom Collector distributions with OCB: manifests, version alignment, and multi-arch builds." },
        { name: "otel-ottl", description: "Authoring and debugging OTTL for the transform, filter, routing, and tail-sampling processors." },
        { name: "otel-telemetrygen", description: "Synthetic traces, metrics, and logs for load tests and for validating pipeline rules." },
      ],
    },
    {
      title: "Specifications and lifecycle",
      skills: [
        { name: "otel-semantic-conventions", description: "Released convention groups, attributes, and span naming rules, with exact upstream lookups." },
        { name: "otel-declarative-config", description: "SDK providers configured from a single YAML file, with schema and precedence rules." },
        { name: "otel-sdk-versions", description: "The latest compatible released SDK and package versions for a language." },
        { name: "otel-upgrade", description: "Package and Collector upgrade assessment: compatibility, configuration, and rollout risk." },
        { name: "otel-telemetry-emissions", description: "Which spans, metrics, and logs a component or instrumentation package emits at a given version." },
        { name: "otel-span-events-to-logs-migration", description: "Moving from the deprecated Span Event API to the Logs API." },
        { name: "otel-weaver", description: "Weaver registries, templates, generated bindings, and registry checks in CI." },
      ],
    },
  ],
  install: {
    skillsSh: "npx skills add https://github.com/ollygarden/opentelemetry-agent-skills",
    marketplace: "/plugin marketplace add ollygarden/opentelemetry-agent-skills",
    plugin: "/plugin install otel-go@opentelemetry-agent-skills",
  },
};

const ollygardenOpinions: SkillRepository = {
  id: "opinions",
  repo: "ollygarden/skills",
  href: "https://github.com/ollygarden/skills",
  layer: "Public OllyGarden opinions",
  origin: "Open source, authored by us",
  tab: { prefix: "OllyGarden", label: "opinions" },
  title: "OllyGarden Skills",
  summary:
    "Our opinions on instrumentation patterns and telemetry shapes, layered on top of the facts. These skills reference the upstream skills, so install both packages together.",
  principles: [
    "Opinionated: how we would configure and fix it",
    "Builds on `otel-collector`, `otel-ottl`, and the other fact skills",
    "Prefixed `ollygarden-` to declare ownership in the skill namespace",
  ],
  groups: [
    {
      title: "Collector",
      skills: [
        { name: "ollygarden-otel-collector-k8s-daemonset", description: "An optimization-first Collector config for a Kubernetes node agent: drop early, curate receivers, cut noise and cardinality." },
        { name: "ollygarden-otel-collector-config-validation", description: "Validate a config end to end: a real Collector fed by telemetrygen, asserting each processor does what it should." },
        { name: "ollygarden-otel-collector-config-decomposition", description: "When and how to split a monolithic Collector config into merged files, and when to leave it alone." },
      ],
    },
    {
      title: "OllyGarden platform",
      skills: [
        { name: "ollygarden-cli", description: "Inspect Rose repositories, findings, and scans, plus telemetry services and insights, from the ollygarden CLI." },
        { name: "ollygarden-insight-remediation", description: "Fetch a service's active Insights findings and apply the fixes to the current codebase." },
      ],
    },
  ],
  install: {
    skillsSh: "npx skills add https://github.com/ollygarden/skills/tree/main/skills/ollygarden-cli",
    marketplace: "/plugin marketplace add ollygarden/skills",
    plugin: "/plugin install ollygarden-cli@skills",
  },
};

export const skillRepositories = [otelFacts, ollygardenOpinions] as const;

export function skillCount(repository: SkillRepository) {
  return repository.groups.reduce((total, group) => total + group.skills.length, 0);
}

/** GitHub tree for one skill. Both repositories keep skills under `skills/<name>`. */
export function skillHref(repository: Pick<SkillRepository, "href">, name: string) {
  return `${repository.href}/tree/main/skills/${name}`;
}

const factCount = skillCount(otelFacts);
const opinionCount = skillCount(ollygardenOpinions);

export const agentSkillsMeta = {
  title: "OllyGarden OpenTelemetry Skills for Claude Code and Cursor",
  description: `Open source OpenTelemetry agent skills for Claude Code, Cursor, and Codex: ${factCount} vendor-neutral fact skills and ${opinionCount} OllyGarden skills, free under Apache 2.0.`,
  path: "/resources/agent-skills",
} as const;

export const agentSkillsHero = {
  badge: "Open source · Apache 2.0",
  title: "Agent Skills for OpenTelemetry",
  lede: `OllyGarden Agent Skills are ${factCount + opinionCount} open source skills that give coding agents such as Claude Code, Cursor, and Codex accurate, current OpenTelemetry (OTel) knowledge: ${factCount} vendor-neutral fact skills, and ${opinionCount} skills with our opinions on how to use them.`,
} as const;

export const agentSkillsLayers = {
  eyebrow: "Two packages",
  title: "Facts and opinions, kept apart",
  lede: "There are many valid ways to use OpenTelemetry. One package states what is true upstream; the other says what we would do. Use the facts on their own, or add our opinions on top.",
  mark: "/images/instrumentation-score/mark-dimensions.svg",
} as const;

export const agentSkillsRose = {
  eyebrow: "Inside Rose",
  title: "The same skills power Rose",
  lede: "Rose, our AI instrumentation agent, is built on the same packages you install. They are the public layers of the OllyGarden brain: Rose retrieves the skills a task needs, adds your organization's context, deterministic checks, and what we have learned in production, and opens pull requests with the fix.",
  mark: "/images/solutions/financial/glyph.svg",
  brain: {
    title: "The OllyGarden brain",
    chips: ["Skills retrieval", "Deterministic checks", "Multi-agent orchestration"],
  },
  rose: {
    title: "Rose",
    sub: "AI instrumentation agent",
    action: "Opens pull requests",
    target: "Your repositories",
  },
  proprietary: {
    layer: "Proprietary knowledge",
    title: "Earned in production",
    sub: "10+ years in observability, 500+ services audited",
  },
  note: "We use these skills every day, in our own engineering and inside Rose, and keep them current as OpenTelemetry evolves.",
  roseHref: "/products/rose",
  roseLink: "Learn more about Rose",
} as const;

export const agentSkillsInstall = {
  eyebrow: "Get started",
  title: "Install the skills",
  lede: "Both packages follow the Agent Skills specification and work with any agent that supports it. Install with skills.sh, or add each repository to Claude Code as a plugin marketplace.",
  mark: "/images/instrumentation-score/mark-how.svg",
  specHref: "https://agentskills.io/specification",
  specLink: "Agent Skills specification",
  blogHref: "/resources/blog/teach-your-coding-agent-opentelemetry",
  blogLink: "Read the announcement",
} as const;

export const agentSkillsFaq = {
  title: "Frequently Asked Questions",
  sub: "What teams ask us about the skills, how we maintain them, and how they relate to Rose.",
  items: [
    {
      q: "What are OllyGarden's agent skills?",
      a: "Two open source packages, licensed under Apache 2.0, that give any coding agent accurate and current OpenTelemetry knowledge. Each skill follows the Agent Skills specification: a small entry point that loads only the reference a task needs, instead of copying documentation into the agent's context.",
    },
    {
      q: "What is the difference between the two packages?",
      a: "`opentelemetry-agent-skills` holds facts: anything you can verify against upstream specifications, source code, and releases. It is vendor neutral and non-opinionated by design. `ollygarden/skills` holds our opinions: what to instrument, which signal fits, and how we would configure the Collector. The opinion skills build on the fact skills, so install both.",
    },
    {
      q: "Why does my coding agent need skills? Doesn't the model already know OpenTelemetry?",
      a: "Models reproduce the instrumentation they were trained on, and most of it is poor. Their knowledge also trails upstream: we regularly see models suggest SDK and Collector versions that are many releases old, or semantic conventions that have since changed. The skills point the agent at the current source of truth instead.",
    },
    {
      q: "Which coding agents and models do the skills work with?",
      a: "Any agent that supports Agent Skills, such as Claude Code, Cursor, or Codex. In our experience, the skills improve the OpenTelemetry output of Anthropic, OpenAI, and Gemini models alike.",
    },
    {
      q: "How do I install the skills in Cursor, Codex, or GitHub Copilot?",
      a: "Run `npx skills add ollygarden/opentelemetry-agent-skills`. The skills CLI installs into the coding agents it detects; pass `-a` to choose one, such as `-a cursor`, `-a codex`, or `-a github-copilot`. Install `ollygarden/skills` the same way. In Claude Code, you can also add either repository as a plugin marketplace.",
    },
    {
      q: "How do you keep the skills current?",
      a: "We periodically refresh the fact skills from upstream releases, and every change is reviewed before it merges. That maintenance is where the value is: a skill set nobody maintains becomes a liability within months.",
    },
    {
      q: "How do you know the skills help?",
      a: "Every pull request that adds or changes a skill must include evaluation results from an agent harness: the same task run without the skill, with the current skill, and with the proposed one. The change has to show an improvement, and using fewer tokens for the same result counts.",
    },
    {
      q: "Can the skills help with migrations?",
      a: "The skills hold the knowledge a migration needs, such as upgrading SDKs and the Collector, or moving from the deprecated Span Event API to the Logs API. Running a migration is a workflow, and that is what Rose provides: it applies the skills across your repositories, from upgrades to moving off a vendor's proprietary agents onto OpenTelemetry, and opens the pull requests.",
    },
    {
      q: "Do I need Rose to use the skills?",
      a: "No. The skills are useful on their own, and many teams use them with their own coding agents without any OllyGarden product.",
    },
    {
      q: "If the skills are open source, what does Rose add?",
      a: "Rose runs on demand and on a schedule across every repository in your organization, and opens pull requests with the fixes. Each review combines several agents with deterministic checks and your organization's and services' context. Rose also adds knowledge we keep proprietary, earned auditing production telemetry: detecting PII, cardinality, and cost problems, plus vendor intelligence about how each observability backend handles and prices your data.",
    },
    {
      q: "Can I keep using the skills after adopting Rose?",
      a: "Yes. Rose is built on the same packages, so your developers' agents and Rose work from the same knowledge.",
    },
    {
      q: "What data do the skills send to OllyGarden?",
      a: "None. The skills are files your agent reads on your machine, and the fact skills fetch only public upstream sources. The one exception is the `ollygarden-cli` skill, which calls the OllyGarden API when you use it with your own account.",
    },
    {
      q: "How can I contribute?",
      a: "Open an issue to propose a skill, or send a pull request. Pull requests written by AI coding agents are welcome as long as they include the evaluation evidence. First-time contributors sign the OllyGarden CLA through the pull request bot.",
    },
    {
      q: "Where do I get help?",
      a: "Open an issue in the relevant GitHub repository; support there is best effort. Report suspected vulnerabilities privately through the repository's security policy.",
    },
  ],
} as const satisfies FaqContent;
