import { CommunityEvents } from "@/components/community-events";
import { CommunityJoin } from "@/components/community-join";
import { CommunityWebinars } from "@/components/community-webinars";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { communityHero, communityMeta } from "@/lib/community";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesCommunityGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: communityMeta.title,
  description: communityHero.lede,
  path: communityMeta.path,
  absoluteTitle: true,
});

export default function CommunityPage() {
  return (
    <>
      <JsonLd data={resourcesCommunityGraph()} />
      <CommunityEvents />
      <CommunityWebinars />
      <CommunityJoin />
      <SiteCta />
    </>
  );
}
