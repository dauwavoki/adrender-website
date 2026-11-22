import { useEffect, useRef } from 'react'

/** Brand colors (logo blue → violet → orange) over a near-black base. */
const BASE: [number, number, number] = [14, 13, 18]
const COLORS: [number, number, number][] = [
  [31, 95, 214],
  [115, 64, 212],
  [232, 101, 15],
]

/** 4×4 Bayer matrix, normalised to 0–1 thresholds. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

const CELL = 3 // CSS pixels per dither dot
const FPS = 18

/**
 * Animated ordered-dither strip behind the promo banner. Solid dots only (no fades or blur):
 * brand-colored waves sweep across, thinning toward the middle so the text stays readable.
 * Pauses when off screen or the tab is hidden; draws one still frame for reduced motion.
 */
export function BannerDither() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let image: ImageData | null = null
    let raf = 0
    let last = 0
    let visible = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const box = canvas.getBoundingClientRect()
      width = Math.max(1, Math.ceil(box.width / CELL))
      height = Math.max(1, Math.ceil(box.height / CELL))
      canvas.width = width
      canvas.height = height
      image = ctx.createImageData(width, height)
    }

    const draw = (time: number) => {
      if (!image) return
      const t = time / 1000
      const data = image.data
      const mid = width / 2
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Two travelling waves make a moving density field.
          const wave =
            0.5 +
            0.3 * Math.sin(x * 0.07 - t * 1.6 + Math.sin(y * 0.5 + t) * 0.9) +
            0.2 * Math.sin(x * 0.023 + y * 0.31 + t * 0.9)
          // Quieter band in the middle, where the text sits.
          const edge = Math.min(1, Math.abs(x - mid) / (width * 0.32))
          const density = wave * (0.28 + 0.72 * edge)
          const on = density > BAYER[(y & 3) * 4 + (x & 3)]
          // Color band drifts along the strip: blue → violet → orange → blue.
          const band = (((x / width) * 1.5 - t * 0.08) % 1 + 1) % 1
          const color = on ? COLORS[Math.floor(band * COLORS.length) % COLORS.length] : BASE
          const i = (y * width + x) * 4
          data[i] = color[0]
          data[i + 1] = color[1]
          data[i + 2] = color[2]
          data[i + 3] = 255
        }
      }
      ctx.putImageData(image, 0, 0)
    }

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (time - last < 1000 / FPS) return
      last = time
      draw(time)
    }

    resize()
    draw(0)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw(last)
    })
    resizeObserver.observe(canvas)

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    viewObserver.observe(canvas)

    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      viewObserver.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="site-banner-dither" aria-hidden="true" />
}
