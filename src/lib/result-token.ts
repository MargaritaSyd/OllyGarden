// Imported by src/lib/quiz/score.ts and src/lib/trust-game/score.ts, which og-cards.ts loads
// outside the tsconfig path aliases. Keep this file free of imports.

const tokenAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const tokenPattern = /^[0-9a-z]{8}$/;

/**
 * Shared result links carry a random-looking token whose FNV-1a hash mod (maxScore + 1) is the
 * score, so editing the URL doesn't pick a score. It is obfuscation, not a signature: anyone can
 * mint a token.
 */
export function scoreFromToken(token: string, maxScore: number): number | null {
  if (!tokenPattern.test(token)) return null;
  let hash = 0x811c9dc5;
  for (const char of token) hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193);
  return (hash >>> 0) % (maxScore + 1);
}

/** A fresh random token that maps back to `score`; each call returns a different one. */
export function resultToken(score: number, maxScore: number) {
  let token;
  do {
    token = Array.from(
      { length: 8 },
      () => tokenAlphabet[Math.floor(Math.random() * tokenAlphabet.length)],
    ).join("");
  } while (scoreFromToken(token, maxScore) !== score);
  return token;
}
