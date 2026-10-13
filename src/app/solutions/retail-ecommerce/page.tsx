import { CaseStudyProof } from "@/components/case-studies";
import { FinancialHero } from "@/components/financial-hero";
import { FinancialPains } from "@/components/financial-pains";
import { FinancialProducts } from "@/components/financial-products";
import { FinancialStats } from "@/components/financial-stats";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { solutionIndustries } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import {
  retailCta,
  retailHero,
  retailMeta,
  retailPains,
  retailProducts,
  retailStats,
} from "@/lib/retail";
import { retailGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: retailMeta.title,
  description: retailMeta.description,
  path: retailMeta.path,
  absoluteTitle: true,
});

export default function RetailEcommercePage() {
  return (
    <>
      <JsonLd data={retailGraph()} />
      <FinancialHero content={retailHero} imageSrc="/images/solutions/retail/hero.svg" />
      <FinancialPains content={retailPains} glyph={retailPains.glyph} />
      <FinancialStats content={retailStats} />
      <CaseStudyProof industry={solutionIndustries.retail} />
      <FinancialProducts content={retailProducts} glyph={retailProducts.glyph} />
      <SiteCta content={retailCta} />
    </>
  );
}
