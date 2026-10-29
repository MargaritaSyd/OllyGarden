"use client";

import { useState, type CSSProperties } from "react";
import { Segmented } from "@/components/brand-kit/controls";
import { BrandGlyph } from "@/components/brand-kit/glyph";
import { ExternalMark } from "@/components/brand-kit/marks";
import { BrandSection } from "@/components/brand-kit/section";
import { brandKitLinks, iconGrounds, iconIntro } from "@/lib/brand-kit/content";
import { marketingIcons, patternIcons, type BrandIcon } from "@/lib/brand-kit/icons";
import { registerOpenTelemetry } from "@/lib/trademarks";

export function BrandIcons() {
  const [set, setSet] = useState<"pattern" | "marketing">("pattern");
  const [ground, setGround] = useState<(typeof iconGrounds)[number]["value"]>("forest");
  const colours = iconGrounds.find((item) => item.value === ground) ?? iconGrounds[0];
  const icons = set === "pattern" ? patternIcons : marketingIcons;

  return (
    <BrandSection
      id="icons"
      icon="flower"
      eyebrow="Icons"
      title="Botanical shapes with telemetry meanings"
      lede={registerOpenTelemetry(iconIntro)}
      aside={
        <figure className="bk-icons-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand-kit/icon-pattern.jpg"
            alt="The brand icons tiled into a pattern in the green and yellow palette"
          />
        </figure>
      }
    >
      <div className="bk-card bk-icon-card gap-5">
        <div className="bk-stage-bar">
          <Segmented
            className="bk-seg--sets"
            label="Icon set"
            value={set}
            onChange={(value) => setSet(value as "pattern" | "marketing")}
            options={[
              { value: "pattern", label: `Pattern shapes · ${patternIcons.length}` },
              { value: "marketing", label: `Marketing · ${marketingIcons.length}` },
            ]}
          />
          <Segmented
            label="Colour"
            value={ground}
            onChange={(value) => setGround(value as (typeof iconGrounds)[number]["value"])}
            options={iconGrounds}
          />
        </div>
        <ul
          className={`bk-icon-grid bk-icon-grid--${set} ${
            set === "pattern"
              ? "grid-cols-4 md:grid-cols-6 xl:grid-cols-8"
              : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          }`}
          style={{ "--ig-bg": colours.bg, "--ig-fg": colours.fg } as CSSProperties}
        >
          {icons.map((icon, index) => (
            <li key={icon.name} style={{ "--n": index } as CSSProperties}>
              <IconLink icon={icon} colour={colours.fg} />
            </li>
          ))}
        </ul>
        <div className="bk-files justify-between">
          <span className="bk-files-label">The full library also holds the 75 product interface icons</span>
          <a className="bk-textlink" href={brandKitLinks.icons} target="_blank" rel="noopener noreferrer">
            Open the Icon Library <ExternalMark />
          </a>
        </div>
      </div>
    </BrandSection>
  );
}

function IconLink({ icon, colour }: { icon: BrandIcon; colour: string }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="${colour}">${icon.body}</svg>`;
  return (
    <a
      className="bk-icon"
      href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
      download={`ollygarden-${icon.name}.svg`}
      title={icon.means}
    >
      <BrandGlyph body={icon.body} size={44} className="bk-icon-glyph" />
      <span className="bk-icon-name">{icon.name}</span>
      <span className="bk-icon-means">{icon.means}</span>
      <span className="sr-only"> (download SVG)</span>
    </a>
  );
}
