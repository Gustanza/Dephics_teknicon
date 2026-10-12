<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ConsultCta from '../components/ConsultCta.vue'
import Reveal from '../components/ui/Reveal.vue'
import SampleTag from '../components/ui/SampleTag.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import NotFoundPage from './NotFoundPage.vue'
import { insightsResources as ir } from '../data/content.js'
import {
  postBySlug, postPath, posts, projectBySlug, projectPath, serviceBySlug, servicePath
} from '../data/lookup.js'

/*
  An Insights 2 article. The theme's single-post layout reduced to what the content
  carries: masthead photograph, the article at a readable measure, and a sticky
  "at a glance" column (§12 row 5's fixed-column move) linking the article to the
  real project and service pages it draws on.
*/
const route = useRoute()
const post = computed(() => postBySlug[route.params.slug])
const project = computed(() => post.value && post.value.project && projectBySlug[post.value.project])
const service = computed(() => post.value && post.value.service && serviceBySlug[post.value.service])
const more = computed(() => posts.filter((p) => p.slug !== route.params.slug).slice(0, 3))
const g = ir.post
const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Insights', to: '/insights' },
  { label: ir.news.eyebrow, to: '/insights/resources' }
]
</script>

<template>
  <NotFoundPage v-if="!post" />

  <template v-else>
    <PageHero
      :eyebrow="`${post.category} · ${post.date}`"
      :lines="[post.title]"
      :image="post.image ? post.image.src : ''"
      :w="post.image ? post.image.w : 0"
      :h="post.image ? post.image.h : 0"
      :crumbs="crumbs"
    />

    <section class="section band--white ps">
      <div class="container ps__grid">
        <Reveal as="article" variant="fade" class="ps__article">
          <p class="ps__lede">{{ post.excerpt }}</p>
          <p v-for="para in post.body" :key="para" class="ps__para">{{ para }}</p>
        </Reveal>

        <aside class="ps__aside" :aria-label="g.asideLabel">
          <div class="ps__sticky">
            <h2 class="ps__aside-h">{{ g.asideLabel }}</h2>
            <dl class="ps__facts">
              <div><dt>{{ g.category }}</dt><dd>{{ post.category }}</dd></div>
              <div><dt>{{ g.published }}</dt><dd>{{ post.date }}</dd></div>
              <div v-if="project">
                <dt>{{ g.project }}</dt>
                <dd><RouterLink :to="projectPath(project.slug)">{{ project.title }}</RouterLink></dd>
              </div>
              <div v-if="service">
                <dt>{{ g.service }}</dt>
                <dd><RouterLink :to="servicePath(service.slug)">{{ service.title }}</RouterLink></dd>
              </div>
              <div v-if="post.link">
                <dt>{{ g.seeAlso }}</dt>
                <dd><RouterLink :to="post.link.to">{{ post.link.label }}</RouterLink></dd>
              </div>
            </dl>
            <p v-if="post.sample" class="ps__sample"><SampleTag /> {{ g.sampleNote }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="more.length" class="section band--paper pm">
      <div class="container">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="ir.news.eyebrow" :lines="g.moreTitle" />
        </Reveal>
        <ul class="pm__grid">
          <Reveal v-for="(p, i) in more" :key="p.slug" as="li" variant="fade" :delay="i * 100" class="pm__card">
            <RouterLink :to="postPath(p.slug)" class="pm__thumb" tabindex="-1" aria-hidden="true">
              <img v-if="p.image" :src="p.image.src" alt="" :width="p.image.w" :height="p.image.h" loading="lazy" />
              <span v-else class="pm__tile">{{ p.date.slice(-4) }}</span>
            </RouterLink>
            <div class="pm__body">
              <p class="pm__meta"><span>{{ p.category }} · {{ p.date }}</span><SampleTag v-if="p.sample" /></p>
              <h3 class="pm__title"><RouterLink :to="postPath(p.slug)">{{ p.title }}</RouterLink></h3>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>

    <ConsultCta />
  </template>
</template>

<style scoped>
.ps__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: var(--grid-gap) 90px;
  align-items: stretch;
}
.ps__lede {
  margin: 0 0 1.2em;
  font-size: var(--h5-size);
  line-height: 1.45em;
  font-weight: 500;
  letter-spacing: -.3px;
  color: var(--c-heading);
}
.ps__para {
  margin: 0 0 1.2em;
  max-width: 68ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

.ps__sticky { position: sticky; top: 120px; }
.ps__aside-h {
  margin: 0 0 14px;
  font-size: var(--h6-size);
  line-height: var(--h6-lh);
  letter-spacing: var(--h6-ls);
}
.ps__facts { margin: 0; border-top: 1px solid var(--c-bd); }
.ps__facts > div { padding: 14px 0; border-bottom: 1px solid var(--c-bd); }
.ps__facts dt { font-size: 13px; line-height: 1.4em; color: var(--c-text-light); }
.ps__facts dd { margin: 3px 0 0; font-size: 16px; line-height: 1.4em; font-weight: 700; color: var(--c-text-dark); }
.ps__facts dd a { color: var(--c-link); }
.ps__sample { margin: 18px 0 0; font-size: 13px; line-height: 1.5em; color: var(--c-text-light); }

.pm__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--grid-gap);
  margin-top: var(--space-small);
}
.pm__card { background-color: var(--c-bg-alt); }
.pm__thumb { display: block; overflow: hidden; aspect-ratio: 4 / 3; background-color: var(--c-bg); }
.pm__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--dur) var(--ease);
}
.pm__card:hover .pm__thumb img { transform: scale(1.07); }
.pm__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--d-bg-brand);
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -1.8px;
  color: rgba(255, 255, 255, .9);
}
.pm__body { padding: 22px 26px 28px; }
.pm__meta { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; margin: 0; font-size: 14px; color: var(--c-text-light); }
.pm__title {
  margin: .4em 0 0;
  font-size: clamp(18px, 17px + .3vw, 21px);
  line-height: 1.25em;
  letter-spacing: -.4px;
}
.pm__title a { color: inherit; }
.pm__title a:hover { color: var(--c-link); }

@media (max-width: 1023px) {
  .ps__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  .ps__sticky { position: static; }
  .pm__grid { grid-template-columns: 1fr; }
}
@media (max-width: 767px) {
  .ps__lede { font-size: 19px; letter-spacing: 0; }
  .pm__tile { letter-spacing: 0; }
}
</style>
