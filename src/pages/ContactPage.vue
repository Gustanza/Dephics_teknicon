<script setup>
import PageHero from '../components/PageHero.vue'
import ContactBlock from '../components/ContactBlock.vue'
import { contactPage } from '../data/content.js'
</script>

<template>
  <!-- IA section 7 -->
  <PageHero
    :eyebrow="contactPage.eyebrow"
    :lines="contactPage.title"
    :lede="contactPage.lede"
    image="/img/site-supervision-crew.jpg"
    :w="808"
    :h="611"
  />
  <ContactBlock />
</template>
