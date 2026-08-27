import { FinancialHero } from "@/components/financial-hero";
import { FinancialPains } from "@/components/financial-pains";
import { FinancialProducts } from "@/components/financial-products";
import { FinancialStats } from "@/components/financial-stats";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { financialCta, financialHero, financialMeta } from "@/lib/financial";
import { createPageMetadata } from "@/lib/metadata";
import { financialGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: financialMeta.title,
  description: financialHero.lede,
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
      <FinancialProducts />
      <SiteCta content={financialCta} />
    </>
  );
}
