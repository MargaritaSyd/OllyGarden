"use client";

import { useMemo, useState } from "react";
import { DownloadMark } from "@/components/brand-kit/marks";
import { BrandGlyph } from "@/components/brand-kit/glyph";
import { BrandRules, BrandSection } from "@/components/brand-kit/section";
import { patternRows, patternRules } from "@/lib/brand-kit/content";
import { nextPatternColour, pixelPattern } from "@/lib/brand-kit/pattern";

const limit = 8;

function cleanLine(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9!?.\-+&#%:/ ]/g, "")
    .slice(0, limit);
}

export function BrandPattern() {
  const [first, setFirst] = useState("OLLY");
  const [second, setSecond] = useState("GARDEN");
  const [seed, setSeed] = useState(7);
  const [paint, setPaint] = useState<{ key: string; cells: Record<number, string> }>({ key: "", cells: {} });
  const { cols, tiles } = useMemo(() => pixelPattern([first, second], seed), [first, second, seed]);
  const paintKey = `${first}\n${second}\n${seed}`;
  const overrides = paint.key === paintKey ? paint.cells : {};

  function colourAt(index: number) {
    return overrides[index] ?? tiles[index];
  }

  function download() {
    const canvas = document.createElement("canvas");
    canvas.width = cols * 24;
    canvas.height = patternRows * 24;
    const context = canvas.getContext("2d");
    if (!context) return;
    tiles.forEach((_, index) => {
      context.fillStyle = colourAt(index);
      context.fillRect((index % cols) * 24, Math.floor(index / cols) * 24, 24, 24);
    });
    const name = `${first} ${second}`.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "pattern";
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `ollygarden-pixel-${name}.png`);
    }, "image/png");
  }

  const phrase = [first, second].filter(Boolean).join(" ") || "nothing";

  return (
    <BrandSection
      id="pattern"
      grid
      icon="processor"
      eyebrow="Pixel pattern"
      title="Type a word, get a pattern"
      lede="The pixel pattern is one of the key elements of the brand: it pairs with the bitmap imagery and carries the tech side of the look. It can also spell numbers, words and short phrases, handy for simple social assets. Click any tile to change its colour."
    >
      <div className="bk-card gap-5">
        <div className="flex flex-wrap items-end gap-4">
          <label className="bk-field">
            <span>Line 1</span>
            <input value={first} maxLength={limit} spellCheck={false} onChange={(event) => setFirst(cleanLine(event.target.value))} />
          </label>
          <label className="bk-field">
            <span>Line 2</span>
            <input value={second} maxLength={limit} spellCheck={false} onChange={(event) => setSecond(cleanLine(event.target.value))} />
          </label>
          <div className="ml-auto flex flex-wrap gap-3">
            <button type="button" className="bk-toggle" onClick={() => setSeed((value) => value + 1)}>
              <BrandGlyph name="movement-double" size={16} /> Shuffle tiles
            </button>
            <button type="button" className="bk-btn bk-btn--primary bk-btn--compact" onClick={download}>
              <DownloadMark /> Download PNG
            </button>
          </div>
        </div>
        <svg
          className="bk-pixels"
          viewBox={`0 0 ${cols} ${patternRows}`}
          role="img"
          aria-label={`Pixel pattern spelling ${phrase}`}
          shapeRendering="crispEdges"
        >
          {tiles.map((_, index) => (
            <rect
              key={index}
              x={index % cols}
              y={Math.floor(index / cols)}
              width="1"
              height="1"
              fill={colourAt(index)}
              onClick={() =>
                setPaint((current) => {
                  const cells = current.key === paintKey ? current.cells : {};
                  return {
                    key: paintKey,
                    cells: { ...cells, [index]: nextPatternColour(cells[index] ?? tiles[index]) },
                  };
                })
              }
            />
          ))}
        </svg>
      </div>
      <BrandRules rules={patternRules} />
    </BrandSection>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
