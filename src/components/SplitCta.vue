<script setup>
import Button from './ui/Button.vue'
import { splitCta } from '../data/content.js'
</script>

<template>
  <section class="cta" aria-label="Contact and clients">
    <div v-for="panel in splitCta" :key="panel.title" class="cta__panel">
      <img
        class="cta__img"
        :class="{ 'is-cropped': panel.crop }"
        :src="panel.image"
        :alt="panel.alt"
        :style="{ objectPosition: panel.focus }"
        loading="lazy"
        :width="panel.w"
        :height="panel.h"
      />
      <div class="cta__scrim" aria-hidden="true" />
      <div class="cta__body">
        <span class="eyebrow eyebrow--light">{{ panel.eyebrow }}</span>
        <p class="cta__title">{{ panel.title }}</p>
        <Button
          class="cta__btn"
          variant="light"
          size="sm"
          :href="panel.button.href"
          :label="panel.button.label"
          :arrow="false"
        />
        <p v-if="panel.note" class="cta__note">{{ panel.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.cta__panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 635px;
  padding: 30px;
  overflow: hidden;
  background-color: var(--d-bg);
}

.cta__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform .6s var(--ease-soft);
}
.cta__panel:hover .cta__img { transform: scale(1.07); }

/* burnt-in camera date stamp lives in the lower right corner — clip it off */
.cta__img.is-cropped {
  width: 122%;
  height: 122%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.cta__panel:hover .cta__img.is-cropped { transform: scale(1.04); }

.cta__scrim {
  position: absolute;
  inset: 0;
  background: rgba(11, 14, 36, .62);
}

.cta__body {
  position: relative;
  z-index: 1;
  max-width: 620px;
  text-align: center;
}

/*
  The client list is a caption, not a headline (fuse-06: both panels carry a
  single one-line question). It hangs out of the flow so the two panels'
  eyebrow / title / button stacks stay on the same centre line.
*/
.cta__note {
  position: absolute;
  left: 0; right: 0;
  top: 100%;
  margin: 26px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  color: rgba(255, 255, 255, .82);
}

.cta__title {
  margin: 0 0 1.1em;
  font-size: clamp(27px, 6px + 3.13vw, 46px);
  line-height: 1.05em;
  font-weight: 700;
  letter-spacing: -1.8px;
  color: #fff;
  text-wrap: balance;
}
@media (min-width: 1280px) {
  .cta__title { font-size: var(--h1-size); line-height: var(--h1-lh); }
}

@media (max-width: 1279px) {
  .cta__panel { min-height: 400px; }
}

@media (max-width: 767px) {
  .cta { grid-template-columns: 1fr; }
  .cta__panel { min-height: 360px; padding: 60px 20px; }
  .cta__note { margin-top: 18px; }
  .cta__title { letter-spacing: 0; }
}
</style>
