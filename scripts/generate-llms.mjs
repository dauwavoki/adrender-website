/**
 * Refresh the Feature releases section of dist/llms.txt from blog markdown.
 * The prose above that heading stays whatever is in public/llms.txt.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, SITE_ORIGIN } from './site-urls.mjs'
import { isNewFeature, readBlogPosts } from './blog-source.mjs'

const MARKER = '## Feature releases'

/** @param {string} value */
function oneLine(value) {
  return value.replace(/\s+/g, ' ').trim()
}

/** @param {string} [outDir] */
export function generateLlms(outDir = path.join(ROOT, 'dist')) {
  const sourcePath = path.join(ROOT, 'public/llms.txt')
  let base = fs.readFileSync(sourcePath, 'utf8').replace(/\s+$/, '')
  const markerAt = base.indexOf(MARKER)
  if (markerAt !== -1) base = base.slice(0, markerAt).trimEnd()

  const features = readBlogPosts().filter(isNewFeature)
  const lines = features.map((post) => {
    const url = `${SITE_ORIGIN}/blog/${post.slug}`
    return `- [${oneLine(post.title)}](${url}): ${oneLine(post.description)}`
  })

  const section = features.length > 0 ? `\n\n${MARKER}\n\n${lines.join('\n')}\n` : '\n'
  const next = `${base}${section}`
  const outPath = path.join(outDir, 'llms.txt')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, next)
  console.log(`[llms] Wrote ${features.length} feature posts → ${outPath}`)
  return outPath
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-llms.mjs')) {
  generateLlms()
}
