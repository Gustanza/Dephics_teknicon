/**
 * The design census from ROADMAP §1 rule 3 — the theme's hard rules, measured rather
 * than eyeballed, on every page at every width that matters.
 *
 *   node tools/census.mjs [base-url]          (default http://localhost:4173)
 *
 * Checks, per page:
 *   RADIUS     any computed border-radius other than 0 or 50%          (THEME_DNA §11.1)
 *   SHADOW     any computed box-shadow                                  (§11.2)
 *   OVERFLOW   horizontal scroll at 360 / 390 / 768 / 1024 / 1280 / 1440 / 1920
 *   CONTRAST   visible text under 4.5:1 (3:1 at 24px+, or 18.66px+ bold) against the
 *              nearest opaque background. Text over photographs is skipped — the
 *              ancestor background is not what the eye sees there.
 *
 * Known, deliberate exceptions (ROADMAP §2): the ghost index numerals `ab__dept-n` and
 * `tm__index` at 1.69:1 are decorative and excluded by class.
 */
import { chromium } from 'playwright'
import { staticPaths } from '../src/data/lookup.js'

const BASE = process.argv[2] || 'http://localhost:4173'
const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920]
const DECORATIVE = ['ab__dept-n', 'tm__index', 'nf__code', 'cn__num']

const problems = []
const note = (route, kind, msg) => problems.push({ route, kind, msg })

const browser = await chromium.launch()
const page = await browser.newPage()

for (const route of staticPaths) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (over > 0) note(route, 'OVERFLOW', `${over}px at ${width}`)
  }

  // the static rules only need one width; 1440 is the design width
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  // reveal everything: entrance animations start at opacity 0
  await page.evaluate(() => document.querySelectorAll('.reveal-armed').forEach((e) => e.classList.add('is-revealed')))
  await page.waitForTimeout(1100)

  const found = await page.evaluate((DECORATIVE) => {
    const out = { radius: [], shadow: [], contrast: [] }
    const parse = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/)
      if (!m) return null
      const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number)
      return { r, g, b, a }
    }
    const lum = ({ r, g, b }) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
    }
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
    const desc = (e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`.slice(0, 60)

    for (const e of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(e)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue

      for (const k of ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius']) {
        const v = cs[k]
        if (v !== '0px' && v !== '50%') { out.radius.push(`${desc(e)} ${v}`); break }
      }
      if (cs.boxShadow && cs.boxShadow !== 'none') out.shadow.push(`${desc(e)} ${cs.boxShadow.slice(0, 40)}`)

      // contrast: elements with their own direct text only
      const text = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      if (!text || DECORATIVE.some((c) => e.closest('.' + c))) continue
      if (e.closest('[aria-hidden="true"]') || e.closest('.visually-hidden, .cb__trap')) continue
      // at scroll 0 the header is transparent and floats over the page's hero image;
      // its real ground is the photograph + scrim, not the body colour behind it
      const hdr = e.closest('header')
      if (hdr && parse(getComputedStyle(hdr).backgroundColor)?.a !== 1) continue
      const r = e.getBoundingClientRect()
      if (!r.width || !r.height) continue
      const fg = parse(cs.color)
      if (!fg || fg.a === 0) continue
      // nearest ancestor with an opaque background; give up over an image
      let bg = null, overImage = false
      for (let n = e; n; n = n.parentElement) {
        const ns = getComputedStyle(n)
        if (n.querySelector(':scope > img, :scope > .ph__scrim, :scope > .cta__scrim, :scope > .hero__scrim')) overImage = true
        const b = parse(ns.backgroundColor)
        if (b && b.a > 0.9) { bg = b; break }
      }
      if (overImage || !bg) continue
      const size = parseFloat(cs.fontSize)
      const bold = parseInt(cs.fontWeight, 10) >= 700
      const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5
      const got = ratio(fg, bg) * Math.min(1, cs.opacity)
      if (got < need) out.contrast.push(`${desc(e)} ${got.toFixed(2)}:1 "${e.textContent.trim().slice(0, 30)}"`)
    }
    return out
  }, DECORATIVE)

  for (const m of [...new Set(found.radius)]) note(route, 'RADIUS', m)
  for (const m of [...new Set(found.shadow)]) note(route, 'SHADOW', m)
  for (const m of [...new Set(found.contrast)]) note(route, 'CONTRAST', m)
  process.stdout.write('.')
}

await browser.close()

console.log(`\n\n${staticPaths.length} pages x ${WIDTHS.length} widths`)
if (!problems.length) {
  console.log('CENSUS CLEAN — radius, shadow, overflow and contrast all pass')
} else {
  const byKind = {}
  for (const p of problems) (byKind[p.kind] ||= []).push(p)
  for (const [kind, list] of Object.entries(byKind)) {
    console.log(`\n${kind} (${list.length})`)
    // one line per distinct message, with how many pages it occurs on
    const byMsg = new Map()
    for (const p of list) byMsg.set(p.msg, [...(byMsg.get(p.msg) || []), p.route])
    const uniq = [...byMsg.entries()]
    for (const [msg, routes] of uniq.slice(0, 12)) {
      console.log(`    ${routes[0].padEnd(34)} ${msg}${routes.length > 1 ? `   (+${routes.length - 1} pages)` : ''}`)
    }
    if (uniq.length > 12) console.log(`    ... and ${uniq.length - 12} more distinct`)
  }
}
