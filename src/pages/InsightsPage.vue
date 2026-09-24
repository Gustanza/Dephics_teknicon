<script setup>
import PageHero from '../components/PageHero.vue'
import InsightsLinks from '../components/InsightsLinks.vue'
import InsightsMore from '../components/InsightsMore.vue'
import SplitCta from '../components/SplitCta.vue'
</script>

<template>
  <!-- IA section 6, as amended by client comment C4: launches as curated regulatory
       and professional links rather than a news feed. -->
  <PageHero
    eyebrow="Insights & resources"
    :lines="['A regulated', 'profession']"
    lede="The authorities, professional bodies and standards that govern consulting engineering in Tanzania."
    image="/img/site-survey-team.jpg"
    :w="1070"
    :h="775"
  />
  <!-- flush-bottom: InsightsMore continues the same list of groups directly below -->
  <InsightsLinks hide-heading class="section--flush-bottom" />
  <!-- P6: publications & downloads, news, careers -->
  <InsightsMore />
  <SplitCta />
</template>
