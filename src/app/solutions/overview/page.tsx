import { JsonLd } from "@/components/json-ld";
import { SolutionsHero } from "@/components/solutions-hero";
import { SolutionsIndustries } from "@/components/solutions-industries";
import { createPageMetadata } from "@/lib/metadata";
import { solutionsHero, solutionsMeta } from "@/lib/solutions";
import { solutionsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: solutionsMeta.title,
  description: solutionsHero.lede,
  path: solutionsMeta.path,
  absoluteTitle: true,
});

export default function SolutionsOverviewPage() {
  return (
    <>
      <JsonLd data={solutionsGraph()} />
      <SolutionsHero />
      <SolutionsIndustries />
    </>
  );
}
