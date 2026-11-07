/**
 * Not part of the build. Serves dist/ and saves full-page proof shots.
 * Run: npx playwright install chromium && node scripts/proof-screenshots.mjs
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const outDir = path.join(root, 'docs/redesign/proof')

const pages = [
  ['home', '/'],
  ['about', '/about'],
  ['faq', '/faq'],
  ['solution', '/solutions/creative-fatigue'],
  ['comparison', '/vs-canva'],
  ['blog', '/blog'],
  ['post', '/blog/why-i-created-adrender'],
  ['contact', '/contact'],
]

const widths = [1440, 375]
const themes = ['light', 'dark']

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8'
  if (file.endsWith('.css')) return 'text/css; charset=utf-8'
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (file.endsWith('.svg')) return 'image/svg+xml'
  if (file.endsWith('.png')) return 'image/png'
  if (file.endsWith('.webp')) return 'image/webp'
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg'
  if (file.endsWith('.woff2')) return 'font/woff2'
  return 'application/octet-stream'
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    let rel = decodeURIComponent(url.pathname)
    if (rel.endsWith('/')) rel += 'index.html'
    let file = path.normalize(path.join(dist, rel))
    if (file.startsWith(dist) && fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html')
    }
    if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    res.writeHead(200, { 'content-type': contentType(file) })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      resolve({ server, port })
    })
  })
}

fs.mkdirSync(outDir, { recursive: true })
const { server, port } = await startServer()
const browser = await chromium.launch({ headless: true })

try {
  for (const theme of themes) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      })
      await context.addInitScript((value) => {
        localStorage.setItem('adrender-site-theme', value)
      }, theme)
      const page = await context.newPage()
      for (const [name, route] of pages) {
        await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' })
        const file = path.join(outDir, `${name}-${theme}-${width}.png`)
        await page.screenshot({ path: file, fullPage: true })
        console.log('saved', path.relative(root, file))
      }
      await context.close()
    }
  }
} finally {
  await browser.close()
  server.close()
}
