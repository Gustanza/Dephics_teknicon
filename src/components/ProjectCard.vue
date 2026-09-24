<script setup>
import { categoryBySlug, projectLine, projectPath } from '../data/lookup.js'
import { filled } from '../data/tbc.js'

/**
 * One project, as a card linking to its page. Used by the Home teaser, the service
 * pages and the "related projects" row on a project page.
 *
 * The whole card is the click target (a stretched link on the title) but only the
 * title is the link text, so a screen reader hears "Zimbili Bridge", not the card's
 * entire contents.
 *
 * A project with no photograph of its own renders a typographic panel instead of a
 * borrowed image — using another project's photo is the defect REVIEW-1 caught.
 */
defineProps({
  project: { type: Object, required: true },
  tag: { type: String, default: 'h3' }
})
</script>

<template>
  <article class="pc" :class="{ 'pc--text': !project.image }">
    <!-- every card uses the same 4:3 frame, whatever the source's proportions, so a row
         of cards lines up: equal photos, and the text starting at the same height
         (client request, 2026-09-24 — a 16:9 variant for letterboxed sources made
         rows ragged) -->
    <div v-if="project.image" class="pc__thumb">
      <img
        :class="{ 'is-cropped': project.image.crop }"
        :src="project.image.src"
        :alt="project.image.alt"
        loading="lazy"
        :width="project.image.w"
        :height="project.image.h"
      />
    </div>
    <div class="pc__info">
      <span class="pc__cat">{{ categoryBySlug[project.category].name }}</span>
      <component :is="tag" class="pc__title">
        <RouterLink class="pc__link" :to="projectPath(project.slug)">{{ project.title }}</RouterLink>
      </component>
      <p v-if="filled(project.place)" class="pc__place">{{ project.place }}</p>
      <p class="pc__client">{{ projectLine(project) }}</p>
    </div>
  </article>
</template>

<style scoped>
.pc {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--c-bg-alt);
}

.pc__thumb {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--c-bg-alt-h);
}

.pc__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
  will-change: transform;
}
.pc:hover .pc__thumb img { transform: scale(1.07); }

/* Several source photographs carry an orange camera date stamp burnt into the
   lower right corner. Over-size the image box and anchor it top-left so the
   overflow — and the stamp with it — is clipped away. */
.pc__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.pc:hover .pc__thumb img.is-cropped { transform: scale(1.05); }

.pc__info { padding: 27px 30px 32px; }

/* No photograph: a 2px red rule in its place (the theme's accent-mark weight — a 1px
   red line greys out at DPR 1), so an imageless card still reads as the same object as
   its neighbours rather than as a gap in the grid. */
.pc--text { border-top: 2px solid var(--c-brand-red); }
.pc--text .pc__info { padding-top: 30px; }

/* §11.4 — the same semantic slot as .svc__tag: 17px / 400, sentence case. */
.pc__cat {
  display: block;
  font-size: 15px;
  line-height: 1.5em;
  font-weight: 400;
  color: var(--c-text);
}

.pc__title {
  margin: .2em 0 0;
  font-size: clamp(19px, 17.5px + .2vw, 20px);
  line-height: 1.2em;
  letter-spacing: -.5px;
}
@media (min-width: 1280px) {
  .pc__title { font-size: var(--h5-size); line-height: 1.2em; }
}

.pc__link {
  color: inherit;
  transition: color var(--dur) var(--ease);
}
/* stretched link: the whole card is clickable, the title alone is the link text */
.pc__link::after {
  content: "";
  position: absolute;
  inset: 0;
}
.pc:hover .pc__link,
.pc__link:focus-visible { color: var(--c-link); }

.pc__place {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-text-dark);
}

.pc__client {
  margin: 6px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

@media (max-width: 1023px) {
  .pc__info { padding: 22px 24px 26px; }
}
</style>
