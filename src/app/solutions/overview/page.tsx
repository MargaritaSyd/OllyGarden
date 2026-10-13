import { CaseStudyProof } from "@/components/case-studies";
import { JsonLd } from "@/components/json-ld";
import { SolutionsHero } from "@/components/solutions-hero";
import { SolutionsIndustries } from "@/components/solutions-industries";
import { SolutionsOverviewFx } from "@/components/solutions-overview-fx";
import { createPageMetadata } from "@/lib/metadata";
import { solutionsMeta } from "@/lib/solutions";
import { solutionsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: solutionsMeta.title,
  description: solutionsMeta.description,
  path: solutionsMeta.path,
  absoluteTitle: true,
});

export default function SolutionsOverviewPage() {
  return (
    <>
      <JsonLd data={solutionsGraph()} />
      <SolutionsHero />
      <SolutionsIndustries />
      <CaseStudyProof />
      <SolutionsOverviewFx />
    </>
  );
}
