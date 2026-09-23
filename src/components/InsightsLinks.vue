<script setup>
/*
  IA section 6, as amended by client comment C4 — Insights launches as a curated set
  of regulatory and professional links rather than a news feed.

  Everything here leaves the site, so every anchor carries target="_blank" plus
  rel="noopener noreferrer" and a visible outbound glyph. The site ships no icon
  font, so the glyph is an inline 24-box stroke path, drawn the same way as the
  contact glyphs in SiteFooter.vue.

  Structure is the theme's split row (§11.9, §12.5): the group heading sits in a
  narrow left column as a 14px eyebrow, the links run down a wider right column, and
  each group opens with a full-width 1px rule. No panels, no shadows — surfaces are
  separated by a hairline and a tonal step (§11.2).
*/
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { insights } from '../data/content.js'

/* `hideHeading` is set by the page that already opens with a PageHero. The PageHero
   carries the page's <h1>, so repeating the same eyebrow and title immediately below it
   reads as a mistake — which is exactly what happened on /sectors, where both said
   "SECTORS / Who we build for". The lede stays: it is not duplicated. */
defineProps({ hideHeading: { type: Boolean, default: false } })

/* 24x24 stroke glyph: the arrow leaving its frame. */
const OUTBOUND = 'M10 6H6.5A1.5 1.5 0 0 0 5 7.5v10A1.5 1.5 0 0 0 6.5 19h10a1.5 1.5 0 0 0 1.5-1.5V14M13.5 4.5H19.5V10.5M19 5l-8 8'
</script>

<template>
  <section id="insights" class="section band--white il">
    <div class="container">
      <div class="il__head">
        <Reveal v-if="!hideHeading" variant="fade">
          <SectionHeading :eyebrow="insights.eyebrow" :lines="insights.title" />
        </Reveal>
        <Reveal class="il__lede" variant="fade" :delay="100">
          {{ insights.lede }}
        </Reveal>
      </div>

      <Reveal
        v-for="(group, gi) in insights.groups"
        :key="group.heading"
        class="il__group"
        variant="fade"
        :delay="gi * 100"
      >
        <component :is="hideHeading ? 'h2' : 'h3'" class="eyebrow il__gh">{{ group.heading }}</component>

        <ul class="il__links">
          <li v-for="link in group.links" :key="link.href">
            <!--
              `unverified: true` appears on some links in src/data/content.js. It is an
              internal build note — the URL could not be reached from the build
              environment when the list was last checked and a human needs to confirm
              it. It is deliberately never rendered: a visitor has no use for our
              link-checking state, and showing it would read as a warning about the
              organisation rather than about our own tooling.
            -->
            <a
              class="il__link"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="il__name">
                {{ link.name }}
                <svg
                  class="il__out"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                ><path :d="OUTBOUND" /></svg>
                <span class="visually-hidden">(opens in a new tab)</span>
              </span>
              <span class="il__note">{{ link.note }}</span>
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal class="il__closing" variant="fade">
        {{ insights.note }}
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------- head */

.il__head {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
  margin-bottom: var(--space-medium);
}

.il__lede {
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

/* -------------------------------------------------------------- groups */

.il__group {
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(0, 1.9fr);
  gap: var(--grid-gap) 60px;
  padding-top: 26px;
  border-top: 1px solid var(--c-bd);
}
.il__group + .il__group { margin-top: var(--space-medium); }

/* the §2 eyebrow, doing duty as the group heading */
.il__gh {
  align-self: start;
  margin: 0;
  font-size: var(--eyebrow-size);
  line-height: 18px;
  letter-spacing: var(--eyebrow-ls);
  color: var(--c-text-dark);
  overflow-wrap: break-word;
}

.il__links { min-width: 0; }
.il__links li + li { border-top: 1px solid var(--c-bg-alt-h); }

/* The hover happens inside the frame — a colour change and the glyph stepping out
   along its own diagonal. The row itself never moves (§11.10). */
.il__link {
  display: block;
  padding: 4px 0 20px;
  color: inherit;
}
.il__links li + li .il__link { padding-top: 20px; }

.il__name {
  display: block;
  font-size: 19px;
  line-height: 1.32em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-heading);
  overflow-wrap: break-word;
  transition: color var(--dur) var(--ease);
}

.il__out {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 2px;
  vertical-align: -1px;
  color: var(--c-link);
  transition: transform var(--dur) var(--ease);
}

.il__link:hover .il__name,
.il__link:focus-visible .il__name { color: var(--c-link); }
.il__link:hover .il__out,
.il__link:focus-visible .il__out { transform: translate(3px, -3px); }

.il__note {
  display: block;
  max-width: 68ch;
  margin-top: 7px;
  font-size: 15px;
  line-height: 1.6em;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--c-text-light);
}

/* ------------------------------------------------------------- closing */

.il__closing {
  max-width: 62ch;
  margin-top: var(--space-medium);
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

/* ---------------------------------------------------------- responsive */

@media (max-width: 1279px) {
  .il__group { gap: var(--grid-gap) 50px; }
}

@media (max-width: 1023px) {
  .il__head { grid-template-columns: 1fr; align-items: start; }
  .il__lede { padding-top: 0; border-top: 0; }

  .il__group { grid-template-columns: minmax(0, 1fr); gap: 20px; }
}

@media (max-width: 767px) {
  .il__name { letter-spacing: 0; }
}
</style>
