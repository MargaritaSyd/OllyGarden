import { FaqAccordion } from "@/components/faq-accordion";
import { InsightsPlans } from "@/components/insights-plans";
import { JsonLd } from "@/components/json-ld";
import { PricingHero } from "@/components/pricing-hero";
import { RosePlans } from "@/components/rose-plans";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import {
  pricingCta,
  pricingFaq,
  pricingInsights,
  pricingMeta,
  pricingRose,
} from "@/lib/pricing";
import { pricingGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: pricingMeta.title,
  description: pricingMeta.description,
  path: pricingMeta.path,
  absoluteTitle: true,
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingGraph()} />
      <PricingHero />
      <InsightsPlans id="insights" heading={pricingInsights} />
      <RosePlans id="rose" heading={pricingRose} />
      <FaqAccordion content={pricingFaq} />
      <SiteCta content={pricingCta} />
    </>
  );
}
