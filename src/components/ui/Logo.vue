<script setup>
import { computed } from 'vue'
import { company } from '../../data/content.js'

/**
 * The official Teknicon artwork, supplied by the client as
 * `tekres/Teknicon Logo Og.png` and `tekres/Teknicon Logo White.png`.
 * Earlier revisions used a hand-traced SVG of the mark; it was wrong, and it is gone.
 *
 * `variant: 'knockout'` — white wordmark + red mark, for the hero and the navy footer.
 * `variant: 'dark'`     — navy wordmark + red mark, for the fixed header on light ground.
 *
 * `showTagline` picks between two crops of the same artwork rather than hiding an
 * element: the full lockup carries "Consulting Engineers and Project Managers", the
 * header lockup is the mark and wordmark only. At header height the baked-in tagline
 * would render around 8px, which is texture rather than type.
 */
const props = defineProps({
  variant: { type: String, default: 'dark' },
  size: { type: String, default: 'md' },
  showTagline: { type: Boolean, default: true }
})

const src = computed(() => {
  const tone = props.variant === 'knockout' ? '-white' : ''
  return props.showTagline ? `/img/logo-teknicon${tone}.png` : `/img/logo-header${tone}.png`
})

/* intrinsic sizes of the generated files, so the header reserves its space */
const dims = computed(() =>
  props.showTagline ? { w: 900, h: 180 } : { w: 760, h: 152 }
)
</script>

<template>
  <img
    class="logo"
    :class="[`logo--${size}`, showTagline ? 'logo--full' : 'logo--header']"
    :src="src"
    :width="dims.w"
    :height="dims.h"
    :alt="`${company.shortName} — ${company.tagline}`"
  />
</template>

<style scoped>
.logo {
  display: block;
  width: auto;
  height: 34px;
}

.logo--sm { height: 30px; }
.logo--lg { height: 42px; }

/* The full lockup is a third taller than the header crop for the same wordmark size,
   because the tagline sits inside the artwork — give it the extra height back. */
.logo--full.logo--lg { height: 56px; }
.logo--full.logo--md { height: 46px; }
.logo--full.logo--sm { height: 40px; }

@media (max-width: 479px) {
  .logo { height: 28px; }
  .logo--sm { height: 26px; }
  .logo--lg { height: 32px; }
  .logo--full.logo--lg { height: 44px; }
  .logo--full.logo--md { height: 38px; }
  .logo--full.logo--sm { height: 34px; }
}
</style>
