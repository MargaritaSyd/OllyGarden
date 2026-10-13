import { CaseStudiesHero, CaseStudiesList } from "@/components/case-studies";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { caseStudiesMeta, caseStudyCta } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesCaseStudiesGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: caseStudiesMeta.title,
  description: caseStudiesMeta.description,
  path: caseStudiesMeta.path,
  absoluteTitle: true,
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={resourcesCaseStudiesGraph()} />
      <CaseStudiesHero />
      <CaseStudiesList />
      <SiteCta content={caseStudyCta} />
    </>
  );
}
