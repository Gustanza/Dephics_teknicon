<script setup>
import { computed } from 'vue'

/**
 * The Fuse button: 15px/700, letter-spacing 0, NOT uppercase, 0px radius,
 * flat fill that darkens on hover. On hover the label slides left 1.65rem and
 * an arrow fades in from the right edge.
 */
const props = defineProps({
  href: { type: String, default: '' },
  variant: { type: String, default: 'solid' }, // solid | outline | light | navy
  size: { type: String, default: 'md' },        // sm | md | lg
  label: { type: String, required: true },
  arrow: { type: Boolean, default: true }
})

const tag = computed(() => (props.href ? 'a' : 'button'))
const classes = computed(() => [
  'btn',
  props.variant !== 'solid' ? `btn--${props.variant}` : '',
  props.size !== 'md' ? `btn--${props.size}` : '',
  props.arrow ? 'btn--arrow' : ''
])
</script>

<template>
  <component :is="tag" :href="href || undefined" :type="href ? undefined : 'button'" :class="classes">
    <span class="btn__label">{{ label }}</span>
    <svg
      v-if="arrow"
      class="btn__arrow"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 6h13M9.5 1 15 6l-5.5 5" stroke="currentColor" stroke-width="1.6" />
    </svg>
  </component>
</template>
