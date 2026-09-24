/**
 * Lists every placeholder (TBC / tbc('…')) still outstanding in src/data/content.js.
 *
 *   npm run placeholders            summary, grouped
 *   npm run placeholders -- --all   every single one, with its path
 *
 * Repetitive fields — a year on each of 36 projects — are collapsed into one line with a
 * count, so the summary reads as a to-do list for the client rather than 150 rows.
 */
import * as content from '../src/data/content.js'

const showAll = process.argv.includes('--all')
const found = []

function walk (value, path, label) {
  if (content.isTbc(value)) {
    found.push({ path, label, note: value.note })
    return
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      // name array entries by their slug or title where they have one, not by index
      const name = v && (v.slug || v.name || v.title)
      walk(v, `${path}[${name || i}]`, name || label)
    })
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, label)
  }
}

for (const [name, value] of Object.entries(content)) {
  if (typeof value === 'function' || typeof value === 'boolean') continue
  walk(value, name, name)
}

// group by the path with any [slug] segments generalised to [*]
const groups = new Map()
for (const f of found) {
  const key = f.path.replace(/\[[^\]]+\]/g, '[*]')
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(f)
}

console.log(`\n${found.length} placeholders outstanding in src/data/content.js`)
console.log(`SHOW_PLACEHOLDERS is ${content.SHOW_PLACEHOLDERS ? 'ON  — shown as "To be confirmed" chips' : 'OFF — hidden from the site'}\n`)

for (const [key, list] of groups) {
  const notes = [...new Set(list.map((f) => f.note).filter(Boolean))]
  const head = list.length > 1 ? `${key}   (${list.length})` : list[0].path
  console.log(head)
  if (notes.length === 1) console.log(`    ${notes[0]}`)
  else if (notes.length > 1) notes.slice(0, 3).forEach((n) => console.log(`    ${n}`))
  if (list.length > 1 && !showAll) {
    const names = list.map((f) => f.label).filter(Boolean)
    const shown = names.slice(0, 6).join(', ')
    console.log(`    ${shown}${names.length > 6 ? `, … +${names.length - 6} more` : ''}`)
  }
  if (showAll && list.length > 1) list.forEach((f) => console.log(`      ${f.path}`))
  console.log('')
}
