import { JsonLd } from "@/components/json-ld";
import { RoseAction } from "@/components/rose-action";
import { RoseClients } from "@/components/rose-clients";
import { RoseContext } from "@/components/rose-context";
import { RoseHero } from "@/components/rose-hero";
import { RoseHow } from "@/components/rose-how";
import { RoseMatters } from "@/components/rose-matters";
import { RosePlans } from "@/components/rose-plans";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import { roseCta, roseHero, roseMeta } from "@/lib/rose";
import { roseGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: roseMeta.title,
  description: roseHero.lede,
  path: roseMeta.path,
  absoluteTitle: true,
});

export default function RosePage() {
  return (
    <>
      <JsonLd data={roseGraph()} />
      <RoseHero />
      <RoseHow />
      <RoseAction />
      <RoseMatters />
      <RoseClients />
      <RoseContext />
      <RosePlans />
      <SiteCta content={roseCta} />
    </>
  );
}
