// Imported by src/lib/og-cards.ts, which scripts/render-og-images.mjs loads outside the
// tsconfig path aliases. Keep this file free of imports.

/** Cases dealt in one game. The bank is larger; each round is half that hold and half that don't. */
export const trustRoundSize = 10;

export const trustScores = Array.from({ length: trustRoundSize + 1 }, (_, score) => score);

export const trustPitch = "Ten telemetry conclusions. Does the data back them up?";

/** Score tiers, highest first. Result screens, shared pages, and their cards share them. */
export const trustTiers = [
  {
    min: 10,
    name: "Telemetry sommelier",
    emoji: "🍷",
    message: "A perfect read. No bad conclusion gets past you.",
  },
  {
    min: 8,
    name: "Seasoned on-call",
    emoji: "📟",
    message: "Sharp instincts. Very few bad calls fool you.",
  },
  {
    min: 6,
    name: "Healthy skeptic",
    emoji: "🧐",
    message: "You question conclusions, which is the right habit. The tells are worth a second look.",
  },
  {
    min: 4,
    name: "Dashboard optimist",
    emoji: "📈",
    message: "You accept conclusions a little too readily. The tells show where they fooled you.",
  },
  {
    min: 0,
    name: "Paged at 3 a.m.",
    emoji: "🌙",
    message: "The telemetry won this round. Each reveal shows the tell to watch for next time.",
  },
] as const;

export function trustTier(score: number) {
  return trustTiers.find((tier) => score >= tier.min)!;
}

/** Inclusive score band for a tier, highest tier first. */
export function trustTierRange(index: number, total = trustRoundSize) {
  const low = trustTiers[index].min;
  const high = index === 0 ? total : trustTiers[index - 1].min - 1;
  return low === high ? `${low}` : `${low}–${high}`;
}

/** Key of the score's Open Graph card in og-cards.ts; not a route. */
export function trustCardPath(score: number) {
  return `/resources/trust-game/score/${score}`;
}

const tokenAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const tokenPattern = /^[0-9a-z]{8}$/;

/**
 * Result links carry a random-looking token whose FNV-1a hash mod 11 is the score, so editing the
 * URL doesn't pick a score. It is obfuscation, not a signature: anyone can mint a token.
 */
export function trustScoreFromToken(token: string): number | null {
  if (!tokenPattern.test(token)) return null;
  let hash = 0x811c9dc5;
  for (const char of token) hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193);
  return (hash >>> 0) % (trustRoundSize + 1);
}

/** A fresh random token that maps back to `score`; each call returns a different one. */
export function trustResultToken(score: number) {
  let token;
  do {
    token = Array.from(
      { length: 8 },
      () => tokenAlphabet[Math.floor(Math.random() * tokenAlphabet.length)],
    ).join("");
  } while (trustScoreFromToken(token) !== score);
  return token;
}

export function trustResultPath(token: string) {
  return `/resources/trust-game/result/${token}`;
}
