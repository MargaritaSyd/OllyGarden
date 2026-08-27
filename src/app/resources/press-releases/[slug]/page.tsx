import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { getPressRelease, pressReleases, pressReleaseHref } from "@/lib/press";
import { stubMetadata } from "@/lib/stub";

export function generateStaticParams() {
  return pressReleases.map((release) => ({ slug: release.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getPressRelease(slug);

  return stubMetadata(
    release?.title ?? "Press Release",
    pressReleaseHref(slug),
  );
}

export default async function PressReleaseStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getPressRelease(slug);

  if (!release) {
    notFound();
  }

  return <ComingSoon title={release.title} />;
}
