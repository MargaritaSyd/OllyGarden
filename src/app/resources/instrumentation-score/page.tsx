import { FaqAccordion } from "@/components/faq-accordion";
import {
  ScoreCalculation,
  ScoreExample,
  ScoreGetYours,
  ScoreHero,
  ScoreProof,
  ScoreRules,
} from "@/components/instrumentation-score";
import { JsonLd } from "@/components/json-ld";
import { RelatedReading } from "@/components/related-reading";
import { SiteCta } from "@/components/site-cta";
import {
  instrumentationScoreCta,
  instrumentationScoreFaq,
  instrumentationScoreMeta,
} from "@/lib/instrumentation-score";
import { createPageMetadata } from "@/lib/metadata";
import { instrumentationScoreReading } from "@/lib/related";
import { resourcesInstrumentationScoreGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: instrumentationScoreMeta.title,
  description: instrumentationScoreMeta.description,
  path: instrumentationScoreMeta.path,
  absoluteTitle: true,
});

export default function InstrumentationScorePage() {
  return (
    <>
      <JsonLd data={resourcesInstrumentationScoreGraph()} />
      <ScoreHero />
      <ScoreCalculation />
      <ScoreRules />
      <ScoreExample />
      <ScoreGetYours />
      <ScoreProof />
      <div className="relative overflow-hidden">
        <div className="tulip-grid" aria-hidden="true" />
        <div className="relative z-[1]">
          <FaqAccordion content={instrumentationScoreFaq} startClosed />
          <RelatedReading {...instrumentationScoreReading} />
        </div>
      </div>
      <SiteCta content={instrumentationScoreCta} />
    </>
  );
}
