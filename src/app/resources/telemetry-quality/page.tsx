import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { RelatedReading } from "@/components/related-reading";
import { SiteCta } from "@/components/site-cta";
import {
  QualityDimensions,
  QualityGood,
  QualityHero,
  QualityNext,
} from "@/components/telemetry-quality";
import { createPageMetadata } from "@/lib/metadata";
import { telemetryQualityReading } from "@/lib/related";
import { resourcesTelemetryQualityGraph } from "@/lib/structured-data";
import {
  telemetryQualityCta,
  telemetryQualityFaq,
  telemetryQualityMeta,
} from "@/lib/telemetry-quality";

export const metadata = createPageMetadata({
  title: telemetryQualityMeta.title,
  description: telemetryQualityMeta.description,
  path: telemetryQualityMeta.path,
  absoluteTitle: true,
});

export default function TelemetryQualityPage() {
  return (
    <>
      <JsonLd data={resourcesTelemetryQualityGraph()} />
      <QualityHero />
      <QualityGood />
      <QualityDimensions />
      <QualityNext />
      <div className="relative overflow-hidden">
        <div className="tulip-grid" aria-hidden="true" />
        <div className="relative z-[1]">
          <FaqAccordion content={telemetryQualityFaq} inset="guide" />
          <RelatedReading {...telemetryQualityReading} inset="guide" />
        </div>
      </div>
      <SiteCta content={telemetryQualityCta} />
    </>
  );
}
