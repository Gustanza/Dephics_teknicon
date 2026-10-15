<script setup>
import { ref } from 'vue'
import Reveal from './ui/Reveal.vue'
import { company, contactPage, filled, shown } from '../data/content.js'

/*
  IA section 7 — the contact page body: office address, telephone, email, working
  hours, a map of the registered office, and the enquiry form.

  Everything rendered here comes from `company` and `contactPage` in content.js.
  Nothing is hardcoded, and no address, number or URL is derived or guessed.

  The map is a plain <iframe> against the public Maps embed endpoint. There is no
  API key for this project, so the JS Maps API is deliberately NOT used; the embed
  searches contactPage.mapQuery because the profile publishes no coordinates.
*/

const mapSrc =
  `https://www.google.com/maps?output=embed&q=${encodeURIComponent(contactPage.mapQuery)}`

/*
  P5-1 — the enquiry form posts to `contactPage.form.endpoint` in content.js.

  While that is still a placeholder the form has NO backend and must not pretend to
  have one: submitting only reveals the "email us directly" notice. Once it holds a URL
  the form sends for real, with honest sending / sent / failed states and the mailto
  fallback kept for the failure case.

    · The POST is FormData with `Accept: application/json`, the convention Formspree,
      Getform and Basin all follow, and any 2xx counts as sent.
    · `action` + `method` are also set on the <form>, so with JavaScript unavailable
      the browser still posts it natively.
    · Spam: a honeypot field named `_gotcha` (Formspree's own name for it), hidden
      from people and from assistive tech. A bot that fills it is told "sent" and
      nothing is posted.
    · Still to do by the client: confirm which mailbox receives submissions (it is
      configured at the provider, not here) — ROADMAP Q4.
*/
const endpoint = filled(contactPage.form.endpoint) ? contactPage.form.endpoint : ''
const state = ref('idle')   // idle | offline | sending | sent | failed

async function onSubmit (event) {
  if (!endpoint) {
    state.value = 'offline'
    return
  }
  const form = event.target
  const data = new FormData(form)
  if (data.get('_gotcha')) {
    state.value = 'sent'
    return
  }
  data.delete('_gotcha')
  state.value = 'sending'
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.value = 'sent'
    form.reset()
  } catch {
    state.value = 'failed'
  }
}

/* Browser autofill hints, keyed to the field names in contactPage.form.fields. */
const autocompleteFor = {
  name: 'name',
  organisation: 'organization',
  email: 'email',
  phone: 'tel'
}
</script>

<template>
  <section class="section band--white cb">
    <div class="container">
      <div class="cb__grid">
        <!-- ---------------------------------------------- office + hours -->
        <Reveal class="cb__details" variant="fade">
          <h2 class="cb__h">Office</h2>
          <address class="cb__address">
            <span v-for="line in company.address" :key="line">{{ line }}</span>
          </address>

          <dl class="cb__rows">
            <div class="cb__row">
              <dt>Telephone</dt>
              <dd><a :href="`tel:${company.phoneHref}`">{{ company.phone }}</a></dd>
            </div>
            <div class="cb__row">
              <dt>Mobile</dt>
              <dd class="cb__stack">
                <a v-for="m in company.mobiles" :key="m.href" :href="`tel:${m.href}`">{{ m.label }}</a>
              </dd>
            </div>
            <div class="cb__row">
              <dt>Email</dt>
              <dd><a :href="`mailto:${company.email}`">{{ company.email }}</a></dd>
            </div>
          </dl>

          <!-- hours are client input (not in the profile): hidden until supplied -->
          <template v-if="shown(contactPage.hours) && Array.isArray(contactPage.hours)">
            <h2 class="cb__h cb__h--spaced">Working hours</h2>
            <dl class="cb__rows">
              <div v-for="slot in contactPage.hours" :key="slot.days" class="cb__row">
                <dt>{{ slot.days }}</dt>
                <dd>{{ slot.time }}</dd>
              </div>
            </dl>
          </template>

          <!-- the map sits under the office it shows, and fills the column down to the
               end of the form — full width below, it left the office column half empty
               once the (invented) working hours were withdrawn -->
          <div class="cb__map">
            <iframe
              class="cb__frame"
              :src="mapSrc"
              :title="`Map of the Teknicon office — ${contactPage.mapQuery}`"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <!-- ------------------------------------------------ enquiry form -->
        <Reveal class="cb__formcol" variant="fade" :delay="100">
          <h2 class="cb__h">{{ contactPage.form.heading }}</h2>

          <form
            class="cb__form"
            :action="endpoint || undefined"
            :method="endpoint ? 'post' : undefined"
            @submit.prevent="onSubmit"
          >
            <!-- honeypot: invisible to people and to assistive tech; see onSubmit -->
            <div class="cb__trap" aria-hidden="true">
              <label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" /></label>
            </div>

            <div
              v-for="field in contactPage.form.fields"
              :key="field.name"
              class="cb__field"
            >
              <label class="cb__label" :for="`cb-${field.name}`">
                {{ field.label }}<span v-if="field.required" class="cb__req" aria-hidden="true">*</span>
              </label>

              <textarea
                v-if="field.type === 'textarea'"
                :id="`cb-${field.name}`"
                class="cb__input cb__textarea"
                :name="field.name"
                :required="field.required"
                rows="6"
              />
              <input
                v-else
                :id="`cb-${field.name}`"
                class="cb__input"
                :type="field.type"
                :name="field.name"
                :required="field.required"
                :autocomplete="autocompleteFor[field.name]"
              />
            </div>

            <p class="cb__reqnote"><span aria-hidden="true">*</span> Required field.</p>

            <div class="cb__foot">
              <button type="submit" class="btn btn--arrow" :disabled="state === 'sending'">
                <span class="btn__label">{{ state === 'sending' ? contactPage.form.sending : contactPage.form.submit }}</span>
                <svg
                  class="btn__arrow"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M1 6h13M9.5 1 15 6l-5.5 5" stroke="currentColor" stroke-width="1.6" />
                </svg>
              </button>

              <!-- Live region is always in the DOM so the notice is announced when
                   it appears, rather than being inserted unnoticed. -->
              <div class="cb__status" role="status" aria-live="polite">
                <p v-if="state === 'offline'" class="cb__notice">
                  {{ contactPage.form.offline }}
                  <a :href="`mailto:${company.email}`">{{ company.email }}</a>
                  {{ contactPage.form.offlineAfter }}
                </p>
                <p v-else-if="state === 'sent'" class="cb__notice cb__notice--ok">
                  {{ contactPage.form.sent }}
                </p>
                <p v-else-if="state === 'failed'" class="cb__notice">
                  {{ contactPage.form.failed }}
                  <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
                </p>
              </div>
            </div>
          </form>
        </Reveal>
      </div>

    </div>
  </section>
</template>

<style scoped>
.cb__grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--grid-gap) 80px;
  align-items: stretch; /* the office column runs the form's full height */
}
.cb__details { display: flex; flex-direction: column; }

/* ---------------------------------------------------------- shared type */

/*
  Sub-section headings. Real <h2>s — the page <h1> lives in PageHero — held down to
  the h5 step so they sit under the masthead rather than competing with it.
*/
.cb__h {
  margin: 0 0 var(--space-tiny);
  font-size: var(--h5-size);
  line-height: var(--h5-lh);
  letter-spacing: var(--h5-ls);
  font-weight: var(--h-weight);
  color: var(--c-heading);
}
.cb__h--spaced { margin-top: var(--space-medium); }

/* ------------------------------------------------------ office details */

.cb__address {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-tiny);
  font-style: normal;
  font-size: 1rem;
  line-height: 1.65em;
  color: var(--c-text);
}

/* Hairline rows, the theme's only separator (THEME_DNA section 7.4). */
.cb__rows { margin: 0; }
.cb__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 20px;
  align-items: baseline;
  padding-block: 12px;
  border-bottom: var(--hairline) solid var(--c-bd);
}
.cb__row:first-child { border-top: var(--hairline) solid var(--c-bd); }
.cb__row dt {
  font-size: 15px;
  line-height: 1.5em;
  color: var(--c-text-light);
}
.cb__row dd {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5em;
  text-align: right;
  color: var(--c-text-dark);
  /* a long email must wrap rather than push the grid wide at 360px */
  overflow-wrap: anywhere;
}
.cb__row dd a { color: var(--c-link); }
/* two mobile numbers, one per line, still right-aligned with the other values */
.cb__stack { display: flex; flex-direction: column; align-items: flex-end; }
.cb__row dd a:hover { color: var(--c-hover); }

/* ---------------------------------------------------------------- form */

.cb__form {
  display: grid;
  gap: var(--space-tiny);
}

.cb__field { display: grid; gap: 7px; }

.cb__label {
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--c-text-dark);
}
.cb__req { margin-left: 4px; color: var(--c-link); }

/* Square inputs, 1px hairline, no shadow — section 11 anti-patterns 1 and 2. */
.cb__input {
  width: 100%;
  max-width: 100%;
  padding: 14px 16px;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: var(--body-lh);
  font-weight: 400;
  color: var(--c-text-dark);
  background-color: var(--c-bg);
  border: var(--hairline) solid var(--c-bd);
  border-radius: var(--rad);
  box-shadow: var(--shadow);
  -webkit-appearance: none;
  appearance: none;
  transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.cb__input:hover { border-color: var(--c-text-light); }
.cb__input:focus { border-color: var(--c-link); background-color: var(--c-bg-alt); }

.cb__textarea {
  min-height: 170px;
  resize: vertical;
}

.cb__reqnote {
  margin: 0;
  font-size: 13px;
  line-height: 1.5em;
  color: var(--c-text-light);
}

.cb__foot {
  display: grid;
  justify-items: start;
  margin-top: var(--space-tiny);
}
/* the submit button must not force a scrollbar in a 320px content box */
.cb__foot .btn { max-width: 100%; }

/* the live region is always present but collapses to nothing while idle, so the
   gap under the button only appears once there is something to read */
.cb__status { justify-self: stretch; }

.cb__notice {
  margin: var(--space-tiny) 0 0;
  padding: 16px 20px;
  border-left: 2px solid var(--c-brand-red);
  background-color: var(--c-bg);
  font-size: 15px;
  line-height: 1.55em;
  color: var(--c-text);
}
.cb__notice--ok { border-left-color: var(--c-brand-navy); }
.cb__notice a {
  font-weight: 700;
  color: var(--c-link);
  overflow-wrap: anywhere;
}
.cb__notice a:hover { color: var(--c-hover); }

/* the honeypot: out of the layout and out of reach, but still submitted */
.cb__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cb__form .btn[disabled] { opacity: .6; cursor: progress; }

/* ----------------------------------------------------------------- map */

.cb__map {
  flex: 1 1 auto;
  min-height: 320px;
  margin-top: var(--space-small);
  border: var(--hairline) solid var(--c-bd);
  border-radius: var(--rad);
  background-color: var(--c-bg);
}
.cb__frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: var(--rad);
}

/* --------------------------------------------------------- responsive */

@media (max-width: 1279px) {
  .cb__grid { gap: var(--grid-gap) 50px; }
}

@media (max-width: 1023px) {
  .cb__grid { grid-template-columns: 1fr; gap: var(--space-medium); }
  .cb__map { flex: none; min-height: 0; aspect-ratio: 16 / 9; }
}

@media (max-width: 767px) {
  .cb__h { letter-spacing: 0; }
  .cb__map { aspect-ratio: 4 / 3; }
}

@media (max-width: 479px) {
  /* "Saturday, Sunday and public holidays" needs the full measure at 360px */
  .cb__row { grid-template-columns: 1fr; }
  .cb__row dd { text-align: left; }
  .cb__stack { align-items: flex-start; }
}
</style>
