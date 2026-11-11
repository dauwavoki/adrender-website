import { generateLlms } from './generate-llms.mjs'
import { generateRss } from './generate-rss.mjs'
import { generateSitemap } from './generate-sitemap.mjs'
import { ssg } from './ssg.mjs'

async function main() {
  // SSG first so nested route folders exist; sitemap, RSS and llms.txt write into dist afterward.
  await ssg()
  generateSitemap()
  generateRss()
  generateLlms()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
