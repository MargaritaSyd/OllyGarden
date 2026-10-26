import assert from "node:assert/strict";
import test from "node:test";

test("each trust game deals five conclusions that hold and five that do not", async () => {
  const { trustCases } = await import("../src/lib/trust-game/cases.ts");
  const { dealTrustCases } = await import("../src/lib/trust-game/deal.ts");

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
