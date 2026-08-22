import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

const titles: Record<string, string> = {
  overview: "Solutions",
  "financial-services": "Financial Services",
  "retail-ecommerce": "Retail & E-commerce",
  "enterprise-software": "Enterprise Software",
};

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
  const title = titles[slug] ?? "Solutions";

  return stubMetadata(title, `/solutions/${slug}`);
}

export default async function SolutionStubPage({
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
