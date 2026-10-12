import { Check, Globe, ShoppingBag, Upload, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { DEMO_BRAND } from '../../data/howItWorksMock'

const BRAND_OPTIONS: {
  label: string
  detail: string
  icon: LucideIcon
  from: string
  to: string
}[] = [
  { label: 'Scan URL', detail: 'Paste your website', icon: Globe, from: '#00e5ff', to: '#2f80ff' },
  {
    label: 'Upload Assets',
    detail: 'Add logos, photos or documents',
    icon: Upload,
    from: '#7b4fd4',
    to: '#e23d9b',
  },
  {
    label: 'Connect Shopify Store',
    detail: 'Import your products',
    icon: ShoppingBag,
    from: '#f5b031',
    to: '#ff6b2b',
  },
]

function BrandOptionTiles() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {BRAND_OPTIONS.map(({ label, detail, icon: Icon, from, to }) => (
        <div
          key={label}
          className="relative flex min-w-0 cursor-default items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#12121a] px-3.5 py-4"
          style={{
            backgroundImage: `radial-gradient(ellipse 110% 80% at 0% 0%, color-mix(in srgb, ${from} 18%, transparent), transparent 64%)`,
          }}
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-0.5"
            style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
            aria-hidden
          />
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
            aria-hidden
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span
              className="block max-w-full font-heading text-lg font-bold leading-tight tracking-tight"
              style={
                {
                  backgroundImage: `linear-gradient(120deg, ${from}, ${to})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                } satisfies CSSProperties
              }
            >
              {label}
            </span>
            <span className="mt-1 block text-xs leading-snug text-white/55">{detail}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * Card 1 — three ways to add a brand, then the extracted example result.
 */
export function BrandScan() {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/80">
        Scan your website and AdRender pulls your brand voice, colors, logo, product images and ad
        copy automatically. Or upload your assets, or connect your Shopify store. No URL needed to
        start, and you can add your assets any time later.
      </p>

      <div className="space-y-4">
        <BrandOptionTiles />

        <div className="border-t border-white/10" />

        {/* Brand name + logo + colours on one row; brand voice on the line below */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="rounded-full bg-[color:color-mix(in_srgb,var(--accent-cyan)_18%,transparent)] p-1.5 text-[var(--accent-cyan)]">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{DEMO_BRAND.name}</p>
                <p className="text-xs text-white/40">{DEMO_BRAND.category}</p>
              </div>
            </div>

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-bg-card"
              title={`${DEMO_BRAND.name} logo`}
            >
              <img
                src={DEMO_BRAND.logoSrc}
                alt={`${DEMO_BRAND.name} logo`}
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Brand colors
              </span>
              <div className="flex gap-2">
                {DEMO_BRAND.swatches.map((color) => (
                  <div
                    key={color}
                    className="h-8 w-8 rounded-md border border-white/20 shadow-sm sm:h-9 sm:w-9"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Brand voice
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-white/70">{DEMO_BRAND.brandVoice}</p>
          </div>
        </div>

        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Products found
            </span>
            <span className="font-mono text-[11px] text-white/40">
              {DEMO_BRAND.products.length} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {DEMO_BRAND.products.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-bg-card p-2 text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-white/5">
                  <img
                    src={prod.imageSrc}
                    alt={prod.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="line-clamp-1 text-[11px] font-semibold text-white/80">{prod.name}</p>
                <p className="font-mono text-[10px] font-medium text-white/55">
                  {prod.adCopyCount} ad copies created
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
