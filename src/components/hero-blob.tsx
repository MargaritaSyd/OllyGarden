"use client";

import { useRef, type ReactNode } from "react";
import {
  DARK,
  HIGHLIGHT,
  MIST,
  OLIVE,
  pixelCell as cell,
  SHADOW,
  SUNFLOWER,
  usePixelGlow,
} from "@/components/pixel-glow";

function Mosaic() {
  return (
    <>
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
    </>
  );
}

function Offset({ y, children }: { y: number; children: ReactNode }) {
  return <g transform={`translate(0 ${y})`}>{children}</g>;
}

function ExtraSquares() {
  return (
    <>
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
    </>
  );
}

/** The brand-kit hero mosaic: the guide blob, one 317×687 graphic shifted down 52px. */
export function GuideBlob() {
  const rootRef = useRef<SVGSVGElement>(null);
  usePixelGlow(rootRef);

  return (
    <svg
      ref={rootRef}
      className="bk-guide-blob motion-safe:animate-[is-blob-in_1.1s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]"
      width="317"
      height="687"
      viewBox="0 0 317 687"
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(0 52)">
        <Mosaic />
        <ExtraSquares />
        <g transform="translate(0 126)">
          <ExtraSquares />
        </g>
      </g>
    </svg>
  );
}

export function HeroBlob({ variant = "default" }: { variant?: "default" | "guide" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePixelGlow(rootRef);
  const guide = variant === "guide";

  if (!guide) {
    return (
      <div
        ref={rootRef}
        className="pointer-events-none absolute top-0 right-0 hidden min-[1101px]:block"
        aria-hidden="true"
      >
        <svg width="317" height="502" viewBox="0 0 317 502" fill="none" className="[&_rect]:[shape-rendering:crispEdges]">
          <Mosaic />
          <ExtraSquares />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-y-0 right-0 z-[1] flex w-[317px] flex-col justify-between max-[767px]:hidden motion-reduce:hidden motion-safe:animate-[is-blob-in_1.1s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]"
      aria-hidden="true"
    >
      <svg
        width="317"
        height="561"
        viewBox="0 0 317 561"
        fill="none"
        className="shrink-0 [&_rect]:[shape-rendering:crispEdges]"
      >
        <Offset y={52}>
          <Mosaic />
          <ExtraSquares />
        </Offset>
      </svg>
      <svg
        width="317"
        height="127"
        viewBox="0 382 317 127"
        fill="none"
        className="shrink-0 [&_rect]:[shape-rendering:crispEdges]"
      >
        <ExtraSquares />
      </svg>
    </div>
  );
}
