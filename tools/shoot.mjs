// Screenshot helper. Usage:
//   node tools/shoot.mjs <url> <outDir> [prefix]
// Captures: full-page PNG plus sequential viewport-height tiles, at 1440x900.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const [url, outDir, prefix = 'shot'] = process.argv.slice(2)
if (!url || !outDir) {
  console.error('usage: node tools/shoot.mjs <url> <outDir> [prefix]')
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 }).catch(() => {})

// Scroll through to trigger lazy-loading and entrance animations, then return to top.
const height = await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0
    const step = () => {
      window.scrollTo(0, y)
      y += 600
      if (y < document.body.scrollHeight) setTimeout(step, 120)
      else setTimeout(resolve, 800)
    }
    step()
  })
  window.scrollTo(0, 0)
  return document.body.scrollHeight
})
await page.waitForTimeout(1200)

await page.screenshot({ path: join(outDir, `${prefix}-full.png`), fullPage: true })

const tiles = Math.min(Math.ceil(height / 900), 14)
for (let i = 0; i < tiles; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * 900)
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(outDir, `${prefix}-${String(i).padStart(2, '0')}.png`) })
}

// Mobile pass
await page.setViewportSize({ width: 390, height: 844 })
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(900)
await page.screenshot({ path: join(outDir, `${prefix}-mobile-full.png`), fullPage: true })

console.log(`captured ${tiles} tiles + full page (${height}px) -> ${outDir}`)
await browser.close()
