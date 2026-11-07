import {
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  LinkedinLogo,
  MetaLogo,
  PinterestLogo,
  Storefront,
  TiktokLogo,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconWeight } from '@phosphor-icons/react'
import { InvertedBand } from './site/InvertedBand'
import { SplitTitle } from './site/SplitTitle'
import { PrimaryLink, TextLink } from './site/Buttons'

const SHOPIFY_APP_URL = 'https://apps.shopify.com/adrender'
const SHOPIFY_APP_POST_PATH = '/blog/adrender-shopify-app'

type Logo = ComponentType<{ className?: string; weight?: IconWeight; size?: number }>

const ORBIT: { icon: Logo; label: string }[] = [
  { icon: MetaLogo, label: 'Meta' },
  { icon: InstagramLogo, label: 'Instagram' },
  { icon: FacebookLogo, label: 'Facebook' },
  { icon: TiktokLogo, label: 'TikTok' },
  { icon: GoogleLogo, label: 'Google' },
  { icon: LinkedinLogo, label: 'LinkedIn' },
  { icon: PinterestLogo, label: 'Pinterest' },
]

function orbitStyle(index: number, count: number, radius: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
  }
}

export function ShopifyBand() {
  const inner = ORBIT.slice(0, 3)
  const outer = ORBIT.slice(3)

  return (
    <InvertedBand>
      <div className="shopify-band">
        <div>
          <SplitTitle as="h2" tone="band" lead="Using Shopify?" rest="Get the native app." />
          <p className="site-lead">
            A native Shopify app, separate from the web app but working in a similar way. It turns
            your product catalog into on-brand image and video ads for Facebook and Instagram. Install
            from the Shopify App Store, your products connect automatically, and billing goes through
            Shopify. Unused plan tokens roll over on paid plans.
          </p>
          <div className="site-hero-actions">
            <PrimaryLink href={SHOPIFY_APP_URL} newTab>Get the Shopify app</PrimaryLink>
            <TextLink href={SHOPIFY_APP_POST_PATH}>How the Shopify app works</TextLink>
          </div>
        </div>
        <div className="logo-orbit" aria-hidden>
          <span className="logo-orbit-center" title="Shopify">
            <Storefront size={28} />
          </span>
          {inner.map((item, index) => {
            const Icon = item.icon
            return (
              <span key={item.label} className="logo-orbit-item" style={orbitStyle(index, inner.length, 28)} title={item.label}>
                <Icon size={22} />
              </span>
            )
          })}
          {outer.map((item, index) => {
            const Icon = item.icon
            return (
              <span key={item.label} className="logo-orbit-item" style={orbitStyle(index, outer.length, 42)} title={item.label}>
                <Icon size={22} />
              </span>
            )
          })}
        </div>
      </div>
    </InvertedBand>
  )
}
