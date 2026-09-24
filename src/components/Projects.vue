<script setup>
import { computed } from 'vue'
import Button from './ui/Button.vue'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../data/content.js'
import { projectBySlug } from '../data/lookup.js'

/* The photographed projects, in `projects.featured` order, each linking to its own page.
   `teaser` renders the Home-page subset with a link onward to the full page — six, so
   the grid still fills two complete rows of three. */
const props = defineProps({ teaser: { type: Boolean, default: false } })
const featured = projects.featured.map((slug) => projectBySlug[slug])
const shown = computed(() => (props.teaser ? featured.slice(0, 6) : featured))
</script>

<template>
  <section id="projects" class="section band--paper">
    <div class="container">
      <!--
        §11.9 — the intro is not centred and the two halves are not balanced:
        the title sits left, the footnote is bottom-anchored to its baseline on
        the right, in a deliberately unequal 1.6fr / 1fr split.
      -->
      <div class="prj__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="projects.eyebrow" :lines="projects.title" />
        </Reveal>
        <Reveal class="prj__footnote" variant="fade" :delay="100">
          {{ projects.footnote }}
        </Reveal>
      </div>

      <ul class="prj__grid">
        <Reveal
          v-for="(item, i) in shown"
          :key="item.slug"
          as="li"
          :delay="(i % 3) * 100"
        >
          <ProjectCard :project="item" />
        </Reveal>
      </ul>

      <div v-if="teaser" class="prj__more">
        <Button to="/projects" label="See all projects" variant="navy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.prj__head {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
}

.prj__footnote {
  margin: 0 0 .35em;
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 19px;
  line-height: 1.45em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-text-dark);
}

.prj__more { margin-top: var(--space-medium); }

.prj__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
  margin-top: var(--space-medium);
}

@media (max-width: 1023px) {
  .prj__head { grid-template-columns: 1fr; }
  .prj__footnote { margin-bottom: 0; }

  .prj__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 639px) {
  .prj__grid { grid-template-columns: 1fr; }
  .prj__footnote { font-size: 17px; letter-spacing: 0; }
}
</style>
