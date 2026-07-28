export type Billing = 'monthly' | 'annual'

export type Tier = {
  id: string
  name: string
  /** Short line under the plan name — matches app copy */
  tagline?: string
  monthly: number
  /** null = no annual plan shown */
  annual: number | null
  /** Feature bullets copied verbatim from in-app pricing */
  features: string[]
  popular?: boolean
}

export const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try it out for free',
    monthly: 0,
    annual: null,
    features: [
      '10 tokens/mo',
      '1 brands',
      'Team workspaces: No',
      'Concurrent renders: 10',
      'Shopify sync: No',
      'No watermarks',
    ],
  },
  {
    id: 'solo',
    name: 'Solo',
    tagline: 'For solo founders',
    monthly: 19,
    annual: 182,
    features: [
      '100 tokens/mo',
      '3 brands',
      'Team workspaces: Yes',
      'Concurrent renders: 30',
      'Shopify sync: No',
      'No watermarks',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing DTC brands',
    monthly: 39,
    annual: 374,
    features: [
      '300 tokens/mo',
      '10 brands',
      'Team workspaces: Yes',
      'Concurrent renders: 40',
      'Shopify sync: Yes',
      'No watermarks',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For performance marketers',
    monthly: 79,
    annual: 760,
    features: [
      '800 tokens/mo',
      '50 brands',
      'Team workspaces: Yes',
      'Concurrent renders: 50',
      'Shopify sync: Yes',
      'No watermarks',
    ],
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    tagline: 'For agencies and teams',
    monthly: 199,
    annual: 1920,
    features: [
      '2,500 tokens/mo',
      'Unlimited brands',
      'Team workspaces: Yes',
      'Concurrent renders: Unlimited',
      'Shopify sync: Yes',
      'No watermarks',
    ],
  },
]
