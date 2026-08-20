<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { projects } from '../data/content.js'
</script>

<template>
  <section id="projects" class="section band--paper">
    <div class="container">
      <!--
        §11.9 — the intro is not centred and the two halves are not balanced:
        the title sits left, the footnote is bottom-anchored to its baseline on
        the right, in a deliberately unequal 1.6fr / 1fr split.
      -->
      <div class="prj__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="projects.eyebrow" :lines="projects.title" />
        </Reveal>
        <Reveal class="prj__footnote" variant="fade" :delay="100">
          {{ projects.footnote }}
        </Reveal>
      </div>

      <ul class="prj__grid">
        <Reveal
          v-for="(item, i) in projects.items"
          :key="item.title"
          as="li"
          class="prj"
          :delay="(i % 3) * 100"
        >
          <!-- the letterboxed sources get a 16/9 frame instead of a 4:3 crop -->
          <div class="prj__thumb" :class="{ 'prj__thumb--wide': item.wide }">
            <img
              :class="{ 'is-cropped': item.crop }"
              :src="item.image"
              :alt="item.alt"
              loading="lazy"
              :width="item.w"
              :height="item.h"
            />
          </div>
          <div class="prj__info">
            <span class="prj__cat">{{ item.category }}</span>
            <h3 class="prj__title">{{ item.title }}</h3>
            <p class="prj__client">{{ item.client }}</p>
          </div>
        </Reveal>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.prj__head {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
}

.prj__footnote {
  margin: 0 0 .35em;
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 19px;
  line-height: 1.45em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-text-dark);
}

.prj__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
  margin-top: var(--space-medium);
}

.prj { background-color: var(--c-bg-alt); }

.prj__thumb {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--c-bg-alt-h);
}
.prj__thumb--wide { aspect-ratio: 16 / 9; }

.prj__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
  will-change: transform;
}
.prj:hover .prj__thumb img { transform: scale(1.07); }

/* Several source photographs carry an orange camera date stamp burnt into the
   lower right corner. Over-size the image box and anchor it top-left so the
   overflow — and the stamp with it — is clipped away. */
.prj__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.prj:hover .prj__thumb img.is-cropped { transform: scale(1.05); }

.prj__info { padding: 27px 30px 32px; }

/* §11.4 — the same semantic slot as .svc__tag, so the same spec: 17px / 400,
   sentence case. Tracked caps stay with the eyebrow. */
.prj__cat {
  display: block;
  font-size: 17px;
  line-height: 1.5em;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--c-text);
}

.prj__title {
  margin: .15em 0 0;
  font-size: clamp(19px, 17.5px + .2vw, 20px);
  line-height: 1.2em;
  letter-spacing: -.5px;
  transition: color var(--dur) var(--ease);
}
@media (min-width: 1280px) {
  .prj__title { font-size: var(--h5-size); line-height: 1.2em; }
}

.prj__client {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

@media (max-width: 1023px) {
  .prj__head { grid-template-columns: 1fr; }
  .prj__footnote { margin-bottom: 0; }
  .prj__grid { grid-template-columns: repeat(2, 1fr); }
  .prj__info { padding: 22px 24px 26px; }
}

@media (max-width: 639px) {
  .prj__grid { grid-template-columns: 1fr; }
  .prj__footnote { font-size: 17px; letter-spacing: 0; }
}
</style>
