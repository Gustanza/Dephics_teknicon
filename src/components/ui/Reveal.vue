<script setup>
import { useReveal } from '../../composables/useReveal.js'

const props = defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  variant: { type: String, default: 'up' }
})

const el = useReveal(props.delay, props.variant)
</script>

<template>
  <component :is="as" ref="el">
    <slot />
  </component>
</template>
