// Halftone avatar: a clay-style 3D character (woman with an afro, hoop earrings, knit sweater) ray-marched in a
// small WebGL shader at one sample per halftone cell, then drawn on the 2D canvas as paper plus ink dots.
// Avatar.draw(g, { x, y, w, cell, pose }) -- x,y = top-left of the box, w = box width (height = w * ASPECT).
// pose: { yaw, pitch, roll, blinkL, blinkR, smile, open, brow, lookX, lookY, bodyYaw, t }
(function () {
  const ASPECT = 1.3, VX = 2.3;           // view box: x in [-2.1, 2.1], y in [-3.0, 2.2]
  const MAXW = 200, MAXH = 260;
  const cv = document.createElement('canvas'); cv.width = MAXW; cv.height = MAXH;
  const gl = cv.getContext('webgl', { preserveDrawingBuffer: true, antialias: false, premultipliedAlpha: false });
  const VS = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }';
  const FS = `
precision highp float;
uniform vec2 res; uniform mat3 headR; uniform vec2 blink; uniform float smile, mouthOpen, brow, tm, bodyYaw; uniform vec2 look;
float sdEll(vec3 p, vec3 r){ float k0 = length(p / r); float k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / k1; }
float sdCap(vec3 p, vec3 a, vec3 b, float r){ vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float sdTorusZ(vec3 p, vec2 t){ vec2 q = vec2(length(p.xy) - t.x, p.z); return length(q) - t.y; }
float sdTorusY(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
vec2 U(vec2 a, vec2 b){ return a.x < b.x ? a : b; }
const float HS = 1.2;
// materials: 1 skin, 2 hair, 3 eye, 4 dark (brow, lash), 5 sweater, 6 earring, 7 collar
vec2 head(vec3 q){
  float s = sdEll(q, vec3(0.9, 1.0, 0.86));
  s = smin(s, sdEll(q - vec3(0.0, -0.46, 0.12), vec3(0.62, 0.5, 0.62)), 0.28);           // jaw and chin
  s = smin(s, sdEll(q - vec3(0.0, -0.08, 0.88), vec3(0.11, 0.09, 0.09)), 0.06);          // nose
  vec2 r = vec2(s, 1.0);
  // afro: a big rounded cloud of curls, cut away around the face
  vec3 hq = q - vec3(0.0, 0.42, -0.22);
  float hair = sdEll(hq, vec3(1.5, 1.3, 1.3));
  float curl = sin(9.0 * q.x + 1.7) * sin(9.0 * q.y + 0.4) * sin(9.0 * q.z + 2.3) + 0.5 * sin(17.0 * q.x + 3.1 * sin(tm * 0.0 + 1.0)) * sin(17.0 * q.y + 1.1) * sin(17.0 * q.z);
  hair += 0.085 * curl + 0.07 * sin(4.0 * q.x + 0.5) * sin(4.3 * q.y + 2.0) * sin(3.7 * q.z + 1.0);
  hair = max(hair, -0.45 - q.y);
  float face = sdEll(q - vec3(0.0, -0.22, 0.6), vec3(0.9, 1.0, 0.76));
  hair = max(hair, -face);
  r = U(r, vec2(hair, 2.0));
  // eyes (blink squashes them), brows, lashes
  vec2 lk = look * vec2(0.05, 0.04);
  for (int i = 0; i < 2; i++) {
    float sx = i == 0 ? -1.0 : 1.0; float b = i == 0 ? blink.x : blink.y;
    vec3 ec = vec3(sx * 0.3 + lk.x, 0.1 + lk.y, 0.79);
    float e = sdEll(q - ec, vec3(0.135, 0.19 * (1.0 - 0.88 * b) + 0.01, 0.07));
    r = U(r, vec2(e, 3.0));
    float by = 0.36 + brow * 0.07 - b * 0.03;
    r = U(r, vec2(sdCap(q, vec3(sx * 0.16, by + 0.01, 0.83), vec3(sx * 0.44, by - 0.03, 0.73), 0.032), 4.0));
    r = U(r, vec2(sdCap(q, vec3(sx * 0.39, 0.2 - b * 0.08, 0.76), vec3(sx * 0.5, 0.27 - b * 0.08, 0.7), 0.02), 4.0));
    r = U(r, vec2(sdCap(q, vec3(sx * 0.36, 0.25 - b * 0.1, 0.77), vec3(sx * 0.44, 0.34 - b * 0.1, 0.72), 0.018), 4.0));
    // hoop earrings hanging under the hair
    r = U(r, vec2(sdTorusZ(q - vec3(sx * 0.82, -0.72, 0.12), vec2(0.16, 0.034)), 6.0));
  }
  return r;
}
vec2 map(vec3 p){
  // body (turns a little with bodyYaw)
  float cb = cos(bodyYaw), sb = sin(bodyYaw);
  vec3 b = vec3(cb * p.x + sb * p.z, p.y, -sb * p.x + cb * p.z);
  float sweater = sdEll(b - vec3(0.0, -2.55, -0.2), vec3(1.8, 1.25, 1.02));
  sweater = smin(sweater, sdEll(b - vec3(0.0, -1.62, -0.12), vec3(0.95, 0.42, 0.7)), 0.4);
  vec2 r = vec2(sweater, 5.0);
  r = U(r, vec2(sdTorusY(b - vec3(0.0, -1.36, -0.05), vec2(0.4, 0.12)), 7.0));
  r = U(r, vec2(sdCap(b, vec3(0.0, -0.9, -0.05), vec3(0.0, -1.5, -0.08), 0.33), 1.0));
  // head turns around the neck
  vec3 q = headR * (p - vec3(0.0, -0.75, 0.0)) / HS + vec3(0.0, -0.75, 0.0);
  vec2 hd = head(q); hd.x *= HS;
  return U(r, hd);
}
vec3 nrm(vec3 p){ const vec2 e = vec2(0.003, -0.003);
  return normalize(e.xyy * map(p + e.xyy).x + e.yyx * map(p + e.yyx).x + e.yxy * map(p + e.yxy).x + e.xxx * map(p + e.xxx).x); }
void main(){
  vec2 uv = gl_FragCoord.xy / res;
  vec3 ro = vec3(mix(-${VX.toFixed(2)}, ${VX.toFixed(2)}, uv.x), mix(-3.1, -3.1 + ${(2 * 2.3 * 1.3).toFixed(3)}, uv.y), 6.0), rd = vec3(0.0, 0.0, -1.0);
  float t = 0.0; vec2 h = vec2(1.0, 0.0); bool hit = false;
  for (int i = 0; i < 90; i++) { h = map(ro + rd * t); if (h.x < 0.002) { hit = true; break; } t += h.x * 0.75; if (t > 12.0) break; }
  if (!hit) { gl_FragColor = vec4(0.0); return; }
  vec3 p = ro + rd * t, n = nrm(p), v = -rd, L = normalize(vec3(-0.55, 0.65, 0.75));
  float m = h.y, alb = 0.6, specK = 0.15, shin = 20.0;
  if (m < 1.5) alb = 0.74;
  else if (m < 2.5) { alb = 0.3; specK = 0.12; shin = 12.0; }
  else if (m < 3.5) { alb = 0.02; specK = 1.4; shin = 60.0; }
  else if (m < 4.5) alb = 0.06;
  else if (m < 5.5) { alb = 0.88 - 0.06 * step(0.0, sin(p.y * 26.0)) ; specK = 0.05; }
  else if (m < 6.5) { alb = 0.85; specK = 1.2; shin = 30.0; }
  else alb = 0.78;
  // mouth and patch are painted onto the surface
  if (m < 1.5) {
    vec3 q = headR * (p - vec3(0.0, -0.75, 0.0)) / HS + vec3(0.0, -0.75, 0.0);
    if (q.z > 0.4 && q.y > -0.8) {
      float my = -0.36, w = 0.24 + 0.04 * mouthOpen, x = q.x / w;
      if (abs(x) < 1.0) {
        float top = my + 0.05 + smile * 0.16 * x * x;
        float bot = top - 0.035 - mouthOpen * 0.2 * (1.0 - x * x) - smile * 0.03 * (1.0 - x * x);
        if (q.y < top && q.y > bot) { alb = 0.03; if (mouthOpen > 0.3 && q.y < bot + 0.05 * mouthOpen) alb = 0.35; specK = 0.0; }
        else if (q.y < top + 0.035 && q.y > bot - 0.045) alb = 0.3;   // lips
      }
    }
  }
  if (m > 4.5 && m < 5.5) {
    float cb = cos(bodyYaw), sb = sin(bodyYaw); vec3 b = vec3(cb * p.x + sb * p.z, p.y, -sb * p.x + cb * p.z);
    vec2 pc = b.xy - vec2(0.72, -2.15); float sq = max(abs(pc.x), abs(pc.y));
    if (sq < 0.19 && b.z > 0.0) alb = sq > 0.15 ? 0.15 : (pc.y < -0.07 + 0.0 * pc.x && abs(pc.x) < 0.09 - (pc.y + 0.11) * 0.0 ? 0.6 : 0.9);
  }
  float dif = clamp(dot(n, L) * 0.85 + 0.15, 0.0, 1.0);
  float ao = clamp(map(p + n * 0.12).x / 0.12, 0.0, 1.0) * 0.5 + clamp(map(p + n * 0.3).x / 0.3, 0.0, 1.0) * 0.5;
  float rim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.0);
  float spec = pow(clamp(dot(reflect(-L, n), v), 0.0, 1.0), shin);
  float shade = alb * (0.3 + 0.8 * dif) * (0.7 + 0.3 * ao) + rim * 0.18 * alb + spec * specK;
  gl_FragColor = vec4(clamp(1.0 - shade, 0.0, 1.0), m / 10.0, 0.0, 1.0);
}`;
  let prog = null, U = {};
  function compile() {
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    ['res', 'headR', 'blink', 'smile', 'mouthOpen', 'brow', 'tm', 'bodyYaw', 'look'].forEach(k => U[k] = gl.getUniformLocation(prog, k));
  }
  function rot(yaw, pitch, roll) {   // inverse rotation (world -> head space), column-major for GLSL
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
    // R = Rz(roll) * Rx(pitch) * Ry(yaw); we need R^T
    const Ry = [cy, 0, -sy, 0, 1, 0, sy, 0, cy], Rx = [1, 0, 0, 0, cp, sp, 0, -sp, cp], Rz = [cr, sr, 0, -sr, cr, 0, 0, 0, 1];
    const mul = (A, B) => { const C = []; for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) { let s = 0; for (let k = 0; k < 3; k++) s += A[k * 3 + r] * B[c * 3 + k]; C[c * 3 + r] = s; } return C; };
    const R = mul(Rz, mul(Rx, Ry)); return [R[0], R[3], R[6], R[1], R[4], R[7], R[2], R[5], R[8]];
  }
  const px = new Uint8Array(MAXW * MAXH * 4), sprites = {};
  function dotSprite(cell, level, ink, scale) {   // pre-rendered round dot, level 1..16
    const k = cell + '|' + level + '|' + ink + '|' + scale; if (sprites[k]) return sprites[k];
    const s = Math.ceil(cell * scale * AD.SCALE), c = document.createElement('canvas'); c.width = c.height = s; const x = c.getContext('2d');
    const r = Math.min(0.72, 0.5 * Math.sqrt(level / 16) * 1.3) * s; x.fillStyle = ink; x.beginPath(); x.arc(s / 2, s / 2, r, 0, Math.PI * 2); x.fill();
    return sprites[k] = c;
  }
  const maskC = document.createElement('canvas'), maskG = maskC.getContext('2d');
  function draw(g, o) {
    if (!gl) return;
    if (!prog) compile();
    const cell = o.cell, gw = Math.min(MAXW, Math.round(o.w / cell)), gh = Math.min(MAXH, Math.round(gw * ASPECT)), P = o.pose || {};
    gl.viewport(0, 0, gw, gh); gl.useProgram(prog);
    gl.uniform2f(U.res, gw, gh); gl.uniformMatrix3fv(U.headR, false, rot(P.yaw || 0, P.pitch || 0, P.roll || 0));
    gl.uniform2f(U.blink, P.blinkL || 0, P.blinkR || 0); gl.uniform1f(U.smile, P.smile ?? 1); gl.uniform1f(U.mouthOpen, P.open || 0);
    gl.uniform1f(U.brow, P.brow || 0); gl.uniform1f(U.tm, P.t || 0); gl.uniform1f(U.bodyYaw, P.bodyYaw || 0); gl.uniform2f(U.look, P.lookX || 0, P.lookY || 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3); gl.readPixels(0, 0, gw, gh, gl.RGBA, gl.UNSIGNED_BYTE, px);
    // paper: one scaled image of the silhouette
    maskC.width = gw; maskC.height = gh; const id = maskG.createImageData(gw, gh), md = id.data, paper = AD.hex(o.paper || '#FFFFFF');
    for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) { const s = ((gh - 1 - j) * gw + i) * 4, d = (j * gw + i) * 4; if (px[s + 3] > 127) { md[d] = paper[0]; md[d + 1] = paper[1]; md[d + 2] = paper[2]; md[d + 3] = 255; } }
    maskG.putImageData(id, 0, 0);
    const cw = o.w / gw, x0 = o.x, y0 = o.y;
    g.save(); g.imageSmoothingEnabled = false; g.drawImage(maskC, x0, y0, gw * cw, gh * cw);
    const ink = o.ink || '#0B0B0D', scale = 1.0, ds = cw * scale;
    for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
      const s = ((gh - 1 - j) * gw + i) * 4; if (px[s + 3] < 128) continue;
      const lv = Math.round(px[s] / 255 * 16); if (lv < 1) continue;
      g.drawImage(dotSprite(Math.round(cw * 100) / 100, lv, ink, scale), x0 + i * cw + (cw - ds) / 2, y0 + j * cw + (cw - ds) / 2, ds, ds);
    }
    g.restore();
  }
  window.Avatar = { draw, ASPECT, ok: !!gl };
})();
