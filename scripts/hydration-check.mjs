/**
 * Dev tool, not part of the build.
 * Serves dist/ the way Vercel does and fails if any prerendered route
 * throws a React hydration error.
 *
 * Do not use `vite preview` for this: it returns the homepage HTML for every
 * path, so React hydrates the wrong page and the check reports false errors.
 *
 * Run: npm run build && npm run check:hydration
 * If the browser is missing: npx playwright install chromium
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { getAllRoutes } from './site-urls.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.resolve(root, 'dist')

const HYDRATION = /#418|#423|#425|Hydration/i
const CONCURRENCY = 4

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8'
  if (file.endsWith('.css')) return 'text/css; charset=utf-8'
  if (file.endsWith('.js') || file.endsWith('.mjs')) return 'text/javascript; charset=utf-8'
  if (file.endsWith('.svg')) return 'image/svg+xml'
  if (file.endsWith('.png')) return 'image/png'
  if (file.endsWith('.webp')) return 'image/webp'
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg'
  if (file.endsWith('.gif')) return 'image/gif'
  if (file.endsWith('.ico')) return 'image/x-icon'
  if (file.endsWith('.woff2')) return 'font/woff2'
  if (file.endsWith('.woff')) return 'font/woff'
  if (file.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}

function insideDist(file) {
  return file === dist || file.startsWith(dist + path.sep)
}

/**
 * / and /path/ → dist/path/index.html, and /path → dist/path/index.html
 * when that directory exists. Real files (JS, CSS, images) are served as-is.
 * Missing paths 404 — never fall back to the homepage.
 * @param {string} pathname
 * @returns {string | null}
 */
function resolveDistFile(pathname) {
  let rel
  try {
    rel = decodeURIComponent(pathname)
  } catch {
    return null
  }
  if (rel.includes('\0')) return null
  rel = rel.replace(/^\/+/, '')

  if (rel === '' || rel.endsWith('/')) {
    rel = path.join(rel, 'index.html')
  }

  let file = path.resolve(dist, rel)
  if (!insideDist(file)) return null

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html')
  } else if (!fs.existsSync(file) && path.extname(file) === '') {
    file = path.join(file, 'index.html')
  }

  if (!insideDist(file)) return null
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return null
  return file
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    const file = resolveDistFile(url.pathname)
    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end('not found')
      return
    }
    res.writeHead(200, { 'content-type': contentType(file) })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve, reject) => {
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      resolve({ server, port })
    })
  })
}

function oneLine(text) {
  return text.replace(/\s+/g, ' ').trim().slice(0, 300)
}

/**
 * @param {import('playwright').BrowserContext} context
 * @param {string} origin
 * @param {string} route
 */
async function checkRoute(context, origin, route) {
  const page = await context.newPage()
  /** @type {string[]} */
  const errors = []
  const seen = new Set()

  const record = (text) => {
    if (!HYDRATION.test(text)) return
    const line = oneLine(text)
    if (!line || seen.has(line)) return
    seen.add(line)
    errors.push(line)
  }

  page.on('pageerror', (err) => {
    record(err instanceof Error ? err.message : String(err))
  })
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    record(msg.text())
  })

  /** @type {string | null} */
  let navError = null
  try {
    const url = `${origin}${route === '/' ? '/' : route}`
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    const status = response ? response.status() : 0
    if (status !== 200) navError = `HTTP ${status || 'no response'}`
    await page.waitForTimeout(1000)
  } catch (err) {
    navError = oneLine(err instanceof Error ? err.message : String(err))
  } finally {
    await page.close()
  }

  return { route, errors, navError }
}

function printReport(results) {
  const width = Math.max(...results.map((r) => r.route.length), 4)
  console.log(`${'result'.padEnd(6)}  ${'route'.padEnd(width)}`)
  for (const result of results) {
    const ok = result.errors.length === 0 && !result.navError
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${result.route.padEnd(width)}`)
    if (result.navError) console.log(`        ${result.navError}`)
    for (const err of result.errors) console.log(`        ${err}`)
  }
  const failed = results.filter((r) => r.errors.length > 0 || r.navError)
  const hydrationPages = results.filter((r) => r.errors.length > 0).length
  console.log('')
  console.log(
    `${results.length - failed.length} passed, ${failed.length} failed ` +
      `(${hydrationPages} with hydration errors)`,
  )
  return failed.length > 0
}

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('dist/index.html missing — run npm run build first')
    process.exit(1)
  }

  const routes = getAllRoutes()
  const { server, port } = await startServer()
  const origin = `http://127.0.0.1:${port}`
  /** @type {import('playwright').Browser | undefined} */
  let browser

  try {
    try {
      browser = await chromium.launch({ headless: true })
    } catch (err) {
      console.error(err instanceof Error ? err.message : err)
      console.error('Playwright browser missing. Run: npx playwright install chromium')
      process.exit(1)
    }

    const context = await browser.newContext()
    /** @type {{ route: string, errors: string[], navError: string | null }[]} */
    const results = new Array(routes.length)
    let next = 0
    let done = 0

    async function worker() {
      while (next < routes.length) {
        const index = next
        next += 1
        const result = await checkRoute(context, origin, routes[index])
        results[index] = result
        done += 1
        const ok = result.errors.length === 0 && !result.navError
        console.error(`checked ${done}/${routes.length} ${result.route} ${ok ? 'ok' : 'FAIL'}`)
      }
    }

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, routes.length) }, () => worker()))
    const failed = printReport(results)
    if (failed) process.exitCode = 1
  } finally {
    await browser?.close()
    await new Promise((resolve) => server.close(() => resolve(undefined)))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
