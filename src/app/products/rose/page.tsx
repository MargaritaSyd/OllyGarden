import { JsonLd } from "@/components/json-ld";
import { RelatedReading } from "@/components/related-reading";
import { RoseClients } from "@/components/rose-clients";
import { RoseDoes } from "@/components/rose-does";
import { RoseFaq } from "@/components/rose-faq";
import { RoseHero } from "@/components/rose-hero";
import { RoseHow } from "@/components/rose-how";
import { RoseMvi } from "@/components/rose-mvi";
import { RosePlans } from "@/components/rose-plans";
import { RoseProblem } from "@/components/rose-problem";
import { RoseSecurity } from "@/components/rose-security";
import { RoseTeams } from "@/components/rose-teams";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import { productReading } from "@/lib/related";
import { roseCta, roseMeta } from "@/lib/rose";
import { roseGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: roseMeta.title,
  description: roseMeta.description,
  path: roseMeta.path,
  absoluteTitle: true,
});

export default function RosePage() {
  return (
    <>
      <JsonLd data={roseGraph()} />
      <RoseHero />
      <RoseProblem />
      <RoseDoes />
      <RoseHow />
      <RoseMvi />
      <RoseTeams />
      <RoseClients />
      <RoseSecurity />
      <RosePlans />
      <RelatedReading {...productReading(roseMeta.path)} />
      <RoseFaq />
      <SiteCta content={roseCta} />
    </>
  );
}
