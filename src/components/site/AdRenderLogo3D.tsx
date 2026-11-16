import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LOGO_GROUPS, LOGO_NORMALS, LOGO_POSITIONS } from './adrenderLogoMesh'

/**
 * The AdRender logo drawn live from its 3D model (WebGL2, ~10 KB, no files to
 * download). At rest it is exactly the still logo (view A). It plays the
 * approved move — tilt back 0.7 s, then one slow full turn 3.0 s — on:
 *   - 'site-header': 10 s after every page load / route change, then once per hover.
 *   - 'loop': every 8 s (sign-in style). Not used on the website yet.
 * Falls back to the still SVG when WebGL2 is missing or the visitor prefers
 * reduced motion. See docs/brand/README.md.
 */

type Props = {
  /** Height of the logo itself in CSS px (the canvas is a bit larger so the spin has room). */
  height: number
  mode?: 'site-header' | 'loop' | 'still'
  /** Element that triggers the hover spin (defaults to the canvas wrapper). */
  hoverTarget?: React.RefObject<HTMLElement | null>
}

// ---- model framing (must match docs/brand/source/anim_frames.py)
const REST = { minX: -1.18279, maxX: 1.225, minY: -0.24207, maxY: 2.06457 } // view A bounds
const FRAME_CX = 0
const FRAME_CY = 0.7
const FRAME_SPAN = 2.86
// SVG fallback has 3% padding of the larger side
const SVG_PAD = 0.03 * Math.max(REST.maxX - REST.minX, REST.maxY - REST.minY)
const SVG_H = REST.maxY - REST.minY + 2 * SVG_PAD
const SVG_W = REST.maxX - REST.minX + 2 * SVG_PAD
const LOGO_CX = (REST.minX + REST.maxX) / 2
const LOGO_CY = (REST.minY + REST.maxY) / 2
// gradient box (canvas fractions, y from the top)
const GB = [
  (REST.minX - FRAME_CX) / FRAME_SPAN + 0.5,
  0.5 - (REST.maxY - FRAME_CY) / FRAME_SPAN,
  (REST.maxX - FRAME_CX) / FRAME_SPAN + 0.5,
  0.5 - (REST.minY - FRAME_CY) / FRAME_SPAN,
]

const TILT = 0.7
const SPIN = 3.0
const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, t)))
function pose(t: number): [number, number] {
  if (t <= TILT) {
    const e = ease(t / TILT)
    return [-20 * e, -20 - 25 * e]
  }
  const e = ease((t - TILT) / SPIN)
  return [-20 + 380 * e, -45 + 25 * e]
}

function rotation(yawDeg: number, pitchDeg: number): Float32Array {
  const y = (yawDeg * Math.PI) / 180
  const p = (pitchDeg * Math.PI) / 180
  const cy = Math.cos(y), sy = Math.sin(y), cp = Math.cos(p), sp = Math.sin(p)
  // R = Rx(pitch) * Ry(yaw), row-major [r00 r01 r02 r10 ...]
  const r = [cy, 0, sy, sp * sy, cp, -sp * cy, -cp * sy, sp, cp * cy]
  // column-major for GLSL mat3
  return new Float32Array([r[0], r[3], r[6], r[1], r[4], r[7], r[2], r[5], r[8]])
}

const VS_MESH = `#version 300 es
in vec3 aPos; in vec3 aNrm; in float aGid;
uniform mat3 uR; uniform vec2 uCen; uniform float uSpan;
out vec3 vN; flat out float vGid;
void main(){
  vec3 p = uR * aPos;
  vN = uR * aNrm; vGid = aGid;
  gl_Position = vec4((p.xy - uCen) / uSpan * 2.0, -p.z / 4.0, 1.0);
}`
const FS_MESH = `#version 300 es
precision highp float;
in vec3 vN; flat in float vGid;
uniform vec2 uSize; uniform vec4 uGB;
layout(location=0) out vec4 oCol; layout(location=1) out vec4 oId;
void main(){
  if (vN.z <= 0.0) discard;
  vec3 L = normalize(vec3(-0.5, 0.7, 0.9));
  float k = 0.7 + 0.4 * max(0.0, dot(normalize(vN), L));
  vec2 f = vec2(gl_FragCoord.x / uSize.x, 1.0 - gl_FragCoord.y / uSize.y);
  float t = clamp(0.55 * (f.x - uGB.x) / (uGB.z - uGB.x) + 0.45 * (f.y - uGB.y) / (uGB.w - uGB.y), 0.0, 1.0);
  vec3 c0 = vec3(79.0, 141.0, 247.0) / 255.0, c1 = vec3(155.0, 107.0, 242.0) / 255.0, c2 = vec3(255.0, 138.0, 61.0) / 255.0;
  vec3 base = t < 0.5 ? mix(c0, c1, t / 0.5) : mix(c1, c2, (t - 0.5) / 0.5);
  oCol = vec4(clamp(base * k, 0.0, 1.0), 1.0);
  oId = vec4(vGid / 255.0, 0.0, 0.0, 1.0);
}`
const VS_QUAD = `#version 300 es
in vec2 aXY; out vec2 vUV;
void main(){ vUV = aXY * 0.5 + 0.5; gl_Position = vec4(aXY, 0.0, 1.0); }`
const FS_EDGE = `#version 300 es
precision highp float;
in vec2 vUV; uniform sampler2D uCol; uniform sampler2D uId; uniform vec2 uTexel; uniform float uRad;
out vec4 o;
void main(){
  vec4 c = texture(uCol, vUV);
  float id = texture(uId, vUV).r;
  bool edge = false;
  for (int dx = -3; dx <= 3; dx++) for (int dy = -3; dy <= 3; dy++) {
    vec2 d = vec2(float(dx), float(dy));
    if (dot(d, d) > uRad * uRad + 0.01) continue;
    if (abs(texture(uId, vUV + d * uTexel).r - id) > 0.001) edge = true;
  }
  float a = c.a;
  vec3 rgb = c.rgb;
  if (edge) { rgb = mix(rgb, vec3(1.0), 0.65); a = max(a, 0.65); if (c.a == 0.0) rgb = vec3(1.0); }
  o = vec4(rgb * a, a); // premultiplied
}`

function compile(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const prog = gl.createProgram()!
  for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as const) {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
    gl.attachShader(prog, s)
  }
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link')
  return prog
}

function createRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false, alpha: true })
  if (!gl) return null
  const mesh = compile(gl, VS_MESH, FS_MESH)
  const quad = compile(gl, VS_QUAD, FS_EDGE)

  const vao = gl.createVertexArray()!
  gl.bindVertexArray(vao)
  const buf = (data: Float32Array, name: string, size: number) => {
    const b = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, b)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(mesh, name)
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
  }
  buf(LOGO_POSITIONS, 'aPos', 3)
  buf(LOGO_NORMALS, 'aNrm', 3)
  buf(LOGO_GROUPS, 'aGid', 1)
  const count = LOGO_GROUPS.length

  const qvao = gl.createVertexArray()!
  gl.bindVertexArray(qvao)
  const qb = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, qb)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const ql = gl.getAttribLocation(quad, 'aXY')
  gl.enableVertexAttribArray(ql)
  gl.vertexAttribPointer(ql, 2, gl.FLOAT, false, 0, 0)

  let fbo: WebGLFramebuffer | null = null
  let texCol: WebGLTexture | null = null
  let texId: WebGLTexture | null = null
  let depth: WebGLRenderbuffer | null = null
  let W = 0, H = 0
  const tex = (w: number, h: number) => {
    const t = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }
  const resize = () => {
    if (canvas.width === W && canvas.height === H && fbo) return
    W = canvas.width; H = canvas.height
    if (fbo) { gl.deleteFramebuffer(fbo); gl.deleteTexture(texCol); gl.deleteTexture(texId); gl.deleteRenderbuffer(depth) }
    fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    texCol = tex(W, H); texId = tex(W, H)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texCol, 0)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, texId, 0)
    depth = gl.createRenderbuffer()
    gl.bindRenderbuffer(gl.RENDERBUFFER, depth)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, W, H)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth)
  }

  const draw = (yaw: number, pitch: number) => {
    resize()
    // pass 1: colour + face id
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1])
    gl.viewport(0, 0, W, H)
    gl.clearColor(0, 0, 0, 0)
    gl.clearDepth(1)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(mesh)
    gl.uniformMatrix3fv(gl.getUniformLocation(mesh, 'uR'), false, rotation(yaw, pitch))
    gl.uniform2f(gl.getUniformLocation(mesh, 'uCen'), FRAME_CX, FRAME_CY)
    gl.uniform1f(gl.getUniformLocation(mesh, 'uSpan'), FRAME_SPAN)
    gl.uniform2f(gl.getUniformLocation(mesh, 'uSize'), W, H)
    gl.uniform4f(gl.getUniformLocation(mesh, 'uGB'), GB[0], GB[1], GB[2], GB[3])
    gl.bindVertexArray(vao)
    gl.drawArrays(gl.TRIANGLES, 0, count)
    // pass 2: edges + composite to the canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.disable(gl.DEPTH_TEST)
    gl.viewport(0, 0, W, H)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(quad)
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texCol)
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texId)
    gl.uniform1i(gl.getUniformLocation(quad, 'uCol'), 0)
    gl.uniform1i(gl.getUniformLocation(quad, 'uId'), 1)
    gl.uniform2f(gl.getUniformLocation(quad, 'uTexel'), 1 / W, 1 / H)
    gl.uniform1f(gl.getUniformLocation(quad, 'uRad'), Math.min(3, Math.max(1, W * 0.0026)))
    gl.bindVertexArray(qvao)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  return { draw }
}

export function AdRenderLogo3D({ height, mode = 'site-header', hoverTarget }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [live, setLive] = useState(false)
  const location = useLocation()
  const api = useRef<{ play: () => void } | null>(null)

  // layout: the box is the still logo's size; the canvas is larger and centred on it
  const unit = height / SVG_H
  const boxW = SVG_W * unit
  const canvasPx = FRAME_SPAN * unit
  const offX = (FRAME_CX - LOGO_CX) * unit
  const offY = -(FRAME_CY - LOGO_CY) * unit

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || mode === 'still') return
    let r: ReturnType<typeof createRenderer>
    try {
      r = createRenderer(canvas)
    } catch {
      r = null
    }
    if (!r) return
    const renderer = r
    const scale = Math.min(4, (window.devicePixelRatio || 1) * 2)
    canvas.width = Math.round(canvasPx * scale)
    canvas.height = Math.round(canvasPx * scale)
    renderer.draw(0, -20)
    setLive(true)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let start = 0
    let playing = false
    const tick = (now: number) => {
      const t = (now - start) / 1000
      if (t >= TILT + SPIN) {
        renderer.draw(0, -20)
        playing = false
        return
      }
      const [yaw, pitch] = pose(t)
      renderer.draw(yaw, pitch)
      raf = requestAnimationFrame(tick)
    }
    const play = () => {
      if (playing || reduce.matches || document.visibilityState === 'hidden') return
      playing = true
      start = performance.now()
      raf = requestAnimationFrame(tick)
    }
    api.current = { play }
    return () => {
      cancelAnimationFrame(raf)
      api.current = null
    }
  }, [canvasPx, mode])

  // timing
  useEffect(() => {
    if (!live) return
    if (mode === 'site-header') {
      const t = window.setTimeout(() => api.current?.play(), 10_000)
      return () => window.clearTimeout(t)
    }
    if (mode === 'loop') {
      const first = window.setTimeout(() => api.current?.play(), 2_500)
      const every = window.setInterval(() => api.current?.play(), 8_000)
      return () => { window.clearTimeout(first); window.clearInterval(every) }
    }
  }, [live, mode, location.key])

  // hover (website header): once per hover
  useEffect(() => {
    if (!live || mode !== 'site-header') return
    const el = hoverTarget?.current ?? wrapRef.current
    if (!el) return
    const onEnter = () => api.current?.play()
    el.addEventListener('pointerenter', onEnter)
    return () => el.removeEventListener('pointerenter', onEnter)
  }, [live, mode, hoverTarget])

  return (
    <span
      ref={wrapRef}
      className="adr-logo3d"
      style={{ position: 'relative', display: 'inline-block', width: boxW, height, flex: 'none' }}
      aria-hidden="true"
    >
      <img
        src="/brand/logo/adrender-logo.svg"
        alt=""
        width={Math.round(boxW)}
        height={height}
        style={{ width: boxW, height, display: 'block', visibility: live ? 'hidden' : 'visible' }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          width: canvasPx,
          height: canvasPx,
          left: boxW / 2 - canvasPx / 2 + offX,
          top: height / 2 - canvasPx / 2 + offY,
          pointerEvents: 'none',
          display: mode === 'still' ? 'none' : 'block',
        }}
      />
    </span>
  )
}
