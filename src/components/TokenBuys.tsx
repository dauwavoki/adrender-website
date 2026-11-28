import type { ReactNode } from 'react'
import { ArrowsOut, Coins, Image, Sparkle, VideoCamera } from '@phosphor-icons/react'
import { getSignupUrl } from '../lib/appUrl'
import { IconTile, type TileTone } from './site/IconTile'

type Accent = {
  from: string
  to: string
}

type RateColumns = {
  resolution: string
  standard: string
  pro: string
}

type RateRow = {
  resolution: string
  standard: number
  pro: number
}

type RateTable = {
  title: string
  accent: Accent
  columns: RateColumns
  unitLabel: string
  rows: RateRow[]
}

type TokenPack = {
  price: number
  tokens: number
  badge?: string
}

type TokenBuysContent = {
  heading: string
  subline: string
  imageAds: RateTable
  videoUpscale: RateTable & { notes: string[] }
  videoAds: {
    title: string
    accent: Accent
    unitLabel: string
    resolutionLabel: string
    /** Quality columns in price order. null = not offered at that resolution. */
    tiers: string[]
    rows: { resolution: string; prices: (number | null)[] }[]
    duration: {
      standardMaxSeconds: number
      proMaxSeconds: number
      minSeconds: number
    }
  }
  topUps: {
    title: string
    accent: Accent
    packs: TokenPack[]
    notes: string[]
  }
  included: {
    title: string
    inputsNote: string
    modelsNote: string
    mainModels: string[]
    supplementaryModels: string[]
  }
}

/** Edit token rates, pack prices, and limits here. */
const TOKEN_BUYS: TokenBuysContent = {
  heading: 'What 1 token buys',
  subline: '1 token = one 1K image ad. Everything else scales from there.',
  imageAds: {
    title: 'Image ads',
    accent: { from: '#00e5ff', to: '#2f80ff' },
    columns: { resolution: 'Resolution', standard: 'Standard', pro: 'Pro' },
    unitLabel: '(tokens)',
    rows: [
      { resolution: '1K', standard: 1, pro: 2 },
      { resolution: '2K', standard: 2, pro: 4 },
      { resolution: '4K', standard: 4, pro: 8 },
    ],
  },
  videoAds: {
    title: 'Video ads',
    accent: { from: '#7b4fd4', to: '#e23d9b' },
    unitLabel: 'tokens per second',
    resolutionLabel: 'Resolution',
    tiers: ['Standard Flash', 'Standard', 'Pro Flash', 'Pro'],
    rows: [
      { resolution: '480p', prices: [3, 5, 6, 7] },
      { resolution: '720p', prices: [5, 8, 9, 11] },
      { resolution: '1080p', prices: [null, 13, null, 16] },
      { resolution: '4K', prices: [null, 22, null, 27] },
    ],
    duration: { standardMaxSeconds: 15, proMaxSeconds: 30, minSeconds: 4 },
  },
  videoUpscale: {
    title: 'Video upscale',
    accent: { from: '#7b4fd4', to: '#00e5ff' },
    columns: { resolution: 'From → to', standard: 'Standard', pro: 'Pro' },
    unitLabel: 'tokens per second',
    rows: [
      { resolution: '480p → 720p', standard: 3, pro: 4 },
      { resolution: '480p → 1080p', standard: 8, pro: 9 },
      { resolution: '720p → 1080p', standard: 5, pro: 5 },
      { resolution: '480p → 4K', standard: 17, pro: 20 },
      { resolution: '720p → 4K', standard: 14, pro: 16 },
    ],
    notes: [
      'You only pay the difference: the price at the new resolution minus what you paid for the render.',
      'So a render plus its upscale always costs the same as rendering at that resolution in the first place.',
    ],
  },
  topUps: {
    title: 'Top-ups',
    accent: { from: '#f5b031', to: '#ff6b2b' },
    packs: [
      { price: 12, tokens: 100 },
      { price: 30, tokens: 300 },
      { price: 75, tokens: 900, badge: 'Popular' },
      { price: 180, tokens: 2400 },
      { price: 400, tokens: 6000, badge: 'Best value' },
      { price: 750, tokens: 12000, badge: 'Ultimate savings' },
    ],
    notes: ['Top-up tokens never expire.', 'Failed renders are refunded.'],
  },
  included: {
    title: 'Included in every price',
    inputsNote: "Token prices include your input templates. We don't charge extra for video templates, reskinning or references.",
    modelsNote: 'We only use top-tier AI models, each picked for the job its skill does best.',
    mainModels: ['Nano Banana 2.1', 'Gemini 3 Pro', 'GPT Image 2.6', 'Seedance 2.5', 'Seedance 2.0'],
    supplementaryModels: ['Seedream 5.5', 'FLUX 3', 'Wan 2.6', 'Kling 4.0'],
  },
}

/** Image rates and quality names for scenes that must match this table. */
export const IMAGE_AD_RATES = TOKEN_BUYS.imageAds.rows
export const IMAGE_QUALITY_LABELS = {
  standard: TOKEN_BUYS.imageAds.columns.standard,
  pro: TOKEN_BUYS.imageAds.columns.pro,
} as const
export const TOKEN_TOP_UPS = TOKEN_BUYS.topUps.packs

function formatTokens(value: number) {
  return value.toLocaleString('en-US')
}

function formatPrice(amount: number) {
  return `$${amount.toLocaleString('en-US')}`
}

function durationNotes(video: TokenBuysContent['videoAds']) {
  const { duration } = video
  return [
    `Standard up to ${duration.standardMaxSeconds}s, Pro up to ${duration.proMaxSeconds}s.`,
    `${duration.minSeconds} seconds minimum.`,
  ]
}

function listNames(names: string[]) {
  if (names.length < 2) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

function IncludedCard({ included }: { included: TokenBuysContent['included'] }) {
  return (
    <article className="site-plan site-token-included">
      <div className="site-plan-head">
        <IconTile tone="blue" size={32}>
          <Sparkle size={16} />
        </IconTile>
        <h3>{included.title}</h3>
      </div>
      <div className="site-token-included-body">
        <p>{included.inputsNote}</p>
        <p>{included.modelsNote}</p>
        <p>
          <strong>Main models:</strong> {listNames(included.mainModels)}.
        </p>
        <p>
          <strong>Supplementary models:</strong> {listNames(included.supplementaryModels)}.
        </p>
      </div>
    </article>
  )
}

function TokenFigure({ value }: { value: number }) {
  return <span className="num">{formatTokens(value)}</span>
}

function BuyCard({
  title,
  tone,
  icon: Icon,
  signupUrl,
  children,
}: {
  title: string
  tone: TileTone
  icon: typeof Image
  signupUrl: string
  children: ReactNode
}) {
  return (
    <article className="site-plan">
      <a href={signupUrl} className="site-buy-link" aria-label={`${title}: start free`}>
        <div className="site-plan-head">
          <IconTile tone={tone} size={32}>
            <Icon size={16} />
          </IconTile>
          <h3>{title}</h3>
        </div>
        {children}
      </a>
    </article>
  )
}

function RateCard({ table, notes, signupUrl, tone, icon }: { table: RateTable; notes?: string[]; signupUrl: string; tone: TileTone; icon: typeof Image }) {
  return (
    <BuyCard title={table.title} signupUrl={signupUrl} tone={tone} icon={icon}>
      <table className="site-table">
        <caption className="sr-only">{`${table.title} by resolution, ${table.unitLabel}`}</caption>
        <thead>
          <tr>
            <th scope="col">{table.columns.resolution}</th>
            <th scope="col" className="num">
              {table.columns.standard}
            </th>
            <th scope="col" className="num">
              {table.columns.pro}
            </th>
          </tr>
          <tr>
            <td />
            <th scope="colgroup" colSpan={2} className="num">
              {table.unitLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.resolution}>
              <th scope="row">{row.resolution}</th>
              <td className="num">
                <TokenFigure value={row.standard} />
              </td>
              <td className="num">
                <TokenFigure value={row.pro} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {notes && notes.length > 0 ? (
        <div className="site-buy-notes">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </BuyCard>
  )
}

function VideoRateCard({ video, notes, signupUrl }: { video: TokenBuysContent['videoAds']; notes: string[]; signupUrl: string }) {
  return (
    <BuyCard title={video.title} signupUrl={signupUrl} tone="violet" icon={VideoCamera}>
      <table className="site-table site-table-tiers">
        <caption className="sr-only">{`${video.title} by resolution and quality, ${video.unitLabel}`}</caption>
        <thead>
          <tr>
            <th scope="col">{video.resolutionLabel}</th>
            {video.tiers.map((tier) => (
              <th key={tier} scope="col" className="num">
                {tier}
              </th>
            ))}
          </tr>
          <tr>
            <td />
            <th scope="colgroup" colSpan={video.tiers.length} className="num">
              {video.unitLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {video.rows.map((row) => (
            <tr key={row.resolution}>
              <th scope="row">{row.resolution}</th>
              {row.prices.map((price, index) => (
                <td key={video.tiers[index]} className="num">
                  {price === null ? <span aria-label="not offered">–</span> : <TokenFigure value={price} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="site-buy-notes">
        {notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </BuyCard>
  )
}

function TopUpsCard({ topUps, signupUrl }: { topUps: TokenBuysContent['topUps']; signupUrl: string }) {
  return (
    <BuyCard title={topUps.title} signupUrl={signupUrl} tone="amber" icon={Coins}>
      <table className="site-table">
        <caption className="sr-only">Token top-up packs</caption>
        <tbody>
          {topUps.packs.map((pack) => (
            <tr key={pack.price}>
              <th scope="row">
                <span className="site-pack-price">
                  {formatPrice(pack.price)}
                  {pack.badge ? <span className="site-badge">{pack.badge}</span> : null}
                </span>
              </th>
              <td className="num">
                <TokenFigure value={pack.tokens} /> tokens
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="site-buy-notes">
        {topUps.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </BuyCard>
  )
}

export function TokenBuys() {
  const signupUrl = getSignupUrl()
  const videoNotes = durationNotes(TOKEN_BUYS.videoAds)

  return (
    <div className="site-token-buys">
      <h3 className="site-h3">{TOKEN_BUYS.heading}</h3>
      <p className="site-lead">{TOKEN_BUYS.subline}</p>
      <div className="site-token-grid">
        <RateCard table={TOKEN_BUYS.imageAds} signupUrl={signupUrl} tone="blue" icon={Image} />
        <VideoRateCard video={TOKEN_BUYS.videoAds} notes={videoNotes} signupUrl={signupUrl} />
        <RateCard table={TOKEN_BUYS.videoUpscale} notes={TOKEN_BUYS.videoUpscale.notes} signupUrl={signupUrl} tone="violet" icon={ArrowsOut} />
        <TopUpsCard topUps={TOKEN_BUYS.topUps} signupUrl={signupUrl} />
      </div>
      <IncludedCard included={TOKEN_BUYS.included} />
    </div>
  )
}
