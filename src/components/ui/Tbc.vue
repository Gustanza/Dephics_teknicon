<script setup>
import { computed } from 'vue'
import { filled, isTbc, SHOW_PLACEHOLDERS } from '../../data/tbc.js'

/**
 * Renders a content value, or a "To be confirmed" chip when the value is a placeholder.
 *
 *   <Tbc :value="project.year" />                 inline chip, note in the tooltip
 *   <Tbc :value="sector.description" block />     full-width panel, note written out
 *   <Tbc :value="x" v-slot="{ value }">…</Tbc>   custom rendering of a real value
 *
 * With SHOW_PLACEHOLDERS off (src/data/tbc.js) a placeholder renders nothing — the
 * caller should also drop any label that goes with it; `shown()` answers that.
 */
const props = defineProps({
  value: { type: [String, Number, Array, Object], default: null },
  block: { type: Boolean, default: false },
  /* shown when the placeholder itself carries no note — e.g. a bare TBC repeated
     across 36 projects, where the note belongs to the field, not each entry */
  fallback: { type: String, default: '' }
})
const note = computed(() => (props.value && props.value.note) || props.fallback)

const real = computed(() => filled(props.value))
const pending = computed(() => isTbc(props.value) && SHOW_PLACEHOLDERS)
</script>

<template>
  <slot v-if="real" :value="value">{{ value }}</slot>
  <span
    v-else-if="pending"
    class="tbc"
    :class="{ 'tbc--block': block }"
    :title="!block && note ? note : undefined"
  >
    <span class="tbc__flag">To be confirmed</span>
    <span v-if="block && note" class="tbc__note">{{ note }}</span>
  </span>
</template>

<style scoped>
.tbc {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 1px 8px;
  border: 1px dashed var(--c-tbc);
  border-radius: var(--rad);
  background-color: var(--c-tbc-bg);
  color: var(--c-tbc);
  font-size: 13px;
  line-height: 1.5em;
  font-weight: 700;
  letter-spacing: 0;
  cursor: help;
}

.tbc--block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 18px;
  cursor: default;
}

.tbc__note {
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  color: var(--c-text-dark);
}
</style>
