<script setup>
import Reveal from './ui/Reveal.vue'
import { company, visionBand } from '../data/content.js'

/* IA "Vision, Mission & Values": the vision statement, then the quality-driven
   approach (the profile's objective) and the core principles. No Mission or Values
   labels — the profile has neither; see visionBand in content.js. */
const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section class="section band--dark vis" aria-label="Vision, objective and core principles">
    <div class="container vis__inner">
      <Reveal variant="fade">
        <!-- figure + figcaption, not a <footer> inside the blockquote: the spec puts
             attribution outside the quote, and it keeps the page to exactly one
             <footer> element even though the old one was never a second landmark. -->
        <span class="eyebrow vis__eyebrow">{{ visionBand.eyebrow }}</span>
        <figure class="vis__figure">
          <blockquote class="vis__quote">
            <p>{{ company.vision }}</p>
          </blockquote>
          <figcaption class="vis__author">{{ company.visionAttribution }}</figcaption>
        </figure>
      </Reveal>

      <div class="vis__more">
        <Reveal variant="fade" class="vis__objective">
          <h2 class="eyebrow">{{ visionBand.objective.label }}</h2>
          <p class="vis__objective-text">{{ visionBand.objective.text }}</p>
        </Reveal>
        <Reveal variant="fade" :delay="100" class="vis__principles">
          <h2 class="eyebrow">{{ visionBand.principles.label }}</h2>
          <ol class="vis__grid">
            <li v-for="(p, i) in visionBand.principles.items" :key="p" class="vis__cell">
              <span class="vis__n" aria-hidden="true">{{ pad(i) }}</span>
              <span class="vis__name">{{ p }}</span>
            </li>
          </ol>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Flat colour, no texture. The demo's factory-texture PNG has no Teknicon
  equivalent, and a dimmed portfolio photograph is not a substitute (§7.5).
  Instead the two dark bands are separated the way the theme separates every
  other surface: one tonal step (#0B0E24 → #141733) and a 1px hairline, so the
  counters band and the vision band read as two bands rather than one field.
*/
/* The mid rung of the navy ladder. Like the footer, the ground is light enough
   that the muted text and the hairline have to be lifted for it — #8D91B1 drops
   to 4.12:1 here. Custom properties inherit, so the subtree picks these up. */
.vis {
  --d-text-light: #9CA1C9;  /* 5.04:1 on the mid navy */
  --d-bd: #4A5296;
  overflow: hidden;
  padding-top: var(--space-large);
  background-color: var(--d-bg-mid);
  border-top: 1px solid var(--d-bd);
}

.vis__inner { position: relative; z-index: 1; }

.vis__figure { margin: 0; }

.vis__quote {
  margin: 0 auto;
  max-width: 70%;
  text-align: center;
}

.vis__quote p {
  margin: 0;
  font-size: clamp(27px, 6px + 3.13vw, 46px);
  line-height: 1.05em;
  font-weight: 700;
  letter-spacing: -1.8px;
  color: var(--d-text-dark);
}
@media (min-width: 1280px) {
  .vis__quote p { font-size: var(--h1-size); line-height: var(--h1-lh); }
}

.vis__author {
  margin-top: 2.3em;
  text-align: center; /* under a centred quote — it was sitting flush left */
  font-size: 15px;
  line-height: 1.333em;
  letter-spacing: 0;
  color: var(--d-text-light);
}

/* centred eyebrow over the centred quote — the theme's centred intro pattern */
.vis__eyebrow { display: block; margin-bottom: 1.4em; text-align: center; }

/* objective | principles: one hairline across the band, then an unequal split
   (THEME_DNA §11.9 — not everything centred) */
.vis__more {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: var(--space-small) 80px;
  margin-top: var(--space-large);
  padding-top: var(--space-medium);
  border-top: 1px solid var(--d-bd);
}
.vis__more .eyebrow { margin: 0 0 1.4em; }

.vis__objective-text {
  margin: 0;
  font-size: 19px;
  line-height: 1.55em;
  color: var(--d-text);
}

/* the four principles as one ruled list — a 2 × 2 grid let the longest phrase wrap
   while its row partner did not, so the rows went uneven */
.vis__grid { border-top: 1px solid var(--d-bd); }
.vis__cell {
  display: flex;
  gap: 20px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid var(--d-bd);
}
.vis__n {
  flex-shrink: 0;
  /* equal-width figures in a fixed box, so every principle starts on one line —
     proportional "01" was 4px narrower than "02" */
  min-width: 2.2em;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.8px;
  color: var(--d-text-light);
}
.vis__name {
  font-size: var(--h6-size);
  line-height: var(--h6-lh);
  font-weight: 700;
  letter-spacing: var(--h6-ls);
  color: var(--d-text-dark);
}

@media (max-width: 1023px) {
  .vis__quote { max-width: 100%; }
  .vis__more { grid-template-columns: 1fr; }
}

@media (max-width: 767px) {
  .vis__quote p { letter-spacing: 0; }
}
</style>
