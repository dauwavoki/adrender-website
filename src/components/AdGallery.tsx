import { SplitTitle } from './site/SplitTitle'

const ADS = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0')
  return {
    src: `/how-it-works/ads/ad-${n}.png`,
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
  return (
    <section className="site-section">
      <div className="site-column">
        <SplitTitle as="h2" lead="Your brand, in every format." rest="Static and video." className="is-center" />
        <div className="ad-arc-wrap">
          <div className="ad-arc">
            {ADS.map((ad, index) => (
              <span key={ad.src} className="ad-arc-tile" style={arcStyle(index, ADS.length)}>
                <span className="ad-arc-frame">
                  <img
                    src={ad.src}
                    alt={ad.alt}
                    width={120}
                    height={160}
                    loading="eager"
                    decoding="async"
                  />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
