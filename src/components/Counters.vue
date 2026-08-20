<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { counters } from '../data/content.js'

const root = ref(null)
const shown = ref(counters.items.map(() => 0))
let observer = null

/* count-up: 1500ms, 15ms tick — the theme's data-duration / data-speed */
function runCount () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    shown.value = counters.items.map((c) => c.value)
    return
  }
  const duration = 1500
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = counters.items.map((c) => Math.round(c.value * eased))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      runCount()
      observer.disconnect()
    }
  }, { threshold: 0.3 })
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => observer && observer.disconnect())
</script>

<template>
  <section ref="root" class="section band--dark cnt" aria-label="The practice in numbers">
    <div class="container">
      <span class="eyebrow cnt__eyebrow">{{ counters.eyebrow }}</span>

      <ul class="cnt__grid">
        <li v-for="(item, i) in counters.items" :key="item.label" class="cnt__item">
          <span class="cnt__figure" aria-hidden="true">{{ shown[i] }}</span>
          <!-- the value precedes the label so the accessible reading order is
               "17, Years in practice" rather than the reverse -->
          <span class="visually-hidden">{{ item.value }}</span>
          <span class="cnt__label">{{ item.label }}</span>
        </li>
      </ul>

      <p class="cnt__note">{{ counters.note }}</p>
    </div>
  </section>
</template>

<style scoped>
/* the Vision band below carries most of the gap — the theme never doubles up */
.cnt { padding-bottom: var(--space-medium); }

.cnt__eyebrow {
  text-align: left;
  margin-bottom: var(--space-medium);
}

.cnt__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gap);
}

.cnt__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 8.2em;
}

/* oversized ghost numeral behind the label — 170px, barely-there alpha */
.cnt__figure {
  position: absolute;
  z-index: 0;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  white-space: nowrap;
  font-size: clamp(72px, 11.8vw, 170px);
  line-height: 1em;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--d-dark-003);
}
.cnt__label {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: clamp(18px, 16px + .55vw, 24px);
  line-height: 1.4em;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--d-text-dark);
}

/* 1px x 60px divider, half a gutter to the right */
.cnt__item::after {
  content: "";
  display: block;
  position: absolute;
  right: calc(-1 * var(--grid-gap) / 2);
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 60px;
  background-color: var(--d-bd);
}
.cnt__item:last-child::after { display: none; }

.cnt__note {
  max-width: 46ch;
  margin: var(--space-medium) 0 0 auto;
  padding-top: 20px;
  border-top: 1px solid var(--d-bd);
  text-align: right;
  font-size: 15px;
  line-height: 1.55em;
  color: var(--d-text-light);
}

@media (max-width: 767px) {
  .cnt__note { max-width: none; text-align: left; margin-left: 0; }
  .cnt__grid { grid-template-columns: repeat(2, 1fr); row-gap: var(--space-small); }
  .cnt__item:nth-child(2n)::after { display: none; }
  .cnt__item { min-height: 7em; }
}
</style>
