/**
 * Post-build prerender: serve dist via Vite preview, visit each route with Playwright,
 * write fully-hydrated HTML (incl. react-helmet-async head tags) into dist/<path>/index.html.
 *
 * Why a small custom script instead of vite-plugin-prerender / RR framework prerender:
 * - App uses BrowserRouter SPA (not React Router framework mode); migrating would be a large rewrite.
 * - Routes are dynamic (comparisons.tsx + blog markdown) and must stay in sync with sitemap —
 *   one shared discoverer is cleaner than configuring a Vite plugin separately.
 * - Playwright is maintained and matches the preferred headless browser for this project.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import { ROOT, getAllRoutes } from './site-urls.mjs'

const PREVIEW_HOST = '127.0.0.1'
const PREVIEW_PORT = 4173
const BASE = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`

/** @param {string} route */
function htmlOutPath(route) {
  const dist = path.join(ROOT, 'dist')
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.replace(/^\//, ''), 'index.html')
}

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.ok || res.status === 404) {
          resolve()
          return
        }
      } catch {
        /* not up yet */
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Preview server did not start within ${timeoutMs}ms`))
        return
      }
      setTimeout(tick, 200)
    }
    tick()
  })
}

async function ensureChromium() {
  try {
    const browser = await chromium.launch({ headless: true })
    await browser.close()
    return
  } catch {
    const { execSync } = await import('node:child_process')
    execSync('npx playwright install chromium', { cwd: ROOT, stdio: 'inherit' })
  }
}

export async function prerender() {
  const routes = getAllRoutes()
  const dist = path.join(ROOT, 'dist')
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html missing — run vite build first')
  }

  await ensureChromium()

  const preview = spawn(
    'npx',
    ['vite', 'preview', '--host', PREVIEW_HOST, '--port', String(PREVIEW_PORT), '--strictPort'],
    {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    },
  )

  let previewLog = ''
  preview.stdout?.on('data', (d) => {
    previewLog += d.toString()
  })
  preview.stderr?.on('data', (d) => {
    previewLog += d.toString()
  })

  const stopPreview = () => {
    if (!preview.killed) {
      preview.kill('SIGTERM')
    }
  }

  try {
    await waitForServer(BASE)
    const browser = await chromium.launch({ headless: true })
    try {
      for (const route of routes) {
        const page = await browser.newPage()
        const url = route === '/' ? `${BASE}/` : `${BASE}${route}`
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })

        // Wait until React has mounted and PageMeta has deduped to a single route title.
        await page.waitForFunction(() => {
          const root = document.getElementById('root')
          const titles = document.querySelectorAll('head title')
          const descs = document.querySelectorAll('head meta[name="description"]')
          const fallbacks = document.querySelectorAll('[data-static-fallback]')
          return (
            Boolean(root?.children?.length) &&
            titles.length === 1 &&
            descs.length === 1 &&
            fallbacks.length === 0 &&
            (document.title || '').length > 0
          )
        }, { timeout: 30_000 })

        const html = await page.content()
        const out = htmlOutPath(route)
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, `<!DOCTYPE html>\n${html.replace(/^<!DOCTYPE html>/i, '').trim()}\n`)
        console.log(`[prerender] ${route} → ${path.relative(ROOT, out)}`)
        await page.close()
      }
    } finally {
      await browser.close()
    }
  } catch (err) {
    console.error('[prerender] failed. Preview log:\n', previewLog)
    throw err
  } finally {
    stopPreview()
  }

  console.log(`[prerender] Done — ${routes.length} routes`)
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('prerender.mjs')) {
  prerender().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
