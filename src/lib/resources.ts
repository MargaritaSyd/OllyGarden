import { agentSkillsMeta } from "@/lib/agent-skills";
import { blogMeta, blogPosts } from "@/lib/blog";
import { caseStudies, caseStudiesMeta } from "@/lib/case-studies";
import { communityMeta } from "@/lib/community";
import { faqMeta } from "@/lib/faq";
import { instrumentationScoreMeta } from "@/lib/instrumentation-score";
import { pressMeta } from "@/lib/press";
import { quizQuestionCount } from "@/lib/quiz/score";
import { quizMeta } from "@/lib/quiz/topics";
import { siteConfig } from "@/lib/site";
import { telemetryQualityMeta } from "@/lib/telemetry-quality";
import { webinarsMeta } from "@/lib/webinars";

export const resourcesMeta = {
  title: "OllyGarden Resources: Guides, Stories, and Events",
  description:
    "OllyGarden resources for OpenTelemetry teams: telemetry quality guides, the Instrumentation Score, case studies, blog articles, talks, and events.",
  path: "/resources",
} as const;

export const resourcesHero = {
  badge: "OllyGarden Resources",
  title: "Everything we know about good telemetry",
  lede: "Guides, customer stories, articles, and talks from the team behind OllyGarden, written for engineers who run OpenTelemetry in production. Start with what telemetry quality means, see how it is measured, and read what changed for real teams.",
} as const;

export type ResourceLink = {
  href: string;
  label: string;
  description: string;
  cta: string;
};

type ResourceGroup = {
  id: string;
  title: string;
  items: readonly ResourceLink[];
};

export const resourceGroups: readonly ResourceGroup[] = [
  {
    id: "guides",
    title: "Guides",
    items: [
      {
        href: telemetryQualityMeta.path,
        label: "What is telemetry quality?",
        description: telemetryQualityMeta.description,
        cta: "Read the guide",
      },
      {
        href: instrumentationScoreMeta.path,
        label: "The Instrumentation Score",
        description: instrumentationScoreMeta.description,
        cta: "See the score",
      },
      {
        href: agentSkillsMeta.path,
        label: "Agent Skills",
        description: agentSkillsMeta.description,
        cta: "Install the skills",
      },
    ],
  },
  {
    id: "stories",
    title: "Stories and articles",
    items: [
      {
        href: caseStudiesMeta.path,
        label: `Case studies (${caseStudies.length})`,
        description: caseStudiesMeta.description,
        cta: "Read the stories",
      },
      {
        href: blogMeta.path,
        label: `Blog (${blogPosts.length} articles)`,
        description: blogMeta.description,
        cta: "Browse the blog",
      },
      {
        href: pressMeta.path,
        label: "Press releases",
        description: pressMeta.description,
        cta: "Read the news",
      },
    ],
  },
  {
    id: "talks",
    title: "Talks, events, and practice",
    items: [
      {
        href: webinarsMeta.path,
        label: "Webinars and conferences",
        description: webinarsMeta.description,
        cta: "Watch the talks",
      },
      {
        href: communityMeta.path,
        label: "Events",
        description: communityMeta.description,
        cta: "See upcoming events",
      },
      {
        href: "/otel-quiz",
        label: quizMeta.title,
        description: `${quizQuestionCount} questions, one per OpenTelemetry topic, that challenge even the project's maintainers.`,
        cta: "Take the quiz",
      },
    ],
  },
  {
    id: "answers",
    title: "Answers",
    items: [
      {
        href: faqMeta.path,
        label: "FAQ",
        description:
          "Answers about OllyGarden products, data privacy, rate limits, and pricing.",
        cta: "Read the FAQ",
      },
      {
        href: siteConfig.docsUrl,
        label: "Product documentation",
        description:
          "Product guides for Insights and Rose, and the OllyGarden API reference.",
        cta: "Open the docs",
      },
    ],
  },
];

export const resourcesLatest = {
  title: "Latest from the blog",
  cta: "See all articles",
  count: 3,
} as const;
