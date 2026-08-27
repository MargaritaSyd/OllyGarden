"use client";

import { useEffect, useRef } from "react";

type Rgb = readonly [number, number, number];

const GLOW_RADIUS = 200;
const FOREST: Rgb = [1, 30, 12];
const OLIVE: Rgb = [156, 167, 3];
const SUNFLOWER: Rgb = [209, 209, 0];
const HIGHLIGHT: Rgb = [227, 226, 112];
const DARK: Rgb = [48, 71, 9];
const SHADOW: Rgb = [15, 42, 11];
const MIST: Rgb = [250, 249, 240];

function mix(target: Rgb, amount: number): Rgb {
  return [
    Math.round(FOREST[0] + (target[0] - FOREST[0]) * amount),
    Math.round(FOREST[1] + (target[1] - FOREST[1]) * amount),
    Math.round(FOREST[2] + (target[2] - FOREST[2]) * amount),
  ];
}

function cell(target: Rgb, dimAmount = 0.3, litAmount = 1) {
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

export function HeroBlob() {
  const svgRef = useRef<SVGSVGElement>(null);

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
        const t =
          dist < GLOW_RADIUS
            ? Math.min(1, (1 - dist / GLOW_RADIUS) * 1.4)
            : 0;
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
  }, []);

  return (
    <div
      className="pointer-events-none absolute top-0 right-0 hidden min-[1101px]:block"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        width="317"
        height="502"
        viewBox="0 0 317 502"
        fill="none"
      >
        <rect
          {...cell(OLIVE)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 127.898 194.129)"
        />
        <rect
          {...cell(OLIVE)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 63.0234 131.107)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 316.961 320.176)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 316.961 257.152)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 253.945 257.15)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 253.938 194.129)"
        />
        <rect
          {...cell(HIGHLIGHT)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 190.922 131.107)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.4831"
          height="63.4831"
          transform="matrix(0 -1 -1 0 316.961 69.9844)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.4831"
          height="63.4831"
          transform="matrix(0 -1 -1 0 316.961 13.2774)"
        />
        <rect
          {...cell(DARK)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 253.016 509)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 253.016 445.977)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 191.094 68.9727)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 191.094 12.2656)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.0197"
          height="63.0197"
          transform="matrix(0 -1 -1 0 126.977 509)"
        />
        <rect
          {...cell(SHADOW)}
          width="63.4831"
          height="63.4831"
          transform="matrix(0 -1 -1 0 63.9531 508.996)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.4831"
          height="63.4831"
          transform="matrix(0 -1 -1 0 63.9531 445.979)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.9465"
          height="63.9465"
          transform="matrix(0 -1 -1 0 63.9531 68.6504)"
        />
        <rect
          {...cell(SUNFLOWER)}
          width="63.9465"
          height="63.9465"
          transform="matrix(0 -1 -1 0 63.9531 11.9434)"
        />
        <path
          {...cell(OLIVE)}
          d="M63.6719 351.34C63.6719 368.932 49.4207 383.191 31.8387 383.191C31.8387 365.599 46.0899 351.34 63.6719 351.34Z"
        />
        <path
          {...cell(OLIVE)}
          d="M0.00269508 351.338C0.00269662 368.93 14.2539 383.189 31.8359 383.189C31.8359 365.597 17.5847 351.338 0.00269508 351.338Z"
        />
        <path
          {...cell(OLIVE)}
          d="M31.8387 351.375C14.2567 351.375 0.00544511 337.115 0.00544357 319.523L63.6719 319.523C63.6719 337.115 49.4207 351.375 31.8387 351.375Z"
        />
        <path
          {...cell(OLIVE)}
          d="M127.906 99.2637C127.906 117.189 113.385 131.718 95.4698 131.718C95.4698 113.793 109.991 99.2637 127.906 99.2637Z"
        />
        <path
          {...cell(OLIVE)}
          d="M63.0244 99.2617C63.0244 117.187 77.5458 131.717 95.4609 131.717C95.4609 113.791 80.9396 99.2617 63.0244 99.2617Z"
        />
        <path
          {...cell(OLIVE)}
          d="M95.4698 99.3005C77.5546 99.3005 63.0333 84.771 63.0333 66.8457L127.906 66.8457C127.906 84.771 113.385 99.3005 95.4698 99.3005Z"
        />
        <path
          {...cell(MIST, 0.06, 0.32)}
          d="M269.195 383.188L269.195 319.521L285.143 351.354L269.195 383.188Z"
        />
        <path
          {...cell(MIST, 0.06, 0.32)}
          d="M253.289 383.188L253.289 319.521L269.234 351.354L253.289 383.188Z"
        />
        <path
          {...cell(MIST, 0.06, 0.32)}
          d="M301.008 383.186L301.008 319.519L316.953 351.352L301.008 383.186Z"
        />
        <path
          {...cell(MIST, 0.06, 0.32)}
          d="M285.102 383.186L285.102 319.519L301.046 351.352L285.102 383.186Z"
        />
      </svg>
    </div>
  );
}
