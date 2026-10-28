import assert from "node:assert/strict";
import { register } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

register(
  `data:text/javascript,${encodeURIComponent(`
    let srcUrl;
    export function initialize(data) { srcUrl = data.srcUrl; }
    export async function resolve(specifier, context, next) {
      const target = specifier.startsWith("@/")
        ? srcUrl + specifier.slice(2)
        : /^\\.\\.?\\//.test(specifier) && !/\\.[a-z]+$/.test(specifier) && context.parentURL
          ? new URL(specifier, context.parentURL).href
          : null;
      if (!target) return next(specifier, context);
      let lastError;
      for (const candidate of [target, target + ".ts"]) {
        try { return await next(candidate, context); }
        catch (error) {
          if (error?.code !== "ERR_MODULE_NOT_FOUND" && error?.code !== "ERR_UNSUPPORTED_DIR_IMPORT") throw error;
          lastError = error;
        }
      }
      throw lastError;
    }
  `)}`,
  {
    parentURL: import.meta.url,
    data: { srcUrl: pathToFileURL(join(process.cwd(), "src/")).href },
  },
);

const { bitmapRamp, brandKitMeta, patternPalette, sunflowerGlow } = await import(
  "../src/lib/brand-kit/content.ts",
);
const { ditherPixels } = await import("../src/lib/brand-kit/dither.ts");
const { pixelPattern } = await import("../src/lib/brand-kit/pattern.ts");

test("brand kit search metadata fits the result limits", () => {
  assert.ok(brandKitMeta.title.length <= 60, brandKitMeta.title);
  assert.ok(brandKitMeta.description.length >= 110, String(brandKitMeta.description.length));
  assert.ok(brandKitMeta.description.length <= 160, String(brandKitMeta.description.length));
});

test("the pixel pattern spells on a sunflower field", () => {
  const { cols, rows, tiles } = pixelPattern(["OLLY", "GARDEN"], 7);
  assert.equal(cols, 40);
  assert.equal(rows, 16);
  assert.equal(tiles.length, cols * rows);
  const allowed = new Set(patternPalette);
  for (const tile of tiles) assert.ok(allowed.has(tile), tile);
  const ink = tiles.filter((tile) => tile === "#FAF9F0").length;
  const field = tiles.filter((tile) => tile === sunflowerGlow).length;
  assert.ok(ink > 20, "the letters did not land");
  assert.ok(field / tiles.length > 0.6, "the field should stay mostly one colour");
});

test("floyd-steinberg snaps black and white onto the ends of the ramp", () => {
  const pixels = new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255]);
  ditherPixels(pixels, 2, 1, 80);
  const hex = (index) =>
    `#${[pixels[index], pixels[index + 1], pixels[index + 2]]
      .map((channel) => channel.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;
  assert.equal(hex(0), bitmapRamp.at(-1));
  assert.equal(hex(4), bitmapRamp[0]);
});
