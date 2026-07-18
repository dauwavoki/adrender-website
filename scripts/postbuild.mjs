import { generateSitemap } from './generate-sitemap.mjs'
import { prerender } from './prerender.mjs'

async function main() {
  generateSitemap()
  try {
    await prerender()
  } catch (err) {
    // Playwright Chromium often lacks system libs on slim CI images (e.g. Vercel).
    // Sitemap + SPA dist still ship; skip hard-fail so production deploys succeed.
    console.warn('[postbuild] Prerender skipped — shipping SPA build without route HTML snapshots.')
    console.warn(err instanceof Error ? err.message : err)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
