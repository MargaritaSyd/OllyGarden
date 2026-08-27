import { CareersInterview } from "@/components/careers-interview";
import { CareersJoin } from "@/components/careers-join";
import { CareersWhy } from "@/components/careers-why";
import { FinancialHero } from "@/components/financial-hero";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { careersHero, careersMeta } from "@/lib/careers";
import { createPageMetadata } from "@/lib/metadata";
import { careersGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: careersMeta.title,
  description: careersHero.lede,
  path: careersMeta.path,
  absoluteTitle: true,
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={careersGraph()} />
      <FinancialHero
        content={careersHero}
        imageSrc={careersHero.image}
        ctaHref={careersHero.ctaHref}
        labelledBy="careers-title"
      />
      <CareersJoin />
      <CareersInterview />
      <CareersWhy />
      <SiteCta />
    </>
  );
}
