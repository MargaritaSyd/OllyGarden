import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

const titles: Record<string, string> = {
  insights: "Insights",
  rose: "Rose",
  tulip: "Tulip",
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
      description={
        slug === "polder"
          ? "Polder is coming soon."
          : `${title} will land here in the next stage.`
      }
    />
  );
}
