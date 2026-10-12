<script setup>
/**
 * The eyebrow → heading → description pattern that leads every section.
 * Eyebrow: 14px / 700 / uppercase / 1.8px tracking, margin-bottom 1.4em.
 * Heading margin-top 1.35em to the description.
 */
defineProps({
  eyebrow: { type: String, default: '' },
  lines: { type: Array, default: () => [] },
  tag: { type: String, default: 'h2' },
  align: { type: String, default: 'left' }, // left | center
  dash: { type: Boolean, default: false }
})
</script>

<template>
  <div class="sh" :class="[`sh--${align}`]">
    <span v-if="eyebrow" class="eyebrow" :class="{ 'eyebrow--dash': dash }">{{ eyebrow }}</span>
    <component :is="tag" class="sh__title">
      <span v-for="(line, i) in lines" :key="i" class="sh__line">{{ line }}</span>
    </component>
    <div v-if="$slots.default" class="sh__descr">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sh--center { text-align: center; }
.sh--center .eyebrow { display: block; }

.sh__title {
  /* optical flush-left correction for the tight tracking */
  margin-left: -1px;
}
.sh--center .sh__title { margin-left: 0; }

.sh__line {
  display: block;
  /* balance each authored line when it has to wrap: at some widths (e.g. a laptop at
     80% zoom, ~1800px) greedy wrapping left a lone word — "A Tanzanian consulting /
     practice," — where balancing gives "A Tanzanian / consulting practice," */
  text-wrap: balance;
}

.sh__descr {
  margin-top: 1.35em;
  max-width: 62ch;
  font-size: 1rem;
  line-height: var(--body-lh);
}
.sh--center .sh__descr { margin-inline: auto; }

@media (max-width: 767px) {
  .sh__title { margin-left: 0; }
  .sh__line { display: inline; }
  .sh__line + .sh__line::before { content: " "; white-space: pre; }
}
</style>
