"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Segmented } from "@/components/brand-kit/controls";
import { DownloadMark, ExternalMark } from "@/components/brand-kit/marks";
import { BrandSection } from "@/components/brand-kit/section";
import {
  brandKitLinks,
  brandLogos,
  logoConstruction,
  logoGrounds,
  logoSrc,
  logoVariations,
  type LogoGroundId,
  type LogoLayout,
} from "@/lib/brand-kit/content";

export function BrandLogoStage() {
  const [logoId, setLogoId] = useState<(typeof brandLogos)[number]["id"]>("ollygarden");
  const [layout, setLayout] = useState<LogoLayout>("horizontal");
  const [groundId, setGroundId] = useState<LogoGroundId>("forest");
  const [clearSpace, setClearSpace] = useState(false);
  const logo = brandLogos.find((item) => item.id === logoId) ?? brandLogos[0];
  const ground = logoGrounds.find((item) => item.id === groundId) ?? logoGrounds[0];
  const activeLayout = logo.vertical || layout === "horizontal" ? layout : "horizontal";
  const showClear = clearSpace && logo.id === "ollygarden";

  return (
    <BrandSection
      id="logo"
      icon="target"
      eyebrow="Logo"
      title="One mark, on every ground"
      lede="The OllyGarden logo represents the balance between nature and technology. It combines a geometric symbol, a large oval with a smaller circle inside, with a clean, modern wordmark set in Space Grotesk Bold."
      aside={
        <ul className="bk-card bk-variations">
          {logoVariations.map((item) => (
            <li key={item.title}>
              <strong>{item.title}.</strong> {item.text}
            </li>
          ))}
        </ul>
      }
    >
      <div className="bk-card gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            label="Logo"
            value={logo.id}
            onChange={(value) => {
              const next = value as (typeof brandLogos)[number]["id"];
              setLogoId(next);
              if (next === "ollygarden") setLayout("horizontal");
            }}
            options={brandLogos.map((item) => ({ value: item.id, label: item.name }))}
          />
          <div className="flex flex-wrap gap-3">
            <Segmented
              label="Layout"
              value={logo.vertical ? activeLayout : "horizontal"}
              onChange={(value) => setLayout(value as LogoLayout)}
              options={[
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical", disabled: !logo.vertical },
              ]}
            />
            <button
              type="button"
              className={`bk-toggle${showClear ? " is-on" : ""}`}
              aria-pressed={showClear}
              disabled={logo.id !== "ollygarden"}
              onClick={() => setClearSpace((on) => !on)}
            >
              <span className="bk-toggle-dot" aria-hidden="true" />
              Clear space
            </button>
          </div>
        </div>
        <div
          className={`bk-stage${activeLayout === "vertical" ? " bk-stage--vertical" : ""}`}
          style={{ "--ground": ground.color, "--guide": ground.guide } as CSSProperties}
        >
          <div className={`bk-safe${showClear ? " is-on" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`${logo.id}-${activeLayout}-${ground.id}`}
              className="bk-stage-logo"
              src={logoSrc(logo.stage[ground.id], activeLayout)}
              alt={`${logo.name} logo on ${ground.label}`}
            />
            <span className="bk-safe-dots" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          {showClear ? (
            <p className="bk-safe-note">
              Clear space equals the diameter of the inner circle. No other graphic element or text enters it.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="bk-grounds" role="radiogroup" aria-label="Background">
            {logoGrounds.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={ground.id === item.id}
                className={`bk-ground${ground.id === item.id ? " is-on" : ""}`}
                onClick={() => setGroundId(item.id)}
              >
                <span className="bk-ground-chip" style={{ background: item.color }} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
          <p className="max-w-md text-sm leading-6 text-mist/70">
            <LogoNote id={logo.id} fallback={logo.note} />
          </p>
        </div>
        <div className="bk-files">
          <span className="bk-files-label">
            {logo.name}
            {logo.vertical ? `, ${activeLayout}` : ""} · SVG
          </span>
          <ul className="bk-files-list">
            {logo.files.map((file) => {
              const href = logoSrc(file.file, activeLayout);
              return (
                <li key={file.label}>
                  <a className="bk-file" href={href} download={href.split("/").pop()}>
                    <DownloadMark /> {file.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="bk-textlink" href={brandKitLinks.logos} target="_blank" rel="noopener noreferrer">
            PNG files and every product in Drive <ExternalMark />
          </a>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {logoConstruction.map((item) => (
          <article key={item.title} className="bk-card">
            <h3 className="bk-card-title">{item.title}</h3>
            <p className="bk-card-desc">{item.text}</p>
          </article>
        ))}
      </div>
    </BrandSection>
  );
}

function LogoNote({ id, fallback }: { id: (typeof brandLogos)[number]["id"]; fallback: string }) {
  if (id === "rose") {
    return (
      <>
        <Link href="/products/rose" className="bk-textlink">
          OllyGarden Rose
        </Link>
        , the AI instrumentation agent that fixes instrumentation at the source.
      </>
    );
  }
  if (id === "insights") {
    return (
      <>
        <Link href="/products/insights" className="bk-textlink">
          OllyGarden Insights
        </Link>
        , which analyzes and scores telemetry quality.
      </>
    );
  }
  return fallback;
}
