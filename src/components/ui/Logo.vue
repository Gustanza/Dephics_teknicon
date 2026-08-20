<script setup>
import markUrl from '../../assets/brand/mark.svg'

/**
 * Vector redraw of the double-diamond mark paired with a DM Sans 700 wordmark.
 * `variant: 'knockout'` = white wordmark + red mark, for the hero and footer.
 * `variant: 'dark'`     = navy wordmark + red mark, for the fixed header.
 */
defineProps({
  variant: { type: String, default: 'dark' },
  size: { type: String, default: 'md' },
  showTagline: { type: Boolean, default: true }
})
</script>

<template>
  <span class="logo" :class="[`logo--${variant}`, `logo--${size}`]">
    <img class="logo__mark" :src="markUrl" alt="" aria-hidden="true" width="200" height="144" />
    <span class="logo__type">
      <span class="logo__word">Teknicon</span>
      <span v-if="showTagline" class="logo__tag">Consulting Engineers and Project Managers</span>
    </span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  line-height: 1;
}

.logo__mark {
  flex-shrink: 0;
  width: auto;
  height: 28px;
}

.logo__type {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.logo__word {
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -1.1px;
  color: var(--c-link2);
}

.logo__tag {
  font-size: 8.5px;
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--c-text-light);
  white-space: nowrap;
}

/* knockout — over the hero and in the footer */
.logo--knockout .logo__word { color: #fff; }
.logo--knockout .logo__tag { color: rgba(255, 255, 255, .72); }

/* sizes */
.logo--sm .logo__mark { height: 22px; }
.logo--sm .logo__word { font-size: 21px; letter-spacing: -.9px; }
.logo--sm .logo__tag { font-size: 7.5px; }

.logo--lg .logo__mark { height: 38px; }
.logo--lg .logo__word { font-size: 34px; letter-spacing: -1.5px; }
.logo--lg .logo__tag { font-size: 11px; }

@media (max-width: 479px) {
  .logo__tag { display: none; }
  .logo__word { font-size: 22px; }
  .logo__mark { height: 24px; }
  /* the footer lockup keeps its tagline — it is the one place it earns its space */
  .logo--lg .logo__tag { display: block; font-size: 8px; }
  .logo--lg .logo__word { font-size: 28px; }
  .logo--lg .logo__mark { height: 32px; }
}
</style>
