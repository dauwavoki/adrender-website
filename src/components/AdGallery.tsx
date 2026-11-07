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
              <img
                key={ad.src}
                src={ad.src}
                alt={ad.alt}
                width={132}
                height={176}
                loading="lazy"
                decoding="async"
                style={arcStyle(index, ADS.length)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
