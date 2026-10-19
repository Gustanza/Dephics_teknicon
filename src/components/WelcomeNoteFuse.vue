<script setup>
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
     the Genesis theme the client pointed at — not a Fuse pattern). Rounded corners
     (--rad-slice) as on Genesis, at the client's request; otherwise Fuse-legal: no shadow, 34px-ish gaps, Fuse's 60px enter motion. With the
     founding year at
     ~145px in the accent, straddling A's top edge, right-aligned to the collage, and a
     small uppercase accent label (moved above the year, 2026-10-16). Text column ~140px to the right, centred on
     the collage: plain eyebrow, h2, description, then the blue (here navy) button.
     All geometry is in % of one 630×860 box so it scales as one piece;
     the year is sized in container units (145 / 630 = 23cqw) for the same reason.

  2. REMOVED (client, 2026-10-19): the dark "WHAT WE DO" band that carried the closing
     line as a 57px statement plus the signature. The closing line and signature now end
     the letter text beside the collage, so the note reads once, in the order of the
     client's "Welcoming note2.docx", and stays signed.
*/

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
    <div class="container">
    <!-- head split like the Clients section (client, 2026-10-16): eyebrow + h2 left,
         the lede right under a hairline -->
    <div class="wf__head">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="w.eyebrow" :lines="w.title" />
      </Reveal>
      <Reveal class="wf__lede" variant="fade" :delay="100">“{{ w.lede }}”</Reveal>
    </div>
    <div class="wf__grid">
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
        <p v-if="w.year" class="wf__year">
          <span class="wf__year-n">{{ w.year }}</span>
          <span class="wf__year-label">{{ w.yearLabel }}</span>
        </p>
      </div>

      <Reveal class="wf__text" variant="fade" :delay="100">
        <div class="wf__descr">
          <p>{{ w.vision.before }}<strong class="wf__vision">{{ w.vision.quote }}</strong>{{ w.vision.after }}</p>
          <p v-for="(para, i) in w.body" :key="i">{{ para }}</p>
          <p class="wf__closing">{{ w.closing }}</p>
        </div>
        <p class="wf__author">
          <span class="wf__name">{{ w.author.name }}</span>
          <span class="wf__role">{{ w.author.role }}</span>
        </p>
        <Button class="wf__cta" :to="w.cta.to" :label="w.cta.label" variant="navy" />
      </Reveal>
    </div>
    </div>
  </section>
</template>

<style scoped>
/* ================= 1. intro ================= */
/* head: same split as .cl__head / .cl__note in Clients.vue */
/* Same columns and gap as .wf__grid below (client, 2026-10-19): with different splits
   the quoted lede and the letter text under it started ~50px apart, so the letter
   read as indented. Now both right-hand blocks share one left edge. */
.wf__head {
  display: grid;
  grid-template-columns: minmax(0, 630fr) minmax(0, 547fr);
  gap: var(--grid-gap) var(--space-large);
  align-items: end;
  margin-bottom: var(--space-medium);
}
.wf__lede {                      /* in quotes, set like the letter's body text
                                     (.wf__descr p), client 2026-10-16 */
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  line-height: var(--body-lh);
  color: var(--c-text);
}
/* the slices enter from ±60px; at their widened sizes slice 1 would poke past a 360px
   viewport mid-animation — clip sideways at the section */
.wf { overflow-x: clip; }
.wf__grid {
  display: grid;
  grid-template-columns: minmax(0, 630fr) minmax(0, 547fr);   /* measured 630 | 518–547 */
  column-gap: var(--space-large);                              /* ~113–142 on the demo */
  /* top, not centre (client, 2026-10-19): centred against the tall collage, the letter
     dropped well below the lede and left a gap; now it follows straight on */
  align-items: start;
}

/* one 630×860 box, everything inside in % */
.wf__collage {
  position: relative;
  aspect-ratio: 630 / 860;
  container-type: inline-size;
}
.wf__slice {
  position: absolute;
  overflow: hidden;                /* the window — clips the photo to the radius */
  border-radius: var(--rad-slice); /* DEPARTURE: Genesis-style rounded slices (ROADMAP §4) */
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
  flex-direction: column-reverse; /* label ABOVE the year (client, 2026-10-16): slice 1
                                     now runs under the year, where the label used to be */
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
  margin-bottom: .9em;
  font-size: var(--eyebrow-size);
  line-height: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--eyebrow-ls);
}

.wf :deep(.sh__title) { margin-bottom: 0; }
.wf__descr p {
  margin: 0 0 1.2em;
  color: var(--c-text);
  line-height: var(--body-lh);
}
.wf__descr p:last-child { margin-bottom: 0; }
.wf__vision { font-weight: var(--h-weight); color: var(--c-heading); }
.wf__closing { font-weight: var(--h-weight); color: var(--c-heading); }   /* the letter's last line */
/* signature, after the closing line — name and role stacked, as the band had them */
.wf__author {
  display: flex;
  flex-direction: column;
  margin: 1.6em 0 0;
}
.wf__name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: var(--h-weight);
  color: var(--c-heading);
}
.wf__role {
  margin-top: 4px;
  font-size: 15px;
  line-height: 1.333em;
  color: var(--c-text);
}
.wf__cta { margin-top: 2.1em; }              /* signature + button */

/* on a narrow collage (phones) step the 14px label down with the collage, not the
   viewport, so it stays in proportion to the year */
@container (max-width: 520px) {
  .wf__year-label { font-size: 11px; letter-spacing: 1.2px; }
}

/* ================= responsive (THEME_DNA §1 steps) ================= */
@media (max-width: 1279px) {
  .wf__grid,
  .wf__head { column-gap: var(--space-medium); }
}
@media (max-width: 1023px) {
  .wf__grid { grid-template-columns: 1fr; row-gap: var(--space-medium); }
  .wf__head { grid-template-columns: 1fr; align-items: start; }
  .wf__lede { padding-top: 0; border-top: 0; }
  .wf__collage { width: 100%; max-width: 630px; }
}
</style>
