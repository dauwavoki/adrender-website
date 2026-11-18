// Copied from the app repo (adrender/src/components/cockpit/flapShape.ts). Keep in sync if the cockpit tab shape changes.
/**
 * Cockpit tab geometry. Every corner is one tangent-continuous curve.
 *
 * Convex corners (a tab's top edge into its side, the strip ends, the chevron
 * square) are radius-10 arcs. Concave joins (a slanted or straight side into
 * the card's top edge) are radius-10 arcs too, so a tab flows into the card.
 * Arc start and end points come from the real angle between the two lines
 * (tangent length = r * tan(turn / 2)), so each arc touches both lines
 * exactly and never overshoots, reverses or leaves a notch.
 *
 * The fill and the stroke of a shape are the same path: a fill is its stroke
 * path plus a 1px tuck under the card.
 *
 * Coordinates are stroke centerlines, inset half a pixel so a 1px stroke lands
 * on whole device pixels. The card's left, right and bottom edges are a CSS
 * border; the frame owns the top edge, the strips and the selected tab. The two
 * meet at the card's top corners, (0.5, seam) and (W - 0.5, seam).
 *
 * Keep TAB_SLANT in sync with --ps-tab-slant in src/index.css.
 */
export const TAB_SLANT = 7;
export const TAB_RADIUS = 10;
export const CARD_RADIUS = TAB_RADIUS;

export type TabKind = "tab" | "min";
export type StripSide = "left" | "right";

export type TabBox = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: TabKind;
  selected: boolean;
  ready: boolean;
};

export type FrameInput = {
  width: number;
  height: number;
  /** Y where the strips meet the card. */
  seam: number;
  left: TabBox[];
  right: TabBox[];
};

export type FramePaths = {
  leftFill: string;
  rightFill: string;
  selected: string[];
  /** Open stroke: left edge of the left strip, over both strips, down the right edge of the right strip. */
  outline: string;
  /** Closed silhouette of the card and both strips, for the shadow. */
  silhouette: string;
  /** Selected-tab strokes, strip dividers and the chevron divider. */
  details: string[];
};

type Pt = { x: number; y: number };

/** Half the stroke width. */
const HALF = 0.5;
/** How far a trace extends past a flare so the flare has room to round. */
const REACH = 60;
const TUCK = 1;

function n(value: number): string {
  return (Math.round(value * 100) / 100).toString();
}

function tabsOf(slots: TabBox[]): TabBox[] {
  return slots.filter((slot) => slot.kind === "tab" && slot.w > 0);
}

function slantOf(width: number): number {
  return Math.min(TAB_SLANT, Math.max(0, width / 3));
}

function sub(a: Pt, b: Pt): Pt {
  return { x: a.x - b.x, y: a.y - b.y };
}

function len(a: Pt): number {
  return Math.hypot(a.x, a.y);
}

function unit(a: Pt): Pt {
  const length = len(a);
  if (length < 1e-9) return { x: 0, y: 0 };
  return { x: a.x / length, y: a.y / length };
}

export type Fillet = {
  start: Pt;
  end: Pt;
  radius: number;
  /** 1 is clockwise in SVG's y-down space. */
  sweep: 0 | 1;
};

/**
 * Round the corner at `curr` on the way from `prev` to `next`. The arc is
 * tangent to both lines. Its tangent length is r * tan(turn / 2), where turn is
 * the real change of direction, so it works for any slant angle, convex or concave.
 */
export function fillet(prev: Pt, curr: Pt, next: Pt, radius: number): Fillet {
  const into = unit(sub(curr, prev));
  const out = unit(sub(next, curr));
  const cross = into.x * out.y - into.y * out.x;
  const dot = into.x * out.x + into.y * out.y;
  const turn = Math.atan2(Math.abs(cross), dot);
  if (radius <= 0.05 || turn < 1e-3 || Math.PI - turn < 1e-3) {
    return { start: curr, end: curr, radius: 0, sweep: 1 };
  }
  const tanHalf = Math.tan(turn / 2);
  let used = radius;
  let tangent = used * tanHalf;
  const room = Math.min(len(sub(curr, prev)), len(sub(next, curr))) * 0.5;
  if (tangent > room) {
    tangent = room;
    used = tangent / tanHalf;
  }
  return {
    start: { x: curr.x - into.x * tangent, y: curr.y - into.y * tangent },
    end: { x: curr.x + out.x * tangent, y: curr.y + out.y * tangent },
    radius: used,
    sweep: cross > 0 ? 1 : 0,
  };
}

type Trace = { d: string; start: Pt; end: Pt };

/**
 * Open path through `points`, rounding each interior vertex by its radius. The
 * first and last points are the path's ends. With `trimStart` / `trimEnd` the
 * path instead begins / ends where the first / last arc meets its outer line,
 * so the end point and the first / last point need not be real positions.
 */
function trace(points: Pt[], radii: number[], trimStart = false, trimEnd = false): Trace {
  const last = points.length - 1;
  const curves: Array<Fillet | null> = points.map((point, index) =>
    index === 0 || index === last ? null : fillet(points[index - 1], point, points[index + 1], radii[index] ?? 0),
  );
  const first = trimStart && curves[1] ? curves[1].start : points[0];
  const parts: string[] = [`M ${n(first.x)} ${n(first.y)}`];
  let end = points[last];
  for (let index = 1; index < last; index++) {
    const curve = curves[index];
    if (!curve) continue;
    if (!(index === 1 && trimStart)) parts.push(`L ${n(curve.start.x)} ${n(curve.start.y)}`);
    if (curve.radius > 0) {
      parts.push(`A ${n(curve.radius)} ${n(curve.radius)} 0 0 ${curve.sweep} ${n(curve.end.x)} ${n(curve.end.y)}`);
    }
    if (index === last - 1 && trimEnd) end = curve.end;
  }
  if (!(trimEnd && curves[last - 1])) parts.push(`L ${n(points[last].x)} ${n(points[last].y)}`);
  return { d: parts.join(" "), start: first, end };
}

/** A trace plus a straight tuck under the card edge. The stroke path is a prefix of it. */
function closeUnder(shape: Trace, yBelow: number): string {
  return `${shape.d} L ${n(shape.end.x)} ${n(yBelow)} L ${n(shape.start.x)} ${n(yBelow)} Z`;
}

type Frame = { xL: number; xR: number; yT: number; yS: number; r: number };

type Placed = Trace & { selected: boolean };

/**
 * One tab, a trapezoid: both sides slant outward toward the bottom. Its top
 * corners are convex. Each bottom join is a concave flare into the card edge.
 * A side that sits on the card's own left or right edge (Image) runs straight
 * down into the card's border instead.
 */
function tabTrace(tab: TabBox, frame: Frame, width: number): Trace {
  const { xL, xR, yT, yS, r } = frame;
  const s = slantOf(tab.w);
  const right = tab.x + tab.w;
  const flushLeft = tab.x <= HALF * 3;
  const flushRight = right >= width - HALF * 3;
  const points: Pt[] = [];
  const radii: number[] = [];
  if (flushLeft) {
    points.push({ x: xL, y: yS }, { x: xL, y: yT });
    radii.push(0, r);
  } else {
    points.push({ x: tab.x - REACH, y: yS }, { x: tab.x, y: yS }, { x: tab.x + s, y: yT });
    radii.push(0, r, r);
  }
  if (flushRight) {
    points.push({ x: xR, y: yT }, { x: xR, y: yS });
    radii.push(r, 0);
  } else {
    points.push({ x: right - s, y: yT }, { x: right, y: yS }, { x: right + REACH, y: yS });
    radii.push(r, r, 0);
  }
  return trace(points, radii, !flushLeft, !flushRight);
}

/**
 * Outline of one tab in its own box, for the ready ring's mask. Top corners
 * are the same radius-10 arcs; it is open along the bottom because a selected
 * tab opens into the card.
 */
export function localTabPath(width: number, height: number, side: StripSide, outerCorner = false): string {
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  const s = slantOf(w);
  const inset = 0.75;
  const r = Math.min(TAB_RADIUS, h / 2, w / 4);
  const straightLeft = side === "left" && outerCorner;
  return trace(
    [
      straightLeft ? { x: inset, y: h } : { x: 0, y: h },
      straightLeft ? { x: inset, y: inset } : { x: s, y: inset },
      { x: w - s, y: inset },
      { x: w, y: h },
    ],
    [0, r, r, 0],
  ).d;
}

/** Pieces of [start, end] that are not inside any gap. */
function cut(start: number, end: number, gaps: Array<[number, number]>): Array<[number, number]> {
  if (end - start < 0.5) return [];
  const blocks = gaps
    .map(([a, b]) => [Math.max(a, start), Math.min(b, end)] as [number, number])
    .filter(([a, b]) => b - a > 0.5)
    .sort((a, b) => a[0] - b[0]);
  const out: Array<[number, number]> = [];
  let cursor = start;
  for (const [a, b] of blocks) {
    if (a > cursor + 0.5) out.push([cursor, a]);
    cursor = Math.max(cursor, b);
  }
  if (end > cursor + 0.5) out.push([cursor, end]);
  return out;
}

function line(x1: number, y1: number, x2: number, y2: number): string {
  return `M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}`;
}

export function buildFrame(input: FrameInput): FramePaths {
  const empty: FramePaths = { leftFill: "", rightFill: "", selected: [], outline: "", silhouette: "", details: [] };
  const { width: W, height: H, seam } = input;
  if (W < 8 || H < seam + 8 || seam < 8) return empty;
  const leftTabs = tabsOf(input.left);
  const rightTabs = tabsOf(input.right);
  const lastLeft = leftTabs[leftTabs.length - 1];
  const firstRight = rightTabs[0];
  const chevron = input.right.find((slot) => slot.kind === "min");
  if (!lastLeft || !firstRight) return empty;

  const frame: Frame = {
    xL: HALF,
    xR: W - HALF,
    yT: HALF,
    yS: seam + HALF,
    r: Math.min(TAB_RADIUS, seam / 2, W / 4),
  };
  const { xL, xR, yT, yS, r } = frame;
  const yBelow = yS + TUCK;

  const leftBot = lastLeft.x + lastLeft.w;
  const leftTop = leftBot - slantOf(lastLeft.w);
  const rightBot = firstRight.x;
  const rightTop = rightBot + slantOf(firstRight.w);

  const leftStrip = trace(
    [
      { x: xL, y: yS },
      { x: xL, y: yT },
      { x: leftTop, y: yT },
      { x: leftBot, y: yS },
      { x: leftBot + REACH, y: yS },
    ],
    [0, r, r, r, 0],
    false,
    true,
  );
  const rightStrip = trace(
    [
      { x: rightBot - REACH, y: yS },
      { x: rightBot, y: yS },
      { x: rightTop, y: yT },
      { x: xR, y: yT },
      { x: xR, y: yS },
    ],
    [0, r, r, r, 0],
    true,
    false,
  );

  const outline = trace(
    [
      { x: xL, y: yS },
      { x: xL, y: yT },
      { x: leftTop, y: yT },
      { x: leftBot, y: yS },
      { x: rightBot, y: yS },
      { x: rightTop, y: yT },
      { x: xR, y: yT },
      { x: xR, y: yS },
    ],
    [0, r, r, r, r, r, r, 0],
  );

  const bottom = H - HALF;
  const silhouette = [
    outline.d,
    `L ${n(xR)} ${n(bottom - r)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(xR - r)} ${n(bottom)}`,
    `L ${n(xL + r)} ${n(bottom)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(xL)} ${n(bottom - r)}`,
    "Z",
  ].join(" ");

  const selected: string[] = [];
  const details: string[] = [];
  const placed: Placed[] = [];
  const addSelected = (tab: TabBox) => {
    const shape = tabTrace(tab, frame, W);
    placed.push({ ...shape, selected: true });
    selected.push(closeUnder(shape, yBelow));
    details.push(shape.d);
  };
  for (const tab of leftTabs) if (tab.selected) addSelected(tab);
  for (const tab of rightTabs) if (tab.selected) addSelected(tab);

  const gaps = placed.map((shape) => [shape.start.x, shape.end.x] as [number, number]);
  for (const [a, b] of cut(xL, leftStrip.end.x, gaps)) details.push(line(a, yS, b, yS));
  for (const [a, b] of cut(rightStrip.start.x, xR, gaps)) details.push(line(a, yS, b, yS));
  if (chevron) {
    const ownedBySelected = rightTabs.some((tab) => tab.selected && Math.abs(tab.x + tab.w - chevron.x) < 1);
    const before = rightTabs.find((tab) => Math.abs(tab.x + tab.w - chevron.x) < 1);
    if (!ownedBySelected && before) {
      details.push(line(chevron.x - slantOf(before.w), yT, chevron.x, yS));
    }
  }

  return {
    leftFill: closeUnder(leftStrip, yBelow),
    rightFill: closeUnder(rightStrip, yBelow),
    selected,
    outline: outline.d,
    silhouette,
    details,
  };
}
