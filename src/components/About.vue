<script setup>
import Reveal from './ui/Reveal.vue'
import { about } from '../data/content.js'

/*
  The profile's Introduction and "Background and Organization" pages (4-5).

  Four theme moves carry it, so it does not read as a plain two-column text block:
    · a ghost "01" numeral behind the eyebrow, echoing the profile's own section tab
      and the theme's oversized low-alpha figures (THEME_DNA §7.3)
    · an offset, overlapping image pair — the theme's about-page pattern — cut out of
      each other with a band-coloured inset rather than a shadow (§11.2)
    · the accent underline under one phrase of the heading, a Fuse signature
    · the three departments promoted to a full-width hairline cell grid (§7.1),
      the same construction as the client strip

  The heading is written out here rather than using SectionHeading, because one
  phrase of it has to carry the underline.
*/
</script>

<template>
  <section id="about" class="section band--white ab">
    <div class="container">
      <div class="ab__grid">
        <figure class="ab__media">
          <div class="ab__stack">
            <Reveal class="ab__mainwrap" variant="fade">
              <img
                class="ab__img ab__img--main"
                :src="about.image.src"
                :width="about.image.w"
                :height="about.image.h"
                :alt="about.image.alt"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal class="ab__inset" variant="fade" :delay="180">
              <img
                class="ab__img ab__img--inset"
                :src="about.imageAlt2.src"
                :width="about.imageAlt2.w"
                :height="about.imageAlt2.h"
                :alt="about.imageAlt2.alt"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>

          <figcaption class="ab__caps">
            <span>{{ about.image.caption }}</span>
            <span>{{ about.imageAlt2.caption }}</span>
          </figcaption>
        </figure>

        <div class="ab__body">
          <Reveal class="ab__head-reveal" variant="fade">
            <div class="ab__head">
              <span class="ab__index" aria-hidden="true">{{ about.index }}</span>
              <span class="eyebrow eyebrow--dash">{{ about.eyebrow }}</span>
              <h2 class="ab__title">
                <span v-for="line in about.title" :key="line" class="ab__line">{{ line }}</span>
                <span class="ab__line ab__line--accent">{{ about.titleAccent }}</span>
              </h2>
            </div>
          </Reveal>

          <Reveal class="ab__paras-reveal" variant="fade" :delay="100">
            <p v-for="para in about.paragraphs" :key="para" class="ab__para">{{ para }}</p>
          </Reveal>

          <Reveal class="ab__objective-reveal" variant="fade" :delay="200">
            <blockquote class="ab__objective">{{ about.objective }}</blockquote>
          </Reveal>
        </div>
      </div>

      <Reveal class="ab__depts" variant="fade">
        <div class="ab__depts-head">
          <p class="ab__depts-intro">{{ about.departmentsIntro }}</p>
          <a class="ab__depts-link" :href="about.departmentsLink.href">
            {{ about.departmentsLink.label }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <ul class="ab__depts-grid">
          <li v-for="d in about.departments" :key="d.n" class="ab__dept">
            <span class="ab__dept-n" aria-hidden="true">{{ d.n }}</span>
            <span class="ab__dept-name">{{ d.name }}</span>
          </li>
        </ul>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.ab__grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: var(--grid-gap) 80px;
  /* stretch, not start: the photo column is sized by the narrative beside it, so the
     two always end together whatever the viewport does to the text's line count */
  align-items: stretch;
}

/* ---------- images ---------- */

.ab__media {
  margin: 0;
  display: flex;
  flex-direction: column;
}

/*
  Two frames at an unequal offset. The inset reaches into the column gutter and hangs
  below the main frame; its inset border is the band colour, so the overlap reads as a
  cut-out — the theme separates surfaces with tone and hairlines, never a shadow.
  Both captions sit together beneath the stack, clear of the overlap.
*/
.ab__stack {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 430px;      /* never let a short narrative crush the photograph */
  padding-bottom: 86px;   /* the inset's overhang */
}
.ab__mainwrap { flex: 1; min-height: 0; display: flex; }

.ab__img {
  display: block;
  width: 100%;
  border-radius: var(--rad);
  object-fit: cover;
}
.ab__img--main {
  flex: 1;
  min-height: 0;
  height: 100%;
  object-position: 50% 38%;
}
.ab__img--inset { aspect-ratio: 4 / 3; object-position: 50% 40%; }

.ab__inset {
  position: absolute;
  right: -56px;
  bottom: 0;
  width: 62%;
  padding: 12px 0 0 12px;
  background-color: var(--c-bg-alt);
}

.ab__caps {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 22px;
  padding-top: 13px;
  border-top: 1px solid var(--c-bd);
  font-size: 13px;
  line-height: 1.5;
  color: var(--c-text-light);
}

/* ---------- heading ---------- */

.ab__head { position: relative; }

/* the profile tabs this section "01"; the theme sets such figures oversized at very
   low alpha behind the type (§7.3) */
.ab__index {
  position: absolute;
  top: -.34em;
  right: 0;
  font-size: 10em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -6px;
  color: var(--c-dark-003);
  pointer-events: none;
  user-select: none;
}

.ab__title {
  position: relative;
  margin: 0 0 .1em -1px;   /* optical flush-left for the tight tracking */
}
.ab__line { display: block; }

/* Fuse underlines one phrase of a heading in the accent colour. Drawn as a background
   image so the rule sits under the descenders rather than through them. */
.ab__line--accent {
  display: inline-block;
  background-image: linear-gradient(var(--c-brand-red), var(--c-brand-red));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 3px;
  padding-bottom: 6px;
}

/* ---------- body ---------- */

.ab__para {
  margin: 1.35em 0 0;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

.ab__objective {
  margin: var(--space-small) 0 0;
  padding-left: 30px;
  border-left: 2px solid var(--c-brand-red);
  font-size: 19px;
  line-height: 1.55em;
  font-weight: 500;
  letter-spacing: -.3px;
  color: var(--c-heading);
}

/* ---------- departments ---------- */

.ab__depts { margin-top: var(--space-large); }

.ab__depts-head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 30px;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
}
.ab__depts-intro {
  margin: 0;
  font-size: 15px;
  color: var(--c-text-light);
}
.ab__depts-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
  color: var(--c-link);
}
.ab__depts-link svg {
  width: 17px;
  height: 17px;
  transition: transform var(--dur) var(--ease);
}
.ab__depts-link:hover svg { transform: translateX(5px); }

/* the §7.1 hairline cell grid, the same construction as the client strip */
.ab__depts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--c-bd);
  border-bottom: 1px solid var(--c-bd);
}
.ab__dept {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 28px 34px 28px 0;
  transition: background-color var(--dur) var(--ease);
}
.ab__dept + .ab__dept { border-left: 1px solid var(--c-bd); padding-left: 34px; }
.ab__dept:hover { background-color: var(--c-bg); }

.ab__dept-n {
  flex-shrink: 0;
  font-size: 2em;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1.2px;
  font-variant-numeric: tabular-nums;
  color: var(--c-bd);
  transition: color var(--dur) var(--ease);
}
.ab__dept:hover .ab__dept-n { color: var(--c-brand-red); }

.ab__dept-name {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-heading);
}

/* ---------- responsive ---------- */

@media (max-width: 1279px) {
  .ab__grid { gap: var(--grid-gap) 50px; }
  .ab__inset { right: -28px; width: 66%; }
  .ab__index { font-size: 8em; }
}

@media (max-width: 1023px) {
  .ab__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  /*
    Below the two-column layout, a photo landing first with no label above it reads
    as a stray image rather than part of this section. .ab__body carries no styling
    of its own — display:contents drops its box and promotes its three Reveal
    children (head, paragraphs, objective) to grid items alongside .ab__media, so
    they can be reordered into a heading → photo → copy narrative that always
    introduces the section before showing a picture of it.
  */
  .ab__body { display: contents; }
  .ab__head-reveal { order: 1; }
  .ab__media { order: 2; }
  .ab__paras-reveal { order: 3; }
  .ab__objective-reveal { order: 4; }
  /* the overlap needs two columns to lean into — below that the frames stack */
  .ab__stack { padding-bottom: 0; }
  .ab__inset {
    position: static;
    width: 100%;
    margin-top: var(--space-small);
    padding: 0;
  }
  /* single column — nothing to match heights against, so the frame takes a ratio */
  .ab__stack { display: block; min-height: 0; }
  .ab__img--main { height: auto; aspect-ratio: 16 / 10; }
  .ab__index { right: auto; left: 0; top: -.28em; }
  .ab__depts-grid { grid-template-columns: 1fr 1fr; }
  .ab__dept:nth-child(3) { border-left: 0; padding-left: 0; border-top: 1px solid var(--c-bd); }
}

@media (max-width: 639px) {
  .ab__index { display: none; }
  .ab__objective { padding-left: 20px; font-size: 17px; letter-spacing: 0; }
  .ab__line--accent { background-size: 100% 2px; padding-bottom: 4px; }
  .ab__depts-grid { grid-template-columns: 1fr; }
  .ab__dept { padding: 22px 0; }
  .ab__dept + .ab__dept { border-left: 0; padding-left: 0; border-top: 1px solid var(--c-bd); }
}
</style>
