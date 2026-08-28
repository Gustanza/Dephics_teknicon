import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'chrome' })
const context = await browser.newContext({ viewport: { width: 2000, height: 1250 } })
const page = await context.newPage()
await page.goto('http://teknicon.local/?nc=' + Date.now())
await page.waitForTimeout(1200)
const decline = await page.$('text=Decline')
if (decline) await decline.click().catch(() => {})
await page.waitForTimeout(500)
await page.screenshot({ path: '/tmp/header_slide1.png', clip: { x: 0, y: 0, width: 2000, height: 150 } })
await page.waitForTimeout(10000)
await page.screenshot({ path: '/tmp/header_slide2.png', clip: { x: 0, y: 0, width: 2000, height: 150 } })
await browser.close()
