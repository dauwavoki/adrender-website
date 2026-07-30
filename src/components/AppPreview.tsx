import { useEffect, useState, type ReactNode } from 'react'
import {
  Briefcase,
  Building2,
  ChevronDown,
  ChevronsLeft,
  CreditCard,
  FolderHeart,
  LayoutGrid,
  Library,
  LogOut,
  Wand2,
} from 'lucide-react'
import { placeholderSrc, type PlaceholderId } from '../data/imageManifest'

type TabId = 'templates' | 'saved' | 'library' | 'playground' | 'brands'

type Tab = {
  id: TabId
  label: string
  imageId: PlaceholderId
  icon: ReactNode
}

const TABS: Tab[] = [
  {
    id: 'templates',
    label: 'Templates',
    imageId: '01',
    icon: <LayoutGrid className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'saved',
    label: 'Saved Templates',
    imageId: '02',
    icon: <FolderHeart className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'library',
    label: 'My Ads Library',
    imageId: '03',
    icon: <Library className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'playground',
    label: 'Ad Playground',
    imageId: '04',
    icon: <Wand2 className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'brands',
    label: 'Brands',
    imageId: '05',
    icon: <Briefcase className="h-4 w-4" strokeWidth={1.75} />,
  },
]

const DEFAULT_TAB = TABS[0]

/**
 * Interactive AdRender app window. Templates tab is the default active state so SSG
 * HTML always includes a visible hero screenshot (opacity-100) even without JS.
 */
export function AppPreview() {
  const [activeId, setActiveId] = useState<TabId>(DEFAULT_TAB.id)

  useEffect(() => {
    for (const tab of TABS) {
      const img = new Image()
      img.src = placeholderSrc(tab.imageId)
    }
  }, [])

  return (
    <section className="relative px-4 md:px-6" aria-label="AdRender product preview">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(123,79,212,0.18),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-t-2xl border border-b-0 border-white/[0.12] bg-[#0c0c12] shadow-[0_-20px_80px_-30px_rgba(123,79,212,0.35)]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0a0f] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate text-xs text-zinc-600">app.adrender.app</span>
          </div>

          <div className="flex min-h-[26rem] sm:min-h-[30rem] md:min-h-[34rem] lg:min-h-[38rem]">
            <aside className="flex w-[10.5rem] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0f] sm:w-[13rem] md:w-[15rem]">
              <div className="flex items-start justify-between gap-2 px-3 pb-2 pt-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <img
                      src="/WebApp_Main_Logo.png"
                      alt=""
                      className="h-7 w-7 rounded-md object-contain"
                      width={28}
                      height={28}
                    />
                    <span className="truncate font-heading text-sm font-semibold text-white">AdRender</span>
                  </div>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#5B9FFF]">
                    <CreditCard className="h-3 w-3" />
                    Start a plan
                  </span>
                </div>
                <ChevronsLeft className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
              </div>

              <div className="mx-3 mb-3 flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-black/40 px-2.5 py-1 text-[10px] text-zinc-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>0</span>
                <span className="text-zinc-700">/</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>0</span>
                <span className="ml-0.5 truncate">rendering / staging</span>
              </div>

              <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="App preview navigation">
                {TABS.map((tab) => {
                  const isActive = tab.id === activeId
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveId(tab.id)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                        isActive
                          ? 'bg-[#152038] font-medium text-[#5B9FFF]'
                          : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'
                      }`}
                    >
                      <span className={isActive ? 'text-[#5B9FFF]' : 'text-zinc-500'}>{tab.icon}</span>
                      <span className="truncate">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-auto space-y-2 border-t border-white/[0.06] p-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#12121a] px-2.5 py-2">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">AdRender Team</p>
                    <p className="text-[10px] text-zinc-600">Workspace</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-600" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-amber-900/40 bg-gradient-to-br from-[#2a2118] to-[#1a1510] px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] leading-none text-amber-500/80" aria-hidden>
                      ◯◯
                    </span>
                    <div>
                      <p className="text-[10px] text-zinc-500">Tokens</p>
                      <p className="text-sm font-semibold text-white">71</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-amber-500/90">Top up →</span>
                </div>
                <div className="flex items-center gap-2 px-1 pt-1">
                  <img
                    src="/WebApp_Main_Logo.png"
                    alt=""
                    className="h-6 w-6 rounded object-contain"
                    width={24}
                    height={24}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">AdRender</p>
                    <p className="truncate text-[10px] text-zinc-600">adrender.admin@gma...</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-1 pb-1 text-[11px] text-zinc-600">
                  <LogOut className="h-3 w-3" />
                  Sign out
                </div>
              </div>
            </aside>

            <div className="relative min-w-0 flex-1 overflow-hidden bg-[#0e0e14]">
              <div className="relative aspect-[16/10] h-full min-h-full w-full">
                {TABS.map((tab) => {
                  const isActive = tab.id === activeId
                  const isDefault = tab.id === DEFAULT_TAB.id
                  return (
                    <img
                      key={tab.id}
                      src={placeholderSrc(tab.imageId)}
                      alt={`AdRender ${tab.label} view — [IMAGE ${tab.imageId}]`}
                      width={1440}
                      height={900}
                      decoding="async"
                      loading={isDefault ? 'eager' : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-150 ease-out ${
                        isActive ? 'z-[1] opacity-100' : 'z-0 opacity-0'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
