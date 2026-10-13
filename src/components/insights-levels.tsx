"use client";

import { useEffect, useRef } from "react";
import { InView } from "@/components/in-view";
import { insightsLevels } from "@/lib/insights";

const GLOW_RADIUS = 150;
const LERP = 0.14;
const PEAK_OPACITY = 0.9;

export function InsightsLevels() {
  return (
    <InView
      as="section"
      aria-labelledby="iia-title"
      className="insights-levels relative isolate overflow-hidden"
    >
      <LevelsBlobs />
      <div className="il-inner relative z-10">
        <header className="il-head ov-stagger">
          <LevelsMark />
          <p className="il-eyebrow">{insightsLevels.eyebrow}</p>
          <h2 id="iia-title" className="il-title">
            {insightsLevels.title[0]}
            <br />
            {insightsLevels.title[1]}
          </h2>
          <p className="il-sub">{insightsLevels.sub}</p>
        </header>

        <div className="il-grid">
          {insightsLevels.cards.map((card) => (
            <div
              key={card.title}
              className={`il-cell${card.wide ? " il-cell--wide" : ""}`}
            >
              <article
                className={`il-card${card.wide ? " il-card--wide" : " il-card--half"}`}
              >
                {card.wide ? (
                  <div className="il-copy">
                    <h3 className="il-card-title">{card.title}</h3>
                    <p className="il-card-body">{card.body}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="il-card-title">{card.title}</h3>
                    <p className="il-card-body">{card.body}</p>
                  </>
                )}
                <div
                  className={`il-media${card.wide ? " il-media--side" : " il-media--fill"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    width={card.wide ? 604 : 564}
                    height={card.wide ? 320 : 360}
                    loading="lazy"
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}

type BlobTrack = {
  svg: SVGSVGElement;
  mx: number;
  my: number;
  gx: number;
  gy: number;
  pt: DOMPoint;
  cells: { el: SVGRectElement; cx: number; cy: number }[];
};

function LevelsBlobs() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const tracks: BlobTrack[] = Array.from(frame.querySelectorAll("svg")).map(
      (svg) => ({
        svg,
        mx: -9999,
        my: -9999,
        gx: -9999,
        gy: -9999,
        pt: svg.createSVGPoint(),
        cells: Array.from(svg.querySelectorAll("rect")).map((el) => ({
          el,
          cx: el.x.baseVal.value + el.width.baseVal.value / 2,
          cy: el.y.baseVal.value + el.height.baseVal.value / 2,
        })),
      }),
    );

    function baseOpacity() {
      return window.innerWidth <= 767 ? 0.15 : 0.3;
    }

    function onMove(event: MouseEvent) {
      for (const track of tracks) {
        const ctm = track.svg.getScreenCTM();
        if (!ctm) {
          continue;
        }
        track.pt.x = event.clientX;
        track.pt.y = event.clientY;
        const point = track.pt.matrixTransform(ctm.inverse());
        track.mx = point.x;
        track.my = point.y;
      }
    }

    function onLeave(event: MouseEvent) {
      if (event.relatedTarget) {
        return;
      }
      for (const track of tracks) {
        track.mx = -9999;
        track.my = -9999;
      }
    }

    let frameId = 0;
    function tick() {
      const base = baseOpacity();
      for (const track of tracks) {
        track.gx += (track.mx - track.gx) * LERP;
        track.gy += (track.my - track.gy) * LERP;
        for (const cell of track.cells) {
          const distance = Math.hypot(cell.cx - track.gx, cell.cy - track.gy);
          if (distance < GLOW_RADIUS) {
            const glow = Math.min(1, (1 - distance / GLOW_RADIUS) * 1.4);
            cell.el.style.opacity = (
              base +
              (PEAK_OPACITY - base) * glow
            ).toFixed(3);
          } else if (cell.el.style.opacity) {
            cell.el.style.opacity = "";
          }
        }
      }
      frameId = window.requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.cancelAnimationFrame(frameId);
      for (const track of tracks) {
        for (const cell of track.cells) {
          cell.el.style.opacity = "";
        }
      }
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="il-frame pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        className="il-sq il-sq--r"
        viewBox="0 0 204 546"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <rect x="136" y="0" width="68" height="68" fill="#D1D100" />
        <rect x="0" y="68" width="68" height="68" fill="#9CA703" />
        <rect x="68" y="68" width="68" height="68" fill="#D1D100" />
        <rect x="136" y="136" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="204" width="68" height="68" fill="#D1D100" />
        <rect x="0" y="273" width="68" height="68" fill="#34520B" />
        <rect x="68" y="341" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="477" width="68" height="69" fill="#D1D100" />
      </svg>
      <svg
        className="il-sq il-sq--l"
        viewBox="0 0 136 545"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <rect x="0" y="0" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="68" width="68" height="69" fill="#E3E270" />
        <rect x="68" y="137" width="68" height="68" fill="#D1D100" />
        <rect x="0" y="205" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="273" width="68" height="68" fill="#D1D100" />
        <rect x="0" y="341" width="68" height="68" fill="#D1D100" />
        <rect x="68" y="409" width="68" height="68" fill="#34520B" />
        <rect x="0" y="477" width="68" height="68" fill="#D1D100" />
      </svg>
    </div>
  );
}

function LevelsMark() {
  return (
    <svg
      className="il-mark"
      width="32"
      height="32"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}