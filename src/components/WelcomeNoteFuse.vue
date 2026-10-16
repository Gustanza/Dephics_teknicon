<script setup>
import { computed } from 'vue'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import { welcomeNote as w } from '../data/content.js'

/*
  Welcome note, v4 (client experiment, 2026-10-16). Built from two blocks of Fuse's own
  ABOUT page (docs/ref/fuse/about-00…02, measured at 1440 — THEME_DNA was measured from
  the homepage and does not cover them):

  1. The "1995 / START IN" intro, on white. On the demo a two-photo collage — A 440×590
     top-left, B 410×450 overlapping lower-right. DEPARTURE (client, 2026-10-16): replaced
     by ONE photo seen through three staggered horizontal windows (a "sliced image", from
     the Genesis theme the client pointed at — not a Fuse pattern). Kept Fuse-legal:
     square corners, no shadow, 34px-ish gaps, Fuse's 60px enter motion. With the
     founding year at
     ~145px in the accent, straddling A's top edge, right-aligned to the collage, and a
     small uppercase accent label under it. Text column ~140px to the right, centred on
     the collage: plain eyebrow, h2, description, then the blue (here navy) button.
     All geometry is in % of one 630×860 box so it scales as one piece;
     the year is sized in container units (145 / 630 = 23cqw) for the same reason.

  2. The "WHAT WE DO" band, on dark. Centred eyebrow, a ~57px statement whose closing
     word is set in the accent and underlined ("…expertise and talent."), then the
     speaker's name and role directly beneath — no avatar, no quote glyph.
*/
const lead = computed(() => w.closing.slice(0, w.closing.length - w.closingAccent.length))

/* Each slice is a window; the photo inside is sized to the WHOLE box and shifted back by
   the window's own offset, so all three show one continuous picture. */
const slices = w.sliced.slices.map((sl, i) => ({
  box: { left: `${sl.left}%`, top: `${sl.top}%`, width: `${sl.width}%`, height: `${sl.height}%` },
  img: {
    width: `${(100 / sl.width) * 100}%`,
    height: `${(100 / sl.height) * 100}%`,
    left: `${(-sl.left / sl.width) * 100}%`,
    top: `${(-sl.top / sl.height) * 100}%`,
    objectPosition: w.sliced.pos
  },
  variant: i % 2 ? 'left' : 'right',
  delay: i * 150
}))
</script>

<template>
  <!-- 1. intro -->
  <section class="section band--white wf">
    <div class="container wf__grid">
      <div class="wf__collage">
        <Reveal
          v-for="(sl, i) in slices"
          :key="i"
          class="wf__slice"
          :style="sl.box"
          :variant="sl.variant"
          :delay="sl.delay"
        >
          <img
            class="wf__slice-img"
            :src="w.sliced.src"
            :width="w.sliced.w"
            :height="w.sliced.h"
            :alt="i === 0 ? w.sliced.alt : ''"
            :aria-hidden="i === 0 ? null : 'true'"
            :style="sl.img"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <p class="wf__year">
          <span class="wf__year-n">{{ w.year }}</span>
          <span class="wf__year-label">{{ w.yearLabel }}</span>
        </p>
      </div>

      <Reveal class="wf__text" variant="fade" :delay="100">
        <SectionHeading :eyebrow="w.eyebrow" :lines="w.title" />
        <div class="wf__descr">
          <p class="wf__lede">{{ w.lede }}</p>
          <p>{{ w.vision.before }}<strong class="wf__vision">{{ w.vision.quote }}</strong>{{ w.vision.after }}</p>
          <p v-for="(para, i) in w.body" :key="i">{{ para }}</p>
        </div>
        <Button class="wf__cta" :to="w.cta.to" :label="w.cta.label" variant="navy" />
      </Reveal>
    </div>
  </section>

  <!-- 2. the signed statement -->
  <section class="section band--dark ws">
    <div class="container">
      <Reveal class="ws__inner" variant="fade">
        <span class="eyebrow ws__eyebrow">{{ w.statementEyebrow }}</span>
        <p class="ws__statement">
          {{ lead }}<span class="ws__accent">{{ w.closingAccent }}</span>
        </p>
        <p class="ws__author">
          <span class="ws__name">{{ w.author.name }}</span>
          <span class="ws__role">{{ w.author.role }}</span>
        </p>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
/* ================= 1. intro ================= */
.wf__grid {
  display: grid;
  grid-template-columns: minmax(0, 630fr) minmax(0, 547fr);   /* measured 630 | 518–547 */
  column-gap: var(--space-large);                              /* ~113–142 on the demo */
  align-items: center;
}

/* one 630×860 box, everything inside in % */
.wf__collage {
  position: relative;
  aspect-ratio: 630 / 860;
  container-type: inline-size;
}
.wf__slice {
  position: absolute;
  overflow: hidden;                /* the window; radius stays 0 (Fuse) */
}
.wf__slice-img {
  position: absolute;
  max-width: none;
  object-fit: cover;
}

.wf__year {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;                      /* in front of photo A, as on the demo */
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--c-link);
}
.wf__year-n {
  font-size: 23cqw;                /* 145px at the 630px collage */
  line-height: .8;
  font-weight: var(--h-weight);
  letter-spacing: -0.02em;
}
.wf__year-label {                  /* "START IN": eyebrow metrics, accent colour */
  margin-top: .9em;
  font-size: var(--eyebrow-size);
  line-height: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--eyebrow-ls);
}

.wf :deep(.sh__title) { margin-bottom: 0; }
.wf__descr { margin-top: 1.35em; }           /* h2 + .sc_item_descr */
.wf__descr p {
  margin: 0 0 1.2em;
  color: var(--c-text);
  line-height: var(--body-lh);
}
.wf__descr p:last-child { margin-bottom: 0; }
.wf__descr .wf__lede { color: var(--c-text-dark); }
.wf__vision { font-weight: var(--h-weight); color: var(--c-heading); }
.wf__cta { margin-top: 2.1em; }              /* descr + button */

/* on a narrow collage (phones) the 14px label would run into slice 1, which ends at
   70% — step it down with the collage, not the viewport */
@container (max-width: 520px) {
  .wf__year-label { font-size: 11px; letter-spacing: 1.2px; }
}

/* ================= 2. statement band ================= */
.ws__inner {
  max-width: 1000px;               /* the demo's statement runs ~980px wide */
  margin-inline: auto;
  text-align: center;
}
.ws__eyebrow { display: block; }
.ws__statement {
  margin: 0;
  font-size: var(--h1-size);       /* 57px */
  line-height: var(--h1-lh);
  letter-spacing: var(--h1-ls);
  font-weight: var(--h-weight);
  color: var(--d-text-dark);
  text-wrap: balance;
}
/* The demo's accent word on dark. Brand red, not --c-link: at 57px / 700 this is large
   text (3:1 needed) and #E93825 clears it on --d-bg where #CF3221 is marginal. */
.ws__accent {
  color: var(--c-brand-red);
  text-decoration: underline;
  text-decoration-thickness: .055em;
  text-underline-offset: .12em;
}
.ws__author {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--space-medium) 0 0;
}
.ws__name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: var(--h-weight);
  color: var(--d-text-dark);
}
.ws__role {
  margin-top: 4px;
  font-size: 15px;
  line-height: 1.333em;
  color: var(--d-text);
}

/* ================= responsive (THEME_DNA §1 steps) ================= */
@media (max-width: 1279px) {
  .wf__grid { column-gap: var(--space-medium); }
  .ws__statement { font-size: 46px; }
}
@media (max-width: 1023px) {
  .wf__grid { grid-template-columns: 1fr; row-gap: var(--space-medium); }
  .wf__collage { width: 100%; max-width: 630px; }
  .ws__statement { font-size: 38px; line-height: 42px; }
}
@media (max-width: 767px) {
  .ws__statement { font-size: 30px; line-height: 35px; letter-spacing: 0; }
}
@media (max-width: 479px) {
  .ws__statement { font-size: 27px; line-height: 31px; }
}
</style>
