import type { ReactNode } from 'react'
import { ArrowsOut, Coins, Image, VideoCamera } from '@phosphor-icons/react'
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
  videoAds: RateTable & {
    flashNote: string
    includedNote: string
    example: {
      seconds: number
      resolution: string
      tier: 'standard' | 'pro'
    }
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
    columns: { resolution: 'Resolution', standard: 'Standard', pro: 'Pro' },
    unitLabel: 'tokens per second',
    rows: [
      { resolution: '480p', standard: 5, pro: 7 },
      { resolution: '720p', standard: 8, pro: 11 },
      { resolution: '1080p', standard: 13, pro: 16 },
      { resolution: '4K', standard: 22, pro: 27 },
      { resolution: '480p Flash', standard: 3, pro: 6 },
      { resolution: '720p Flash', standard: 5, pro: 9 },
    ],
    flashNote: 'Flash is cheaper and faster, at 480p and 720p only.',
    includedNote: "Token prices include your input templates. We don't charge extra for video templates, reskinning or references.",
    example: { seconds: 5, resolution: '720p', tier: 'standard' },
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

function exampleNote(video: TokenBuysContent['videoAds']) {
  const row = video.rows.find((entry) => entry.resolution === video.example.resolution)
  const rate = row ? (video.example.tier === 'pro' ? row.pro : row.standard) : 0
  const total = rate * video.example.seconds
  const tierLabel = video.columns[video.example.tier]
  const flashRow = video.rows.find((entry) => entry.resolution === `${video.example.resolution} Flash`)
  const flashRate = flashRow ? (video.example.tier === 'pro' ? flashRow.pro : flashRow.standard) : 0
  const flashPart = flashRate ? `, ${formatTokens(flashRate * video.example.seconds)} with Flash` : ''
  return `Example: a ${video.example.seconds}-second ${video.example.resolution} ad = ${formatTokens(total)} tokens (${tierLabel})${flashPart}.`
}

function durationNote(video: TokenBuysContent['videoAds']) {
  const { columns, duration } = video
  return `${columns.standard} up to ${duration.standardMaxSeconds}s, ${columns.pro} up to ${duration.proMaxSeconds}s. ${duration.minSeconds}s minimum.`
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

function TopUpsCard({ topUps, signupUrl }: { topUps: TokenBuysContent['topUps']; signupUrl: string }) {
  return (
    <BuyCard title={topUps.title} signupUrl={signupUrl} tone="amber" icon={Coins}>
      <table className="site-table">
        <caption className="sr-only">Token top-up packs</caption>
        <tbody>
          {topUps.packs.map((pack) => (
            <tr key={pack.price}>
              <th scope="row">
                {formatPrice(pack.price)}
                {pack.badge ? <span className="site-badge">{pack.badge}</span> : null}
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
  const videoNotes = [
    exampleNote(TOKEN_BUYS.videoAds),
    durationNote(TOKEN_BUYS.videoAds),
    TOKEN_BUYS.videoAds.flashNote,
    TOKEN_BUYS.videoAds.includedNote,
  ]

  return (
    <div className="site-token-buys">
      <h3 className="site-h3">{TOKEN_BUYS.heading}</h3>
      <p className="site-lead">{TOKEN_BUYS.subline}</p>
      <div className="site-token-grid">
        <RateCard table={TOKEN_BUYS.imageAds} signupUrl={signupUrl} tone="blue" icon={Image} />
        <RateCard table={TOKEN_BUYS.videoAds} notes={videoNotes} signupUrl={signupUrl} tone="violet" icon={VideoCamera} />
        <RateCard table={TOKEN_BUYS.videoUpscale} notes={TOKEN_BUYS.videoUpscale.notes} signupUrl={signupUrl} tone="violet" icon={ArrowsOut} />
        <TopUpsCard topUps={TOKEN_BUYS.topUps} signupUrl={signupUrl} />
      </div>
    </div>
  )
}
