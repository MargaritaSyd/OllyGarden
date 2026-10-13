import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";
import { ogCards, ogImageSize, ogImageUrl } from "../src/lib/og-cards.ts";

const publicDir = join(process.cwd(), "public");

function pngSize(path) {
  const png = readFileSync(path);
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

test("every Open Graph card is rendered at 1200x630", () => {
  for (const path of Object.keys(ogCards)) {
    const image = join(publicDir, ogImageUrl(path));
    assert.deepEqual(
      pngSize(image),
      ogImageSize,
      `${relative(process.cwd(), image)}; run node scripts/render-og-images.mjs ${path}`,
    );
  }
});

test("every rendered card belongs to a card entry", () => {
  const urls = new Set(Object.keys(ogCards).map(ogImageUrl));
  const rendered = readdirSync(join(publicDir, "og"), { recursive: true })
    .filter((file) => file.endsWith(".png"))
    .map((file) => `/og/${file}`);
  for (const url of rendered) {
    assert.ok(urls.has(url), `public${url} has no entry in src/lib/og-cards.ts`);
  }
});

test("pages get their Open Graph image from their card", () => {
  const appFiles = readdirSync(join(process.cwd(), "src/app"), { recursive: true });
  const conventionImages = appFiles.filter((file) =>
    /(^|[\\/])(opengraph|twitter)-image\.[a-z.]+$/.test(file),
  );
  assert.deepEqual(conventionImages, [], "add a card to src/lib/og-cards.ts instead");
});
