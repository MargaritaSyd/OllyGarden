import { JsonLd } from "@/components/json-ld";
import Imprint from "@/components/legal/imprint";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/imprint";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function ImprintPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <Imprint />
    </>
  );
}
