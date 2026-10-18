"use client";

import { useRef, type ReactNode } from "react";
import {
  DEEP,
  HIGHLIGHT,
  LEAF,
  MIST,
  MOSS,
  OLIVE,
  pixelCell,
  SUNFLOWER,
  usePixelGlow,
  type Rgb,
} from "@/components/pixel-glow";

type Cell = {
  color: Rgb;
  dim?: number;
  lit?: number;
} & (
  | { kind: "rect"; x?: number; y?: number; w: number; h?: number }
  | { kind: "path"; d: string }
);

function Cells({ cells }: { cells: Cell[] }) {
  return cells.map((cell, index) => {
    const paint = pixelCell(cell.color, cell.dim ?? 0.3, cell.lit ?? 1);
    if (cell.kind === "path") {
      return <path key={index} {...paint} d={cell.d} />;
    }
    return (
      <rect
        key={index}
        {...paint}
        x={cell.x}
        y={cell.y}
        width={cell.w}
        height={cell.h ?? cell.w}
        shapeRendering="crispEdges"
      />
    );
  });
}

const tile = 67.5528;
const block = 68.0495;

function rect(
  color: Rgb,
  x: number | undefined,
  y: number | undefined,
  w: number,
  dim = 0.3,
): Cell {
  return { kind: "rect", color, x, y, w, dim };
}

function path(color: Rgb, d: string, dim = 0.3, lit = 1): Cell {
  return { kind: "path", color, d, dim, lit };
}

const heroCells: Cell[] = [
  rect(MOSS, undefined, undefined, block),
  rect(HIGHLIGHT, 68.5469, 68.5527, block),
  rect(HIGHLIGHT, 272, 203, block),
  rect(OLIVE, undefined, 68.5527, 68.5462),
  rect(SUNFLOWER, 68.5469, 136.1, tile),
  rect(SUNFLOWER, 136.102, 136.1, tile),
  rect(SUNFLOWER, 136.102, 203.652, tile),
  rect(SUNFLOWER, 204, 271.203, tile),
  rect(MOSS, 136.102, 338.758, block),
  rect(SUNFLOWER, 203.656, 407.305, tile),
  rect(SUNFLOWER, 136.102, 407.305, tile),
  rect(OLIVE, 68.5469, 474.855, tile),
  rect(OLIVE, 406.062, 812.619, tile),
  rect(OLIVE, 473.617, 882.16, tile),
  rect(OLIVE, 541.164, 882.16, tile),
  rect(SUNFLOWER, 136.102, 474.855, tile),
  rect(SUNFLOWER, 203.656, 542.41, tile),
  rect(SUNFLOWER, 270.953, 609.961, tile),
  rect(SUNFLOWER, 473, 609.961, tile),
  rect(SUNFLOWER, 338.508, 677.514, tile),
  rect(SUNFLOWER, 406.062, 677.514, tile),
  rect(HIGHLIGHT, 68.5469, 542.41, tile),
  rect(HIGHLIGHT, 473.617, 745.066, tile),
  rect(HIGHLIGHT, 540, 543, tile),
  rect(SUNFLOWER, 136.102, 542.41, tile),
  rect(SUNFLOWER, 0.742188, 609.961, block),
  rect(DEEP, 68.5469, 678.508, tile),
  rect(SUNFLOWER, 136.102, 678.508, tile),
  rect(SUNFLOWER, 135.805, 813.613, tile),
  rect(LEAF, 136.102, 881.166, block),
  rect(SUNFLOWER, 66, 747, 68.5462),
  rect(MOSS, 68.2969, undefined, tile),
  path(
    OLIVE,
    "M203.406 915.57C203.406 934.428 218.683 949.713 237.529 949.713C237.529 930.855 222.253 915.57 203.406 915.57Z",
  ),
  path(
    OLIVE,
    "M271.654 915.568C271.654 934.426 256.378 949.711 237.531 949.711C237.531 930.853 252.808 915.568 271.654 915.568Z",
  ),
  path(
    OLIVE,
    "M237.529 915.607C256.376 915.607 271.652 900.322 271.652 881.465H203.406C203.406 900.322 218.683 915.607 237.529 915.607Z",
  ),
  path(
    OLIVE,
    "M472.961 847.369C472.961 866.584 488.527 882.158 507.731 882.158C507.731 862.944 492.165 847.369 472.961 847.369Z",
  ),
  path(
    OLIVE,
    "M542.504 847.369C542.504 866.584 526.938 882.158 507.734 882.158C507.734 862.944 523.3 847.369 542.504 847.369Z",
  ),
  path(
    OLIVE,
    "M507.731 847.408C526.934 847.408 542.5 831.834 542.5 812.619H472.961C472.961 831.834 488.527 847.408 507.731 847.408Z",
  ),
  path(MIST, "M203.406 661.156L271.653 661.156L237.529 644.061L203.406 661.156Z", 0.06, 0.32),
  path(MIST, "M203.406 678.211L271.653 678.211L237.529 661.119L203.406 678.211Z", 0.06, 0.32),
  path(MIST, "M203.406 627.055L271.653 627.055L237.529 609.963L203.406 627.055Z", 0.06, 0.32),
  path(MIST, "M203.406 644.109L271.653 644.109L237.529 627.018L203.406 644.109Z", 0.06, 0.32),
  path(
    MIST,
    "M137.836 100.168C137.836 118.182 152.437 132.783 170.451 132.783C170.451 114.77 155.85 100.168 137.836 100.168Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M203.067 100.168C203.067 118.182 188.465 132.783 170.451 132.783C170.451 114.77 185.053 100.168 203.067 100.168Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M137.836 67.5527C137.836 85.5667 152.437 100.168 170.451 100.168C170.451 82.1541 155.85 67.5527 137.836 67.5527Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M203.067 67.5529C203.067 85.5668 188.465 100.168 170.451 100.168C170.451 82.1541 185.053 67.5529 203.067 67.5529Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M70.2891 32.6155C70.2891 50.6294 84.8904 65.2307 102.904 65.2307C102.904 47.2168 88.303 32.6155 70.2891 32.6155Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M135.52 32.6155C135.52 50.6294 120.918 65.2307 102.904 65.2307C102.904 47.2168 117.506 32.6155 135.52 32.6155Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M70.2891 0C70.2891 18.0139 84.8905 32.6153 102.904 32.6153C102.904 14.6013 88.3031 0 70.2891 0Z",
    0.06,
    0.32,
  ),
  path(
    MIST,
    "M135.52 0.000165059C135.52 18.0141 120.918 32.6153 102.904 32.6153C102.904 14.6013 117.506 0.000165059 135.52 0.000165059Z",
    0.06,
    0.32,
  ),
];

const teamsCells: Cell[] = [
  rect(SUNFLOWER, undefined, 114.336, 57.1702, 0.06),
  rect(SUNFLOWER, 56.7538, 57.5862, 57.1702, 0.04),
  rect(SUNFLOWER, 113.506, 0.0000168775, 57.1702, 0.04),
  rect(SUNFLOWER, 170.258, 57.5862, 57.1702, 0.04),
  rect(OLIVE, 113.506, 512.446, 56.7529, 0.2),
  rect(OLIVE, 170.258, 570.867, 56.7529, 0.2),
  rect(SUNFLOWER, 0.00000995971, 342.188, 56.7529, 0.2),
  rect(SUNFLOWER, 56.7538, 342.188, 56.7529, 0.08),
  rect(SUNFLOWER, 0.367195, 285.797, 56.7529, 0.04),
  rect(SUNFLOWER, 0.367193, 229.414, 56.7529, 0.2),
  rect(SUNFLOWER, 56.7559, 398.938, 56.7529, 0.2),
  rect(SUNFLOWER, 113.506, 398.938, 56.7529, 0.08),
  rect(HIGHLIGHT, 170.258, 455.696, 56.7529, 0.2),
  path(
    OLIVE,
    "M169.713 541.641C169.713 557.784 182.79 570.868 198.924 570.868C198.924 554.726 185.847 541.641 169.713 541.641Z",
    0.2,
  ),
  path(
    OLIVE,
    "M228.139 541.641C228.139 557.784 215.061 570.868 198.928 570.868C198.928 554.726 212.005 541.641 228.139 541.641Z",
    0.2,
  ),
  path(
    OLIVE,
    "M198.924 541.673C215.057 541.673 228.135 528.588 228.135 512.446H169.713C169.713 528.588 182.79 541.673 198.924 541.673Z",
    0.2,
  ),
  path(
    MIST,
    "M56.7559 27.4014C56.7559 42.5354 69.0229 54.8024 84.1569 54.8024C84.1569 39.6684 71.8899 27.4014 56.7559 27.4014Z",
    0.04,
    0.32,
  ),
  path(
    MIST,
    "M111.558 27.4014C111.558 42.5354 99.291 54.8024 84.1569 54.8024C84.1569 39.6684 96.4239 27.4014 111.558 27.4014Z",
    0.04,
    0.32,
  ),
  path(
    MIST,
    "M56.7559 0.000246621C56.7559 15.1342 69.0229 27.4012 84.1569 27.4012C84.1569 12.2672 71.8899 0.000246621 56.7559 0.000246621Z",
    0.04,
    0.32,
  ),
  path(
    MIST,
    "M111.558 0.000385292C111.558 15.1344 99.291 27.4012 84.1569 27.4012C84.1569 12.2672 96.4239 0.000385292 111.558 0.000385292Z",
    0.04,
    0.32,
  ),
];

function GlowSvg({
  className,
  viewBox,
  width,
  height,
  preserveAspectRatio,
  children,
}: {
  className: string;
  viewBox: string;
  width?: number;
  height?: number;
  preserveAspectRatio?: string;
  children: ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  usePixelGlow(ref);
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function RoseHeroDeco({ side }: { side: "left" | "right" }) {
  return (
    <GlowSvg
      className={`rz-hero-deco rz-hero-deco--${side}`}
      viewBox="0 0 608.717 949.713"
      preserveAspectRatio="xMaxYMid meet"
    >
      <Cells cells={heroCells} />
    </GlowSvg>
  );
}

export function RoseTeamsDeco() {
  return (
    <GlowSvg
      className="rz-teams-deco"
      viewBox="0 0 627.62 228.139"
      width={627.62}
      height={228.139}
    >
      <g transform="translate(627.62 0) rotate(90)">
        <Cells cells={teamsCells} />
      </g>
    </GlowSvg>
  );
}
