<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import Button from './ui/Button.vue'
import { welcomeNote as w } from '../data/content.js'

/*
  Welcome note, v3 (client experiment, 2026-10-16). v2 — photo + letter split on white —
  is kept as WelcomeNote.vue; HomePage.vue says how to swap back.

  Fuse's boldest vocabulary, one pattern per job, nothing invented:
  - Dark band with a photographic texture at low opacity (THEME_DNA §7.5). Mid navy
    (--d-bg-mid) so it reads as its own band against the darker hero above it.
  - Ghost marquee ribbon (§7.2): 170px / 700 / uppercase / −0.02em, as background text.
    Fuse runs it at full accent; here it is ghosted to 6% white so it is texture under
    the letter rather than a second headline. Stops for reduced motion.
  - The letter laid wide: heading | lede, then the body in three columns split by 1px
    vertical rules (the counter-divider rule, §7.4) — short and wide, not long and narrow.
  - Finale = testimonial qw-big (§4.4) exactly: one sentence at h1 typography, centred,
    no quote glyph, author block 2.3em below — on dark, as Fuse's testimonials sit.
*/
const ribbon = `${w.title.join(' ')} — `
</script>

<template>
  <section class="section band--dark wb">
    <div class="wb__texture" aria-hidden="true" :style="{ backgroundImage: `url(${w.media.src})` }"></div>

    <div class="wb__marquee" aria-hidden="true">
      <div class="wb__track">
        <span v-for="n in 4" :key="n" class="wb__char">{{ ribbon }}</span>
      </div>
    </div>

    <div class="container wb__inner">
      <div class="wb__intro">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="w.eyebrow" :lines="w.title" dash />
        </Reveal>
        <Reveal variant="fade" :delay="100">
          <p class="wb__lede">{{ w.lede }}</p>
        </Reveal>
      </div>

      <div class="wb__cols">
        <Reveal class="wb__col" variant="fade">
          <p>{{ w.vision.before }}<strong class="wb__vision">{{ w.vision.quote }}</strong>{{ w.vision.after }}</p>
        </Reveal>
        <Reveal
          v-for="(para, i) in w.body"
          :key="i"
          class="wb__col"
          variant="fade"
          :delay="(i + 1) * 100"
        >
          <p>{{ para }}</p>
        </Reveal>
      </div>

      <Reveal class="wb__finale" variant="fade">
        <figure class="wb__figure">
          <span class="wb__rule" aria-hidden="true"></span>
          <blockquote class="wb__statement">{{ w.closing }}</blockquote>
          <figcaption class="wb__author">
            <span class="wb__name">{{ w.author.name }}</span>
            <span class="wb__role">{{ w.author.role }}</span>
          </figcaption>
        </figure>
        <Button class="wb__cta" :to="w.cta.to" :label="w.cta.label" />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.wb {
  overflow: hidden;
  background-color: var(--d-bg-mid);
}

/* §7.5 — photo laid over the band as texture */
.wb__texture {
  position: absolute;
  inset: 0;
  /* scaled to 125% of the band's height and pinned to the top, so the photo's bottom
     20% falls outside the band at every width — the camera date stamp starts ~85% down */
  background-position: center top;
  background-size: auto 125%;
  background-repeat: no-repeat;
  opacity: .12;
  filter: grayscale(1);
  pointer-events: none;
}

/* §7.2 — marquee ribbon, ghosted */
.wb__marquee {
  position: absolute;
  top: 20px;                     /* Fuse bg_text_top */
  left: 0;
  right: 0;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
}
.wb__track {
  display: inline-flex;
  animation: wb-marquee 60s linear infinite;
}
.wb__char {
  padding-right: .3em;
  font-size: 170px;
  line-height: 1em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, .06);
}
@keyframes wb-marquee {
  to { transform: translateX(-50%); }   /* 4 copies: half the track is two copies — seamless */
}
@media (prefers-reduced-motion: reduce) {
  .wb__track { animation: none; }
}

.wb__inner { position: relative; z-index: 1; }

/* ---- heading | lede */
.wb__intro {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: var(--grid-gap) 80px;
  align-items: end;
  padding-top: var(--space-large);   /* clears the ribbon */
}
.wb :deep(.sh__title) { margin: 0; }
.wb__lede {
  margin: 0;
  font-size: var(--h5-size);         /* 24px at 400 */
  line-height: 1.45em;
  letter-spacing: -.4px;
  color: var(--d-text-dark);
}

/* ---- the body, three columns between 1px vertical rules */
.wb__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: var(--space-medium);
  border-top: var(--hairline) solid var(--d-bd);
}
.wb__col {
  padding: var(--space-small) var(--grid-gap) 0;
  border-left: var(--hairline) solid var(--d-bd);
}
.wb__col:first-child { padding-left: 0; border-left: 0; }
.wb__col:last-child { padding-right: 0; }
.wb__col p {
  margin: 0;
  line-height: var(--body-lh);
  color: var(--d-text);
}
.wb__vision { font-weight: var(--h-weight); color: var(--d-text-dark); }

/* ---- finale: qw-big on dark */
.wb__finale {
  margin-top: var(--space-large);
  padding: 0 15%;
  text-align: center;
}
.wb__figure { margin: 0; }
.wb__rule {
  display: block;
  width: 34px;
  height: var(--hairline);
  margin: 0 auto var(--space-medium);
  background: var(--d-text-dark);
}
.wb__statement {
  margin: 0;
  font-size: var(--h1-size);         /* 57px */
  line-height: var(--h1-lh);
  letter-spacing: var(--h1-ls);
  font-weight: var(--h-weight);
  color: var(--d-text-dark);
  text-wrap: balance;
}
.wb__author {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.3em;
}
.wb__name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: var(--h-weight);
  color: var(--d-text-dark);
}
.wb__role {
  margin-top: 4px;
  font-size: 15px;
  line-height: 1.333em;
  color: var(--d-text);
}
.wb__cta { margin-top: 2.1em; }

/* THEME_DNA §1 / §7.2 responsive steps */
@media (max-width: 1279px) {
  .wb__char { font-size: 140px; }
  .wb__intro { gap: var(--grid-gap) 57px; }
  .wb__statement { font-size: 46px; }
}
@media (max-width: 1023px) {
  .wb__intro { grid-template-columns: 1fr; gap: var(--space-small); }
  .wb__lede { font-size: 20px; letter-spacing: 0; }
  .wb__cols { grid-template-columns: 1fr; border-top: 0; }
  .wb__col,
  .wb__col:first-child,
  .wb__col:last-child {
    padding: var(--space-small) 0 0;
    margin-top: var(--space-small);
    border-left: 0;
    border-top: var(--hairline) solid var(--d-bd);
  }
  .wb__finale { padding: 0; }
  .wb__statement { font-size: 38px; line-height: 42px; }
}
@media (max-width: 767px) {
  .wb__char { font-size: 70px; }
  .wb__intro { padding-top: var(--space-medium); }
  .wb__lede { font-size: 19px; }
  .wb__statement { font-size: 30px; line-height: 35px; letter-spacing: 0; }
}
@media (max-width: 479px) {
  .wb__statement { font-size: 27px; line-height: 31px; }
}
</style>
