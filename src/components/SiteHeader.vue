<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './ui/Logo.vue'
import { company, nav, primaryCta } from '../data/content.js'

/*
  The scroll-spy that used to live here is gone. It existed because the whole site
  was one page with anchor navigation; the client rejected that (IA feedback C1), so
  the active item is now simply the current route and vue-router tracks it for us
  via router-link-active.

  The header still goes from transparent to fixed on scroll — every page opens on a
  dark photographic masthead (Hero on the homepage, PageHero elsewhere), so the
  knockout logo and white menu read correctly at the top of all of them.
*/
const route = useRoute()
const fixed = ref(false)
const menuOpen = ref(false)

function onScroll () { fixed.value = window.scrollY > 120 }
function closeMenu () { menuOpen.value = false }
function onKeydown (e) { if (e.key === 'Escape') closeMenu() }

/* a route change must never leave the mobile panel hanging open */
watch(() => route.fullPath, closeMenu)

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
      <RouterLink class="hdr__brand" to="/" aria-label="Teknicon Ltd — home">
        <Logo
          :variant="fixed ? 'dark' : 'knockout'"
          :size="fixed ? 'sm' : 'md'"
        />
      </RouterLink>

      <nav class="hdr__nav" aria-label="Primary">
        <ul class="menu">
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to"><span>{{ item.label }}</span></RouterLink>
          </li>
        </ul>
      </nav>

      <div class="hdr__rail">
        <a class="hdr__phone" :href="`tel:${company.phoneHref}`">{{ company.phone }}</a>
        <RouterLink class="btn btn--sm hdr__cta" :to="primaryCta.to">
          <span class="btn__label">{{ primaryCta.label }}</span>
        </RouterLink>
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
        <li v-for="item in nav" :key="item.to">
          <RouterLink :to="item.to" @click="closeMenu">{{ item.label }}</RouterLink>
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
  /* Two-word labels ("About Us", "Contact Us") were breaking onto a second line at
     1280-1440 — the commonest laptop widths — which pushed the header from 102px to
     128px and looked like a mistake. It was never a space problem: the row still had
     ~228px of slack, the labels were simply allowed to wrap. The nav is hidden below
     1280 anyway, so nowrap cannot cause an overflow. */
  white-space: nowrap;
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
.menu > li > a.router-link-active::after { width: 100%; }

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
.hdr--fixed .menu > li > a.router-link-active { color: var(--c-heading); }

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
  background: var(--d-bg-brand);
  /* the footer sits on this same ground and lifts its hairline the same way —
     the default --d-bd is tuned for the much darker --d-bg and nearly vanishes here */
  --d-bd: #676FB1;
  /* and the same remap: --c-link drives both the hover and the active item here,
     and it is 2.00:1 against this navy */
  --c-link: var(--c-link-on-navy);
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
/* the red accent carries the active item instead of a navy fill, matching the
   desktop underline treatment */
.mnav__list a.router-link-active {
  color: var(--c-link);
  /* Drawn as a background rule rather than an inset box-shadow: the theme has no
     shadows at all (THEME_DNA §11.2) and a background keeps that invariant literally
     true, so the audit census stays meaningful. Same technique as the accent
     underline in About.vue. */
  background-image: linear-gradient(var(--c-link), var(--c-link));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 2px;
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
  .hdr--open { background: var(--d-bg-brand); }
  .hdr--open .hdr__row::before { opacity: 0; }
}

@media (max-width: 639px) {
  .hdr__cta { display: none; }
  .hdr__row { gap: 12px; }
}
</style>
