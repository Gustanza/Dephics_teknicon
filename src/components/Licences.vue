<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import { licences } from '../data/content.js'

/*
  The ten statutory and professional registrations, plus the profile download.

  For a consulting engineer in Tanzania this block is evidence, not decoration:
  a tenderer checks the ERB number and the practising licence before anything
  else. So it is built as a table of record rather than a feature grid — the
  §7.1 hairline cell grid, the same construction as Clients.vue and About's
  ab__depts-grid: no gutter, each cell drawing its own right and bottom rule,
  the outer edges flush with the container so the rules read as ruled paper.

  Two columns of five rather than a single long column: ten rows in one column
  would run past a screen and force scrolling between a name and its number.

  Reference numbers are tabular-nums and sit at the same offset in every cell,
  so the figures line up down each column and can be scanned rather than read.
  `expires` is quiet secondary text and only appears on the four registrations
  that carry a date — nothing is invented for the six that do not.

  The download is a real file, so Button takes `href`, not `to`.
*/

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="licences" class="section band--white lc">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="licences.eyebrow" :lines="licences.title">
          {{ licences.lede }}
        </SectionHeading>
      </Reveal>

      <ul class="lc__grid">
        <Reveal
          v-for="(item, i) in licences.items"
          :key="item.ref"
          as="li"
          class="lc__cell"
          :delay="(i % 2) * 100"
        >
          <span class="lc__n" aria-hidden="true">{{ pad(i) }}</span>
          <div class="lc__body">
            <p class="lc__name">{{ item.name }}</p>
            <p class="lc__ref">{{ item.ref }}</p>
            <p v-if="item.expires" class="lc__exp">Expires {{ item.expires }}</p>
          </div>
        </Reveal>
      </ul>

      <Reveal class="lc__dl" variant="fade" :delay="100">
        <Button :href="licences.download.href" :label="licences.download.label" />
        <span class="lc__meta">{{ licences.download.meta }}</span>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* ---------- the §7.1 hairline cell grid ---------- */

.lc__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: var(--space-medium) 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--c-bd);
}

/* Cells carry their own right + bottom rule. The first column drops its left
   padding and the second its right, so the grid's outer edges sit flush with
   the container and only the internal rules are drawn. Ten items in two
   columns is exactly five full rows, so the last row's bottom rules close the
   block — no separate bottom border needed. */
.lc__cell {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 26px 30px;
  border-style: solid;
  border-color: var(--c-bd);
  border-width: 0 1px 1px 0;
  transition: background-color var(--dur) var(--ease);
}
.lc__cell:nth-child(2n + 1) { padding-left: 0; }
.lc__cell:nth-child(2n) { padding-right: 0; border-right-width: 0; }
.lc__cell:hover { background-color: var(--c-bg); }

.lc__n {
  flex-shrink: 0;
  font-size: 1.6em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
  color: var(--c-bd);
  transition: color var(--dur) var(--ease);
}
.lc__cell:hover .lc__n { color: var(--c-brand-red); }

.lc__body { min-width: 0; }

.lc__name {
  margin: 0;
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-heading);
}

/* tabular figures, at the same offset in every cell, so the numbers align
   down the column instead of drifting with the name above them */
.lc__ref {
  margin: 9px 0 0;
  font-size: 17px;
  line-height: 1.4em;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--c-text);
  overflow-wrap: anywhere;   /* BL01396912025-2600017652 must break, not overflow */
}

.lc__exp {
  margin: 5px 0 0;
  font-size: 13px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

/* ---------- download ---------- */

.lc__dl {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 22px;
  margin-top: var(--space-medium);
}

.lc__meta {
  font-size: 13px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

/* ---------- responsive ---------- */

@media (max-width: 1023px) {
  .lc__cell { padding: 22px 24px; gap: 16px; }
  .lc__n { font-size: 1.4em; }
}

@media (max-width: 767px) {
  .lc__grid { grid-template-columns: 1fr; }
  .lc__cell,
  .lc__cell:nth-child(2n + 1),
  .lc__cell:nth-child(2n) {
    padding: 20px 0;
    border-right-width: 0;
  }
  /* the theme drops negative tracking entirely below 768px */
  .lc__name,
  .lc__n { letter-spacing: 0; }
}
</style>
