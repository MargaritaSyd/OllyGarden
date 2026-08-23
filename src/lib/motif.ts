import { tokens } from "@/lib/tokens";

export const CELL = 48;
export const GLOW_RADIUS = 170;

export type MotifIcon = "flower" | "chevrons";

export type MotifCell = {
  x: number;
  y: number;
  col: number;
  row: number;
  color: string;
  alpha: number;
  icon: MotifIcon | null;
  rotation: number;
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

      if (hash(col, 9999) < 0.5) {
        const extra = 1 + Math.floor(hash(col, 555) * 3);
        if (row >= rows - extra) {
          keep = Math.max(keep, 0.95);
        }
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

  const midRow = Math.floor(rows / 2);
  const belowGap = Math.max(3, Math.floor(rows / 5));
  const aboveGap = belowGap + 2;

  placeIcon(cells, "flower", 0, 0, midRow, (cell) => cell.col === 0);
  placeIcon(
    cells,
    "flower",
    0,
    1,
    midRow - aboveGap,
    (cell) => cell.col === 1,
  );
  placeIcon(
    cells,
    "flower",
    0,
    1,
    midRow + belowGap,
    (cell) => cell.col === 1,
  );

  placeIcon(
    cells,
    "chevrons",
    Math.PI,
    Math.floor(cols / 2),
    0,
    (cell) => cell.row <= 1,
  );
  placeIcon(
    cells,
    "chevrons",
    0,
    cols - 2,
    midRow,
    (cell) => cell.col >= cols - 2,
  );
  const lastRow = rows - 1;
  const aboveRow = rows - 2;
  const midCol = Math.floor(cols / 2);
  const onLast = (cell: MotifCell) => cell.row === lastRow;
  const onAbove = (cell: MotifCell) => cell.row === aboveRow || cell.row === aboveRow - 1;

  placeIcon(cells, "chevrons", Math.PI, midCol, lastRow, onLast);
  placeIcon(cells, "chevrons", 0, Math.floor(cols * 0.32), aboveRow, onAbove);
  placeIcon(cells, "chevrons", 0, Math.floor(cols * 0.62), aboveRow, onAbove);
  placeIcon(cells, "chevrons", 0, Math.floor(cols * 0.82), aboveRow, onAbove);

  return cells;
}