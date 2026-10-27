// Imported by src/lib/og-cards.ts, which scripts/render-og-images.mjs loads outside the
// tsconfig path aliases. Import only other import-free modules, by relative path with the .ts
// extension.
import { resultToken, scoreFromToken } from "../result-token.ts";

export const trustGamePath = "/resources/trust-your-telemetry";

/** Cases in a web game, half trustworthy and half deceptive; shared results are scored out of it. */
export const trustGameDeckSize = 10;

export const trustGameSharePitch =
  "Ten real OpenTelemetry cases and the conclusions people drew from them. Which would you trust?";

/** Score tiers, highest first; `min` is the share of the deck answered correctly. */
export const trustGameTiers = [
  {
    id: "sommelier",
    min: 1,
    name: "Telemetry sommelier",
    emoji: "🍷",
    message: "A perfect read. No bad conclusion gets past you.",
  },
  {
    id: "seasoned",
    min: 0.8,
    name: "Seasoned on-call",
    emoji: "📟",
    message: "Sharp instincts. Very few bad calls fool you.",
  },
  {
    id: "skeptic",
    min: 0.6,
    name: "Healthy skeptic",
    emoji: "🧐",
    message: "You question conclusions, which is the right habit. The tells are worth a second look.",
  },
  {
    id: "optimist",
    min: 0.4,
    name: "Dashboard optimist",
    emoji: "📈",
    message: "You accept conclusions a little too readily. The tells show where they fooled you.",
  },
  {
    id: "paged",
    min: 0,
    name: "Paged at 3 a.m.",
    emoji: "🌙",
    message: "The telemetry won this round. Each reveal shows the tell to watch for next time.",
  },
] as const;

export type TrustGameTier = (typeof trustGameTiers)[number];

export function trustGameTier(score: number, deckSize: number): TrustGameTier {
  return trustGameTiers.find((tier) => score >= tier.min * deckSize)!;
}

/** Inclusive score band for each tier on a round of `total` cases, lowest tier first. */
export function trustGameTierStops(total: number) {
  const ascending = [...trustGameTiers].reverse();
  return ascending.map((tier, index) => {
    const low = Math.ceil(tier.min * total);
    const next = ascending[index + 1];
    const high = next ? Math.ceil(next.min * total) - 1 : total;
    return { tier, low, high: Math.max(low, high) };
  });
}

/** Key of the tier's Open Graph card in og-cards.ts; not a route. */
export function trustGameCardPath(tier: TrustGameTier) {
  return `${trustGamePath}/tier/${tier.id}`;
}

/** The score a shared result token stands for, or null when the token is malformed. */
export function trustGameScoreFromToken(token: string): number | null {
  return scoreFromToken(token, trustGameDeckSize);
}

/** A fresh result token for `score`; each call returns a different one. */
export function trustGameResultToken(score: number) {
  return resultToken(score, trustGameDeckSize);
}

export function trustGameResultPath(token: string) {
  return `${trustGamePath}/result/${token}`;
}
