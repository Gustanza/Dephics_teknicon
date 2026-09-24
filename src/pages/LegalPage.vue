<script setup>
import { computed } from 'vue'
import PageHero from '../components/PageHero.vue'
import Tbc from '../components/ui/Tbc.vue'
import { company, legal, shown } from '../data/content.js'

/*
  /privacy and /terms (ROADMAP P5-5, P5-6). The route passes `doc`; the text lives in
  content.js `legal`. Until the client supplies it the body is a placeholder, and
  routes.js marks the page noindex so an empty policy is never what a search engine
  finds.

  Plain reading layout: one narrow measure, the theme's type, no decoration — a legal
  page should look like one.
*/
const props = defineProps({ doc: { type: String, required: true } })
const page = computed(() => legal[props.doc])
const crumbs = [{ label: 'Home', to: '/' }]
</script>

<template>
  <PageHero
    :eyebrow="company.name"
    :lines="page.title"
    :lede="page.lede"
    :crumbs="crumbs"
  />

  <section class="section band--white lg">
    <div class="container lg__inner">
      <p v-if="shown(page.updated)" class="lg__updated">
        {{ legal.updatedLabel }}: <Tbc :value="page.updated" />
      </p>

      <Tbc :value="page.body" block v-slot="{ value }">
        <section v-for="part in value" :key="part.heading" class="lg__part">
          <h2 class="lg__h">{{ part.heading }}</h2>
          <p v-for="para in part.paragraphs" :key="para" class="lg__para">{{ para }}</p>
        </section>
      </Tbc>

      <p class="lg__contact">
        {{ legal.contactLabel }}
        <a :href="`mailto:${company.email}`">{{ company.email }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.lg__inner { max-width: 820px; }

.lg__updated {
  margin: 0 0 var(--space-small);
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

.lg__part + .lg__part { margin-top: var(--space-small); }

.lg__h {
  margin: 0 0 .6em;
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
}

.lg__para {
  margin: 0;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}
.lg__para + .lg__para { margin-top: 1em; }

.lg__contact {
  margin: var(--space-medium) 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text);
}
.lg__contact a { font-weight: 700; color: var(--c-link); }
.lg__contact a:hover { color: var(--c-hover); }

@media (max-width: 767px) {
  .lg__h { letter-spacing: 0; }
}
</style>
