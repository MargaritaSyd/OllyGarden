import type { TrustCase } from "./types";

function shuffle<T>(items: readonly T[], random: () => number) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [next[index], next[swap]] = [next[swap]!, next[index]!];
  }
  return next;
}

/** Five conclusions that hold and five that don't, in random order. */
export function dealTrustCases(cases: readonly TrustCase[], random: () => number = Math.random) {
  const holds = shuffle(
    cases.filter((item) => item.truth),
    random,
  ).slice(0, 5);
  const misses = shuffle(
    cases.filter((item) => !item.truth),
    random,
  ).slice(0, 5);
  return shuffle([...holds, ...misses], random);
}
