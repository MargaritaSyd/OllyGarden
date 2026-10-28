"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandSection } from "@/components/brand-kit/section";
import { brandColours, colourPairs, intermediaryTones } from "@/lib/brand-kit/content";

export function BrandColours() {
  const [copied, copy] = useCopiedColour();
  return (
    <BrandSection
      id="colour"
      icon="petals"
      eyebrow="Colour"
      title="Four colours and the tones between them"
      lede="The palette builds on the brand’s identity while adding flexibility. Green works as either a base or an accent, and the intermediary tones give designers more range while keeping a modern, tech-botanical look. Click any colour to copy its hex."
    >
      <div className="bk-swatches">
        {brandColours.map((colour) => (
          <button
            key={colour.hex}
            type="button"
            className="bk-swatch"
            style={{ "--sw": colour.hex, "--sw-ink": colour.ink } as CSSProperties}
            onClick={() => copy(colour.hex)}
            aria-label={`${colour.name}, ${colour.hex}. Copy the hex code`}
          >
            <span className="bk-swatch-block">
              <span className="bk-swatch-name">{colour.name}</span>
              <span className="bk-swatch-copied" aria-live="polite">
                {copied === colour.hex ? "Copied" : ""}
              </span>
            </span>
            <span className="bk-swatch-codes">
              <span>
                <em>HEX</em>
                {colour.hex}
              </span>
              <span>
                <em>RGB</em>
                {colour.rgb}
              </span>
            </span>
            <span className="bk-swatch-role">{colour.role}</span>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <span className="bk-mini-label">Intermediary tones</span>
        <div className="bk-tint-strip">
          {intermediaryTones.map((hex) => (
            <button
              key={hex}
              type="button"
              className="bk-tint"
              style={{ "--sw": hex } as CSSProperties}
              onClick={() => copy(hex)}
              aria-label={`Copy ${hex}`}
            >
              {copied === hex ? "Copied" : hex}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <span className="bk-mini-label">In use</span>
        <div className="bk-pairs">
          {colourPairs.map((pair) => (
            <div
              key={`${pair.bg}-${pair.mark}`}
              className="bk-pair"
              style={{
                "--p-bg": pair.bg,
                "--p-fg": pair.fg,
                "--p-mark": pair.mark,
                "--p-mark-fg": pair.markFg,
              } as CSSProperties}
            >
              <p>
                There’s a lot of
                <br />
                <mark>bad telemetry</mark>
                <br />
                out there.
              </p>
            </div>
          ))}
        </div>
      </div>
    </BrandSection>
  );
}

function useCopiedColour() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }, []);
  return [copied, copy] as const;
}
