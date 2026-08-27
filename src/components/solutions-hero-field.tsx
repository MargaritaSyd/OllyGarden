"use client";

import { useEffect, useRef } from "react";
import { GLOW_RADIUS } from "@/lib/motif";

const FLOWER_SRC = "/brand/layout/flower.svg";
const CHEVRONS_SRC = "/brand/layout/chevrons.svg";
const SPROUT_SRC = "/brand/layout/sprout.svg";

const ROWS = 14.063;
const REST = 0.3;

type ColorCell = readonly [col: number, row: number, color: string];

const COLOR_CELLS: readonly ColorCell[] = [
  [0, 0, "#34520B"],
  [1, 0, "#34520B"],
  [0, 1, "#9CA703"],
  [1, 1, "#E3E270"],
  [1, 2, "#D1D100"],
  [2, 2, "#D1D100"],
  [2, 3, "#D1D100"],
  [2, 4, "#D1D100"],
  [2, 5, "#34520B"],
  [2, 6, "#D1D100"],
  [3, 6, "#D1D100"],
  [1, 7, "#9CA703"],
  [2, 7, "#D1D100"],
  [1, 8, "#E3E270"],
  [2, 8, "#D1D100"],
  [3, 8, "#D1D100"],
  [0, 9, "#D1D100"],
  [4, 9, "#D1D100"],
  [5, 9, "#D1D100"],
  [1, 10, "#011E0C"],
  [2, 10, "#D1D100"],
  [5, 10, "#D1D100"],
  [6, 10, "#D1D100"],
  [0, 11, "#D1D100"],
  [7, 11, "#E3E270"],
  [1, 12, "#D1D100"],
  [6, 12, "#9CA703"],
  [0, 13, "#D1D100"],
  [1, 13, "#D1D100"],
  [2, 13, "#D1D100"],
  [7, 13, "#9CA703"],
  [8, 13, "#9CA703"],
];

type IconName = "flower" | "chevrons" | "sprout";

const ICON_CELLS: readonly {
  col: number;
  row: number;
  icon: IconName;
  rest: number;
  cap: number;
}[] = [
  { col: 3, row: 9, icon: "chevrons", rest: 0.09, cap: 0.5 },
  { col: 2, row: 1, icon: "sprout", rest: 0.09, cap: 0.5 },
  { col: 1, row: 0, icon: "sprout", rest: 0.09, cap: 0.5 },
  { col: 3, row: 13, icon: "flower", rest: REST, cap: 1 },
  { col: 7, row: 12, icon: "flower", rest: REST, cap: 1 },
];

type PaintedCell = {
  x0: number;
  y0: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  color: string | null;
  icon: IconName | null;
  rest: number;
  cap: number;
  delay: number;
};

function hash(x: number, y: number) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

type SolutionsHeroFieldProps = {
  variant?: "overview" | "financial";
};

export function SolutionsHeroField({ variant = "overview" }: SolutionsHeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const surface = canvas;
    const context = ctx;
    const box = canvas.parentElement ?? canvas;
    const imgPar = box.querySelector<HTMLElement>("[data-ov-img-par]");
    const hero = canvas.closest("section");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);

    const flower = new Image();
    const chevrons = new Image();
    const sprout = new Image();
    flower.src = FLOWER_SRC;
    chevrons.src = CHEVRONS_SRC;
    sprout.src = SPROUT_SRC;

    let cells: PaintedCell[] = [];
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let glowX = -9999;
    let glowY = -9999;
    let pageX = -9999;
    let pageY = -9999;
    let parallaxX = 0;
    let parallaxY = 0;
    let frameId = 0;
    let running = true;
    const startedAt = performance.now();

    function roundCell(value: number, pitch: number) {
      return Math.round(value * pitch);
    }

    function resize() {
      width = box.clientWidth;
      height = box.clientHeight;
      surface.width = Math.max(1, Math.floor(width * pixelRatio));
      surface.height = Math.max(1, Math.floor(height * pixelRatio));
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const pitch = height / ROWS;
      cells = [];

      const push = (
        col: number,
        row: number,
        color: string | null,
        icon: IconName | null,
        rest: number,
        cap: number,
        extraDelay: number,
      ) => {
        const x0 = roundCell(col, pitch);
        const y0 = roundCell(row, pitch);
        const w = roundCell(col + 1, pitch) - x0;
        const h = roundCell(row + 1, pitch) - y0;
        cells.push({
          x0,
          y0,
          w,
          h,
          cx: x0 + w / 2,
          cy: y0 + h / 2,
          color,
          icon,
          rest,
          cap,
          delay:
            350 +
            col * 95 +
            hash(col * 3 + 1, row * 5 + 2) * 160 +
            extraDelay,
        });
      };

      for (const [col, row, color] of COLOR_CELLS) {
        const painted =
          variant === "financial" && col === 1 && row === 10 ? "#00280E" : color;
        push(col, row, painted, null, REST, 1, 0);
      }
      for (const icon of ICON_CELLS) {
        push(icon.col, icon.row, null, icon.icon, icon.rest, icon.cap, 80);
      }
    }

    function iconImage(name: IconName) {
      if (name === "flower") {
        return flower;
      }
      if (name === "chevrons") {
        return chevrons;
      }
      return sprout;
    }

    function drawCell(cell: PaintedCell, scale: number) {
      const w = cell.w * scale;
      const h = cell.h * scale;
      const x = cell.cx - w / 2;
      const y = cell.cy - h / 2;

      if (cell.icon) {
        const image = iconImage(cell.icon);
        if (image.complete && image.naturalWidth > 0) {
          context.drawImage(image, x, y, w, h);
        }
        return;
      }

      if (cell.color) {
        context.fillStyle = cell.color;
        context.fillRect(x, y, w, h);
      }
    }

    function paint(now: number) {
      context.clearRect(0, 0, width, height);
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;

      const elapsed = now - startedAt;

      for (const cell of cells) {
        let intro = reducedMotion
          ? 1
          : Math.min(1, Math.max(0, (elapsed - cell.delay) / 420));
        if (intro <= 0) {
          continue;
        }
        intro *= 2 - intro;
        context.globalAlpha = cell.rest * intro;
        drawCell(cell, intro >= 1 ? 1 : 0.72 + 0.28 * intro);

        if (reducedMotion) {
          continue;
        }
        const distance = Math.hypot(cell.cx - glowX, cell.cy - glowY);
        if (distance >= GLOW_RADIUS) {
          continue;
        }
        const glow = 1 - distance / GLOW_RADIUS;
        context.globalAlpha = Math.min(cell.cap, glow * 1.4) * intro;
        drawCell(cell, 1);
      }

      context.globalAlpha = 1;

      if (imgPar && hero && !reducedMotion) {
        const bounds = hero.getBoundingClientRect();
        let targetX = 0;
        let targetY = 0;
        if (pageX > -9000 && bounds.width && bounds.height) {
          targetX = ((pageX - bounds.left) / bounds.width - 0.5) * -14;
          targetY = ((pageY - bounds.top) / bounds.height - 0.5) * -10;
        }
        parallaxX += (targetX - parallaxX) * 0.06;
        parallaxY += (targetY - parallaxY) * 0.06;
        imgPar.style.transform = `translate3d(${parallaxX.toFixed(2)}px,${parallaxY.toFixed(2)}px,0)`;
      }
    }

    function tick(now: number) {
      if (!running) {
        return;
      }
      paint(now);
      frameId = window.requestAnimationFrame(tick);
    }

    function onMove(event: MouseEvent) {
      const bounds = surface.getBoundingClientRect();
      mouseX = event.clientX - bounds.left;
      mouseY = event.clientY - bounds.top;
      pageX = event.clientX;
      pageY = event.clientY;
    }

    function onLeave(event: MouseEvent) {
      if (event.relatedTarget) {
        return;
      }
      mouseX = -9999;
      mouseY = -9999;
      pageX = -9999;
      pageY = -9999;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    const onIconLoad = () => paint(performance.now());
    flower.addEventListener("load", onIconLoad);
    chevrons.addEventListener("load", onIconLoad);
    sprout.addEventListener("load", onIconLoad);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reducedMotion) {
      paint(performance.now());
    } else {
      frameId = window.requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      flower.removeEventListener("load", onIconLoad);
      chevrons.removeEventListener("load", onIconLoad);
      sprout.removeEventListener("load", onIconLoad);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] block h-full w-full"
      aria-hidden="true"
    />
  );
}
