<script setup>
import Reveal from './ui/Reveal.vue'
import SectionHeading from './ui/SectionHeading.vue'
import { orgChart } from '../data/content.js'

/*
  The organisation structure, drawn as a real chart.

  This component exists because the client refused to publish staff as named
  individuals — only as positions. It therefore replaces the old named-staff
  roster outright, and it has to carry the weight a team grid would: a visitor
  must see the shape of the firm at a glance, not read a list of job titles.

  Why it is native HTML/CSS and not an image (the profile PDF ships the chart
  as artwork):
    · an image cannot be read by a screen reader, searched, translated, or
      reflowed to a phone without pinch-zoom
    · the positions are content, and content lives in content.js — an image
      would fork the source of truth the moment a department changes

  Construction — a nested <ul>, styled as a chart:
    .oc__level is a grid of sibling columns with NO gap. Each column draws its
    own segment of the horizontal sibling rail with ::before (half a segment on
    the first and last column, a whole one in between, none when it is an only
    child) and its own vertical drop with ::after. The level itself draws the
    stem leaving the parent node's centre. Because the columns touch, the rail
    segments join into one continuous hairline without anything needing to know
    the column widths.

  Everything is 1px in --c-bd, 0 radius, no shadows (THEME_DNA §7.4, §11.1-2).
  The Board of Directors is the one box carrying the brand red — it is red in
  the client's own artwork. Its label is set at 20px/700 so white on
  --c-brand-red (4.15:1) clears the 3:1 large-bold threshold; nothing smaller
  may ever sit on that fill.

  Below 1024px the chart becomes an indented tree: the sibling rail rotates to
  a vertical spine on the left with a short elbow tick into each node. One
  column of nodes, hierarchy still legible, no horizontal scroll at any width.

  The two directorates are deliberately not equal-width: the track list is
  derived from the data (a directorate with three departments takes 3fr, the
  staff-function directorate 1.15fr) so the department cards stay wide enough
  to set their titles. The MD's stem therefore meets the sibling rail off its
  midpoint — a normal org-chart T-junction, not a mistake.
*/

/* "3fr 1.15fr" for the shipped data. Derived rather than hard-coded, so adding
   a department widens its directorate instead of crushing the cards. */
const dirTracks = orgChart.directorates
  .map((d) => (d.departments ? d.departments.length + 'fr' : '1.15fr'))
  .join(' ')

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="organisation" class="section band--paper oc">
    <div class="container">
      <Reveal variant="fade">
        <SectionHeading :eyebrow="orgChart.eyebrow" :lines="orgChart.title">
          {{ orgChart.lede }}
        </SectionHeading>
      </Reveal>

      <Reveal class="oc__chart" variant="fade" :delay="100">
        <ul class="oc__tree">
          <li class="oc__crown">
            <p class="oc__node oc__node--board">{{ orgChart.root }}</p>

            <ul class="oc__level">
              <li class="oc__col">
                <p class="oc__node oc__node--chief">{{ orgChart.chief }}</p>

                <ul class="oc__level oc__level--dirs" :style="{ '--oc-tracks': dirTracks }">
                  <li v-for="d in orgChart.directorates" :key="d.title" class="oc__col">
                    <p class="oc__node oc__node--dir">{{ d.title }}</p>

                    <!-- a line directorate: departments, each led by an HOD -->
                    <ul
                      v-if="d.departments"
                      class="oc__level oc__level--depts"
                      :style="{ '--oc-tracks': 'repeat(' + d.departments.length + ', 1fr)' }"
                    >
                      <li v-for="(dep, i) in d.departments" :key="dep.title" class="oc__col">
                        <p class="oc__dept">
                          <span class="oc__dept-n" aria-hidden="true">{{ pad(i) }}</span>
                          <span class="oc__dept-title">{{ dep.title }}</span>
                        </p>
                        <!-- the HOD's own staff, ruled straight onto the card under the
                             header: one hairline between them, no second connector level -->
                        <ul class="oc__rows">
                          <li v-for="s in dep.staff" :key="s" class="oc__row">{{ s }}</li>
                        </ul>
                      </li>
                    </ul>

                    <!-- a staff-function directorate: positions, no departments -->
                    <template v-else-if="d.roles">
                      <span class="oc__hang" aria-hidden="true" />
                      <ul class="oc__rows">
                        <li v-for="r in d.roles" :key="r" class="oc__row">{{ r }}</li>
                      </ul>
                    </template>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </Reveal>

      <Reveal class="oc__note" variant="fade" :delay="200">
        {{ orgChart.note }}
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.oc {
  /* parent node → stem → sibling rail → drop → child node. Both legs come off
     the 17/34/57 scale, so the chart keeps the page's vertical rhythm. */
  --oc-stem: var(--space-small);
  --oc-drop: var(--space-small);
}

.oc__chart { margin-top: var(--space-medium); }

.oc__tree {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* ---------- connectors ---------- */

.oc__level {
  position: relative;
  display: grid;
  grid-template-columns: var(--oc-tracks, 1fr);
  gap: 0;                      /* the columns must touch: the rail is built out of them */
  margin: 0;
  padding: calc(var(--oc-stem) + var(--oc-drop)) 0 0;
  list-style: none;
}

/* the stem leaving the parent node's centre */
.oc__level::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: var(--oc-stem);
  background-color: var(--c-bd);
}

.oc__level > .oc__col {
  position: relative;
  min-width: 0;                /* long titles must wrap, never widen the track */
  padding-inline: 10px;
}

/* this column's share of the sibling rail */
.oc__col::before {
  content: "";
  position: absolute;
  top: calc(-1 * var(--oc-drop));
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--c-bd);
}
.oc__col:first-child::before { left: 50%; }
.oc__col:last-child::before { right: 50%; }
.oc__col:only-child::before { display: none; }

/* the drop from the rail into this column's node */
.oc__col::after {
  content: "";
  position: absolute;
  top: calc(-1 * var(--oc-drop));
  left: 50%;
  width: 1px;
  height: var(--oc-drop);
  background-color: var(--c-bd);
}

/* a lone vertical leg where there are no siblings to rail together */
.oc__hang {
  display: block;
  width: 1px;
  height: calc(var(--oc-stem) + var(--oc-drop));
  margin-inline: auto;
  background-color: var(--c-bd);
}

/* ---------- nodes ---------- */

.oc__node {
  margin: 0 auto;
  padding: 15px 22px;
  text-align: center;
  border-radius: var(--rad);
  font-weight: 700;
}

/* the one red element — red in the client's own artwork. 20px/700 keeps white
   on --c-brand-red (4.15:1) above the 3:1 large-bold threshold. */
.oc__node--board {
  max-width: 340px;
  background-color: var(--c-brand-red);
  color: var(--c-inverse-link);
  font-size: 20px;
  line-height: 1.3;
  letter-spacing: -.5px;
}

/* white on the brand navy measures 10.15:1 */
.oc__node--chief {
  max-width: 340px;
  background-color: var(--d-bg-brand);
  color: var(--d-text-dark);
  font-size: 19px;
  line-height: 1.32;
  letter-spacing: -.5px;
}

.oc__node--dir {
  max-width: 320px;
  background-color: var(--c-bg-alt);
  border: 1px solid var(--c-brand-navy);
  color: var(--c-heading);
  font-size: 17px;
  line-height: 1.35;
  letter-spacing: -.3px;
}

/* ---------- department card ---------- */

/* header and rows are two boxes sharing one hairline: the header drops its
   bottom rule, so the list's top rule is the only line between them */
.oc__dept {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0;
  padding: 16px 18px;
  background-color: var(--c-bg-alt);
  border: 1px solid var(--c-bd);
  border-bottom: 0;
}

/* the theme's index numeral, at label scale rather than ghost scale (§7.3) */
.oc__dept-n {
  flex-shrink: 0;
  font-size: 15px;
  line-height: 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--c-bd);
}

.oc__dept-title {
  font-size: 17px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -.4px;
  color: var(--c-heading);
}

/* ---------- position rows ---------- */

.oc__rows {
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: var(--c-bg-alt);
  border: 1px solid var(--c-bd);
}

.oc__row {
  position: relative;
  padding: 11px 18px 11px 36px;
  font-size: 15px;
  line-height: 1.45;
  color: var(--c-text);
}
.oc__row + .oc__row { border-top: 1px solid var(--c-bd); }

/* a 10px hairline tick — these positions sit under the box above them */
.oc__row::before {
  content: "";
  position: absolute;
  left: 18px;
  top: 22px;
  width: 10px;
  height: 1px;
  background-color: var(--c-bd);
}

/* ---------- note ---------- */

.oc__note {
  margin-top: var(--space-medium);
  padding-top: 20px;
  border-top: 1px solid var(--c-bd);
  max-width: 68ch;
  font-size: 15px;
  line-height: 1.6em;
  color: var(--c-text-light);
}

/* ---------- responsive ---------- */

@media (max-width: 1279px) {
  .oc__node { padding: 13px 18px; }
  .oc__dept { padding: 14px 15px; }
  .oc__dept-title { font-size: 15px; letter-spacing: -.2px; }
  .oc__row { padding: 10px 15px 10px 32px; font-size: 14px; }
  .oc__row::before { left: 15px; top: 20px; }
}

/*
  Tree mode. The sibling rail rotates: the level grows a vertical spine on its
  left edge and each column reaches it with a short elbow tick, so a single
  column of nodes still reads as a hierarchy. Nothing scrolls sideways — the
  cards simply take whatever width the indent leaves them.
*/
@media (max-width: 1023px) {
  .oc { --oc-indent: 20px; --oc-spine: 18px; }

  .oc__level,
  .oc__level--dirs,
  .oc__level--depts {
    grid-template-columns: 1fr;
    row-gap: var(--space-tiny);
    padding: var(--space-tiny) 0 0;
    margin-left: var(--oc-spine);
    border-left: 1px solid var(--c-bd);
  }
  .oc__level::before { display: none; }

  .oc__level > .oc__col {
    padding-left: var(--oc-indent);
    padding-right: 0;
  }
  .oc__col::before,
  .oc__col:first-child::before,
  .oc__col:last-child::before,
  .oc__col:only-child::before {
    display: block;
    top: 24px;
    left: 0;
    right: auto;
    width: var(--oc-indent);
    height: 1px;
  }
  .oc__col::after { display: none; }

  .oc__node {
    margin-inline: 0;
    max-width: none;
    text-align: left;
  }

  .oc__hang { display: none; }
  .oc__rows { margin-top: var(--space-tiny); }
}

@media (max-width: 767px) {
  /* the theme drops negative tracking entirely below 768px */
  .oc__node--board,
  .oc__node--chief,
  .oc__node--dir,
  .oc__dept-title { letter-spacing: 0; }
}

@media (max-width: 479px) {
  .oc { --oc-indent: 13px; --oc-spine: 11px; }
  .oc__node--board { font-size: 19px; }
}
</style>
