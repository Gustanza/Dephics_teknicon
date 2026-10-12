<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'

/**
 * The theme's split section (THEME_DNA §12 row 5): a sticky intro column on the left
 * (sc_column_fixed) against a left-rail node list on the right (sc_services_qw-nodes,
 * §4.2) — a 56px circular marker per item joined by a 1px connector.
 *
 * Used by Quality (the five QA steps, an ordered sequence) and WhyTeknicon (the IA's
 * four differentiators, which are not a sequence — hence `ordered`).
 */
defineProps({
  id: { type: String, default: '' },
  band: { type: String, default: 'white' }, // white | paper
  eyebrow: { type: String, required: true },
  title: { type: Array, required: true },
  body: { type: String, default: '' },
  steps: { type: Array, required: true }, // [{ icon, title, body }]
  ordered: { type: Boolean, default: true }
})

/* 24x24 stroke glyphs, one per item. Kept inline so the page ships no icon font. */
const paths = {
  review: 'M4 3h11l5 5v13H4zM15 3v5h5M8 13h8M8 17h5',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  site: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  monitor: 'M3 21V9M9 21V4M15 21v-8M21 21V6M2 21h20',
  closeout: 'M4 21V4h9l1 2h6v9h-7l-1-2H4M4 13h8',
  local: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  registered: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z M8.5 12l2.5 2.5 4.5-5',
  since: 'M3 5h18v16H3z M3 10h18 M8 3v4 M16 3v4',
  lifecycle: 'M4 21V9l8-6 8 6v12 M2 21h20 M9 21v-7h6v7'
}
</script>

<template>
  <section :id="id || undefined" class="section ns" :class="`band--${band}`">
    <div class="container ns__grid">
      <Reveal class="ns__intro" variant="fade">
        <!-- the theme's sc_column_fixed: intro parks while the items scroll past -->
        <div class="ns__intro-sticky">
          <SectionHeading :eyebrow="eyebrow" :lines="title" dash>
            <template v-if="body">{{ body }}</template>
          </SectionHeading>
        </div>
      </Reveal>

      <component :is="ordered ? 'ol' : 'ul'" class="ns__steps">
        <Reveal
          v-for="(step, i) in steps"
          :key="step.title"
          as="li"
          class="ns__step"
          :delay="i * 100"
        >
          <span class="ns__marker" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path :d="paths[step.icon]" />
            </svg>
          </span>
          <span v-if="i < steps.length - 1" class="ns__timeline" aria-hidden="true" />
          <div class="ns__body">
            <h3 class="ns__title">{{ step.title }}</h3>
            <p class="ns__text">{{ step.body }}</p>
          </div>
        </Reveal>
      </component>
    </div>
  </section>
</template>

<style scoped>
/* The marker is the band's tonal opposite — paper on white, white on paper — the
   theme's 4-point step between surfaces (THEME_DNA §11.2), never a shadow. */
.ns.band--white { --ns-marker-bg: var(--c-bg); }
.ns.band--paper { --ns-marker-bg: var(--c-bg-alt); }

.ns__grid {
  display: grid;
  grid-template-columns: 1.22fr 1fr;
  gap: var(--grid-gap);
  align-items: stretch;
}

.ns__intro { padding-right: 30px; }

.ns__intro-sticky {
  position: sticky;
  top: 120px;
}

/* left-rail vertical timeline — 56px circular node + 1px connector */
.ns__steps {
  --marker: 56px;
  --indent: 8.2em;
}

.ns__step {
  position: relative;
  padding-left: var(--indent);
}

.ns__marker {
  position: absolute;
  z-index: 2;
  left: 0; top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--marker);
  height: var(--marker);
  border-radius: var(--rad-circle);
  color: var(--c-text-dark);
  background-color: var(--ns-marker-bg);
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.ns__marker svg { width: 22px; height: 22px; }

.ns__step:hover .ns__marker {
  color: #fff;
  background-color: var(--c-brand-red);
}

.ns__timeline {
  position: absolute;
  z-index: 1;
  left: calc(var(--marker) / 2);
  top: calc(var(--marker) + var(--marker) / 2.7);
  bottom: calc(var(--marker) / 2.7);
  width: 1px;
  border-right: 1px solid var(--c-bd);
}

.ns__body { padding: .5em 0 2.3em; }
.ns__step:last-child .ns__body { padding-bottom: 0; }

.ns__title {
  margin: 0;
  font-size: clamp(19px, 18px + .39vw, 23px);
  line-height: 1.214em;
  letter-spacing: -.5px;
}
@media (min-width: 1280px) {
  .ns__title { font-size: var(--h4-size); }
}

.ns__text {
  margin: 1.1em 0 0;
  font-size: 1rem;
  line-height: 1.55em;
  color: var(--c-text);
}

@media (max-width: 1023px) {
  .ns__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  .ns__intro { padding-right: 0; }
  .ns__intro-sticky { position: static; }
  .ns__steps { --indent: 5.2em; --marker: 48px; }
}

@media (max-width: 767px) {
  .ns__steps { --marker: 46px; --indent: 4.4em; }
  .ns__body { padding-bottom: 1.9em; }
}
</style>
