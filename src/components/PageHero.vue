<script setup>
import Reveal from './ui/Reveal.vue'

/**
 * The masthead every inner page opens with — the theme's inner-page hero
 * (THEME_DNA section 5, "Inner-page hero"). Shorter than the homepage slider:
 * a photograph under a scrim, eyebrow, heading and one line of lede.
 *
 * Deliberately NOT the homepage Hero component — that one is a full-viewport
 * carousel with a slide counter, which would be wrong on a content page.
 */
defineProps({
  eyebrow: { type: String, required: true },
  lines: { type: Array, required: true },
  lede: { type: String, default: '' },
  image: { type: String, required: true },
  /* intrinsic size, so the browser can reserve the box before the file arrives */
  w: { type: Number, required: true },
  h: { type: Number, required: true },
  focus: { type: String, default: '50% 50%' }
})
</script>

<template>
  <section class="ph">
    <img
      class="ph__img"
      :src="image"
      :width="w"
      :height="h"
      :style="{ objectPosition: focus }"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
    />
    <div class="ph__scrim" aria-hidden="true" />
    <div class="container ph__inner">
      <Reveal variant="fade">
        <span class="eyebrow eyebrow--light">{{ eyebrow }}</span>
        <h1 class="ph__title">
          <span v-for="line in lines" :key="line" class="ph__line">{{ line }}</span>
        </h1>
        <p v-if="lede" class="ph__lede">{{ lede }}</p>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.ph {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 460px;
  padding-block: var(--space-large) var(--space-medium);
  overflow: hidden;
  background-color: var(--d-bg);
}

.ph__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--rad);
}

/*
  Same reasoning as the homepage hero: Fuse ships no scrim because its stock
  photography is dark and art-directed. Teknicon's is bright daylight site work,
  so white type needs a left-weighted gradient plus an overall darken to hold.
*/
.ph__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(11, 14, 36, .88) 0%, rgba(11, 14, 36, .62) 45%, rgba(11, 14, 36, .30) 100%),
    linear-gradient(0deg, rgba(11, 14, 36, .55) 0%, rgba(11, 14, 36, 0) 60%);
}

.ph__inner { position: relative; z-index: 1; }

.ph__title {
  margin: 0;
  color: #fcfcfc;
  font-size: clamp(30px, 10px + 2.9vw, 52px);
  line-height: 1.04em;
  letter-spacing: -1.4px;
}
.ph__line { display: block; }

.ph__lede {
  margin: 1.2em 0 0;
  max-width: 58ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: rgba(255, 255, 255, .88);
}

@media (max-width: 767px) {
  .ph { min-height: 340px; }
  .ph__title { letter-spacing: 0; }
}
</style>
