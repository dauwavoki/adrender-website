import { Check, Flame, FlameKindling, Layers, Leaf, Loader2 } from 'lucide-react'
import type { Brand } from './types'

interface BrandSelectorProps {
  brands: Brand[]
  selectedBrand: Brand | null
  isLoading: boolean
  isRevealed: boolean
  onSelectBrand: (brand: Brand) => void
  scanStepText?: string
}

export function BrandSelector({
  brands,
  selectedBrand,
  isLoading,
  isRevealed,
  onSelectBrand,
  scanStepText,
}: BrandSelectorProps) {
  const getBrandIcon = (id: string) => {
    switch (id) {
      case 'velocity-sports':
        return <Flame className="h-4 w-4 text-[var(--accent-cyan)]" />
      case 'glow-botanicals':
        return <Leaf className="h-4 w-4 text-emerald-400" />
      case 'kindle-co':
        return <FlameKindling className="h-4 w-4 text-amber-400" />
      default:
        return <Layers className="h-4 w-4 text-[var(--accent-purple)]" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Demo brand chips only — real URL capture lives on Step 3 */}
      <div className="space-y-4 rounded-xl border border-white/10 bg-bg-elevated p-4 sm:p-5">
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/40">
            try a demo brand:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {brands.map((brand) => {
              const isSelected = selectedBrand?.id === brand.id
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onSelectBrand(brand)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)] text-white shadow-md shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)]'
                      : 'border-white/10 bg-bg-card text-white/70 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-md text-[9px] font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {getBrandIcon(brand.id)}
                  </div>
                  <span>{brand.name}</span>
                  <span className="font-mono text-[10px] opacity-50">({brand.url})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="animate-pulse space-y-3 rounded-xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_5%,transparent)] p-5">
          <div className="flex items-center gap-3 text-sm font-medium text-[var(--accent-cyan)]">
            <Loader2 className="h-4 w-4 animate-spin text-[var(--accent-cyan)]" />
            <span>{scanStepText || 'Scanning website... Processing (2s)'}</span>
          </div>

          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-cyan)]" />
          </div>
        </div>
      )}

      {isRevealed && selectedBrand && !isLoading && (
        <div className="relative space-y-5 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[color:color-mix(in_srgb,var(--accent-cyan)_20%,transparent)] p-1.5 text-[var(--accent-cyan)]">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-white">
                We created{' '}
                <strong className="font-bold text-[var(--accent-cyan)]">
                  {selectedBrand.adCount} new ad copies
                </strong>{' '}
                for {selectedBrand.name}
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/40">
                {selectedBrand.url}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-1 font-mono text-xs uppercase tracking-wider text-white/40">
                Brand Colours:
              </span>
              <div className="flex gap-1.5">
                {selectedBrand.swatches.map((color) => (
                  <div
                    key={color}
                    className="h-4 w-4 rounded border border-white/20 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={`Swatch ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Extracted Catalog Products:
              </span>
              <span className="font-mono text-[11px] text-white/40">
                {selectedBrand.products.length} Products Found
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {selectedBrand.products.map((prod) => (
                <div key={prod.id} className="group flex flex-col gap-1.5">
                  <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-white/10 bg-bg-card p-2 text-center font-mono text-[10px] text-white/40 transition-colors group-hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_50%,transparent)]">
                    <span className="mb-1 line-clamp-1 font-semibold text-white/80">{prod.name}</span>
                    <span className="rounded border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] px-1.5 py-0.5 text-[9px] text-[var(--accent-cyan)]">
                      {prod.placeholderLabel}
                    </span>
                  </div>
                  <div className="text-center font-mono text-[10px] font-medium uppercase text-white/60">
                    {prod.statLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
