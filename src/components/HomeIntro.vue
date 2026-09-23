<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import { homeIntro } from '../data/content.js'

/*
  IA section 1: "Brief introduction to Teknicon with a linked button to About us Page".

  Deliberately short. The full Introduction — the three profile paragraphs, the objective
  statement and the department grid — lives on /about in About.vue. Repeating it here
  would make the homepage a second about page and bury the service highlights below it.
*/
</script>

<template>
  <section class="section band--white hi">
    <div class="container hi__grid">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="homeIntro.eyebrow" :lines="homeIntro.title" dash />
      </Reveal>
      <Reveal class="hi__body" variant="fade" :delay="100">
        <p class="hi__text">{{ homeIntro.body }}</p>
        <Button :to="homeIntro.cta.to" :label="homeIntro.cta.label" variant="navy" />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.hi__grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: var(--grid-gap) 80px;
  align-items: start;
}

.hi__text {
  margin: 0 0 var(--space-small);
  font-size: 19px;
  line-height: 1.6em;
  letter-spacing: -.2px;
  color: var(--c-text);
}

@media (max-width: 1023px) {
  .hi__grid { grid-template-columns: 1fr; gap: var(--space-small); }
  .hi__text { font-size: 17px; letter-spacing: 0; }
}
</style>
