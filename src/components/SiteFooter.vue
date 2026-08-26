<script setup>
import Logo from './ui/Logo.vue'
import { company, footer } from '../data/content.js'
</script>

<template>
  <footer id="contact" class="ftr">
    <div class="container ftr__inner">
      <div class="ftr__grid">
        <div class="ftr__col ftr__col--brand">
          <Logo variant="knockout" size="lg" />
          <p class="ftr__blurb">{{ footer.blurb }}</p>
        </div>

        <div v-for="col in footer.columns" :key="col.heading" class="ftr__col">
          <h3 class="ftr__heading">{{ col.heading }}</h3>

          <address v-if="col.type === 'address'" class="ftr__address">
            <span v-for="line in col.lines" :key="line">{{ line }}</span>
          </address>

          <ul v-else-if="col.type === 'links'" class="ftr__links">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" :class="{ 'is-strong': link.strong }">{{ link.label }}</a>
            </li>
          </ul>

          <ul v-else class="ftr__list">
            <li v-for="line in col.lines" :key="line">{{ line }}</li>
          </ul>
        </div>
      </div>

      <div class="ftr__bar">
        <p>{{ footer.copyright }}</p>
        <p>{{ footer.registrations }}</p>
      </div>
    </div>

    <span class="visually-hidden">{{ company.name }} — {{ company.tagline }}</span>
  </footer>
</template>

<style scoped>
/*
  The full brand navy, matching the profile's back cover, which sets the contact
  block on exactly this panel. Because the ground is much lighter than the other
  dark bands, the muted text and the hairline are lifted for it — #8E93B0 drops
  to 3.36:1 here and #3A3E63 is invisible at 1.01:1. Custom properties inherit,
  so the whole subtree picks these up.
*/
.ftr {
  --d-text-light: #AFB3D6;  /* 4.95:1 on the navy */
  --d-bd: #676FB1;
  background-color: var(--d-bg-brand);
  color: var(--d-text);
}

.ftr__inner { padding-top: var(--space-large); }

.ftr__grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr 1fr;
  gap: var(--grid-gap);
}

.ftr__col--brand { padding-right: 40px; }

.ftr__blurb {
  margin: 24px 0 0;
  max-width: 38ch;
  font-size: 15px;
  line-height: 1.65em;
  color: var(--d-text-light);
}

.ftr__heading {
  margin: 0 0 6px;
  font-size: 19px;
  line-height: 1.474em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--d-text-dark);
}

.ftr__address {
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.65em;
  color: var(--d-text);
}

.ftr__links { display: flex; flex-direction: column; gap: 6px; }
.ftr__links a {
  color: var(--d-text);
  border-bottom: 1px solid transparent;
  transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.ftr__links a:hover { color: var(--c-link); border-bottom-color: var(--c-link); }
.ftr__links a.is-strong { font-weight: 700; color: var(--d-text-dark); }

.ftr__list { color: var(--d-text); line-height: 1.65em; }

.ftr__bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 30px;
  justify-content: space-between;
  margin-top: var(--space-medium);
  padding-block: 20px;
  border-top: 1px solid var(--d-bd);
  font-size: 16px;
  line-height: 1.2em;
  color: var(--d-text-light);
}
.ftr__bar p { margin: 0; }

@media (max-width: 1023px) {
  .ftr__grid { grid-template-columns: 1fr 1fr; row-gap: var(--space-small); }
  .ftr__col--brand { grid-column: 1 / -1; padding-right: 0; }
}

@media (max-width: 639px) {
  .ftr__grid { grid-template-columns: 1fr; gap: 24px; }
}
</style>
