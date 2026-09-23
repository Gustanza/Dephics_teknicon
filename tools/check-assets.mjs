/**
 * Fails the build if any asset referenced from source does not exist on disk.
 *
 * This exists because a real bug shipped: `/img/project-zmt-terminal.jpg` was deleted
 * during a hero rework while `SectorsPage.vue` still pointed a PageHero at it. The
 * masthead rendered as an empty dark panel — no console error, no failed-request
 * warning in the audit, because the <img> is decorative (`alt=""`, `aria-hidden`) and
 * a 404 on it is silent. Nothing caught it until someone looked at the page.
 *
 *   node tools/check-assets.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const SCAN_DIRS = ['src', 'index.html']
const PUBLIC = join(ROOT, 'public')

function walk (dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(vue|js|css|html)$/.test(name)) out.push(full)
  }
  return out
}

const files = []
for (const entry of SCAN_DIRS) {
  const full = join(ROOT, entry)
  if (!existsSync(full)) continue
  if (statSync(full).isDirectory()) walk(full, files)
  else files.push(full)
}

// Root-relative asset references: /img/..., /downloads/..., /favicon.png
const REF = /["'`](\/(?:img|downloads|fonts)\/[^"'`\s)]+|\/[\w-]+\.(?:png|jpg|jpeg|svg|webp|pdf|ico))["'`]/g

const missing = []
const dynamic = []
const seen = new Set()

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(REF)) {
    const ref = match[1]
    const key = ref + '|' + file
    if (seen.has(key)) continue
    seen.add(key)

    // Paths built with a template literal (e.g. `/img/logo-header${tone}.png`) cannot
    // be resolved statically. Record them so they are visible rather than silently
    // skipped, and check them against the variants we know the component uses.
    if (ref.includes('${')) {
      dynamic.push({ ref, file: relative(ROOT, file) })
      continue
    }
    if (!existsSync(join(PUBLIC, ref))) {
      missing.push({ ref, file: relative(ROOT, file) })
    }
  }
}

// the two tone variants Logo.vue swaps between
for (const { ref, file } of dynamic) {
  for (const tone of ['', '-white']) {
    const resolved = ref.replace(/\$\{[^}]+\}/, tone)
    if (!existsSync(join(PUBLIC, resolved))) {
      missing.push({ ref: resolved + `  (from ${ref})`, file })
    }
  }
}

if (missing.length) {
  console.error(`\n  ${missing.length} referenced asset(s) do not exist in public/:\n`)
  for (const m of missing) console.error(`    ${m.ref}\n      referenced by ${m.file}`)
  console.error('')
  process.exit(1)
}

console.log(
  `  assets ok — ${seen.size} references checked` +
  (dynamic.length ? `, ${dynamic.length} built dynamically and expanded` : '')
)
