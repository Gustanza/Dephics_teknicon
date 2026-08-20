<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/* §10 — .trx_addons_scroll_to_top: a small square anchor pinned to the bottom
   right corner, appearing once the page has scrolled. */
const shown = ref(false)

function onScroll () {
  shown.value = window.scrollY > window.innerHeight
}

function toTop () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <button
    class="s2t"
    :class="{ 'is-shown': shown }"
    type="button"
    :tabindex="shown ? 0 : -1"
    :aria-hidden="!shown"
    @click="toTop"
  >
    <span class="visually-hidden">Back to top</span>
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14V2M2.5 7.5 8 2l5.5 5.5" stroke="currentColor" stroke-width="1.6" />
    </svg>
  </button>
</template>

<style scoped>
.s2t {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  color: #fff;
  background-color: var(--d-bg-alt);
  border: 0;
  border-radius: var(--rad);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--dur) var(--ease), visibility var(--dur) var(--ease),
              background-color var(--dur) var(--ease);
}
.s2t.is-shown { opacity: 1; visibility: visible; }
.s2t:hover { background-color: var(--c-link); }
.s2t svg { width: 16px; height: 16px; }
</style>
