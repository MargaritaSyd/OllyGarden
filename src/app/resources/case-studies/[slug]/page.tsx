import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/case-study-article";
import { JsonLd } from "@/components/json-ld";
import { RelatedReading } from "@/components/related-reading";
import { SiteCta } from "@/components/site-cta";
import {
  caseStudies,
  caseStudyCta,
  caseStudyHref,
  caseStudyPage,
  getCaseStudy,
} from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { caseStudyReading } from "@/lib/related";
import { resourcesCaseStudyGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // dynamicParams is false, so only known slugs reach this point.
  const study = getCaseStudy(slug)!;

  return createPageMetadata({
    title: study.seo?.title ?? study.title,
    description: study.seo?.description ?? study.dek,
    path: caseStudyHref(study.slug),
    type: "article",
    publishedTime: study.date,
    modifiedTime: study.date,
    absoluteTitle: true,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <JsonLd data={resourcesCaseStudyGraph(study)} />
      <CaseStudyArticle study={study} />
      <RelatedReading title={caseStudyPage.related} links={caseStudyReading(study)} />
      <SiteCta content={caseStudyCta} />
    </>
  );
}
