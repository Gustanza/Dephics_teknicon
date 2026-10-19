<script setup>
import PageHero from '../components/PageHero.vue'
import CaseStudies from '../components/CaseStudies.vue'
import ProjectRegister from '../components/ProjectRegister.vue'
import Clients from '../components/Clients.vue'
import SplitCta from '../components/SplitCta.vue'
import { homeContactCta } from '../data/content.js'
</script>

<template>
  <!-- Lede: the old "delivered across … Uganda" was wrong — the one Ugandan project,
       the High Commission, was built in Dodoma for the Government of Uganda. The only
       project outside Tanzania is the Kigali warehouse (BRIEF §5). -->
  <!-- IA section 4: featured case studies, then the full register with filters. Every
       project links to its own page at /projects/<slug> (ProjectPage.vue). -->
  <PageHero
    eyebrow="Projects"
    :lines="['Proven on', 'the ground']"
    lede="Buildings, transport and urban infrastructure, and water dams and tailings storage facilities — delivered across Tanzania, including Zanzibar, and in Rwanda."
    image="/img/project-tra-ita-hotel.jpg"
    :w="1367"
    :h="771"
  />
  <CaseStudies />
  <ProjectRegister />
  <Clients />
  <!-- the contact / enquiry pair, as on Home: the default second panel ("Who do we
       work for? → See our clients") pointed at the Clients section directly above -->
  <SplitCta :panels="homeContactCta.panels" :label="homeContactCta.label" />
</template>
