// The real 3D AdRender logo (geometry exported from the logo pack's beam3d.py), drawn on a 2D canvas.
// Faces are split into small triangles and painted back to front; each triangle gets a solid colour
// (brand gradient across the logo, times a single key light), plus the logo's fine white edge lines.
(function () {
  const PAL = [[0x4F, 0x8D, 0xF7], [0x9B, 0x6B, 0xF2], [0xFF, 0x8A, 0x3D]];
  let TRIS = null;
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], len = v => Math.hypot(v[0], v[1], v[2]);
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  // split a triangle until its edges are short; keep which edges lie on the original face boundary
  function split(t, e, out, maxLen) {
    const [a, b, c] = t, la = len(sub(b, a)), lb = len(sub(c, b)), lc = len(sub(a, c));
    const m = Math.max(la, lb, lc);
    if (m <= maxLen) { out.push({ v: t, e }); return; }
    if (m === la) { const p = mid(a, b); split([a, p, c], [e[0], false, e[2]], out, maxLen); split([p, b, c], [e[0], e[1], false], out, maxLen); }
    else if (m === lb) { const p = mid(b, c); split([a, b, p], [e[0], e[1], false], out, maxLen); split([a, p, c], [false, e[1], e[2]], out, maxLen); }
    else { const p = mid(c, a); split([a, b, p], [e[0], false, e[2]], out, maxLen); split([p, b, c], [false, e[1], e[2]], out, maxLen); }
  }
  async function load(url) {
    const faces = await (await fetch(url)).json(); TRIS = [];
    faces.forEach(f => {
      if (f.tag === 'end') return;   // the crossbar's end sits inside the right leg
      const P = f.p;
      for (let i = 1; i < P.length - 1; i++) {
        const edges = [i === 1, false, i === P.length - 2];   // fan: edge0 = P0-Pi, edge1 = Pi-Pi+1 (always boundary), edge2 = Pi+1-P0
        split([P[0], P[i], P[i + 1]], [i === 1, true, i === P.length - 2], TRIS, 0.085);
        void edges;
      }
      TRIS.forEach(t => { if (!t.n) t.n = f.n; });
    });
  }
  function rotM(yaw, pitch, roll) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
    const Ry = [[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]], Rx = [[1, 0, 0], [0, cp, -sp], [0, sp, cp]], Rz = [[cr, -sr, 0], [sr, cr, 0], [0, 0, 1]];
    const mul = (A, B) => A.map((r, i) => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
    return mul(Rz, mul(Rx, Ry));
  }
  const ap = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2], M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2], M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2]];
  function pal(t) { t = Math.max(0, Math.min(1, t)); const k = t < 0.5 ? t * 2 : (t - 0.5) * 2, a = t < 0.5 ? PAL[0] : PAL[1], b = t < 0.5 ? PAL[1] : PAL[2]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }
  // o: {cx, cy, size (screen px for logo height), yaw, pitch, roll, light:[x,y,z], amb, key, lines (0..1), persp (camera distance in logo units), rim}
  function draw(g, o) {
    if (!TRIS) return;
    const M = rotM(o.yaw || 0, o.pitch || 0, o.roll || 0), D = o.persp || 7, sc = o.size / 2.45;
    const L = o.light || [-0.5, 0.7, 0.9], ll = Math.hypot(...L), Ln = L.map(v => v / ll);
    const items = [];
    let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
    for (const t of TRIS) {
      const n = ap(M, t.n); if (n[2] <= 0.002) continue;
      const pts = t.v.map(v => { const p = ap(M, v), f = D / (D - p[2]); return [o.cx + p[0] * sc * f, o.cy - p[1] * sc * f, p[2]]; });
      for (const p of pts) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); }
      items.push({ pts, n, z: (pts[0][2] + pts[1][2] + pts[2][2]) / 3, e: t.e });
    }
    items.sort((a, b) => a.z - b.z);
    const w = maxx - minx || 1, h = maxy - miny || 1, amb = o.amb ?? 0.55, key = o.key ?? 0.45;
    g.save(); g.lineJoin = 'round';
    for (const it of items) {
      const [a, b, c] = it.pts, cx = (a[0] + b[0] + c[0]) / 3, cy = (a[1] + b[1] + c[1]) / 3;
      const lam = Math.max(0, it.n[0] * Ln[0] + it.n[1] * Ln[1] + it.n[2] * Ln[2]);
      const spec = Math.pow(lam, 24) * (o.spec ?? 0.35);
      const k = amb + key * lam, col = pal(0.55 * (cx - minx) / w + 0.45 * (cy - miny) / h);
      const rgb = col.map(v => Math.min(255, Math.round(v * k + 255 * spec)));
      const fill = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.lineTo(c[0], c[1]); g.closePath();
      g.fillStyle = fill; g.strokeStyle = fill; g.lineWidth = 1.2; g.fill(); g.stroke();
      if (o.lines) {
        g.strokeStyle = `rgba(255,255,255,${0.65 * o.lines})`; g.lineWidth = Math.max(1, o.size * 0.004);
        const E = [[a, b], [b, c], [c, a]];
        it.e.forEach((on, i) => { if (on) { g.beginPath(); g.moveTo(E[i][0][0], E[i][0][1]); g.lineTo(E[i][1][0], E[i][1][1]); g.stroke(); } });
      }
    }
    g.restore();
    return { minx, maxx, miny, maxy };
  }
  window.Logo3D = { load, draw };
})();
