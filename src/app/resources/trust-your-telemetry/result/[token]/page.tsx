import { notFound } from "next/navigation";
import { GetStartedLink } from "@/components/get-started-link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameGraph } from "@/lib/structured-data";
import { registerOpenTelemetry } from "@/lib/trademarks";
import {
  trustGameCardPath,
  trustGameDeckSize,
  trustGamePath,
  trustGameResultPath,
  trustGameScoreFromToken,
  trustGameSharePitch,
  trustGameTier,
} from "@/lib/trust-game/score";

type Params = Promise<{ token: string }>;

function scoreFrom(token: string) {
  const score = trustGameScoreFromToken(token);
  if (score === null) notFound();
  return score;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { token } = await params;
  const score = scoreFrom(token);
  const tier = trustGameTier(score, trustGameDeckSize);
  return createPageMetadata({
    title: `${score}/${trustGameDeckSize} on Trust Your Telemetry?`,
    description: `Someone scored ${score}/${trustGameDeckSize}, ${tier.name}. ${trustGameSharePitch}`,
    path: trustGameResultPath(token),
    ogCard: trustGameCardPath(tier),
    noIndex: true,
  });
}

/** Landing page for shared game results; it carries the tier's card and sends visitors to the game. */
export default async function TrustGameResultPage({ params }: { params: Params }) {
  const score = scoreFrom((await params).token);

  return (
    <>
      <JsonLd data={trustGameGraph({ faq: false })} />
      <PageHero
        eyebrow="Trust Your Telemetry? result"
        titleId="trust-result-title"
        title={
          <>
            <span className="text-sunflower">
              {score}/{trustGameDeckSize}
            </span>
            : {trustGameTier(score, trustGameDeckSize).name}
          </>
        }
        lede={registerOpenTelemetry(
          `Someone shared their score on OllyGarden's telemetry trust game. ${trustGameSharePitch}`,
        )}
      >
        <GetStartedLink
          href={trustGamePath}
          analytics={{ id: "trust_game_result_play", section: "trust_game_result_hero" }}
        >
          Play the game
        </GetStartedLink>
      </PageHero>
    </>
  );
}
