import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TrustGameLanding } from "@/components/trust-game-landing";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameGraph } from "@/lib/structured-data";
import {
  trustCardPath,
  trustPitch,
  trustResultPath,
  trustRoundSize,
  trustScoreFromToken,
  trustTier,
} from "@/lib/trust-game/score";

type Params = Promise<{ token: string }>;

function scoreFrom(token: string) {
  const score = trustScoreFromToken(token);
  if (score === null) notFound();
  return score;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { token } = await params;
  const score = scoreFrom(token);
  const tier = trustTier(score);
  return createPageMetadata({
    title: `${score}/${trustRoundSize}: ${tier.name}`,
    description: `Someone called ${score}/${trustRoundSize} telemetry conclusions right: ${tier.name}. ${trustPitch}`,
    path: trustResultPath(token),
    ogCard: trustCardPath(score),
    noIndex: true,
  });
}

/** Landing page for a shared Trust Game score. The token's card is the social image. */
export default async function TrustGameResultPage({ params }: { params: Params }) {
  const score = scoreFrom((await params).token);

  return (
    <>
      <JsonLd data={trustGameGraph()} />
      <TrustGameLanding sharedScore={score} />
    </>
  );
}
