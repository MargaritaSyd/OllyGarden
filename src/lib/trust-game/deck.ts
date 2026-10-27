// Imported by tests outside the path aliases; import only by relative path with the .ts extension.
import { shuffle } from "../shuffle.ts";
import { type TrustCase, trustGameCases } from "./cases.ts";

const trustworthy = trustGameCases.filter((item) => item.truth);
const deceptive = trustGameCases.filter((item) => !item.truth);

/** Largest balanced deck the case set supports; the booth's "All" game. */
export const trustGameFullDeckSize = 2 * Math.min(trustworthy.length, deceptive.length);

/** A shuffled deck of `size` cases, half trustworthy and half deceptive. */
export function dealTrustGame(size: number): TrustCase[] {
  const half = Math.min(size, trustGameFullDeckSize) / 2;
  return shuffle([...shuffle(trustworthy).slice(0, half), ...shuffle(deceptive).slice(0, half)]);
}

export type TrustAnswer = { id: string; trusted: boolean; correct: boolean };

/** Lies the player trusted and truths they doubted. */
export function trustGameMistakes(answers: readonly TrustAnswer[]) {
  const wrong = answers.filter((answer) => !answer.correct);
  return {
    liesTrusted: wrong.filter((answer) => answer.trusted).length,
    truthsDoubted: wrong.filter((answer) => !answer.trusted).length,
  };
}
