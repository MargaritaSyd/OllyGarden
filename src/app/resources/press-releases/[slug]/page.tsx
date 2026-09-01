import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PressArticle } from "@/components/press-article";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import {
  getPressRelease,
  pressCta,
  pressReleases,
  pressReleaseHref,
} from "@/lib/press";
import { resourcesPressReleaseGraph } from "@/lib/structured-data";

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

  if (!release) {
    return createPageMetadata({
      title: "Press release not found",
      description: "This press release does not exist.",
      path: pressReleaseHref(slug),
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${release.title} — OllyGarden`,
    description: release.dek,
    path: pressReleaseHref(release.slug),
    type: "article",
    publishedTime: release.date,
    modifiedTime: release.date,
    absoluteTitle: true,
  });
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getPressRelease(slug);

  if (!release) {
    notFound();
  }

  return (
    <>
      <JsonLd data={resourcesPressReleaseGraph(release)} />
      <PressArticle release={release} />
      <SiteCta content={pressCta} />
    </>
  );
}
