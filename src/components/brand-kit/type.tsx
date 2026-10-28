"use client";

import { useState } from "react";
import { Segmented } from "@/components/brand-kit/controls";
import { ButtonArrow } from "@/components/brand-kit/marks";
import { BrandSection } from "@/components/brand-kit/section";
import { brandKitLinks, typeCode, typeGlyphs, typeSample, typeWeights } from "@/lib/brand-kit/content";

export function BrandType() {
  const [weight, setWeight] = useState("700");
  const [size, setSize] = useState(72);
  const [sample, setSample] = useState(typeSample);

  return (
    <BrandSection
      id="type"
      icon="list-bars"
      eyebrow="Typography"
      title="Space Grotesk, from Light to Bold"
      lede="The primary typeface, chosen for its clean geometry, contemporary character and legibility in print and on screen. Set body text in the lighter weights, and titles and highlights in bold for clarity and emphasis. Type below to try it."
    >
      <div className="bk-card gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented label="Weight" value={weight} onChange={setWeight} options={typeWeights} />
          <label className="bk-range w-full max-w-xs">
            <span className="bk-range-label">
              Size <b>{size}px</b>
            </span>
            <input
              type="range"
              min={24}
              max={128}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="sr-only" htmlFor="bk-tester-text">
          Sample text
        </label>
        <textarea
          id="bk-tester-text"
          className="bk-tester-text"
          value={sample}
          rows={2}
          spellCheck={false}
          onChange={(event) => setSample(event.target.value)}
          style={{ fontWeight: weight, fontSize: `${size}px` }}
        />
        <p className="bk-glyphs" style={{ fontWeight: weight }} aria-label="Character set">
          {typeGlyphs}
        </p>
      </div>
      <div className="bk-type-side mt-6">
        <div className="bk-card bk-code overflow-hidden p-0">
          <div className="bk-term-bar">
            <span className="bk-term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Inconsolata · code
          </div>
          <pre className="bk-code-body">
            <code>{typeCode}</code>
          </pre>
        </div>
        <article className="bk-card bk-mini">
          <h3 className="bk-card-title">When Space Grotesk isn’t there</h3>
          <p className="bk-card-desc">
            Use the Arial family as a substitute in operational documents such as reports, presentations and internal emails.
          </p>
        </article>
        <article className="bk-card bk-mini">
          <h3 className="bk-card-title">Free to share</h3>
          <p className="bk-card-desc">
            Both fonts are under the OFL, so you can pass them to agencies and partners. One zip, with the licence and a short readme.
          </p>
          <a className="bk-btn bk-btn--secondary bk-btn--compact mt-auto" href={brandKitLinks.fonts} target="_blank" rel="noopener noreferrer">
            Download the fonts <ButtonArrow />
          </a>
        </article>
      </div>
    </BrandSection>
  );
}
