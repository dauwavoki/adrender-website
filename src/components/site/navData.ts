import {
  Books,
  FrameCorners,
  Layout,
  MagicWand,
  Palette,
  Path,
  SquaresFour,
  Storefront,
  Users,
  type Icon,
} from '@phosphor-icons/react'
import type { TileTone } from './IconTile'

export type ProductLink = {
  to: string
  title: string
  body: string
  icon: Icon
  tone: TileTone
}

export const PRODUCT_MAKE: ProductLink[] = [
  {
    to: '/#how-it-works',
    title: 'How it works',
    body: 'Add your brand. Choose winning templates. See your ads.',
    icon: Path,
    tone: 'blue',
  },
  {
    to: '/#features',
    title: 'Features',
    body: 'A creative production system, not a collection of tools.',
    icon: SquaresFour,
    tone: 'violet',
  },
  {
    to: '/about#templates',
    title: 'Browse templates',
    body: '100M+ real ads. Searchable.',
    icon: Layout,
    tone: 'orange',
  },
  {
    to: '/about#playground',
    title: 'Ad Playground',
    body: 'Your canvas, not a template.',
    icon: MagicWand,
    tone: 'green',
  },
  {
    to: '/about#sizes',
    title: 'Sizes and formats',
    body: '11 formats. Every platform.',
    icon: FrameCorners,
    tone: 'amber',
  },
]

export const PRODUCT_BRAND: ProductLink[] = [
  {
    to: '/about#brands',
    title: 'Brands',
    body: 'Learns your brand once. Applies it to everything.',
    icon: Palette,
    tone: 'blue',
  },
  {
    to: '/about#library',
    title: 'Library',
    body: 'Save what works. Reuse it forever.',
    icon: Books,
    tone: 'violet',
  },
  {
    to: '/about#workspaces',
    title: 'Workspaces',
    body: 'Built for agencies and teams.',
    icon: Users,
    tone: 'orange',
  },
  {
    to: '/blog/adrender-shopify-app',
    title: 'Shopify app',
    body: 'A native Shopify app, billed through Shopify.',
    icon: Storefront,
    tone: 'green',
  },
]

export const COMPANY_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/affiliates', label: 'Affiliates' },
  { to: '/contact', label: 'Contact' },
] as const
