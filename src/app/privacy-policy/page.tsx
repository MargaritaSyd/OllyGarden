import { JsonLd } from "@/components/json-ld";
import Privacy from "@/components/legal/privacy";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/privacy-policy";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <Privacy />
    </>
  );
}
