<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ConsultCta from '../components/ConsultCta.vue'
import Reveal from '../components/ui/Reveal.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import Tbc from '../components/ui/Tbc.vue'
import NotFoundPage from './NotFoundPage.vue'
import { projects } from '../data/content.js'
import {
  categoryBySlug, projectBySlug, projectsLike, sectorBySlug, sectorPath, serviceBySlug, servicePath
} from '../data/lookup.js'
import { filled, shown } from '../data/tbc.js'

/*
  One project, with the fields the IA asks of a project page: "client (where permission
  allows), location, year, services delivered, project value if publishable, gallery
  and related services". Case-study projects add the IA's "challenge, scope, solution,
  project facts, images and outcome".

  Layout is the theme's sticky-left / scrolling-right pairing (§11.9): the fact sheet
  holds its place in the left column while the photograph, case study, gallery and
  related services scroll past on the right.

  Every field that is still TBC renders as a "To be confirmed" chip, or not at all once
  placeholders are switched off (src/data/tbc.js) — nothing is guessed.
*/
const route = useRoute()
const project = computed(() => projectBySlug[route.params.slug])

const FACT_KEYS = ['client', 'place', 'year', 'status', 'scope', 'value', 'funder', 'programme', 'partner', 'area_m2']
const facts = computed(() =>
  FACT_KEYS
    .filter((k) => shown(project.value[k]))
    .map((k) => ({ key: k, label: projects.labels[k], value: project.value[k] }))
)

const serviceList = computed(() => project.value.services.map((s) => serviceBySlug[s]))
const sectorList = computed(() => project.value.sectors.map((s) => sectorBySlug[s]))
const similar = computed(() => projectsLike(project.value))
const caseStudy = computed(() => project.value.caseStudy)

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' }
]
</script>

<template>
  <NotFoundPage v-if="!project" />

  <template v-else>
    <PageHero
      :eyebrow="caseStudy ? `Case study · ${categoryBySlug[project.category].name}` : categoryBySlug[project.category].name"
      :lines="[project.title]"
      :lede="filled(project.place) ? project.place : ''"
      :image="project.image ? project.image.src : ''"
      :w="project.image ? project.image.w : 0"
      :h="project.image ? project.image.h : 0"
      :crumbs="crumbs"
    />

    <section class="section band--white pp">
      <div class="container pp__grid">
        <!-- ------------------------------------------------ fact sheet -->
        <aside class="pp__aside" aria-labelledby="pp-facts">
          <div class="pp__sticky">
            <h2 id="pp-facts" class="pp__h">Project facts</h2>
            <dl class="pp__facts">
              <div v-for="f in facts" :key="f.key" class="pp__fact">
                <dt>{{ f.label }}</dt>
                <dd><Tbc :value="f.value" :fallback="projects.tbcNotes[f.key]" /></dd>
              </div>
              <div v-if="project.facts.length" class="pp__fact">
                <dt>Key figures</dt>
                <dd>{{ project.facts.join(' · ') }}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div class="pp__main">
          <!-- ------------------------------------------------ photograph -->
          <figure v-if="project.image" class="pp__figure">
            <div class="pp__frame" :style="{ aspectRatio: `${project.image.w} / ${project.image.h}` }">
              <img
                :class="{ 'is-cropped': project.image.crop }"
                :src="project.image.src"
                :alt="project.image.alt"
                :width="project.image.w"
                :height="project.image.h"
              />
            </div>
            <figcaption class="pp__caption">{{ project.image.caption }}</figcaption>
          </figure>

          <!-- ------------------------------------------------ case study -->
          <template v-if="caseStudy">
            <Reveal v-if="shown(caseStudy.challenge)" variant="fade" class="pp__part">
              <h2 class="pp__h">The challenge</h2>
              <Tbc :value="caseStudy.challenge" block v-slot="{ value }"><p class="pp__para">{{ value }}</p></Tbc>
            </Reveal>
            <Reveal v-if="shown(project.scope)" variant="fade" class="pp__part">
              <h2 class="pp__h">Scope</h2>
              <p class="pp__para">
                <Tbc :value="project.scope" />
              </p>
            </Reveal>
            <Reveal v-if="shown(caseStudy.solution)" variant="fade" class="pp__part">
              <h2 class="pp__h">The solution</h2>
              <Tbc :value="caseStudy.solution" block v-slot="{ value }"><p class="pp__para">{{ value }}</p></Tbc>
            </Reveal>
            <Reveal v-if="shown(caseStudy.outcome)" variant="fade" class="pp__part">
              <h2 class="pp__h">The outcome</h2>
              <Tbc :value="caseStudy.outcome" block v-slot="{ value }"><p class="pp__para">{{ value }}</p></Tbc>
            </Reveal>
          </template>

          <!-- --------------------------------------------------- gallery -->
          <Reveal v-if="shown(project.gallery)" variant="fade" class="pp__part">
            <h2 class="pp__h">Gallery</h2>
            <Tbc :value="project.gallery" block :fallback="projects.tbcNotes.gallery" v-slot="{ value }">
              <ul class="pp__gallery">
                <li v-for="g in value" :key="g.src">
                  <figure>
                    <img :src="g.src" :alt="g.alt" :width="g.w" :height="g.h" loading="lazy" />
                    <figcaption class="pp__caption">{{ g.caption }}</figcaption>
                  </figure>
                </li>
              </ul>
            </Tbc>
          </Reveal>

          <!-- ------------------------------------------- related services -->
          <Reveal v-if="serviceList.length" variant="fade" class="pp__part">
            <h2 class="pp__h">Related services</h2>
            <ul class="pp__links">
              <li v-for="s in serviceList" :key="s.slug">
                <RouterLink :to="servicePath(s.slug)">
                  <span class="pp__n" aria-hidden="true">{{ s.n }}</span>
                  <span>{{ s.title }}</span>
                </RouterLink>
              </li>
            </ul>
          </Reveal>

          <!-- -------------------------------------------------- sectors -->
          <Reveal variant="fade" class="pp__part">
            <h2 class="pp__h">Sectors</h2>
            <ul class="pp__links">
              <li v-for="sec in sectorList" :key="sec.slug">
                <RouterLink :to="sectorPath(sec.slug)">
                  <span class="pp__n" aria-hidden="true">{{ sec.n }}</span>
                  <span>{{ sec.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ---------------------------------------------------- similar work -->
    <section v-if="similar.length" class="section band--paper">
      <div class="container">
        <Reveal variant="fade">
          <SectionHeading eyebrow="Related projects" :lines="['Similar work']" />
        </Reveal>
        <ul class="pp__cards">
          <Reveal v-for="(p, i) in similar" :key="p.slug" as="li" :delay="i * 100">
            <ProjectCard :project="p" />
          </Reveal>
        </ul>
      </div>
    </section>

    <ConsultCta />
  </template>
</template>

<style scoped>
.pp__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: var(--grid-gap) 80px;
  align-items: start;
}

/* the header is fixed after scroll; clear it when the fact sheet sticks */
.pp__sticky { position: sticky; top: 120px; }

.pp__h {
  margin: 0 0 var(--space-tiny);
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}

/* ----------------------------------------------------------- fact sheet */
.pp__facts { margin: 0; border-top: 2px solid var(--c-text-dark); }
.pp__fact {
  display: grid;
  gap: 2px;
  padding: 13px 0;
  border-bottom: 1px solid var(--c-bd);
}
.pp__fact dt {
  font-size: 14px;
  line-height: 1.5em;
  color: var(--c-text-light);
}
.pp__fact dd {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-text-dark);
  overflow-wrap: break-word;
}

/* ----------------------------------------------------------- main column */
.pp__figure { margin: 0 0 var(--space-medium); }
.pp__frame {
  overflow: hidden;
  background-color: var(--c-bg-alt-h);
}
.pp__frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Date-stamped sources: the same device as the cards — over-size the image inside a
   frame held at the photograph's own aspect ratio, anchored top-left, so the stamp in
   the lower-right corner falls outside it. */
.pp__frame img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
}

.pp__caption {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

.pp__part {
  padding-top: var(--space-small);
  margin-top: var(--space-small);
  border-top: 1px solid var(--c-bd);
}
.pp__figure + .pp__part { margin-top: 0; }
/* no photograph: the first part leads the column, level with "Project facts" */
.pp__main > .pp__part:first-child { margin-top: 0; padding-top: 0; border-top: 0; }

.pp__para {
  margin: 0;
  max-width: 68ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

.pp__gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--grid-gap);
}
.pp__gallery figure { margin: 0; }
/* one 4:3 frame for every gallery photo, so a mixed set of landscape sources lines up
   in even rows instead of ragged columns */
.pp__gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.pp__links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 30px; }
.pp__links a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--c-bg-alt-h);
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-heading);
  transition: color var(--dur) var(--ease);
}
.pp__links a:hover,
.pp__links a:focus-visible { color: var(--c-link); }
.pp__n {
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

.pp__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
  margin-top: var(--space-medium);
}

@media (max-width: 1279px) {
  .pp__grid { gap: var(--grid-gap) 50px; }
}

@media (max-width: 1023px) {
  .pp__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  .pp__sticky { position: static; }
  .pp__cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .pp__h { letter-spacing: 0; }
  .pp__links, .pp__gallery { grid-template-columns: minmax(0, 1fr); }
  .pp__cards { grid-template-columns: 1fr; }
}
</style>
