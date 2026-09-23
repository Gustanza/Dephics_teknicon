<script setup>
/*
  IA section 5 — who the firm builds for.

  Two variants of one component:
    · teaser  (Home) — the seven names only, in the §7.1 hairline cell grid, with a
      RouterLink onward. Home already runs eight sections; this one has to be short.
    · full    (/sectors) — the same seven, each carrying its three evidenced projects.

  The evidence lists are the whole argument of the page: they are what turns "we work
  in mining" into "TSF2 Phases 1 to 3B, New Luika Gold Mine". So they are set at body
  size on their own ruled lines, not shrunk into a caption.

  Layout follows the theme's asymmetry vocabulary (THEME_DNA §11.9) rather than seven
  identical stacked panels: an unequal head row, then a two-column register in which
  the right-hand column is dropped by one --space-medium step — the same deliberate
  non-baseline-aligned offset the theme uses for its staggered card pairs (§4.3).
  Nothing is a box: entries are separated by 1px rules and a tonal step only (§11.2).
*/
/* `hideHeading` is set by the page that already opens with a PageHero. The PageHero
   carries the page's <h1>, so repeating the same eyebrow and title immediately below it
   reads as a mistake — which is exactly what happened on /sectors, where both said
   "SECTORS / Who we build for". The lede stays: it is not duplicated. */
defineProps({
  teaser: { type: Boolean, default: false },
  hideHeading: { type: Boolean, default: false }
})

import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { sectors } from '../data/content.js'
</script>

<template>
  <section id="sectors" class="section band--white sl">
    <div class="container">
      <!-- §11.9: the intro is not centred and the two halves are not balanced. -->
      <div class="sl__head" :class="{ 'sl__head--teaser': teaser }">
        <Reveal v-if="!hideHeading" variant="fade">
          <SectionHeading :eyebrow="sectors.eyebrow" :lines="sectors.title" />
        </Reveal>

        <Reveal v-if="!teaser" class="sl__lede" variant="fade" :delay="100">
          {{ sectors.lede }}
        </Reveal>

        <Reveal v-else class="sl__more" variant="fade" :delay="100">
          <RouterLink class="sl__link" to="/sectors">
            <span>All sectors</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </RouterLink>
        </Reveal>
      </div>

      <!-- ---------------- teaser: names only, §7.1 ruled cell grid ---------------- -->
      <ul v-if="teaser" class="sl__cells">
        <Reveal
          v-for="(s, i) in sectors.items"
          :key="s.n"
          as="li"
          class="sl__cell"
          :delay="(i % 4) * 100"
        >
          <span class="sl__cell-n" aria-hidden="true">{{ s.n }}</span>
          <span class="sl__cell-name">{{ s.name }}</span>
        </Reveal>
        <!--
          Seven names in a four-up grid leave a three-cell final row. An eighth empty
          ruled cell closes the row rather than stretching the seventh across the gap
          — the same device as the client strip. It is dropped at one column, where
          there is no row left to close.
        -->
        <li class="sl__cell sl__cell--empty" aria-hidden="true" />
      </ul>

      <!-- ---------------- full: each sector with its evidence ---------------- -->
      <ul v-else class="sl__register">
        <Reveal
          v-for="(s, i) in sectors.items"
          :key="s.n"
          as="li"
          class="sec"
          :delay="(i % 2) * 100"
        >
          <div class="sec__head">
            <span class="sec__n" aria-hidden="true">{{ s.n }}</span>
            <component :is="hideHeading ? 'h2' : 'h3'" :id="`sector-${s.n}`" class="sec__name">{{ s.name }}</component>
          </div>

          <!-- labelled by the sector name, so the list needs no invented heading -->
          <ul class="sec__ev" :aria-labelledby="`sector-${s.n}`">
            <li v-for="e in s.evidence" :key="e" class="sec__ev-item">{{ e }}</li>
          </ul>
        </Reveal>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------- head */

.sl__head {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
  margin-bottom: var(--space-medium);
}
.sl__head--teaser { grid-template-columns: 1.6fr 1fr; }

.sl__lede {
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

.sl__more { justify-self: end; }

.sl__link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--c-link);
}
.sl__link svg {
  width: 17px;
  height: 17px;
  transition: transform var(--dur) var(--ease);
}
.sl__link:hover { color: var(--c-hover); }
.sl__link:hover svg { transform: translateX(5px); }

/* ------------------------------------------------- teaser: cell grid */

.sl__cells {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--c-bd);
}

.sl__cell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 26px 30px 28px 0;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: var(--c-bd);
  transition: background-color var(--dur) var(--ease);
}
.sl__cell + .sl__cell { padding-left: 30px; }
.sl__cell:nth-child(4n) { border-right-width: 0; padding-right: 0; }
.sl__cell:nth-child(4n + 1) { padding-left: 0; }
.sl__cell:not(.sl__cell--empty):hover { background-color: var(--c-bg); }

.sl__cell-n {
  font-size: 15px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.sl__cell-name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.6px;
  overflow-wrap: break-word;
  color: var(--c-heading);
}

/* --------------------------------------------- full: staggered register */

/*
  Explicit column assignment keeps the DOM in 01…07 order while letting the two
  columns run independently; the even column is dropped one rhythm step so the pair
  never baseline-aligns (§4.3, §11.9).
*/
.sl__register {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-small) 80px;
}
.sec:nth-child(odd) { grid-column: 1; }
.sec:nth-child(even) { grid-column: 2; margin-top: var(--space-medium); }

.sec {
  align-self: start;
  min-width: 0;
  padding-top: 22px;
  border-top: 1px solid var(--c-bd);
}

.sec__head {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

/*
  The theme's sanctioned index numeral (§4.1) — 700, tabular, set in ink rather than
  ghosted: the theme's own `.sc_services_item_number` takes the dark alter colour, and
  --c-bd would put 41px of type on the page at 1.6:1. --c-text-light measures 5.36:1
  on white, so it stays quieter than the navy heading without dropping below AA.
*/
.sec__n {
  flex-shrink: 0;
  font-size: 2.1em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1.2px;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.sec__name {
  margin: 0;
  overflow-wrap: break-word;
}

/* The evidence. Body size, one ruled line each, with a short rule as the marker —
   the only red on the block and the only decoration it gets. It is set at the 2px
   the theme gives its accent marks (menu underline, outline-button border, the
   About objective's rule) rather than at the 1px of a structural hairline: a 1px
   red line lands on a half device pixel at DPR 1 and greys out. */
.sec__ev { margin-top: 24px; }

.sec__ev-item {
  position: relative;
  padding: 13px 0 13px 34px;
  border-top: 1px solid var(--c-bg-alt-h);
  font-size: 1rem;
  line-height: 1.5em;
  color: var(--c-text);
  overflow-wrap: break-word;
}
.sec__ev-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(12px + .75em);
  width: 16px;
  height: 2px;
  background-color: var(--c-brand-red);
}

/* ---------------------------------------------------------- responsive */

@media (max-width: 1279px) {
  .sl__register { gap: var(--space-small) 50px; }
  .sec__n { font-size: 1.95em; }
}

@media (max-width: 1023px) {
  .sl__head, .sl__head--teaser { grid-template-columns: 1fr; align-items: start; }
  .sl__lede { padding-top: 0; border-top: 0; }
  .sl__more { justify-self: start; }

  .sl__cells { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sl__cell:nth-child(4n) { border-right-width: 1px; padding-right: 30px; }
  .sl__cell:nth-child(4n + 1) { padding-left: 30px; }
  .sl__cell:nth-child(2n) { border-right-width: 0; padding-right: 0; }
  .sl__cell:nth-child(2n + 1) { padding-left: 0; }

  /* one column: the stagger has nothing left to stagger against */
  .sl__register { grid-template-columns: minmax(0, 1fr); gap: var(--space-medium); }
  .sec:nth-child(odd), .sec:nth-child(even) { grid-column: 1; margin-top: 0; }
}

@media (max-width: 639px) {
  .sl__cells { grid-template-columns: minmax(0, 1fr); }
  .sl__cell,
  .sl__cell + .sl__cell,
  .sl__cell:nth-child(4n),
  .sl__cell:nth-child(4n + 1),
  .sl__cell:nth-child(2n),
  .sl__cell:nth-child(2n + 1) {
    border-right-width: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .sl__cell--empty { display: none; }

  .sec__head { gap: 14px; }
  .sec__n { font-size: 1.9em; letter-spacing: 0; }
  .sec__name { letter-spacing: 0; }
  .sec__ev-item { padding-left: 26px; }
  .sec__ev-item::before { width: 12px; }
}
</style>
