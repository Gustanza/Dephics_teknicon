<script setup>
import Reveal from './ui/Reveal.vue'
import { company } from '../data/content.js'
</script>

<template>
  <section class="section band--dark vis" aria-label="Vision statement">
    <div class="container vis__inner">
      <Reveal variant="fade">
        <blockquote class="vis__quote">
          <p>{{ company.vision }}</p>
          <footer class="vis__author">{{ company.visionAttribution }}</footer>
        </blockquote>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/*
  Flat colour, no texture. The demo's factory-texture PNG has no Teknicon
  equivalent, and a dimmed portfolio photograph is not a substitute (§7.5).
  Instead the two dark bands are separated the way the theme separates every
  other surface: one tonal step (#0B0E24 → #141733) and a 1px hairline, so the
  counters band and the vision band read as two bands rather than one field.
*/
.vis {
  overflow: hidden;
  padding-top: var(--space-large);
  background-color: var(--d-bg-alt);
  border-top: 1px solid var(--d-bd);
}

.vis__inner { position: relative; z-index: 1; }

.vis__quote {
  margin: 0 auto;
  max-width: 70%;
  text-align: center;
}

.vis__quote p {
  margin: 0;
  font-size: clamp(27px, 6px + 3.13vw, 46px);
  line-height: 1.05em;
  font-weight: 700;
  letter-spacing: -1.8px;
  color: var(--d-text-dark);
}
@media (min-width: 1280px) {
  .vis__quote p { font-size: var(--h1-size); line-height: var(--h1-lh); }
}

.vis__author {
  margin-top: 2.3em;
  font-size: 15px;
  line-height: 1.333em;
  letter-spacing: 0;
  color: var(--d-text-light);
}

@media (max-width: 1023px) {
  .vis__quote { max-width: 100%; }
}
@media (max-width: 767px) {
  .vis__quote p { letter-spacing: 0; }
}
</style>
