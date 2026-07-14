/**
 * Minimal YAML-ish frontmatter parser for our blog posts.
 * Avoids gray-matter in the browser bundle (Buffer / eval).
 */
export type FrontmatterData = Record<string, string>

export function parseFrontmatter(raw: string): { data: FrontmatterData; content: string } {
  const normalized = raw.replace(/^\uFEFF/, '')
  if (!normalized.startsWith('---')) {
    return { data: {}, content: normalized.trim() }
  }

  const end = normalized.indexOf('\n---', 3)
  if (end === -1) {
    return { data: {}, content: normalized.trim() }
  }

  const fmBlock = normalized.slice(4, end).trim()
  const content = normalized.slice(end + 4).replace(/^\r?\n/, '').trim()
  const data: FrontmatterData = {}

  for (const line of fmBlock.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (key) data[key] = value
  }

  return { data, content }
}
