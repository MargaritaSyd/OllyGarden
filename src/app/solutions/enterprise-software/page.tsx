import { FinancialHero } from "@/components/financial-hero";
import { FinancialPains } from "@/components/financial-pains";
import { FinancialProducts } from "@/components/financial-products";
import { FinancialStats } from "@/components/financial-stats";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import {
  enterpriseCta,
  enterpriseHero,
  enterpriseMeta,
  enterprisePains,
  enterpriseProducts,
  enterpriseStats,
} from "@/lib/enterprise";
import { createPageMetadata } from "@/lib/metadata";
import { enterpriseGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: enterpriseMeta.title,
  description: enterpriseHero.lede,
  path: enterpriseMeta.path,
  absoluteTitle: true,
});

export default function EnterpriseSoftwarePage() {
  return (
    <>
      <JsonLd data={enterpriseGraph()} />
      <FinancialHero content={enterpriseHero} imageSrc="/images/solutions/enterprise/hero.svg" />
      <FinancialPains content={enterprisePains} glyph={enterprisePains.glyph} />
      <FinancialStats content={enterpriseStats} />
      <FinancialProducts content={enterpriseProducts} glyph={enterpriseProducts.glyph} />
      <SiteCta content={enterpriseCta} />
    </>
  );
}
