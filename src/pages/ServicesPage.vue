<script setup>
import PageHero from '../components/PageHero.vue'
import Services from '../components/Services.vue'
import Quality from '../components/Quality.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 3. Phase 2 adds the five individual service pages beneath this index. -->
  <PageHero
    eyebrow="Services"
    :lines="['What a client', 'hires us to do']"
    lede="Multidisciplinary consulting engineering across the whole project lifecycle — feasibility study, detailed design, tender documentation, construction supervision, contract administration and close-out."
    image="/img/project-kilombero-pump-station.jpg"
    :w="1600"
    :h="1200"
  />
  <Services />
  <Quality />
  <SplitCta />
</template>
