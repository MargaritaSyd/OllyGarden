"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { InView } from "@/components/in-view";
import { homeSecurity } from "@/lib/home";
import { GLOW_RADIUS } from "@/lib/motif";

const squares = [
  { c: 2, r: 0, i: 2, color: "#9ca703", base: 0.3 },
  { c: 1, r: 1, i: 2, color: "#9ca703", base: 0.3 },
  { c: 0, r: 2, i: 2, color: "#9ca703", base: 0.3 },
  { c: 1, r: 2, i: 3, color: "#455e1e", base: 0.3 },
  { c: 0, r: 3, i: 3, color: "#455e1e", base: 0.27 },
  { c: 4, r: 4, i: 1, color: "#6d8120", base: 0.27 },
  { c: 1, r: 5, i: 6, color: "#455e1e", base: 0.3 },
  { c: 3, r: 1, i: 4, color: "#d1d100", base: 0.3 },
  { c: 4, r: 1, i: 5, color: "#d1d100", base: 0.3 },
  { c: 5, r: 2, i: 0, color: "#d1d100", base: 0.3 },
  { c: 5, r: 3, i: 1, color: "#d1d100", base: 0.3 },
  { c: 2, r: 3, i: 5, color: "#34520b", base: 0.3 },
  { c: 3, r: 2, i: 5, color: "#d1d100", base: 0.3 },
  { c: 3, r: 4, i: 0, color: "#d1d100", base: 0.3 },
  { c: 2, r: 4, i: 6, color: "#637355", base: 0.3 },
  { c: 2, r: 5, i: 0, color: "#d1d100", base: 0.3 },
] as const;

export function HomeSecurity() {
  return (
    <InView as="section" aria-labelledby="ogsec-title" className="ogsec">
      <div className="ogsec-inner">
        <div className="ogsec-copy">
          <p className="ogsec-eyebrow">{homeSecurity.eyebrow}</p>
          <h2 id="ogsec-title" className="ogsec-title">
            {homeSecurity.title}
          </h2>
          <p className="ogsec-body">{homeSecurity.body}</p>
        </div>
      </div>
      <SecurityDeco />
      <div className="ogsec-grain" aria-hidden="true" />
    </InView>
  );
}

function SecurityDeco() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = rootRef.current;
    if (!root) {
      return;
    }

    const fills = Array.from(root.querySelectorAll<HTMLElement>(".ogsec-fill"));
    let queued = false;
    let mouseX = -9999;
    let mouseY = -9999;

    function paintGlow() {
      queued = false;
      for (const fill of fills) {
        const bounds = fill.getBoundingClientRect();
        if (!bounds.width) {
          continue;
        }
        const dx = bounds.left + bounds.width / 2 - mouseX;
        const dy = bounds.top + bounds.height / 2 - mouseY;
        const distance = Math.hypot(dx, dy);
        const glow =
          distance < GLOW_RADIUS
            ? Math.min(1, (1 - distance / GLOW_RADIUS) * 1.4)
            : 0;
        const base = Number.parseFloat(fill.dataset.base || "0.3");
        fill.style.opacity = Math.max(base, glow).toFixed(3);
      }
    }

    function moveTo(x: number, y: number) {
      mouseX = x;
      mouseY = y;
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(paintGlow);
      }
    }

    const onMove = (event: MouseEvent) => moveTo(event.clientX, event.clientY);
    const onLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        moveTo(-9999, -9999);
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        moveTo(touch.clientX, touch.clientY);
      }
    };
    const onTouchEnd = () => moveTo(-9999, -9999);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("scroll", paintGlow, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", paintGlow);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="ogsec-deco"
      tabIndex={0}
      role="group"
      aria-label="Decorative grid with the AICPA SOC badge"
    >
      {squares.map((square) => (
        <span
          key={`${square.c}-${square.r}`}
          className="ogsec-sq"
          aria-hidden="true"
          style={
            {
              "--c": square.c,
              "--r": square.r,
              "--i": square.i,
            } as CSSProperties
          }
        >
          <span
            className="ogsec-fill"
            data-base={square.base}
            style={{ background: square.color, opacity: square.base }}
          />
        </span>
      ))}
      <div className="ogsec-badge">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={homeSecurity.badgeSrc}
          alt={homeSecurity.badgeAlt}
          width={173}
          height={173}
          loading="lazy"
          decoding="async"
        />
        <span className="ogsec-tm" aria-hidden="true">
          TM
        </span>
      </div>
    </div>
  );
}
