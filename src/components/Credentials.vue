<script setup>
import Reveal from './ui/Reveal.vue'
import { credentials } from '../data/content.js'
</script>

<template>
  <section class="creds" aria-label="Registrations and licences">
    <!-- the theme's partner-logo strip: hairline cells, 0 1px 1px 0, no gutter -->
    <ul class="creds__grid">
      <Reveal
        v-for="(item, i) in credentials.items"
        :key="item.label"
        as="li"
        class="creds__cell"
        :delay="i * 100"
      >
        <span class="creds__label">{{ item.label }}</span>
        <span class="creds__value">{{ item.value }}</span>
      </Reveal>
    </ul>
    <p class="creds__caption">{{ credentials.caption }}</p>
  </section>
</template>

<style scoped>
.creds { background-color: var(--c-bg); }

.creds__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid var(--c-bd);
}

.creds__cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 40px 26px;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: var(--c-bd);
  transition: background-color var(--dur) var(--ease);
}
.creds__cell:last-child { border-right-width: 0; }
.creds__cell:hover { background-color: var(--c-bg-alt); }

.creds__label {
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--c-text-light);
}

.creds__value {
  font-size: 24px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -.5px;
  color: var(--c-text-dark);
}
.creds__cell:hover .creds__value { color: var(--c-link); }

.creds__caption {
  margin: 0;
  padding: 27px var(--edge-pad);
  font-size: 15px;
  line-height: 1.5;
  color: var(--c-text-light);
  text-align: center;
  border-bottom: 1px solid var(--c-bd);
}

@media (max-width: 1279px) {
  .creds__grid { grid-template-columns: repeat(3, 1fr); }
  .creds__cell { padding: 30px 22px; }
  .creds__cell:nth-child(6n) { border-right-width: 1px; }
  .creds__cell:nth-child(3n) { border-right-width: 0; }
  .creds__cell:last-child { border-right-width: 0; }
}

@media (max-width: 639px) {
  .creds__grid { grid-template-columns: repeat(2, 1fr); }
  .creds__cell { padding: 22px 16px; }
  .creds__cell:nth-child(6n) { border-right-width: 1px; }
  .creds__cell:nth-child(3n) { border-right-width: 1px; }
  .creds__cell:nth-child(2n) { border-right-width: 0; }
  .creds__cell:last-child { border-right-width: 0; }
  .creds__value { font-size: 20px; }
  .creds__label { font-size: 12px; }
}
</style>
