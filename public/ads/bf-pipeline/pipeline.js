// Black Friday "pipeline" ad: one continuous rolling scene. Nothing fades: elements slide or pop in and out,
// images change state only by switching pixels (scan lines, dither cells, decoding).
// Top: the real winning templates in full colour (video templates play). Middle: Brand assets and the Clone skill.
// Bottom: empty "Your ads" cards, each dithered in its own mix of the brand colours (blue, violet, orange).
// The shoe template stops in the top row, grows in place, is scanned in tiny dither, cut apart and tagged,
// gets your brand scanned in, energy runs through Clone into an empty card that decodes into your ad,
// every template links to the brand assets, which link down to the empty cards, which decode one after another.
// The Brand assets box never moves its contents: it changes by wiping itself to dither and rendering the new state.
(function () {
  const A = AD, { PHONE, W, H, SCALE, clamp01, lerp, prog, bezier, ctx, begin, IMG, drawCover, words } = A;
  const BLUE = '#4F8DF7', VIO = '#9B6BF2', ORA = '#FF8A3D', LB = '#B5D0FF', LV = '#CDB8FF', LO = '#FFD0A8';
  const BG = '#09080F', CARD = '#13111D', LINE = '#2B2642', INK = '#F4F2FA', MUTE = 'rgba(244,242,250,0.62)';
  const DK = { v: '#160F26', b: '#0A1226', o: '#1E1008' };
  const SIG = bezier(0.2, 0, 0, 1), EXIT = bezier(0.3, 0, 1, 1), POP = bezier(0.34, 1.25, 0.64, 1);
  const TOTAL = 34;
  let g = ctx;

  // ---------- layout ----------
  const L = PHONE ? {
    capY: 150, capS: 54, top: 430, bot: 1500, cw: 250, ch: 311, gap: 30, v: 95, vb: 42, sc: 1.3, part: 170, tagX: 22, tagS: 18,
    hub: [540, 890, 470, 250], skill: [540, 1160, 300, 150], offer: [540, 950, 860, 560], logoY: 880,
  } : {
    capY: 64, capS: 46, top: 230, bot: 935, cw: 176, ch: 219, gap: 26, v: 115, vb: 115, sc: 1.5, part: 230, tagX: 64, tagS: 15,
    hub: [960, 650, 480, 268], skill: [1540, 650, 300, 176], offer: [960, 615, 760, 400], logoY: 470,
  };
  const PITCH = L.cw + L.gap;

  // ---------- dither ----------
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
  const th = (p, i, j) => { const m = PATS[p]; return m[j % m.length][i % m[0].length]; };
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const scratch = document.createElement('canvas'), sg = scratch.getContext('2d', { willReadFrequently: true });
  const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = Math.round(w * SCALE); c.height = Math.round(h * SCALE); const x = c.getContext('2d'); x.scale(SCALE, SCALE); c.g = x; return c; };
  function dither(im, w, h, o) {
    const cell = o.cell, cols = Math.max(1, Math.round(w / cell)), rows = Math.max(1, Math.round(h / cell));
    scratch.width = cols; scratch.height = rows; sg.clearRect(0, 0, cols, rows); sg.imageSmoothingEnabled = true; sg.imageSmoothingQuality = 'high';
    drawCover(sg, im, 0, 0, cols, rows, 0);
    const id = sg.getImageData(0, 0, cols, rows), d = id.data, on = hex(o.on), off = o.off ? hex(o.off) : null, gain = o.gain ?? 1.25, bias = o.bias ?? -0.05;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4, a = d[k + 3] / 255; let v = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
      v = v * gain + bias; const m = o.mask ? o.mask((i + 0.5) / cols, (j + 0.5) / rows) : 1;
      if (a > 0.5 && m > 0.5 && v > th(o.pat, i, j)) { d[k] = on[0]; d[k + 1] = on[1]; d[k + 2] = on[2]; d[k + 3] = 255; }
      else if (off && a > 0.5 && m > 0.5) { d[k] = off[0]; d[k + 1] = off[1]; d[k + 2] = off[2]; d[k + 3] = 255; } else d[k + 3] = 0;
    }
    sg.putImageData(id, 0, 0);
    const out = document.createElement('canvas'); out.width = Math.round(w * SCALE); out.height = Math.round(h * SCALE);
    const og = out.getContext('2d'); og.imageSmoothingEnabled = false; og.drawImage(scratch, 0, 0, out.width, out.height); return out;
  }
  // a block of mixed brand-colour dither (used to wipe a box clean between states)
  const FILLC = [BLUE, VIO, ORA, LB, LV, LO].map(hex), fillTmp = document.createElement('canvas'), fg = fillTmp.getContext('2d');
  function fillInto(target, tg, w, h, t, cell = 6) {
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell); fillTmp.width = cols; fillTmp.height = rows;
    const id = fg.createImageData(cols, rows), d = id.data, card = hex(CARD), sh = Math.floor(t * 6);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4, v = 0.5 + 0.32 * Math.sin(i * 0.31 + j * 0.23 + t * 2.2) + 0.14 * Math.sin(i * 0.9 - j * 0.6);
      const c = v > th('bayer8', i, j) ? FILLC[((i >> 2) + (j >> 2) * 2 + sh) % 6] : card; d[k] = c[0]; d[k + 1] = c[1]; d[k + 2] = c[2]; d[k + 3] = 255;
    }
    fg.putImageData(id, 0, 0); tg.save(); tg.imageSmoothingEnabled = false; tg.drawImage(fillTmp, 0, 0, cols * cell, rows * cell); tg.restore();
  }
  const fillCache = {};
  function fillCanvas(w, h, t) { const k = w + 'x' + h; const c = fillCache[k] || (fillCache[k] = canvas(w, h)); c.g.clearRect(0, 0, w, h); fillInto(c, c.g, w, h, t); return c; }
  // draw b over a through cells that switch on in Bayer order along a direction (no opacity anywhere)
  function cells(a, b, k, x, y, w, h, cell = 9, dir = [0.3, 1], spread = 0.5) {
    if (a) g.drawImage(a, x, y, w, h);
    if (k <= 0 || !b) return; if (k >= 1) { g.drawImage(b, x, y, w, h); return; }
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell), fx = dir[0] < 0, fy = dir[1] < 0, ad = [Math.abs(dir[0]), Math.abs(dir[1])];
    g.save(); g.beginPath();
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const u = (i + .5) / cols, v = (j + .5) / rows; if (A.dissolve(k, fx ? 1 - u : u, fy ? 1 - v : v, i, j, ad, spread)) g.rect(x + i * cell, y + j * cell, cell + 0.6, cell + 0.6); }
    g.clip(); g.drawImage(b, x, y, w, h); g.restore();
  }
  const dim = (c, f) => { const a = hex(c), b = hex(CARD); return '#' + a.map((v, n) => Math.round(lerp(b[n], v, f)).toString(16).padStart(2, '0')).join(''); };
  const rr = (x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

  // ---------- assets ----------
  const TPL = ['tpl-01', 'vtpl-01', 'tpl-02', 'tpl-03', 'vtpl-02', 'tpl-04', 'tpl-05', 'vtpl-03', 'tpl-06', 'tpl-07', 'vtpl-04', 'tpl-08', 'tpl-09', 'vtpl-05', 'tpl-10', 'tpl-11', 'vtpl-06', 'tpl-12', 'vtpl-07', 'vtpl-08'];
  const OUT = ['ad-01', 'vad-01', 'ad-02', 'ad-03', 'vad-02', 'ad-04', 'ad-05', 'vad-03', 'ad-06', 'ad-07', 'vad-04', 'ad-08', 'ad-09', 'vad-05', 'ad-10', 'ad-11', 'vad-06', 'ad-12'];
  const PRODUCTS = ['shoe-product', 'compression-vest', 'speed-elite-shorts', 'ultra-light-runner', 'recovery-slides'];
  const VID = {}; for (let n = 1; n <= 8; n++) VID['vtpl-0' + n] = 'vt-0' + n; for (let n = 1; n <= 6; n++) VID['vad-0' + n] = 'va-0' + n;
  const assets = { yb: '/showcase/yourbrand-logo.webp', tpl: '/showcase/shoe-template.webp', cut: '/ads/assets/shoe-template-cutfull.webp', out: '/showcase/shoe-output.webp' };
  TPL.concat(OUT, PRODUCTS).forEach(k => assets[k] = `/showcase/${k}.webp`);
  Object.values(VID).forEach(k => assets[k] = `/ads/assets/vt/${k}.webp`);
  // video templates play from frame sheets (9 x 6 frames of 256 x 320 at 12 fps), so live view and export match
  function drawVideo(key, t, x, y, w, h) { const f = Math.floor(t * 12) % 54; g.drawImage(IMG[key], (f % 9) * 256, Math.floor(f / 9) * 320, 256, 320, x, y, w, h); }
  function drawAd(name, t, x, y, w, h) { if (VID[name]) drawVideo(VID[name], t, x, y, w, h); else drawCover(g, IMG[name], x, y, w, h, 0); }

  // ---------- carousels ----------
  function travel(p, v, s0, s1, g0, g1) {   // fast entry that fills the screen, cruise, ease to a stop, hold, ease back to cruise
    p = Math.max(0, p);
    const fill = W * (1 - Math.pow(1 - clamp01(p / 1.7), 3)), a = s1 - s0, b = g1 - g0; let o;
    if (p <= s0) o = v * p;
    else if (p < s1) { const u = p - s0; o = v * s0 + v * u - v * u * u / (2 * a); }
    else if (p < g0) o = v * s0 + v * a / 2;
    else if (p < g1) { const u = p - g0; o = v * s0 + v * a / 2 + v * u * u / (2 * b); }
    else o = v * s0 + v * a / 2 + v * b / 2 + v * (p - g1);
    return fill + o;
  }
  const TOPSTOP = [2.6, 4.2, 17.6, 19.0], BOTSTOP = [11.0, 12.6, 19.6, 20.8];
  const topOff = p => travel(p, L.v, ...TOPSTOP), botOff = p => travel(p, L.vb, ...BOTSTOP);
  const KTOP = Math.round((topOff(TOPSTOP[1]) - W / 2) / PITCH) + 1, TOPBASE = W / 2 + topOff(TOPSTOP[1]) - KTOP * PITCH - W;
  const KBOT = Math.round((botOff(BOTSTOP[1]) - W / 2) / PITCH) + 1, BOTBASE = W / 2 - botOff(BOTSTOP[1]) + KBOT * PITCH + W;
  const grow = p => SIG(prog(p, 4.2, 5.0)) * (1 - SIG(prog(p, 16.9, 17.5)));     // the picked template grows in place
  const topX = (i, p) => TOPBASE + i * PITCH - topOff(p) + W + (i === KTOP ? 0 : Math.sign(i - KTOP) * L.part * grow(p));
  const botX = (i, p) => BOTBASE - i * PITCH + botOff(p) - W;
  const mod = (a, n) => ((a % n) + n) % n;
  const topName = i => i === KTOP ? 'tpl' : TPL[mod(i, TPL.length)];
  const botName = i => i === KBOT ? 'out' : OUT[mod(i * 5, OUT.length)];

  // each bottom card dithers through its own mix of brand colours and patterns
  const COMBOS = [
    [[VIO, DK.v, 'bayer4'], [ORA, DK.v, 'dot'], [LB, DK.b, 'bayer8']],
    [[BLUE, DK.b, 'lines'], [LV, DK.b, 'bayer4'], [ORA, DK.o, 'bayer8']],
    [[ORA, DK.o, 'diag'], [BLUE, DK.o, 'dot'], [LV, DK.v, 'bayer8']],
    [[LB, DK.b, 'dot'], [VIO, DK.b, 'lines'], [LO, DK.o, 'bayer8']],
    [[LO, DK.o, 'bayer4'], [VIO, DK.o, 'diag'], [BLUE, DK.b, 'bayer8']],
    [[VIO, DK.b, 'noise'], [LB, DK.v, 'dot'], [ORA, DK.b, 'bayer8']],
    [[BLUE, DK.v, 'dot'], [ORA, DK.b, 'bayer4'], [LV, DK.o, 'bayer8']],
  ];
  const comboOf = i => COMBOS[mod(i * 3, COMBOS.length)];
  const botCache = {};
  function botSet(name, i) {
    const c = comboOf(i), k = name + '|' + mod(i * 3, COMBOS.length); if (botCache[k]) return botCache[k];
    const im = IMG[name];
    return botCache[k] = { l0: dither(im, L.cw, L.ch, { cell: 11, pat: c[0][2], on: c[0][0], off: c[0][1], gain: 1.1 }),
      l1: dither(im, L.cw, L.ch, { cell: 5, pat: c[1][2], on: c[1][0], off: c[1][1] }),
      l2: dither(im, L.cw, L.ch, { cell: 2, pat: c[2][2], on: c[2][0], off: c[2][1] }) };
  }
  const colCache = {};
  function colourNow(name, t) {   // a canvas of the finished ad at this moment (video ads show their current frame)
    const c = colCache[name] || (colCache[name] = canvas(L.cw, L.ch));
    if (VID[name] || !c.done) { c.g.clearRect(0, 0, L.cw, L.ch); const keep = g; g = c.g; drawAd(name, t, 0, 0, L.cw, L.ch); g = keep; c.done = true; }
    return c;
  }

  // ---------- the picked template (precomputed at its grown size) ----------
  const SW = L.cw * L.sc, SH = L.ch * L.sc, S = {};
  function prepare() {
    S.fine = dither(IMG.tpl, SW, SH, { cell: 2, pat: 'bayer8', on: BLUE, off: DK.b });
    S.leg = dither(IMG.cut, SW, SH, { cell: 2, pat: 'dot', on: VIO, mask: (u, v) => v < 0.46 ? 1 : 0, gain: 1.4 });
    S.shoe = dither(IMG.cut, SW, SH, { cell: 2, pat: 'bayer8', on: ORA, mask: (u, v) => v >= 0.46 ? 1 : 0, gain: 1.4 });
    S.text = dither(IMG.tpl, SW, SH, { cell: 2, pat: 'lines', on: LO, gain: 1.6, bias: -0.3, mask: (u, v) => u > 0.54 && v > 0.14 && v < 0.53 ? 1 : 0 });
    S.yours = dither(IMG.out, SW, SH, { cell: 2, pat: 'bayer8', on: ORA, off: DK.v });
    const [, , hw, hh] = L.hub, [, , ow, oh] = L.offer;
    S.h0 = hubCanvas(0, hw, hh); S.h1 = hubCanvas(1, hw, hh); S.h2 = hubCanvas(5, hw, hh); S.offer = offerCanvas(ow, oh);
  }

  // ---------- brand assets box states ----------
  function hubCanvas(nProducts, w, h) {
    const c = canvas(w, h), x = c.g; x.fillStyle = CARD; x.fillRect(0, 0, w, h);
    x.font = `500 ${PHONE ? 20 : 16}px Mono`; x.fillStyle = MUTE; x.letterSpacing = '2px'; x.fillText('BRAND ASSETS', 22, 34);
    x.fillStyle = nProducts ? ORA : VIO; x.fillRect(w - 31, 23, 9, 9);
    drawCover(x, IMG.yb, 22, 52, 56, 56, 28); x.font = `600 ${PHONE ? 32 : 28}px Inter`; x.fillStyle = INK; x.letterSpacing = '-0.5px'; x.fillText('YourBrand', 92, 90);
    ['#1D3A7A', '#C8202F', '#F2EDE4', '#0B0B0B'].forEach((col, n) => { x.beginPath(); x.roundRect(w - 30 - (4 - n) * 40, 62, 32, 32, 8); x.fillStyle = col; x.fill(); });
    const sz = Math.min(PHONE ? 78 : 70, (w - 44 - 40) / 5), y0 = h - sz - 22;
    PRODUCTS.forEach((pr, j) => { const x0 = 22 + j * (sz + 10); x.beginPath(); x.roundRect(x0, y0, sz, sz, 10); x.fillStyle = BG; x.fill(); x.strokeStyle = LINE; x.lineWidth = 1.5; x.stroke();
      if (j < nProducts) { x.save(); x.beginPath(); x.roundRect(x0 + 3, y0 + 3, sz - 6, sz - 6, 8); x.clip(); x.fillStyle = '#F4F2EE'; x.fillRect(x0, y0, sz, sz); drawCover(x, IMG[pr], x0 + 3, y0 + 3, sz - 6, sz - 6, 0); x.restore(); } });
    return c;
  }
  function offerCanvas(w, h) {
    const c = canvas(w, h), x = c.g; x.fillStyle = CARD; x.fillRect(0, 0, w, h); x.textAlign = 'center';
    x.font = `500 ${PHONE ? 22 : 18}px Mono`; x.letterSpacing = '3px'; x.fillStyle = MUTE; x.fillText('BLACK FRIDAY', w / 2, PHONE ? 70 : 52);
    const big = PHONE ? 230 : 180; x.font = `700 ${big}px Inter`; x.letterSpacing = `${-0.05 * big}px`; const tw = x.measureText('50%').width;
    const gr = x.createLinearGradient(w / 2 - tw / 2, 0, w / 2 + tw / 2, 0); gr.addColorStop(0, BLUE); gr.addColorStop(0.5, VIO); gr.addColorStop(1, ORA); x.fillStyle = gr;
    x.fillText('50%', w / 2, PHONE ? 300 : 222);
    x.font = `600 ${PHONE ? 44 : 36}px Inter`; x.letterSpacing = '-1px'; x.fillStyle = INK; x.fillText('off your first month', w / 2, PHONE ? 380 : 282);
    x.font = `500 ${PHONE ? 28 : 23}px Inter`; x.letterSpacing = '0px'; x.fillStyle = MUTE; x.fillText('Every plan · One week only', w / 2, PHONE ? 432 : 322);
    return c;
  }

  // ---------- pieces ----------
  function emptyCard(x, y, w, h, t, i) {   // empty "Your ads" slot: faint moving dither in its own colour
    rr(x, y, w, h, 12); g.fillStyle = CARD; g.fill(); g.save(); g.clip();
    A.ditherField(g, { x, y, w, h, cell: 4, on: dim(comboOf(i)[0][0], 0.45), key: 'emp', field: (u, v) => 0.16 + 0.14 * Math.sin(u * 7 + v * 5 + t * 2 + i) });
    g.restore(); rr(x + 0.5, y + 0.5, w - 1, h - 1, 12); g.strokeStyle = LINE; g.lineWidth = 1.5; g.stroke();
  }
  function decodeCard(name, i, k, x, y, w, h, t) {   // coarse dither -> medium -> tiny -> colour, cell by cell
    g.save(); rr(x, y, w, h, 12); g.clip();
    if (k >= 1) drawAd(name, t, x, y, w, h);
    else { const set = botSet(name, i), s1 = clamp01(k / 0.3), s2 = clamp01((k - 0.3) / 0.3), s3 = clamp01((k - 0.6) / 0.4);
      if (s1 < 1) cells(set.l0, set.l1, s1, x, y, w, h, 11, [0, 1]);
      else if (s2 < 1) cells(set.l1, set.l2, s2, x, y, w, h, 7, [0, 1]);
      else cells(set.l2, colourNow(name, t), s3, x, y, w, h, 5, [0, 1]); }
    g.restore(); rr(x + 0.5, y + 0.5, w - 1, h - 1, 12); g.strokeStyle = k >= 1 ? 'rgba(255,255,255,0.18)' : comboOf(i)[1][0]; g.lineWidth = 1.5; g.stroke();
  }
  const cub = (a, m1, m2, b, k) => { const u = 1 - k; return [0, 1].map(d => u * u * u * a[d] + 3 * u * u * k * m1[d] + 3 * u * k * k * m2[d] + k * k * k * b[d]); };
  const path = (a, b, horiz) => horiz ? [[lerp(a[0], b[0], 0.5), a[1]], [lerp(a[0], b[0], 0.5), b[1]]] : [[a[0], lerp(a[1], b[1], 0.5)], [b[0], lerp(a[1], b[1], 0.5)]];
  const along = (a, b, k, horiz) => { const [m1, m2] = path(a, b, horiz); return cub(a, m1, m2, b, k); };
  function wire(a, b, k, color, wdt = 2, horiz = false) {   // grows from a to b
    if (k <= 0) return; g.save(); g.strokeStyle = color; g.lineWidth = wdt; g.beginPath();
    for (let s = 0; s <= 24; s++) { const q = along(a, b, k * s / 24, horiz); s ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); } g.stroke();
    const e = along(a, b, k, horiz); g.fillStyle = color; g.fillRect(e[0] - 3, e[1] - 3, 6, 6); g.restore();
  }
  const TRAIN = ['#FFFFFF', ORA, BLUE, VIO, ORA];
  function energy(a, b, k, horiz = false, size = 8) {   // a train of square pixels; k runs past 1 so the tail enters the target
    if (k <= 0 || k >= 1.2) return;
    for (let n = 0; n < 5; n++) { const kk = k - n * 0.035; if (kk < 0 || kk > 1) continue; const q = along(a, b, kk, horiz), s = size - n * 1.3;
      g.fillStyle = TRAIN[n]; g.fillRect(q[0] - s / 2, q[1] - s / 2, s, s); }
  }
  const raw = (p, a, b) => (p - a) / (b - a);
  function tag(txt, ax, ay, tx, ty, k, col) {
    if (k <= 0) return; const ex = lerp(ax, tx, SIG(k)), ey = lerp(ay, ty, SIG(k));
    g.save(); g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.moveTo(ax, ay); g.lineTo(ex, ey); g.stroke(); g.fillStyle = INK; g.fillRect(ax - 3, ay - 3, 6, 6);
    if (k >= 1) { g.font = `500 ${L.tagS}px Mono`; g.letterSpacing = '1.5px'; const tw = g.measureText(txt).width + 16, bx = tx < ax ? tx - tw : tx;
      rr(bx, ty - 14, tw, 28, 6); g.fillStyle = col; g.fill(); g.fillStyle = BG; g.fillText(txt, bx + 8, ty + 6); }
    g.restore();
  }
  const cap = (t, text, a, b) => words(g, { text, x: W / 2, y: L.capY, size: L.capS, weight: 600, t, in: a, out: b, solid: true, color: INK, track: -0.03 });
  const label = (txt, x, y) => { g.save(); g.font = `500 ${PHONE ? 20 : 15}px Mono`; g.letterSpacing = '2px'; const tw = g.measureText(txt).width + 18; rr(x, y - 15, tw, 28, 7); g.fillStyle = BG; g.fill(); g.strokeStyle = LINE; g.lineWidth = 1.5; g.stroke(); g.fillStyle = MUTE; g.fillText(txt, x + 9, y + 5); g.restore(); };
  function node(x, y, w, h, title, sc, hot) {
    g.save(); g.translate(x, y); g.scale(sc, sc);
    rr(-w / 2, -h / 2, w, h, 18); g.fillStyle = CARD; g.fill(); g.lineWidth = 1.5; g.strokeStyle = hot ? ORA : LINE; g.stroke();
    g.font = `500 ${PHONE ? 20 : 17}px Mono`; g.fillStyle = INK; g.letterSpacing = '0.5px'; g.fillText(title, -w / 2 + 20, -h / 2 + 32);
    g.fillStyle = INK; g.fillText('Match the layout', -w / 2 + 20, PHONE ? 4 : 6); g.fillText('Swap in your product', -w / 2 + 20, PHONE ? 32 : 34);
    // bolt sits on the title line, right-aligned with the card's inner padding
    const bh = PHONE ? 22 : 20, bs = bh / 26, bx = w / 2 - 20 - 14 * bs, byc = -h / 2 + 32 - (PHONE ? 7 : 6);
    g.save(); g.translate(bx, byc); g.scale(bs, bs); g.fillStyle = hot ? ORA : VIO; g.beginPath();
    g.moveTo(9, -13); g.lineTo(-5, 2); g.lineTo(2, 2); g.lineTo(-1, 13); g.lineTo(13, -2); g.lineTo(6, -2); g.closePath(); g.fill(); g.restore();
    g.restore();
  }

  // ---------- the scene ----------
  function render(t) {
    begin(ctx); g = ctx; const p = t;
    g.fillStyle = BG; g.fillRect(0, 0, W, H);
    g.fillStyle = LINE; const off = (t * 6) % 32; for (let y = 16; y < H; y += 32) for (let x = 16 - off; x < W; x += 32) g.fillRect(x, y, 2, 2);

    const outTop = EXIT(prog(p, 30.0, 30.8)) * (L.top + L.ch * 1.2), outBot = EXIT(prog(p, 30.0, 30.8)) * (H - L.bot + L.ch);
    const ty = L.top - outTop, by = L.bot + outBot, [hx, hy, hw, hh] = L.hub, [kx, ky, kw, kh] = L.skill;
    const kz = grow(p), selW = L.cw * lerp(1, L.sc, kz), selH = L.ch * lerp(1, L.sc, kz), selX = topX(KTOP, p), selTop = ty - L.ch / 2;
    const linesOut = 1 - EXIT(prog(p, 24.8, 25.4));

    // --- wires and energy (under the cards) ---
    const hubTop = [hx, hy - hh / 2], hubBot = [hx, hy + hh / 2], selBot = [selX, selTop + selH];
    const w1 = SIG(prog(p, 9.2, 9.6)) * (1 - SIG(prog(p, 16.2, 16.7)));
    wire(hubTop, selBot, w1, BLUE, 2);
    const sIn = PHONE ? [kx, ky - kh / 2] : [kx - kw / 2, ky], sOut = [kx, ky + kh / 2], hOut = PHONE ? hubBot : [hx + hw / 2, hy], first = [botX(KBOT, p), by - L.ch / 2];
    wire(hOut, sIn, SIG(prog(p, 12.0, 12.5)) * linesOut, VIO, 2, !PHONE);
    wire(sOut, first, SIG(prog(p, 12.4, 13.0)) * linesOut, ORA, 2);
    for (let n = 0; n < 3; n++) {
      energy(hubTop, selBot, raw(p, 9.6 + n * 0.14, 10.0 + n * 0.14));                       // your brand goes up into the template
      energy(selBot, hubTop, raw(p, 12.9 + n * 0.16, 13.3 + n * 0.16));                     // the cut layout comes down into the assets
      energy(hOut, sIn, raw(p, 13.3 + n * 0.16, 13.8 + n * 0.16), !PHONE);
      energy(sOut, first, raw(p, 13.7 + n * 0.16, 14.3 + n * 0.16));
    }

    // --- top: winning ads in full colour, flowing left; the picked one grows in place ---
    const topCards = [];
    for (let i = KTOP - 60; i < KTOP + 60; i++) {
      const x = topX(i, p); if (x < -L.cw * 1.6 || x > W + L.cw * 1.6) continue;
      if (i === KTOP) continue; const cx = x - L.cw / 2, cy = ty - L.ch / 2; topCards.push([x, ty + L.ch / 2, i]);
      g.save(); rr(cx, cy, L.cw, L.ch, 12); g.clip(); drawAd(topName(i), t + i * 0.37, cx, cy, L.cw, L.ch); g.restore();
      rr(cx + 0.5, cy + 0.5, L.cw - 1, L.ch - 1, 12); g.strokeStyle = 'rgba(255,255,255,0.14)'; g.lineWidth = 1.5; g.stroke();
    }
    picked(p, selX - selW / 2, selTop, selW, selH);
    label('WINNING ADS', PHONE ? 30 : 34, ty - L.ch / 2 - 24);

    // fan-in (every winning ad links to the brand assets) and fan-out (assets link down to every empty card)
    topCards.forEach(([x, y, i], n) => { const d0 = 18.4 + Math.min(Math.abs(i - KTOP), 6) * 0.06, k = SIG(prog(p, d0, d0 + 0.8)) * linesOut; if (k > 0) {
      const b = [hx + clamp01((x + L.cw) / (W + 2 * L.cw)) * hw * 0.8 - hw * 0.4, hy - hh / 2]; wire([x, y], b, k, VIO, 1.5); if (k > 0.99) energy([x, y], b, mod(p - 19.2 - n * 0.13, 1.4) / 1.2, false, 6); } });

    // --- bottom: your ads, flowing right ---
    const botCards = [];
    for (let i = KBOT - 60; i < KBOT + 60; i++) {
      const x = botX(i, p); if (x < -L.cw || x > W + L.cw) continue;
      const cx = x - L.cw / 2, cy = by - L.ch / 2; botCards.push({ x, y: cy, i });
      let k = -1; if (i === KBOT) k = prog(p, 14.3, 16.1); else { const d = decodeStart(i); if (d != null) k = prog(p, d, d + 1.1); }
      if (k > 0) decodeCard(botName(i), i, k, cx, cy, L.cw, L.ch, t + i * 0.29); else emptyCard(cx, cy, L.cw, L.ch, t, i);
    }
    botCards.forEach((c, n) => { if (c.i === KBOT) return; const d0 = 19.8 + Math.min(Math.abs(c.i - KBOT), 6) * 0.06, k = SIG(prog(p, d0, d0 + 0.8)) * linesOut; if (k > 0) {
      const a = [hx + clamp01((c.x + L.cw) / (W + 2 * L.cw)) * hw * 0.8 - hw * 0.4, hy + hh / 2], col = n % 2 ? ORA : BLUE; wire(a, [c.x, c.y], k, col, 1.5); if (k > 0.99) energy(a, [c.x, c.y], mod(p - 20.6 - n * 0.17, 1.3) / 1.1, false, 6); } });
    label('YOUR ADS', PHONE ? 30 : 34, by - L.ch / 2 - 24);

    // --- skill node ---
    const skillK = POP(prog(p, 1.4, 1.9)) * (1 - EXIT(prog(p, 25.0, 25.5)));
    if (skillK > 0.001) node(kx, ky, kw, kh, 'Skill · Clone', skillK, p > 13.3 && p < 14.4);

    // --- brand assets box: pops in, changes only by wiping to dither and rendering the new state, becomes the offer ---
    box(t, p);

    // --- captions ---
    cap(t, 'Black Friday at AdRender.', 0.5, 4.0);
    cap(t, 'Pick a winning ad.', 4.4, 7.0);
    cap(t, 'We take it apart.', 7.3, 8.9);
    cap(t, 'Add your brand.', 9.2, 12.6);
    cap(t, 'Get your version.', 13.0, 17.6);
    cap(t, 'Every winning ad. Your brand.', 19.0, 24.8);

    // --- end: the 3D logo with the address ---
    const lk = POP(prog(p, 30.8, 31.5));
    if (lk > 0 && window.Logo3D) {
      Logo3D.draw(g, { cx: W / 2, cy: L.logoY, size: (PHONE ? 300 : 250) * lk, yaw: lerp(-0.9, -0.15, SIG(prog(p, 30.8, 33.5))), pitch: 0.15, light: [lerp(-0.8, 0.7, prog(p, 30.8, 34)), 0.5, 0.8], amb: 0.35, key: 0.8, spec: 0.4, lines: 0.6 });
      words(g, { text: 'AdRender', x: W / 2, y: L.logoY + (PHONE ? 270 : 220), size: PHONE ? 88 : 74, weight: 600, t, in: 31.3, solid: true, color: INK });
      const uk = SIG(prog(p, 31.8, 32.2)); if (uk > 0) { const bw = PHONE ? 480 : 400, bh = PHONE ? 86 : 70, uy = L.logoY + (PHONE ? 320 : 262); g.save(); g.beginPath(); g.rect(0, uy - 4, W, bh + 8); g.clip(); g.translate(0, (1 - uk) * (bh + 8));
        rr(W / 2 - bw / 2, uy, bw, bh, bh / 2); g.fillStyle = INK; g.fill(); g.font = `500 ${PHONE ? 38 : 31}px Inter`; g.fillStyle = BG; g.textAlign = 'center'; g.fillText('adrender.app', W / 2, uy + bh / 2 + 11); g.restore(); }
      words(g, { text: 'Black Friday · 50% off your first month · One week only', x: W / 2, y: L.logoY + (PHONE ? 470 : 390), size: PHONE ? 30 : 26, weight: 500, t, in: 32.2, solid: true, stagger: 0.03, color: MUTE, track: 0 });
    }
  }
  function decodeStart(i) { const rel = i - KBOT; if (rel === 0) return null; const order = rel > 0 ? rel * 2 - 1 : -rel * 2; return 20.6 + order * 0.32; }

  // the picked template: colour -> tiny dither scan -> cut into tagged layers -> your brand scanned in -> back to colour
  function picked(p, x, y, w, h) {
    if (x < -w || x > W + w) return;
    const scan1 = prog(p, 5.2, 6.8), scan2 = prog(p, 10.2, 11.8), scan3 = prog(p, 16.0, 16.8);
    const apart = SIG(prog(p, 7.0, 8.0)) * (1 - SIG(prog(p, 9.4, 10.0)));
    g.save(); rr(x, y, w, h, 12); g.clip();
    drawCover(g, IMG.tpl, x, y, w, h, 0);
    const band = (s, img, fromTop) => { if (s <= 0) return; g.save(); g.beginPath(); fromTop ? g.rect(x, y, w, h * s) : g.rect(x, y + h * (1 - s), w, h * s); g.clip(); img ? g.drawImage(img, x, y, w, h) : drawCover(g, IMG.tpl, x, y, w, h, 0); g.restore(); };
    band(scan1, S.fine, true); band(scan2, S.yours, false); band(scan3, null, true);
    [[scan1, 1], [scan2, -1], [scan3, 1]].forEach(([s, d]) => { if (s <= 0 || s >= 1) return; const ly = d > 0 ? y + h * s : y + h * (1 - s);
      g.fillStyle = '#FFFFFF'; g.fillRect(x, ly - 1.5, w, 3);
      for (let n = 0; n < 70; n++) { g.fillStyle = TRAIN[1 + n % 3]; g.fillRect(x + ((n * 37.7 + p * 900) % w), ly + d * (4 + ((n * 13.1) % 16)), 3, 3); } });
    g.restore();
    const active = (scan1 > 0 && scan1 < 1) || (scan2 > 0 && scan2 < 1) || (scan3 > 0 && scan3 < 1);
    rr(x + 0.5, y + 0.5, w - 1, h - 1, 12); g.strokeStyle = active ? ORA : 'rgba(255,255,255,0.14)'; g.lineWidth = active ? 2.5 : 1.5; g.stroke();
    if (apart > 0) {   // layers lift out of the card in place
      const o = apart * (PHONE ? 22 : 20);
      g.drawImage(S.leg, x - o, y - o, w, h); g.drawImage(S.shoe, x + o * 0.6, y + o, w, h); g.drawImage(S.text, x + o, y - o, w, h);
    }
    const lx = x - L.tagX, rx = x + w + L.tagX, t1 = Math.min(prog(p, 7.8, 8.3), 1 - prog(p, 9.3, 9.6)), t2 = Math.min(prog(p, 11.9, 12.4), 1 - prog(p, 15.5, 15.9));
    const o = apart * (PHONE ? 22 : 20);
    if (t1 > 0) { tag('HEADLINE', x + w * 0.8 + o, y + h * 0.3 - o, rx, y + h * 0.16, t1, LB); tag('LEG', x + w * 0.22 - o, y + h * 0.22 - o, lx, y + h * 0.12, t1, LV); tag('SHOE', x + w * 0.45 + o * 0.6, y + h * 0.72 + o, lx, y + h * 0.86, t1, ORA); }
    if (t2 > 0) { tag('YOUR HEADLINE', x + w * 0.8, y + h * 0.3, rx, y + h * 0.16, t2, LB); tag('YOUR SHOE', x + w * 0.45, y + h * 0.72, lx, y + h * 0.86, t2, ORA); }
  }

  function box(t, p) {
    const [hx, hy, hw, hh] = L.hub, [ox, oy, ow, oh] = L.offer;
    const pop = POP(prog(p, 1.0, 1.5)), gone = EXIT(prog(p, 30.3, 30.9)), sc = pop * (1 - gone);
    if (sc <= 0.001) return;
    const rs = SIG(prog(p, 26.1, 26.6)), w = lerp(hw, ow, rs), h = lerp(hh, oh, rs), cx = lerp(hx, ox, rs), cy = lerp(hy, oy, rs);
    g.save(); g.translate(cx, cy); g.scale(sc, sc); g.translate(-w / 2, -h / 2);
    rr(0, 0, w, h, 20); g.fillStyle = CARD; g.fill(); g.save(); g.clip();
    const swap = (a, b, k, ww, hh2) => { const f = fillCanvas(ww, hh2, t); if (k < 0.5) cells(a, f, k * 2, 0, 0, ww, hh2, 8, [1, 0.3]); else cells(f, b, (k - 0.5) * 2, 0, 0, ww, hh2, 8, [1, 0.3]); };
    const k1 = prog(p, 8.6, 9.3), k2 = prog(p, 19.2, 19.9), k3 = prog(p, 25.6, 26.1), k4 = prog(p, 26.6, 27.2);
    if (p < 8.6) g.drawImage(S.h0, 0, 0, w, h);
    else if (k1 < 1) swap(S.h0, S.h1, k1, w, h);
    else if (p < 19.2) g.drawImage(S.h1, 0, 0, w, h);
    else if (k2 < 1) swap(S.h1, S.h2, k2, w, h);
    else if (p < 25.6) g.drawImage(S.h2, 0, 0, w, h);
    else if (k3 < 1) cells(S.h2, fillCanvas(w, h, t), k3, 0, 0, w, h, 8, [1, 0.3]);
    else if (p < 26.6) fillInto(null, g, w, h, t);
    else cells(fillCanvas(w, h, t), S.offer, k4, 0, 0, w, h, 8, [1, 0.3]);
    g.restore();
    if (p > 26.6) { const gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, BLUE); gr.addColorStop(0.5, VIO); gr.addColorStop(1, ORA); g.strokeStyle = gr; g.lineWidth = 3; }
    else { g.strokeStyle = (k1 > 0 && k1 < 1) || (k2 > 0 && k2 < 1) || p > 25.6 ? ORA : LINE; g.lineWidth = 1.5; }
    rr(0, 0, w, h, 20); g.stroke(); g.restore();
  }

  let ready = false;
  Logo3D.load('/ads/assets/logo3d.json').then(() => AD.start(TOTAL, t => { if (!ready) { prepare(); ready = true; } render(t); }, assets));
})();
