<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { clients } from '../data/content.js'
</script>

<template>
  <section id="clients" class="section band--white cl">
    <div class="container">
      <div class="cl__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="clients.eyebrow" :lines="clients.title" />
        </Reveal>
        <Reveal class="cl__note" variant="fade" :delay="100">
          {{ clients.note }}
        </Reveal>
      </div>
    </div>

    <!-- §7.1 hairline cell grid: no gutter, 0 1px 1px 0 rules, logos 30% → 100% -->
    <ul class="cl__grid">
      <Reveal
        v-for="(logo, i) in clients.logos"
        :key="logo.file"
        as="li"
        class="cl__cell"
        :delay="(i % 6) * 100"
      >
        <img
          :src="logo.file"
          :alt="logo.name"
          :width="logo.w"
          :height="logo.h"
          :style="{ '--mh': logo.mh }"
          loading="lazy"
        />
      </Reveal>
      <!--
        Eleven marks in a six-up grid leave a five-cell final row. The twelfth
        cell is left empty rather than stretching the eleventh across the gap:
        an empty ruled cell closes the row at 6-up, 3-up and 2-up without
        making one cell twice as wide (which doubled its percentage padding and
        left the last mark centred on the line where the rules above it sit).
      -->
      <li class="cl__cell cl__cell--empty" aria-hidden="true" />
    </ul>
  </section>
</template>

<style scoped>
.cl { overflow: hidden; }

.cl__head {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
  margin-bottom: var(--space-medium);
}

.cl__note {
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

.cl__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid var(--c-bd);
}

/* §7.1: padding 18% 10% on desktop, 9% ≤1279. Every cell is one column wide,
   so the percentages resolve against the same width and every row is the same
   height. */
.cl__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18% 10%;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: var(--c-bd);
}
.cl__cell:nth-child(6n) { border-right-width: 0; }

/* Zero-width strut. A grid row is only as tall as its tallest mark, so without
   this the 3-up layout ran 26% taller on the row carrying the square marks than
   on the row carrying the wordmarks. The strut is the tallest mark box (96),
   so every row is padding + 96 at every breakpoint. */
.cl__cell::before {
  content: "";
  flex: 0 0 0;
  height: calc(96 * var(--mark-k, 1px));
}

.cl__cell img {
  /* area-normalised: --mh comes from content.js and is set so that every
     mark's ink covers the same area. width follows from the aspect ratio. */
  width: auto;
  height: calc(var(--mh) * var(--mark-k, 1px));
  max-width: 100%;
  object-fit: contain;
  transition: transform var(--dur) var(--ease);
}
.cl__cell:hover img { transform: scale(1.1); }

@media (max-width: 1279px) {
  .cl__grid { grid-template-columns: repeat(3, 1fr); }
  .cl__cell { padding: 9%; }
  .cl__cell:nth-child(6n) { border-right-width: 1px; }
  .cl__cell:nth-child(3n) { border-right-width: 0; }
}

@media (max-width: 1023px) {
  .cl__head { grid-template-columns: 1fr; align-items: start; }
  .cl__note { padding-top: 0; border-top: 0; }
}

@media (max-width: 767px) {
  .cl__grid { grid-template-columns: repeat(2, 1fr); }
  .cl__cell { padding: 26px 18px; --mark-k: .72px; }
  .cl__cell:nth-child(6n), .cl__cell:nth-child(3n) { border-right-width: 1px; }
  .cl__cell:nth-child(2n) { border-right-width: 0; }
}
</style>
