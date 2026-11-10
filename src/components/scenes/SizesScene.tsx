import { FacebookLogo, GoogleLogo, InstagramLogo, LinkedinLogo, TiktokLogo } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { Segmented } from './parts/Segmented'
import { Still } from './parts/Still'
import { AD_SIZES, QUALITY, RESOLUTIONS, SIZE_AD, formatTokens, type SceneSize } from './sceneData'

const PLATFORMS = [
  { name: 'Facebook', icon: FacebookLogo },
  { name: 'Instagram', icon: InstagramLogo },
  { name: 'TikTok', icon: TiktokLogo },
  { name: 'Google', icon: GoogleLogo },
  { name: 'LinkedIn', icon: LinkedinLogo },
]

export function SizesScene({ size }: { size: SceneSize }) {
  const rates = RESOLUTIONS.map((row) => ({
    value: row.id,
    label: row.id,
    sub: formatTokens(row.standard),
  }))

  return (
    <SceneFrame size={size} label="One YourBrand ad in square, portrait, story, and landscape sizes">
      <ScenePanel className="sizes">
        <div className="sizes-row">
          {AD_SIZES.map((item) => (
            <div className="size-col" key={item.id}>
              <div className="size-label">
                <b>{item.name}</b>
                <span>{`${item.width}×${item.height}`}</span>
              </div>
              <div className="size-frame" style={{ aspectRatio: item.ratio }}>
                <Still src={SIZE_AD.src} width={SIZE_AD.width} height={SIZE_AD.height} />
              </div>
            </div>
          ))}
        </div>
        <div className="size-icons">
          {PLATFORMS.map(({ name, icon: Icon }) => (
            <Icon key={name} size={22} />
          ))}
        </div>
        <Segmented options={rates} selected="1K" tall />
        <Segmented options={[QUALITY.standard, QUALITY.pro]} selected={QUALITY.standard} />
      </ScenePanel>
    </SceneFrame>
  )
}
