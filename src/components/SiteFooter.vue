<script setup>
import Logo from './ui/Logo.vue'
import { company, footer } from '../data/content.js'

/* 24x24 stroke glyphs for the contact lines. Inline, matching Quality.vue, so
   the page still ships no icon font. */
const paths = {
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  phone: 'M5 3h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  /* Social marks drawn as the glyph itself, not inside an enclosing square — boxed
     versions turn to mush at the 17px they actually render at. */
  linkedin: 'M5 10v9M5 5.6v.02M11 19v-9M11 13.8a3.4 3.4 0 0 1 6.8 0V19',
  instagram: 'M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.2 6.8v.02',
  facebook: 'M14.5 4h-1.8A3.7 3.7 0 0 0 9 7.7V10.5H6.2V14H9v7M9 14h4.4',
  x: 'M4.5 4l15 16M19.5 4l-15 16'
}
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
              <a :href="link.href" :class="{ 'is-strong': link.strong }">
                <svg
                  v-if="link.icon"
                  class="ftr__icon"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                ><path :d="paths[link.icon]" /></svg>
                <span>{{ link.label }}</span>
              </a>
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
  font-size: 1rem;   /* 17px — matches the other columns (was 15px) */
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

.ftr__links { display: flex; flex-direction: column; gap: 10px; }
.ftr__icon {
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  /* nudge the glyph onto the text baseline rather than the line box centre */
  margin-top: 4px;
  opacity: .75;
  transition: opacity var(--dur) var(--ease);
}
.ftr__links a {
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--d-text);
  border-bottom: 1px solid transparent;
  transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
/* .is-strong must be declared BEFORE the hover rule: both are (0,2,1), so whichever
   comes last wins, and with it last the phone number kept its white on hover while
   only its underline turned red. */
.ftr__links a.is-strong { font-weight: 700; color: var(--d-text-dark); }

.ftr__links a:hover,
.ftr__links a:focus-visible { color: var(--c-link); border-bottom-color: var(--c-link); }
.ftr__links a:hover .ftr__icon,
.ftr__links a:focus-visible .ftr__icon { opacity: 1; }

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
