<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { team } from '../data/content.js'

/* §4.3 — the theme's staff row is a pair of 50% columns at deliberately
   unequal top offsets (4.6vw / 10.7vw), never a baseline-aligned grid. */
const half = Math.ceil(team.members.length / 2)
const columns = [team.members.slice(0, half), team.members.slice(half)]
</script>

<template>
  <section id="team" class="section band--white">
    <div class="container">
      <div class="tm__head">
        <Reveal variant="fade">
          <SectionHeading :eyebrow="team.eyebrow" :lines="team.title" />
        </Reveal>
        <Reveal class="tm__lede" variant="fade" :delay="100">
          <p>{{ team.lede }}</p>
          <p class="tm__note">{{ team.note }}</p>
        </Reveal>
      </div>

      <div class="tm__cols">
        <ul
          v-for="(col, c) in columns"
          :key="c"
          class="tm__col"
          :class="`tm__col--${c}`"
        >
          <Reveal
            v-for="(m, i) in col"
            :key="m.name"
            as="li"
            class="tm"
            :delay="i * 100"
          >
            <span class="tm__mono" aria-hidden="true">{{ m.initials }}</span>
            <div class="tm__body">
              <h3 class="tm__name">{{ m.name }}</h3>
              <p class="tm__prof">{{ m.profession }}</p>
              <dl class="tm__meta">
                <div class="tm__meta-row">
                  <dt>Practised in</dt>
                  <dd>{{ m.countries }}</dd>
                </div>
                <div class="tm__meta-row">
                  <dt>Experience</dt>
                  <dd>{{ m.years }} years</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </ul>
      </div>

      <p class="tm__more">{{ team.more }}</p>
    </div>
  </section>
</template>

<style scoped>
.tm__head {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: var(--grid-gap) 60px;
  align-items: end;
}
.tm__lede { padding-bottom: .4em; }
.tm__note {
  margin-top: 1.2em;
  font-size: 15px;
  color: var(--c-text-light);
}

.tm__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 60px;
  align-items: start;
}
/* the unequal offsets are the point — do not level these */
.tm__col--0 { padding-top: 4.6vw; }
.tm__col--1 { padding-top: 10.7vw; }

/*
  No tinted panel and no box border. The theme's team card is a photograph plus
  type; with no staff photographs in the source, the entry is set typographically
  and separated by the theme's 1px hairline instead.
*/
.tm {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 22px;
  padding: 28px 0 34px;
  border-top: 1px solid var(--c-bd);
}

.tm__mono {
  font-size: 35px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--c-bd);
  transition: color var(--dur) var(--ease);
}
.tm:hover .tm__mono { color: var(--c-link); }

.tm__name {
  margin: 0;
  font-size: clamp(19px, 17.5px + .2vw, 20px);
  line-height: 1.2em;
  letter-spacing: -.5px;
}
@media (min-width: 1280px) {
  .tm__name { font-size: var(--h5-size); }   /* 24px — §4.3 */
}

.tm__prof {
  margin: 11px 0 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: var(--c-text-light);
}

.tm__meta { margin: 20px 0 0; }
.tm__meta-row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: baseline;
}
.tm__meta-row + .tm__meta-row { margin-top: 6px; }
.tm__meta dt {
  flex-shrink: 0;
  font-size: 13px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--c-text-light);
}
.tm__meta dd {
  margin: 0;
  text-align: right;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 500;
  color: var(--c-text-dark);
}

.tm__more {
  margin: var(--space-medium) 0 0;
  padding-top: 27px;
  border-top: 1px solid var(--c-bd);
  font-size: 19px;
  line-height: 1.45em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-text-dark);
}

@media (max-width: 1023px) {
  .tm__head { grid-template-columns: 1fr; align-items: start; }
  .tm__lede { padding-bottom: 0; }
  .tm__cols { grid-template-columns: 1fr; gap: 0; margin-top: var(--space-small); }
  .tm__col--0, .tm__col--1 { padding-top: 0; }
}

@media (max-width: 639px) {
  .tm__mono { font-size: 28px; }
  .tm__more { font-size: 17px; letter-spacing: 0; }
}
</style>
