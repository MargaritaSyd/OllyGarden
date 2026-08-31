"use client";

import { useEffect } from "react";
import { GLOW_RADIUS } from "@/lib/motif";

export function SolutionsOverviewFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const pixels = Array.from(document.querySelectorAll<HTMLElement>(".sol-ipx"));
    const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-ind-par]"));
    const section = document.querySelector<HTMLElement>("[data-inds]");
    const cleanups: Array<() => void> = [];

    if (section && frames.length) {
      const deco = Array.from(section.querySelectorAll<HTMLElement>(".sol-ipx"));
      let queued = false;

      function paintParallax() {
        queued = false;
        const viewH = window.innerHeight || 1;

        for (const frame of frames) {
          const parent = frame.parentElement;
          if (!parent) {
            continue;
          }
          const bounds = parent.getBoundingClientRect();
          if (bounds.bottom < 0 || bounds.top > viewH) {
            continue;
          }
          const progress = (bounds.top + bounds.height / 2 - viewH / 2) / viewH;
          frame.style.transform = `translateY(${(-progress * 28).toFixed(1)}px)`;
        }

        const sectionBounds = section.getBoundingClientRect();
        if (sectionBounds.bottom > 0 && sectionBounds.top < viewH) {
          const progress =
            (sectionBounds.top + sectionBounds.height / 2 - viewH / 2) / viewH;
          for (const pixel of deco) {
            const amount = Number.parseFloat(pixel.dataset.parallax || "0");
            pixel.style.transform = `translateY(${(progress * amount * 160).toFixed(1)}px)`;
          }
        }
      }

      function onScroll() {
        if (!queued) {
          queued = true;
          window.requestAnimationFrame(paintParallax);
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      paintParallax();
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    if (pixels.length) {
      let queued = false;
      let mouseX = -9999;
      let mouseY = -9999;

      function paintGlow() {
        queued = false;
        for (const pixel of pixels) {
          const bounds = pixel.getBoundingClientRect();
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
          pixel.style.opacity = Math.max(0.3, glow).toFixed(3);
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
      const onScrollGlow = () => moveTo(mouseX, mouseY);

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("scroll", onScrollGlow, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("scroll", onScrollGlow);
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, []);

  return null;
}
