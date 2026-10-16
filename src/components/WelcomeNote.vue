<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import { welcomeNote as w } from '../data/content.js'

/*
  Home, in the slot the hidden "Who we are" intro left (client experiment, 2026-10-16;
  v2 the same day — v1's sticky heading left ~900px of empty column beside the letter).

  Fuse vocabulary only:
  1. The split — photograph against text, asymmetric (THEME_DNA §11.9). The photo column
     stretches to the letter's full height, so neither side runs empty. Square, no shadow.
  2. A flat dark-navy block on the photo carrying the vision — Fuse's dark scheme
     (`--d-*` tokens) as a solid fill, eyebrow + h5. Its 0 radius and flat fill are the
     point; it is not a floating card (no shadow, no lift).
  3. Letter: lede at h5 size / 400 in ink, a 1px hairline, then the body in two columns
     from 1280px so the measure stays short and the column fills.
  4. Finale — the testimonial "qw-big" treatment (THEME_DNA §4.4): one sentence at h1
     typography, centred, 15% side padding, no quote glyph, introduced by the catalogued
     34×1px rule. The author is already signed under the letter, so the finale ends on
     the button instead (title → button, 2.1em) rather than repeating the name.
*/
</script>

<template>
  <section class="section band--white wn">
    <div class="container">
      <div class="wn__split">
        <Reveal class="wn__media" variant="fade">
          <img
            class="wn__img"
            :src="w.media.src"
            :width="w.media.w"
            :height="w.media.h"
            :alt="w.media.alt"
            loading="lazy"
            decoding="async"
          />
          <div class="wn__panel">
            <span class="eyebrow wn__panel-label">{{ w.visionLabel }}</span>
            <p class="wn__panel-quote">{{ w.visionLine }}</p>
          </div>
        </Reveal>

        <Reveal class="wn__letter" variant="fade" :delay="100">
          <SectionHeading :eyebrow="w.eyebrow" :lines="w.title" dash />
          <p class="wn__lede">{{ w.lede }}</p>
          <div class="wn__body">
            <p class="wn__p">{{ w.vision.before }}{{ w.vision.quote }}{{ w.vision.after }}</p>
            <p v-for="(para, i) in w.body" :key="i" class="wn__p">{{ para }}</p>
          </div>
          <div class="wn__sign">
            <div class="wn__who">
              <span class="wn__name">{{ w.author.name }}</span>
              <span class="wn__role">{{ w.author.role }}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal class="wn__finale" variant="fade">
        <figure class="wn__figure">
          <span class="wn__rule" aria-hidden="true"></span>
          <blockquote class="wn__statement">{{ w.closing }}</blockquote>
        </figure>
        <Button class="wn__cta" :to="w.cta.to" :label="w.cta.label" variant="navy" />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* ---- 1. the split */
.wn__split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--grid-gap) 80px;
  align-items: stretch;
}

/* photo fills the column top to bottom; the panel sits on its lower edge */
.wn__media {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  background: var(--c-bg);
}
.wn__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 39% 50%;   /* both engineers in frame; the date stamp (bottom right) out */
}
.wn__panel {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 82%;
  padding: var(--space-small) var(--space-small) calc(var(--space-small) + 4px);
  background: var(--d-bg);
}
.wn__panel-label {
  display: block;
  margin-bottom: 1.4em;
  color: var(--d-text-dark);
}
.wn__panel-quote {
  margin: 0;
  font-size: var(--h5-size);   /* 24px */
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
  font-weight: var(--h-weight);
  color: var(--d-text-dark);
}

/* ---- the letter */
.wn :deep(.sh__title) { margin-top: 0; margin-bottom: 0; }
.wn__lede {
  margin: var(--space-small) 0 0;
  font-size: var(--h5-size);   /* 24px at 400 — the letter's opening, in ink */
  line-height: 1.45em;
  letter-spacing: -.4px;
  color: var(--c-text-dark);
}
.wn__body {
  margin-top: var(--space-small);
  padding-top: var(--space-small);
  border-top: var(--hairline) solid var(--c-bd);
}
.wn__p {
  margin: 0 0 1.57em;          /* Fuse p margin-bottom */
  color: var(--c-text);
  line-height: var(--body-lh);
  break-inside: avoid;
}
.wn__p:last-child { margin-bottom: 0; }

.wn__sign {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-tiny) var(--grid-gap);
  margin-top: var(--space-small);
  padding-top: var(--space-small);
  border-top: var(--hairline) solid var(--c-bd);
}
.wn__who { display: flex; flex-direction: column; }
.wn__name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: var(--h-weight);
  color: var(--c-text-dark);
}
.wn__role {
  margin-top: 4px;
  font-size: 15px;
  line-height: 1.333em;
  color: var(--c-text);
}

/* ---- 2. the finale: qw-big */
.wn__finale {
  margin-top: var(--space-large);
  padding: 0 15%;
  text-align: center;
}
.wn__figure { margin: 0; }
.wn__rule {                    /* THEME_DNA §7.4: 34×1px, centred, text-dark */
  display: block;
  width: 34px;
  height: var(--hairline);
  margin: 0 auto var(--space-medium);
  background: var(--c-text-dark);
}
.wn__statement {
  margin: 0;
  font-size: var(--h1-size);   /* 57px */
  line-height: var(--h1-lh);
  letter-spacing: var(--h1-ls);
  font-weight: var(--h-weight);
  color: var(--c-heading);
  text-wrap: balance;
}
.wn__cta { margin-top: 2.1em; }   /* Fuse .sc_item_title + .sc_item_button */

/* two body columns wherever each keeps a comfortable measure (≈ 320–470px) */
@media (min-width: 768px) {
  .wn__body { columns: 2; column-gap: var(--grid-gap); }
}

/* Below 1280 the split stacks: a tall crop of a 1070px photo in a ~400px column lost
   the second engineer and was upscaled ~1.5×. Wide photo on top, letter full width. */
@media (max-width: 1279px) {
  .wn__split { grid-template-columns: 1fr; gap: var(--space-medium); }
  /* stacked: the panel sits under the photo, not on it — on a wide crop it covered the
     engineers. The 16:9 crop is anchored to the top: the camera date stamp sits in the
     bottom ~8% of the photo and a top-anchored 16:9 crop leaves it out at every width */
  .wn__media { min-height: 0; overflow: visible; background: none; }
  .wn__img { position: static; height: auto; aspect-ratio: 16 / 9; object-position: 50% 0; }
  .wn__panel { position: static; width: auto; }
  .wn__lede { max-width: 36em; }
  .wn__statement { font-size: 46px; }
}
@media (max-width: 1023px) {
  .wn__lede { font-size: 20px; letter-spacing: 0; }
  .wn__finale { padding: 0; }
  .wn__statement { font-size: 38px; line-height: 42px; }
}
@media (max-width: 767px) {
  .wn__panel { padding: var(--space-small) 20px; }
  .wn__panel-quote { font-size: 21px; letter-spacing: 0; }
  .wn__lede { font-size: 19px; }
  .wn__statement { font-size: 30px; line-height: 35px; letter-spacing: 0; }
}
@media (max-width: 479px) {
  .wn__statement { font-size: 27px; line-height: 31px; }
}
</style>
