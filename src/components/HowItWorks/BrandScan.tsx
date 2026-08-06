import { Check, FileText } from 'lucide-react'
import { DEMO_BRAND } from '../../data/howItWorksMock'

interface BrandScanProps {
  isScanning: boolean
  isRevealed: boolean
}

/**
 * Card 1 — fixed example URL with scanning shimmer, then brand reveal
 * (colours, products, documents). Input is display-only / non-editable.
 */
export function BrandScan({ isScanning, isRevealed }: BrandScanProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/55">
        Add your brand via URL for colours, products, and auto-generated ad copy — or upload
        campaign documents instead.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-bg-elevated p-4 sm:p-5">
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/35">
          Brand URL
        </label>
        <div
          className={`relative flex items-center rounded-lg border bg-bg-card px-3.5 py-3 font-mono text-sm transition-colors ${
            isScanning
              ? 'border-[color:color-mix(in_srgb,var(--accent-cyan)_45%,transparent)] text-white'
              : 'border-white/10 text-white/80'
          }`}
          aria-hidden
        >
          <span className="text-white/35">https://</span>
          <span>{DEMO_BRAND.url}</span>
          {isScanning && (
            <span className="hiw-scan-shimmer pointer-events-none absolute inset-0 rounded-lg" />
          )}
        </div>

        {isScanning && (
          <p className="mt-3 flex items-center gap-2 text-xs text-[var(--accent-cyan)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-cyan)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
            </span>
            Scanning {DEMO_BRAND.url} for brand assets…
          </p>
        )}
      </div>

      {isRevealed && !isScanning && (
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="rounded-full bg-[color:color-mix(in_srgb,var(--accent-cyan)_18%,transparent)] p-1.5 text-[var(--accent-cyan)]">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{DEMO_BRAND.name}</p>
                <p className="text-xs text-white/40">{DEMO_BRAND.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Colours
              </span>
              <div className="flex gap-1.5">
                {DEMO_BRAND.swatches.map((color) => (
                  <div
                    key={color}
                    className="h-4 w-4 rounded border border-white/20 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
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
                  className="flex aspect-square flex-col items-center justify-center rounded-lg border border-white/10 bg-bg-card p-2 text-center"
                >
                  <span className="mb-1 line-clamp-1 text-[11px] font-semibold text-white/80">
                    {prod.name}
                  </span>
                  <span className="rounded border border-[color:color-mix(in_srgb,var(--accent-cyan)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_8%,transparent)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--accent-cyan)]">
                    {prod.placeholderLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
            <FileText className="h-4 w-4 shrink-0 text-white/45" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/75">
                {DEMO_BRAND.documentCount} campaign documents
              </p>
              <p className="truncate font-mono text-[10px] text-white/35">
                brand-guide.pdf · product-brief.docx · offer-sheet.pdf
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
