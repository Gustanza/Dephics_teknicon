<script setup>
import PageHero from '../components/PageHero.vue'
import SectorsList from '../components/SectorsList.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!--
    IA section 5. One page with seven blocks for launch; slugs are reserved in
    routes.js so these can split into their own pages without redirects.

    The masthead photograph used to be project-zmt-terminal.jpg, which was deleted
    during the hero rework. Nothing caught it — a decorative <img> 404s silently —
    so the panel rendered empty until someone looked at the page.
    `npm run build` now runs tools/check-assets.mjs first to make that impossible.

    SectorsList is passed `hide-heading` because PageHero already carries this page's
    <h1>; without it the eyebrow and title appeared twice, one above the other.
  -->
  <PageHero
    eyebrow="Sectors"
    :lines="['Who we', 'build for']"
    lede="A service is what Teknicon does. A sector is who or what it serves."
    image="/img/project-binguni-hospital.jpg"
    :w="1464"
    :h="880"
    focus="50% 55%"
  />
  <SectorsList hide-heading />
  <SplitCta />
</template>
