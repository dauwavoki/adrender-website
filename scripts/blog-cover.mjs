/**
 * Render a post's coverScene to public/blog/covers/<slug>.png (1200×630).
 * Run by hand when a post is added. Not part of the Vercel build.
 *
 * Usage: npm run blog:cover -- <slug>
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { chromium } from 'playwright'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const WIDTH = 1200
const HEIGHT = 630
const MAX_BYTES = 200 * 1024

const slugArg = process.argv[2]?.replace(/\.md$/, '').trim()
if (!slugArg) {
  console.error('Usage: npm run blog:cover -- <slug>')
  process.exit(1)
}

const postPath = path.join(root, 'src/content/blog', `${slugArg}.md`)
if (!fs.existsSync(postPath)) {
  console.error(`No post at src/content/blog/${slugArg}.md`)
  process.exit(1)
}

const { data } = matter(fs.readFileSync(postPath, 'utf8'))
const scene = typeof data.coverScene === 'string' ? data.coverScene.trim() : ''
if (!scene) {
  console.error(`Post ${slugArg} has no coverScene. Set one before rendering a cover.`)
  process.exit(1)
}

const outPath = path.join(root, 'public/blog/covers', `${slugArg}.png`)
fs.mkdirSync(path.dirname(outPath), { recursive: true })

/** @param {string} file */
function pngSize(file) {
  const buf = fs.readFileSync(file)
  return { bytes: buf.length, width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

/**
 * Palette-quantize with Pillow when the raw screenshot is over 200 KB.
 * pngquant/oxipng are used first when they are installed.
 * @param {string} file
 */
function tryShrink(file) {
  if (fs.statSync(file).size <= MAX_BYTES) return
  const tmp = `${file}.opt.png`
  const bins = [
    ['pngquant', ['--quality=60-85', '--force', '--output', tmp, file]],
    ['oxipng', ['-o', '4', '--strip', 'safe', '--out', tmp, file]],
  ]
  for (const [bin, args] of bins) {
    try {
      execFileSync(bin, args, { stdio: 'ignore' })
    } catch {
      continue
    }
    if (fs.existsSync(tmp) && fs.statSync(tmp).size > 0 && fs.statSync(tmp).size < fs.statSync(file).size) {
      fs.renameSync(tmp, file)
    } else if (fs.existsSync(tmp)) {
      fs.rmSync(tmp, { force: true })
    }
    if (fs.statSync(file).size <= MAX_BYTES) return
  }
  fs.rmSync(tmp, { force: true })
  if (fs.statSync(file).size <= MAX_BYTES) return

  const py = `
import os, sys
from PIL import Image
src, dest, limit = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert("RGB")
for colors in (256, 192, 128, 96, 64):
    q = im.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    q.save(dest, optimize=True)
    if os.path.getsize(dest) <= limit:
        break
`
  try {
    execFileSync('python3', ['-c', py, file, tmp, String(MAX_BYTES)], { stdio: 'ignore' })
  } catch {
    fs.rmSync(tmp, { force: true })
    return
  }
  if (fs.existsSync(tmp) && fs.statSync(tmp).size > 0 && fs.statSync(tmp).size < fs.statSync(file).size) {
    fs.renameSync(tmp, file)
  } else {
    fs.rmSync(tmp, { force: true })
  }
}

const server = await createServer({
  configFile: path.join(root, 'vite.config.ts'),
  server: { host: '127.0.0.1', port: 5199, strictPort: false },
  logLevel: 'error',
})

/** @type {import('playwright').Browser | undefined} */
let browser

try {
  await server.listen()
  const local = server.resolvedUrls?.local?.[0]
  if (!local) throw new Error('Vite did not report a local URL')

  try {
    browser = await chromium.launch({ headless: true })
  } catch (error) {
    console.error('Playwright browser missing. Run: npx playwright install chromium')
    throw error
  }

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'en-US',
  })
  await context.addInitScript(() => {
    try {
      localStorage.setItem('adrender-site-theme', 'light')
    } catch {
      // The cover page forces light mode even if storage is blocked.
    }
  })

  const page = await context.newPage()
  const url = new URL('/internal/blog-cover', local)
  url.searchParams.set('scene', scene)
  await page.goto(url.href, { waitUntil: 'networkidle' })
  await page.waitForSelector('[data-cover-error], [data-cover-ready="true"] .scene', { timeout: 20000 })

  const error = page.locator('[data-cover-error]')
  if ((await error.count()) > 0) {
    throw new Error((await error.innerText()).trim())
  }

  await page.evaluate(async () => {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await Promise.race([document.fonts.ready, timeout(8000)])
    const images = [...document.querySelectorAll('.scene img')]
    await Promise.race([
      Promise.all(
        images.map(async (img) => {
          if (!(img instanceof HTMLImageElement) || img.complete) return
          try {
            await img.decode()
          } catch {
            // A missing still should not fail the cover.
          }
        }),
      ),
      timeout(8000),
    ])
  })

  await page.locator('.blog-cover-shot').screenshot({
    path: outPath,
    type: 'png',
    animations: 'disabled',
    scale: 'css',
  })
  tryShrink(outPath)

  const { bytes, width, height } = pngSize(outPath)
  const kb = (bytes / 1024).toFixed(1)
  console.log(`Wrote ${path.relative(root, outPath)} (${width}×${height}, ${kb} KB)`)
  if (width !== WIDTH || height !== HEIGHT) {
    throw new Error(`Cover is ${width}×${height}, expected ${WIDTH}×${HEIGHT}`)
  }
  if (bytes > MAX_BYTES) {
    console.warn(`Cover is over 200 KB (${kb} KB).`)
  }
} finally {
  await browser?.close()
  await server.close()
}
