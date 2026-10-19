<script setup>
import Button from './ui/Button.vue'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { services } from '../data/content.js'
import { servicePath } from '../data/lookup.js'

/* Service cards, each linking to its own page. On Home (`teaser`) it is one row of
   three — `services.home` in content.js — then the "All services" button (client
   request, 2026-09-23). Without `teaser`, all five: 3 + 2, the short row centred, as
   the theme centres its service cards (THEME_DNA §11.9). */
const props = defineProps({ teaser: { type: Boolean, default: false } })
const items = props.teaser
  ? services.home.map((slug) => services.items.find((s) => s.slug === slug))
  : services.items
</script>

<template>
  <section id="services" class="section band--paper">
    <div class="container">
      <!-- head split like the Clients section (client, 2026-10-16): eyebrow + h2 left,
           the lede right under a hairline (was one centred block) -->
      <div class="svc__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="services.eyebrow" :lines="services.title" />
        </Reveal>
        <Reveal class="svc__lede" variant="fade" :delay="100">{{ services.lede }}</Reveal>
      </div>

      <ul class="svc__grid">
        <Reveal
          v-for="(item, i) in items"
          :key="item.title"
          as="li"
          class="svc"
          :delay="i * 100"
        >
          <!-- theme order: tag → title → image → 34px rule → link -->
          <div class="svc__header">
            <span class="svc__tag">{{ item.tag }}</span>
            <h3 class="svc__title">{{ item.title }}</h3>
          </div>

          <div class="svc__thumb">
            <img
              :class="{ 'is-cropped': item.crop }"
              :src="item.image"
              :alt="item.alt"
              loading="lazy"
              :width="item.w"
              :height="item.h"
            />
          </div>

          <p class="svc__body">{{ item.body }}</p>

          <div class="svc__info">
            <Button :to="servicePath(item.slug)" :label="services.cardLink" size="sm" />
          </div>
        </Reveal>
      </ul>

      <div v-if="teaser" class="svc__more">
        <Button to="/services" :label="services.allLink" variant="navy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* head: same split as .cl__head / .cl__note in Clients.vue */
.svc__head {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
  margin-bottom: var(--space-medium);
}
.svc__lede {                      /* set like body text, as the welcome-note lede
                                     (client, 2026-10-16) */
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  line-height: var(--body-lh);
  color: var(--c-text);
}
@media (max-width: 1023px) {
  .svc__head { grid-template-columns: 1fr; align-items: start; }
  .svc__lede { padding-top: 0; border-top: 0; }
}

.svc__more { margin-top: var(--space-medium); text-align: center; }

/*
  Cards in a row share their row tracks (subgrid): tag+title, photo, description,
  button. A title that runs to three lines ("Water, Dams & Tailings Storage Facilities")
  used to push that card's photo and button below its neighbours'; now every
  track is as tall as its tallest card, so photos start and buttons sit on one line
  across the row whatever the copy does. Same technique as /sectors.

  Six columns, two per card, so an incomplete last row can still be centred (the
  theme centres its service cards, THEME_DNA §11.9) — the full, non-teaser set
  is 3 + 2. Home shows one row of three.
*/
.svc__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--grid-gap);
  margin-top: var(--space-small);
}
.svc__grid > .svc { grid-column: span 2; min-width: 0; }
.svc__grid > .svc:nth-last-child(2):nth-child(3n + 1) { grid-column: 2 / span 2; }
.svc__grid > .svc:last-child:nth-child(3n + 1) { grid-column: 3 / span 2; }

.svc {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0; /* the card's own spacing is its margins; the grid gap is between cards */
  padding: 2.4em;
  text-align: center;
  background-color: var(--c-bg-alt);
  border-radius: var(--rad);
}

.svc__tag {
  display: block;
  font-size: 17px;
  line-height: 1.5em;
  font-weight: 400;
  color: var(--c-text);
}

.svc__title {
  margin: .15em 0 0;
  font-size: clamp(19px, 18px + .39vw, 23px);
  line-height: 1.214em;
  letter-spacing: -.5px;
}
@media (min-width: 1280px) {
  .svc__title { font-size: var(--h4-size); }
}

.svc__thumb {
  margin-top: 1.5em;
  overflow: hidden;
  aspect-ratio: 890 / 664;
}
.svc__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
  will-change: transform;
}
.svc:hover .svc__thumb img { transform: scale(1.07); }

/* Several source photographs carry an orange camera date stamp burnt into the
   lower right corner. Over-size the image box and anchor it top-left so the
   overflow — and the stamp with it — is clipped away. */
.svc__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.svc:hover .svc__thumb img.is-cropped { transform: scale(1.05); }

.svc__body {
  margin: 1.6em 0 1.6em;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

.svc__info {
  position: relative;
  align-self: end;
  padding-top: .7em;
}
.svc__info::before {
  content: "";
  display: block;
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 34px; height: 1px;
  background-color: var(--c-text-dark);
}

/* Client asked for a solid button here in place of the theme's quiet text link
   (THEME_DNA §4.1). The 34px rule above it stays — it is what separates the
   image from the call to action. */
.svc__info .btn { margin-top: 1.5em; }

/* 3-up down to 1024; below that the cards are too narrow for three, and a 2-up
   would strand the fifth card, so it drops straight to one column */@media (max-width: 1023px) {
  .svc__grid { grid-template-columns: minmax(0, 1fr); }
  .svc__grid > .svc,
  .svc__grid > .svc:nth-last-child(2):nth-child(3n + 1),
  .svc__grid > .svc:last-child:nth-child(3n + 1) { grid-column: 1; }
  .svc { padding: 1.9em; }
}

/* no subgrid (older browsers): each card falls back to its own column stack */
@supports not (grid-template-rows: subgrid) {
  .svc { display: flex; flex-direction: column; grid-row: auto; }
  .svc__info { margin-top: auto; }
}
</style>
