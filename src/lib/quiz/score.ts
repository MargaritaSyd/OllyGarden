// Imported by src/lib/og-cards.ts, which scripts/render-og-images.mjs loads outside the
// tsconfig path aliases. Keep this file free of imports.

/** One question per topic; a test keeps this in step with the question bank. */
export const quizQuestionCount = 10;

export const quizScores = Array.from({ length: quizQuestionCount + 1 }, (_, score) => score);

export const quizPitch = "Ten OpenTelemetry questions, one per topic. How deep are your roots?";

/** Score tiers, highest first. Result screens, result pages, and their cards share them. */
const quizTiers = [
  {
    min: 10,
    name: "deep roots",
    emoji: "🌳",
    message: "A perfect score. Your OpenTelemetry knowledge runs all the way down.",
  },
  {
    min: 8,
    name: "in full bloom",
    emoji: "🌸",
    message: "Strong roots. Your OpenTelemetry fundamentals are in excellent shape.",
  },
  {
    min: 6,
    name: "sprouting nicely",
    emoji: "🌿",
    message: "Solid growth. Review the explanations and keep cultivating the details.",
  },
  {
    min: 4,
    name: "a healthy seedling",
    emoji: "🌱",
    message: "A healthy start. The explanations point to the concepts worth revisiting.",
  },
  {
    min: 0,
    name: "seeds planted",
    emoji: "🪴",
    message: "Every expert starts somewhere. The explanations point to the concepts worth revisiting.",
  },
] as const;

export function quizTier(score: number) {
  return quizTiers.find((tier) => score >= tier.min)!;
}

/** Key of the score's Open Graph card in og-cards.ts; not a route. */
export function quizCardPath(score: number) {
  return `/otel-quiz/score/${score}`;
}

const tokenAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const tokenPattern = /^[0-9a-z]{8}$/;

/**
 * Result links carry a random-looking token whose FNV-1a hash mod 11 is the score, so editing the
 * URL doesn't pick a score. It is obfuscation, not a signature: anyone can mint a token.
 */
export function quizScoreFromToken(token: string): number | null {
  if (!tokenPattern.test(token)) return null;
  let hash = 0x811c9dc5;
  for (const char of token) hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193);
  return (hash >>> 0) % (quizQuestionCount + 1);
}

/** A fresh random token that maps back to `score`; each call returns a different one. */
export function quizResultToken(score: number) {
  let token;
  do {
    token = Array.from(
      { length: 8 },
      () => tokenAlphabet[Math.floor(Math.random() * tokenAlphabet.length)],
    ).join("");
  } while (quizScoreFromToken(token) !== score);
  return token;
}

export function quizResultPath(token: string) {
  return `/otel-quiz/result/${token}`;
}
