<script setup>
import PageHero from '../components/PageHero.vue'
import SplitCta from '../components/SplitCta.vue'
import Button from '../components/ui/Button.vue'
import Reveal from '../components/ui/Reveal.vue'
import SampleTag from '../components/ui/SampleTag.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { insights, insightsResources as ir } from '../data/content.js'
import { postPath, posts, vacancies } from '../data/lookup.js'

/*
  "Insights 2" — IA section 6 as the document wrote it: News & Updates, Publications /
  Downloads, Career, in that order. Shown beside "Insights 1" (the client's WhatsApp
  version, /insights) so the client can choose. All copy is in content.js; sample
  items carry a "Sample" tag and vanish with insightsResources.showSamples.

  Theme moves (THEME_DNA):
    news      — the unequal pairing the theme uses for featured work (§11.9): one lead
                article large, the rest as compact rows beside it
    downloads — a white card on the paper band with a circular icon chip (§4)
    career    — the sticky-intro split (§12 row 5): the intro and how-to-apply park
                on the left while the openings scroll on the right
*/
const lead = posts[0]
const rest = posts.slice(1)
const anySample = (list) => list.some((i) => i.sample)
/* 24×24 stroke glyphs — inline, no icon font */
const icons = {
  bridge: 'M2 17h20M4 17v-4a8 8 0 0 1 16 0v4M8 17v-3M12 17v-4M16 17v-3',
  water: 'M12 3s6 6.4 6 10.5A6 6 0 0 1 6 13.5C6 9.4 12 3 12 3z',
  road: 'M8 3 4 21M16 3l4 18M12 5v2M12 11v2M12 17v2',
  office: 'M4 21V5h10v16M14 9h6v12M7 9h4M7 13h4M7 17h4M2 21h20',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  calendar: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7'
}
const applyHref = (v) => `mailto:${ir.careers.email}?subject=${encodeURIComponent(v.title)}`
const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Insights', to: '/insights' }
]
</script>

<template>
  <PageHero
    :eyebrow="ir.hero.eyebrow"
    :lines="ir.hero.title"
    :lede="ir.hero.lede"
    :image="ir.hero.image"
    :w="ir.hero.w"
    :h="ir.hero.h"
    :focus="ir.hero.focus"
    :crumbs="crumbs"
  />

  <!-- ------------------------------------------------ News & Updates -->
  <section v-if="posts.length" id="news" class="section band--white nw">
    <div class="container">
      <Reveal variant="fade" class="nw__head">
        <SectionHeading :eyebrow="ir.news.eyebrow" :lines="ir.news.title" dash />
        <p v-if="anySample(posts)" class="nw__sample-note">{{ ir.news.sampleNote }}</p>
      </Reveal>

      <div class="nw__grid">
        <!-- the lead article -->
        <Reveal as="article" variant="fade" class="nw__lead">
          <RouterLink v-if="lead.image" :to="postPath(lead.slug)" class="nw__lead-thumb" tabindex="-1" aria-hidden="true">
            <img :src="lead.image.src" :alt="''" :width="lead.image.w" :height="lead.image.h" loading="lazy" />
          </RouterLink>
          <div class="nw__lead-body">
            <p class="nw__meta">
              <span>{{ lead.category }} · {{ lead.date }}</span>
              <SampleTag v-if="lead.sample" />
            </p>
            <h3 class="nw__lead-title">
              <RouterLink :to="postPath(lead.slug)">{{ lead.title }}</RouterLink>
            </h3>
            <p class="nw__excerpt">{{ lead.excerpt }}</p>
            <RouterLink :to="postPath(lead.slug)" class="nw__more">
              {{ ir.news.readMore }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </RouterLink>
          </div>
        </Reveal>

        <!-- the rest, as compact rows -->
        <ul class="nw__list">
          <Reveal v-for="(p, i) in rest" :key="p.slug" as="li" variant="fade" :delay="(i + 1) * 100" class="nw__item">
            <RouterLink :to="postPath(p.slug)" class="nw__thumb" tabindex="-1" aria-hidden="true">
              <img v-if="p.image" :src="p.image.src" alt="" :width="p.image.w" :height="p.image.h" loading="lazy" />
              <!-- an article with no photograph gets a typographic tile, never a
                   borrowed image: its year as a ghost figure on the navy -->
              <span v-else class="nw__tile">{{ p.date.slice(-4) }}</span>
            </RouterLink>
            <div class="nw__item-body">
              <p class="nw__meta">
                <span>{{ p.category }} · {{ p.date }}</span>
                <SampleTag v-if="p.sample" />
              </p>
              <h3 class="nw__item-title">
                <RouterLink :to="postPath(p.slug)">{{ p.title }}</RouterLink>
              </h3>
              <RouterLink :to="postPath(p.slug)" class="nw__more nw__more--sm">
                {{ ir.news.readMore }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </RouterLink>
            </div>
          </Reveal>
        </ul>
      </div>
    </div>
  </section>

  <!-- --------------------------------------- Publications / Downloads -->
  <section id="downloads" class="section band--paper dl">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="ir.downloads.eyebrow" :lines="ir.downloads.title" dash />
      </Reveal>

      <ul class="dl__grid" :class="{ 'dl__grid--single': insights.downloads.items.length === 1 }">
        <Reveal v-for="d in insights.downloads.items" :key="d.title" as="li" class="dl__card">
          <span class="dl__chip" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 3h8l4 4v14H6zM14 3v4h4M12 10v7M9 14l3 3 3-3" />
            </svg>
          </span>
          <div class="dl__body">
            <h3 class="dl__title">{{ d.title }}</h3>
            <p class="dl__note">{{ d.note }}</p>
            <p class="dl__meta">{{ d.meta }}</p>
          </div>
          <Button class="dl__btn" :href="d.href" :label="ir.downloads.button" size="sm" />
        </Reveal>
      </ul>
    </div>
  </section>

  <!-- --------------------------------------------------------- Career -->
  <section id="career" class="section band--white cr">
    <div class="container">
      <Reveal variant="fade" class="cr__head">
        <SectionHeading :eyebrow="ir.careers.eyebrow" :lines="ir.careers.title" dash>
          {{ ir.careers.lede }}
        </SectionHeading>
      </Reveal>

      <!-- the four teams: a hairline cell grid with circular icon chips (§7.1, §4) —
           one row replaces a paragraph listing the departments -->
      <Reveal variant="fade" :delay="100">
        <h3 class="visually-hidden">{{ ir.careers.teamsLabel }}</h3>
        <ul class="cr__teams">
          <li v-for="t in ir.careers.teams" :key="t.name" class="cr__team">
            <span class="cr__chip" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[t.icon]" /></svg>
            </span>
            <span class="cr__team-name">{{ t.name }}</span>
            <span class="cr__team-roles">{{ t.roles }}</span>
          </li>
        </ul>
      </Reveal>

      <!-- openings: cards in a row, facts as icons, requirements as short tags -->
      <div class="cr__openings-head">
        <h3 class="cr__label">{{ ir.careers.openingsLabel }}</h3>
        <p v-if="anySample(vacancies)" class="cr__sample-note">{{ ir.careers.sampleNote }}</p>
      </div>
      <ul class="cr__jobs">
        <Reveal v-for="(v, i) in vacancies" :key="v.title" as="li" variant="fade" :delay="i * 100" class="job">
          <p class="job__dept">{{ v.department }}</p>
          <h4 class="job__title">{{ v.title }}</h4>
          <SampleTag v-if="v.sample" class="job__sample" />
          <p class="job__summary">{{ v.summary }}</p>
          <ul class="job__facts">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons.pin" /></svg>
              {{ v.location }}
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons.clock" /></svg>
              {{ v.type }}
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons.calendar" /></svg>
              {{ ir.careers.closesLabel }} {{ v.closes }}
            </li>
          </ul>
          <ul class="job__tags">
            <li v-for="t in v.tags" :key="t">{{ t }}</li>
          </ul>
          <a class="nw__more job__apply" :href="applyHref(v)">
            {{ ir.careers.applyLabel }}
            <span class="visually-hidden">— {{ v.title }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </Reveal>
      </ul>

      <!-- how to apply: one slim strip, not a paragraph -->
      <Reveal variant="fade" class="cr__apply">
        <span class="cr__chip cr__chip--red" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="icons.mail" /></svg>
        </span>
        <p class="cr__apply-text">{{ ir.careers.howTo.text }}</p>
        <Button :href="`mailto:${ir.careers.email}`" :label="ir.careers.howTo.button" size="sm" />
      </Reveal>
    </div>
  </section>

  <SplitCta />
</template>

<style scoped>
/* ---------------------------------------------------------------- news */
.nw__sample-note,
.cr__sample-note {
  margin: 1em 0 0;
  font-size: 14px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

.nw__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: var(--grid-gap) 60px;
  margin-top: var(--space-small);
  align-items: start;
}

.nw__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  align-items: center;
  margin: 0;
  font-size: 14px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

/* image zoom inside a fixed frame on hover (§11.10) — the card never moves */
.nw__lead-thumb,
.nw__thumb {
  display: block;
  overflow: hidden;
  background-color: var(--c-bg);
}
.nw__lead-thumb { aspect-ratio: 16 / 10; }
.nw__lead-thumb img,
.nw__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
}
.nw__lead:hover .nw__lead-thumb img,
.nw__item:hover .nw__thumb img { transform: scale(1.07); }

.nw__lead-body { padding-top: 26px; }
.nw__lead-title {
  margin: .35em 0 0;
  font-size: var(--h3-size);
  line-height: var(--h3-lh);
  letter-spacing: var(--h3-ls);
}
.nw__lead-title a,
.nw__item-title a { color: inherit; }
.nw__lead-title a:hover,
.nw__item-title a:hover { color: var(--c-link); }
.nw__excerpt {
  margin: .9em 0 0;
  max-width: 60ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

.nw__item {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid var(--c-bd);
}
.nw__item:first-child { padding-top: 0; }
.nw__thumb { aspect-ratio: 4 / 3; }
.nw__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--d-bg-brand);
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -1px;
  color: rgba(255, 255, 255, .9);
}
.nw__item-title {
  margin: .3em 0 0;
  font-size: clamp(18px, 17px + .3vw, 21px);
  line-height: 1.25em;
  letter-spacing: -.4px;
}

/* the theme's quiet text link (§3.5): label + arrow, the arrow steps right on hover */
.nw__more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 1.1em;
  font-size: 15px;
  font-weight: 700;
  color: var(--c-link);
}
.nw__more--sm { margin-top: .6em; font-size: 14px; }
.nw__more svg { width: 18px; height: 18px; transition: transform var(--dur) var(--ease); }
.nw__more:hover svg,
.nw__more:focus-visible svg { transform: translateX(5px); }

/* ----------------------------------------------------------- downloads */
.dl__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--grid-gap);
  margin-top: var(--space-small);
}
.dl__card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 24px;
  padding: 2.4em;
  background-color: var(--c-bg-alt);
  border-radius: var(--rad);
}
.dl__chip {
  grid-row: span 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--rad-circle);
  color: var(--c-text-dark);
  background-color: var(--c-bg);
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.dl__chip svg { width: 22px; height: 22px; }
/* hover happens inside the frame (§11.10): the chip inverts, the card never moves */
.dl__card:hover .dl__chip { color: #fff; background-color: var(--c-brand-red); }
.dl__title {
  margin: 0;
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}
.dl__note { margin: 0; font-size: 1rem; line-height: var(--body-lh); color: var(--c-text); }
.dl__meta { margin: 0; font-size: 14px; color: var(--c-text-light); }
.dl__btn { grid-column: 2; justify-self: start; margin-top: 1.1em; }

/* one download: a full-width card, button on the right — half a row left the other
   half of the band empty and read as unfinished */
.dl__grid--single { grid-template-columns: minmax(0, 1fr); }
.dl__grid--single .dl__card { grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; }
.dl__grid--single .dl__chip { grid-row: auto; }
.dl__grid--single .dl__btn { grid-column: 3; margin-top: 0; }

/* -------------------------------------------------------------- career */
.cr__chip {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--rad-circle);
  color: var(--c-text-dark);
  background-color: var(--c-bg);
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.cr__chip svg { width: 22px; height: 22px; }
.cr__chip--red { color: #fff; background-color: var(--c-brand-red); }

/* teams — four hairline cells, the About page's department-grid construction */
.cr__teams {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: var(--space-small);
  border-top: 1px solid var(--c-bd);
  border-bottom: 1px solid var(--c-bd);
}
.cr__team {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 28px 24px 28px 0;
}
.cr__team + .cr__team { padding-left: 24px; border-left: 1px solid var(--c-bd); }
.cr__team .cr__chip { margin-bottom: 10px; }
/* hover inside the frame (§11.10): the chip inverts */
.cr__team:hover .cr__chip { color: #fff; background-color: var(--c-brand-red); }
.cr__team-name {
  font-size: var(--h6-size);
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: var(--h6-ls);
  color: var(--c-heading);
}
.cr__team-roles { font-size: 14px; line-height: 1.5em; color: var(--c-text-light); }

.cr__openings-head {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  align-items: baseline;
  margin-top: var(--space-medium);
}
.cr__label {
  margin: 0;
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}
.cr__sample-note { margin: 0; }

/* job cards — paper tiles on the white band, the theme's 4-point tonal step */
.cr__jobs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--grid-gap);
  margin-top: 20px;
}
.job {
  /* cards in a row share their row tracks (subgrid) — department, title, tag,
     summary, facts, requirements, apply — so a two-line title ("Civil Engineer —
     Dams and Water") no longer pushes one card's content below its neighbours'.
     Same fix as the service cards. */
  display: grid;
  grid-row: span 7;
  grid-template-rows: subgrid;
  row-gap: 0;
  justify-items: start;
  padding: 2.2em 2.2em 2em;
  background-color: var(--c-bg);
}
@supports not (grid-template-rows: subgrid) {
  .job { display: flex; flex-direction: column; align-items: flex-start; grid-row: auto; }
}
.job__dept { margin: 0; font-size: 14px; line-height: 1.4em; color: var(--c-text-light); }
.job__title {
  margin: .3em 0 0;
  font-size: clamp(19px, 18px + .39vw, 23px);
  line-height: 1.214em;
  letter-spacing: -.5px;
}
.job__sample { margin-top: 10px; }
.job__summary { margin: 14px 0 0; font-size: 15px; line-height: 1.55em; color: var(--c-text); }
.job__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 18px 0 0;
  font-size: 14px;
  line-height: 1.4em;
  font-weight: 500;
  color: var(--c-text-dark);
}
.job__facts li { display: inline-flex; align-items: center; gap: 6px; }
.job__facts svg { width: 16px; height: 16px; color: var(--c-link); }
/* requirements as square hairline tags, not sentences */
.job__tags {
  display: flex;
  flex-wrap: wrap;
  /* the shared row can be taller than this card's tags need — keep each tag at its
     own height instead of stretching to fill it */
  align-self: start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  margin: 18px 0 0;
}
.job__tags li {
  padding: 5px 10px;
  border: 1px solid var(--c-bd);
  border-radius: var(--rad);
  background-color: var(--c-bg-alt);
  font-size: 13px;
  line-height: 1.3em;
  color: var(--c-text-dark);
}
.job__apply { align-self: end; margin-top: 0; padding-top: 22px; }
.job__title { align-self: start; }

/* how to apply — one ruled strip */
.cr__apply {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: var(--space-medium);
  padding: 24px 0;
  border-top: 1px solid var(--c-bd);
  border-bottom: 1px solid var(--c-bd);
}
.cr__apply-text {
  flex: 1;
  margin: 0;
  font-size: 17px;
  line-height: 1.5em;
  font-weight: 500;
  color: var(--c-text-dark);
}

/* ----------------------------------------------------------- responsive */
@media (max-width: 1023px) {
  .nw__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  .dl__grid { grid-template-columns: 1fr; }
  .cr__teams { grid-template-columns: 1fr 1fr; }
  .cr__team:nth-child(3) { padding-left: 0; border-left: 0; }
  .cr__team:nth-child(n + 3) { border-top: 1px solid var(--c-bd); }
  .cr__jobs { grid-template-columns: 1fr; }
}
@media (max-width: 767px) {
  .nw__lead-title, .dl__title, .job__title { letter-spacing: 0; }
  .cr__apply { flex-direction: column; align-items: flex-start; }
  .nw__lead-title { font-size: var(--h4-size); }
  .nw__item { grid-template-columns: 110px minmax(0, 1fr); gap: 16px; }
  .cr__teams { grid-template-columns: 1fr; }
  .cr__team,
  .cr__team + .cr__team { padding: 22px 0; border-left: 0; }
  .cr__team + .cr__team { border-top: 1px solid var(--c-bd); }
  .dl__card,
  .dl__grid--single .dl__card { grid-template-columns: 1fr; align-items: start; padding: 1.9em; }
  .dl__chip { grid-row: auto; }
  .dl__btn,
  .dl__grid--single .dl__btn { grid-column: 1; margin-top: 1.1em; }
}
</style>
