<script setup>
import Hero from '../components/Hero.vue'
// import HomeIntro from '../components/HomeIntro.vue'   /* hidden — see the template */
import Services from '../components/Services.vue'
import Projects from '../components/Projects.vue'
import SectorsList from '../components/SectorsList.vue'
import WhyTeknicon from '../components/WhyTeknicon.vue'
import Counters from '../components/Counters.vue'
import Clients from '../components/Clients.vue'
import SplitCta from '../components/SplitCta.vue'
import { homeContactCta } from '../data/content.js'
</script>

<template>
  <!-- IA section 1: slideshow, brief intro, service highlights, featured projects,
       sectors served, differentiators, client logos, contact strip -->
  <Hero />
  <!-- The registration-number strip that sat here was removed 2026-09-29: the numbers
       are private company information and are published nowhere on the site. -->
  <!-- HIDDEN (client, 2026-10-15): the "Who we are" intro did not sit well with the
       client. Component and copy are kept (HomeIntro.vue, `homeIntro` in content.js);
       to restore, uncomment this line and the import above. -->
  <!-- <HomeIntro /> -->
  <Services teaser />
  <Projects teaser />
  <SectorsList teaser />
  <WhyTeknicon />
  <Counters />
  <Clients />
  <SplitCta :panels="homeContactCta.panels" :label="homeContactCta.label" />
</template>
