import { generateSitemap } from './generate-sitemap.mjs'
import { prerender } from './prerender.mjs'

async function main() {
  generateSitemap()
  await prerender()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
