<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHead from './components/SiteHead.vue'
import ScrollTop from './components/ui/ScrollTop.vue'
</script>

<template>
  <SiteHead />

  <a class="skip-link" href="#main">Skip to content</a>

  <SiteHeader />

  <main id="main">
    <RouterView />
  </main>

  <SiteFooter />

  <ScrollTop />
</template>
