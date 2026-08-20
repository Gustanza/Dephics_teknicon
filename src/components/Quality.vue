<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { quality } from '../data/content.js'

/* 24x24 stroke glyphs, one per QA step. Kept inline so the page ships no icon font. */
const paths = {
  review: 'M4 3h11l5 5v13H4zM15 3v5h5M8 13h8M8 17h5',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  site: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  monitor: 'M3 21V9M9 21V4M15 21v-8M21 21V6M2 21h20',
  closeout: 'M4 21V4h9l1 2h6v9h-7l-1-2H4M4 13h8'
}
</script>

<template>
  <section id="quality" class="section band--white">
    <div class="container qa">
      <Reveal class="qa__intro" variant="fade">
        <!-- the theme's sc_column_fixed: intro parks while the steps scroll past -->
        <div class="qa__intro-sticky">
          <SectionHeading :eyebrow="quality.eyebrow" :lines="quality.title" dash>
            {{ quality.body }}
          </SectionHeading>
        </div>
      </Reveal>

      <ol class="qa__steps">
        <Reveal
          v-for="(step, i) in quality.steps"
          :key="step.title"
          as="li"
          class="qa__step"
          :delay="i * 100"
        >
          <span class="qa__marker" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path :d="paths[step.icon]" />
            </svg>
          </span>
          <span v-if="i < quality.steps.length - 1" class="qa__timeline" aria-hidden="true" />
          <div class="qa__body">
            <h3 class="qa__title">{{ step.title }}</h3>
            <p class="qa__text">{{ step.body }}</p>
          </div>
        </Reveal>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.qa {
  display: grid;
  grid-template-columns: 1.22fr 1fr;
  gap: var(--grid-gap);
  align-items: stretch;
}

.qa__intro { padding-right: 30px; }

.qa__intro-sticky {
  position: sticky;
  top: 120px;
}

/* left-rail vertical timeline — 56px circular node + 1px connector */
.qa__steps {
  --marker: 56px;
  --indent: 8.2em;
}

.qa__step {
  position: relative;
  padding-left: var(--indent);
}

.qa__marker {
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
  background-color: var(--c-bg);
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.qa__marker svg { width: 22px; height: 22px; }

.qa__step:hover .qa__marker {
  color: #fff;
  background-color: var(--c-link);
}

.qa__timeline {
  position: absolute;
  z-index: 1;
  left: calc(var(--marker) / 2);
  top: calc(var(--marker) + var(--marker) / 2.7);
  bottom: calc(var(--marker) / 2.7);
  width: 1px;
  border-right: 1px solid var(--c-bd);
}

.qa__body { padding: .5em 0 2.3em; }
.qa__step:last-child .qa__body { padding-bottom: 0; }

.qa__title {
  margin: 0;
  font-size: clamp(19px, 18px + .39vw, 23px);
  line-height: 1.214em;
  letter-spacing: -.5px;
}
@media (min-width: 1280px) {
  .qa__title { font-size: var(--h4-size); }
}

.qa__text {
  margin: 1.1em 0 0;
  font-size: 1rem;
  line-height: 1.55em;
  color: var(--c-text);
}

@media (max-width: 1023px) {
  .qa { grid-template-columns: 1fr; gap: var(--space-medium); }
  .qa__intro { padding-right: 0; }
  .qa__intro-sticky { position: static; }
  .qa__steps { --indent: 5.2em; --marker: 48px; }
}

@media (max-width: 767px) {
  .qa__steps { --marker: 46px; --indent: 4.4em; }
  .qa__body { padding-bottom: 1.9em; }
}
</style>
