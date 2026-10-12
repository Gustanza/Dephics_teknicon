<script setup>
import { insightsResources } from '../../data/content.js'

/**
 * Marks a demonstration item on Insights 2 (sample articles and vacancies) so it can
 * never pass for Teknicon's own content. Square, 1px hairline — the theme's own
 * vocabulary (THEME_DNA §7.4), not the dashed TBC chip, because this is reviewable
 * demo content rather than a gap. Disappears with the items when
 * insightsResources.showSamples is switched off.
 */
defineProps({ light: { type: Boolean, default: false } })
</script>

<template>
  <span class="st" :class="{ 'st--light': light }">{{ insightsResources.sampleLabel }}</span>
</template>

<style scoped>
.st {
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: var(--rad);
  font-size: 12px;
  line-height: 1.4em;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--c-text-light);
  vertical-align: middle;
}
.st--light { color: rgba(255, 255, 255, .85); }
</style>
