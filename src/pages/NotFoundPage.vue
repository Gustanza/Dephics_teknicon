<script setup>
import Button from '../components/ui/Button.vue'
</script>

<template>
  <section class="section band--paper nf">
    <div class="container nf__inner">
      <span class="nf__code" aria-hidden="true">404</span>
      <h1 class="nf__title">This page has moved, or never existed</h1>
      <p class="nf__lede">
        Check the address, or start again from the homepage. Every section of the site is
        reachable from the main menu.
      </p>
      <div class="nf__actions">
        <Button to="/" label="Back to the homepage" />
        <Button to="/contact" label="Contact us" variant="navy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.nf__inner { max-width: 62ch; }
.nf__code {
  display: block;
  font-size: 10em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -6px;
  color: var(--c-dark-003);
}
.nf__title { margin: 0 0 .5em; }
.nf__lede { font-size: 1rem; line-height: var(--body-lh); color: var(--c-text); }
.nf__actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: var(--space-small); }
</style>
