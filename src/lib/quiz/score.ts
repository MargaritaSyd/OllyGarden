// Imported by src/lib/og-cards.ts, which scripts/render-og-images.mjs loads outside the
// tsconfig path aliases. Import only other import-free modules, by relative path with the .ts
// extension.
import { resultToken, scoreFromToken } from "../result-token.ts";

/** One question per topic; a test keeps this in step with the question bank. */
export const quizQuestionCount = 10;

export const quizScores = Array.from({ length: quizQuestionCount + 1 }, (_, score) => score);

export const quizPitch = "Ten OpenTelemetry questions, one per topic. How deep are your roots?";

/** Score tiers, highest first. Result screens, result pages, and their cards share them. */
const quizTiers = [
  {
    min: 10,
    stage: 4,
    name: "deep roots",
    emoji: "🌳",
    message: "A perfect score. Your OpenTelemetry knowledge runs all the way down.",
  },
  {
    min: 8,
    stage: 3,
    name: "in full bloom",
    emoji: "🌸",
    message: "Strong roots. Your OpenTelemetry fundamentals are in excellent shape.",
  },
  {
    min: 6,
    stage: 2,
    name: "sprouting nicely",
    emoji: "🌿",
    message: "Solid growth. Review the explanations and keep cultivating the details.",
  },
  {
    min: 4,
    stage: 1,
    name: "a healthy seedling",
    emoji: "🌱",
    message: "A healthy start. The explanations point to the concepts worth revisiting.",
  },
  {
    min: 0,
    stage: 0,
    name: "seeds planted",
    emoji: "🪴",
    message: "Every expert starts somewhere. The explanations point to the concepts worth revisiting.",
  },
] as const;

/** Lowest score first, with the inclusive top of each band, for the ladder on the quiz. */
export const quizLadder = [...quizTiers].reverse().map((tier, index, tiers) => {
  const next = tiers[index + 1];
  return { ...tier, max: next ? next.min - 1 : quizQuestionCount };
});

export function quizTier(score: number) {
  return quizTiers.find((tier) => score >= tier.min)!;
}

/** Key of the score's Open Graph card in og-cards.ts; not a route. */
export function quizCardPath(score: number) {
  return `/otel-quiz/score/${score}`;
}

/** The score a shared result token stands for, or null when the token is malformed. */
export function quizScoreFromToken(token: string): number | null {
  return scoreFromToken(token, quizQuestionCount);
}

/** A fresh result token for `score`; each call returns a different one. */
export function quizResultToken(score: number) {
  return resultToken(score, quizQuestionCount);
}

export function quizResultPath(token: string) {
  return `/otel-quiz/result/${token}`;
}
