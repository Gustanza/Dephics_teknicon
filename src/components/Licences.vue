<script setup>
import { nextTick, ref } from 'vue'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import Tbc from './ui/Tbc.vue'
import { licences } from '../data/content.js'
import { shown } from '../data/tbc.js'

/*
  Statutory and professional registrations, in two tabs, plus the profile download.

  Tabs at the client's request (handwritten note, 2026-10-19): "Statutory Compliance"
  first, then "Professional Compliance", each listing its bodies in the note's order.
  The note lists organisations, so the profile's three TRA certificates are one TRA
  row and ERB's registration + practising licence are one ERB row.

  For a consulting engineer in Tanzania this block is evidence, not decoration, so
  each list is built as a table of record rather than a feature grid — the §7.1
  hairline cell grid, the same construction as Clients.vue and About's
  ab__depts-grid: no gutter, each cell drawing its own right and bottom rule, the
  outer edges flush with the container so the rules read as ruled paper. Both lists
  have an even count (8 and 4), so the two-column rows always close.

  Tabs follow the WAI-ARIA tabs pattern: one tab stop, arrow keys / Home / End move
  between tabs and activate them. Both panels are in the prerendered HTML (the
  inactive one carries `hidden`), so the content is crawlable and works before
  hydration shows the first tab. Styling is the header nav's: text tabs, 2px
  underline on the active one, square, no fill, no shadow.

  The download is a real file, so Button takes `href`, not `to`.
*/

const pad = (i) => String(i + 1).padStart(2, '0')
const groups = licences.groups
const active = ref(groups[0].id)
const tabEls = ref([])

async function select (i, focus = false) {
  active.value = groups[i].id
  if (focus) { await nextTick(); tabEls.value[i]?.focus() }
}
function onKey (e, i) {
  const last = groups.length - 1
  const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
  if (to === undefined) return
  e.preventDefault()
  select(to, true)
}
</script>

<template>
  <section id="licences" class="section band--paper lc">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="licences.eyebrow" :lines="licences.title">
          {{ licences.lede }}
        </SectionHeading>
      </Reveal>

      <Reveal variant="fade" :delay="100">
        <div class="lc__tabs" role="tablist" aria-label="Registrations">
          <button
            v-for="(g, i) in groups"
            :id="`lc-tab-${g.id}`"
            :key="g.id"
            ref="tabEls"
            type="button"
            role="tab"
            class="lc__tab"
            :class="{ 'is-active': active === g.id }"
            :aria-selected="active === g.id ? 'true' : 'false'"
            :aria-controls="`lc-panel-${g.id}`"
            :tabindex="active === g.id ? 0 : -1"
            @click="select(i)"
            @keydown="onKey($event, i)"
          >
            {{ g.label }}
            <span class="lc__count" aria-hidden="true">{{ g.items.length }}</span>
          </button>
        </div>

        <div
          v-for="g in groups"
          :id="`lc-panel-${g.id}`"
          :key="g.id"
          role="tabpanel"
          :aria-labelledby="`lc-tab-${g.id}`"
          :hidden="active !== g.id"
          tabindex="0"
          class="lc__panel"
        >
          <ul class="lc__grid">
            <li v-for="(item, i) in g.items" :key="item.name" class="lc__cell">
              <span class="lc__n" aria-hidden="true">{{ pad(i) }}</span>
              <div class="lc__body">
                <p class="lc__name">{{ item.name }}</p>
                <p v-if="shown(item.ref)" class="lc__ref"><Tbc :value="item.ref" /></p>
              </div>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal class="lc__dl" variant="fade" :delay="100">
        <Button :href="licences.download.href" :label="licences.download.label" />
        <span class="lc__meta">{{ licences.download.meta }}</span>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* ---------- tabs: the header nav's text-and-underline treatment ---------- */

.lc__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0 40px;
  margin-top: var(--space-medium);
  border-bottom: 1px solid var(--c-bd);
}

.lc__tab {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 -1px;              /* the active underline sits on the hairline */
  padding: 0 0 17px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  font: inherit;
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-text);
  cursor: pointer;
  transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.lc__tab:hover { color: var(--c-link); }
.lc__tab.is-active { color: var(--c-heading); border-bottom-color: var(--c-heading); }
.lc__tab:focus-visible { outline: 2px solid var(--c-link); outline-offset: 4px; }

.lc__count {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.lc__panel:focus-visible { outline: 2px solid var(--c-link); outline-offset: 4px; }

/* ---------- the §7.1 hairline cell grid ---------- */

.lc__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Cells carry their own right + bottom rule. The first column drops its left
   padding and the second its right, so the grid's outer edges sit flush with
   the container and only the internal rules are drawn. The tab row's hairline
   is the grid's top rule; both lists have an even count, so the last row's
   bottom rules close the block. */
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
/* paper band (so it steps off the white Quality section above it); the hover is
   the same one-step tonal shift, reversed */
.lc__cell:hover { background-color: var(--c-bg-alt); }

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

.lc__ref {
  margin: 9px 0 0;
  font-size: 17px;
  line-height: 1.4em;
  font-weight: 500;
  color: var(--c-text);
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
  .lc__tabs { gap: 0 24px; }
  .lc__tab { font-size: 16px; padding-bottom: 14px; }
  .lc__grid { grid-template-columns: 1fr; }
  .lc__cell,
  .lc__cell:nth-child(2n + 1),
  .lc__cell:nth-child(2n) {
    padding: 20px 0;
    border-right-width: 0;
  }
  /* the theme drops negative tracking entirely below 768px */
  .lc__name,
  .lc__tab,
  .lc__n { letter-spacing: 0; }
}
</style>
