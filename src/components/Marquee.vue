<script setup>
import { marquee } from '../data/content.js'

/* Two identical runs sit side by side; the track translates exactly -50%,
   so the loop is seamless. Paused entirely under prefers-reduced-motion. */
const phrase = marquee.join(' · ')
</script>

<template>
  <div class="mq" aria-hidden="true">
    <div class="mq__track">
      <span class="mq__run">{{ phrase }} · </span>
      <span class="mq__run">{{ phrase }} · </span>
    </div>
  </div>
</template>

<style scoped>
.mq {
  overflow: hidden;
  background-color: var(--d-bg-alt);
  padding-block: 18px 22px;
}

.mq__track {
  display: flex;
  width: max-content;
  animation: mq-scroll 38s linear infinite;
  will-change: transform;
}

.mq__run {
  display: block;
  padding-right: 7%;
  font-family: var(--font-sans);
  font-size: clamp(70px, 11.8vw, 170px);
  line-height: 1em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: var(--c-link);
}

@keyframes mq-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .mq__track { animation: none; }
}
</style>
