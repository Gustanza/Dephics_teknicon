<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { heroSlides } from '../data/content.js'

const root = ref(null)
const index = ref(0)
const paused = ref(false)
const onScreen = ref(true)
const DURATION = 7000
let timer = null
let observer = null

const current = computed(() => heroSlides[index.value])
const pad = (n) => String(n + 1).padStart(2, '0')
const total = pad(heroSlides.length - 1)

function go (i) {
  index.value = (i + heroSlides.length) % heroSlides.length
  restart()
}
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

/*
  Autoplay deliberately does NOT pause when the pointer is anywhere over the hero.
  The hero is close to the full viewport, so a visitor's cursor rests over it by
  default — treating that as a pause gesture froze the carousel on slide 1 for
  anyone whose mouse happened to be on the page, and it never resumed because the
  pointer never left. Hover-pause lives on the slide counter instead, where
  hovering is an actual intent. Focus, off-screen and reduced-motion still pause.
*/
const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function restart () {
  clearInterval(timer)
  if (paused.value || !onScreen.value || reducedMotion()) return
  timer = setInterval(() => { index.value = (index.value + 1) % heroSlides.length }, DURATION)
}

function pause () { paused.value = true; clearInterval(timer) }
function resume () { paused.value = false; restart() }

/* A backgrounded tab should not queue up transitions to replay all at once. */
function onVisibility () {
  if (document.hidden) clearInterval(timer)
  else restart()
}

onMounted(() => {
  // no point advancing a carousel nobody is looking at
  observer = new IntersectionObserver(([entry]) => {
    onScreen.value = entry.isIntersecting
    if (!entry.isIntersecting) { index.value = 0; clearInterval(timer) } else restart()
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
  document.addEventListener('visibilitychange', onVisibility)
  restart()
})

onBeforeUnmount(() => {
  clearInterval(timer)
  document.removeEventListener('visibilitychange', onVisibility)
  if (observer) observer.disconnect()
})
</script>

<template>
  <section
    id="top"
    ref="root"
    class="hero"
    aria-roledescription="carousel"
    aria-label="Featured Teknicon projects"
    tabindex="0"
    @focusin="pause"
    @focusout="resume"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <div class="hero__stage">
      <div
        v-for="(slide, i) in heroSlides"
        :key="slide.image"
        class="hero__slide"
        :class="{ 'is-active': i === index }"
        :aria-hidden="i !== index"
      >
        <img
          class="hero__img"
          :class="{ 'is-quiet': slide.quietZoom }"
          :src="slide.image"
          :alt="slide.alt"
          :style="{ objectPosition: slide.focus }"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
          :width="slide.w"
          :height="slide.h"
        />
      </div>
    </div>

    <!--
      DELIBERATE DEVIATION FROM THE FUSE THEME.
      Fuse ships no scrim on its hero: its stock photography is dark, low-contrast
      and art-directed, so #fcfcfc type holds unaided. Teknicon's imagery is bright,
      busy daylight construction photography (blue sky, pale concrete, hi-vis), and
      white type simply disappears over it. So we add a left-weighted navy gradient
      plus a slight overall darken. Everything else about the hero — bottom-left
      headline stack, bottom-right 01 / 03 counter, Ken Burns 100%→110% over 10s —
      stays faithful to the theme.
    -->
    <div class="hero__scrim" aria-hidden="true" />

    <div class="hero__row bleed">
      <div :key="index" class="hero__content">
        <span class="hero__eyebrow">{{ current.eyebrow }}</span>
        <h1 class="hero__title">
          <span v-for="(line, i) in current.title" :key="i" class="hero__line">{{ line }}</span>
        </h1>
        <p class="hero__lede">{{ current.lede }}</p>
        <div class="hero__actions">
          <a class="btn btn--arrow" :href="current.cta.href">
            <span class="btn__label">{{ current.cta.label }}</span>
            <svg class="btn__arrow" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M1 6h13M9.5 1 15 6l-5.5 5" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </a>
          <a v-if="current.cta2" class="btn btn--light" :href="current.cta2.href">
            <span class="btn__label">{{ current.cta2.label }}</span>
          </a>
        </div>
      </div>

      <button
        class="hero__counter"
        @mouseenter="pause"
        @mouseleave="resume"
        type="button"
        @click="next"
      >
        <span class="visually-hidden">Next slide</span>
        <span class="hero__counter-now" aria-hidden="true">{{ pad(index) }}</span>
        <span class="hero__counter-sep" aria-hidden="true">&nbsp;/&nbsp;</span>
        <span class="hero__counter-total" aria-hidden="true">{{ total }}</span>
      </button>
    </div>

    <p class="visually-hidden" aria-live="polite">
      Slide {{ index + 1 }} of {{ heroSlides.length }}: {{ current.title.join(' ') }}
    </p>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 500px;
  height: 100svh;
  max-height: 1000px;
  overflow: hidden;
  background-color: var(--d-bg);
}
.hero:focus-visible { outline: 2px solid #fff; outline-offset: -6px; }

.hero__stage { position: absolute; inset: 0; }

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.1s var(--ease-soft);
}
.hero__slide.is-active { opacity: 1; }

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
}
/* Ken Burns: 100% → 110% over 10s, restarted whenever a slide becomes active */
.hero__slide.is-active .hero__img {
  animation: hero-panzoom 10s linear forwards;
}
@keyframes hero-panzoom {
  from { transform: scale(1); }
  to   { transform: scale(1.1); }
}

/*
  Slide 1 is the LCP frame and its source is the lowest-resolution photograph in
  the hero set (1057px wide), so at 1920 it is already drawn at 1.82x. The full
  110% Ken Burns would push peak demand to 2.00x, which is where bicubic
  interpolation becomes obvious on the container yard's hard rectilinear
  geometry. The frame is editorially right — a confidently attributed real
  Teknicon project — so the amplitude is capped rather than the picture swapped,
  and it starts at 1.00 so the LCP paints at the sharpest scale the source can
  give. Slides 2 (0.98x native) and 3 keep the full effect. See docs/HANDOFF.md:
  the original full-resolution frame is the top asset request to the client.
*/
.hero__slide.is-active .hero__img.is-quiet {
  animation-name: hero-panzoom-quiet;
}
@keyframes hero-panzoom-quiet {
  from { transform: scale(1); }
  to   { transform: scale(1.035); }
}

/* the rest of the page stops moving for prefers-reduced-motion; so does this */
@media (prefers-reduced-motion: reduce) {
  .hero__slide.is-active .hero__img,
  .hero__slide.is-active .hero__img.is-quiet { animation: none; }
  .hero__content { animation: none; }
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(11, 14, 36, .82) 0%, rgba(11, 14, 36, .62) 45%, rgba(11, 14, 36, .12) 74%, rgba(11, 14, 36, 0) 100%),
    linear-gradient(0deg, rgba(11, 14, 36, .55) 0%, rgba(11, 14, 36, .05) 45%),
    rgba(11, 14, 36, .18);
}

.hero__row {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  padding-bottom: 70px;
  padding-top: 140px;
}

.hero__content {
  max-width: 900px;
  animation: hero-in .8s var(--ease-soft) both;
}
@keyframes hero-in {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}

.hero__eyebrow {
  display: block;
  font-size: 17px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fcfcfc;
}

.hero__title {
  margin: 22px 0 0 -3px;
  /* the theme's 87px layer is authored on a 1920 grid and scales with the
     viewport, so 1440px renders at ~65px. This tracks that curve. */
  font-size: clamp(44px, 4.6vw - 1px, 87px);
  line-height: 1.03;
  letter-spacing: -1px;
  color: #fcfcfc;
}
.hero__line { display: block; }

.hero__lede {
  max-width: 60ch;
  margin: 24px 0 0;
  font-size: 1rem;
  line-height: 1.65em;
  color: rgba(255, 255, 255, .84);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 30px;
}

.hero__counter {
  flex-shrink: 0;
  padding: 0;
  background: transparent;
  border: 0;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fcfcfc;
  cursor: pointer;
  white-space: nowrap;
}
.hero__counter-now { font-size: 200%; }
.hero__counter:hover .hero__counter-now { color: var(--c-link); }
.hero__counter-now,
.hero__counter-sep,
.hero__counter-total { transition: color var(--dur) var(--ease); }

@media (max-width: 1279px) {
  .hero__row { padding-bottom: 50px; }
  .hero__eyebrow { font-size: 14px; line-height: 22px; letter-spacing: 2px; }
  .hero__counter { font-size: 23px; }
}

@media (max-width: 1023px) {
  .hero__title { letter-spacing: 0; }
}

@media (max-width: 767px) {
  .hero { height: auto; min-height: 640px; max-height: none; }
  .hero__row {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 150px;
    padding-bottom: 40px;
    gap: 28px;
  }
  .hero__eyebrow { font-size: 14px; letter-spacing: 1px; }
  .hero__title { margin-left: 0; }
  .hero__counter { font-size: 20px; align-self: flex-end; }
  .hero__actions .btn { flex: 1 1 auto; }
}
</style>
