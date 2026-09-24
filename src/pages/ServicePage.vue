<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ConsultCta from '../components/ConsultCta.vue'
import Reveal from '../components/ui/Reveal.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import NotFoundPage from './NotFoundPage.vue'
import { services } from '../data/content.js'
import {
  projectName, projectPath, relatedProjects, sectorBySlug, sectorPath, serviceBySlug, servicePath
} from '../data/lookup.js'

/*
  One service, on the IA's fixed template (section 3): "overview, scope of work, typical
  deliverables, relevant sectors, selected related projects and a consultation
  call-to-action". Every service page is the same shape so they can be compared.

  Layout is the theme's split row (§11.9): each part's heading sits in a narrow left
  column, its content in the wide right one, and each part opens on a full-width 1px
  rule. The related projects get their own paper band, and the page closes on the
  dark consultation band.
*/
const route = useRoute()
const service = computed(() => serviceBySlug[route.params.slug])

const related = computed(() => relatedProjects(service.value.projects))
const sectorList = computed(() => service.value.sectors.map((s) => sectorBySlug[s]))

/* previous / next, wrapping, so the five read as a set */
const neighbours = computed(() => {
  const list = services.items
  const i = list.indexOf(service.value)
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length]
  }
})

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' }
]
</script>

<template>
  <NotFoundPage v-if="!service" />

  <template v-else>
    <PageHero
      :eyebrow="`Service ${service.n} of ${services.items.length}`"
      :lines="[service.title]"
      :lede="service.body"
      :image="service.image"
      :w="service.w"
      :h="service.h"
      :crumbs="crumbs"
    />

    <section class="section band--white sp">
      <div class="container">
        <!-- ------------------------------------------------- overview -->
        <Reveal variant="fade" class="sp__part">
          <h2 class="sp__h">Overview</h2>
          <div class="sp__content">
            <p v-for="para in service.overview" :key="para" class="sp__para">{{ para }}</p>
          </div>
        </Reveal>

        <!-- ------------------------------------------------ scope of work -->
        <Reveal variant="fade" class="sp__part">
          <h2 class="sp__h">Scope of work</h2>
          <ul class="sp__content sp__ruled">
            <li v-for="line in service.scope" :key="line">{{ line }}</li>
          </ul>
        </Reveal>

        <!-- ------------------------------------------ typical deliverables -->
        <Reveal variant="fade" class="sp__part">
          <h2 class="sp__h">Typical deliverables</h2>
          <ul class="sp__content sp__cells">
            <li v-for="d in service.deliverables" :key="d">{{ d }}</li>
          </ul>
        </Reveal>

        <!-- --------------------------------------------- relevant sectors -->
        <Reveal variant="fade" class="sp__part">
          <h2 class="sp__h">Relevant sectors</h2>
          <ul class="sp__content sp__sectors">
            <li v-for="sec in sectorList" :key="sec.slug">
              <RouterLink :to="sectorPath(sec.slug)">
                <span class="sp__sector-n" aria-hidden="true">{{ sec.n }}</span>
                <span>{{ sec.name }}</span>
              </RouterLink>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

    <!-- ------------------------------------------ selected related projects -->
    <section class="section band--paper">
      <div class="container">
        <Reveal variant="fade">
          <SectionHeading eyebrow="Selected projects" :lines="['Delivered under', 'this service']" />
        </Reveal>

        <ul class="sp__cards">
          <Reveal
            v-for="(p, i) in related.cards"
            :key="p.slug"
            as="li"
            :delay="i * 100"
          >
            <ProjectCard :project="p" />
          </Reveal>
        </ul>

        <Reveal v-if="related.rest.length" variant="fade" class="sp__more">
          <h3 class="sp__more-h">Also under this service</h3>
          <ul class="sp__more-list">
            <li v-for="p in related.rest" :key="p.slug">
              <RouterLink :to="projectPath(p.slug)">{{ projectName(p) }}</RouterLink>
            </li>
          </ul>
        </Reveal>

        <!-- previous / next service -->
        <nav class="sp__pager" aria-label="Other services">
          <RouterLink class="sp__pager-link" :to="servicePath(neighbours.prev.slug)">
            <span class="sp__pager-dir">Previous service</span>
            <span class="sp__pager-title">{{ neighbours.prev.title }}</span>
          </RouterLink>
          <RouterLink class="sp__pager-link sp__pager-link--next" :to="servicePath(neighbours.next.slug)">
            <span class="sp__pager-dir">Next service</span>
            <span class="sp__pager-title">{{ neighbours.next.title }}</span>
          </RouterLink>
        </nav>
      </div>
    </section>

    <ConsultCta />
  </template>
</template>

<style scoped>
/* ------------------------------------------------------------ split parts */
.sp__part {
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: var(--grid-gap) 80px;
  padding-block: var(--space-small) var(--space-medium);
  border-top: 1px solid var(--c-bd);
}
.sp__part:first-child { padding-top: var(--space-small); }
.sp__part:last-child { padding-bottom: 0; }

/* the part heading: a real <h2>, held to the h5 step so the masthead's <h1> leads */
.sp__h {
  margin: 0;
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}

.sp__content { min-width: 0; }

.sp__para {
  margin: 0;
  max-width: 68ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}
.sp__para + .sp__para { margin-top: 1em; }
.sp__para:first-child {
  font-size: 19px;
  line-height: 1.55em;
  font-weight: 700;
  letter-spacing: -.4px;
  color: var(--c-text-dark);
}

/* scope: ruled lines with the short red marker, as on /sectors */
.sp__ruled li {
  position: relative;
  padding: 13px 0 13px 34px;
  border-bottom: 1px solid var(--c-bg-alt-h);
  font-size: 1rem;
  line-height: 1.5em;
  color: var(--c-text-dark);
}
.sp__ruled li:first-child { padding-top: 0; }
.sp__ruled li::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(12px + .75em);
  width: 16px;
  height: 2px;
  background-color: var(--c-brand-red);
}
.sp__ruled li:first-child::before { top: .75em; }

/* deliverables: the §7.1 hairline cell grid, two up */
.sp__cells {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--c-bd);
  border-left: 1px solid var(--c-bd);
}
.sp__cells li {
  padding: 20px 24px;
  border-right: 1px solid var(--c-bd);
  border-bottom: 1px solid var(--c-bd);
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 700;
  letter-spacing: -.2px;
  color: var(--c-text-dark);
}

/* sectors: link rows with the index numeral */
.sp__sectors { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 30px; }
.sp__sectors a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px solid var(--c-bg-alt-h);
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-heading);
  transition: color var(--dur) var(--ease);
}
.sp__sectors a:hover,
.sp__sectors a:focus-visible { color: var(--c-link); }
.sp__sector-n {
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}

/* ----------------------------------------------------------- projects */
.sp__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
  margin-top: var(--space-medium);
}

.sp__more {
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: var(--grid-gap) 80px;
  margin-top: var(--space-medium);
  padding-top: var(--space-small);
  border-top: 1px solid var(--c-bd);
}
.sp__more-h {
  margin: 0;
  font-size: var(--h6-size);
  line-height: var(--h6-lh);
  letter-spacing: var(--h6-ls);
}
.sp__more-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 30px;
}
.sp__more-list a {
  display: block;
  padding: 11px 0;
  border-bottom: 1px solid var(--c-bd);
  font-size: 1rem;
  line-height: 1.5em;
  color: var(--c-text-dark);
  transition: color var(--dur) var(--ease);
}
.sp__more-list a:hover,
.sp__more-list a:focus-visible { color: var(--c-link); }

/* -------------------------------------------------------------- pager */
.sp__pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--grid-gap);
  margin-top: var(--space-large);
}
.sp__pager-link {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 20px;
  border-top: 2px solid var(--c-text-dark);
  transition: border-color var(--dur) var(--ease);
}
.sp__pager-link--next { text-align: right; }
.sp__pager-link:hover,
.sp__pager-link:focus-visible { border-top-color: var(--c-brand-red); }
.sp__pager-dir {
  font-size: var(--eyebrow-size);
  line-height: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--eyebrow-ls);
  color: var(--c-text-dark);
}
.sp__pager-title {
  font-size: 19px;
  line-height: 1.3em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-heading);
  transition: color var(--dur) var(--ease);
}
.sp__pager-link:hover .sp__pager-title { color: var(--c-link); }

/* --------------------------------------------------------- responsive */
@media (max-width: 1279px) {
  .sp__part, .sp__more { gap: var(--grid-gap) 50px; }
}

@media (max-width: 1023px) {
  .sp__part, .sp__more { grid-template-columns: 1fr; gap: var(--space-tiny); }
  .sp__cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .sp__h { letter-spacing: 0; }
  .sp__para:first-child { font-size: 17px; letter-spacing: 0; }
  .sp__cells, .sp__sectors, .sp__more-list { grid-template-columns: minmax(0, 1fr); }
  .sp__cards { grid-template-columns: 1fr; }
  .sp__pager { grid-template-columns: 1fr; }
  .sp__pager-link--next { text-align: left; }
}
</style>
