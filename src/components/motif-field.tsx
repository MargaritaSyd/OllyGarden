"use client";

import { useEffect, useRef } from "react";
import {
  buildCorners,
  buildFrame,
  buildInsights,
  buildLead,
  buildSides,
  buildTulip,
  CELL,
  GLOW_RADIUS,
  type MotifCell,
  type MotifKind,
} from "@/lib/motif";

const FLOWER_SRC = "/brand/layout/flower.svg";
const CHEVRONS_SRC = "/brand/layout/chevrons.svg";
const CHEVRONS_HIGHLIGHT_SRC = "/brand/layout/chevrons-highlight.svg";
const SPROUT_SRC = "/brand/layout/sprout.svg";

type MotifFieldProps = {
  kind: MotifKind;
  className?: string;
};

export function MotifField({ kind, className }: MotifFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const surface = canvas;
    const box = wrap;
    const context = ctx;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);

    const flower = new Image();
    const chevrons = new Image();
    const sprout = new Image();
    flower.src = FLOWER_SRC;
    chevrons.src =
      kind === "frame" || kind === "corners"
        ? CHEVRONS_HIGHLIGHT_SRC
        : CHEVRONS_SRC;
    sprout.src = SPROUT_SRC;

    let cells: MotifCell[] = [];
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let glowX = -9999;
    let glowY = -9999;
    let frameId = 0;
    let running = true;

    function resize() {
      width = box.clientWidth;
      height = box.clientHeight;
      surface.width = Math.max(1, Math.floor(width * pixelRatio));
      surface.height = Math.max(1, Math.floor(height * pixelRatio));
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      cells =
        kind === "sides"
          ? buildSides(width, height)
          : kind === "corners"
            ? buildCorners(width, height)
            : kind === "insights"
              ? buildInsights(width, height)
              : kind === "tulip"
                ? buildTulip(width, height)
                : kind === "lead"
                  ? buildLead(width, height)
                  : buildFrame(width, height);
      if (reducedMotion) {
        paint();
      }
    }

    function drawCell(cell: MotifCell, alpha: number) {
      context.globalAlpha = alpha;
      const size = cell.size ?? CELL;
      const icon =
        cell.icon === "flower"
          ? flower
          : cell.icon === "chevrons"
            ? chevrons
            : cell.icon === "sprout"
              ? sprout
              : null;

      if (icon?.complete && icon.naturalWidth > 0) {
        context.save();
        context.translate(cell.x, cell.y);
        context.rotate(cell.rotation);
        context.drawImage(icon, -size / 2, -size / 2, size, size);
        context.restore();
        return;
      }

      context.fillStyle = cell.color;
      context.fillRect(cell.x - size / 2, cell.y - size / 2, size, size);
    }

    function paint() {
      context.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        glowX += (mouseX - glowX) * 0.14;
        glowY += (mouseY - glowY) * 0.14;
      }

      for (const cell of cells) {
        // Lead icons keep authored alphas (mist chevrons/sprouts are very faint).
        const base =
          kind === "lead" ||
          kind === "frame" ||
          kind === "corners" ||
          kind === "tulip"
            ? cell.alpha
            : cell.icon
              ? Math.max(cell.alpha, 0.75)
              : cell.alpha;
        drawCell(cell, base);
      }

      if (!reducedMotion) {
        const glowRadius =
          kind === "corners" && cells[0]?.size
            ? (GLOW_RADIUS * cells[0].size) / CELL
            : GLOW_RADIUS;
        for (const cell of cells) {
          const distance = Math.hypot(cell.x - glowX, cell.y - glowY);
          if (distance >= glowRadius) {
            continue;
          }
          const glow = 1 - distance / glowRadius;
          drawCell(cell, Math.min(1, Math.max(cell.alpha, glow * 1.4)));
        }
      }

      context.globalAlpha = 1;
    }

    function tick() {
      if (!running) {
        return;
      }
      paint();
      frameId = window.requestAnimationFrame(tick);
    }

    function onMove(event: MouseEvent) {
      const bounds = surface.getBoundingClientRect();
      mouseX = event.clientX - bounds.left;
      mouseY = event.clientY - bounds.top;
    }

    function onTouch(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      const bounds = surface.getBoundingClientRect();
      mouseX = touch.clientX - bounds.left;
      mouseY = touch.clientY - bounds.top;
    }

    function onLeave(event: MouseEvent) {
      if (event.relatedTarget) {
        return;
      }
      mouseX = -9999;
      mouseY = -9999;
    }

    function onTouchEnd() {
      mouseX = -9999;
      mouseY = -9999;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    flower.addEventListener("load", paint);
    chevrons.addEventListener("load", paint);
    sprout.addEventListener("load", paint);

    if (!reducedMotion) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
      frameId = window.requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      flower.removeEventListener("load", paint);
      chevrons.removeEventListener("load", paint);
      sprout.removeEventListener("load", paint);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [kind]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
