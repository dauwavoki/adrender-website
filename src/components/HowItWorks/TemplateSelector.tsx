import { ArrowRight, Check, Layout, Wand2 } from 'lucide-react'
import type { Template } from './types'

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: Template | null
  isLoading: boolean
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({
  templates,
  selectedTemplate,
  isLoading,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Select a creative ad structure & format:
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate?.id === tpl.id
          return (
            <div
              key={tpl.id}
              className={`group relative flex flex-col rounded-xl border p-3.5 transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--accent-cyan)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] shadow-lg shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)] ring-1 ring-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)]'
                  : 'border-white/10 bg-bg-elevated hover:border-white/20'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70">
                  {tpl.badge}
                </span>
                <span className="font-mono text-[10px] text-white/40">{tpl.aspectRatio}</span>
              </div>

              <div className="relative mb-3 flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-bg-card p-3 text-center transition-colors group-hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_40%,transparent)]">
                <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[var(--accent-cyan)]">
                  <Layout className="h-4 w-4" />
                </div>

                <span className="rounded border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--accent-cyan)]">
                  {tpl.placeholderLabel}
                </span>

                <span className="mt-1.5 line-clamp-1 text-xs font-semibold text-white">{tpl.name}</span>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0a0a0f]/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <span className="text-center text-xs font-medium text-white/70">{tpl.description}</span>
                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tpl)}
                    className="flex transform cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--accent-cyan)] px-4 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="mb-0.5 text-xs font-bold text-white">{tpl.name}</h4>
                  <p className="line-clamp-2 text-[11px] text-white/50">{tpl.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTemplate(tpl)}
                  className={`mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[var(--accent-cyan)] text-white shadow-md'
                      : 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>Template Selected</span>
                    </>
                  ) : (
                    <>
                      <span>Use</span>
                      <Wand2 className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {isLoading && (
        <div className="animate-pulse space-y-3 rounded-xl border border-white/10 bg-bg-elevated p-5">
          <div className="flex items-center gap-3 text-sm font-medium text-[var(--accent-cyan)]">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-cyan)] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent-cyan)]" />
            </div>
            <span>
              Applying layout geometry & rendering high-res copy for {selectedTemplate?.name}...
            </span>
          </div>

          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="animate-shimmer-fast h-full w-3/4 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-cyan)]" />
          </div>
        </div>
      )}
    </div>
  )
}
