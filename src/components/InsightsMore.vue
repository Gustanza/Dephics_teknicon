<script setup>
import Reveal from './ui/Reveal.vue'
import Tbc from './ui/Tbc.vue'
import { insights, shown } from '../data/content.js'
import { filled } from '../data/tbc.js'

/*
  The IA's three Insights sub-sections that come after the curated links (ROADMAP P6):
  Publications / Downloads, News & Updates, Careers.

  Downloads ships with real content (the company profile). News and careers are TBC in
  content.js; while placeholders are shown each renders a "To be confirmed" panel, and
  with them switched off an unfilled block disappears entirely — the IA is explicit
  that Insights "should not be added as an empty" section.

  Same split-row structure as InsightsLinks directly above it: a narrow left heading
  column, the items in the wide right one, each group opening on a 1px rule.
*/
const DOWNLOAD = 'M12 4v10.5M7.5 10.5 12 15l4.5-4.5M4 19.5h16'
const OUTBOUND = 'M10 6H6.5A1.5 1.5 0 0 0 5 7.5v10A1.5 1.5 0 0 0 6.5 19h10a1.5 1.5 0 0 0 1.5-1.5V14M13.5 4.5H19.5V10.5M19 5l-8 8'

const isExternal = (href) => /^https?:\/\//.test(href || '')
const careersFilled = filled(insights.careers.items)
const careersEmpty = Array.isArray(insights.careers.items) && insights.careers.items.length === 0
</script>

<template>
  <section class="section band--white im">
    <div class="container">
      <!-- ------------------------------------------ publications & downloads -->
      <Reveal variant="fade" class="im__group">
        <h2 class="eyebrow im__h">{{ insights.downloads.heading }}</h2>
        <ul class="im__list">
          <li v-for="d in insights.downloads.items" :key="d.href" class="im__item">
            <a class="im__link" :href="d.href" download>
              <span class="im__name">{{ d.title }}</span>
              <svg class="im__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="DOWNLOAD" /></svg>
            </a>
            <p class="im__note">{{ d.note }}</p>
            <p class="im__meta">{{ d.meta }}</p>
          </li>
          <li v-if="shown(insights.downloads.more)" class="im__item">
            <Tbc :value="insights.downloads.more" block />
          </li>
        </ul>
      </Reveal>

      <!-- ------------------------------------------------------ news -->
      <Reveal v-if="shown(insights.news.items)" variant="fade" class="im__group">
        <h2 class="eyebrow im__h">{{ insights.news.heading }}</h2>
        <Tbc :value="insights.news.items" block v-slot="{ value }">
          <ul class="im__list">
            <li v-for="n in value" :key="n.title" class="im__item">
              <p class="im__meta">{{ n.date }}</p>
              <component
                :is="n.href ? 'a' : 'p'"
                class="im__link"
                :href="n.href || undefined"
                :target="isExternal(n.href) ? '_blank' : undefined"
                :rel="isExternal(n.href) ? 'noopener noreferrer' : undefined"
              >
                <span class="im__name">{{ n.title }}</span>
                <svg v-if="isExternal(n.href)" class="im__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="OUTBOUND" /></svg>
              </component>
              <p class="im__note">{{ n.summary }}</p>
            </li>
          </ul>
        </Tbc>
      </Reveal>

      <!-- --------------------------------------------------- careers -->
      <Reveal v-if="shown(insights.careers.items) || careersEmpty" variant="fade" class="im__group">
        <h2 class="eyebrow im__h">{{ insights.careers.heading }}</h2>
        <p v-if="careersEmpty" class="im__note im__note--solo">{{ insights.careers.none }}</p>
        <ul v-else-if="careersFilled" class="im__list">
          <li v-for="job in insights.careers.items" :key="job.title" class="im__item">
            <p class="im__name">{{ job.title }}</p>
            <p class="im__meta">{{ [job.location, job.closing && `Closes ${job.closing}`].filter(Boolean).join(' · ') }}</p>
            <p class="im__note">{{ job.summary }}</p>
            <a v-if="job.apply" class="im__apply" :href="job.apply">How to apply</a>
          </li>
        </ul>
        <Tbc v-else :value="insights.careers.items" block />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* continues InsightsLinks (rendered flush-bottom above it, and this section's top
   padding is dropped by the same-band rule in style.css): one medium step between the
   last link group and the first of these, as between the groups themselves */
.im__group:first-child { margin-top: var(--space-medium); }

/* the same grid, rule and eyebrow-as-heading as .il__group in InsightsLinks.vue, so
   the two components read as one continuous list of groups */
.im__group {
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(0, 1.9fr);
  gap: var(--grid-gap) 60px;
  padding-top: 26px;
  border-top: 1px solid var(--c-bd);
}
.im__group + .im__group { margin-top: var(--space-medium); }

.im__h {
  align-self: start;
  margin: 0;
  font-size: var(--eyebrow-size);
  line-height: 18px;
  letter-spacing: var(--eyebrow-ls);
  color: var(--c-text-dark);
  overflow-wrap: break-word;
}

.im__item {
  padding-bottom: var(--space-tiny);
  margin-bottom: var(--space-tiny);
  border-bottom: 1px solid var(--c-bg-alt-h);
}
.im__item:last-child { margin-bottom: 0; border-bottom: 0; }

.im__link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: var(--c-heading);
  transition: color var(--dur) var(--ease);
}
a.im__link:hover,
a.im__link:focus-visible { color: var(--c-link); }

.im__name {
  margin: 0;
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.5px;
  color: inherit;
}
p.im__name { color: var(--c-heading); }

.im__icon { flex-shrink: 0; width: 18px; height: 18px; }

.im__note {
  margin: 6px 0 0;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}
.im__note--solo { margin: 0; }

.im__meta {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.5em;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.im__apply {
  display: inline-block;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--c-link);
  border-bottom: 1px solid currentColor;
}
.im__apply:hover { color: var(--c-hover); }

@media (max-width: 1279px) {
  .im__group { gap: var(--grid-gap) 50px; }
}
@media (max-width: 1023px) {
  .im__group { grid-template-columns: minmax(0, 1fr); gap: 20px; }
}
@media (max-width: 767px) {
  .im__name { letter-spacing: 0; }
}
</style>
