import { chromium } from 'playwright'

const [htmlPath, outPath] = process.argv.slice(2)
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ deviceScaleFactor: 3 })
await page.goto('file://' + htmlPath)
await page.waitForTimeout(500)
const el = await page.$('#lockup')
await el.screenshot({ path: outPath, omitBackground: true })
await browser.close()
console.log('saved', outPath)
