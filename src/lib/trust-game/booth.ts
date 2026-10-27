import type { TrustCase } from "./types";
import { trustRoundSize, trustTiers } from "./score.ts";

/** Logical stage. The booth scales this canvas to the viewport. */
export const boothDesignWidth = 1920;
export const boothDesignHeight = 1080;

/** Return to the attract screen after this long without input, in milliseconds. */
export const boothIdleMs = 90_000;

/** The result screen returns on its own after this long. Pointer moves do not reset it. */
export const boothResultMs = 60_000;

/** Hide the cursor after the pointer stays still this long. */
export const boothCursorMs = 2_500;

const storageKey = "ollygarden-trust-game-booth";

export type BoothCaseStat = { correct: number; total: number };

export type BoothStats = {
  games: number;
  correct: number;
  total: number;
  /** Accuracy of each finished game, oldest first, capped at 1,000. */
  results: number[];
  cases: Record<string, BoothCaseStat>;
};

export function emptyBoothStats(): BoothStats {
  return { games: 0, correct: 0, total: 0, results: [], cases: {} };
}

export function readBoothStats(): BoothStats {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "");
    if (!parsed || typeof parsed.games !== "number") return emptyBoothStats();
    return { ...emptyBoothStats(), ...parsed, cases: parsed.cases ?? {} };
  } catch {
    return emptyBoothStats();
  }
}

export function writeBoothStats(stats: BoothStats) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  } catch {
    // A kiosk with storage disabled still plays; the booth totals stay on screen for the session.
  }
}

const serverStats = emptyBoothStats();
let clientStats: BoothStats | null = null;
const statListeners = new Set<() => void>();

export function subscribeBoothStats(listener: () => void) {
  statListeners.add(listener);
  return () => {
    statListeners.delete(listener);
  };
}

/** Cached client snapshot so useSyncExternalStore can hydrate without a mismatch. */
export function getBoothStatsSnapshot() {
  if (!clientStats) clientStats = readBoothStats();
  return clientStats;
}

export function getBoothStatsServerSnapshot() {
  return serverStats;
}

export function setBoothStats(next: BoothStats) {
  clientStats = next;
  writeBoothStats(next);
  for (const listener of statListeners) listener();
}

export function recordBoothGame(
  stats: BoothStats,
  cases: readonly Pick<TrustCase, "id">[],
  answers: readonly { correct: boolean }[],
): BoothStats {
  const nextCases = { ...stats.cases };
  cases.forEach((item, index) => {
    const previous = nextCases[item.id] ?? { correct: 0, total: 0 };
    nextCases[item.id] = {
      correct: previous.correct + Number(answers[index]?.correct),
      total: previous.total + 1,
    };
  });
  const correct = answers.filter((answer) => answer.correct).length;
  return {
    games: stats.games + 1,
    correct: stats.correct + correct,
    total: stats.total + cases.length,
    results: [...stats.results, correct / cases.length].slice(-1000),
    cases: nextCases,
  };
}

export function boothPercent(part: number, whole: number) {
  return Math.round((100 * part) / whole);
}

/** Share of earlier games this accuracy beat. Zero when the booth has no history yet. */
export function boothBeatPercent(results: readonly number[], accuracy: number) {
  if (results.length === 0) return 0;
  return boothPercent(results.filter((previous) => previous < accuracy).length, results.length);
}

/** Crowd line for one case, once the booth has seen it at least five times. */
export function boothCrowdPercent(stat: BoothCaseStat | undefined) {
  if (!stat || stat.total < 5) return null;
  return boothPercent(stat.correct, stat.total);
}

/** Tier for a 10- or 20-case round. Thresholds scale with the round length. */
export function boothTier(score: number, total: number) {
  const scale = total / trustRoundSize;
  return trustTiers.find((tier) => score >= tier.min * scale) ?? trustTiers[trustTiers.length - 1]!;
}

/** Inclusive score band for a tier on a round of `total` cases. */
export function boothTierRange(index: number, total: number) {
  const scale = total / trustRoundSize;
  const low = Math.ceil(trustTiers[index]!.min * scale);
  const high = index === 0 ? total : Math.ceil(trustTiers[index - 1]!.min * scale) - 1;
  return low === high ? `${low}` : `${low}–${high}`;
}

export function boothStage(width: number, height: number) {
  const zoom = Math.min(width / boothDesignWidth, height / boothDesignHeight);
  return { zoom, width: width / zoom, height: height / zoom };
}
