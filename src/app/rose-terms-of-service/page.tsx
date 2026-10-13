import { JsonLd } from "@/components/json-ld";
import RoseTerms from "@/components/legal/rose-terms";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/rose-terms-of-service";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function RoseTermsPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <RoseTerms />
    </>
  );
}
