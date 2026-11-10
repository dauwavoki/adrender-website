import { Check, Globe, Storefront, UploadSimple } from '@phosphor-icons/react'
import { DEMO_BRAND } from '../../data/howItWorksMock'
import { IconTile, type TileTone } from '../site/IconTile'
import type { ComponentType } from 'react'
import type { IconWeight } from '@phosphor-icons/react'

export const BRAND_OPTIONS: {
  label: string
  detail: string
  icon: ComponentType<{ className?: string; weight?: IconWeight; size?: number }>
  tone: TileTone
}[] = [
  { label: 'Scan URL', detail: 'Paste your website', icon: Globe, tone: 'blue' },
  { label: 'Upload assets', detail: 'Add logos, photos or documents', icon: UploadSimple, tone: 'violet' },
  { label: 'Connect Shopify store', detail: 'Import your products', icon: Storefront, tone: 'amber' },
]

function BrandOptionTiles() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {BRAND_OPTIONS.map(({ label, detail, icon: Icon, tone }) => (
        <div
          key={label}
          className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-4"
        >
          <IconTile tone={tone} size={36}>
            <Icon size={18} />
          </IconTile>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-primary">{label}</span>
            <span className="mt-1 block text-xs leading-snug text-muted">{detail}</span>
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
    <div className="space-y-4">
      <div className="space-y-4">
        <BrandOptionTiles />

        <div className="border-t border-border" />

        {/* Brand name + logo + colours on one row; brand voice on the line below */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="rounded-full bg-inset p-1.5 text-primary">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary">{DEMO_BRAND.name}</p>
                <p className="text-xs text-muted">{DEMO_BRAND.category}</p>
              </div>
            </div>

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface"
              title={`${DEMO_BRAND.name} logo`}
            >
              <img
                src={DEMO_BRAND.logoSrc}
                alt={`${DEMO_BRAND.name} logo`}
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5">
              <span className="text-xs text-faded">
                Brand colors
              </span>
              <div className="flex gap-2">
                {DEMO_BRAND.swatches.map((color) => (
                  <div
                    key={color}
                    className="h-8 w-8 rounded-md border border-border shadow-sm sm:h-9 sm:w-9"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs text-faded">
              Brand voice
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-secondary">{DEMO_BRAND.brandVoice}</p>
          </div>
        </div>

        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs text-faded">
              Products found
            </span>
            <span className="text-[11px] text-muted">
              {DEMO_BRAND.products.length} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {DEMO_BRAND.products.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2 text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-inset">
                  <img
                    src={prod.imageSrc}
                    alt={prod.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="line-clamp-1 text-[11px] font-semibold text-primary">{prod.name}</p>
                <p className="font-mono text-[10px] font-medium text-muted">
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
