<script setup>
import PageHero from '../components/PageHero.vue'
import CaseStudies from '../components/CaseStudies.vue'
import ProjectRegister from '../components/ProjectRegister.vue'
import Clients from '../components/Clients.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 4: featured case studies, then the full register with filters. Every
       project links to its own page at /projects/<slug> (ProjectPage.vue). -->
  <PageHero
    eyebrow="Projects"
    :lines="['Proven on', 'the ground']"
    lede="Buildings, transport and urban infrastructure, and water, dams and tailings storage facilities delivered across Tanzania, Rwanda, Uganda and Zanzibar."
    image="/img/project-tra-ita-hotel.jpg"
    :w="1367"
    :h="771"
  />
  <CaseStudies />
  <ProjectRegister />
  <Clients />
  <SplitCta />
</template>
