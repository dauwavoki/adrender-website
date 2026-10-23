/**
 * Deterministic low-poly triangle mesh for the homepage hero.
 * Jittered grid → Delaunay triangles → public/hero-mesh.svg.
 * Run: node scripts/generate-hero-mesh.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../public/hero-mesh.svg')

const WIDTH = 2800
const HEIGHT = 1200
const SEED = 0xa11d23e8

function mulberry32(seed) {
  let state = seed >>> 0
  return function rand() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function circumcircle(a, b, c) {
  const ax = a[0]
  const ay = a[1]
  const bx = b[0]
  const by = b[1]
  const cx = c[0]
  const cy = c[1]
  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
  if (Math.abs(d) < 1e-8) return null
  const ax2 = ax * ax + ay * ay
  const bx2 = bx * bx + by * by
  const cx2 = cx * cx + cy * cy
  const ux = (ax2 * (by - cy) + bx2 * (cy - ay) + cx2 * (ay - by)) / d
  const uy = (ax2 * (cx - bx) + bx2 * (ax - cx) + cx2 * (bx - ax)) / d
  return { x: ux, y: uy, r: Math.hypot(ux - ax, uy - ay) }
}

function edgeKey(a, b) {
  const ka = `${a[0]},${a[1]}`
  const kb = `${b[0]},${b[1]}`
  return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
}

/** Bowyer–Watson Delaunay. Returns triangles as point triples. */
function delaunay(points) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const [x, y] of points) {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  const dx = maxX - minX || 1
  const dy = maxY - minY || 1
  const delta = Math.max(dx, dy) * 20
  const s0 = [minX - delta, minY - delta]
  const s1 = [minX + dx / 2, maxY + delta]
  const s2 = [maxX + delta, minY - delta]
  const superVerts = new Set([s0, s1, s2])

  /** @type {[number, number][][]} */
  let triangles = [[s0, s1, s2]]

  for (const p of points) {
    const bad = []
    for (const t of triangles) {
      const cc = circumcircle(t[0], t[1], t[2])
      if (!cc) continue
      if (Math.hypot(p[0] - cc.x, p[1] - cc.y) <= cc.r + 1e-6) bad.push(t)
    }

    /** @type {Map<string, [number, number][]>} */
    const edgeCount = new Map()
    /** @type {[number, number][][]} */
    const edges = []
    for (const t of bad) {
      const triEdges = [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
      ]
      for (const edge of triEdges) {
        edges.push(edge)
        const key = edgeKey(edge[0], edge[1])
        edgeCount.set(key, (edgeCount.get(key) ?? 0) + 1)
      }
    }

    const badSet = new Set(bad)
    triangles = triangles.filter((t) => !badSet.has(t))
    for (const [a, b] of edges) {
      if (edgeCount.get(edgeKey(a, b)) === 1) triangles.push([a, b, p])
    }
  }

  return triangles.filter((t) => t.every((v) => !superVerts.has(v)))
}

function buildPoints() {
  const rand = mulberry32(SEED)
  const cols = 34
  const rows = 15
  const cellW = WIDTH / cols
  const cellH = HEIGHT / rows
  /** @type {[number, number][]} */
  const points = []

  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      const edge = x === 0 || y === 0 || x === cols || y === rows
      // Drop some interior points so triangle size varies.
      if (!edge && rand() < 0.22) continue
      const jx = edge ? 0 : (rand() - 0.5) * cellW * 0.92
      const jy = edge ? 0 : (rand() - 0.5) * cellH * 0.92
      points.push([x * cellW + jx, y * cellH + jy])
    }
  }

  // Extra points in a few clusters for smaller triangles, like the logo mesh.
  const clusters = [
    [WIDTH * 0.22, HEIGHT * 0.28],
    [WIDTH * 0.58, HEIGHT * 0.18],
    [WIDTH * 0.78, HEIGHT * 0.42],
    [WIDTH * 0.4, HEIGHT * 0.62],
  ]
  for (const [cx, cy] of clusters) {
    for (let i = 0; i < 18; i++) {
      points.push([cx + (rand() - 0.5) * cellW * 3.2, cy + (rand() - 0.5) * cellH * 2.6])
    }
  }

  return points
}

function area(a, b, c) {
  return Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2
}

const points = buildPoints()
const triangles = delaunay(points).filter((t) => area(t[0], t[1], t[2]) > 8)

if (triangles.length < 100) {
  throw new Error(`hero mesh too sparse (${triangles.length} triangles)`)
}

const d = triangles
  .map(([a, b, c]) => {
    const fmt = (n) => n.toFixed(1)
    return `M${fmt(a[0])} ${fmt(a[1])}L${fmt(b[0])} ${fmt(b[1])}L${fmt(c[0])} ${fmt(c[1])}Z`
  })
  .join('')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" aria-hidden="true">
  <path d="${d}" stroke="#3FE0E8" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round" />
</svg>
`

fs.writeFileSync(OUT, svg)
console.log(`[hero-mesh] ${triangles.length} triangles, ${points.length} points → ${OUT}`)
