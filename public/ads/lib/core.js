// AdRender ad engine: shared helpers for the coded Black Friday ads.
// Page contract (render.mjs): canvas #c, window.renderAt(t), window.TOTAL, window.ready, ?t= (still), ?scale=.
// ?view=phone gives a tall 1080x1920 frame, otherwise wide 1920x1080. ?controls=1 adds a small player bar.
(function () {
  const q = new URLSearchParams(location.search);
  const VIEW = q.get('view') === 'phone' ? 'phone' : 'desktop';
  const PHONE = VIEW === 'phone';
  const W = PHONE ? 1080 : 1920, H = PHONE ? 1920 : 1080;
  const SCALE = parseFloat(q.get('scale') || '1');
  const RENDER = q.has('t');   // frame-by-frame render (video export): spend more effort per frame

  // ---------- maths and easing ----------
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const prog = (t, a, b) => clamp01((t - a) / (b - a));
  const outExpo = k => (k = clamp01(k)) >= 1 ? 1 : 1 - Math.pow(2, -10 * k);
  const inOutCubic = k => { k = clamp01(k); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const outCubic = k => 1 - Math.pow(1 - clamp01(k), 3);
  const sine = k => 0.5 - 0.5 * Math.cos(Math.PI * clamp01(k));
  // cubic-bezier(x1,y1,x2,y2) like CSS. Motion-system curves:
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = u => ((ax * u + bx) * u + cx) * u, sy = u => ((ay * u + by) * u + cy) * u, dx = u => (3 * ax * u + 2 * bx) * u + cx;
    return k => { k = clamp01(k); let u = k; for (let i = 0; i < 8; i++) { const e = sx(u) - k, d = dx(u); if (Math.abs(e) < 1e-5 || Math.abs(d) < 1e-6) break; u -= e / d; } return sy(clamp01(u)); };
  }
  const EASE = {
    premium: bezier(0.16, 1, 0.3, 1),      // long, calm settle (Premium archetype)
    standard: bezier(0.2, 0, 0, 1),        // enter / move
    exit: bezier(0.3, 0, 1, 1),            // leave
    energetic: bezier(0.34, 1.2, 0.64, 1), // small overshoot, used sparingly
    inOut: bezier(0.65, 0, 0.35, 1),
  };
  // 1/3 rule: in a sequence, each element starts when the one before is a third of the way through.
  const third = (t, start, dur, i) => prog(t, start + i * dur / 3, start + i * dur / 3 + dur);

  // ---------- canvas ----------
  const cv = document.getElementById('c');
  cv.width = W * SCALE; cv.height = H * SCALE;
  const ctx = cv.getContext('2d');
  const mk = (w = W, h = H, s = SCALE) => { const c = document.createElement('canvas'); c.width = Math.round(w * s); c.height = Math.round(h * s); return c; };
  function begin(g = ctx) { g.setTransform(SCALE, 0, 0, SCALE, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.globalCompositeOperation = 'source-over'; }

  // ---------- assets ----------
  const IMG = {};
  function load(map) {
    return Promise.all(Object.entries(map).map(([k, src]) => new Promise(res => { const im = new Image(); im.onload = () => { IMG[k] = im; res(); }; im.onerror = () => { console.warn('missing', src); res(); }; im.src = src; })));
  }
  const FONTS = ['600 40px Inter', '500 40px Inter', '400 40px Inter', '700 40px Inter', 'italic 400 40px Newsreader', '400 40px Newsreader', '500 20px Mono'];
  const fontsReady = () => Promise.all(FONTS.map(f => document.fonts.load(f).catch(() => {})));

  // cover / contain image drawing
  function drawCover(g, im, x, y, w, h, r = 0, ax = 0.5, ay = 0.5) {
    if (!im) return; g.save(); if (r) { g.beginPath(); g.roundRect(x, y, w, h, r); g.clip(); }
    const s = Math.max(w / im.width, h / im.height), iw = im.width * s, ih = im.height * s;
    g.drawImage(im, x + (w - iw) * ax, y + (h - ih) * ay, iw, ih); g.restore();
  }

  // ---------- text: word by word, blur to sharp with a small rise ----------
  // spec: {text, x, y, size, weight, font, color, align, t, in, out, stagger, grad:[top,bottom], italic}
  function words(g, s) {
    if (s.solid) return solidWords(g, s);
    const fam = s.font || 'Inter', size = s.size || 64, weight = s.weight || 600;
    g.save(); g.font = `${s.italic ? 'italic ' : ''}${weight} ${size}px ${fam}`; g.textBaseline = 'alphabetic';
    if (s.track != null) g.letterSpacing = `${s.track * size}px`; else g.letterSpacing = `${-0.03 * size}px`;
    const parts = s.text.split(' '), space = g.measureText(' ').width, widths = parts.map(p => g.measureText(p).width);
    const total = widths.reduce((a, b) => a + b, 0) + space * (parts.length - 1);
    let x = s.align === 'left' ? s.x : s.align === 'right' ? s.x - total : s.x - total / 2;
    const stag = s.stagger ?? 0.07, dur = s.dur ?? 0.55;
    parts.forEach((p, i) => {
      const kin = s.in == null ? 1 : EASE.standard(prog(s.t, s.in + i * stag, s.in + i * stag + dur));
      const kout = s.out == null ? 0 : EASE.exit(prog(s.t, s.out + i * stag * 0.6, s.out + i * stag * 0.6 + dur * 0.8));
      const a = kin * (1 - kout);
      if (a > 0.003) {
        g.globalAlpha = a * (s.alpha ?? 1);
        const blur = (1 - kin) * size * 0.14 + kout * size * 0.12;
        g.filter = blur > 0.3 ? `blur(${blur * SCALE}px)` : 'none';
        const dy = (1 - kin) * size * 0.32 - kout * size * 0.22;
        if (s.grad) { const gr = g.createLinearGradient(0, s.y - size * 0.75 + dy, 0, s.y + dy); gr.addColorStop(0, s.grad[0]); gr.addColorStop(0.5, s.grad[0]); gr.addColorStop(1, s.grad[1]); g.fillStyle = gr; }
        else g.fillStyle = s.color || '#fff';
        if (s.shadow) { g.shadowColor = s.shadow; g.shadowBlur = size * 0.5 * SCALE; }
        g.fillText(p, x, s.y + dy);
      }
      x += widths[i] + space;
    });
    g.restore();
    return total;
  }
  // Solid text: no opacity, no blur. Each whole word slides up from behind a clean edge (clip), one after another,
  // and leaves upward the same way. Stagger stays under 0.5s in total (motion-design skill).
  function solidWords(g, s) {
    const fam = s.font || 'Inter', size = s.size || 64, weight = s.weight || 600;
    g.save(); g.font = `${s.italic ? 'italic ' : ''}${weight} ${size}px ${fam}`; g.textBaseline = 'alphabetic';
    g.letterSpacing = `${(s.track ?? -0.03) * size}px`;
    const parts = s.text.split(' '), space = g.measureText(' ').width, widths = parts.map(p => g.measureText(p).width);
    const total = widths.reduce((a, b) => a + b, 0) + space * (parts.length - 1);
    let x = s.align === 'left' ? s.x : s.align === 'right' ? s.x - total : s.x - total / 2;
    const n = parts.length, stag = Math.min(s.stagger ?? 0.06, 0.45 / Math.max(1, n - 1)), dur = s.dur ?? 0.45;
    const enter = s.ease || EASE.standard, leave = EASE.exit;
    const top = s.y - size * 1.0, h = size * 1.32;
    g.beginPath(); g.rect(x - size, top, total + size * 2, h); g.clip();
    if (s.grad) { const gr = g.createLinearGradient(0, s.y - size * 0.75, 0, s.y); gr.addColorStop(0, s.grad[0]); gr.addColorStop(0.5, s.grad[0]); gr.addColorStop(1, s.grad[1]); g.fillStyle = gr; }
    else g.fillStyle = s.color || '#fff';
    if (s.shadow) { g.shadowColor = s.shadow; g.shadowBlur = size * 0.4 * SCALE; }
    parts.forEach((p, i) => {
      const kin = s.in == null ? 1 : enter(prog(s.t, s.in + i * stag, s.in + i * stag + dur));
      const kout = s.out == null ? 0 : leave(prog(s.t, s.out + i * stag * 0.7, s.out + i * stag * 0.7 + dur * 0.75));
      if (kin > 0 && kout < 1) g.fillText(p, x, s.y + (1 - kin) * h - kout * h);
      x += widths[i] + space;
    });
    g.restore();
    return total;
  }
  function measure(text, size, weight = 600, fam = 'Inter', italic = false, track = -0.03) {
    const g = ctx; g.save(); g.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${fam}`; g.letterSpacing = `${track * size}px`; const w = g.measureText(text).width; g.restore(); return w;
  }

  // ---------- pixel dithering (ordered / Bayer 8x8) ----------
  const B8 = (() => { const m = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22], [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]]; return m.map(r => r.map(v => (v + 0.5) / 64)); })();
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const cache = {};
  function small(key, cols, rows) {
    let c = cache[key]; if (!c || c.width !== cols || c.height !== rows) { c = document.createElement('canvas'); c.width = cols; c.height = rows; c.g = c.getContext('2d', { willReadFrequently: true }); cache[key] = c; }
    return c;
  }
  // Draw a field of square pixels. field(u, v, i, j) -> 0..1 (u,v in 0..1 across the area). on/off: '#rrggbb' or null (clear).
  function ditherField(g, o) {
    const cell = o.cell || 8, x = o.x || 0, y = o.y || 0, w = o.w ?? W, h = o.h ?? H;
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell); if (cols < 1 || rows < 1) return; const c = small(o.key || 'field', cols, rows);
    const id = c.g.createImageData(cols, rows), d = id.data, on = hex(o.on), off = o.off ? hex(o.off) : null, ox = o.phaseX || 0, oy = o.phaseY || 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const v = o.field((i + 0.5) / cols, (j + 0.5) / rows, i, j), k = (j * cols + i) * 4;
      if (v > B8[(j + oy) & 7][(i + ox) & 7]) { d[k] = on[0]; d[k + 1] = on[1]; d[k + 2] = on[2]; d[k + 3] = 255; }
      else if (off) { d[k] = off[0]; d[k + 1] = off[1]; d[k + 2] = off[2]; d[k + 3] = 255; }
    }
    c.g.putImageData(id, 0, 0);
    g.save(); g.imageSmoothingEnabled = false; g.globalAlpha = o.alpha ?? 1; g.drawImage(c, x, y, cols * cell, rows * cell); g.restore();
  }
  // Dither any canvas/image by its brightness x alpha into two tones. mode 'luma' or 'alpha'. gain/bias shape the tone curve.
  function ditherSource(g, src, o) {
    const cell = o.cell || 8, x = o.x || 0, y = o.y || 0, w = o.w ?? W, h = o.h ?? H;
    if (w < 1 || h < 1) return;
    const cols = Math.max(1, Math.ceil(w / cell)), rows = Math.max(1, Math.ceil(h / cell)), c = small(o.key || 'src', cols, rows);
    c.g.clearRect(0, 0, cols, rows); c.g.imageSmoothingEnabled = true; c.g.imageSmoothingQuality = 'high';
    if (o.crop) c.g.drawImage(src, o.crop[0], o.crop[1], o.crop[2], o.crop[3], 0, 0, cols, rows); else c.g.drawImage(src, 0, 0, cols, rows);
    const id = c.g.getImageData(0, 0, cols, rows), d = id.data, on = hex(o.on), off = o.off ? hex(o.off) : null, gain = o.gain ?? 1, bias = o.bias ?? 0, mask = o.mask;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4, a = d[k + 3] / 255;
      let v = o.mode === 'alpha' ? a : (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255 * a;
      if (o.invert) v = a * (1 - v / Math.max(a, 1e-3));
      v = v * gain + bias; if (mask) v *= mask((i + 0.5) / cols, (j + 0.5) / rows, i, j);
      if (a > 0.01 && v > B8[j & 7][i & 7]) { d[k] = on[0]; d[k + 1] = on[1]; d[k + 2] = on[2]; d[k + 3] = 255; }
      else if (off && (a > 0.01 || o.fillOff)) { d[k] = off[0]; d[k + 1] = off[1]; d[k + 2] = off[2]; d[k + 3] = 255; }
      else d[k + 3] = 0;
    }
    c.g.putImageData(id, 0, 0);
    g.save(); g.imageSmoothingEnabled = false; g.globalAlpha = o.alpha ?? 1; g.drawImage(c, x, y, cols * cell, rows * cell); g.restore();
  }
  // Pixel dissolve mask: returns 1 where the new scene should show. Square cells switch on in Bayer order, sweeping along a direction.
  function dissolve(k, u, v, i, j, dir = [1, 0.35], spread = 0.45) {
    const d = (u * dir[0] + v * dir[1]) / (Math.abs(dir[0]) + Math.abs(dir[1]));
    const edge = lerp(-spread, 1, k);
    const local = clamp01((edge - d) / spread + 0.5) ;
    return local > B8[j & 7][i & 7];
  }
  // Composite: show `next` canvas through a pixel-dissolve mask over whatever is already drawn.
  function pixelWipe(g, next, k, o = {}) {
    if (k <= 0) return; if (k >= 1) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(next, 0, 0); g.restore(); return; }
    const cell = o.cell || 24, cols = Math.ceil(W / cell), rows = Math.ceil(H / cell), m = small('wipe', cols, rows), id = m.g.createImageData(cols, rows), d = id.data;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { if (dissolve(k, (i + 0.5) / cols, (j + 0.5) / rows, i, j, o.dir, o.spread)) d[(j * cols + i) * 4 + 3] = 255; }
    m.g.putImageData(id, 0, 0);
    const tmp = small('wipeTmp', cv.width, cv.height); tmp.g.globalCompositeOperation = 'source-over'; tmp.g.clearRect(0, 0, tmp.width, tmp.height); tmp.g.drawImage(next, 0, 0);
    tmp.g.globalCompositeOperation = 'destination-in'; tmp.g.imageSmoothingEnabled = false; tmp.g.drawImage(m, 0, 0, cols * cell * SCALE, rows * cell * SCALE); tmp.g.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(tmp, 0, 0); g.restore();
  }

  // ---------- logo ----------
  const LOGO_RATIO = 2.5523 / 2.4511;   // viewBox w/h of /brand/logo/adrender-logo.svg
  function logo(g, cx, cy, h, alpha = 1, key = 'logo') {
    const im = IMG[key]; if (!im) return; const w = h * (im.width / im.height || LOGO_RATIO);
    g.save(); g.globalAlpha *= alpha; g.drawImage(im, cx - w / 2, cy - h / 2, w, h); g.restore();
  }

  // ---------- player ----------
  function start(TOTAL, render, assets) {
    window.TOTAL = TOTAL;
    let ready = false;
    window.renderAt = t => { if (ready) render(Math.max(0, Math.min(TOTAL - 1e-3, t))); };
    window.ready = Promise.all([fontsReady(), load(assets || {})]).then(() => {
      ready = true;
      if (q.has('t')) { render(parseFloat(q.get('t'))); return true; }
      live(TOTAL, render); return true;
    });
  }
  function live(TOTAL, render) {
    let playing = true, base = performance.now(), at = 0;
    const bar = q.get('controls') === '1' ? controls() : null;
    const now = () => playing ? (at + (performance.now() - base) / 1000) % TOTAL : at;
    (function tick() { const t = now(); render(t); if (bar) bar.update(t / TOTAL, playing); requestAnimationFrame(tick); })();
    function seek(k) { at = k * TOTAL; base = performance.now(); }
    function controls() {
      const el = document.createElement('div'); el.className = 'ctl';
      el.innerHTML = '<button class="pp" aria-label="Play or pause"></button><div class="trk"><div class="fill"></div></div><button class="rs" aria-label="Restart">↺</button>' + (window.AUDIO_SRC ? '<button class="snd" aria-label="Sound on or off">🔇</button>' : '');
      document.body.appendChild(el);
      const pp = el.querySelector('.pp'), trk = el.querySelector('.trk'), fill = el.querySelector('.fill');
      pp.onclick = () => { if (playing) { at = now(); playing = false; } else { base = performance.now(); playing = true; } };
      el.querySelector('.rs').onclick = () => { seek(0); playing = true; };
      const scrub = e => { const r = trk.getBoundingClientRect(); seek(clamp01((e.clientX - r.left) / r.width)); };
      trk.addEventListener('pointerdown', e => { scrub(e); trk.setPointerCapture(e.pointerId); trk.onpointermove = scrub; });
      trk.addEventListener('pointerup', () => { trk.onpointermove = null; });
      let idle; const wake = () => { el.classList.remove('hide'); clearTimeout(idle); idle = setTimeout(() => el.classList.add('hide'), 2200); };
      document.addEventListener('pointermove', wake); wake();
      // optional sound track, kept in step with the timeline (browsers only allow sound after a click)
      let audio = null, soundOn = false;
      const snd = el.querySelector('.snd');
      if (snd) { audio = new Audio(window.AUDIO_SRC); audio.preload = 'auto';
        snd.onclick = () => { soundOn = !soundOn; snd.textContent = soundOn ? '🔊' : '🔇'; if (soundOn) { audio.currentTime = now(); if (playing) audio.play().catch(() => {}); } else audio.pause(); }; }
      return { update(k, p) { fill.style.width = (k * 100).toFixed(2) + '%'; pp.textContent = p ? '❚❚' : '▶';
        if (audio && soundOn) { const t = k * TOTAL; if (!p) { if (!audio.paused) audio.pause(); } else { if (audio.paused) audio.play().catch(() => {}); if (Math.abs(audio.currentTime - t) > 0.15) audio.currentTime = t; } } } };
    }
  }
  const style = document.createElement('style');
  style.textContent = `@font-face{font-family:Inter;src:url(/ads/fonts/inter.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Newsreader;src:url(/ads/fonts/newsreader.woff2) format('woff2');font-weight:200 800}
@font-face{font-family:Newsreader;src:url(/ads/fonts/newsreader-italic.woff2) format('woff2');font-weight:200 800;font-style:italic}
@font-face{font-family:Mono;src:url(/ads/fonts/mono.woff2) format('woff2');font-weight:500}
html,body{margin:0;height:100%;background:#000;overflow:hidden}body{display:flex;align-items:center;justify-content:center}
canvas{display:block;width:min(100vw,calc(100vh*${W}/${H}));height:auto;aspect-ratio:${W}/${H}}
.ctl{position:fixed;left:12px;right:12px;bottom:10px;display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:10px;background:rgba(10,10,12,.62);backdrop-filter:blur(8px);color:#fff;font:500 12px Inter,system-ui;transition:opacity .4s}
.ctl.hide{opacity:0}.ctl button{all:unset;cursor:pointer;width:22px;text-align:center;font-size:12px}.trk{flex:1;height:14px;display:flex;align-items:center;cursor:pointer}
.trk::before{content:'';position:absolute}.trk{position:relative}.trk .fill{height:3px;background:#fff;border-radius:2px;box-shadow:0 0 0 0}
.trk{background:linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) center/100% 3px no-repeat}`;
  document.head.appendChild(style);

  window.AD = { q, VIEW, PHONE, W, H, SCALE, RENDER, clamp01, lerp, prog, outExpo, inOutCubic, outCubic, sine, bezier, EASE, third, cv, ctx, mk, begin, IMG, load, drawCover, words, measure, B8, hex, ditherField, ditherSource, dissolve, pixelWipe, logo, start, small };
})();
