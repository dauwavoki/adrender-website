// Black Friday "pipeline" ad: one continuous rolling scene. Nothing fades in or out: elements only come in and go out
// (slide, scale from a point, flip) and images change state by switching pixels (dither cells, scan lines, decoding).
// Story: winning ads flow across the top -> brand assets pop in the middle -> empty "Your ads" flow along the bottom ->
// the shoe template stops, is scanned in tiny dither, cut into tagged layers, your brand is scanned in ->
// energy runs through the Clone skill into an empty card that decodes into your ad -> every template links to the
// brand assets, which link down to the empty cards, which decode one after another -> the offer -> the logo.
// Config: window.PIPE = { theme: 'violet' | 'blue' | 'orange' | 'tri', intro: false | 'girl' }.
(function () {
  const A = AD, { PHONE, W, H, SCALE, clamp01, lerp, prog, bezier, ctx, mk, begin, IMG, drawCover, words } = A;
  const CFG = window.PIPE || { theme: 'violet' };
  const THEMES = {
    violet: { bg: '#09080F', card: '#13111D', line: '#2B2642', d1: '#9B6BF2', d2: '#CDB8FF', en: '#FF8A3D', ink: '#F4F2FA' },
    blue:   { bg: '#060A15', card: '#0F1626', line: '#20304F', d1: '#4F8DF7', d2: '#B5D0FF', en: '#9B6BF2', ink: '#F1F5FF' },
    orange: { bg: '#0D0806', card: '#1A120D', line: '#3A2A1F', d1: '#FF8A3D', d2: '#FFD0A8', en: '#4F8DF7', ink: '#FFF6EE' },
    tri:    { bg: '#0A0812', card: '#15111F', line: '#2D2645', d1: '#9B6BF2', d2: '#4F8DF7', en: '#FF8A3D', ink: '#F6F2FF' },
  };
  const C = THEMES[CFG.theme] || THEMES.violet;
  const MUTE = C.ink + '99';
  const SIG = bezier(0.2, 0, 0, 1), INOUT = bezier(0.65, 0, 0.35, 1), EXIT = bezier(0.3, 0, 1, 1), POP = bezier(0.34, 1.25, 0.64, 1);
  const P0 = CFG.intro ? 4.4 : 0;               // where the pipeline starts on the global clock
  const TOTAL = P0 + 34;
  let g = ctx;

  // ---------- layout ----------
  const L = PHONE ? {
    capY: 128, capS: 54, top: 395, bot: 1430, cw: 250, ch: 311, gap: 30, v: 95, vb: 42,
    insp: [255, 880, 330], hub: [770, 790, 470, 250], skill: [770, 1050, 300, 150], offer: [860, 560], logoY: 860,
  } : {
    capY: 64, capS: 46, top: 215, bot: 905, cw: 176, ch: 219, gap: 26, v: 115, vb: 115,
    insp: [330, 560, 300], hub: [960, 560, 480, 268], skill: [1560, 560, 300, 176], offer: [760, 430], logoY: 470,
  };
  const PITCH = L.cw + L.gap;

  // ---------- dither patterns (many small, different) ----------
  const norm = (m, n) => m.map(r => r.map(v => (v + 0.5) / n));
  const NOISE = (() => { let s = 7, m = []; for (let j = 0; j < 16; j++) { m.push([]); for (let i = 0; i < 16; i++) { s = (s * 16807) % 2147483647; m[j].push(s / 2147483647); } } return m; })();
  const PATS = {
    bayer8: A.B8,
    bayer4: norm([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]], 16),
    dot: norm([[12, 5, 6, 13], [4, 0, 1, 7], [11, 3, 2, 8], [15, 10, 9, 14]], 16),
    lines: [[0.125, 0.125, 0.125, 0.125], [0.625, 0.625, 0.625, 0.625], [0.375, 0.375, 0.375, 0.375], [0.875, 0.875, 0.875, 0.875]],
    diag: [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]].map(r => r.map(v => (v + 0.5) / 4)),
    noise: NOISE,
  };
  const PATN = Object.keys(PATS);
  const th = (p, i, j) => { const m = PATS[p]; return m[j % m.length][i % m[0].length]; };
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const scratch = document.createElement('canvas'), sg = scratch.getContext('2d', { willReadFrequently: true });
  // dither an image (cover-cropped to w x h) into a canvas; cell in display px; mask(u,v) optional 0..1
  function dither(im, w, h, o) {
    const cell = o.cell, cols = Math.max(1, Math.round(w / cell)), rows = Math.max(1, Math.round(h / cell));
    scratch.width = cols; scratch.height = rows; sg.clearRect(0, 0, cols, rows); sg.imageSmoothingEnabled = true; sg.imageSmoothingQuality = 'high';
    if (o.crop) sg.drawImage(im, o.crop[0], o.crop[1], o.crop[2], o.crop[3], 0, 0, cols, rows); else drawCover(sg, im, 0, 0, cols, rows, 0);
    const id = sg.getImageData(0, 0, cols, rows), d = id.data, on = hex(o.on), off = o.off ? hex(o.off) : null, gain = o.gain ?? 1.25, bias = o.bias ?? -0.05;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4, a = d[k + 3] / 255; let v = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
      v = v * gain + bias; const m = o.mask ? o.mask((i + 0.5) / cols, (j + 0.5) / rows) : 1;
      if (a > 0.5 && m > 0.5 && v > th(o.pat, i, j)) { d[k] = on[0]; d[k + 1] = on[1]; d[k + 2] = on[2]; d[k + 3] = 255; }
      else if (off && a > 0.5 && m > 0.5) { d[k] = off[0]; d[k + 1] = off[1]; d[k + 2] = off[2]; d[k + 3] = 255; } else d[k + 3] = 0;
    }
    sg.putImageData(id, 0, 0);
    const out = document.createElement('canvas'); out.width = Math.round(w * SCALE); out.height = Math.round(h * SCALE); const og = out.getContext('2d'); og.imageSmoothingEnabled = false; og.drawImage(scratch, 0, 0, out.width, out.height); return out;
  }
  function colorCanvas(im, w, h) { const c = document.createElement('canvas'); c.width = Math.round(w * SCALE); c.height = Math.round(h * SCALE); const x = c.getContext('2d'); x.scale(SCALE, SCALE); drawCover(x, im, 0, 0, w, h, 0); return c; }
  // draw layer b over layer a through cells that switch on in Bayer order along a direction (no opacity)
  function cells(a, b, k, x, y, w, h, cell = 9, dir = [0.3, 1], spread = 0.5) {
    if (a) g.drawImage(a, x, y, w, h);
    if (k <= 0 || !b) return; if (k >= 1) { g.drawImage(b, x, y, w, h); return; }
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell); g.save(); g.beginPath();
    const fx = dir[0] < 0, fy = dir[1] < 0, ad = [Math.abs(dir[0]), Math.abs(dir[1])];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const u = (i + .5) / cols, v = (j + .5) / rows; if (A.dissolve(k, fx ? 1 - u : u, fy ? 1 - v : v, i, j, ad, spread)) g.rect(x + i * cell, y + j * cell, cell + 0.6, cell + 0.6); }
    g.clip(); g.drawImage(b, x, y, w, h); g.restore();
  }
  const rr = (x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

  // ---------- assets ----------
  const TPL = ['tpl-01', 'vtpl-01', 'tpl-02', 'tpl-03', 'vtpl-02', 'tpl-04', 'tpl-05', 'vtpl-03', 'tpl-06', 'tpl-07', 'vtpl-04', 'tpl-08', 'tpl-09', 'vtpl-05', 'tpl-10', 'tpl-11', 'vtpl-06', 'tpl-12', 'vtpl-07', 'vtpl-08'];
  const OUT = ['ad-01', 'vad-01', 'ad-02', 'ad-03', 'vad-02', 'ad-04', 'ad-05', 'vad-03', 'ad-06', 'ad-07', 'girl', 'ad-08', 'vad-04', 'ad-09', 'ad-10', 'vad-05', 'ad-11', 'ad-12', 'vad-06'];
  const PRODUCTS = ['shoe-product', 'compression-vest', 'speed-elite-shorts', 'ultra-light-runner', 'recovery-slides'];
  const assets = { yb: '/showcase/yourbrand-logo.webp', tpl: '/showcase/shoe-template.webp', cut: '/ads/assets/shoe-template-cutfull.webp', out: '/showcase/shoe-output.webp', girl: '/ads/assets/girl.webp', girlCut: '/ads/assets/girl-cut.webp' };
  TPL.forEach(k => assets[k] = `/showcase/${k}.webp`); OUT.forEach(k => { if (k !== 'girl') assets[k] = `/showcase/${k}.webp`; }); PRODUCTS.forEach(k => assets[k] = `/showcase/${k}.webp`);

  // ---------- carousels ----------
  // travel: fast entry that fills the screen, cruise, ease to a stop, hold, ease back to cruise
  function travel(p, v, s0, s1, g0, g1) {
    p = Math.max(0, p);
    const fill = W * (1 - Math.pow(1 - clamp01(p / 1.7), 3));
    const a = s1 - s0, b = g1 - g0; let o;
    if (p <= s0) o = v * p;
    else if (p < s1) { const u = p - s0; o = v * s0 + v * u - v * u * u / (2 * a); }
    else if (p < g0) o = v * s0 + v * a / 2;
    else if (p < g1) { const u = p - g0; o = v * s0 + v * a / 2 + v * u * u / (2 * b); }
    else o = v * s0 + v * a / 2 + v * b / 2 + v * (p - g1);
    return fill + o;
  }
  const TOPSTOP = [2.6, 4.2, 16.6, 18.0], BOTSTOP = [11.0, 12.6, 19.4, 20.6];
  const topOff = p => travel(p, L.v, ...TOPSTOP), botOff = p => travel(p, L.vb, ...BOTSTOP);
  // align so the shoe template stops dead centre at the top, and an empty card stops dead centre at the bottom
  const KTOP = Math.round((topOff(TOPSTOP[1]) - W / 2) / PITCH) + 1, TOPBASE = W / 2 + topOff(TOPSTOP[1]) - KTOP * PITCH - W;
  const KBOT = Math.round((botOff(BOTSTOP[1]) - W / 2) / PITCH) + 1, BOTBASE = W / 2 - botOff(BOTSTOP[1]) + KBOT * PITCH + W;
  const topX = (i, p) => TOPBASE + i * PITCH - topOff(p) + W;        // moves left
  const botX = (i, p) => BOTBASE - i * PITCH + botOff(p) - W;        // moves right
  const topName = i => i === KTOP ? 'tpl' : TPL[((i % TPL.length) + TPL.length) % TPL.length];
  // bottom cards: KBOT gets the first decode (shoe output); the girl ad sits a few cards behind it
  // her slot: visible when she lands (p=1), when the pipeline stops (12.6) and when she decodes (20.5); nearest 0.78W at the stop
  const KGIRL = (() => { let best = KBOT - 1, sc = 1e9; for (let i = KBOT - 14; i < KBOT; i++) { const a = botX(i, 1.0), b = botX(i, 12.6), c = botX(i, 21.6), m = L.cw / 2 + 10;
    if (a > m && a < W - m && c < W - m) { const d = Math.abs(b - W * 0.78); if (d < sc) { sc = d; best = i; } } } return best; })();
  const botName = i => i === KBOT ? 'out' : (CFG.intro && i === KGIRL) ? 'girl' : OUT[((i * 3) % OUT.length + OUT.length) % OUT.length] === 'girl' && !CFG.intro ? 'ad-12' : OUT[((i * 3) % OUT.length + OUT.length) % OUT.length];

  // ---------- precomputed images ----------
  const D = { top: {}, bot: {} };
  function prepare() {
    TPL.concat(['tpl']).forEach((k, n) => { D.top[k] = dither(IMG[k], L.cw, L.ch, { cell: 3, pat: PATN[n % PATN.length], on: n % 3 === 2 ? C.d2 : C.d1, off: C.card }); });
    const names = new Set(OUT.concat(['out', 'girl', 'ad-12']));
    names.forEach(k => { const im = IMG[k]; if (!im) return; D.bot[k] = {
      l0: dither(im, L.cw, L.ch, { cell: 11, pat: 'bayer4', on: C.d1, off: C.card, gain: 1.1 }),
      l1: dither(im, L.cw, L.ch, { cell: 5, pat: 'dot', on: C.d2, off: C.card }),
      l2: dither(im, L.cw, L.ch, { cell: 2, pat: 'bayer8', on: C.en, off: C.bg }),
      col: colorCanvas(im, L.cw, L.ch) }; });
    const s = L.insp[2];
    D.insp = { coarse: dither(IMG.tpl, s, s, { cell: 6, pat: 'diag', on: C.d1, off: C.card }), fine: dither(IMG.tpl, s, s, { cell: 2, pat: 'bayer8', on: C.d2, off: C.card }),
      leg: dither(IMG.cut, s, s, { cell: 2, pat: 'dot', on: C.en, mask: (u, v) => v < 0.46 ? 1 : 0, gain: 1.4 }),
      shoe: dither(IMG.cut, s, s, { cell: 2, pat: 'bayer8', on: C.en, mask: (u, v) => v >= 0.46 ? 1 : 0, gain: 1.4 }),
      text: dither(IMG.tpl, s * 0.47, s * 0.40, { cell: 2, pat: 'lines', on: C.en, crop: [0.51 * 800, 0.16 * 800, 0.47 * 800, 0.40 * 800], gain: 1.5, bias: -0.25 }),
      yours: dither(IMG.out, s, s, { cell: 2, pat: 'bayer8', on: C.en, off: C.card }) };
    if (CFG.intro) { const gw = PHONE ? 960 : 690, gh = gw * 1152 / 928; D.girl = { w: gw, h: gh,
      col: colorCanvas(IMG.girl, gw, gh), cut: colorCanvas(IMG.girlCut, gw, gh),
      bg: dither(IMG.girl, gw, gh, { cell: 6, pat: 'bayer4', on: C.d1, off: C.bg, gain: 1.15 }),
      her: dither(IMG.girlCut, gw, gh, { cell: 3, pat: 'dot', on: C.en, off: '#1A0E22', gain: 1.3 }),
      sign: dither(IMG.girl, gw, gh, { cell: 3, pat: 'lines', on: C.d2, off: C.bg, gain: 1.6, bias: -0.3, mask: inSign }) }; }
  }
  const SIGNQ = [[90 / 928, 645 / 1152], [800 / 928, 535 / 1152], [893 / 928, 1105 / 1152], [128 / 928, 1152 / 1152]];
  function inSign(u, v) { let c = false; for (let i = 0, j = 3; i < 4; j = i++) { const [xi, yi] = SIGNQ[i], [xj, yj] = SIGNQ[j]; if ((yi > v) !== (yj > v) && u < (xj - xi) * (v - yi) / (yj - yi) + xi) c = !c; } return c ? 1 : 0; }

  // ---------- pieces ----------
  function emptyCard(x, y, w, h, t, i) {   // an empty "Your ads" slot: outline filled with faint moving dither
    rr(x, y, w, h, 12); g.fillStyle = C.card; g.fill();
    g.save(); g.clip();
    A.ditherField(g, { x, y, w, h, cell: 4, on: C.line, key: 'emp', field: (u, v) => 0.18 + 0.16 * Math.sin(u * 7 + v * 5 + t * 2 + i) });
    g.restore(); rr(x + 0.5, y + 0.5, w - 1, h - 1, 12); g.strokeStyle = C.line; g.lineWidth = 1.5; g.stroke();
  }
  function decodeCard(set, k, x, y, w, h) {   // coarse dither -> medium -> tiny -> colour, cell by cell
    g.save(); rr(x, y, w, h, 12); g.clip();
    const s1 = clamp01(k / 0.3), s2 = clamp01((k - 0.3) / 0.3), s3 = clamp01((k - 0.6) / 0.4);
    if (s1 < 1) cells(set.l0, set.l1, s1, x, y, w, h, 11, [0, 1]);
    else if (s2 < 1) cells(set.l1, set.l2, s2, x, y, w, h, 7, [0, 1]);
    else cells(set.l2, set.col, s3, x, y, w, h, 5, [0, 1]);
    g.restore(); rr(x + 0.5, y + 0.5, w - 1, h - 1, 12); g.strokeStyle = k >= 1 ? 'rgba(255,255,255,0.18)' : C.d1; g.lineWidth = 1.5; g.stroke();
  }
  function node(x, y, w, h, title, sc = 1, glow = 0) {   // node card in the pipeline style
    g.save(); g.translate(x, y); g.scale(sc, sc);
    rr(-w / 2, -h / 2, w, h, 18); g.fillStyle = C.card; g.fill(); g.lineWidth = 1.5; g.strokeStyle = glow > 0.5 ? C.en : C.line; g.stroke();
    g.font = `500 ${PHONE ? 20 : 17}px Mono`; g.fillStyle = C.ink; g.letterSpacing = '0.5px'; g.fillText(title, -w / 2 + 20, -h / 2 + 32);
    g.fillStyle = glow > 0.5 ? C.en : C.d1; g.fillRect(w / 2 - 28, -h / 2 + 21, 9, 9);
    g.restore();
  }
  function bez(a, b, k) {   // a vertical-ish cubic between two points, returns point at k
    const m1 = [a[0], lerp(a[1], b[1], 0.5)], m2 = [b[0], lerp(a[1], b[1], 0.5)], u = 1 - k;
    return [u * u * u * a[0] + 3 * u * u * k * m1[0] + 3 * u * k * k * m2[0] + k * k * k * b[0], u * u * u * a[1] + 3 * u * u * k * m1[1] + 3 * u * k * k * m2[1] + k * k * k * b[1]];
  }
  function bezH(a, b, k) { const m1 = [lerp(a[0], b[0], 0.5), a[1]], m2 = [lerp(a[0], b[0], 0.5), b[1]], u = 1 - k;
    return [u * u * u * a[0] + 3 * u * u * k * m1[0] + 3 * u * k * k * m2[0] + k * k * k * b[0], u * u * u * a[1] + 3 * u * u * k * m1[1] + 3 * u * k * k * m2[1] + k * k * k * b[1]]; }
  // wire grows from a (k0) to b (k1); solid line, no opacity
  function wire(a, b, k0, k1, color, wdt = 2, horiz = false) {
    if (k1 <= k0) return; const f = horiz ? bezH : bez; g.save(); g.strokeStyle = color; g.lineWidth = wdt; g.beginPath();
    for (let s = 0; s <= 24; s++) { const p = f(a, b, lerp(k0, k1, s / 24)); s ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); } g.stroke();
    g.fillStyle = color; const e = f(a, b, k1); g.fillRect(e[0] - 3, e[1] - 3, 6, 6); g.restore();
  }
  // energy: a train of square pixels running along a wire (sizes step down, no transparency)
  function energy(a, b, k, horiz = false, size = 8) {
    if (k <= 0 || k >= 1.2) return; const f = horiz ? bezH : bez;
    for (let n = 0; n < 5; n++) { const kk = k - n * 0.035; if (kk < 0 || kk > 1) continue; const p = f(a, b, kk), s = size - n * 1.4;
      g.fillStyle = n === 0 ? '#FFFFFF' : C.en; g.fillRect(p[0] - s / 2, p[1] - s / 2, s, s); }
  }
  const raw = (p, a, b) => (p - a) / (b - a);
  function tag(txt, ax, ay, tx, ty, k) {
    if (k <= 0) return; const ex = lerp(ax, tx, SIG(k)), ey = lerp(ay, ty, SIG(k));
    g.save(); g.strokeStyle = C.ink; g.lineWidth = 1.5; g.beginPath(); g.moveTo(ax, ay); g.lineTo(ex, ey); g.stroke();
    g.fillStyle = C.ink; g.fillRect(ax - 3, ay - 3, 6, 6);
    if (k >= 1) { g.font = `500 ${PHONE ? 20 : 15}px Mono`; g.letterSpacing = '1.5px'; const tw = g.measureText(txt).width + 16, left = tx < ax;
      const bx = left ? tx - tw : tx; rr(bx, ty - 14, tw, 28, 6); g.fillStyle = C.en; g.fill(); g.fillStyle = C.bg; g.fillText(txt, bx + 8, ty + 6); }
    g.restore();
  }
  const cap = (t, text, a, b, y = L.capY, size = L.capS) => words(g, { text, x: W / 2, y, size, weight: 600, t, in: a, out: b, solid: true, color: C.ink, track: -0.03 });
  const label = (txt, x, y) => { g.save(); g.font = `500 ${PHONE ? 20 : 15}px Mono`; g.letterSpacing = '2px'; const tw = g.measureText(txt).width + 18; rr(x, y - 15, tw, 28, 7); g.fillStyle = C.bg; g.fill(); g.strokeStyle = C.line; g.lineWidth = 1.5; g.stroke(); g.fillStyle = MUTE; g.fillText(txt, x + 9, y + 5); g.restore(); };

  // ---------- the scene ----------
  function ambient(t) {
    g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
    // faint dot grid that drifts (background life)
    g.fillStyle = C.line; const off = (t * 6) % 32; for (let y = 16; y < H; y += 32) for (let x = 16 - off; x < W; x += 32) g.fillRect(x, y, 2, 2);
  }
  function render(t) {
    begin(ctx); g = ctx; ambient(t);
    if (CFG.intro && t < P0 + 1.4) intro(t);
    const p = t - P0; if (p > -0.2) scene(t, p);
    if (CFG.intro && t < P0 + 1.4) introTop(t);
  }

  // girl opener: her ad, built out in dither (background, then her, then the sign), then she drops into "Your ads"
  let girlLand = null;
  function introGeom(t) {
    const G = D.girl, push = 1 + 0.05 * clamp01(t / 4.4);
    const sx = W / 2, sy = H / 2;
    const k = SIG(prog(t, 3.8, 5.4));
    const j = KGIRL, tx = botX(j, 1.0), ty = L.bot;   // where her slot will be when she lands
    const w0 = G.w * push, h0 = G.h * push, w1 = L.cw, h1 = L.ch;
    const mid = [lerp(sx, tx, 0.35), lerp(sy, ty, 0.6)];
    const cx = k < 0.5 ? lerp(sx, mid[0], SIG(k * 2)) : lerp(mid[0], botX(j, Math.max(1.0, t - P0)), SIG((k - 0.5) * 2));
    const cy = k < 0.5 ? lerp(sy, mid[1], SIG(k * 2)) : lerp(mid[1], ty, SIG((k - 0.5) * 2));
    return { cx, cy, w: lerp(w0, w1, k), h: lerp(h0, h1, k), k };
  }
  function intro(t) { /* drawn in introTop so it sits above the carousels while it lands */ }
  function introTop(t) {
    const G = D.girl, q = introGeom(t);
    if (q.k >= 1) return;
    const x = q.cx - q.w / 2, y = q.cy - q.h / 2, par = 10 * clamp01(t / 4.4);
    g.save(); rr(x, y, q.w, q.h, lerp(20, 12, q.k)); g.clip();
    // colour: background plate and her cut-out (slight parallax)
    g.drawImage(G.col, x, y, q.w, q.h);
    g.drawImage(G.cut, x - par, y - par * 0.6, q.w, q.h);
    // build-out in dither: background (bayer, top->down), her (halftone dots, left->right), sign (line screen, bottom->up)
    const b1 = prog(t, 1.6, 2.6), b2 = prog(t, 2.3, 3.3), b3 = prog(t, 2.9, 3.8), cl = Math.max(4, 14 * (1 - q.k) + 4);
    cells(null, G.bg, b1, x, y, q.w, q.h, cl, [0, 1], 0.4);
    cells(null, G.her, b2, x - par, y - par * 0.6, q.w, q.h, cl, [1, 0.2], 0.4);
    cells(null, G.sign, b3, x, y, q.w, q.h, cl, [0, -1], 0.4);
    // while she shrinks, her cells switch over to the coarse slot dither she will sit in
    cells(null, D.bot.girl.l0, prog(q.k, 0.55, 0.95), x, y, q.w, q.h, Math.max(5, q.w / 24), [1, 1], 0.4);
    // scan line on the active build edge
    [[b1, 'v'], [b3, 'v2']].forEach(([b, d]) => { if (b > 0 && b < 1) { const ly = d === 'v' ? y + q.h * b : y + q.h * (1 - b); g.fillStyle = '#FFFFFF'; g.fillRect(x, ly - 1.5, q.w, 3); } });
    g.restore();
    rr(x + 0.5, y + 0.5, q.w - 1, q.h - 1, lerp(20, 12, q.k)); g.strokeStyle = C.line; g.lineWidth = 2; g.stroke();
    cap(t, 'Made with AdRender.', 0.5, 3.6);
  }

  function scene(t, p) {
    // --- top: winning ads (dithered, many patterns), flowing left ---
    const [ix, iy, isz] = L.insp;
    const lift = prog(p, 4.2, 5.2), ret = prog(p, 16.0, 16.8);
    const topExit = EXIT(prog(p, 30.0, 30.8)) * (L.top + L.ch);
    const botExit = EXIT(prog(p, 30.0, 30.8)) * (H - L.bot + L.ch);
    const ty = L.top - topExit;
    const topCards = [];
    for (let i = KTOP - 60; i < KTOP + 60; i++) {
      const x = topX(i, p); if (x < -L.cw || x > W + L.cw) continue;
      const cx = x - L.cw / 2, cy = ty - L.ch / 2; topCards.push([x, ty + L.ch / 2]);
      if (i === KTOP && lift > 0 && ret < 1) { rr(cx, cy, L.cw, L.ch, 12); g.strokeStyle = C.line; g.lineWidth = 1.5; g.setLineDash([6, 6]); g.stroke(); g.setLineDash([]); continue; }
      g.save(); rr(cx, cy, L.cw, L.ch, 12); g.clip(); g.drawImage(D.top[topName(i)], cx, cy, L.cw, L.ch); g.restore();
      rr(cx + 0.5, cy + 0.5, L.cw - 1, L.ch - 1, 12); g.strokeStyle = C.line; g.lineWidth = 1.5; g.stroke();
    }
    label('WINNING ADS', PHONE ? 30 : 34, ty - L.ch / 2 - 22);

    // --- bottom: your ads (empty dither slots that decode), flowing right ---
    const by = L.bot + botExit, botCards = [];
    for (let i = KBOT - 60; i < KBOT + 60; i++) {
      const x = botX(i, p); if (x < -L.cw || x > W + L.cw) continue;
      const cx = x - L.cw / 2, cy = by - L.ch / 2, name = botName(i);
      botCards.push({ x, y: by - L.ch / 2, i });
      let k = -1;
      if (i === KBOT) k = prog(p, 14.4, 16.2);
      else { const d = decodeStart(i); if (d != null) k = prog(p, d, d + 1.1); }
      if (CFG.intro && i === KGIRL && t < P0 + 1.0) continue;   // she is still landing
      if (k > 0 || (CFG.intro && i === KGIRL)) decodeCard(D.bot[name], Math.max(0, k), cx, cy, L.cw, L.ch);
      else emptyCard(cx, cy, L.cw, L.ch, t, i);
    }
    label('YOUR ADS', PHONE ? 30 : 34, by + L.ch / 2 + 26);

    // --- middle: brand assets hub (pops from the middle), skill node ---
    const [hx, hy, hw, hh] = L.hub, [kx, ky, kw, kh] = L.skill;
    const hubPop = POP(prog(p, 1.0, 1.5)), skillPop = POP(prog(p, 1.4, 1.9)) * (1 - EXIT(prog(p, 25.0, 25.5)));
    const morph = INOUT(prog(p, 25.6, 26.6)), hubGone = EXIT(prog(p, 30.4, 31.0));

    // wires: template -> assets -> skill -> first empty card
    const inspC = inspectGeom(p), aL = [hx - hw / 2, hy], aR = [hx + hw / 2, hy], sTop = PHONE ? [kx, ky - kh / 2] : [kx - kw / 2, ky], sOut = PHONE ? [kx - kw / 2, ky] : [kx, ky + kh / 2];
    const firstCard = [W / 2, by - L.ch / 2], wireOut = 1 - EXIT(prog(p, 24.8, 25.4));
    const w1 = SIG(prog(p, 12.0, 12.6)) * wireOut, w2 = SIG(prog(p, 12.3, 12.9)) * wireOut, w3 = SIG(prog(p, 12.6, 13.2)) * wireOut;
    const inspR = [inspC.x + inspC.s / 2, inspC.y];
    if (PHONE) { wire(inspR, aL, 0, w1, C.d1, 2, true); wire([hx, hy + hh / 2], sTop, 0, w2, C.d1, 2); wire(sOut, firstCard, 0, w3, C.d1, 2, false); }
    else { wire(inspR, aL, 0, w1, C.d1, 2, true); wire(aR, [kx - kw / 2, ky], 0, w2, C.d1, 2, true); wire(sOut, firstCard, 0, w3, C.d1, 2); }
    // energy along the pipeline (13.0 - 14.6)
    for (let n = 0; n < 3; n++) {
      const e = raw(p, 13.0 + n * 0.18, 13.6 + n * 0.18), e2 = raw(p, 13.5 + n * 0.18, 14.0 + n * 0.18), e3 = raw(p, 13.9 + n * 0.18, 14.5 + n * 0.18);
      if (PHONE) { energy(inspR, aL, e, true); energy([hx, hy + hh / 2], sTop, e2); energy(sOut, firstCard, e3); }
      else { energy(inspR, aL, e, true); energy(aR, [kx - kw / 2, ky], e2, true); energy(sOut, firstCard, e3); }
    }
    // fan-in: every winning ad links to the brand assets (17.4 - 19.0), fan-out to the empty cards (19.4 - 20.6)
    const fanOut = 1 - EXIT(prog(p, 24.8, 25.4));
    topCards.forEach(([x, y], n) => { const k = SIG(prog(p, 17.4 + Math.min(n, 8) * 0.05, 18.2 + Math.min(n, 8) * 0.05)) * fanOut; if (k > 0) {
      wire([x, y], [hx + (x - W / 2) * 0.25, hy - hh / 2], 0, k, C.d1, 1.5); if (k > 0.99) energy([x, y], [hx + (x - W / 2) * 0.25, hy - hh / 2], ((p - 18.2 - n * 0.13) % 1.4) / 1.2, false, 6); } });
    botCards.forEach((c, n) => { if (c.i === KBOT) return; const d0 = 19.4 + Math.min(n, 8) * 0.05, k = SIG(prog(p, d0, d0 + 0.8)) * fanOut; if (k > 0) {
      const a = [hx + (c.x - W / 2) * 0.25, hy + hh / 2]; wire(a, [c.x, c.y], 0, k, C.en, 1.5); if (k > 0.99) energy(a, [c.x, c.y], ((p - 20.2 - n * 0.17) % 1.3) / 1.1, false, 6); } });

    // skill node
    if (skillPop > 0.001) { node(kx, ky, kw, kh, 'Skill · Clone', skillPop, p > 13.4 && p < 14.6 ? 1 : 0);
      if (skillPop > 0.95) { g.save(); g.font = `500 ${PHONE ? 22 : 17}px Mono`; g.fillStyle = C.ink; g.fillText('Match the layout', kx - kw / 2 + 20, ky + (PHONE ? -4 : 4)); g.fillText('Swap in your product', kx - kw / 2 + 20, ky + (PHONE ? 26 : 30));
        // lightning glyph pulses when energy passes
        const on = p > 13.4 && p < 14.6; g.fillStyle = on ? C.en : C.d1; const lx = kx + kw / 2 - 40, ly = ky + kh / 2 - 36; g.beginPath(); g.moveTo(lx + 4, ly - 12); g.lineTo(lx - 7, ly + 2); g.lineTo(lx, ly + 2); g.lineTo(lx - 3, ly + 13); g.lineTo(lx + 8, ly - 2); g.lineTo(lx + 1, ly - 2); g.closePath(); g.fill(); g.restore(); } }

    // brand assets hub -> offer card
    if (hubPop > 0.001 && hubGone < 1) {
      const [ow, oh] = L.offer, w = lerp(hw, ow, morph), h = lerp(hh, oh, morph), sc = hubPop * (1 - hubGone * 0.94);
      g.save(); g.translate(hx, lerp(hy, PHONE ? H * 0.47 : hy + 10, morph)); g.scale(sc, sc);
      rr(-w / 2, -h / 2, w, h, 20); g.fillStyle = C.card; g.fill(); g.lineWidth = morph > 0.5 ? 3 : 1.5;
      if (morph > 0.5) { const gr = g.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, '#4F8DF7'); gr.addColorStop(0.5, '#9B6BF2'); gr.addColorStop(1, '#FF8A3D'); g.strokeStyle = gr; } else g.strokeStyle = C.line;
      g.stroke(); g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 20); g.clip();
      if (morph < 1) hubContent(p, w, h, morph);
      if (morph > 0) offerContent(t, p, w, h);
      g.restore();
    }

    // the inspected template (lift, scan, cut, re-scan, return)
    inspect(p, inspC);

    // captions
    if (!CFG.intro) cap(t, 'Black Friday at AdRender.', P0 + 0.5, P0 + 4.0);
    else cap(t, 'Black Friday at AdRender.', P0 + 1.2, P0 + 4.0);
    cap(t, 'Pick a winning ad.', P0 + 4.4, P0 + 7.8);
    cap(t, 'We take it apart.', P0 + 8.2, P0 + 10.2);
    cap(t, 'Add your brand.', P0 + 10.6, P0 + 13.6);
    cap(t, 'Get your version.', P0 + 14.4, P0 + 17.2);
    cap(t, 'Every winning ad. Your brand.', P0 + 19.2, P0 + 24.8);

    // end: the 3D logo pops in the middle with the address
    const lk = POP(prog(p, 30.6, 31.3));
    if (lk > 0 && window.Logo3D) { Logo3D.draw(g, { cx: W / 2, cy: L.logoY, size: (PHONE ? 300 : 250) * lk, yaw: lerp(-0.9, -0.15, SIG(prog(p, 30.6, 33.5))), pitch: 0.15, light: [lerp(-0.8, 0.7, prog(p, 30.6, 34)), 0.5, 0.8], amb: 0.35, key: 0.8, spec: 0.4, lines: 0.6 });
      words(g, { text: 'AdRender', x: W / 2, y: L.logoY + (PHONE ? 270 : 220), size: PHONE ? 88 : 74, weight: 600, t, in: P0 + 31.1, solid: true, color: C.ink });
      const uk = SIG(prog(p, 31.6, 32.0)); if (uk > 0) { const bw = PHONE ? 480 : 400, bh = PHONE ? 86 : 70, uy = L.logoY + (PHONE ? 320 : 262); g.save(); g.beginPath(); g.rect(0, uy - 4, W, bh + 8); g.clip(); g.translate(0, (1 - uk) * (bh + 8));
        rr(W / 2 - bw / 2, uy, bw, bh, bh / 2); g.fillStyle = C.ink; g.fill(); g.font = `500 ${PHONE ? 38 : 31}px Inter`; g.fillStyle = C.bg; g.textAlign = 'center'; g.fillText('adrender.app', W / 2, uy + bh / 2 + 11); g.restore(); }
      words(g, { text: 'Black Friday · 50% off your first month · One week only', x: W / 2, y: L.logoY + (PHONE ? 470 : 390), size: PHONE ? 30 : 26, weight: 500, t, in: P0 + 32.0, solid: true, stagger: 0.03, color: MUTE, track: 0 });
    }
  }
  function decodeStart(i) {   // cards decode as the fan-out reaches them, one after another
    if (CFG.intro && i === KGIRL) return 20.5; const rel = i - KBOT; if (rel === 0) return null; const order = rel > 0 ? rel * 2 - 1 : -rel * 2;
    return 20.4 + order * 0.32;
  }
  function hubContent(p, w, h, morph) {
    const off = -morph * h * 1.2;   // slides up and out as the offer comes in
    g.save(); g.translate(0, off);
    g.font = `500 ${PHONE ? 20 : 16}px Mono`; g.fillStyle = MUTE; g.letterSpacing = '2px'; g.fillText('BRAND ASSETS', -w / 2 + 22, -h / 2 + 32);
    g.fillStyle = C.d1; g.fillRect(w / 2 - 30, -h / 2 + 21, 9, 9);
    const k1 = SIG(prog(p, 1.4, 1.8));
    if (k1 > 0) { g.save(); g.beginPath(); g.rect(-w / 2, -h / 2 + 44, w, 70); g.clip(); g.translate(0, (1 - k1) * 70);
      drawCover(g, IMG.yb, -w / 2 + 22, -h / 2 + 50, 56, 56, 28); g.font = `600 ${PHONE ? 32 : 28}px Inter`; g.fillStyle = C.ink; g.letterSpacing = '-0.5px'; g.fillText('YourBrand', -w / 2 + 92, -h / 2 + 86);
      ['#1D3A7A', '#C8202F', '#F2EDE4', '#0B0B0B'].forEach((c, n) => { rr(w / 2 - 30 - (4 - n) * 40, -h / 2 + 60, 32, 32, 8); g.fillStyle = c; g.fill(); });
      g.restore(); }
    // product slots: the first product arrives with "Add your brand", the rest with the fan-in
    const n = PRODUCTS.length, sz = Math.min(PHONE ? 78 : 70, (w - 44 - (n - 1) * 10) / n), y0 = h / 2 - sz - 22;
    PRODUCTS.forEach((pr, j) => { const x0 = -w / 2 + 22 + j * (sz + 10); rr(x0, y0, sz, sz, 10); g.fillStyle = C.bg; g.fill(); g.strokeStyle = C.line; g.lineWidth = 1.5; g.stroke();
      const at = j === 0 ? 9.9 : 18.4 + j * 0.12, k = POP(prog(p, at, at + 0.35));
      if (k > 0) { g.save(); g.translate(x0 + sz / 2, y0 + sz / 2); g.scale(k, k); g.beginPath(); g.roundRect(-sz / 2 + 3, -sz / 2 + 3, sz - 6, sz - 6, 8); g.clip(); g.fillStyle = '#F4F2EE'; g.fillRect(-sz / 2, -sz / 2, sz, sz); drawCover(g, IMG[pr], -sz / 2 + 3, -sz / 2 + 3, sz - 6, sz - 6, 0); g.restore(); } });
    g.restore();
  }
  function offerContent(t, p, w, h) {
    const sl = (a) => (1 - SIG(prog(p, a, a + 0.45))) * h;   // slide up from below the card edge
    g.textAlign = 'center';
    g.save(); g.translate(0, sl(26.2)); g.font = `500 ${PHONE ? 22 : 18}px Mono`; g.letterSpacing = '3px'; g.fillStyle = MUTE; g.fillText('BLACK FRIDAY', 0, -h / 2 + (PHONE ? 70 : 56)); g.restore();
    const big = PHONE ? 230 : 190; g.save(); g.translate(0, sl(26.3)); g.font = `700 ${big}px Inter`; g.letterSpacing = `${-0.05 * big}px`; const tw = g.measureText('50%').width;
    const gr = g.createLinearGradient(-tw / 2, 0, tw / 2, 0); gr.addColorStop(0, '#4F8DF7'); gr.addColorStop(0.5, '#9B6BF2'); gr.addColorStop(1, '#FF8A3D'); g.fillStyle = gr; g.fillText('50%', 0, PHONE ? 40 : 40); g.restore();
    g.save(); g.translate(0, sl(26.45)); g.font = `600 ${PHONE ? 44 : 38}px Inter`; g.letterSpacing = '-1px'; g.fillStyle = C.ink; g.fillText('off your first month', 0, PHONE ? 120 : 108);
    g.font = `500 ${PHONE ? 28 : 24}px Inter`; g.letterSpacing = '0px'; g.fillStyle = MUTE; g.fillText('Every plan · One week only', 0, PHONE ? 176 : 152); g.restore();
    // dither edge that keeps moving inside the card (secondary life)
    A.ditherField(g, { x: -w / 2, y: h / 2 - 70, w, h: 70, cell: 4, on: C.d1, key: 'ofr', field: (u, v) => Math.pow(v, 1.6) * 0.9 + 0.08 * Math.sin(u * 12 - t * 2) });
    g.textAlign = 'left';
  }
  function inspectGeom(p) {
    const [ix, iy, isz] = L.insp;
    const lift = prog(p, 4.2, 5.2), ret = prog(p, 16.0, 16.8);
    const from = [topX(KTOP, p), L.top], mid = [lerp(from[0], ix, 0.5), lerp(L.top, iy, 0.5) - 20];
    let x, y, s;
    if (lift < 1) { const k = lift; x = k < 0.5 ? lerp(from[0], mid[0], SIG(k * 2)) : lerp(mid[0], ix, SIG((k - 0.5) * 2)); y = k < 0.5 ? lerp(from[1], mid[1], SIG(k * 2)) : lerp(mid[1], iy, SIG((k - 0.5) * 2)); s = lerp(L.cw, isz, SIG(k)); }
    else if (ret > 0) { const back = [topX(KTOP, p), L.top], m2 = [lerp(ix, back[0], 0.5), lerp(iy, back[1], 0.5) - 20], k = ret; x = k < 0.5 ? lerp(ix, m2[0], SIG(k * 2)) : lerp(m2[0], back[0], SIG((k - 0.5) * 2)); y = k < 0.5 ? lerp(iy, m2[1], SIG(k * 2)) : lerp(m2[1], back[1], SIG((k - 0.5) * 2)); s = lerp(isz, L.cw, SIG(k)); }
    else { x = ix; y = iy + Math.sin(p * 1.2) * 3; s = isz; }
    return { x, y, s, h: lerp(L.ch, s, lift < 1 ? SIG(lift) : 1 - SIG(ret)), active: lift > 0 && ret < 1 };
  }
  function inspect(p, q) {
    if (!q.active) return;
    const w = q.s, h = q.h, x = q.x - w / 2, y = q.y - h / 2, I = D.insp;
    const scan1 = prog(p, 5.4, 7.0), apart = SIG(prog(p, 7.2, 8.2)) * (1 - SIG(prog(p, 10.0, 10.6))), scan2 = prog(p, 10.4, 12.0);
    g.save(); rr(x, y, w, h, 14); g.clip();
    g.drawImage(D.top.tpl, x, y, w, h);                      // the coarse carousel dither it arrived with
    if (scan1 > 0) { g.save(); g.beginPath(); g.rect(x, y, w, h * scan1); g.clip(); g.drawImage(I.fine, x, y, w, h); g.restore(); }
    if (scan2 > 0) { g.save(); g.beginPath(); g.rect(x, y + h * (1 - scan2), w, h * scan2); g.clip(); g.drawImage(I.yours, x, y, w, h); g.restore(); }
    cells(null, D.top.tpl, prog(p, 15.3, 15.9), x, y, w, h, 8, [0, -1], 0.4);   // back to the carousel dither before it returns
    // scan lines with a leading band of tiny scanner pixels
    [[scan1, 1], [scan2, -1]].forEach(([s, d]) => { if (s <= 0 || s >= 1) return; const ly = d > 0 ? y + h * s : y + h * (1 - s);
      g.fillStyle = '#FFFFFF'; g.fillRect(x, ly - 1.5, w, 3); g.fillStyle = C.en;
      for (let n = 0; n < 60; n++) { const px = x + ((n * 37.7 + p * 900) % w), py = ly + d * (4 + ((n * 13.1) % 16)); g.fillRect(px, py, 3, 3); } });
    g.restore();
    rr(x + 0.5, y + 0.5, w - 1, h - 1, 14); g.strokeStyle = scan1 > 0 && scan1 < 1 || scan2 > 0 && scan2 < 1 ? C.en : C.line; g.lineWidth = 2; g.stroke();
    // cut layers lift out: headline, leg, shoe (tiny dither in the energy colour), each tagged
    if (apart > 0) {
      const o = apart * (PHONE ? 26 : 22);
      g.drawImage(I.leg, x - o, y - o, w, h);
      g.drawImage(I.shoe, x + o * 0.6, y + o, w, h);
      g.drawImage(I.text, x + w * 0.51 + o, y + h * 0.16 - o, w * 0.47, h * 0.40);
      const tk = prog(p, 8.0, 8.5);
      const lx = PHONE ? x - 10 : x - 70, rx = PHONE ? x + w + 10 : x + w + 70;
      const nm = scan2 > 0.5 ? ['YOUR HEADLINE', 'YOUR LEG', 'YOUR SHOE'] : ['HEADLINE', 'LEG', 'SHOE'];
      tag(nm[0], x + w * 0.74 + o, y + h * 0.30 - o, rx, y + h * 0.18, tk);
      tag(nm[1], x + w * 0.20 - o, y + h * 0.24 - o, lx, y + h * 0.12, prog(p, 8.1, 8.6));
      tag(nm[2], x + w * 0.45 + o * 0.6, y + h * 0.72 + o, PHONE ? x - 10 : x - 70, y + h * 0.86, prog(p, 8.2, 8.7));
    }
    // first product flies from the brand assets into the template during "Add your brand"
    const fly = prog(p, 9.9, 10.6); if (fly > 0 && fly < 1) { const [hx, hy, hw, hh] = L.hub, sz = PHONE ? 78 : 70; const sx = hx - hw / 2 + 22 + sz / 2, sy = hy + hh / 2 - sz / 2 - 22;
      const px = lerp(sx, q.x, SIG(fly)), py = lerp(sy, q.y + h * 0.2, SIG(fly)), s = lerp(1, 0.5, fly); g.save(); g.translate(px, py); g.scale(s, s); rr(-sz / 2, -sz / 2, sz, sz, 10); g.clip(); g.fillStyle = '#F4F2EE'; g.fill(); drawCover(g, IMG['shoe-product'], -sz / 2, -sz / 2, sz, sz, 0); g.restore(); }
  }

  window.PIPE_TOTAL = TOTAL;
  let ready = false;
  window.GL_TWICE = false;
  Logo3D.load('/ads/assets/logo3d.json').then(() => AD.start(TOTAL, t => { if (!ready) { prepare(); ready = true; } render(t); }, assets));
})();
