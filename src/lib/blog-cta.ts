import { agentSkillsMeta } from "@/lib/agent-skills";
import { getProductLink, type MenuIconName, type ProductHref } from "@/lib/nav";
import { getAbsoluteUrl } from "@/lib/site";

export type BlogCtaKind = "insights" | "rose" | "skills";

/** The post-specific pitch; the product supplies the label, icon, and link. */
export type BlogPostCta = {
  kind: BlogCtaKind;
  title: string;
  body: string;
};

type BlogCtaProduct = { icon: MenuIconName; eyebrow: string; cta: string; href: string };

function productCta(href: ProductHref, cta: string): BlogCtaProduct {
  const link = getProductLink(href);
  return { icon: link.icon, eyebrow: link.heading, cta, href };
}

export const blogCtaProducts: Record<BlogCtaKind, BlogCtaProduct> = {
  insights: productCta("/products/insights", "Explore Insights"),
  rose: productCta("/products/rose", "Meet Rose"),
  skills: {
    icon: "sprout",
    eyebrow: "Open source Agent Skills",
    cta: "Get the skills",
    href: agentSkillsMeta.path,
  },
};

/** Article HTML marks where the post's call to action goes with `<!-- cta -->`. */
const ctaMarker = /<!--\s*cta\s*-->/;

/** Splits article HTML around the call to action; without a marker it closes the article. */
export function splitBlogCta(html: string): [before: string, after: string] {
  const [before, after = ""] = html.split(ctaMarker);
  return [before, after];
}

/** Replaces the marker with a paragraph so the Markdown version keeps the call to action. */
export function expandBlogCta(html: string, cta: BlogPostCta) {
  const product = blogCtaProducts[cta.kind];
  const paragraph = `<p><strong>${cta.title}.</strong> ${cta.body} <a href="${getAbsoluteUrl(product.href)}">${product.cta}</a></p>`;
  const [before, after] = splitBlogCta(html);
  return `${before}${paragraph}${after}`;
}
