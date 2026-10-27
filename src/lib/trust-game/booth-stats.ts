// Imported by tests outside the path aliases; keep this file free of imports.

/** Device-local counters for the booth kiosk, which sends no analytics; staff copy them after the event. */
export type BoothStats = {
  games: number;
  cases: Record<string, { correct: number; total: number }>;
};

export const boothStatsKey = "ollygarden-trust-game-booth";

/** Parses the stored record; anything unreadable counts as no games. */
export function parseBoothStats(stored: string | null): BoothStats {
  try {
    const parsed = JSON.parse(stored ?? "{}") as Partial<BoothStats>;
    return {
      games: Number(parsed.games) || 0,
      cases: Object.fromEntries(
        Object.entries(parsed.cases ?? {}).map(([id, entry]) => [
          id,
          { correct: Number(entry?.correct) || 0, total: Number(entry?.total) || 0 },
        ]),
      ),
    };
  } catch {
    return { games: 0, cases: {} };
  }
}

/** Correct answers and answers given across every case. */
export function boothTotals(stats: BoothStats) {
  const entries = Object.values(stats.cases);
  return {
    correct: entries.reduce((sum, entry) => sum + entry.correct, 0),
    total: entries.reduce((sum, entry) => sum + entry.total, 0),
  };
}

export function recordBoothGame(
  stats: BoothStats,
  answers: readonly { id: string; correct: boolean }[],
): BoothStats {
  const cases = { ...stats.cases };
  for (const { id, correct } of answers) {
    const current = cases[id] ?? { correct: 0, total: 0 };
    cases[id] = { correct: current.correct + Number(correct), total: current.total + 1 };
  }
  return { games: stats.games + 1, cases };
}

/** The stored record as a string, so React can compare snapshots; null when storage is blocked. */
export function readBoothStats(): string | null {
  try {
    return window.localStorage.getItem(boothStatsKey);
  } catch {
    return null;
  }
}

export function saveBoothStats(stats: BoothStats): void {
  try {
    window.localStorage.setItem(boothStatsKey, JSON.stringify(stats));
  } catch {
    // Private mode or full storage: the game still works, the counters just don't persist.
  }
}
