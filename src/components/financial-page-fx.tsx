"use client";

import { useEffect } from "react";

const GLOW_RADIUS = 180;

export function FinancialPageFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = document.querySelector<HTMLElement>("[data-fp]");
    if (!section) {
      return;
    }

    const pixels = Array.from(section.querySelectorAll<HTMLElement>(".fp-sq"));
    if (!pixels.length) {
      return;
    }

    let glowQueued = false;
    let parallaxQueued = false;
    let mouseX = -9999;
    let mouseY = -9999;

    function paintGlow() {
      glowQueued = false;
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

    function paintParallax() {
      parallaxQueued = false;
      const viewH = window.innerHeight || 1;
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > viewH) {
        return;
      }
      const progress = (bounds.top + bounds.height / 2 - viewH / 2) / viewH;
      for (const pixel of pixels) {
        const amount = Number.parseFloat(pixel.dataset.parallax || "0");
        pixel.style.transform = `translateY(${(progress * amount * 150).toFixed(1)}px)`;
      }
    }

    function moveTo(x: number, y: number) {
      mouseX = x;
      mouseY = y;
      if (!glowQueued) {
        glowQueued = true;
        window.requestAnimationFrame(paintGlow);
      }
    }

    function onParallax() {
      moveTo(mouseX, mouseY);
      if (!parallaxQueued) {
        parallaxQueued = true;
        window.requestAnimationFrame(paintParallax);
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

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onParallax, { passive: true });
    window.addEventListener("resize", onParallax, { passive: true });
    paintParallax();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("resize", onParallax);
    };
  }, []);

  return null;
}
