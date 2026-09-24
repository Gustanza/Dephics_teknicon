<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { projectList, projects } from '../data/content.js'
import { categoryBySlug, filterOptions, projectLine, projectPath } from '../data/lookup.js'
import { filled } from '../data/tbc.js'

/*
  The IA's "All Projects — filter by sector, service, location and project status".

  · The prerendered HTML carries the whole register, unfiltered. Filtering is a
    progressive enhancement: with no JavaScript, every project is still listed and
    linked.
  · Filter state lives in the URL query (?category=water&sector=mining…), so a
    filtered view can be linked to — /sectors uses this for "All projects in this
    sector". The query is read in onMounted, NOT during setup: the server rendered the
    unfiltered list, and filtering during hydration would mismatch it.
  · A filter only appears if at least one project has a value for it. No project has a
    status yet (it is TBC for all of them), so the status filter is absent until the
    client supplies some — then it appears on its own.
*/
const route = useRoute()
const router = useRouter()

const KEYS = ['category', 'sector', 'service', 'area', 'status']
const state = reactive({ category: '', sector: '', service: '', area: '', status: '' })

const selects = [
  { key: 'sector', label: 'Sector', all: 'All sectors' },
  { key: 'service', label: 'Service', all: 'All services' },
  { key: 'area', label: 'Location', all: 'All locations' },
  { key: 'status', label: 'Status', all: 'Any status' }
].filter((f) => filterOptions[f.key].length)

const matches = (p) =>
  (!state.category || p.category === state.category) &&
  (!state.sector || p.sectors.includes(state.sector)) &&
  (!state.service || p.services.includes(state.service)) &&
  (!state.area || p.area === state.area) &&
  (!state.status || p.status === state.status)

const results = computed(() => projectList.filter(matches))
const active = computed(() => KEYS.some((k) => state[k]))
const countFor = (category) =>
  projectList.filter((p) => (!category || p.category === category)).length

function clear () {
  for (const k of KEYS) state[k] = ''
}

onMounted(() => {
  for (const k of KEYS) {
    const v = route.query[k]
    // ignore anything that is not a real option, rather than filtering to nothing
    if (typeof v === 'string' && filterOptions[k].some((o) => o.value === v)) state[k] = v
  }
  // write back to the URL on change, without adding a history entry per click
  watch(state, () => {
    const query = Object.fromEntries(KEYS.filter((k) => state[k]).map((k) => [k, state[k]]))
    router.replace({ query, hash: route.hash })
  })
})
</script>

<template>
  <section id="register" class="section band--white pr">
    <div class="container">
      <div class="pr__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="projects.register.eyebrow" :lines="projects.register.title" />
        </Reveal>
        <Reveal class="pr__lede" variant="fade" :delay="100">
          {{ projects.register.lede }}
        </Reveal>
      </div>

      <!-- ------------------------------------------------------- filters -->
      <div class="pr__filters" role="group" aria-label="Filter projects">
        <div class="pr__tabs" role="group" aria-label="Project type">
          <button
            type="button"
            class="pr__tab"
            :aria-pressed="!state.category"
            @click="state.category = ''"
          >
            All <span class="pr__count">{{ countFor('') }}</span>
          </button>
          <button
            v-for="c in filterOptions.category"
            :key="c.value"
            type="button"
            class="pr__tab"
            :aria-pressed="state.category === c.value"
            @click="state.category = c.value"
          >
            {{ c.label }} <span class="pr__count">{{ countFor(c.value) }}</span>
          </button>
        </div>

        <div class="pr__selects">
          <div v-for="f in selects" :key="f.key" class="pr__field">
            <label class="pr__label" :for="`pr-${f.key}`">{{ f.label }}</label>
            <select :id="`pr-${f.key}`" v-model="state[f.key]" class="pr__select">
              <option value="">{{ f.all }}</option>
              <option v-for="o in filterOptions[f.key]" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>

        <div class="pr__status">
          <p role="status" aria-live="polite" class="pr__result">
            {{ results.length }} of {{ projectList.length }} projects
          </p>
          <button v-if="active" type="button" class="pr__clear" @click="clear">Clear filters</button>
        </div>
      </div>

      <!-- ------------------------------------------------------ register -->
      <ul v-if="results.length" class="pr__list">
        <li v-for="p in results" :key="p.slug" class="pr__row">
          <div class="pr__thumb" :class="{ 'pr__thumb--none': !p.image }">
            <img
              v-if="p.image"
              :class="{ 'is-cropped': p.image.crop }"
              :src="p.image.src"
              alt=""
              loading="lazy"
              :width="p.image.w"
              :height="p.image.h"
            />
          </div>
          <div class="pr__main">
            <h3 class="pr__title">
              <RouterLink class="pr__link" :to="projectPath(p.slug)">{{ p.title }}</RouterLink>
            </h3>
            <p v-if="filled(p.place)" class="pr__place">{{ p.place }}</p>
          </div>
          <p class="pr__client">{{ projectLine(p) }}</p>
          <p class="pr__cat">{{ categoryBySlug[p.category].name }}</p>
        </li>
      </ul>
      <p v-else class="pr__empty">
        {{ projects.register.empty }}
        <button type="button" class="pr__clear" @click="clear">Clear filters</button>
      </p>
    </div>
  </section>
</template>

<style scoped>
.pr__head {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
  margin-bottom: var(--space-medium);
}
.pr__lede {
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

/* ------------------------------------------------------------- filters */
.pr__filters {
  display: grid;
  gap: var(--space-tiny);
  padding-bottom: var(--space-small);
}

/* type tabs: square, 1px ruled, the active one filled navy — flat, no pill */
.pr__tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.pr__tab {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 11px 18px;
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--c-text-dark);
  background-color: var(--c-bg-alt);
  border: 1px solid var(--c-bd);
  border-radius: var(--rad);
  cursor: pointer;
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.pr__tab:hover { border-color: var(--c-text-dark); }
.pr__tab[aria-pressed="true"] {
  color: var(--c-inverse-link);
  background-color: var(--c-brand-navy);
  border-color: var(--c-brand-navy);
}
.pr__count {
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  opacity: .75;
}

.pr__selects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: var(--space-tiny) var(--grid-gap);
}
.pr__field { display: grid; gap: 7px; min-width: 0; }
.pr__label {
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
  color: var(--c-text-dark);
}
/* square select with a drawn chevron — the native arrow cannot be styled square */
.pr__select {
  width: 100%;
  padding: 12px 40px 12px 14px;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.5em;
  color: var(--c-text-dark);
  background-color: var(--c-bg);
  background-image: linear-gradient(45deg, transparent 50%, var(--c-text-dark) 50%),
                    linear-gradient(135deg, var(--c-text-dark) 50%, transparent 50%);
  background-position: calc(100% - 20px) 50%, calc(100% - 15px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  border: 1px solid var(--c-bd);
  border-radius: var(--rad);
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}
.pr__select:hover { border-color: var(--c-text-light); }
.pr__select:focus { border-color: var(--c-link); background-color: var(--c-bg-alt); }

.pr__status {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 24px;
}
.pr__result {
  margin: 0;
  font-size: 15px;
  line-height: 1.5em;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-light);
}
.pr__clear {
  padding: 0;
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--c-link);
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  cursor: pointer;
}
.pr__clear:hover { color: var(--c-hover); }

/* ------------------------------------------------------------ register */
.pr__list { border-top: 1px solid var(--c-text-dark); }

.pr__row {
  position: relative;
  display: grid;
  grid-template-columns: 96px minmax(0, 1.5fr) minmax(0, 1.3fr) minmax(0, .9fr);
  gap: 0 30px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--c-bd);
  transition: background-color var(--dur) var(--ease);
}
.pr__row:hover { background-color: var(--c-bg); }

.pr__thumb {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--c-bg-alt-h);
}
/* no photograph: an empty tonal tile keeps the column, and says nothing */
.pr__thumb--none { background-color: var(--c-bg); }
.pr__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pr__thumb img.is-cropped {
  width: 126%;
  height: 126%;
  max-width: none;
}

.pr__title {
  margin: 0;
  font-size: 19px;
  line-height: 1.3em;
  letter-spacing: -.5px;
}
.pr__link { color: inherit; transition: color var(--dur) var(--ease); }
.pr__link::after { content: ""; position: absolute; inset: 0; }
.pr__row:hover .pr__link,
.pr__link:focus-visible { color: var(--c-link); }

.pr__place {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-dark);
}
.pr__client, .pr__cat {
  margin: 0;
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

.pr__empty {
  margin: 0;
  padding: var(--space-small) 0;
  border-top: 1px solid var(--c-text-dark);
  font-size: 1rem;
  color: var(--c-text);
}
.pr__empty .pr__clear { margin-left: 12px; }

@media (max-width: 1023px) {
  .pr__head { grid-template-columns: 1fr; }
  .pr__lede { padding-top: 0; border-top: 0; }
  .pr__row { grid-template-columns: 96px minmax(0, 1fr) minmax(0, 1fr); }
  .pr__cat { display: none; }
}

@media (max-width: 639px) {
  .pr__row {
    grid-template-columns: 72px minmax(0, 1fr);
    align-items: start;
    gap: 6px 16px;
  }
  .pr__thumb { grid-row: span 2; }
  .pr__client { grid-column: 2; }
  .pr__title { font-size: 17px; letter-spacing: 0; }
  .pr__tab { padding: 9px 14px; }
}
</style>
