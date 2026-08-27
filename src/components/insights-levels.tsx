"use client";

import { useEffect, useRef } from "react";
import { insightsLevels } from "@/lib/insights";

const GLOW_RADIUS = 150;
const LERP = 0.14;
const PEAK_OPACITY = 0.9;

export function InsightsLevels() {
  return (
    <section aria-labelledby="iia-title" className="relative overflow-hidden">
      <LevelsBlobs />
      <div className="relative z-10 mx-auto w-full max-w-[1328px] px-5 py-[clamp(4.75rem,8vw,7.5rem)] sm:px-12">
        <div className="mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[720px]">
          <LevelsMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {insightsLevels.eyebrow}
          </p>
          <h2
            id="iia-title"
            className="mt-4 text-[clamp(2rem,3.8vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {insightsLevels.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.68] text-mist/75">
            {insightsLevels.sub}
          </p>
        </div>

        <div className="mx-auto w-[88%] max-w-[1169px] grid gap-[clamp(1.3rem,2.65vw,2rem)] lg:grid-cols-2">
          {insightsLevels.cards.map((card) => (
            <article
              key={card.title}
              className={`surface-grain overflow-hidden rounded-[20px] border border-[#d9e533]/18 bg-[#19321e] p-[clamp(1.3rem,2.65vw,2rem)] ${
                card.wide ? "lg:col-span-2" : ""
              }`}
            >
              <h3 className="text-[clamp(1.25rem,1.75vw,1.55rem)] font-semibold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.66] text-mist/75">
                {card.body}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.imageAlt}
                width={card.wide ? 1142 : 1128}
                height={card.wide ? 516 : 636}
                className={
                  card.wide
                    ? "mt-7 aspect-[15/4] w-full rounded-xl object-cover object-top"
                    : "mt-7 h-auto w-full rounded-xl"
                }
              />
            </article>
          ))}
        </div>
      </div>
    </section>
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

    const tracks: BlobTrack[] = Array.from(
      frame.querySelectorAll("svg"),
    ).map((svg) => ({
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
    }));

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
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        className="absolute top-[17px] right-[-12px] h-[546px] w-[204px] [&_rect]:opacity-30 max-md:[&_rect]:opacity-15"
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
        className="absolute bottom-[51px] left-[-12px] h-[545px] w-[136px] [&_rect]:opacity-30 max-md:hidden"
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
    <svg width="32" height="32" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
        stroke="#9CA703"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
