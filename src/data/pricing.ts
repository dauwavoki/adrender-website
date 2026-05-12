export type Billing = 'monthly' | 'annual'

export type Tier = {
  id: string
  name: string
  monthly: number
  /** null = no annual plan shown */
  annual: number | null
  tokens: number | string
  brands: number | string
  seats: number
  concurrent: number | string
  shopify: boolean
  popular?: boolean
}

export const tiers: Tier[] = [
  { id: 'free', name: 'Free', monthly: 0, annual: null, tokens: 10, brands: 1, seats: 1, concurrent: 10, shopify: false },
  { id: 'solo', name: 'Solo', monthly: 15, annual: 144, tokens: 100, brands: 2, seats: 1, concurrent: 30, shopify: false },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 35,
    annual: 336,
    tokens: 400,
    brands: 10,
    seats: 3,
    concurrent: 40,
    shopify: true,
    popular: true,
  },
  { id: 'pro', name: 'Pro', monthly: 79, annual: 760, tokens: 1500, brands: 50, seats: 10, concurrent: 50, shopify: true },
  {
    id: 'agency',
    name: 'Agency',
    monthly: 199,
    annual: 1920,
    tokens: 4000,
    brands: 'Unlimited',
    seats: 25,
    concurrent: 'Unlimited',
    shopify: true,
  },
]

export function formatTokens(n: number | string) {
  if (typeof n === 'string') return n
  return n.toLocaleString('en-US')
}
