/**
 * vite-ssg entry point.
 *
 * Exporting `createApp` from ViteSSG lets the build prerender every route in
 * `routes.js` to real static HTML. That matters here because the site is chasing
 * government and mining tenders — procurement staff search, and link previews in
 * WhatsApp and email need real per-page <meta>. A client-only SPA would have neither.
 *
 * The output is still plain static files; no server is required to host it.
 */
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes.js'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes,

    /*
      Scroll handling, and why it is this fussy.

      Navigating from the bottom of one page used to leave you at the bottom of the
      next one — and because every page ends in the same footer, that reads as
      "the link did nothing". It only reproduced on the dev server, where route
      components are fetched on demand: vue-router asks to scroll before the
      incoming component has rendered, the document is still the old height, and
      the scroll is clamped or discarded. In the production build everything is
      bundled, the new view renders immediately, and the same code appeared to work.

      Two fixes, both needed:
        1. Wait two animation frames so the incoming view has laid out before we scroll.
        2. Scroll with behavior 'instant'. `html { scroll-behavior: smooth }` otherwise
           animates the jump, and a height change mid-animation aborts it — which was
           the other half of the dev-only failure.

      In-page anchors keep their smooth scroll: there the page is already rendered
      and the motion is the point.
    */
    scrollBehavior (to, from, savedPosition) {
      const settled = () =>
        new Promise((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        })

      if (to.hash) {
        return settled().then(() => ({ el: to.hash, top: 90, behavior: 'smooth' }))
      }
      // back/forward should land where the visitor left off
      if (savedPosition) {
        return settled().then(() => ({ ...savedPosition, behavior: 'instant' }))
      }
      return settled().then(() => ({ top: 0, left: 0, behavior: 'instant' }))
    }
  }
)
