import { generateSitemap } from './generate-sitemap.mjs'
import { ssg } from './ssg.mjs'

async function main() {
  // SSG first so nested route folders exist; sitemap writes into dist afterward.
  await ssg()
  generateSitemap()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
