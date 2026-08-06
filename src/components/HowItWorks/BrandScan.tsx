import { Check, FileText } from 'lucide-react'
import { DEMO_BRAND } from '../../data/howItWorksMock'

/**
 * Card 1 — fixed example URL with always-on scanning control (app "Scan here"
 * position) and extraction results in a single panel. URL is display-only.
 */
export function BrandScan() {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/80">
        AdRender can extract your brand voice, brand colors, logo, product images and ad copies by
        simply scanning your brand URL, or upload manually with campaign documents instead.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/35">
            Brand URL
          </label>

          {/* App-style row: URL field + scanning control where "Scan here" sits */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
            <div
              className="relative flex min-w-0 flex-1 items-center rounded-lg border border-white/10 bg-bg-card px-3.5 py-3 font-mono text-sm text-white/80"
              aria-hidden
            >
              <span className="text-white/35">https://</span>
              <span className="truncate">{DEMO_BRAND.url}</span>
            </div>

            <div
              className="hiw-scan-btn relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg border border-[color:color-mix(in_srgb,var(--accent-cyan)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_12%,transparent)] px-4 py-3 sm:min-w-[9.5rem]"
              aria-hidden
            >
              <span className="hiw-scan-shimmer pointer-events-none absolute inset-0" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-cyan)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
              </span>
              <span className="relative text-xs font-semibold tracking-wide text-[var(--accent-cyan)]">
                Scanning…
              </span>
            </div>
          </div>
        </div>

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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-bg-card font-mono text-[9px] font-bold text-[var(--accent-cyan)]"
              title={`${DEMO_BRAND.name} logo`}
            >
              {DEMO_BRAND.logoPlaceholder}
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
                className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-bg-card p-2.5 text-center"
              >
                <div className="flex aspect-square flex-col items-center justify-center gap-1.5">
                  <span className="line-clamp-2 text-[11px] font-semibold text-white/80">
                    {prod.name}
                  </span>
                  <span className="rounded border border-[color:color-mix(in_srgb,var(--accent-cyan)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_8%,transparent)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--accent-cyan)]">
                    {prod.placeholderLabel}
                  </span>
                </div>
                <p className="font-mono text-[10px] font-medium text-white/55">
                  {prod.adCopyCount} ad copies created
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-0.5">
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
    </div>
  )
}
