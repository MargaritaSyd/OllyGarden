import { InsightsAction } from "@/components/insights-action";
import { InsightsHero } from "@/components/insights-hero";
import { InsightsHow } from "@/components/insights-how";
import { InsightsLevels } from "@/components/insights-levels";
import { InsightsPlans } from "@/components/insights-plans";
import { InsightsVoices } from "@/components/insights-voices";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import { insightsCta, insightsHero, insightsMeta } from "@/lib/insights";
import { insightsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: insightsMeta.title,
  description: insightsHero.lede,
  path: insightsMeta.path,
  absoluteTitle: true,
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={insightsGraph()} />
      <InsightsHero />
      <InsightsHow />
      <div className="relative isolate">
        <div className="tulip-grid" aria-hidden="true" />
        <div className="relative z-10">
          <InsightsAction />
        </div>
      </div>
      <InsightsLevels />
      <InsightsVoices />
      <InsightsPlans />
      <SiteCta content={insightsCta} />
    </>
  );
}
