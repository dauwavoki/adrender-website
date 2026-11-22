// "Got something to sell?" ad for AdRender, remade from a reference creator-payments ad.
// A halftone 3D avatar (woman with an afro) hosts six quick scenes with hard cuts, solid motion only:
// hook -> your products -> hundreds of ads in minutes (phone) -> everything handled (dashboard + stamp) ->
// "You sell. We make the ads." -> end card with the site's own numbers.
(function () {
  const A = AD, { PHONE, W, H, SCALE, clamp01, lerp, prog, bezier, ctx: g, begin, IMG, drawCover, words } = A;
  const TOTAL = 19.2;
  // the scenes were built on a 15.4s clock; the voiceover sets the real one. warp(t) maps real time to scene time.
  const WARP = [[0, 0], [2.6, 2.6], [5.3, 4.7], [8.9, 7.4], [11.95, 9.75], [12.9, 10.9], [15.2, 13.2], [16.15, 13.9], [19.2, 15.4]];
  const warp = t => { for (let i = 1; i < WARP.length; i++) if (t <= WARP[i][0]) { const [a, oa] = WARP[i - 1], [b, ob] = WARP[i]; return oa + (ob - oa) * (t - a) / (b - a); } return 15.4; };
  // mouth follows the voiceover loudness (25 values per second, 0-9)
  const ENV = '000000000001000000000000023310122002101110012332211000000000000000000001116644455200000011356643222000000477992069999400644422100000000057797559996555111366416102320221111155742642162213332211100000000599867973110000000000000000123999996357733111000000000117989436997543341000089921154100443222211000018853221110000000000000001247920079997544200001125666552003334321110000000000000000079981134321222110000000999910004654642055300068762236433443124331013220000000000000000000000000';
  const voice = t => { const f = t * 25, i = Math.floor(f), a = +(ENV[i] || 0), b = +(ENV[i + 1] || 0); return (a + (b - a) * (f - i)) / 9; };
  let REAL = 0;
  const BLUE = '#3F7FF2', INK = '#0E0E10', GREY = '#6E6E76', PAPER = '#FFFFFF', LIGHT = '#F2F2F4';
  const SIG = bezier(0.2, 0, 0, 1), POP = bezier(0.34, 1.35, 0.64, 1), EXIT = bezier(0.3, 0, 1, 1), SNAP = bezier(0.1, 0.9, 0.2, 1);
  const SC = [0, 2.6, 4.7, 7.4, 10.9, 13.2, TOTAL];   // scene starts
  const scene = t => { let i = 0; while (i < 5 && t >= SC[i + 1]) i++; return i; };
  const rr = (x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
  const font = (w, s, fam = 'Inter', it = false) => `${it ? 'italic ' : ''}${w} ${s}px ${fam}`;
  function text(str, x, y, o = {}) { g.save(); g.font = font(o.w || 600, o.s || 40, o.f || 'Inter', o.it); g.letterSpacing = `${(o.tr ?? -0.02) * (o.s || 40)}px`; g.fillStyle = o.c || INK; g.textAlign = o.al || 'left'; g.fillText(str, x, y); const m = g.measureText(str).width; g.restore(); return m; }
  const mono = (str, x, y, s, c = GREY, al = 'left') => text(str, x, y, { w: 500, s, f: 'Mono', c, tr: 0.02, al });
  // a word written in from left to right (clip wipe), for the italic accents
  function written(str, x, y, s, t, a, dur = 0.5, c = BLUE) {
    const k = SIG(prog(t, a, a + dur)); if (k <= 0) return; g.save(); g.font = font(400, s, 'Newsreader', true); g.letterSpacing = `${-0.01 * s}px`;
    const w = g.measureText(str).width; g.beginPath(); g.rect(x - s * 0.2, y - s * 1.1, (w + s * 0.5) * k, s * 1.5); g.clip(); g.fillStyle = c; g.fillText(str, x, y); g.restore(); return w;
  }
  const slide = (str, x, y, s, t, a, o = {}) => words(g, Object.assign({ text: str, x, y, size: s, weight: 600, t, in: a, solid: true, color: INK, align: 'left', track: -0.035 }, o));

  // ---------- halftone helpers ----------
  const htCache = {}, sc = document.createElement('canvas'), sg = sc.getContext('2d', { willReadFrequently: true });
  function halftone(key, im, w, h, cell, o = {}) {   // photo -> black dots on paper (cached)
    if (htCache[key]) return htCache[key];
    const cols = Math.round(w / cell), rows = Math.round(h / cell); sc.width = cols; sc.height = rows; sg.fillStyle = '#fff'; sg.fillRect(0, 0, cols, rows);
    if (o.contain) { const r = Math.min(cols / im.width, rows / im.height) * (o.zoom || 1); sg.drawImage(im, (cols - im.width * r) / 2, (rows - im.height * r) / 2 + (o.dy || 0) * rows, im.width * r, im.height * r); } else drawCover(sg, im, 0, 0, cols, rows, 0);
    const d = sg.getImageData(0, 0, cols, rows).data, c = document.createElement('canvas'); c.width = Math.round(w * SCALE); c.height = Math.round(h * SCALE);
    const x = c.getContext('2d'); x.scale(SCALE, SCALE); x.fillStyle = o.paper || '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = o.ink || INK;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const k = (j * cols + i) * 4, L = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255, ink = Math.pow(1 - L, o.gamma || 0.9);
      if (ink > 0.04) { x.beginPath(); x.arc((i + 0.5) * w / cols, (j + 0.5) * h / rows, Math.min(0.72, 0.5 * Math.sqrt(ink) * 1.3) * w / cols, 0, Math.PI * 2); x.fill(); } }
    return htCache[key] = c;
  }

  // ---------- avatar choreography ----------
  const BLINKS = [1.15, 3.9, 5.9, 8.6, 11.0, 12.9, 13.9];
  function blinkAt(t) { let b = 0; for (const s of BLINKS) b = Math.max(b, 1 - Math.abs(t - s) / 0.08); return clamp01(b); }
  function talk(t, a, b, rate = 9) { if (t < a || t > b) return 0; const e = Math.min(1, (t - a) / 0.08, (b - t) / 0.08); return e * (0.35 + 0.35 * Math.sin((t - a) * rate) + 0.2 * Math.sin((t - a) * rate * 2.3)); }
  function pose(t) {
    const b = blinkAt(t), p = { t, blinkL: b, blinkR: b, smile: 1, open: 0, yaw: 0, pitch: 0, roll: 0, brow: 0, lookX: 0, lookY: 0, bodyYaw: 0 };
    p.yaw = 0.06 * Math.sin(t * 1.3); p.roll = 0.03 * Math.sin(t * 0.9 + 1); p.pitch = 0.03 * Math.sin(t * 1.1);
    const s = scene(t);
    if (s === 0) { p.yaw += lerp(0.0, 0.32, SIG(prog(t, 1.2, 1.6))); p.lookX = lerp(0, -1, SIG(prog(t, 1.2, 1.5))); p.brow = 0.5 * SIG(prog(t, 2.0, 2.2)); p.smile = 1 + 0.4 * SIG(prog(t, 2.0, 2.3)); }
    if (s === 1) { const w = Math.max(0, 1 - Math.abs(t - 3.05) / 0.28); p.blinkR = Math.max(p.blinkR, clamp01(w * 1.6)); p.smile = 1.5; p.yaw += -0.32 * SIG(prog(t, 3.3, 3.6)); p.lookX = 1; p.brow = 0.3; }
    if (s === 2) { p.yaw += -0.28; p.lookX = 1; p.lookY = 0.2; p.smile = 1.2; }
    if (s === 3) { p.smile = 1.1; }
    if (s === 4) { p.yaw += 0.3; p.lookX = -1; p.smile = 1.2; }
    if (s === 5) { p.smile = 1.4; p.brow = 0.3 * SIG(prog(t, 14.2, 14.4)); const w = Math.max(0, 1 - Math.abs(t - 14.55) / 0.3); p.blinkL = Math.max(p.blinkL, clamp01(w * 1.6)); }
    p.open = Math.min(1, voice(REAL) * 1.1);
    return p;
  }
  function avatar(x, y, w, cell, t, o = {}) { Avatar.draw(g, { x, y: y + (o.bob === false ? 0 : Math.sin(t * 2.1) * w * 0.006), w, cell, pose: Object.assign(pose(t), o.pose || {}), paper: o.paper, ink: o.ink }); }
  const AH = w => w * Avatar.ASPECT;

  // ---------- chrome: scene tag and timecode ----------
  const TAGS = ['// 01 — hook', '// 02 — anything', '// 03 — ads', '// 04 — handled', '// 05 — flow', '// 06 — adrender'];
  function chrome(t, dark, st) {
    const s = PHONE ? 26 : 17, y = PHONE ? 76 : 46, mx = PHONE ? 60 : 40, f = Math.floor(t * 25), tc = `00:00:${String(Math.floor(t)).padStart(2, '0')}:${String(f % 25).padStart(2, '0')}`;
    const c = dark === 'blue' ? '#DCE7FF' : dark ? '#8A8A92' : '#9A9AA2'; mono(TAGS[scene(st)], mx, y, s, c); mono('ADRENDER   ' + tc, W - mx, y, s, c, 'right');
  }

  // ---------- scenes ----------
  function s1(t) {   // hook
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    const L = PHONE ? { x: 80, tag: 330, l1: 480, l2: 640, s: 124, as: 176, av: [20, 770, 1040, 7] } : { x: 150, tag: 330, l1: 470, l2: 640, s: 108, as: 156, av: [1040, 205, 720, 6] };
    const [ax, ay, aw, ac] = L.av, rise = (1 - SIG(prog(t, 0, 0.55))) * AH(aw) * 0.5;
    avatar(ax, ay + rise, aw, ac, t);
    // "pss" bubble pops out next to her mouth
    const bk = POP(prog(t, 0.3, 0.5)) * (1 - SIG(prog(t, 0.95, 1.1))); if (bk > 0.01) {
      const bx = ax + aw * (PHONE ? 0.08 : 0.06), by = ay + AH(aw) * 0.44 + rise, bw = PHONE ? 130 : 96, bh = PHONE ? 60 : 44;
      g.save(); g.translate(bx + bw, by); g.scale(bk, bk); rr(-bw, -bh / 2, bw, bh, bh / 2); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 2; g.strokeStyle = INK; g.stroke();
      g.beginPath(); g.moveTo(-6, -6); g.lineTo(16, 0); g.lineTo(-6, 6); g.fill(); g.stroke(); mono('pss', -bw / 2, bh * 0.18, PHONE ? 26 : 19, INK, 'center'); g.restore(); }
    if (t > 0.85) mono('// for sellers', L.x, L.tag, PHONE ? 30 : 22, GREY);
    slide('Got something', L.x, L.l1, L.s, t, 0.95);
    slide('to', L.x, L.l2, L.s, t, 1.35);
    const tw = A.measure('to ', L.s, 600, 'Inter', false, -0.035);
    written('sell?', L.x + tw + 6, L.l2 + 6, L.as, t, 1.55, 0.55);
  }

  const PRODUCTS = [['shoe-product', 'Trail runner', '$129'], ['compression-vest', 'Compression vest', '$59'], ['recovery-slides', 'Recovery slides', '$35']];
  function productCard(n, x, y, w, h, rot, k) {
    if (k <= 0) return; const [img, name, price] = PRODUCTS[n], dx = (1 - k) * W * 0.45;
    g.save(); g.translate(x + w / 2 + dx, y + h / 2); g.rotate(rot * (1 - 0.2 * k)); g.translate(-w / 2, -h / 2);
    rr(0, 0, w, h, 18); g.fillStyle = '#fff'; g.fill();
    const s = PHONE ? 20 : 16, pad = PHONE ? 20 : 18; mono('// product', pad, pad + s, s, '#8A8A92'); mono('0' + (n + 1), w - pad, pad + s, s, '#8A8A92', 'right');
    const iw = w - pad * 2, ih = h * 0.5; g.drawImage(halftone('p' + n + PHONE, IMG[img], iw, ih, PHONE ? 5 : 4, { contain: true, zoom: 0.95 }), pad, pad * 2 + s, iw, ih);
    text(name, pad, h - pad - (PHONE ? 46 : 38), { s: PHONE ? 31 : 28, w: 600, tr: -0.03 }); mono(price, pad, h - pad - 6, PHONE ? 22 : 18, '#8A8A92');
    g.restore();
  }
  function s2(t) {   // your products
    g.fillStyle = BLUE; g.fillRect(0, 0, W, H);
    const L = PHONE ? { av: [40, 930, 1000, 7], cards: [[45, 300], [385, 300], [725, 300]], cw: 310, ch: 455 } : { av: [40, 260, 720, 6], cards: [[820, 160], [1170, 170], [1520, 180]], cw: 330, ch: 480 };
    const [ax, ay, aw, ac] = L.av; avatar(ax, ay, aw, ac, t);
    L.cards.forEach(([x, y], n) => productCard(n, x, y, L.cw, L.ch, [0, 0.02, 0.05][n], SIG(prog(t, 2.8 + n * 0.38, 3.3 + n * 0.38))));
    if (PHONE) slide('Anything you sell.', 60, 880, 80, t, 3.9, { color: '#fff' });
    else slide('Anything you sell.', 820, 800, 76, t, 3.9, { color: '#fff' });
  }

  const LIB = [['ad-05', 'Run Fast · 4:5', 'Image ad · 1080×1350'], ['vad-02', 'Gear Up · 9:16', 'Video ad · 0:12'], ['ad-08', 'The Drop · 1:1', 'Image ad · 1080×1080']];
  function phoneMock(x, y, w, h, t) {
    const r = w * 0.13, bez = w * 0.035; rr(x, y, w, h, r); g.fillStyle = INK; g.fill();
    const sx = x + bez, sy = y + bez, sw = w - bez * 2, sh = h - bez * 2; g.save(); rr(sx, sy, sw, sh, r - bez); g.clip(); g.fillStyle = '#fff'; g.fillRect(sx, sy, sw, sh);
    const hh = sh * 0.3; g.fillStyle = BLUE; g.fillRect(sx, sy, sw, hh);
    const u = sw / 440; // design unit
    text('9:41', sx + 26 * u, sy + 34 * u, { s: 16 * u, c: '#fff', w: 600 }); rr(sx + sw / 2 - 52 * u, sy + 12 * u, 104 * u, 28 * u, 14 * u); g.fillStyle = INK; g.fill();
    rr(sx + 18 * u, sy + 56 * u, sw - 36 * u, 34 * u, 17 * u); g.fillStyle = 'rgba(255,255,255,0.18)'; g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(sx + 36 * u, sy + 73 * u, 5 * u, 0, 7); g.fill(); mono('yourbrand · adrender.app', sx + 50 * u, sy + 79 * u, 15 * u, '#fff');
    rr(sx + sw - 70 * u, sy + 61 * u, 46 * u, 24 * u, 12 * u); g.fillStyle = '#fff'; g.fill(); mono('LIVE', sx + sw - 47 * u, sy + 78 * u, 12 * u, BLUE, 'center');
    g.save(); g.beginPath(); g.arc(sx + sw / 2, sy + 150 * u, 40 * u, 0, 7); g.fillStyle = '#fff'; g.fill(); g.clip(); drawCover(g, IMG.yb, sx + sw / 2 - 38 * u, sy + 112 * u, 76 * u, 76 * u, 38 * u); g.restore();
    text('Your ads', sx + sw / 2, sy + 222 * u, { s: 24 * u, c: '#fff', al: 'center' });
    text('Ready', sx + 24 * u, sy + hh + 44 * u, { s: 19 * u, w: 600 }); mono(`${LIB.length} ads`, sx + sw - 24 * u, sy + hh + 44 * u, 13 * u, GREY, 'right');
    LIB.forEach(([img, name, sub], n) => {
      const k = SIG(prog(t, 5.25 + n * 0.16, 5.6 + n * 0.16)); if (k <= 0) return;
      const ry = sy + hh + 70 * u + n * 112 * u + (1 - k) * 40 * u; g.save(); g.beginPath(); g.rect(sx, sy + hh + 56 * u, sw, sh); g.clip();
      g.drawImage(halftone('lib' + n + PHONE, IMG[img], 84 * u, 96 * u, PHONE ? 3.4 : 3), sx + 24 * u, ry, 84 * u, 96 * u);
      text(name, sx + 124 * u, ry + 30 * u, { s: 17 * u, w: 600 }); mono(sub, sx + 124 * u, ry + 52 * u, 12 * u, GREY);
      const saved = n === 0 && t > 6.75, bw = 108 * u, bx = sx + 124 * u, by = ry + 64 * u; rr(bx, by, bw, 28 * u, 14 * u); g.fillStyle = saved ? BLUE : INK; g.fill();
      text(saved ? 'Saved ✓' : 'Download', bx + bw / 2, by + 19 * u, { s: 13 * u, c: '#fff', al: 'center', w: 600 }); g.restore();
      if (n === 0) phoneMock.btn = [bx + bw * 0.6, by + 20 * u];
    });
    g.restore();
    // cursor taps the first Download
    const ck = SIG(prog(t, 6.1, 6.65)); if (ck > 0 && phoneMock.btn) { const [tx, ty] = phoneMock.btn, cx = lerp(x + w * 1.1, tx, ck), cy = lerp(y + h * 0.95, ty, ck), s = (t > 6.7 && t < 6.85 ? 0.85 : 1) * (PHONE ? 1.6 : 1.3);
      g.save(); g.translate(cx, cy); g.scale(s, s); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 26); g.lineTo(7, 20); g.lineTo(12, 31); g.lineTo(17, 29); g.lineTo(12, 18); g.lineTo(21, 18); g.closePath(); g.fillStyle = INK; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke(); g.restore(); }
  }
  function s3(t) {   // hundreds of ads in minutes
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    const L = PHONE ? { x: 80, l0: 300, l1: 440, l2: 580, s: 108, as: 150, ph: [470, 720, 540, 1100], av: [-60, 1160, 640, 6] } : { x: 110, l0: 330, l1: 480, l2: 620, s: 104, as: 146, ph: [1180, 70, 470, 960], av: [540, 580, 520, 5] };
    const [ax, ay, aw, ac] = L.av; avatar(ax, ay, aw, ac, t);
    const [px, py, pw, ph] = L.ph, up = (1 - SIG(prog(t, 4.75, 5.25))) * (H - py + 40); phoneMock(px, py + up, pw, ph, t);
    const s0 = PHONE ? 46 : 44; if (t > 4.8) { const w = text('AdRender', L.x, L.l0, { s: s0, w: 700, tr: -0.03 }); slide('turns it into', L.x + w + s0 * 0.3, L.l0, s0, t, 4.85, { weight: 400, color: GREY, track: -0.02 }); }
    slide('hundreds of ads', L.x, L.l1, L.s, t, 5.1);
    const iw = A.measure('in ', L.s, 600, 'Inter', false, -0.035); slide('in', L.x, L.l2, L.s, t, 5.45);
    written('minutes.', L.x + iw + 4, L.l2 + 6, L.as, t, 5.65, 0.6);
  }

  // dashboard cards
  const FMT = [[1, 1], [4, 5], [9, 16], [16, 9], [1.91, 1], [2, 3], [3, 4], [4, 3], [1, 2], [5, 4], [21, 9]];
  function card(x, y, w, h, label, k, body) {
    if (k <= 0) return; const s = lerp(0.94, 1, POP(k)); g.save(); g.translate(x + w / 2, y + h / 2); g.scale(s, s); g.translate(-w / 2, -h / 2);
    rr(0, 0, w, h, 18); g.fillStyle = '#fff'; g.fill(); g.strokeStyle = '#E4E4E8'; g.lineWidth = 1.5; g.stroke();
    const ls = PHONE ? 20 : 16; mono(label, 22, 22 + ls, ls, '#8A8A92'); g.beginPath(); g.rect(0, 0, w, h); g.clip(); body(w, h); g.restore();
  }
  function s4(t) {   // everything handled
    g.fillStyle = LIGHT; g.fillRect(0, 0, W, H);
    const top = PHONE ? 120 : 76, m = PHONE ? 40 : 40, gap = PHONE ? 20 : 16, cols = PHONE ? 2 : 3, rows = PHONE ? 3 : 2;
    const cw = (W - m * 2 - gap * (cols - 1)) / cols, ch = (H - top - m - gap * (rows - 1)) / rows, U = PHONE ? 1.25 : 1;
    const at = (n) => [m + (n % cols) * (cw + gap), top + Math.floor(n / cols) * (ch + gap)], ap = n => prog(t, 7.4 + n * 0.07, 7.75 + n * 0.07);
    const order = PHONE ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5];
    // 1 winning template
    let [x, y] = at(order[0]); card(x, y, cw, ch, '// template', ap(0), (w, h) => {
      const iw = Math.min(w * 0.42, h * 0.62), ih = iw * 1.25; g.drawImage(halftone('tpl' + PHONE, IMG.tpl, iw, ih, 3), 22, 64 * U, iw, ih);
      text('Winning ad', 22 + iw + 22, 96 * U, { s: 30 * U, w: 600 }); mono('from 100M+ real ads', 22 + iw + 22, 124 * U, 15 * U);
      const k = SIG(prog(t, 8.1, 8.4)); rr(22 + iw + 22, 150 * U, 120 * U, 40 * U, 20 * U); g.fillStyle = k > 0.5 ? BLUE : INK; g.fill(); text(k > 0.5 ? 'Picked ✓' : 'Pick', 22 + iw + 22 + 60 * U, 176 * U, { s: 16 * U, c: '#fff', al: 'center', w: 600 }); });
    // 2 on air (the avatar herself)
    [x, y] = at(order[1]); card(x, y, cw, ch, '// on air', ap(1), (w, h) => {
      const on = Math.floor(t * 2) % 2 === 0; g.fillStyle = on ? BLUE : '#BFD3FB'; g.beginPath(); g.arc(w - 30, 32 * U, 7, 0, 7); g.fill();
      const aw = Math.min(w * 0.62, h * 0.8 / Avatar.ASPECT); g.save(); g.translate(-x, -y); avatar(x + (w - aw) / 2, y + h - AH(aw) * 0.86, aw, PHONE ? 4 : 3.5, t); g.restore(); });
    // 3 ads made: counter, timer, bars
    [x, y] = at(order[2]); card(x, y, cw, ch, '// ads made', ap(2), (w, h) => {
      const k = bezier(0.3, 0, 0.2, 1)(prog(t, 7.9, 9.7)), n = Math.round(248 * k), secs = Math.round(532 * k);
      text(String(n), 22, 112 * U, { s: 82 * U, w: 700, tr: -0.05 }); const nw = A.measure(String(n), 82 * U, 700, 'Inter', false, -0.05); text('ads', 22 + nw + 10, 112 * U, { s: 30 * U, w: 500, c: GREY });
      mono(`in ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')} min`, 22, 146 * U, 16 * U);
      const bw = (w - 44) / 12 - 6, base = h - 26; for (let i = 0; i < 12; i++) { const bk = SIG(prog(t, 8.0 + i * 0.12, 8.5 + i * 0.12)), bh = (h * 0.36) * (0.35 + 0.65 * ((i * 37) % 11) / 10) * bk;
        if (bh > 1) { g.fillStyle = i % 3 === 2 ? BLUE : INK; for (let yy = base - bh; yy < base; yy += 6) for (let xx = 0; xx < bw; xx += 6) if ((yy - (base - bh)) / bh < 0.35 + 0.65 * ((xx + yy) % 12 < 6 ? 1 : 0.6)) g.fillRect(22 + i * (bw + 6) + xx, yy, 4, 4); } } });
    // 4 brand kit
    [x, y] = at(order[3]); card(x, y, cw, ch, '// brand kit', ap(3), (w, h) => {
      drawCover(g, IMG.yb, 22, 62 * U, 52 * U, 52 * U, 26 * U); text('YourBrand', 22 + 64 * U, 98 * U, { s: 30 * U, w: 600 });
      ['#1D3A7A', '#C8202F', '#F2EDE4', '#0B0B0B'].forEach((c, i) => { rr(22 + i * 44 * U, 134 * U, 34 * U, 34 * U, 8 * U); g.fillStyle = c; g.fill(); g.strokeStyle = '#E4E4E8'; g.stroke(); });
      ['Logo', 'Colors', 'Products', 'Voice'].forEach((s, i) => { const yy = 206 * U + i * 34 * U; if (yy > h - 16) return; const on = t > 8.1 + i * 0.28;
        rr(22, yy - 18 * U, 22 * U, 22 * U, 6 * U); g.fillStyle = on ? BLUE : '#fff'; g.fill(); g.strokeStyle = on ? BLUE : '#C8C8CE'; g.lineWidth = 1.5; g.stroke();
        if (on) { g.strokeStyle = '#fff'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(27, yy - 7 * U); g.lineTo(32 * U, yy - 2 * U); g.lineTo(40 * U, yy - 13 * U); g.stroke(); }
        text(s, 22 + 34 * U, yy, { s: 18 * U, w: 500, c: on ? INK : GREY }); }); });
    // 5 formats
    [x, y] = at(order[4]); card(x, y, cw, ch, '// formats', ap(4), (w, h) => {
      text('11', 22, 112 * U, { s: 82 * U, w: 700, tr: -0.05 }); text('formats', 22 + A.measure('11', 82 * U, 700, 'Inter', false, -0.05) + 10, 112 * U, { s: 30 * U, w: 500, c: GREY }); mono('every platform', 22, 146 * U, 16 * U);
      const unit = Math.min((w - 44) / 6.4, (h - 190 * U) / 2.4); let cx = 22, cy = 176 * U;
      FMT.forEach(([a, b], i) => { const s = unit * 0.82 / Math.max(a, b), fw = a * s, fh = b * s; if (cx + unit > w - 10) { cx = 22; cy += unit * 1.15; }
        const on = t > 8.0 + i * 0.13; rr(cx + (unit - fw) / 2, cy + (unit - fh) / 2, fw, fh, 4); g.fillStyle = on ? BLUE : '#fff'; g.fill(); g.strokeStyle = on ? BLUE : '#C8C8CE'; g.lineWidth = 1.5; g.stroke(); cx += unit * 1.05; }); });
    // 6 plan
    [x, y] = at(order[5]); card(x, y, cw, ch, '// plan', ap(5), (w, h) => {
      text('$19', 22, 120 * U, { s: 96 * U, w: 700, tr: -0.05 }); text('/ month', 22 + A.measure('$19', 96 * U, 700, 'Inter', false, -0.05) + 10, 120 * U, { s: 28 * U, w: 500, c: GREY });
      mono('to start', 22, 156 * U, 16 * U); mono('free to try · no card needed', 22, h - 28, 15 * U, BLUE); });
    // the stamp
    const sk = prog(t, 9.75, 10.0); if (sk > 0) {
      const s = lerp(1.9, 1, SNAP(sk)), size = PHONE ? 230 : 250; g.save(); g.translate(W / 2, H * (PHONE ? 0.52 : 0.55)); g.rotate(-0.13); g.scale(s, s);
      g.font = font(400, size, 'Newsreader', true); g.letterSpacing = `${-0.01 * size}px`; const tw = g.measureText('Handled.').width, bh = size * 1.0;
      g.lineWidth = PHONE ? 9 : 8; g.strokeStyle = BLUE; rr(-tw / 2 - size * 0.22, -bh * 0.72, tw + size * 0.44, bh * 1.04, 26); g.stroke();
      g.lineWidth = 3; rr(-tw / 2 - size * 0.3, -bh * 0.8, tw + size * 0.6, bh * 1.2, 34); g.stroke();
      g.fillStyle = BLUE; g.textAlign = 'center'; g.fillText('Handled.', 0, size * 0.18); g.restore(); }
  }
  function s5(t) {   // you sell, we make the ads
    g.fillStyle = '#0A0A0B'; g.fillRect(0, 0, W, H);
    const L = PHONE ? { x: 80, l1: 470, l2: 620, s: 150, s2: 104, av: [160, 860, 1000, 7] } : { x: 120, l1: 470, l2: 640, s: 150, s2: 112, av: [1200, 330, 640, 5] };
    const [ax, ay, aw, ac] = L.av; avatar(ax, ay, aw, ac, t);
    const yw = A.measure('You ', L.s, 600, 'Inter', false, -0.035); slide('You', L.x, L.l1, L.s, t, 11.0, { color: '#fff' });
    written('sell.', L.x + yw, L.l1 + 6, L.s * 1.22, t, 11.2, 0.5, '#fff');
    slide('We make the ads.', L.x, L.l2, L.s2, t, 11.8, { color: '#8E8E96' });
  }
  function s6(t) {   // end card
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    const L = PHONE ? { wy: 1040, ws: 200, aw: 500, tag: 1130, ts: 40, btn: 1260, stats: 1780 } : { wy: 600, ws: 190, aw: 380, tag: 690, ts: 34, btn: 800, stats: 1010 };
    // she rises from behind the wordmark
    const aw = L.aw, rise = SIG(prog(t, 13.3, 13.75)), base = L.wy - L.ws * 0.62, ay = base - AH(aw) * 0.62 * rise;
    g.save(); g.beginPath(); g.rect(0, 0, W, base + 2); g.clip(); avatar(W / 2 - aw / 2, ay, aw, PHONE ? 5 : 4, t, { bob: false }); g.restore();
    text('AdRender', W / 2, L.wy, { s: L.ws, w: 700, tr: -0.05, al: 'center' });
    // tagline with the site's line, accent written in
    if (t > 13.55) { const a = 'Hundreds of ads for your brand,', b = ' in under 10 minutes.'; g.save(); g.font = font(400, L.ts); g.letterSpacing = `${-0.01 * L.ts}px`; const aw2 = g.measureText(a).width; g.font = font(400, L.ts * 1.12, 'Newsreader', true); const bw = g.measureText(b).width; g.restore();
      const x0 = W / 2 - (aw2 + bw) / 2; if (PHONE) { text(a, W / 2, L.tag, { s: L.ts, w: 400, c: GREY, al: 'center', tr: -0.01 }); const bw2 = A.measure('in under 10 minutes.', L.ts * 1.12, 400, 'Newsreader', true, -0.01); written('in under 10 minutes.', W / 2 - bw2 / 2, L.tag + L.ts * 1.35, L.ts * 1.12, t, 13.7, 0.5, INK); }
      else { text(a, x0, L.tag, { s: L.ts, w: 400, c: GREY, tr: -0.01 }); written(b, x0 + aw2, L.tag, L.ts * 1.12, t, 13.7, 0.5, INK); } }
    const bk = POP(prog(t, 13.9, 14.2)); if (bk > 0) { const bw = PHONE ? 260 : 200, bh = PHONE ? 76 : 58, gapx = PHONE ? 26 : 20, uw = A.measure('adrender.app', PHONE ? 30 : 23, 500, 'Mono', false, 0.02), tot = bw + gapx + uw, x0 = W / 2 - tot / 2, by = PHONE ? L.btn + 80 : L.btn;
      g.save(); g.translate(x0 + bw / 2, by); g.scale(bk, bk); rr(-bw / 2, -bh / 2, bw, bh, bh / 2); g.fillStyle = BLUE; g.fill(); text('Start free', 0, bh * 0.15, { s: PHONE ? 30 : 23, c: '#fff', al: 'center', w: 600 }); g.restore();
      mono('adrender.app', x0 + bw + gapx, by + (PHONE ? 10 : 8), PHONE ? 30 : 23, INK); }
    if (t > 14.2) mono('100M+ ads benchmarked  ·  11 formats  ·  $19 to start', W / 2, L.stats, PHONE ? 24 : 18, '#8A8A92', 'center');
  }

  const SCENES = [s1, s2, s3, s4, s5, s6];
  function render(rt) { begin(g); REAL = rt; const t = warp(rt), s = scene(t); SCENES[s](t); chrome(rt, s === 1 ? 'blue' : s === 4, t); }
  const assets = { yb: '/showcase/yourbrand-logo.webp', tpl: '/showcase/shoe-template.webp', 'shoe-product': '/showcase/shoe-product.webp', 'compression-vest': '/showcase/compression-vest.webp', 'recovery-slides': '/showcase/recovery-slides.webp', 'ad-05': '/showcase/ad-05.webp', 'vad-02': '/showcase/vad-02.webp', 'ad-08': '/showcase/ad-08.webp' };
  AD.start(TOTAL, render, assets);
})();
