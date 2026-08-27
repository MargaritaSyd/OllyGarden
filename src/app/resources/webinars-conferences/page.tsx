import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { WebinarsHero } from "@/components/webinars-hero";
import { WebinarsSessions } from "@/components/webinars-sessions";
import { WebinarsStage } from "@/components/webinars-stage";
import { createPageMetadata } from "@/lib/metadata";
import { webinarsHero, webinarsMeta } from "@/lib/webinars";
import { resourcesWebinarsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: webinarsMeta.title,
  description: webinarsHero.lede,
  path: webinarsMeta.path,
  absoluteTitle: true,
});

export default function WebinarsConferencesPage() {
  return (
    <>
      <JsonLd data={resourcesWebinarsGraph()} />
      <WebinarsHero />
      <WebinarsSessions />
      <WebinarsStage />
      <SiteCta />
    </>
  );
}
