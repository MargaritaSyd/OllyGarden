import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Public anonymization rules for copy built from customer telemetry (doc/case-studies.md and
// doc/trust-your-telemetry.md). Extend `sources` as more copy adopts the rules.
const banned = JSON.parse(readFileSync(new URL("./fixtures/banned-terms.json", import.meta.url), "utf8"));
const terms = [...banned.sourceCompanies, ...banned.vendors, ...banned.industries];

/** Every string in a value, with the path where it was found. */
function* strings(value, path) {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (const [index, item] of value.entries()) yield* strings(item, `${path}[${index}]`);
  else if (value && typeof value === "object")
    for (const [key, item] of Object.entries(value)) yield* strings(item, `${path}.${key}`);
}

const sources = {
  "trust game cases": async () => (await import("../src/lib/trust-game/cases.ts")).trustGameCases,
  "trust game cards and share copy": async () => {
    const { ogCards } = await import("../src/lib/og-cards.ts");
    const score = await import("../src/lib/trust-game/score.ts");
    return {
      cards: Object.entries(ogCards).filter(([path]) => path.startsWith(score.trustGamePath)),
      pitch: score.trustGameSharePitch,
      tiers: score.trustGameTiers,
    };
  },
};

for (const [name, load] of Object.entries(sources)) {
  test(`${name} follow the public content rules`, async () => {
    const problems = [];
    for (const [path, text] of strings(await load(), name)) {
      if (text.includes("—")) problems.push(`${path}: em-dash`);
      if (/\d{1,3},\d{3}/.test(text)) problems.push(`${path}: thousands separator in ${JSON.stringify(text)}`);
      for (const term of terms) {
        if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text))
          problems.push(`${path}: banned term "${term}"`);
      }
    }
    assert.deepEqual(problems, []);
  });
}
