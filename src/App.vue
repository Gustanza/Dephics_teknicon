<script setup>
import SiteHeader from './components/SiteHeader.vue'
import Hero from './components/Hero.vue'
import Credentials from './components/Credentials.vue'
import Services from './components/Services.vue'
import Quality from './components/Quality.vue'
import Projects from './components/Projects.vue'
import Clients from './components/Clients.vue'
import Counters from './components/Counters.vue'
import Vision from './components/Vision.vue'
import Team from './components/Team.vue'
import SplitCta from './components/SplitCta.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollTop from './components/ui/ScrollTop.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <SiteHeader />

  <main id="main">
    <Hero />
    <Credentials />
    <Services />
    <Quality />
    <Projects />
    <Clients />
    <Counters />
    <Vision />
    <Team />
    <SplitCta />
  </main>

  <SiteFooter />

  <ScrollTop />
</template>
