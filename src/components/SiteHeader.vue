<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Logo from './ui/Logo.vue'
import { company, nav } from '../data/content.js'

const fixed = ref(false)
const menuOpen = ref(false)
const activeHref = ref(nav[0].href)

/*
  Scroll-spy. Rather than an IntersectionObserver — which reports whichever
  section happens to be intersecting and gets ambiguous when two are on screen
  at once — this picks the section whose top is the last one above the reading
  line, so exactly one item is ever active and it changes at a predictable point.
*/
const READING_LINE = 140   // just below the fixed header

function onScroll () {
  fixed.value = window.scrollY > 120

  const atBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  if (atBottom) {
    activeHref.value = nav[nav.length - 1].href
    return
  }

  /* Ordered by where the section actually sits on the page, not by where it sits
     in the menu — the two are not the same, and walking the menu order picks the
     wrong item wherever they disagree. */
  const passed = nav
    .filter((item) => item.href !== '#top')
    .map((item) => ({ href: item.href, top: document.querySelector(item.href)?.getBoundingClientRect().top }))
    .filter((s) => s.top !== undefined && s.top <= READING_LINE)
    .sort((a, b) => a.top - b.top)

  activeHref.value = passed.length ? passed[passed.length - 1].href : nav[0].href
}

function closeMenu () {
  menuOpen.value = false
}

function onKeydown (e) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="hdr" :class="{ 'hdr--fixed': fixed, 'hdr--open': menuOpen }">
    <div class="hdr__row bleed">
      <a class="hdr__brand" href="#top" aria-label="Teknicon Ltd — home">
        <Logo
          :variant="fixed ? 'dark' : 'knockout'"
          :size="fixed ? 'sm' : 'md'"
          :show-tagline="false"
        />
      </a>

      <nav class="hdr__nav" aria-label="Primary">
        <ul class="menu">
          <li v-for="item in nav" :key="item.href">
            <a
              :href="item.href"
              :class="{ 'is-active': item.href === activeHref }"
              :aria-current="item.href === activeHref ? 'true' : undefined"
            ><span>{{ item.label }}</span></a>
          </li>
        </ul>
      </nav>

      <div class="hdr__rail">
        <a class="hdr__phone" :href="`tel:${company.phoneHref}`">{{ company.phone }}</a>
        <a class="btn btn--sm hdr__cta" href="#contact">
          <span class="btn__label">Request a proposal</span>
        </a>
        <button
          class="hdr__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="visually-hidden">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
          <span class="hdr__burger-bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>
    </div>

    <!-- mobile fullscreen panel -->
    <div id="mobile-menu" class="mnav" :hidden="!menuOpen">
      <ul class="mnav__list">
        <li v-for="item in nav" :key="item.href">
          <a
            :href="item.href"
            :class="{ 'is-active': item.href === activeHref }"
            :aria-current="item.href === activeHref ? 'true' : undefined"
            @click="closeMenu"
          >{{ item.label }}</a>
        </li>
      </ul>
      <div class="mnav__foot">
        <a :href="`tel:${company.phoneHref}`">{{ company.phone }}</a>
        <a :href="`mailto:${company.email}`">{{ company.email }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
}

.hdr__row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 34px;
  padding-block: 22px;
  transition: padding var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

/* the only scrim over the hero: black → transparent at .4 */
.hdr__row::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(180deg, #000000 0%, #00000000 100%);
  opacity: .4;
  transition: opacity var(--dur) var(--ease);
}

.hdr--fixed .hdr__row {
  padding-block: 10px;
  background-color: var(--c-bg);
  border-bottom: 1px solid var(--c-bd);
}
.hdr--fixed .hdr__row::before { opacity: 0; }

.hdr__brand { display: inline-flex; }

.hdr__nav { margin-left: 1.6vw; }

.menu {
  display: flex;
  align-items: center;
}
.menu > li > a {
  position: relative;
  display: block;
  padding: .9em;
  font-size: 17px;
  line-height: 1.5em;
  font-weight: 500;
  letter-spacing: 0;
  color: #fff;
  transition: color var(--dur) var(--ease);
}
.menu > li > a::after {
  content: "";
  display: block;
  position: relative;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width .2s var(--ease);
}
.menu > li > a:hover::after,
.menu > li > a:focus-visible::after,
.menu > li > a.is-active::after { width: 100%; }

.hdr--fixed .menu > li > a { color: var(--c-text-dark); }

/*
  Over the hero the row sits on photography, so navy would disappear — there the
  underline alone carries hover and the label just brightens to pure white.
  Once the row is fixed on the light ground, hover and active both take the
  brand navy; the persistent underline is what separates active from hovered.
*/
.menu > li > a:hover,
.menu > li > a:focus-visible { color: #fff; }

.hdr--fixed .menu > li > a:hover,
.hdr--fixed .menu > li > a:focus-visible,
.hdr--fixed .menu > li > a.is-active { color: var(--c-heading); }

/* Deliberately no weight change on the active item: bolding it would reflow the
   whole row every time you scroll past a section boundary. Colour plus the
   persistent underline is signal enough. */

.hdr__rail {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-left: auto;
}

.hdr__phone {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  color: #fff;
  white-space: nowrap;
}
.hdr__phone:hover { color: #fff; opacity: .75; }
.hdr--fixed .hdr__phone { color: var(--c-text-dark); }
.hdr--fixed .hdr__phone:hover { color: var(--c-link); opacity: 1; }

.hdr__cta { flex-shrink: 0; }

.hdr__burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.hdr__burger-bars { display: block; width: 24px; }
.hdr__burger-bars i {
  display: block;
  height: 2px;
  background: #fff;
  transition: background var(--dur) var(--ease);
}
.hdr__burger-bars i + i { margin-top: 5px; }
.hdr--fixed .hdr__burger-bars i { background: var(--c-text-dark); }

/* ---------------- mobile ---------------- */

.mnav {
  display: none;
  background: var(--d-bg);
  padding: 34px var(--edge-pad) 44px;
}
.mnav__list > li + li { border-top: 1px solid var(--d-bd); }
.mnav__list a {
  display: block;
  padding: 15px 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -.5px;
  color: #fff;
}
.mnav__list a:hover { color: var(--c-link); }
/* the panel is on --d-bg, where the brand navy would vanish — the red accent
   carries the active item instead, with a rule to match the desktop underline */
.mnav__list a.is-active {
  color: var(--c-link);
  box-shadow: inset 0 -2px 0 var(--c-link);
}
.mnav__foot {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 28px;
  font-size: 15px;
}
.mnav__foot a { color: var(--d-text); }

@media (max-width: 1279px) {
  .hdr__nav, .hdr__phone { display: none; }
  .hdr__burger { display: inline-flex; }
  .mnav { display: block; max-height: calc(100dvh - 76px); overflow-y: auto; }
  .mnav[hidden] { display: none; }
  .hdr--open { background: var(--d-bg); }
  .hdr--open .hdr__row::before { opacity: 0; }
}

@media (max-width: 639px) {
  .hdr__cta { display: none; }
  .hdr__row { gap: 12px; }
}
</style>
