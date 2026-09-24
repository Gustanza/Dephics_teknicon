# TEKNICON WEBSITE — PROJECT STATE & ROADMAP

**Single source of truth for where this project is and what happens next.**
If you are picking this up in a fresh session, read this file top to bottom before
touching anything. Everything you need is either here or linked from here.

- **Last updated:** 2026-09-23
- **Current phase:** **Phases 1–6 built.** 51 prerendered pages, audit and census clean.
  Everything still missing is client input, held as `TBC` placeholders — see §5a.
- **Status:** waiting on the client for the placeholder content (§5a) and Q4 / Q6 (§7)

---

## 0. Orientation — read these in this order

| # | File | What it is | When you need it |
|---|---|---|---|
| 1 | **this file** | State, decisions, task tracker | Always, first |
| 2 | [`BRIEF.md`](BRIEF.md) | **Company ground truth.** Every project, client, licence number, contact, brand colour | Before writing any copy or number |
| 3 | [`THEME_DNA.md`](THEME_DNA.md) | 1063-line spec of the Fuse theme, from its own compiled CSS | Before writing any CSS |
| 4 | [`CONTENT.md`](CONTENT.md) | Section-by-section copy deck for the landing page | When changing page copy |
| 5 | [`image-manifest.json`](image-manifest.json) | Every image: source, dimensions, alt, project, confidence | Before using any image |
| 6 | [`ASSETS.md`](ASSETS.md) | What was curated, what was rejected and why | When you need a new image |
| 7 | [`REVIEW_PROTOCOL.md`](REVIEW_PROTOCOL.md) | The build/critique rubric | When reviewing work |
| 8 | [`REVIEW-1.md`](REVIEW-1.md), [`REVIEW-2.md`](REVIEW-2.md) | Two completed audit rounds | For historical reasoning |
| 9 | [`HANDOFF.md`](HANDOFF.md) | Client-facing: what to request, how to run | When talking to the client |

Source material lives in [`../tekres/`](../tekres/):
`260611 Company Profile R1 (3).docx` · `Teknicon Revised Profile Jul 26.pdf` (50pp, the
**authoritative** designed profile) · `Proposed Teknicon Website Information Architecture.pdf`
· `Teknicon Logo Og.png` · `Teknicon Logo White.png`
The docx is unzipped to `tekres/_extract/` (84 images + `doc.txt` + `pdf.txt`).

---

## 1. The three hard rules

Break these and the work goes backwards. Every one exists because it was violated once.

### Rule 1 — No invented facts. Ever.
Every number, name, date, client, licence and address on the site must trace to
[`BRIEF.md`](BRIEF.md). If it is not in that file, it does not go on the page.
Two factual defects have already shipped and been caught in review:
a project image contradicting its own headline, and a claim about "warehouses across
three countries" that the source does not support. Both originated in copy written
ahead of the source check.

### Rule 2 — The design is Fuse, and it is specified.
The client chose **Fuse — Production Industry** (AxiomThemes). [`THEME_DNA.md`](THEME_DNA.md)
is not a mood board; it is extracted from the theme's compiled CSS. The load-bearing rules:

- **DM Sans only.** No second family, anywhere.
- **Headings 700 with negative tracking** — h1 −1.8px, h2 −1.4px, h3 −1px.
- **`--rad: 0px`.** The only other radius in the system is `50%`. Nothing else.
- **No shadows.** Surfaces separate by a tonal step plus a 1px hairline.
- **Vertical rhythm is 17 / 34 / 57 / 113 / 147px.** Standard section = 147 top and bottom.
- **Container 1290px.**
- **Uppercase belongs to the 14px eyebrow only** — never buttons, never body.
- §11 of THEME_DNA is the anti-pattern list. Check work against it.

Deviations from the theme are allowed but must be **deliberate, commented in the code,
and recorded in §4 below**.

### Rule 3 — Verify, don't assert.
This project has a measurement habit; keep it. Before claiming anything works:

```bash
npm run build                                   # must be clean
npx vite preview --port 4173 --strictPort &     # serve the build
node tools/shoot.mjs http://localhost:4173/ docs/ref/build build
```

Then run the census (contrast, border-radius, box-shadow, overflow, console) with a
Playwright script. Past rounds have caught: a CSS specificity bug freezing a hover state,
a `overflow-x` on `body` silently killing every `position: sticky`, and an autoplay bug
invisible to headless testing because it only triggers with a real cursor on screen.

**Screenshots are in `docs/ref/fuse/` (the real theme, 27 files) and `docs/ref/build/`
(ours, same treatment).** Compare tile by tile, not from memory.

---

## 2. Where the build is right now

### Stack
Vue 3.5 · Vite 8.2 · **vue-router 5.3** · **vite-ssg 28.3** (static prerendering) ·
Playwright 1.62 for verification. No CSS framework.
Tokens in `src/style.css`, all content in `src/data/content.js`.

### Routes — 51 pages, each prerendered to static HTML
`/` · `/about` · `/services` · `/projects` · `/sectors` · `/insights` · `/contact` ·
`/privacy` · `/terms` · `/404` (emitted as `dist/404.html`) · 5 × `/services/<slug>` ·
36 × `/projects/<slug>`, plus a client-side catch-all. Defined in `src/router/routes.js`;
detail routes take their `<head>` from the data via `meta.head(params)`. The list of
paths to prerender is `staticPaths` in `src/data/lookup.js`, read by `vite.config.js`,
`tools/audit.mjs` and `tools/census.mjs`, so a new project or service is picked up by
all three automatically.

`src/App.vue` is now a layout shell only: `SiteHead · SiteHeader · <RouterView> ·
SiteFooter · ScrollTop`. Page composition lives in `src/pages/`.

### Page composition
- **Home** — Hero · Credentials · HomeIntro · Services(one row of 3 — `services.home` — then "All services") ·
  Projects(teaser) · SectorsList(teaser) · Counters · Clients · SplitCta
- **About** — PageHero · About · Vision · Quality · **OrgChart** · Licences · SplitCta
- **Services** — PageHero · ServicesIndex (5 ruled rows) · Quality · ConsultCta
- **Service page** — PageHero · overview / scope / deliverables / sectors (split rows) ·
  related projects · prev/next · ConsultCta
- **Projects** — PageHero · CaseStudies (3) · ProjectRegister (36, filterable) · Clients · SplitCta
- **Project page** — PageHero · sticky fact sheet + photo / case study / gallery / services
  / sectors · similar work · ConsultCta
- **Sectors** — PageHero · SectorsList (descriptions TBC, evidence linked to project pages)
- **Insights** — PageHero · InsightsLinks · InsightsMore (downloads, news, careers)
- **Contact** — PageHero · ContactBlock · **Privacy / Terms** — LegalPage

### Components
`src/components/` — About, CaseStudies, Clients, ConsultCta, ContactBlock, Counters,
Credentials, Hero, HomeIntro, InsightsLinks, InsightsMore, Licences, OrgChart, PageHero
(image optional, breadcrumbs), ProjectCard, ProjectRegister, Projects, Quality,
SectorsList, ServicesIndex, SiteFooter, SiteHead, SiteHeader, SplitCta, Vision
`src/components/ui/` — Button (supports `to` for routes), Logo, Reveal, ScrollTop,
SectionHeading, **Tbc** (the placeholder chip)
`src/pages/` — adds ServicePage, ProjectPage, LegalPage
`src/data/` — `content.js` (all copy), `tbc.js` (placeholders + launch switch),
`lookup.js` (slug joins, filter options, `staticPaths`; throws on a dangling slug)
`src/composables/useReveal.js` — one shared IntersectionObserver

> **`Team.vue` is retired.** It published six named engineers, which conflicts with client
> comment C3 (positions, not individuals). `OrgChart.vue` replaces it. The file is no longer
> imported anywhere — delete it once Phase 1 is signed off.

### Brand tokens (authoritative — do not re-derive from the Word file)
| Token | Value | Note |
|---|---|---|
| `--c-brand-navy` | `#2C3792` | **client-specified.** Profile renders `#2A3991`; 2.33 ΔE apart |
| `--c-brand-red` | `#E93825` | exact, from the profile PDF |
| `--c-link` | `#CF3221` | the red deepened 11% so it clears 4.5:1 for text and button fills |
| `--c-btn-hover` | `#2C3792` | buttons hover navy; **separate token** from `--c-hover`, which drives text links |
| `--c-heading` | `#2C3792` | every h1–h6 |
| `--d-bg` / `--d-bg-mid` / `--d-bg-brand` | `#151B47` / `#222B72` / `#2C3792` | the dark ladder: counters → vision → footer |

Every neutral is retuned to the brand hue (233.5°). The old values `#2B2E8C` / `#D81F26`
came from a 335px compressed raster and are **wrong** — do not reintroduce them.

### Logo
Official artwork supplied by the client, in `public/img/`:
`logo-teknicon.png` / `-white.png` (full lockup with tagline) and
`logo-header.png` / `-white.png` (mark + wordmark, tagline removed).
An earlier hand-traced SVG was wrong and has been deleted. **Never redraw the mark.**

### Verified state as of last build (2026-09-23)
`npm run audit` — NO PROBLEMS FOUND on all 51 pages (h1, heading order, ids, dead links,
**dead #anchors** (new), external rel, images, CLS, labels, landmarks, SEO, console).
`npm run census` — CLEAN: 0 non-`0`/`50%` radii, 0 box-shadows, no horizontal overflow
at 360/390/768/1024/1280/1440/1920, all text ≥ AA. The census was proven against a
canary element (1.92:1 grey, 6px radius, a shadow — all three caught).
Filters, deep links, sector → register links and the form's offline state exercised in
Chromium with zero console errors. dist ≈ 12 MB, of which 6.8 MB is the profile PDF.

Two known contrast exceptions, both deliberate: `ab__dept-n` and `tm__index`, the ghost
index numerals at 1.69:1. They are decorative, matching the theme's own ghost-numeral
treatment. Ruled acceptable in review.

---

## 3. Client feedback log

Every round of client comments, with status. **Nothing here gets silently dropped.**

### Round A — footer (WhatsApp, 10:46–10:53)
| # | Comment | Status |
|---|---|---|
| A1 | Logo isn't the real one | ✅ Done — official artwork wired in, trace deleted |
| A2 | Footer type sizes inconsistent | ✅ Done — blurb 15px → 17px, all columns match |
| A3 | "P. O. Box" not "P.O. Box" | ✅ Done — recorded as house style in BRIEF §9 |
| A4 | Icons before email / phone / website | ✅ Done — inline SVG, no icon font |
| A5 | Remove Departments, add social handles | ⚠️ **Partially done** — column built, **links are `#` placeholders pending real handles** |

### Round B — page detail
| # | Comment | Status |
|---|---|---|
| B1 | Headings should be brand blue | ✅ Done — `--c-heading` on all h1–h6 |
| B2 | Menu hover should change colour; active item blue | ✅ Done — plus scroll-spy built, which did not exist |
| B3 | About content missing from the site | ✅ Done — new About section from profile pp. 4–5 |
| B4 | "About" nav link wrongly jumps to QA | ✅ Done — real `#about` section |
| B5 | About section too basic | ✅ Done — ghost numeral, offset image pair, accent underline, hairline department grid |
| B6 | Dead space left of the About text | ✅ Done — columns now match height by construction at every width |
| B7 | Hero slides 1 and 3 not classy enough | ✅ Done — replaced; see §6 for the imagery caveat |
| B8 | Service card links should be red buttons, blue on hover | ✅ Done — applied to all buttons for consistency |
| B9 | "View Capability" capital C; tag "Project Management" | ✅ Done |
| B10 | Slider doesn't autoplay on first load | ✅ Done — section-wide hover-pause was freezing it |
| B11 | Outlined hero button should sweep **blue**, not white | ❌ **NOT DONE** — see §5, task P0-1 |

### Round C — Information Architecture (PDF + WhatsApp, 1:03–1:05 PM)
| # | Comment | Status |
|---|---|---|
| C1 | **Nav must link to real pages, not in-page sections** | ✅ Done — Phase 1 |
| C2 | "Request a Consultation" → **"Contact us"** | ✅ Done — P1-10 |
| C3 | Leadership shown as **positions, not individuals** — use the org chart | ✅ Done — P1-6 |
| C4 | Insights = curated external links (ERB, IET, OSHA Tanzania, TANROADS, TARURA, FIDIC, TBS) | ✅ Done — P1-9 |
| C5 | Adopt information from the company profile; select projects as seen fit, then iterate | ✅ Accepted as standing authority |

---

## 4. Decision log

Decisions already made, with reasoning, so they are not relitigated.

| Decision | Reasoning |
|---|---|
| Brand colours from the **PDF**, not the Word logo | PDF is vector artwork; the docx logo is a 335px compressed raster that gave wrong hues |
| Navy `#2C3792` over the sampled `#2A3991` | Client-specified; 2.33 ΔE, imperceptible; contrast unaffected |
| Two red tokens (`--c-brand-red` graphics, `--c-link` text/fills) | The exact brand red is 4.15:1 under white — cannot legally carry small type at AA |
| Buttons hover navy via a **separate** `--c-btn-hover` | `--c-hover` also drives every text link; repurposing it would turn footer/body links navy |
| **No cog diagram** in About | THEME_DNA §11.11 bans decorative shapes; the diagram's amber exists nowhere else in the palette |
| Marquee removed from the footer | Client request. It is a Fuse signature (rubric A6) — a deliberate, recorded departure |
| Solid buttons in service cards | Client request. Fuse ends that card in a quiet text link (§4.1) — deliberate departure |
| Hero uses a **scrim**; Fuse does not | Fuse's stock photography is dark and art-directed; Teknicon's is bright daylight site work and white type vanishes without it |
| No hero scroll cue | THEME_DNA §5 is explicit that Fuse's hero has none; the copy deck was wrong |
| Team names published as individuals | ⚠️ **NOW REVERSED by C3** — must become positions |
| Hover-pause removed from the hero section | The hero is ~full viewport, so a resting cursor froze autoplay permanently |
| Nav order must match page order | The scroll-spy sorts by document position; a menu disagreeing with the page reads as broken |
| **Missing client content is a visible `TBC` chip, never a guess** | Rule 1. One switch (`SHOW_PLACEHOLDERS` in `src/data/tbc.js`) hides every unfilled field for launch. The chip's dashed red border is a deliberate, temporary departure from the theme — nothing else on the site is dashed — so a gap can never pass for finished content |
| **The designed PDF outranks the Word file** | Nine placeholders turned out to be answered in the PDF (scopes, locations, Royal Soap's client METL, Songwe Region for New Luika). BRIEF §5.2 records each with its page. Lesson: search BOTH sources before marking anything TBC |
| Project scopes come from the profile's own list, not BRIEF §5's summary | BRIEF §5 had summarised several scopes away. The Word profile words them per project; transcribed into **BRIEF §5.1** before use |
| A project with no photograph of its own gets **no** photograph | Borrowing another project's image is the REVIEW-1 defect. Imageless projects get the plain navy masthead and a typographic card |
| Three dropped images restored for project pages | Ulongoni bridge (renamed `project-ulongoni-bridge.jpg`), ZMT terminal, energy dissipater — the dissipater's date stamp cropped out of the file itself |
| TRA ITA hero alt corrected | It said "a completed … block"; the manifest records the frame as an architectural **rendering** |
| Home services: one row of three cards, then "All services" | Client request (2026-09-23). Structural, Civil and Water/Dams/Mining — the first three of the IA's four Home highlights. Set in `services.home`. `/services` lists all five |
| Service "typical deliverables" drawn only from outputs the profile names | P2-4 said "not in any source". Each line traces to BRIEF §3–§5 (calculations, GA drawings, tender documents, ESIA, progress reports, IPC review…). Client should still read them once |
| Service overviews restate BRIEF §3–§4 | No new claims; the "front end of a commission" framing in Design & Consultancy is the only descriptive gloss |
| Same-band sections collapse to one rhythm step | Two `.section`s on the same ground back to back gave 147 + 147 = 294px of empty colour (client flagged it under Home Services, 2026-09-23). A global rule in `style.css` drops the second one's top padding. Hit Home, `/services`, `/projects` and `/insights`; all now 147px |
| Every project card uses one 4:3 photo frame | Client flagged ragged rows (2026-09-24): a 16:9 frame for letterboxed sources (TIPER, Mnekezi) made photos and text start at different heights. Now every photo in a row is the same height and every card in a row is the same height |
| `/sectors`: aligned pairs, not a staggered register | The Phase 1 stagger (right column one rhythm step lower, THEME_DNA §4.3) compounded once descriptions made blocks uneven, and read as a bug (client, 2026-09-24). Now 01|02, 03|04… share a top line, and a CSS subgrid lines up head, description, list and link across each pair. No-subgrid browsers fall back to a plain stack per sector |
| Footer headings promoted h3 → h2 | On pages without their own h2 (`/privacy`, `/404`) the footer skipped a level. Styling is by class, nothing moved |
| Split-CTA buttons → real routes | `#contact` scrolled to the footer and `#clients` did not exist on most pages |
| Consultation band uses red + navy buttons | The client's chosen brand pair (P0-1); an outline button hovers navy and vanishes on the dark band |

---

## 4a. Phase 1 build notes

| Item | Detail |
|---|---|
| Routing | `src/router/routes.js` is the single source of routes **and** per-route `<head>` meta |
| Prerendering | `npm run build` runs `vite-ssg build` and emits real HTML per route. `build:spa` is an escape hatch for debugging. |
| Verified | Per-route `<title>`, canonical and `og:image` all present in the static HTML |
| Known gap | No `404.html` is emitted — the catch-all route is not prerendered. Static hosts need one. Added as P1-12. |
| Profile PDF | Recompressed with PyMuPDF `rewrite_images` (100 dpi / q62). 36.7 MB → 6.8 MB. |

## 5. TASK TRACKER

Status key: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[?]` needs a decision

### P0 — Outstanding on the current landing page

- [x] **P0-1** Outlined hero button sweep → navy — **resolved differently by the client:**
  the `.btn--light` variant was removed entirely and those buttons are now solid
  `.btn--navy` beside the solid red primary. Brand pair rather than a white outline.
- [!] **P0-2** Replace `#` placeholder social links in the footer
  *Blocked on the client supplying real handles. `src/data/content.js` → `footer.columns[Follow]`.*

### P1 — Routing spine (the foundation for everything else)

- [x] **P1-1** SSG chosen (`vite-ssg`), no Nuxt migration
- [x] **P1-2** `vue-router@5.3.1` + `vite-ssg@28.3.0` installed and working on Vite 8.2.2
- [x] **P1-3** `src/router/routes.js` + 8 pages in `src/pages/`; `App.vue` is now a layout shell
- [x] **P1-4** Scroll-spy removed; nav uses `RouterLink` + `router-link-active`
- [x] **P1-5** `SiteHead.vue` drives head from `routes.js` `meta`; verified in the prerendered HTML
- [x] **P1-6** ✅ **Team roster replaced by the org chart.** Verified: no named individual appears in any of the 7 prerendered pages.
  *`src/components/Team.vue` currently publishes 6 named engineers with years of service.
  This conflicts with client policy C3 and must not ship. Chart data is recoverable —
  see §6. The 14 named personnel stay in BRIEF §6 as internal reference only.*
- [x] **P1-7** `OrgChart.vue` — native HTML, 1px hairline connectors, no image
- [x] **P1-8** Footer restructured to the five IA parts; Services and Quick Links are derived from `content.js` so they stay in sync
- [x] **P1-12** `dist/404.html` emitted — a named `/404` route renders the same page as the catch-all, so hydration matches
- [x] **P1-9** `InsightsLinks.vue` — 7 links, `target="_blank"` + `rel="noopener noreferrer"`.
      6 of 7 returned HTTP 200; **IET is flagged `unverified` in the data** and needs a manual check.
- [x] **P1-10** `primaryCta` = "Contact us"; header, hero and footer updated
- [x] **P1-11** `public/downloads/teknicon-company-profile.pdf` — compressed 36.7 MB → 6.8 MB (82%), 50 pages and text intact

### Fixed this session, beyond the task list

- [x] **Footer / mobile-nav link hover was 2.00:1 on the navy.** `--c-link` (#CF3221) is
      tuned for light grounds. Added `--c-link-on-navy: #FF9185` (4.66:1, same hue at 76%
      lightness) and remapped `--c-link` inside `.ftr` and `.mnav`. The subagent flagged the
      footer; the mobile nav had the identical defect and was caught by the census.
- [x] **Stale LCP preload removed from `index.html`.** It still pointed at a hero image the
      slider no longer uses, and because `index.html` is the shared template for all 7
      prerendered routes it was downloading a homepage image on `/contact` too.
      `Hero.vue`'s own `fetchpriority="high"` on slide 1 is route-correct and cannot drift.
- [x] **Last `box-shadow` on the site removed.** The mobile-nav active underline used an
      inset shadow; now a background rule, so "zero shadows" is literally true and the
      census stays meaningful.

- [x] **Navigation was broken in dev — `useHead()` called outside setup.** `SiteHead.vue`
      called `useHead()` inside a `watchEffect`, which runs outside the setup context.
      unhead threw, and the exception broke vue-router's navigation: the URL changed and
      `document.title` updated, but `<RouterView>` never re-rendered, so every menu click
      appeared to do nothing. **The production build swallowed the error and looked fine —
      only the dev server surfaced it.** Fixed by calling `useHead()` once at the top of
      setup with a `computed` head object. Verified 6/6 navigations on both servers.
- [x] **Scroll did not reset between pages.** Navigating from the bottom of one page left
      you at the bottom of the next, and since every page ends in the same footer that also
      read as "nothing happened". `scrollBehavior` now waits two animation frames for the
      incoming view to lay out, then scrolls with `behavior: 'instant'` — `html
      { scroll-behavior: smooth }` was animating the jump and a height change mid-animation
      aborted it.
- [x] **Header nav wrapped at 1280–1440.** "About Us" and "Contact Us" broke onto a second
      line at the commonest laptop widths, pushing the header from 102px to 128px. Not a
      space problem — the row had ~228px of slack — so `white-space: nowrap` on the menu
      links. The nav is hidden below 1280, so it cannot cause overflow.

- [x] **`/sectors` masthead was rendering an empty panel.** It pointed at
      `project-zmt-terminal.jpg`, which had been deleted during the hero rework. Nothing
      caught it: a decorative `<img>` (`alt=""`, `aria-hidden`) 404s **silently** — no
      console error, no failed-request warning, and the census only counted 4xx on
      requests it happened to observe. Now uses `project-binguni-hospital.jpg`.
- [x] **Added `tools/check-assets.mjs`, wired into `npm run build`.** It fails the build
      if any `/img`, `/downloads` or root asset referenced from `src/` or `index.html`
      is missing, and expands template-literal paths (Logo.vue's tone variants) rather
      than skipping them. 41 references checked. This class of bug cannot recur silently.
- [x] **Duplicate page headings removed.** Pages that open with a `PageHero` were also
      rendering the section's own eyebrow + title immediately below it — `/sectors` showed
      "SECTORS / Who we build for" twice. `SectorsList` and `InsightsLinks` now take
      `hide-heading`; the lede is kept, since it is not duplicated.
- [x] **Census now detects broken images** (`img.complete && naturalWidth > 0`) across all
      pages, so a silent 404 shows up as a number rather than needing a human to notice.

### Full-site audit — findings and fixes

`tools/audit.mjs` was written for this pass and checks every route for: h1 count, heading
order, duplicate ids, duplicate eyebrows, dead internal links, external `target`/`rel`,
placeholder hrefs, broken images, missing `width`/`height`, unlabelled form controls,
landmark counts, SEO tags, console and page errors, and failed requests.

First run: **54 findings in 9 categories.** After the fixes below: **zero.**

- [x] **Dead footer links on every page.** `/privacy` and `/terms` have no routes, so both
      fell through to the 404. Marked `ready: false` and filtered out until the pages exist.
- [x] **Four placeholder social links on every page.** The `Follow` block now renders only
      when at least one handle has a real URL. Drop the hrefs into `content.js` and it
      reappears by itself.
- [x] **The company's own domain was an external link** in the footer, with no `target` or
      `rel`. Now an internal route to `/`.
- [x] **Every masthead was missing `width`/`height`** — six pages able to shift layout as
      the image arrived. `PageHero` now requires intrinsic `w`/`h`.
- [x] **Heading order skipped h1 -> h3** on `/sectors` and `/insights`, caused by the
      `hide-heading` fix removing the h2. Those items now render as h2 when the section
      heading is hidden.
- [x] **Duplicate "Clients & partners" eyebrow** on `/` and `/projects` — the Clients
      section and the split CTA panel used the same words. Panel is now "Our clients".
- [x] **Vision attribution used `<footer>` inside a blockquote.** Now `figure` +
      `figcaption`, the accessible quote/attribution pattern.
- [x] Audit itself corrected twice: `/downloads/*.pdf` is a static file not a route, and
      contentinfo landmarks must be counted rather than `<footer>` elements.

Behaviour verified beyond the static checks: hero autoplay with a cursor resting on it,
mobile nav open -> navigate -> auto-close, contact form refusing to fake a send and
offering `mailto:` instead, skip-link as first tab stop, and the 404 route rendering with
`noindex`. Facts re-checked: all 10 licence numbers and all 23 project references on
`/sectors` trace to BRIEF; the only unmatched figure site-wide is the PDF's file size.

### P2 — Services

- [x] **P2-1** Five services (Q5)
- [x] **P2-2** Services index page — `ServicesIndex.vue`
- [x] **P2-3** Five service pages at `/services/<slug>` on the IA's fixed template
- [x] **P2-4** Deliverables drafted **from source nouns only** (see §4). *Client to review once.*

### P3 — Projects

- [x] **P3-1** Register with filters — type tabs + sector, service, location; the status
      filter appears by itself once any project has a status. State lives in the URL query
- [x] **P3-2** Launch set = **all 36** projects in the profile
- [x] **P3-3** `/projects/<slug>` — year, status, value and gallery are `TBC` for every project
- [~] **P3-4** Case studies built (galleries filled from the PDF 2026-09-23) for TRA ITA, Zimbili Bridge and TSF2 New Luika — scope and
      facts filled from source; **challenge / solution / outcome are TBC** (client interviews)

### P4 — Sectors

- [x] **P4-1** One page, seven blocks; anchors `/sectors#<slug>` reserve the slugs (Q3)
- [x] **P4-2** Seven sector descriptions — written from BRIEF §5 projects only; client may reword
- [x] **P4-3** Built — evidence lines link to project pages; "All projects in this sector (n)"
      opens the register pre-filtered

### P5 — Contact & Legal

- [~] **P5-1** Form code is done: posts FormData to `contactPage.form.endpoint` with
      sending / sent / failed states, a `_gotcha` honeypot and a native no-JS fallback.
      **Endpoint is TBC** — paste a Formspree-style URL and it goes live (§7 Q4)
- [x] **P5-2** Contact page built — address, phone, email, working hours
- [x] **P5-3** Google Maps `<iframe>` (no API key needed); verified it resolves to NATAI PLAZA
- [x] **P5-4** Until the endpoint exists it still tells the visitor to email directly — never fakes a send
- [~] **P5-5** `/privacy` — drafted 2026-09-23 from what the site actually does. **Needs client / legal approval**
- [~] **P5-6** `/terms` — drafted, standard informational-site terms. **Needs client / legal approval**

### P6 — Later

- [~] **P6-1** News & Updates — block built, items TBC; hidden entirely when placeholders are off
- [x] **P6-2** Publications / Downloads — ships with the company profile; further downloads TBC
- [~] **P6-3** Careers — block built, TBC; set `items: []` to say "no open positions"
- [x] **P6-4** Already done — every photo is JPEG, largest 396 KB, `public/img` 3.9 MB.
      (The "needs compression" flags left in `image-manifest.json` are stale.)

### 5a. Placeholders — what the client still has to supply

**2026-09-23: the client asked for no "To be confirmed" boxes anywhere.** Done in two parts:

1. **Filled from the sources** — everything that had one:
   - 54 photographs from the designed PDF (pp. 16–42), each viewed and matched to its
     caption: 35 of 36 projects now have a main photo (Mtili–Ifwagi–Mkuta shares its
     only photo with Wenda–Mgama, so has none), 12 have galleries. `public/img/projects/`,
     listed in `image-manifest.json` → `projectsFromPdf`. None carries a date stamp.
   - 9 project facts from the PDF (BRIEF §5.2).
   - 7 sector descriptions, written only from the projects named in BRIEF §5.
   - Privacy Policy and Terms of Use — **drafted, not legally reviewed.** The privacy text
     states only what the site actually does. Client (ideally with legal advice) to approve.
2. **Hidden** — `SHOW_PLACEHOLDERS = false` in `src/data/tbc.js`. What no source contains
   is not invented; it simply does not render until it is supplied.

Still needed from the client (`npm run placeholders` — 128 on 2026-09-23), none visible:

| What | Where in `content.js` | Count |
|---|---|---|
| Project **year**, **status**, **value** (value only if publishable — else `null`) | `projectList[*]` | 36 · 36 · 35 |
| Case-study **challenge / solution / outcome** | `projectList[*].caseStudy` | 3 × 3 |
| Clients named in neither source | Oysterbay, Lafarge, Furahisha, Matomondo–Mlale | 4 |
| Social media URLs (footer Follow block appears once one is real) | `footer.columns[Follow]` | 4 |
| Form endpoint (Q4) — until then the form tells visitors to email | `contactPage.form.endpoint` | 1 |
| News items, careers, further downloads | `insights` | 3 |

To review gaps visually, set `SHOW_PLACEHOLDERS = true` locally — the chips come back.

## 6. Content & asset register

### The org chart — RECOVERED ✅
Not in the Word file (unreadable `.emf`), but **PDF page 14 has it as live text plus
98 vector shapes**. Extracted hierarchy:

```
Board of Directors
└── Managing Director and CEO
    ├── Director of Technical Services
    │   ├── HOD Structural and Bridges Eng.  → Senior Eng · Junior Eng · Technicians
    │   ├── HOD Dams and Water Infrastructures → Senior Eng · Junior Eng · Technicians
    │   └── HOD Civil & Highway Eng.         → Senior Eng · Junior Eng · Technicians
    └── Director of Admin and Finance
        ├── HR & Admin Manager
        ├── Accountant
        ├── Legal Officer (Company Secretary)
        └── IT & Systems Administrator
```

> ⚠️ **Query for the client:** their chart shows **four** engineering clusters but only
> **three** HOD labels — the topmost cluster has no HOD box. Either a fourth department's
> label was dropped in the artwork, or that cluster is an error. Confirm before reproducing.

> 📌 Note this hierarchy (Structural & Bridges / Dams & Water / Civil & Highway) supports
> the IA's five-service re-cut more than the profile's "Structural / Civil / Project
> Management" triad. Relevant to §7 Q5.

### Still missing — needs the client
| Item | Notes |
|---|---|
| Social media handles | `TBC` in `content.js`; the Follow block stays hidden until one is filled |
| Project **years** and **locations** | Almost entirely absent from both source documents |
| Case-study narratives | Challenge / solution / outcome exist nowhere — needs interviews |
| Mission & Values | Profile has **Vision only** |
| HSE content | Only the OSHA registration number exists |
| Sector descriptions ×7 | Not a concept in the profile |
| Privacy Policy / Terms | Do not exist |

### Photography — the standing constraint
I surveyed **every** source frame ≥1000px, including everything the first curation pass
rejected. The library contains **one** genuinely cinematic photograph (the TSF embankment,
hero slide 2), a portrait near-twin of it, some polished architectural **renders**, and
otherwise site-documentation photography — overcast, muddy, date-stamped, phone-camera.

Currently **17 usable images** for a site heading toward ~20 pages.

**The highest-value ask remains a drone shoot.** Half a day over New Luika or Buckreef
would beat anything in the document. Also: the single most impressive image in the whole
profile is a drone TSF aerial that survives **only inside a screenshot of a Word window** —
somebody has that original file.

Three images were removed from the build when the hero changed and are recoverable via
`image-manifest.json` → `source`: ZMT terminal aerial, Ulongoni bridge, old dissipater frame.

---

## 7. Open questions — blocking the go-ahead

| # | Question | Recommendation |
|---|---|---|
| ~~Q1~~ | **ANSWERED — SSG.** | **SSG.** `vite-ssg@28` supports Vite 8 and vue-router 5. Keeps all components, real HTML per route for SEO and link previews, still deploys as static files. Nuxt only if Insights becomes a real content operation. |
| ~~Q2~~ | **ANSWERED — standardised.** | **Standardise the primary CTA**, keep contextual ones ("See the portfolio", "View Capability"). |
| ~~Q3~~ | **ANSWERED — one page**, slugs reserved. | **One page for launch.** Far less copy to write; splits later without breaking URLs if slugs are planned now. |
| **Q4** | Enquiry-form backend — Formspree, Netlify Forms, or client host? | Affects where we deploy. Needs answering before P5. |
| ~~Q5~~ | **ANSWERED — five services** (Phase 2). | **Five.** The IA asks for it and the org chart corroborates it. |
| **Q6** | Confirm the missing fourth HOD on the org chart | Client question. |

---

## 8. How to pick this up in a new session

1. Read this file, then [`BRIEF.md`](BRIEF.md) and [`THEME_DNA.md`](THEME_DNA.md).
2. Check §5 for the next unchecked task; respect `[!]` and `[?]` markers.
3. Run the build and capture screenshots (§1 Rule 3) to see the current state before changing anything.
4. **Update §3, §4 and §5 of this file as part of the work, not afterwards.**
   A task is not done until its box is ticked here.
5. If the client sends new feedback, add a new round to §3 **before** starting work on it,
   so nothing is lost between sessions.

### Commands
```bash
npm run dev                                     # localhost:5173
npm run build                                   # -> dist/ (runs check-assets first)
npx vite preview --port 4173 --strictPort       # serve the build
npm run audit                                   # structural audit, all 51 pages
node tools/census.mjs                           # radius / shadow / overflow / contrast
npm run placeholders                            # every TBC still outstanding (-- --all)
node tools/shoot.mjs <url> docs/ref/build build # screenshot tiles + full page + mobile
python tools/optimize_images.py --dry-run       # image compression preview
```

### Conventions
- All copy and data lives in `src/data/content.js`. **No prose hardcoded in templates.**
- All tokens live in `src/style.css` `:root`. No magic colour values in components.
- Any deliberate departure from the theme gets a **comment in the code explaining why**,
  and a row in §4 of this file.
- Images: add to `docs/image-manifest.json` with source, dimensions, alt, project and
  confidence before using them.
