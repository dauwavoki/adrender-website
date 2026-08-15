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
    tagline: 'Try it out',
    monthly: 0,
    annual: null,
    features: [
      '10 tokens/mo',
      '1 Brand & Campaign',
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
      '150 tokens/mo',
      '20 Brands & Campaigns',
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
    monthly: 49,
    annual: 470,
    features: [
      '400 tokens/mo',
      '40 Brands & Campaigns',
      'Team workspaces: Yes',
      'Concurrent renders: 40',
      'Shopify sync: Yes',
      'No watermarks',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For agencies & freelancers',
    monthly: 99,
    annual: 950,
    features: [
      '1,000 tokens/mo',
      '60 Brands & Campaigns',
      'Team workspaces: Yes',
      'Concurrent renders: 50',
      'Shopify sync: Yes',
      'No watermarks',
    ],
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For teams running at full volume',
    monthly: 299,
    annual: 2870,
    features: [
      '3,500 tokens/mo',
      'Unlimited Brands & Campaigns',
      'Team workspaces: Yes',
      'Concurrent renders: Unlimited',
      'Shopify sync: Yes',
      'No watermarks',
    ],
  },
]
