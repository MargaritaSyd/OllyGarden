import { CaseStudyProof } from "@/components/case-studies";
import { FinancialHero } from "@/components/financial-hero";
import { FinancialPageFx } from "@/components/financial-page-fx";
import { FinancialPains } from "@/components/financial-pains";
import { FinancialProducts } from "@/components/financial-products";
import { FinancialStats } from "@/components/financial-stats";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { financialCta, financialMeta } from "@/lib/financial";
import { solutionIndustries } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { financialGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: financialMeta.title,
  description: financialMeta.description,
  path: financialMeta.path,
  absoluteTitle: true,
});

export default function FinancialServicesPage() {
  return (
    <>
      <JsonLd data={financialGraph()} />
      <FinancialHero />
      <FinancialPains />
      <FinancialStats />
      <CaseStudyProof industry={solutionIndustries.financial} />
      <FinancialProducts />
      <SiteCta content={financialCta} />
      <FinancialPageFx />
    </>
  );
}
