import { JsonLd } from "@/components/json-ld";
import { TrustGameLanding } from "@/components/trust-game-landing";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameGraph } from "@/lib/structured-data";
import { trustGameMeta } from "@/lib/trust-game/copy";

export const metadata = createPageMetadata({
  title: trustGameMeta.title,
  description: trustGameMeta.description,
  path: trustGameMeta.path,
});

export default function TrustGamePage() {
  return (
    <>
      <JsonLd data={trustGameGraph()} />
      <TrustGameLanding />
    </>
  );
}
