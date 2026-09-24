<script setup>
import PageHero from '../components/PageHero.vue'
import ServicesIndex from '../components/ServicesIndex.vue'
import Quality from '../components/Quality.vue'
import ConsultCta from '../components/ConsultCta.vue'
</script>

<template>
  <!-- IA section 3: the capability menu. Each of the five rows links to its own page
       at /services/<slug> (ServicePage.vue). -->
  <PageHero
    eyebrow="Services"
    :lines="['What a client', 'hires us to do']"
    lede="Five services, one engineering practice — from feasibility study to the end of the Defects Liability Period."
    image="/img/project-kilombero-pump-station.jpg"
    :w="1600"
    :h="1200"
  />
  <ServicesIndex />
  <Quality />
  <ConsultCta />
</template>
