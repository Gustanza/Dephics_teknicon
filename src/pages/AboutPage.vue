<script setup>
import PageHero from '../components/PageHero.vue'
import About from '../components/About.vue'
import Vision from '../components/Vision.vue'
import Quality from '../components/Quality.vue'
import OrgChart from '../components/OrgChart.vue'
import Licences from '../components/Licences.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 2: overview, vision, leadership (positions), quality/HSE,
       organisation structure, licences, profile download -->
  <PageHero
    eyebrow="About us"
    :lines="['Consulting engineers', 'since 2009']"
    lede="A multidisciplinary local consultancy firm, wholly Tanzanian-owned and registered with the Engineers Registration Board."
    image="/img/project-kibongoto-laboratory.jpg"
    :w="1024"
    :h="768"
  />
  <About />
  <Vision />
  <Quality />
  <OrgChart />
  <Licences />
  <SplitCta />
</template>
