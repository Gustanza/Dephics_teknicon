<script setup>
import { computed } from 'vue'

/**
 * The Fuse button: 15px/700, letter-spacing 0, NOT uppercase, 0px radius,
 * flat fill that hovers to the brand navy. On hover the label slides left 1.65rem
 * and an arrow fades in from the right edge.
 *
 * Pass `to` for an internal route, `href` for an external or protocol link.
 */
const props = defineProps({
  to: { type: String, default: '' },
  href: { type: String, default: '' },
  variant: { type: String, default: 'solid' }, // solid | outline | navy
  size: { type: String, default: 'md' },        // sm | md | lg
  label: { type: String, required: true },
  arrow: { type: Boolean, default: true }
})

const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))
const classes = computed(() => [
  'btn',
  props.variant !== 'solid' ? `btn--${props.variant}` : '',
  props.size !== 'md' ? `btn--${props.size}` : '',
  props.arrow ? 'btn--arrow' : ''
])
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :type="!to && !href ? 'button' : undefined"
    :class="classes"
  >
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
