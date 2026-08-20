import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * One IntersectionObserver for the whole page (no animation library).
 * Elements are "armed" (opacity 0 + 60px offset) only once JS is running, so
 * the page is fully readable if the script never executes.
 *
 * Under prefers-reduced-motion nothing is armed at all — no opacity fade and
 * no transform is ever applied.
 */

let observer = null

function prefersReducedMotion () {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getObserver () {
  if (observer) return observer
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.remove('reveal-armed')
      entry.target.classList.add('is-revealed')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
  return observer
}

/**
 * @param {number} delay  stagger delay in ms (the theme uses 100ms per sibling)
 * @param {string} variant  up | fade | left | right
 * @returns {import('vue').Ref<HTMLElement|null>} template ref to attach
 */
export function useReveal (delay = 0, variant = 'up') {
  const el = ref(null)

  onMounted(() => {
    const node = el.value
    if (!node) return
    node.classList.add('reveal', `reveal--${variant}`)
    if (prefersReducedMotion()) {
      node.classList.add('is-revealed')
      return
    }
    if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`)
    node.classList.add('reveal-armed')
    getObserver().observe(node)
  })

  onBeforeUnmount(() => {
    if (el.value && observer) observer.unobserve(el.value)
  })

  return el
}
