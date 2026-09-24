<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { projectList, projects } from '../data/content.js'
import { categoryBySlug, projectLine, projectPath } from '../data/lookup.js'
import { filled } from '../data/tbc.js'

/*
  The IA's "Featured Project Case Studies" — every project in content.js that carries a
  `caseStudy` block. The first is set large and the other two stack beside it: the
  theme's unequal pairing (§11.9), not three identical tiles.
*/
const cases = projectList.filter((p) => p.caseStudy)
</script>

<template>
  <section class="section band--paper cs">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="projects.caseStudies.eyebrow" :lines="projects.caseStudies.title" />
      </Reveal>

      <ul class="cs__grid">
        <Reveal
          v-for="(p, i) in cases"
          :key="p.slug"
          as="li"
          class="cs__item"
          :class="{ 'cs__item--lead': i === 0 }"
          :delay="i * 100"
        >
          <div class="cs__thumb">
            <img
              :class="{ 'is-cropped': p.image.crop }"
              :src="p.image.src"
              :alt="p.image.alt"
              loading="lazy"
              :width="p.image.w"
              :height="p.image.h"
            />
          </div>
          <div class="cs__info">
            <span class="cs__cat">Case study · {{ categoryBySlug[p.category].name }}</span>
            <h3 class="cs__title">
              <RouterLink class="cs__link" :to="projectPath(p.slug)">{{ p.title }}</RouterLink>
            </h3>
            <p v-if="filled(p.place)" class="cs__place">{{ p.place }}</p>
            <p class="cs__line">{{ projectLine(p) }}</p>
          </div>
        </Reveal>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cs__grid {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  grid-auto-rows: auto;
  gap: var(--grid-gap);
  margin-top: var(--space-medium);
}

.cs__item {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--c-bg-alt);
}
.cs__item--lead { grid-row: span 2; }

.cs__thumb {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-color: var(--c-bg-alt-h);
}
.cs__item--lead .cs__thumb { aspect-ratio: auto; flex: 1; min-height: 360px; }

.cs__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
  will-change: transform;
}
.cs__item:hover .cs__thumb img { transform: scale(1.07); }
.cs__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.cs__item:hover .cs__thumb img.is-cropped { transform: scale(1.05); }

.cs__info { padding: 27px 30px 32px; }

.cs__cat {
  display: block;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text);
}

.cs__title {
  margin: .2em 0 0;
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}
.cs__item--lead .cs__title {
  font-size: var(--h4-size);
  line-height: var(--h4-lh);
  letter-spacing: var(--h4-ls);
}

.cs__link { color: inherit; transition: color var(--dur) var(--ease); }
.cs__link::after { content: ""; position: absolute; inset: 0; }
.cs__item:hover .cs__link,
.cs__link:focus-visible { color: var(--c-link); }

.cs__place {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-text-dark);
}
.cs__line {
  margin: 6px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

@media (max-width: 1023px) {
  .cs__grid { grid-template-columns: 1fr; }
  .cs__item--lead { grid-row: auto; }
  .cs__item--lead .cs__thumb { aspect-ratio: 16 / 9; min-height: 0; }
  .cs__info { padding: 22px 24px 26px; }
}

@media (max-width: 767px) {
  .cs__item--lead .cs__title,
  .cs__title { font-size: 21px; letter-spacing: 0; }
}
</style>
