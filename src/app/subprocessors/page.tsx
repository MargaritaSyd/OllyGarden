import { JsonLd } from "@/components/json-ld";
import Subprocessors from "@/components/legal/subprocessors";
import { legalPages } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";
import { legalPageGraph } from "@/lib/structured-data";

const path = "/subprocessors";

export const metadata = createPageMetadata({ ...legalPages[path], path });

export default function SubprocessorsPage() {
  return (
    <>
      <JsonLd data={legalPageGraph(path)} />
      <Subprocessors />
    </>
  );
}
