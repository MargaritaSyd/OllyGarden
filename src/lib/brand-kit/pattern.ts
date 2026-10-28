import {
  morningMist,
  patternFill,
  patternPalette,
  patternRows,
  sunflowerGlow,
} from "@/lib/brand-kit/content";
import { pixelFont } from "@/lib/brand-kit/pixel-font";

/** The brand kit's tile shuffler. Same sequence for a given seed. */
function mix(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 1831565813) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** Spell up to two short lines in the brand pixel pattern. */
export function pixelPattern(lines: readonly string[], seed: number) {
  const rows = lines
    .map((line) => [...line.toUpperCase()].filter((glyph) => pixelFont[glyph]))
    .filter((glyphs) => glyphs.length > 0);
  const widest = Math.max(0, ...rows.map((glyphs) => glyphs.length * 6 - 1));
  const cols = Math.max(40, widest + 4);
  const baselines = rows.length === 2 ? [2, 9] : [5];
  const ink = new Set<number>();

  rows.forEach((glyphs, row) => {
    const offset = Math.floor((cols - (glyphs.length * 6 - 1)) / 2);
    glyphs.forEach((glyph, index) => {
      pixelFont[glyph].forEach((bits, y) => {
        [...bits].forEach((bit, x) => {
          if (bit === "1") ink.add((baselines[row] + y) * cols + offset + index * 6 + x);
        });
      });
    });
  });

  const random = mix(seed);
  const tiles: string[] = [];
  for (let y = 0; y < patternRows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = y * cols + x;
      const roll = random();
      const shade = random();
      if (ink.has(index)) {
        tiles.push(morningMist);
        continue;
      }
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++) {
        for (let dx = -1; dx <= 1 && !near; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < cols && ny < patternRows && ink.has(ny * cols + nx)) {
            near = true;
          }
        }
      }
      tiles.push(
        !near && roll < 0.25 ? patternFill[Math.floor(shade * patternFill.length)] : sunflowerGlow,
      );
    }
  }

  return { cols, rows: patternRows, tiles };
}

export function nextPatternColour(current: string) {
  return patternPalette[(patternPalette.indexOf(current as (typeof patternPalette)[number]) + 1) % patternPalette.length];
}
