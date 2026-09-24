<script setup>
import Button from './ui/Button.vue'
import Reveal from './ui/Reveal.vue'
import { consultCta, primaryCta } from '../data/content.js'

/**
 * The IA's "consultation call-to-action" that closes each service and project page.
 *
 * A dark band, split unequally (§11.9): the question on the left, the two buttons
 * bottom-anchored on the right. `title` overrides the default question where the page
 * can be more specific ("Have a structural project?").
 */
defineProps({ title: { type: String, default: '' } })
</script>

<template>
  <section class="section--tight band--dark cc" aria-labelledby="cc-title">
    <div class="container cc__inner">
      <Reveal variant="fade" class="cc__text">
        <span class="eyebrow">{{ consultCta.eyebrow }}</span>
        <h2 id="cc-title" class="cc__title">{{ title || consultCta.title }}</h2>
        <p class="cc__lede">{{ consultCta.lede }}</p>
      </Reveal>
      <Reveal variant="fade" :delay="100" class="cc__actions">
        <!-- red + navy: the brand pair the client chose for paired buttons (P0-1) -->
        <Button :to="primaryCta.to" :label="primaryCta.label" />
        <Button :to="consultCta.secondary.to" :label="consultCta.secondary.label" variant="navy" />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.cc { background-color: var(--d-bg); }

.cc__inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--space-small) 60px;
  align-items: end;
}

.cc__title {
  margin: 0;
  font-size: var(--h3-size);
  line-height: var(--h3-lh);
  letter-spacing: var(--h3-ls);
}

.cc__lede {
  margin: 1em 0 0;
  max-width: 52ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--d-text);
}

.cc__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-end;
}

@media (max-width: 1023px) {
  .cc__inner { grid-template-columns: 1fr; align-items: start; }
  .cc__actions { justify-content: flex-start; }
}

@media (max-width: 767px) {
  .cc__title { font-size: var(--h4-size); letter-spacing: 0; }
}
</style>
