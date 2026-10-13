import { JsonLd } from "@/components/json-ld";
import Security from "@/components/legal/security";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/security";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <Security />
    </>
  );
}
