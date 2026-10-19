<script setup>
import PageHero from '../components/PageHero.vue'
import ServicesIndex from '../components/ServicesIndex.vue'
import Quality from '../components/Quality.vue'
import ConsultCta from '../components/ConsultCta.vue'
</script>

<template>
  <!-- IA section 3: the capability menu. Each of the five rows links to its own page
       at /services/<slug> (ServicePage.vue). -->
  <!-- heading + lede from the client's handwritten note (2026-10-19); the note's
       "From feasibility studies, detailed design, and construction supervision &
       project management" tidied to a complete from/to sentence -->
  <PageHero
    eyebrow="Services"
    :lines="['What clients', 'hire us to do']"
    lede="From feasibility studies and detailed design to construction supervision and project management."
    image="/img/project-kilombero-pump-station.jpg"
    :w="1600"
    :h="1200"
  />
  <ServicesIndex />
  <Quality />
  <ConsultCta />
</template>
