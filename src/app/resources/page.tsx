import { JsonLd } from "@/components/json-ld";
import {
  ResourcesGroups,
  ResourcesHero,
  ResourcesLatest,
} from "@/components/resources-hub";
import { SiteCta } from "@/components/site-cta";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesMeta } from "@/lib/resources";
import { resourcesHubGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: resourcesMeta.title,
  description: resourcesMeta.description,
  path: resourcesMeta.path,
  absoluteTitle: true,
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={resourcesHubGraph()} />
      <ResourcesHero />
      <ResourcesGroups />
      <ResourcesLatest />
      <SiteCta />
    </>
  );
}
