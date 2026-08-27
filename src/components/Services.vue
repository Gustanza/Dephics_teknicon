<script setup>
import Button from './ui/Button.vue'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { services } from '../data/content.js'
</script>

<template>
  <section id="services" class="section band--paper">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading
          :eyebrow="services.eyebrow"
          :lines="services.title"
          align="center"
        >
          {{ services.lede }}
        </SectionHeading>
      </Reveal>

      <ul class="svc__grid">
        <Reveal
          v-for="(item, i) in services.items"
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
            <Button :href="item.href" :label="item.link" size="sm" />
          </div>
        </Reveal>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.svc__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
  margin-top: var(--space-small);
}

.svc {
  display: flex;
  flex-direction: column;
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
  margin-top: auto;
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

/* three cards in a two-column grid orphan the third at half width, so the grid
   drops straight from 3-up to 1-up rather than through a ragged 2-up */
@media (max-width: 1023px) {
  .svc__grid { grid-template-columns: 1fr; }
  .svc { padding: 1.9em; }
}
</style>
