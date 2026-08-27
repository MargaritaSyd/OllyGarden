import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

const titles: Record<string, string> = {
  polder: "Polder",
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
  const title = titles[slug] ?? "Product";

  return stubMetadata(title, `/products/${slug}`);
}

export default async function ProductStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titles[slug];

  if (!title) {
    notFound();
  }

  return (
    <ComingSoon
      title={title}
      description="Polder is coming soon."
    />
  );
}
