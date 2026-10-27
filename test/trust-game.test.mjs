import assert from "node:assert/strict";
import test from "node:test";
import { boothTotals, parseBoothStats, recordBoothGame } from "../src/lib/trust-game/booth-stats.ts";
import { trustGameCases } from "../src/lib/trust-game/cases.ts";
import { dealTrustGame, trustGameFullDeckSize, trustGameMistakes } from "../src/lib/trust-game/deck.ts";
import {
  trustGameDeckSize,
  trustGameResultToken,
  trustGameScoreFromToken,
  trustGameTier,
  trustGameTierStops,
  trustGameTiers,
} from "../src/lib/trust-game/score.ts";

/** Whether anything in the panel carries the `hl` mark the reveal lights up. */
function hasHighlight(value) {
  if (Array.isArray(value)) return value.some(hasHighlight);
  if (value && typeof value === "object") return value.hl === true || Object.values(value).some(hasHighlight);
  return false;
}

test("the case set is balanced, uniquely named, and consistent with its ids", () => {
  const trustworthy = trustGameCases.filter((item) => item.truth);
  assert.equal(trustworthy.length * 2, trustGameCases.length);
  assert.equal(trustGameFullDeckSize, trustGameCases.length);
  assert.equal(new Set(trustGameCases.map((item) => item.id)).size, trustGameCases.length);
  const flaws = new Set(trustGameCases.map((item) => item.flaw).filter(Boolean));
  assert.deepEqual([...flaws].sort(), ["data", "reading"], "both ways a conclusion fails are covered");
  for (const item of trustGameCases) {
    assert.match(item.id, item.truth ? /^T\d+$/ : /^D\d+$/, `${item.id} prefix must match truth`);
    assert.doesNotMatch(item.headline, /^(Trustworthy|Deceptive)\b/, `${item.id}: the reveal adds the verdict`);
    assert.ok(hasHighlight(item.panels), `${item.id} needs at least one highlighted element`);
  }
});

// The types in cases.ts check panel shapes; these are the rules tsc can't see.
test("tables fill every column and trace bars stay on the axis", () => {
  for (const item of trustGameCases) {
    for (const panel of item.panels) {
      if (panel.type === "table")
        for (const row of panel.rows) assert.equal(row.cells.length, panel.cols.length, `${item.id} table row width`);
      if (panel.type === "trace")
        for (const row of panel.rows) assert.ok(row.start + row.dur <= panel.total * 1.01, `${item.id} bar past the axis`);
    }
  }
});

test("a dealt deck is shuffled, balanced, and never repeats a case", () => {
  for (const size of [trustGameDeckSize, trustGameFullDeckSize]) {
    const deck = dealTrustGame(size);
    assert.equal(deck.length, size);
    assert.equal(deck.filter((item) => item.truth).length, size / 2);
    assert.equal(new Set(deck.map((item) => item.id)).size, size);
  }
});

test("mistakes split into lies trusted and truths doubted", () => {
  const answers = [
    { id: "T1", trusted: true, correct: true },
    { id: "D1", trusted: true, correct: false },
    { id: "T2", trusted: false, correct: false },
    { id: "D2", trusted: false, correct: true },
  ];
  assert.deepEqual(trustGameMistakes(answers), { liesTrusted: 1, truthsDoubted: 1 });
});

test("the booth kiosk stays under the public game", async () => {
  const { trustGameBoothPath } = await import("../src/lib/chrome.ts");
  const { trustGamePath } = await import("../src/lib/trust-game/score.ts");
  assert.equal(trustGamePath, "/resources/trust-your-telemetry");
  assert.equal(trustGameBoothPath, `${trustGamePath}/booth`);
});

test("tiers scale with the deck, so 10- and 20-case games share them", () => {
  assert.equal(trustGameTier(10, 10).id, "sommelier");
  assert.equal(trustGameTier(9, 10).id, "seasoned");
  assert.equal(trustGameTier(16, 20).id, "seasoned");
  assert.equal(trustGameTier(11, 20).id, "optimist");
  assert.equal(trustGameTier(0, 10).id, "paged");
  assert.equal(new Set(trustGameTiers.map((tier) => tier.id)).size, trustGameTiers.length);
  assert.deepEqual(
    trustGameTierStops(10).map((stop) => [stop.tier.id, stop.low, stop.high]),
    [
      ["paged", 0, 3],
      ["optimist", 4, 5],
      ["skeptic", 6, 7],
      ["seasoned", 8, 9],
      ["sommelier", 10, 10],
    ],
  );
});

test("result links hide the score in a token that maps back to it", () => {
  for (let score = 0; score <= trustGameDeckSize; score++) {
    const token = trustGameResultToken(score);
    assert.match(token, /^[0-9a-z]{8}$/);
    assert.equal(trustGameScoreFromToken(token), score);
  }
  assert.equal(trustGameScoreFromToken("7"), null);
});

test("booth counters add up games and per-case accuracy and survive bad storage", () => {
  const once = recordBoothGame(parseBoothStats(null), [
    { id: "T1", correct: true },
    { id: "D1", correct: false },
  ]);
  const twice = recordBoothGame(parseBoothStats(JSON.stringify(once)), [{ id: "T1", correct: false }]);
  assert.deepEqual(twice, {
    games: 2,
    cases: { T1: { correct: 1, total: 2 }, D1: { correct: 0, total: 1 } },
  });
  assert.deepEqual(boothTotals(twice), { correct: 1, total: 3 });
  assert.deepEqual(parseBoothStats("{not json"), { games: 0, cases: {} });
  assert.deepEqual(parseBoothStats("null"), { games: 0, cases: {} });
  assert.deepEqual(parseBoothStats('{"games":1,"cases":{"T1":{"correct":"x"}}}'), {
    games: 1,
    cases: { T1: { correct: 0, total: 0 } },
  });
});
