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

  for (const theme of themes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    })
    await context.addInitScript((value) => {
      localStorage.setItem('adrender-site-theme', value)
    }, theme)
    const page = await context.newPage()
    const hideChrome = () =>
      page.addStyleTag({
        content: '.site-header, .about-jump { display: none !important; }',
      })

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' })
    await hideChrome()
    const features = page.locator('#features')
    await features.scrollIntoViewIfNeeded()
    await page.waitForTimeout(8000)
    const featuresFile = path.join(outDir, `features-${theme}-1440.png`)
    await features.screenshot({ path: featuresFile })
    console.log('saved', path.relative(root, featuresFile))

    await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: 'networkidle' })
    await hideChrome()
    const sectionIds = ['templates', 'easy-to-use', 'brands', 'generation', 'sizes', 'library', 'shopify', 'playground', 'workspaces']
    for (const id of sectionIds) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.waitForTimeout(8000)
    }
    await page.evaluate((ids) => {
      const start = document.getElementById(ids[0])
      const end = document.getElementById(ids[ids.length - 1])
      if (!start || !end || !start.parentElement) return
      const parent = start.parentElement
      const wrap = document.createElement('div')
      wrap.id = 'proof-about-features'
      parent.insertBefore(wrap, start)
      let node = start
      while (node) {
        const next = node.nextElementSibling
        wrap.appendChild(node)
        if (node === end) break
        node = next
      }
    }, sectionIds)
    const aboutFile = path.join(outDir, `about-features-${theme}-1440.png`)
    await page.locator('#proof-about-features').screenshot({ path: aboutFile })
    console.log('saved', path.relative(root, aboutFile))
    await context.close()
  }

  for (const width of [1280, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    })
    await context.addInitScript(() => {
      localStorage.setItem('adrender-site-theme', 'light')
    })
    const page = await context.newPage()
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.locator('#features').scrollIntoViewIfNeeded()
    const rows = await page.evaluate(() => {
      const lineCount = (el) => {
        if (!el) return 0
        const range = document.createRange()
        range.selectNodeContents(el)
        const tops = []
        for (const rect of range.getClientRects()) {
          if (rect.width < 1 || rect.height < 1) continue
          if (!tops.some((top) => Math.abs(top - rect.top) < 2)) tops.push(rect.top)
        }
        return tops.length
      }
      const cards = [...document.querySelectorAll('#features .site-image-card')]
      return cards.map((card, index) => {
        const title = card.querySelector(':scope > h3')
        const sub = card.querySelector(':scope > .site-image-card-sub')
        const body = [...card.querySelectorAll(':scope > p')].find((node) => !node.classList.contains('site-image-card-sub'))
        const link = card.querySelector(':scope > a')
        const media = card.querySelector('.site-image-card-media')
        const top = (el) => (el ? Math.round(el.getBoundingClientRect().top) : null)
        return {
          n: index + 1,
          title: title ? title.textContent.trim() : '',
          width: Math.round(card.getBoundingClientRect().width),
          titleLines: lineCount(title),
          subLines: lineCount(sub),
          paraLines: lineCount(body),
          tops: {
            media: top(media),
            title: top(title),
            sub: top(sub),
            para: top(body),
            link: top(link),
          },
        }
      })
    })
    console.log(`\nfeature cards @ ${width}px`)
    for (const row of rows) {
      console.log(
        `${row.n} w=${row.width} title=${row.titleLines} sub=${row.subLines} para=${row.paraLines} tops=${JSON.stringify(row.tops)} ${row.title}`,
      )
    }
    await context.close()
  }
} finally {
  await browser.close()
  server.close()
}
