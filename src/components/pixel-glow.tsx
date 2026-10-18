"use client";

import { useEffect, type RefObject } from "react";

export type Rgb = readonly [number, number, number];

const GLOW_RADIUS = 200;
const FOREST: Rgb = [1, 30, 12];

export const OLIVE: Rgb = [156, 167, 3];
export const SUNFLOWER: Rgb = [209, 209, 0];
export const HIGHLIGHT: Rgb = [227, 226, 112];
export const DARK: Rgb = [48, 71, 9];
export const SHADOW: Rgb = [15, 42, 11];
export const MIST: Rgb = [250, 249, 240];
export const MOSS: Rgb = [52, 82, 11];
export const DEEP: Rgb = [0, 40, 14];
export const LEAF: Rgb = [69, 89, 42];

function mix(target: Rgb, amount: number): Rgb {
  return [
    Math.round(FOREST[0] + (target[0] - FOREST[0]) * amount),
    Math.round(FOREST[1] + (target[1] - FOREST[1]) * amount),
    Math.round(FOREST[2] + (target[2] - FOREST[2]) * amount),
  ];
}

export function pixelCell(target: Rgb, dimAmount = 0.3, litAmount = 1) {
  const dim = mix(target, dimAmount);
  const lit = mix(target, litAmount);
  return {
    className: "[transition:fill_0.24s_ease-out]",
    fill: `rgb(${dim.join(",")})`,
    "data-dim": dim.join(","),
    "data-lit": lit.join(","),
  };
}

function parseRgb(value: string | undefined): [number, number, number] {
  const [r = 0, g = 0, b = 0] = (value ?? "").split(",").map(Number);
  return [r, g, b];
}

/** Lights nearby pixel cells as the pointer moves. Radius 200 matches the reference mosaic. */
export function usePixelGlow(
  svgRef: RefObject<SVGSVGElement | null>,
  radius = GLOW_RADIUS,
) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cells = Array.from(svg.querySelectorAll<SVGElement>("[data-dim]")).map(
      (el) => ({
        el,
        dim: parseRgb(el.dataset.dim),
        lit: parseRgb(el.dataset.lit),
      }),
    );

    let mouseX = -9999;
    let mouseY = -9999;
    let pending = false;

    function paint() {
      pending = false;
      for (const next of cells) {
        const box = next.el.getBoundingClientRect();
        if (!box.width) {
          continue;
        }
        const dx = box.left + box.width / 2 - mouseX;
        const dy = box.top + box.height / 2 - mouseY;
        const dist = Math.hypot(dx, dy);
        const t = dist < radius ? Math.min(1, (1 - dist / radius) * 1.4) : 0;
        const rgb = next.dim.map((channel, i) =>
          Math.round(channel + (next.lit[i] - channel) * t),
        );
        next.el.style.fill = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
    }

    function moveTo(x: number, y: number) {
      mouseX = x;
      mouseY = y;
      if (!pending) {
        pending = true;
        requestAnimationFrame(paint);
      }
    }

    function onMove(event: MouseEvent) {
      moveTo(event.clientX, event.clientY);
    }

    function onLeave(event: MouseEvent) {
      if (event.relatedTarget) {
        return;
      }
      moveTo(-9999, -9999);
    }

    function onScrollOrResize() {
      moveTo(mouseX, mouseY);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [svgRef, radius]);
}
