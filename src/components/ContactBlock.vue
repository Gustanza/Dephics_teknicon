<script setup>
import { ref } from 'vue'
import Reveal from './ui/Reveal.vue'
import { company, contactPage } from '../data/content.js'

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
  TODO P5-1 — the enquiry form HAS NO BACKEND and must not pretend to have one.

  ROADMAP.md section 7, Q4 (Formspree / Netlify Forms / client host) is still open,
  so `onSubmit` does nothing but reveal the mailto fallback. To wire it up, all five
  of these are required:
    1. Decide the endpoint (Q4) — it also decides where the site is deployed.
    2. Post the field values to it (form `action`/`method`, or fetch() from onSubmit).
    3. Replace the single inline notice with real idle / sending / sent / failed
       states, and keep the mailto fallback for the failed case.
    4. Add spam protection — a honeypot field plus whatever the provider supplies.
    5. Confirm with the client which mailbox receives the submissions, and say so
       on the page.
  Until every one of those is done this handler must keep telling the visitor to
  email directly. Do not replace the notice with a "Thank you, message sent".
*/
const showFallback = ref(false)
function onSubmit () {
  showFallback.value = true
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
          <p class="cb__lede">{{ contactPage.lede }}</p>

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
              <dt>Email</dt>
              <dd><a :href="`mailto:${company.email}`">{{ company.email }}</a></dd>
            </div>
          </dl>

          <h2 class="cb__h cb__h--spaced">Working hours</h2>
          <dl class="cb__rows">
            <div v-for="slot in contactPage.hours" :key="slot.days" class="cb__row">
              <dt>{{ slot.days }}</dt>
              <dd>{{ slot.time }}</dd>
            </div>
          </dl>
        </Reveal>

        <!-- ------------------------------------------------ enquiry form -->
        <Reveal class="cb__formcol" variant="fade" :delay="100">
          <h2 class="cb__h">{{ contactPage.form.heading }}</h2>

          <form class="cb__form" @submit.prevent="onSubmit">
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
              <button type="submit" class="btn btn--arrow">
                <span class="btn__label">{{ contactPage.form.submit }}</span>
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
                <p v-if="showFallback" class="cb__notice">
                  This form is not connected yet, so nothing has been sent. Please email
                  <a :href="`mailto:${company.email}`">{{ company.email }}</a>
                  directly and include the details above.
                </p>
              </div>
            </div>
          </form>
        </Reveal>
      </div>

      <!-- ------------------------------------------------------ the map -->
      <Reveal class="cb__map" variant="fade">
        <iframe
          class="cb__frame"
          :src="mapSrc"
          :title="`Map of the Teknicon office — ${contactPage.mapQuery}`"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.cb__grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--grid-gap) 80px;
  align-items: start;
}

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

.cb__lede {
  margin: 0 0 var(--space-small);
  max-width: 46ch;
  font-size: 1rem;
  line-height: var(--body-lh);
  color: var(--c-text);
}

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
.cb__notice a {
  font-weight: 700;
  color: var(--c-link);
  overflow-wrap: anywhere;
}
.cb__notice a:hover { color: var(--c-hover); }

/* ----------------------------------------------------------------- map */

.cb__map {
  display: block;
  margin-top: var(--space-medium);
  aspect-ratio: 21 / 9;
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
  .cb__map { aspect-ratio: 16 / 9; }
}

@media (max-width: 767px) {
  .cb__h { letter-spacing: 0; }
  .cb__map { aspect-ratio: 4 / 3; }
}

@media (max-width: 479px) {
  /* "Saturday, Sunday and public holidays" needs the full measure at 360px */
  .cb__row { grid-template-columns: 1fr; }
  .cb__row dd { text-align: left; }
}
</style>
