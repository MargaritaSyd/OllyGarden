// Renders the Open Graph cards in src/lib/og-cards.ts with the og-image skill.
// Usage: node scripts/render-og-images.mjs [path ...]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { ogCardTheme, ogCards, ogImageUrl } from "../src/lib/og-cards.ts";

const skillDir = process.env.OG_IMAGE_SKILL ?? findOgImageSkill();

/** The skill as a standalone copy, or as the og-image@growlight Claude Code plugin. */
function findOgImageSkill() {
  const standalone = join(homedir(), ".claude/skills/og-image");
  if (existsSync(standalone)) return standalone;
  try {
    const installed = JSON.parse(readFileSync(join(homedir(), ".claude/plugins/installed_plugins.json"), "utf8"));
    const entry = installed.plugins?.["og-image@growlight"]?.at(-1);
    if (entry?.installPath && existsSync(entry.installPath)) return entry.installPath;
  } catch {
    // No plugins installed; fall through to the standalone path for the error message.
  }
  return standalone;
}
const paths = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(ogCards);
let failed = false;

for (const path of paths) {
  const card = ogCards[path];
  if (!card) {
    console.error(`✗ ${path}: no entry in src/lib/og-cards.ts`);
    failed = true;
    continue;
  }

  const out = join("public", ogImageUrl(path));
  mkdirSync(dirname(out), { recursive: true });
  const summary = JSON.parse(
    execFileSync("python3", [
      join(skillDir, "scripts/og_image.py"),
      "render",
      "--headline", card.headline,
      "--body", card.body,
      "--theme", ogCardTheme(path),
      "--out", out,
    ], { encoding: "utf8" }),
  );

  let problem = "";
  if (summary.headline_overflows) problem = "headline overflows the body";
  else if (summary.headline_px < 64) problem = `headline shrank to ${summary.headline_px}px`;
  if (problem) failed = true;
  console.log(problem ? `✗ ${path} → ${out} (${problem}; shorten the copy)` : `✓ ${path} → ${out}`);
}

process.exit(failed ? 1 : 0);
