import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { featuredResources } from "@/lib/nav";
import { stubMetadata } from "@/lib/stub";

const titles = Object.fromEntries(
  featuredResources
    .filter((item) => item.href.startsWith("/resources/blog/"))
    .map((item) => [item.href.slice("/resources/blog/".length), item.title]),
);

export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titles[slug] ?? "Article";

  return stubMetadata(title, `/resources/blog/${slug}`);
}

export default async function FeaturedBlogStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titles[slug];

  if (!title) {
    notFound();
  }

  return <ComingSoon title={title} />;
}
