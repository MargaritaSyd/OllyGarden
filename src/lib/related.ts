import { blogPostHref, getBlogPost } from "@/lib/blog";
import { caseStudies, caseStudyHref, type CaseStudy } from "@/lib/case-studies";
import { instrumentationScoreMeta } from "@/lib/instrumentation-score";
import { getProductLink, type ProductHref } from "@/lib/nav";
import { telemetryQualityMeta } from "@/lib/telemetry-quality";

export type RelatedLink = {
  href: string;
  kicker: string;
  title: string;
  description: string;
};

const faqLink = { href: "/resources/faq", label: "Read the FAQ" };
const qualityGuideLink = { href: telemetryQualityMeta.path, label: "What is telemetry quality?" };
const pricingLink = { href: "/pricing", label: "Compare Insights and Rose pricing" };

/** Each product page's section title, recommended posts (best first), and follow-up links. */
const productReadingContent: Record<
  ProductHref,
  {
    title: string;
    posts: readonly string[];
    more: readonly { href: string; label: string }[];
    eyebrow?: string;
    explore?: { eyebrow: string; title: string; body: string };
  }
> = {
  "/products/insights": {
    title: "See Insights at work",
    posts: [
      "instrumentation-score",
      "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
      "where-sensitive-data-hides-in-opentelemetry-pipelines",
    ],
    more: [qualityGuideLink, pricingLink, faqLink],
  },
  "/products/rose": {
    title: "See Rose at work",
    posts: [
      "meet-rose-ollygardens-ai-instrumentation-agent",
      "teach-your-coding-agent-opentelemetry",
      "how-to-name-your-spans",
    ],
    more: [qualityGuideLink, pricingLink, faqLink],
    eyebrow: "Learn more",
    explore: {
      eyebrow: "Keep exploring",
      title: "More on telemetry quality",
      body: "What good telemetry looks like, how Rose and Insights are priced, and answers to common questions.",
    },
  },
};

function caseStudyLink(study: CaseStudy): RelatedLink {
  return {
    href: caseStudyHref(study.slug),
    kicker: `Case study · ${study.industry}`,
    title: study.shortTitle,
    description: study.summary,
  };
}

function postLinks(slugs: readonly string[]): RelatedLink[] {
  return slugs.map((slug) => {
    const post = getBlogPost(slug);
    if (!post) throw new Error(`Unknown blog post ${slug}`);
    return {
      href: blogPostHref(post.slug),
      kicker: "Blog",
      title: post.title,
      description: post.excerpt,
    };
  });
}

function productLink(href: ProductHref): RelatedLink {
  const link = getProductLink(href);
  return { href, kicker: "Product", title: link.heading, description: link.description };
}

/** The product page's related section: case studies that used it, then its recommended posts. */
export function productReading(href: ProductHref) {
  const { title, posts, more, eyebrow, explore } = productReadingContent[href];
  return {
    title,
    more,
    eyebrow,
    explore,
    links: [
      ...caseStudies.filter((study) => study.products.includes(href)).map(caseStudyLink),
      ...postLinks(posts),
    ],
  };
}

const scoreLink: RelatedLink = {
  href: instrumentationScoreMeta.path,
  kicker: "Guide",
  title: "The Instrumentation Score",
  description: "How the open 0–100 score for instrumentation quality is calculated, and every rule behind it.",
};

/** The products a case study used, then the posts that continue it. */
export function caseStudyReading(study: CaseStudy): RelatedLink[] {
  return [
    ...study.products.map(productLink),
    ...(study.products.includes("/products/insights") ? [scoreLink] : []),
    ...postLinks(study.relatedPosts),
  ];
}

/** The Instrumentation Score page's closing links: the launch post and the guides behind its rules. */
export const instrumentationScoreReading = {
  title: "Keep reading",
  links: postLinks([
    "instrumentation-score",
    "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
    "where-sensitive-data-hides-in-opentelemetry-pipelines",
  ]),
  more: [
    qualityGuideLink,
    { href: "/resources/webinars-conferences", label: "Watch the KubeCon talk on the score" },
    { href: "/resources/faq", label: "Read the FAQ" },
  ],
  eyebrow: "Learn more",
  explore: {
    eyebrow: "Keep exploring",
    title: "More on telemetry quality",
    body: "What telemetry quality is, the KubeCon talk on the score, and answers to common questions.",
  },
};

/** The telemetry quality guide's closing links: the posts it grew out of, then how to measure it. */
export const telemetryQualityReading = {
  title: "Keep reading",
  links: postLinks([
    "theres-a-lot-of-bad-telemetry-out-there",
    "you-dont-have-too-much-telemetry-you-have-bad-telemetry",
    "instrumentation-score",
  ]),
  more: [
    { href: instrumentationScoreMeta.path, label: "How the Instrumentation Score works" },
    { href: "/resources/case-studies", label: "Read the case studies" },
    faqLink,
  ],
  eyebrow: "Learn more",
  explore: {
    eyebrow: "Keep exploring",
    title: "More on telemetry quality",
    body: "How the score is calculated, what it found on real systems, and answers to common questions.",
  },
};
