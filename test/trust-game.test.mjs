import assert from "node:assert/strict";
import test from "node:test";

test("each trust game deals five conclusions that hold and five that do not", async () => {
  const { trustCases } = await import("../src/lib/trust-game/cases.ts");
  const { dealAllTrustCases, dealTrustCases } = await import("../src/lib/trust-game/deal.ts");

  assert.equal(trustCases.length, 20);
  assert.equal(trustCases.filter((item) => item.truth).length, 10);
  assert.equal(trustCases.filter((item) => !item.truth).length, 10);
  for (const item of trustCases) {
    assert.ok(item.panels.length > 0, item.id);
    if (!item.truth) {
      assert.ok(item.fix.length > 0, item.id);
      assert.ok(item.flaw === "data" || item.flaw === "reading", item.id);
    }
  }

  let index = 0;
  const random = () => {
    index += 1;
    return (index % 7) / 7;
  };
  const dealt = dealTrustCases(trustCases, random);
  assert.equal(dealt.length, 10);
  assert.equal(dealt.filter((item) => item.truth).length, 5);
  assert.equal(new Set(dealt.map((item) => item.id)).size, 10);

  const all = dealAllTrustCases(trustCases, random);
  assert.equal(all.length, 20);
  assert.equal(all.filter((item) => item.truth).length, 10);
  assert.equal(new Set(all.map((item) => item.id)).size, 20);
});

test("trust game ladder covers every score once", async () => {
  const { trustRoundSize, trustScoreFromToken, trustResultToken, trustTier, trustTierRange, trustTiers } =
    await import("../src/lib/trust-game/score.ts");

  const covered = trustTiers.flatMap((_, index) => {
    const range = trustTierRange(index);
    const [low, high = low] = range.split("–").map(Number);
    return Array.from({ length: high - low + 1 }, (__, offset) => low + offset);
  });
  assert.deepEqual(
    covered.sort((a, b) => a - b),
    Array.from({ length: trustRoundSize + 1 }, (_, score) => score),
  );
  for (const score of covered) {
    assert.equal(trustTier(score).min <= score, true);
  }
  for (let score = 0; score <= trustRoundSize; score += 1) {
    assert.equal(trustScoreFromToken(trustResultToken(score)), score);
  }
  assert.equal(trustScoreFromToken("not-a-token"), null);
  assert.equal(trustScoreFromToken("7"), null);
});

test("booth totals scale to a 10- or 20-case round and stay on the device", async () => {
  const { readFileSync } = await import("node:fs");
  const { trustTiers } = await import("../src/lib/trust-game/score.ts");
  const {
    boothBeatPercent,
    boothCrowdPercent,
    boothStage,
    boothTier,
    boothTierRange,
    emptyBoothStats,
    recordBoothGame,
  } = await import("../src/lib/trust-game/booth.ts");

  assert.equal(boothTier(10, 10).name, trustTiers[0].name);
  assert.equal(boothTier(8, 10).name, trustTiers[1].name);
  assert.equal(boothTier(16, 20).name, trustTiers[1].name);
  assert.equal(boothTier(12, 20).name, trustTiers[2].name);
  assert.equal(boothTierRange(0, 10), "10");
  assert.equal(boothTierRange(1, 10), "8–9");
  assert.equal(boothTierRange(1, 20), "16–19");
  assert.equal(boothTierRange(4, 20), "0–7");

  assert.deepEqual(boothStage(1920, 1080), { zoom: 1, width: 1920, height: 1080 });
  assert.deepEqual(boothStage(2560, 1080), { zoom: 1, width: 2560, height: 1080 });
  const smaller = boothStage(1280, 720);
  assert.ok(Math.abs(smaller.zoom - 2 / 3) < 1e-9);
  assert.ok(Math.abs(smaller.width - 1920) < 1e-6);

  const cases = [{ id: "T1" }, { id: "T2" }];
  const once = recordBoothGame(emptyBoothStats(), cases, [{ correct: true }, { correct: false }]);
  assert.equal(once.games, 1);
  assert.equal(once.correct, 1);
  assert.equal(once.total, 2);
  assert.deepEqual(once.results, [0.5]);
  assert.equal(boothCrowdPercent(once.cases.T1), null);
  const repeated = [0, 1, 2, 3].reduce(
    (stats) => recordBoothGame(stats, cases, [{ correct: true }, { correct: true }]),
    once,
  );
  assert.equal(repeated.cases.T1.total, 5);
  assert.equal(boothCrowdPercent(repeated.cases.T1), 100);
  assert.equal(boothBeatPercent([], 1), 0);
  assert.equal(boothBeatPercent([0.2, 0.4, 0.9], 0.5), 67);

  const page = readFileSync(new URL("../src/app/resources/trust-game/booth/page.tsx", import.meta.url), "utf8");
  assert.match(page, /noIndex:\s*true/);
  const sitemap = readFileSync(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
  assert.equal(sitemap.includes("/resources/trust-game/booth"), false);
});
