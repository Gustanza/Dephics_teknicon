<script setup>
import Button from './ui/Button.vue'
import { splitCta } from '../data/content.js'

/* The theme's two half-width photo panels (THEME_DNA §7.6). Pages pass their own
   `panels` where the pair should say something else — Home uses it for the IA's
   contact / enquiry strip. A panel's title may carry `titleHref` (a phone number). */
defineProps({
  panels: { type: Array, default: () => splitCta },
  label: { type: String, default: 'Contact and clients' }
})
</script>

<template>
  <section class="cta" :aria-label="label">
    <div v-for="panel in panels" :key="panel.title" class="cta__panel">
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
        <p class="cta__title">
          <a v-if="panel.titleHref" class="cta__title-link" :href="panel.titleHref">{{ panel.title }}</a>
          <template v-else>{{ panel.title }}</template>
        </p>
        <Button
          class="cta__btn"
          variant="navy"
          size="sm"
          :to="panel.button.to"
          :href="panel.button.href"
          :label="panel.button.label"
          :arrow="false"
        />
        <p v-if="panel.note" class="cta__note">
          <template v-if="Array.isArray(panel.note)">
            <span v-for="line in panel.note" :key="line" class="cta__note-line">{{ line }}</span>
          </template>
          <template v-else>{{ panel.note }}</template>
        </p>
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
  /* full panel width (to the cap), not shrink-to-title: the hanging note is
     positioned against this box, and a short title left it ~230px at 390 */
  width: 100%;
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

/* the phone number as the panel's title: same white, same size — it underlines on
   hover like every other text link rather than changing colour on a photo */
.cta__title-link {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}
.cta__title-link:hover,
.cta__title-link:focus-visible { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .12em; }

.cta__note-line { display: block; }

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
