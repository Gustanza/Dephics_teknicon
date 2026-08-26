<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { team } from '../data/content.js'

/*
  There are no staff photographs in the company profile, so the theme's photo
  card (§4.3) has nothing to hold. The roster is set instead as a two-column
  hairline cell grid — the same §7.1 construction as the client strip — with the
  sanctioned index numeral leading each entry. Two lines per person keeps six
  people in three rows rather than six.

  Ordered by length of service so the list reads as a ranked credential.
*/
const roster = [...team.members].sort((a, b) => b.years - a.years)
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

      <ol class="tm__list">
        <Reveal
          v-for="(m, i) in roster"
          :key="m.name"
          as="li"
          class="tm"
          :delay="i * 60"
        >
          <span class="tm__index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>

          <div class="tm__body">
            <p class="tm__top">
              <span class="tm__name">{{ m.name }}</span>
              <span class="tm__years">
                <span class="tm__years-n">{{ m.years }}</span><span class="tm__years-u">yrs</span>
              </span>
            </p>
            <p class="tm__meta">
              {{ m.profession }} · {{ m.countries }}
            </p>
          </div>
        </Reveal>
      </ol>

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

.tm__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: var(--space-medium) 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--c-bd);
}

.tm {
  position: relative;
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: start;
  gap: 16px;
  padding: 24px 0 26px;
  border-bottom: 1px solid var(--c-bd);
  transition: background-color var(--dur) var(--ease);
}
/* the rule between the two columns — §7.1 hairline cell grid */
.tm:nth-child(even) {
  padding-left: 40px;
  border-left: 1px solid var(--c-bd);
}
.tm:nth-child(odd) { padding-right: 40px; }

/*
  Hover happens inside the frame — the row never moves (§11.10). A 2px accent
  rule wipes across the row's own baseline, the same left-to-right gesture the
  buttons use.
*/
.tm::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background-color: var(--c-brand-red);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform .45s var(--ease-sweep);
}
.tm:hover { background-color: var(--c-bg); }
.tm:hover::after { transform: scaleX(1); }

.tm__index {
  font-size: 2em;               /* 34px */
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
  color: var(--c-bd);
  transition: color var(--dur) var(--ease);
}
.tm:hover .tm__index { color: var(--c-link); }

.tm__body { min-width: 0; }

.tm__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
}

.tm__name {
  font-size: 20px;
  line-height: 1.2em;
  font-weight: 700;
  letter-spacing: -.5px;
  color: var(--c-heading);   /* sits at heading level even though it is a span */
}

.tm__years {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.tm__years-n {
  font-size: 22px;
  line-height: 1em;
  font-weight: 700;
  letter-spacing: -.6px;
  font-variant-numeric: tabular-nums;
  color: var(--c-text-dark);
}
.tm__years-u {
  font-size: 13px;
  color: var(--c-text-light);
}

.tm__meta {
  margin: 7px 0 0;
  font-size: 15px;
  line-height: 1.4;
  color: var(--c-text-light);
}
/* the separator inherits the meta colour — at --c-bd it measured 1.64:1 and was
   too faint to actually separate the two strings */

.tm__more {
  margin: var(--space-medium) 0 0;
  font-size: 19px;
  line-height: 1.45em;
  font-weight: 700;
  letter-spacing: -.6px;
  color: var(--c-text-dark);
}

@media (max-width: 1279px) {
  .tm:nth-child(even) { padding-left: 30px; }
  .tm:nth-child(odd) { padding-right: 30px; }
}

@media (max-width: 1023px) {
  .tm__head { grid-template-columns: 1fr; align-items: start; }
  .tm__lede { padding-bottom: 0; }
  .tm__list { margin-top: var(--space-small); }
}

/* One column below tablet — the two-line entry still holds. */
@media (max-width: 767px) {
  .tm__list { grid-template-columns: 1fr; }
  .tm,
  .tm:nth-child(even),
  .tm:nth-child(odd) {
    padding-inline: 0;
    border-left: 0;
  }
  .tm { grid-template-columns: 44px 1fr; gap: 14px; }
  .tm__index { font-size: 1.7em; }
}

@media (max-width: 479px) {
  .tm__name { font-size: 18px; }
  .tm__meta { font-size: 14px; }
  .tm__more { font-size: 17px; letter-spacing: 0; }
}
</style>
