<script setup>
import NodeSplit from './NodeSplit.vue'
import { whyTeknicon } from '../data/content.js'

/* IA section 1: "Why work with Teknicon / key differentiators". Paper band, so it
   steps off the white Sectors section above it instead of merging into it. */
</script>

<template>
  <NodeSplit
    id="why-teknicon"
    band="paper"
    :eyebrow="whyTeknicon.eyebrow"
    :title="whyTeknicon.title"
    :body="whyTeknicon.body"
    :steps="whyTeknicon.items"
    :ordered="false"
  />
</template>
