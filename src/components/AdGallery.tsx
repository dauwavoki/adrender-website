import { useEffect, useRef } from 'react'
import { SplitTitle } from './site/SplitTitle'

type ArcAd =
  | { kind: 'static'; src: string; alt: string }
  | { kind: 'video'; src: string; poster: string; alt: string }

/**
 * Tile 10 (index 9) would be ad-10.png, which has a cream frame in the file.
 * ad-03.png is a YourBrand still that is not already in this arc.
 */
const ARC_STILL_SRC: Partial<Record<number, string>> = {
  9: '/how-it-works/ads/ad-03.png',
}

/** Tiles 3, 4, 7 and 8 (left to right) play the YourBrand clips. */
const VIDEO_SLOTS: Record<number, { src: string; poster: string }> = {
  2: { src: '/how-it-works/video-01.mp4', poster: '/how-it-works/video-01.jpg' },
  3: { src: '/how-it-works/video-03.mp4', poster: '/how-it-works/video-03.jpg' },
  6: { src: '/how-it-works/video-04.mp4', poster: '/how-it-works/video-04.jpg' },
  7: { src: '/how-it-works/video-06.mp4', poster: '/how-it-works/video-06.jpg' },
}

const ADS: ArcAd[] = Array.from({ length: 12 }, (_, index) => {
  const video = VIDEO_SLOTS[index]
  if (video) {
    return {
      kind: 'video',
      src: video.src,
      poster: video.poster,
      alt: `YourBrand rendered video ad ${index + 1}`,
    }
  }
  const n = String(index + 1).padStart(2, '0')
  return {
    kind: 'static',
    src: ARC_STILL_SRC[index] ?? `/how-it-works/ads/ad-${n}.png`,
    alt: `YourBrand rendered ad ${index + 1}`,
  }
})

function arcStyle(index: number, count: number) {
  const t = count === 1 ? 0 : (index / (count - 1)) * 2 - 1
  const lift = Math.cos((t * Math.PI) / 2) * 36
  const rotate = t * 7
  return { transform: `translateY(${-lift}px) rotate(${rotate}deg)` }
}

export function AdGallery() {
  const arcRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = arcRef.current
    if (!root) return
    const videos = Array.from(root.querySelectorAll('video'))
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const pauseAll = () => {
      videos.forEach((video) => {
        video.pause()
        video.autoplay = false
      })
    }

    if (motion.matches) pauseAll()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (motion.matches || !entry?.isIntersecting) {
          videos.forEach((video) => video.pause())
          return
        }
        videos.forEach((video) => {
          video.muted = true
          void video.play().catch(() => undefined)
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(root)

    const onMotion = () => {
      if (motion.matches) pauseAll()
    }
    motion.addEventListener('change', onMotion)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onMotion)
    }
  }, [])

  return (
    <section className="site-section">
      <div className="site-column">
        <SplitTitle as="h2" lead="Your brand, in every format." rest="Static and video." className="is-center" />
        <div className="ad-arc-wrap">
          <div className="ad-arc" ref={arcRef}>
            {ADS.map((ad, index) => (
              <span key={`${ad.kind}-${ad.src}`} className="ad-arc-tile" style={arcStyle(index, ADS.length)}>
                <span className="ad-arc-frame">
                  {ad.kind === 'video' ? (
                    <video
                      src={ad.src}
                      poster={ad.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      aria-label={ad.alt}
                    />
                  ) : (
                    <img src={ad.src} alt={ad.alt} width={120} height={160} loading="eager" decoding="async" />
                  )}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
