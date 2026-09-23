<script setup>
import Hero from '../components/Hero.vue'
import Credentials from '../components/Credentials.vue'
import HomeIntro from '../components/HomeIntro.vue'
import Services from '../components/Services.vue'
import Projects from '../components/Projects.vue'
import SectorsList from '../components/SectorsList.vue'
import Counters from '../components/Counters.vue'
import Clients from '../components/Clients.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 1: slideshow, brief intro, service highlights, featured projects,
       sectors served, differentiators, client logos, contact strip -->
  <Hero />
  <Credentials />
  <HomeIntro />
  <Services teaser />
  <Projects teaser />
  <SectorsList teaser />
  <Counters />
  <Clients />
  <SplitCta />
</template>
