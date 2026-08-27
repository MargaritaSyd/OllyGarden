import { JsonLd } from "@/components/json-ld";
import { PressHero } from "@/components/press-hero";
import { PressList } from "@/components/press-list";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import { pressHero, pressMeta } from "@/lib/press";
import { resourcesPressGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: pressMeta.title,
  description: pressHero.lede,
  path: pressMeta.path,
  absoluteTitle: true,
});

export default function PressReleasesPage() {
  return (
    <>
      <JsonLd data={resourcesPressGraph()} />
      <PressHero />
      <PressList />
      <SiteCta />
    </>
  );
}
