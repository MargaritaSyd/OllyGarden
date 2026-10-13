import { CommunityEvents } from "@/components/community-events";
import { CommunityWebinars } from "@/components/community-webinars";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { communityMeta } from "@/lib/community";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesEventsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: communityMeta.title,
  description: communityMeta.description,
  path: communityMeta.path,
  absoluteTitle: true,
});

export default function EventsPage() {
  return (
    <>
      <JsonLd data={resourcesEventsGraph()} />
      <CommunityEvents />
      <CommunityWebinars />
      <SiteCta />
    </>
  );
}
