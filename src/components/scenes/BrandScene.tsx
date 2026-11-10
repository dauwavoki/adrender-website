import { useLayoutEffect, useRef } from 'react'
import { Tag } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { IconTile } from './parts/IconTile'
import { Still } from './parts/Still'
import { BRAND, BRAND_AD_COPY, BRAND_SOURCES, type SceneSize } from './sceneData'
import { useScenePhase } from './useSceneMotion'

/** Same beat the other scenes use between reveal steps. */
const REVEAL_MS = 520
const SCROLL_MS = 900
const HOLD_MS = 2500
const RETURN_MS = 700

type Shown = {
  swatches: number
  products: number
  copies: number
}

type Marks = {
  swatches: number[]
  products: number[]
  copies: number[]
  scrollStart: number
  scrollEnd: number
  returnStart: number
  loop: number
}

function buildMarks(swatchCount: number, productCount: number, copyCount: number): Marks {
  const swatches: number[] = []
  const products: number[] = []
  const copies: number[] = []
  let t = 0
  for (let i = 0; i < swatchCount; i += 1) {
    t += REVEAL_MS
    swatches.push(t)
  }
  for (let i = 0; i < productCount; i += 1) {
    t += REVEAL_MS
    products.push(t)
  }
  // One beat so the last product is on screen before the panel moves.
  t += REVEAL_MS
  const scrollStart = t
  t += SCROLL_MS
  const scrollEnd = t
  for (let i = 0; i < copyCount; i += 1) {
    t += REVEAL_MS
    copies.push(t)
  }
  // One beat so the last line has faded in, then hold.
  t += REVEAL_MS
  const returnStart = t + HOLD_MS
  const loop = returnStart + RETURN_MS
  return { swatches, products, copies, scrollStart, scrollEnd, returnStart, loop }
}

/** CSS ease-in-out: cubic-bezier(0.42, 0, 0.58, 1). */
function easeInOut(amount: number) {
  const x = Math.min(1, Math.max(0, amount))
  const p1x = 0.42
  const p1y = 0
  const p2x = 0.58
  const p2y = 1
  const cx = 3 * p1x
  const bx = 3 * (p2x - p1x) - cx
  const ax = 1 - cx - bx
  const cy = 3 * p1y
  const by = 3 * (p2y - p1y) - cy
  const ay = 1 - cy - by
  let t = x
  for (let i = 0; i < 8; i += 1) {
    const xEst = ((ax * t + bx) * t + cx) * t
    const slope = (3 * ax * t + 2 * bx) * t + cx
    const diff = xEst - x
    if (Math.abs(diff) < 1e-5 || Math.abs(slope) < 1e-6) break
    t -= diff / slope
  }
  const clamped = Math.min(1, Math.max(0, t))
  return ((ay * clamped + by) * clamped + cy) * clamped
}

function countReady(times: number[], t: number) {
  let n = 0
  for (const time of times) {
    if (t + 0.001 < time) break
    n += 1
  }
  return n
}

function shownAt(t: number, marks: Marks): Shown {
  return {
    swatches: countReady(marks.swatches, t),
    products: countReady(marks.products, t),
    copies: countReady(marks.copies, t),
  }
}

/** Positive translateY shows the top. 0 is the pinned end (bottom flush). */
function shiftFor(t: number, overflow: number, marks: Marks) {
  if (overflow <= 0) return 0
  if (t < marks.scrollStart) return overflow
  if (t < marks.scrollEnd) {
    const p = easeInOut((t - marks.scrollStart) / SCROLL_MS)
    return overflow * (1 - p)
  }
  if (t < marks.returnStart) return 0
  const p = easeInOut((t - marks.returnStart) / RETURN_MS)
  return overflow * p
}

function sameShown(a: Shown, b: Shown) {
  return a.swatches === b.swatches && a.products === b.products && a.copies === b.copies
}

function setReveal(el: HTMLElement, on: boolean, instant: boolean) {
  const opacity = on ? '1' : '0'
  const transform = on ? 'none' : 'translateY(6px)'
  if (!instant && el.style.opacity === opacity && el.style.transform === transform) return
  if (instant) el.style.transition = 'none'
  el.style.opacity = opacity
  el.style.transform = transform
  if (instant) {
    void el.offsetHeight
    el.style.transition = ''
  }
}

export function BrandScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="YourBrand profile with colors, voice, four products, and ad copy">
      <BrandBody size={size} />
    </SceneFrame>
  )
}

function BrandBody({ size }: { size: SceneSize }) {
  const phase = useScenePhase()
  const clipRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const swatches = BRAND.swatches
  const products = BRAND.products
  const copies = BRAND_AD_COPY
  const shownRef = useRef<Shown>({
    swatches: swatches.length,
    products: products.length,
    copies: copies.length,
  })
  const elapsedRef = useRef(0)

  useLayoutEffect(() => {
    const scroll = scrollRef.current
    const clip = clipRef.current
    if (!scroll || !clip) return

    const full: Shown = {
      swatches: swatches.length,
      products: products.length,
      copies: copies.length,
    }
    const marks = buildMarks(full.swatches, full.products, full.copies)
    const scan = clip.parentElement?.querySelector('.brand-scan')
    const revealNodes = {
      swatches: [...scroll.querySelectorAll<HTMLElement>('.swatch')],
      products: [...scroll.querySelectorAll<HTMLElement>('.brand-product')],
      copies: [...scroll.querySelectorAll<HTMLElement>('.brand-copy')],
    }

    const clearMotion = () => {
      scroll.style.transform = ''
      for (const list of Object.values(revealNodes)) {
        for (const el of list) {
          el.style.opacity = ''
          el.style.transform = ''
          el.style.transition = ''
        }
      }
      if (scan instanceof HTMLElement) {
        scan.style.opacity = ''
        scan.style.top = ''
      }
    }

    const paint = (shown: Shown, instant: boolean) => {
      revealNodes.swatches.forEach((el, index) => setReveal(el, shown.swatches > index, instant))
      revealNodes.products.forEach((el, index) => setReveal(el, shown.products > index, instant))
      revealNodes.copies.forEach((el, index) => setReveal(el, shown.copies > index, instant))
      if (scan instanceof HTMLElement) {
        const total = full.swatches + full.products + full.copies
        const revealed = shown.swatches + shown.products + shown.copies
        const scanning = revealed > 0 && shown.copies < full.copies
        scan.style.opacity = scanning ? '1' : '0'
        scan.style.top = `${Math.min(96, (revealed / Math.max(1, total)) * 100)}%`
      }
    }

    if (phase === 'off') {
      elapsedRef.current = 0
      shownRef.current = full
      clearMotion()
      return
    }

    if (phase !== 'play') return

    const apply = (t: number) => {
      const overflow = Math.max(0, scroll.offsetHeight - clip.clientHeight)
      const y = shiftFor(t, overflow, marks)
      scroll.style.transform = `translateY(${y.toFixed(2)}px)`
      const next = shownAt(t, marks)
      const instant = !sameShown(shownRef.current, next) && (
        next.swatches < shownRef.current.swatches ||
        next.products < shownRef.current.products ||
        next.copies < shownRef.current.copies
      )
      shownRef.current = next
      paint(next, instant)
    }

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      elapsedRef.current = (elapsedRef.current + dt) % marks.loop
      apply(elapsedRef.current)
      raf = window.requestAnimationFrame(tick)
    }
    apply(elapsedRef.current)
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [phase, swatches.length, products.length, copies.length])

  return (
    <ScenePanel className="brand">
      <div className="brand-scan" />
      <div className="brand-clip" ref={clipRef}>
        <div ref={scrollRef} className="brand-scroll">
          {size === 'wide' ? (
            <div className="brand-sources">
              {BRAND_SOURCES.map(({ label, detail, icon: Icon, tone }) => (
                <div key={label} className="brand-source">
                  <IconTile tone={tone}>
                    <Icon size={18} />
                  </IconTile>
                  <span>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="brand-top">
            <div className="brand-head">
              <div className="logo-tile">
                <img src={BRAND.logoSrc} alt="" width={1024} height={1022} loading="lazy" decoding="async" />
              </div>
              <div>
                <div className="brand-name">{BRAND.name}</div>
                <div className="brand-cat">{BRAND.category}</div>
              </div>
            </div>
          </div>
          <div className="brand-block">
            <div className="brand-kicker">Brand colors</div>
            <div className="swatches">
              {swatches.map((color) => (
                <span key={color} className="swatch scene-reveal" style={{ background: color }} />
              ))}
            </div>
          </div>
          <div className="brand-block">
            <div className="brand-kicker">Brand voice</div>
            <p className="brand-voice">{BRAND.brandVoice}</p>
          </div>
          <div className="brand-block">
            <div className="brand-kicker">{`Products found · ${products.length} items`}</div>
            <div className="brand-products">
              {products.map((product) => (
                <div key={product.id} className="brand-product scene-reveal">
                  <Still src={product.imageSrc} width={571} height={1024} />
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="brand-block">
            <div className="brand-kicker">Ad copy</div>
            <div className="brand-copies">
              {copies.map((line) => (
                <div key={line} className="brand-copy scene-reveal">
                  <Tag size={14} />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}
