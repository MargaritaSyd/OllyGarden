import { JsonLd } from "@/components/json-ld";
import Terms from "@/components/legal/terms";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/terms-of-use";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <Terms />
    </>
  );
}
