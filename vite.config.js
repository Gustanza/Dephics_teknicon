import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { staticPaths } from './src/data/lookup.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  ssgOptions: {
    /*
      vite-ssg only prerenders routes with a concrete path, so on its own it would skip
      every /services/:slug and /projects/:slug page and the 404. The list comes from the
      data (src/data/lookup.js), so a new project or service is prerendered as soon as
      it is added to content.js.
    */
    includedRoutes: () => staticPaths
  }
})
