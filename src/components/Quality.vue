<script setup>
import NodeSplit from './NodeSplit.vue'
import { quality, qualityAbout } from '../data/content.js'

/* `hse`: the About page's "Quality, HSE & Compliance" (IA section 2) — the same QA
   steps plus one health, safety & compliance step. /services shows plain QA. */
const props = defineProps({ hse: { type: Boolean, default: false } })
const eyebrow = props.hse ? qualityAbout.eyebrow : quality.eyebrow
const steps = props.hse ? [...quality.steps, qualityAbout.extraStep] : quality.steps
</script>

<template>
  <NodeSplit
    id="quality"
    :eyebrow="eyebrow"
    :title="quality.title"
    :body="quality.body"
    :steps="steps"
  />
</template>
