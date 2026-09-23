<script setup>
import PageHero from '../components/PageHero.vue'
import Projects from '../components/Projects.vue'
import Clients from '../components/Clients.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 4. Phase 3 adds filters and individual project pages. -->
  <PageHero
    eyebrow="Projects"
    :lines="['Proven on', 'the ground']"
    lede="Buildings, transport and urban infrastructure, and water, dams and tailings storage facilities delivered across Tanzania, Rwanda, Uganda and Zanzibar."
    image="/img/project-tra-ita-hotel.jpg"
    :w="1367"
    :h="771"
  />
  <Projects />
  <Clients />
  <SplitCta />
</template>
