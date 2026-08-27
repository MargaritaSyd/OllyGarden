import { tokens } from "@/lib/tokens";

export const CELL = 48;
export const GLOW_RADIUS = 170;

export type MotifIcon = "flower" | "chevrons" | "sprout";

export type MotifCell = {
  x: number;
  y: number;
  col: number;
  row: number;
  color: string;
  alpha: number;
  icon: MotifIcon | null;
  rotation: number;
  size?: number;
};

const PALETTE = [
  tokens.bitmap.highlight,
  tokens.bitmap.highlight,
  tokens.bitmap.highlight,
  tokens.bitmap.sunflower,
  tokens.bitmap.sunflower,
  tokens.bitmap.mid,
  tokens.bitmap.mid,
  tokens.bitmap.olive,
  tokens.bitmap.olive,
  tokens.bitmap.shadow,
  tokens.bitmap.shadow,
];

function hash(x: number, y: number) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function noise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function placeIcon(
  cells: MotifCell[],
  icon: MotifIcon,
  rotation: number,
  targetCol: number,
  targetRow: number,
  where: (cell: MotifCell) => boolean,
) {
  let best: MotifCell | undefined;
  let bestDistance = Infinity;

  for (const cell of cells) {
    if (cell.icon || !where(cell)) {
      continue;
    }
    const distance =
      (cell.col - targetCol) ** 2 + (cell.row - targetRow) ** 2;
    if (distance < bestDistance) {
      best = cell;
      bestDistance = distance;
    }
  }

  if (best) {
    best.icon = icon;
    best.rotation = rotation;
  }
}

function ensureCell(cells: MotifCell[], col: number, row: number): MotifCell {
  const existing = cells.find((cell) => cell.col === col && cell.row === row);
  if (existing) {
    return existing;
  }

  const cell: MotifCell = {
    x: col * CELL + CELL / 2,
    y: row * CELL + CELL / 2,
    col,
    row,
    color: PALETTE[5] ?? tokens.bitmap.mid,
    alpha: 0.42,
    icon: null,
    rotation: 0,
  };
  cells.push(cell);
  return cell;
}

export type MotifKind = "frame" | "sides" | "corners" | "insights" | "tulip" | "lead";

function buildMotif(width: number, height: number, kind: MotifKind): MotifCell[] {
  // Sides hug both edges: ceil leftover instead of leaving a background strip.
  const fit = kind === "sides" ? Math.ceil : Math.floor;
  const cols = Math.max(1, fit(width / CELL));
  const rows = Math.max(1, fit(height / CELL));
  const radius = Math.min(cols, rows) / 2;
  const cells: MotifCell[] = [];
  const isCorners = kind === "corners" || kind === "insights" || kind === "tulip";
  const tulipBlLift = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const fromLeft = col;
      const fromTop = row;
      const fromRight = cols - 1 - col;
      const fromBottom = rows - 1 - row;
      const distSide = Math.min(fromLeft, fromRight);
      const edge =
        kind === "sides"
          ? distSide / Math.max(cols / 2, 1)
          : Math.min(fromLeft, fromTop, fromRight, fromBottom) / radius;

      if (kind === "sides" && distSide > 3) {
        continue;
      }

      // Rose: wider top-right strip. Tulip: compact TR + thin BL band toward center.
      const trWidth =
        kind === "tulip"
          ? Math.max(6, Math.floor(cols * 0.14))
          : Math.max(10, Math.floor(cols * 0.22));
      const blRadius = 7.4;
      const blExtent = 6;
      const tulipBlWidth = Math.max(18, Math.floor(cols * 0.55));

      if (isCorners) {
        const bottomLeft = Math.hypot(fromLeft, fromBottom);
        const inTopRight =
          kind === "tulip"
            ? fromRight <= trWidth &&
              fromTop <= (fromRight <= 3 ? 3 : 2)
            : fromRight <= trWidth &&
              fromTop >= 1 &&
              fromTop <= (fromRight <= 4 ? 3 : 2);
        const tulipBlHeight = fromLeft <= 4 ? 2 : fromLeft <= 11 ? 1 : 0;
        const inBottomLeft =
          kind === "insights"
            ? false
            : kind === "tulip"
            ? fromLeft <= tulipBlWidth &&
              fromBottom >= tulipBlLift &&
              fromBottom <= tulipBlLift + tulipBlHeight
            : fromLeft <= blExtent &&
              fromBottom <= blExtent &&
              bottomLeft <= blRadius;

        if (!inTopRight && !inBottomLeft) {
          continue;
        }
      }

      let keep = Math.max(0, 0.9 - edge * 2.4);

      if (isCorners) {
        const bottomLeft = Math.hypot(fromLeft, fromBottom);
        const inTopRight = fromRight <= trWidth && fromTop <= 3;
        keep = inTopRight
          ? Math.max(0.34, 0.94 - (fromRight / trWidth) * 0.5)
          : kind === "tulip"
            ? Math.max(0.3, 0.92 - (fromLeft / tulipBlWidth) * 0.45)
            : Math.max(0.28, 0.96 - (bottomLeft / blRadius) * 0.5);
      }

      if (noise(col * 0.5 + 13.7, row * 0.5 + 7.3) > keep) {
        continue;
      }

      let colorIndex = Math.floor(
        noise(col * 0.33 + 31.1, row * 0.33 + 17.9) * PALETTE.length,
      );
      colorIndex = Math.max(0, Math.min(PALETTE.length - 1, colorIndex));
      if (hash(col + 77, row + 91) < 0.15) {
        colorIndex = Math.floor(hash(col + 3, row + 5) * PALETTE.length);
      }

      cells.push({
        x: col * CELL + CELL / 2,
        y: row * CELL + CELL / 2,
        col,
        row,
        color: PALETTE[colorIndex] ?? tokens.bitmap.mid,
        alpha: 0.35 * (0.8 + hash(col + 11, row + 23) * 0.4),
        icon: null,
        rotation: 0,
      });
    }
  }

  if (kind === "sides") {
    const chevronRow = Math.max(1, Math.floor(rows * 0.22));
    placeIcon(cells, "chevrons", 0, 0, chevronRow, (cell) => cell.col <= 1);
    placeIcon(
      cells,
      "chevrons",
      Math.PI,
      cols - 1,
      chevronRow,
      (cell) => cell.col >= cols - 2,
    );
    return cells;
  }

  if (isCorners) {
    if (kind === "insights") {
      return cells;
    }

    const flowers =
      kind === "tulip"
        ? ([
            [2, rows - 1 - tulipBlLift],
            [10, rows - 1 - tulipBlLift],
            [18, rows - 2 - tulipBlLift],
          ] as const)
        : ([
            [2, rows - 3],
            [5, rows - 2],
            [4, rows - 5],
          ] as const);

    for (const [col, row] of flowers) {
      const cell = ensureCell(cells, col, row);
      cell.icon = "flower";
      cell.rotation = 0;
    }
    return cells;
  }

  return cells;
}

/**
 * Home hero frame — exact `C()` + `w()` from the live OllyGarden reference.
 * Uses JS `n * k | 0` hashing (not Math.imul) so the cell field matches.
 */
function frameHash(x: number, y: number) {
  let n = (x * 374761393 + y * 668265263) | 0;
  n = ((n ^ (n >>> 13)) * 1274126177) | 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function frameNoise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = frameHash(x0, y0);
  const b = frameHash(x0 + 1, y0);
  const c = frameHash(x0, y0 + 1);
  const d = frameHash(x0 + 1, y0 + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

const FRAME_PALETTE = (
  [
    ["#D9E533", 3],
    ["#CDDC29", 2],
    ["#E3E270", 2],
    ["#EFF2C0", 1],
    ["#A7B93B", 2],
    ["#6A7A2A", 2],
    ["#3F5A21", 2],
    ["#2A4418", 1],
  ] as const
).flatMap(([color, weight]) => Array.from({ length: weight }, () => color));

const FRAME_ICONS: readonly { icon: MotifIcon; rotation: number }[] = [
  { icon: "chevrons", rotation: 0 },
  { icon: "flower", rotation: 0 },
  { icon: "chevrons", rotation: Math.PI },
];

const FRAME_ALPHA = 0.35;
const FRAME_ICON_GAP_SQ = 36864;

export function buildFrame(width: number, height: number): MotifCell[] {
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const radius = Math.min(cols, rows) / 2;
  const cells: MotifCell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const edge =
        Math.min(col, row, cols - 1 - col, rows - 1 - row) / radius;
      let keep = Math.max(0, 0.9 - edge * 2.4);

      if (frameHash(col, 9999) < 0.5) {
        const extra = 1 + Math.floor(frameHash(col, 555) * 3);
        if (row >= rows - extra) {
          keep = Math.max(keep, 0.95);
        }
      }

      if (frameNoise(col * 0.5 + 13.7, row * 0.5 + 7.3) > keep) {
        continue;
      }

      let colorIndex = Math.floor(
        frameNoise(col * 0.33 + 31.1, row * 0.33 + 17.9) * FRAME_PALETTE.length,
      );
      colorIndex = Math.max(0, Math.min(FRAME_PALETTE.length - 1, colorIndex));
      if (frameHash(col + 77, row + 91) < 0.15) {
        colorIndex = Math.floor(
          frameHash(col + 3, row + 5) * FRAME_PALETTE.length,
        );
      }

      cells.push({
        x: col * CELL + CELL / 2,
        y: row * CELL + CELL / 2,
        col,
        row,
        color: FRAME_PALETTE[colorIndex] ?? "#A7B93B",
        alpha: FRAME_ALPHA * (0.8 + frameHash(col + 11, row + 23) * 0.4),
        icon: null,
        rotation: 0,
      });
    }
  }

  const placed: { x: number; y: number }[] = [];
  for (const cell of cells) {
    if (frameHash(cell.col + 201, cell.row + 417) >= 0.05) {
      continue;
    }
    const tooClose = placed.some((origin) => {
      const dx = cell.x - origin.x;
      const dy = cell.y - origin.y;
      return dx * dx + dy * dy < FRAME_ICON_GAP_SQ;
    });
    if (tooClose) {
      continue;
    }
    const pick = frameHash(cell.col + 57, cell.row + 131);
    const choice =
      FRAME_ICONS[
        Math.min(FRAME_ICONS.length - 1, Math.floor(pick * FRAME_ICONS.length))
      ];
    if (!choice) {
      continue;
    }
    // Extra-dense bottom rows already read as a solid band; chevrons there
    // stack into a row of arrows. Keep flowers, skip the chevrons.
    if (choice.icon === "chevrons" && cell.row >= rows - 4) {
      continue;
    }
    cell.icon = choice.icon;
    cell.rotation = choice.rotation;
    placed.push({ x: cell.x, y: cell.y });
  }

  return cells;
}

export function buildSides(width: number, height: number): MotifCell[] {
  return buildMotif(width, height, "sides");
}

/**
 * Rose hero corners — exact `O()` from the live OllyGarden reference.
 * Cells scale with viewport (48–96px) and hug the top-right / bottom-left edges.
 */
export function buildCorners(width: number, height: number): MotifCell[] {
  const scale = Math.min(
    2,
    Math.max(1, Math.max(width / 1440, height / 900)),
  );
  const size = Math.round(CELL * scale);
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const trColSpan = Math.max(6, Math.round(cols * 0.45));
  const trRowSpan = Math.max(3, Math.round(rows * 0.32));
  const blColSpan = Math.max(8, Math.round(cols * 0.52));
  const blRowSpan = Math.max(3, Math.round(rows * 0.34));
  const cells: MotifCell[] = [];
  const seeds: { cell: MotifCell; iconSeed: number; iconPick: number }[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const trMetric = (cols - 1 - col) / trColSpan + row / trRowSpan;
      const blMetric = col / blColSpan + (rows - 1 - row) / blRowSpan;
      const inTopRight = trMetric <= blMetric;
      const keep = Math.max(
        0,
        1 - (inTopRight ? trMetric : blMetric) * 0.65,
      );

      if (frameNoise(col * 0.5 + 13.7, row * 0.5 + 7.3) > keep) {
        continue;
      }

      let colorIndex = Math.floor(
        frameNoise(col * 0.33 + 31.1, row * 0.33 + 17.9) *
          FRAME_PALETTE.length,
      );
      colorIndex = Math.max(0, Math.min(FRAME_PALETTE.length - 1, colorIndex));
      if (frameHash(col + 77, row + 91) < 0.15) {
        colorIndex = Math.floor(
          frameHash(col + 3, row + 5) * FRAME_PALETTE.length,
        );
      }

      const cell: MotifCell = {
        x: inTopRight
          ? width - (cols - 1 - col) * size - size / 2
          : col * size + size / 2,
        y: inTopRight
          ? row * size + size / 2
          : height - (rows - 1 - row) * size - size / 2,
        col,
        row,
        color: FRAME_PALETTE[colorIndex] ?? "#A7B93B",
        alpha: FRAME_ALPHA * (0.8 + frameHash(col + 11, row + 23) * 0.4),
        icon: null,
        rotation: 0,
        size,
      };
      cells.push(cell);
      seeds.push({
        cell,
        iconSeed: inTopRight ? 1 : frameHash(col + 201, row + 417),
        iconPick: frameHash(col + 57, row + 131),
      });
    }
  }

  const placed: { x: number; y: number }[] = [];
  const gapSq = (size * 4) ** 2;
  for (const item of seeds) {
    if (item.iconSeed >= 0.05) {
      continue;
    }
    const tooClose = placed.some((origin) => {
      const dx = item.cell.x - origin.x;
      const dy = item.cell.y - origin.y;
      return dx * dx + dy * dy < gapSq;
    });
    if (tooClose) {
      continue;
    }
    const choice =
      FRAME_ICONS[
        Math.min(
          FRAME_ICONS.length - 1,
          Math.floor(item.iconPick * FRAME_ICONS.length),
        )
      ];
    if (!choice) {
      continue;
    }
    item.cell.icon = choice.icon;
    item.cell.rotation = choice.rotation;
    placed.push({ x: item.cell.x, y: item.cell.y });
  }

  return cells;
}

export function buildInsights(width: number, height: number): MotifCell[] {
  return buildMotif(width, height, "insights");
}

/**
 * Tulip hero — exact authored grids from the live OllyGarden reference (`o` + `s`).
 */
export function buildTulip(width: number, height: number): MotifCell[] {
  const designWidth = 1440;
  const scale =
    width <= designWidth
      ? Math.min(1, Math.max(0.5, width / designWidth))
      : Math.min(2, Math.max(1, Math.min(width / designWidth, height / 900)));

  type TulipSpec = readonly [number, number, string, 0 | 1];
  type TulipGrid = {
    pitch: number;
    cols: number;
    rows: number;
    cells: readonly TulipSpec[];
    w?: number;
    yOff?: number;
    xOff?: number;
    alpha: number;
  };

  const tr: TulipGrid = {
    pitch: 46.3,
    w: 400.6,
    yOff: -7,
    cols: 9,
    rows: 4,
    alpha: 1,
    cells: [
      [0, 0, "#34520B", 0],
      [1, 0, "#D1D100", 0],
      [3, 0, "#34520B", 0],
      [6, 0, "#9CA703", 0],
      [2, 1, "#9CA703", 1],
      [4, 1, "#D1D100", 0],
      [6, 1, "#D1D100", 0],
      [5, 2, "#9CA703", 1],
      [7, 2, "#D1D100", 0],
      [8, 2, "#9CA703", 1],
      [5, 3, "#9CA703", 0],
    ],
  };

  const bl: TulipGrid = {
    pitch: 46.3,
    xOff: -17.5,
    cols: 15,
    rows: 4,
    alpha: 0.7,
    cells: [
      [13, 0, "#2F4E0B", 0],
      [14, 1, "#E3E270", 0],
      [13, 1, "#D1D100", 0],
      [11, 1, "#D1D100", 0],
      [10, 1, "#9CA703", 0],
      [4, 1, "#D1D100", 0],
      [1, 2, "#9CA703", 0],
      [2, 2, "#9CA703", 1],
      [4, 2, "#9CA703", 0],
      [6, 2, "#34520B", 0],
      [7, 2, "#9CA703", 1],
      [8, 2, "#D1D100", 0],
      [10, 2, "#D1D100", 0],
      [11, 2, "#9CA703", 1],
      [12, 2, "#D1D100", 0],
      [0, 3, "#D1D100", 0],
      [2, 3, "#D1D100", 0],
      [4, 3, "#D1D100", 0],
      [5, 3, "#E3E270", 0],
      [7, 3, "#D1D100", 0],
      [9, 3, "#34520B", 0],
      [13, 3, "#9CA703", 0],
    ],
  };

  const cells: MotifCell[] = [];

  function place(grid: TulipGrid, anchor: "tr" | "bl") {
    const xs: number[] = [];
    const ys: number[] = [];

    if (anchor === "tr") {
      const origin = width - (grid.w ?? 0) * scale;
      for (let col = 0; col <= grid.cols; col++) {
        xs.push(Math.round(origin + col * grid.pitch * scale));
      }
      for (let row = 0; row <= grid.rows; row++) {
        ys.push(Math.round(((grid.yOff ?? 0) + row * grid.pitch) * scale));
      }
    } else {
      const span = grid.rows * grid.pitch;
      for (let col = 0; col <= grid.cols; col++) {
        xs.push(Math.round(((grid.xOff ?? 0) + col * grid.pitch) * scale));
      }
      for (let row = 0; row <= grid.rows; row++) {
        ys.push(Math.round(height - (span - row * grid.pitch) * scale));
      }
    }

    grid.cells.forEach(([col, row, color, iconFlag], index) => {
      const x0 = xs[col];
      const x1 = xs[col + 1];
      const y0 = ys[row];
      const y1 = ys[row + 1];
      if (x0 == null || x1 == null || y0 == null || y1 == null) {
        return;
      }
      const size = x1 - x0;
      cells.push({
        x: (x0 + x1) / 2,
        y: (y0 + y1) / 2,
        col,
        row,
        color,
        alpha:
          0.35 *
          (0.85 + frameHash(index * 7 + 3, index * 13 + 1) * 0.3) *
          grid.alpha,
        icon: iconFlag ? "flower" : null,
        rotation: 0,
        size,
      });
    });
  }

  place(tr, "tr");
  place(bl, "bl");
  return cells;
}

/** Lead form motif — exact grids from the live OllyGarden reference (`m` + `h`). */
export function buildLead(width: number, height: number): MotifCell[] {
  const pitch = 56.915;
  const designWidth = 1440;
  const scale = Math.min(1, Math.max(0.5, width / designWidth));
  const mobile = width < 768;
  const cells: MotifCell[] = [];

  type LeadIcon = "f0" | "f90" | "f270" | "chevl" | "chevr" | "sprout" | 0;
  type LeadSpec = readonly [number, number, string, number, LeadIcon];

  // Bottom-left cluster (anchored bottom-left)
  const bl: {
    pitch: number;
    cols: number;
    rows: number;
    cells: readonly LeadSpec[];
  } = {
    pitch,
    cols: 15,
    rows: 9,
    cells: [
      [0, 8, "#34520B", 0.3, 0],
      [1, 7, "#E3E270", 0.3, 0],
      [1, 8, "#9CA703", 0.3, 0],
      [2, 6, "#D1D100", 0.3, 0],
      [2, 7, "#D1D100", 0.3, 0],
      [3, 6, "#D1D100", 0.06, 0],
      [4, 6, "#D1D100", 0.3, 0],
      [5, 6, "#34520B", 0.3, 0],
      [6, 5, "#D1D100", 0.15, 0],
      [6, 6, "#D1D100", 0.3, 0],
      [7, 6, "#D1D100", 0.21, 0],
      [7, 7, "#9CA703", 0.3, 0],
      [8, 5, "#D1D100", 0.3, 0],
      [8, 6, "#D1D100", 0.3, 0],
      [8, 7, "#E3E270", 0.3, 0],
      [9, 3, "#D1D100", 0.3, 0],
      [9, 4, "#D1D100", 0.15, 0],
      [9, 8, "#D1D100", 0.3, 0],
      [10, 2, "#D1D100", 0.15, 0],
      [10, 6, "#D1D100", 0.3, 0],
      [10, 7, "#00280E", 0.3, 0],
      [11, 1, "#E3E270", 0.3, 0],
      [11, 8, "#D1D100", 0.3, 0],
      [12, 2, "#9CA703", 0.3, 0],
      [12, 7, "#D1D100", 0.3, 0],
      [13, 0, "#9CA703", 0.3, 0],
      [13, 1, "#9CA703", 0.3, 0],
      [13, 6, "#D1D100", 0.3, 0],
      [13, 7, "#D1D100", 0.3, 0],
      [13, 8, "#D1D100", 0.3, 0],
      [14, 5, "#9CA703", 0.3, 0],
      [14, 8, "#00280E", 0.3, 0],
      [12, 1, "#9CA703", 0.3, "f0"],
      [13, 5, "#9CA703", 0.3, "f270"],
      [9, 5, "#FAF9F0", 0.06, "chevl"],
      [1, 6, "#FAF9F0", 0.06, "sprout"],
      [0, 7, "#FAF9F0", 0.06, "sprout"],
    ],
  };

  // Top-right cluster around the form card (desktop only)
  const tr: {
    pitch: number;
    cols: number;
    rows: number;
    cells: readonly LeadSpec[];
  } = {
    pitch,
    cols: 9,
    rows: 7,
    cells: [
      [0, 3, "#9CA703", 0.3, 0],
      [0, 5, "#D1D100", 0.3, 0],
      [0, 6, "#00280E", 0.3, 0],
      [1, 4, "#D1D100", 0.3, 0],
      [1, 5, "#D1D100", 0.3, 0],
      [1, 6, "#D1D100", 0.3, 0],
      [2, 0, "#9CA703", 0.3, 0],
      [2, 5, "#D1D100", 0.3, 0],
      [3, 6, "#D1D100", 0.3, 0],
      [4, 0, "#D1D100", 0.15, 0],
      [4, 4, "#D1D100", 0.3, 0],
      [4, 5, "#00280E", 0.3, 0],
      [5, 1, "#D1D100", 0.3, 0],
      [5, 2, "#D1D100", 0.15, 0],
      [5, 6, "#D1D100", 0.3, 0],
      [6, 3, "#D1D100", 0.3, 0],
      [6, 4, "#D1D100", 0.3, 0],
      [6, 5, "#E3E270", 0.3, 0],
      [7, 4, "#D1D100", 0.21, 0],
      [7, 5, "#9CA703", 0.3, 0],
      [8, 3, "#D1D100", 0.15, 0],
      [8, 4, "#D1D100", 0.3, 0],
      [1, 3, "#9CA703", 0.3, "f90"],
      [5, 3, "#FAF9F0", 0.06, "chevr"],
    ],
  };

  function iconFrom(spec: LeadIcon): { icon: MotifIcon | null; rotation: number } {
    if (spec === 0) {
      return { icon: null, rotation: 0 };
    }
    if (spec === "sprout") {
      return { icon: "sprout", rotation: 0 };
    }
    if (spec === "chevl") {
      return { icon: "chevrons", rotation: Math.PI };
    }
    if (spec === "chevr") {
      return { icon: "chevrons", rotation: 0 };
    }
    if (spec === "f90") {
      return { icon: "flower", rotation: Math.PI / 2 };
    }
    if (spec === "f270") {
      return { icon: "flower", rotation: (Math.PI * 3) / 2 };
    }
    return { icon: "flower", rotation: 0 };
  }

  function place(
    grid: { pitch: number; cols: number; rows: number; cells: readonly LeadSpec[] },
    anchor: "bl" | "tr",
  ) {
    const xs: number[] = [];
    const ys: number[] = [];
    const span = grid.cols * grid.pitch;

    for (let col = 0; col <= grid.cols; col++) {
      xs.push(
        anchor === "bl"
          ? Math.round(col * grid.pitch * scale)
          : Math.round(width - (span - col * grid.pitch) * scale),
      );
    }
    for (let row = 0; row <= grid.rows; row++) {
      ys.push(
        anchor === "bl"
          ? Math.round(height - (grid.rows * grid.pitch - row * grid.pitch) * scale)
          : Math.round(row * grid.pitch * scale),
      );
    }

    const size = Math.max(24, Math.round(grid.pitch * scale));

    for (const [col, row, color, alpha, iconSpec] of grid.cells) {
      const x0 = xs[col];
      const x1 = xs[col + 1];
      const y0 = ys[row];
      const y1 = ys[row + 1];
      if (x0 == null || x1 == null || y0 == null || y1 == null) {
        continue;
      }
      const { icon, rotation } = iconFrom(iconSpec);
      cells.push({
        x: (x0 + x1) / 2,
        y: (y0 + y1) / 2,
        col,
        row,
        color,
        alpha,
        icon,
        rotation,
        size,
      });
    }
  }

  place(bl, "bl");
  if (!mobile) {
    place(tr, "tr");
  }

  return cells;
}
