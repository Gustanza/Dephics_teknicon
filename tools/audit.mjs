import { chromium } from 'playwright'
import { staticPaths } from '../src/data/lookup.js'

const BASE = process.argv[2] || 'http://localhost:4173'
// every prerendered path, from the same list vite.config.js hands to vite-ssg
const ROUTES = staticPaths
const KNOWN_ROUTES = new Set([...ROUTES])
// ids present on each page, and every internal link that points at one — checked at the end
const idsByRoute = new Map()
const hashLinks = []

const problems = []
const note = (route, kind, msg) => problems.push({ route, kind, msg })

const browser = await chromium.launch()

for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const pageErrors = []
  const consoleErrors = []
  const failedReqs = []
  page.on('pageerror', (e) => pageErrors.push(e.message.slice(0, 120)))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('Search endpoint')) consoleErrors.push(m.text().slice(0, 120))
  })
  page.on('response', (r) => { if (r.status() >= 400) failedReqs.push(r.status() + ' ' + r.url().replace(BASE, '')) })

  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    let y = 0
    await new Promise((res) => {
      const step = () => { window.scrollTo(0, y); y += 800; y < document.body.scrollHeight ? setTimeout(step, 30) : setTimeout(res, 500) }
      step()
    })
  })

  const data = await page.evaluate(() => {
    const txt = (e) => (e?.textContent || '').replace(/\s+/g, ' ').trim()

    // duplicate element ids
    const ids = {}
    document.querySelectorAll('[id]').forEach((e) => { ids[e.id] = (ids[e.id] || 0) + 1 })
    const dupIds = Object.entries(ids).filter(([, n]) => n > 1).map(([k, n]) => `${k} x${n}`)

    // headings
    const h1s = [...document.querySelectorAll('h1')].map(txt)
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => h.tagName + ':' + txt(h))

    // heading order (no skipped levels)
    let prev = 0
    const skips = []
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      const lvl = +h.tagName[1]
      if (prev && lvl > prev + 1) skips.push(`${'h' + prev} -> ${h.tagName} "${txt(h).slice(0, 40)}"`)
      prev = lvl
    }

    // eyebrow+title repeated back to back (the /sectors bug)
    const ebs = [...document.querySelectorAll('.eyebrow')].map(txt)
    const dupEyebrow = ebs.filter((e, i) => ebs.indexOf(e) !== i)

    // links
    const internal = [], external = [], empty = []
    document.querySelectorAll('a[href]').forEach((a) => {
      const h = a.getAttribute('href')
      if (!h || h === '#') { empty.push(txt(a).slice(0, 30) || '(no text)'); return }
      if (/^(mailto:|tel:)/.test(h)) return
      if (/^https?:\/\//.test(h)) {
        external.push({ href: h, target: a.getAttribute('target'), rel: a.getAttribute('rel'), text: txt(a).slice(0, 30) })
      } else if (h.startsWith('/')) internal.push(h)
    })

    // images
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: i.getAttribute('src'),
      ok: i.complete && i.naturalWidth > 0,
      alt: i.getAttribute('alt'),
      hidden: i.hasAttribute('aria-hidden'),
      dims: !!(i.getAttribute('width') && i.getAttribute('height')),
      lazy: i.getAttribute('loading')
    }))

    // form controls without a label
    const unlabelled = [...document.querySelectorAll('input,select,textarea')].filter((c) => {
      if (c.type === 'hidden' || c.type === 'submit') return false
      const byFor = c.id && document.querySelector(`label[for="${c.id}"]`)
      return !byFor && !c.closest('label') && !c.getAttribute('aria-label')
    }).map((c) => c.name || c.id || c.type)

    // landmarks
    const landmarks = {
      header: document.querySelectorAll('header').length,
      nav: document.querySelectorAll('nav').length,
      main: document.querySelectorAll('main').length,
      footer: document.querySelectorAll('footer').length
    }
    const contentinfo = [...document.querySelectorAll('footer')]
      .filter((f) => !f.closest('article,aside,main,nav,section')).length

    return {
      allIds: Object.keys(ids),
      title: document.title,
      h1s, headings, skips, dupIds, dupEyebrow,
      internal: [...new Set(internal)], external, empty,
      imgs, unlabelled, landmarks, contentinfo,
      canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      desc: document.querySelector('meta[name=description]')?.getAttribute('content')?.slice(0, 60),
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content')?.split('/').pop(),
      bodyWords: document.body.innerText.split(/\s+/).filter(Boolean).length
    }
  })

  // ---- assertions ----
  if (data.h1s.length !== 1) note(route, 'H1', `${data.h1s.length} <h1> elements: ${JSON.stringify(data.h1s)}`)
  if (data.skips.length) note(route, 'HEADING-ORDER', data.skips.join(' | '))
  if (data.dupIds.length) note(route, 'DUPLICATE-ID', data.dupIds.join(', '))
  if (data.dupEyebrow.length) note(route, 'DUPLICATE-EYEBROW', data.dupEyebrow.join(', '))
  if (!data.canonical) note(route, 'SEO', 'no canonical')
  if (!data.desc) note(route, 'SEO', 'no meta description')
  if (!data.ogImage) note(route, 'SEO', 'no og:image')
  if (data.landmarks.main !== 1) note(route, 'LANDMARK', `main x${data.landmarks.main}`)
  if (data.landmarks.footer !== 1) note(route, 'LANDMARK', `footer x${data.landmarks.footer}`)

  for (const i of data.imgs) {
    if (!i.ok) note(route, 'BROKEN-IMAGE', i.src)
    if (i.alt === null && !i.hidden) note(route, 'ALT', `no alt and not aria-hidden: ${i.src}`)
    if (!i.dims) note(route, 'CLS', `no width/height: ${i.src}`)
  }
  idsByRoute.set(route, new Set(data.allIds))
  for (const h of data.internal) {
    // static files under /downloads are real assets, not routes — check-assets.mjs
    // already guarantees they exist, so only flag them if the request actually failed
    if (h.startsWith('/downloads/')) continue
    // /projects?sector=mining#register -> path /projects, hash register
    const [pathAndQuery, hash] = h.split('#')
    const path = pathAndQuery.split('?')[0]
    if (!KNOWN_ROUTES.has(path)) note(route, 'DEAD-INTERNAL-LINK', h)
    else if (hash) hashLinks.push({ from: route, path, hash, href: h })
  }
  for (const e of data.external) {
    if (e.target !== '_blank') note(route, 'EXTERNAL-TARGET', `${e.href} (${e.text})`)
    if (!/noopener/.test(e.rel || '')) note(route, 'EXTERNAL-REL', `${e.href} missing noopener`)
  }
  if (data.empty.length) note(route, 'PLACEHOLDER-HREF', `${data.empty.length}: ${data.empty.join(', ')}`)
  if (data.unlabelled.length) note(route, 'FORM-LABEL', data.unlabelled.join(', '))
  if (data.bodyWords < 120) note(route, 'THIN-CONTENT', `${data.bodyWords} words`)
  if (pageErrors.length) note(route, 'PAGE-ERROR', pageErrors.join(' | '))
  if (consoleErrors.length) note(route, 'CONSOLE-ERROR', consoleErrors.join(' | '))
  for (const f of failedReqs) note(route, 'FAILED-REQUEST', f)

  console.log(
    route.slice(0, 44).padEnd(45) +
    `words:${String(data.bodyWords).padStart(4)}  h1:${data.h1s.length}  headings:${String(data.headings.length).padStart(2)}  ` +
    `imgs:${String(data.imgs.length).padStart(2)}  links:${String(data.internal.length + data.external.length).padStart(2)}  ` +
    `og:${String(data.ogImage || '-').slice(0, 26)}`
  )

  await page.close()
}

// every #anchor link must land on an element that exists on the target page
for (const l of hashLinks) {
  const ids = idsByRoute.get(l.path)
  if (ids && !ids.has(l.hash)) note(l.from, 'DEAD-ANCHOR', `${l.href} (no #${l.hash} on ${l.path})`)
}

console.log('\n' + '='.repeat(76))
if (!problems.length) {
  console.log('NO PROBLEMS FOUND')
} else {
  const byKind = {}
  for (const p of problems) (byKind[p.kind] ||= []).push(p)
  console.log(`${problems.length} findings across ${Object.keys(byKind).length} categories\n`)
  for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${kind}  (${list.length})`)
    const shown = list.slice(0, 6)
    for (const p of shown) console.log(`    ${p.route.padEnd(30)} ${p.msg}`)
    if (list.length > shown.length) console.log(`    ... and ${list.length - shown.length} more`)
  }
}

await browser.close()
