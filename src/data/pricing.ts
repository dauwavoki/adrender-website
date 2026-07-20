export type Billing = 'monthly' | 'annual'

export type Tier = {
  id: string
  name: string
  /** Short line under the plan name — matches app copy */
  tagline?: string
  monthly: number
  /** null = no annual plan shown */
  annual: number | null
  tokens: number | string
  brands: number | string
  seats: number | string
  workspaces: number | string
  concurrent: number | string
  shopify: boolean
  popular?: boolean
}

export const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try it out for free',
    monthly: 0,
    annual: null,
    tokens: 10,
    brands: 1,
    seats: 1,
    workspaces: 0,
    concurrent: 10,
    shopify: false,
  },
  {
    id: 'solo',
    name: 'Solo',
    tagline: 'For solo founders',
    monthly: 19,
    annual: 182,
    tokens: 100,
    brands: 3,
    seats: 3,
    workspaces: 3,
    concurrent: 30,
    shopify: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing DTC brands',
    monthly: 39,
    annual: 374,
    tokens: 300,
    brands: 10,
    seats: 5,
    workspaces: 5,
    concurrent: 40,
    shopify: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For performance marketers',
    monthly: 79,
    annual: 760,
    tokens: 800,
    brands: 50,
    seats: 20,
    workspaces: 20,
    concurrent: 50,
    shopify: true,
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    tagline: 'For agencies and teams',
    monthly: 199,
    annual: 1920,
    tokens: 2500,
    brands: 'Unlimited',
    seats: 'Unlimited',
    workspaces: 'Unlimited',
    concurrent: 'Unlimited',
    shopify: true,
  },
]

export function formatTokens(n: number | string) {
  if (typeof n === 'string') return n
  return n.toLocaleString('en-US')
}
