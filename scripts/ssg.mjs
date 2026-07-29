/**
 * Post-build static site generation via a production Vite SSR bundle.
 *
 * Why not vite-react-ssg: it peers on react-router-dom@^6 and imports
 * `react-router-dom/server.js`, which React Router v7 no longer exports.
 *
 * Why not react-helmet-async context: on React 19 it becomes a no-op for SSR
 * collection. We use React 19 native <title>/<meta>/<link> in PageMeta, then
 * hoist those tags from the renderToString body into each page's <head>.
 *
 * Why a production SSR build (not vite.ssrLoadModule): the Vite *dev* SSR
 * transform resolves imported images to `/src/assets/...` URLs. Those paths
 * do not exist in `dist/` and 404 in production. A real SSR build rewrites
 * imports to the same hashed `/assets/<name>-<hash>.ext` URLs as the client
 * build, so prerendered <img src> matches files that were actually emitted.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { ROOT, getAllRoutes } from './site-urls.mjs'

const SERVER_OUT = path.join(ROOT, 'dist/server')

/** @param {string} route */
function htmlOutPath(route) {
  const dist = path.join(ROOT, 'dist')
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.replace(/^\//, ''), 'index.html')
}

/**
 * Pull React 19 document-metadata tags out of the rendered body so crawlers
 * see them in <head> without executing JS.
 * @param {string} appHtml
 */
function hoistHeadTags(appHtml) {
  const tags = []
  let body = appHtml

  const patterns = [
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    /<meta\b[^>]*>/gi,
    /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,
  ]

  for (const pattern of patterns) {
    body = body.replace(pattern, (match) => {
      tags.push(match)
      return ''
    })
  }

  return {
    body: body.replace(/^\s+/, ''),
    head: tags.join('\n    '),
  }
}

/**
 * @param {string} template
 * @param {string} appHtml
 */
function inject(template, appHtml) {
  const { body, head } = hoistHeadTags(appHtml)
  let html = template

  if (head) {
    html = html.replace(/<title>[^<]*<\/title>/i, () => head)
  }

  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`)
  return html
}

export async function ssg() {
  const dist = path.join(ROOT, 'dist')
  const templatePath = path.join(dist, 'index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html missing — run vite build first')
  }

  // Production SSR bundle: asset imports → hashed /assets/... URLs (same as client).
  await build({
    configFile: path.join(ROOT, 'vite.config.ts'),
    build: {
      ssr: path.join(ROOT, 'src/entry-server.tsx'),
      outDir: SERVER_OUT,
      emptyOutDir: true,
      copyPublicDir: false,
    },
    logLevel: 'error',
  })

  const template = fs.readFileSync(templatePath, 'utf8')
  const all = getAllRoutes()

  try {
    const mod = await import(pathToFileURL(path.join(SERVER_OUT, 'entry-server.js')).href)
    /** @type {(url: string) => string} */
    const render = mod.render

    for (const route of all) {
      const url = route === '/' ? '/' : route
      const appHtml = render(url)
      const page = inject(template, appHtml)
      const out = htmlOutPath(route)
      fs.mkdirSync(path.dirname(out), { recursive: true })
      fs.writeFileSync(out, page)
      console.log(`[ssg] ${route} → ${path.relative(ROOT, out)}`)
    }

    console.log(`[ssg] Done — ${all.length} routes`)
  } finally {
    // SSR bundle is only needed at build time; keep the deploy artifact client-only.
    fs.rmSync(SERVER_OUT, { recursive: true, force: true })
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('ssg.mjs')) {
  ssg().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
