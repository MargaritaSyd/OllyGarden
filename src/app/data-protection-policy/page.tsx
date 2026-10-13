import { JsonLd } from "@/components/json-ld";
import DataProtection from "@/components/legal/data-protection";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/data-protection-policy";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function DataProtectionPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <DataProtection />
    </>
  );
}
