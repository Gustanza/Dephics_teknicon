<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { absolute, headFor, SITE } from '../router/routes.js'

/*
  Per-route <head>, driven entirely by the `meta` block in router/routes.js so the
  titles, descriptions and social tags live in one table instead of being scattered
  through page components.

  vite-ssg bundles @unhead/vue, so these tags are baked into the prerendered HTML
  rather than being applied after hydration — which is the whole point of prerendering
  for search and for WhatsApp/email link previews.

  useHead() MUST be called once, synchronously, at the top level of setup. An earlier
  version called it inside a watchEffect to react to route changes; that runs outside
  the setup context, so unhead threw "useHead() was called without provide context".
  In the production build the error was swallowed, but in dev it escaped and broke
  vue-router's navigation — the URL changed while <RouterView> never re-rendered, so
  every menu click looked like it did nothing. Reactivity comes from passing a computed
  instead: unhead re-evaluates it whenever the route changes.
*/
const route = useRoute()

const head = computed(() => {
  // detail routes compute their head from the data (routes.js, meta.head)
  const m = headFor(route)
  const url = absolute(route.path)
  const image = m.image ? `${SITE}${m.image}` : null

  return {
    title: m.title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: m.description },
      ...(m.noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
      { property: 'og:title', content: m.title },
      { property: 'og:description', content: m.description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Teknicon Ltd' },
      ...(image ? [{ property: 'og:image', content: image }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: m.title },
      { name: 'twitter:description', content: m.description },
      ...(image ? [{ name: 'twitter:image', content: image }] : [])
    ]
  }
})

useHead(head)
</script>

<template><span /></template>
