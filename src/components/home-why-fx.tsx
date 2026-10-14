"use client";

import { useEffect } from "react";

// Same scroll drift as the reference Why section: each [data-parallax] layer
// eases toward a share of how far the section sits from the viewport centre.
export function HomeWhyFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = document.querySelector<HTMLElement>("[data-why]");
    if (!section) {
      return;
    }
    const sectionEl = section;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((el) => ({
      el,
      factor: Number.parseFloat(el.dataset.parallax || "0"),
    }));
    let offset = 0;
    let frame = 0;

    function tick() {
      const bounds = sectionEl.getBoundingClientRect();
      if (bounds.bottom > -200 && bounds.top < window.innerHeight + 200) {
        const delta = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
        offset += (delta - offset) * 0.09;
        for (const item of items) {
          item.el.style.transform = `translate3d(0, ${(offset * item.factor).toFixed(2)}px, 0)`;
        }
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      for (const item of items) {
        item.el.style.transform = "";
      }
    };
  }, []);

  return null;
}
