<script setup>
import Button from './ui/Button.vue'
import Reveal from './ui/Reveal.vue'
import { services } from '../data/content.js'
import { servicePath } from '../data/lookup.js'

/*
  The /services index — the IA's "main capability menu", all five services.

  Five cards in the Home grid would orphan two at the end of a three-up row, so the
  index is a ruled register instead: one row per service, photograph on one side and
  the service on the other, the photograph switching sides row by row. That is the
  theme's split-row vocabulary (§11.9) — no panels, rows separated by a 1px rule
  (§7.4), and the only decoration the index numeral and the photograph.
*/
</script>

<template>
  <section class="section band--white si">
    <div class="container">
      <Reveal variant="fade" class="si__lede">
        {{ services.lede }}
      </Reveal>

      <ol class="si__list">
        <Reveal
          v-for="(s, i) in services.items"
          :key="s.slug"
          as="li"
          class="si__row"
          :class="{ 'si__row--flip': i % 2 === 1 }"
          variant="fade"
        >
          <div class="si__thumb">
            <img
              :class="{ 'is-cropped': s.crop }"
              :src="s.image"
              :alt="s.alt"
              loading="lazy"
              :width="s.w"
              :height="s.h"
            />
          </div>

          <div class="si__body">
            <div class="si__head">
              <span class="si__n" aria-hidden="true">{{ s.n }}</span>
              <h2 class="si__title">
                <RouterLink :to="servicePath(s.slug)">{{ s.title }}</RouterLink>
              </h2>
            </div>
            <p class="si__overview">{{ s.overview[0] }}</p>
            <ul class="si__scope" :aria-label="`${s.title}: scope`">
              <li v-for="line in s.scope" :key="line">{{ line }}</li>
            </ul>
            <Button :to="servicePath(s.slug)" :label="services.cardLink" size="sm" />
          </div>
        </Reveal>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.si__lede {
  max-width: 62ch;
  margin-bottom: var(--space-medium);
  font-size: 19px;
  line-height: 1.55em;
  font-weight: 700;
  letter-spacing: -.4px;
  color: var(--c-text-dark);
}

.si__row {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: var(--grid-gap) 80px;
  align-items: start;
  padding-block: var(--space-medium);
  border-top: 1px solid var(--c-bd);
}
.si__row:last-child { border-bottom: 1px solid var(--c-bd); }
.si__row--flip .si__thumb { order: 2; }

.si__thumb {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--c-bg-alt-h);
}
.si__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
  will-change: transform;
}
.si__row:hover .si__thumb img { transform: scale(1.07); }
/* date-stamped sources: over-size and clip the lower-right corner away */
.si__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
  transform-origin: 0 0;
  transform: scale(1);
}
.si__row:hover .si__thumb img.is-cropped { transform: scale(1.05); }

.si__head {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

/* the sanctioned index numeral (§4.1), set in ink as on /sectors */
.si__n {
  flex-shrink: 0;
  font-size: 2.1em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1.2px;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.si__title {
  margin: 0;
  font-size: var(--h4-size);
  line-height: var(--h4-lh);
  letter-spacing: var(--h4-ls);
}
.si__title a {
  color: inherit;
  transition: color var(--dur) var(--ease);
}
.si__title a:hover,
.si__title a:focus-visible { color: var(--c-link); }

.si__overview {
  margin: 1.2em 0 0;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

/* the scope, as the /sectors evidence lines: ruled, a short red rule as the marker */
.si__scope { margin: 1.4em 0 var(--space-small); }
.si__scope li {
  position: relative;
  padding: 10px 0 10px 30px;
  border-top: 1px solid var(--c-bg-alt-h);
  font-size: 1rem;
  line-height: 1.5em;
  color: var(--c-text-dark);
}
.si__scope li::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(9px + .75em);
  width: 14px;
  height: 2px;
  background-color: var(--c-brand-red);
}

@media (max-width: 1279px) {
  .si__row { gap: var(--grid-gap) 50px; }
}

@media (max-width: 1023px) {
  .si__row { grid-template-columns: 1fr; }
  .si__row--flip .si__thumb { order: 0; }
  .si__thumb { aspect-ratio: 16 / 9; }
}

@media (max-width: 767px) {
  .si__lede { font-size: 17px; letter-spacing: 0; }
  .si__title { font-size: 23px; letter-spacing: 0; }
  .si__n { font-size: 1.8em; letter-spacing: 0; }
}
</style>
