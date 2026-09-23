<script setup>
import PageHero from '../components/PageHero.vue'
import ContactBlock from '../components/ContactBlock.vue'
</script>

<template>
  <!-- IA section 7 -->
  <PageHero
    eyebrow="Contact us"
    :lines="['Talk to a registered', 'consulting engineer']"
    lede="For proposals, tender enquiries and technical questions."
    image="/img/site-supervision-crew.jpg"
    :w="808"
    :h="611"
  />
  <ContactBlock />
</template>
