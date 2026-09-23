# TEKNICON WEBSITE — PROJECT STATE & ROADMAP

**Single source of truth for where this project is and what happens next.**
If you are picking this up in a fresh session, read this file top to bottom before
touching anything. Everything you need is either here or linked from here.

- **Last updated:** 2026-09-22 (Phase 1 in progress)
- **Current phase:** **Phase 1 complete.** 7 prerendered pages, all audited clean.
- **Status:** go-ahead given; the six open questions were answered with the recommended defaults (see §4)

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

### Routes — 7 pages, each prerendered to static HTML
`/` · `/about` · `/services` · `/projects` · `/sectors` · `/insights` · `/contact`
plus a catch-all 404. Defined with their `<head>` meta in `src/router/routes.js`.

`src/App.vue` is now a layout shell only: `SiteHead · SiteHeader · <RouterView> ·
SiteFooter · ScrollTop`. Page composition lives in `src/pages/`.

### Page composition
- **Home** — Hero · Credentials · HomeIntro · Services(teaser) · Projects(teaser) ·
  SectorsList(teaser) · Counters · Clients · SplitCta
- **About** — PageHero · About · Vision · Quality · **OrgChart** · Licences · SplitCta
- **Services / Projects / Sectors / Insights / Contact** — PageHero + their section(s)

### Components
`src/components/` — About, Clients, ContactBlock, Counters, Credentials, Hero, HomeIntro,
InsightsLinks, Licences, OrgChart, PageHero, Projects, Quality, SectorsList, SiteFooter,
SiteHead, SiteHeader, SplitCta, Vision
`src/components/ui/` — Button (supports `to` for routes), Logo, Reveal, ScrollTop, SectionHeading
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

### Verified state as of last build
0 non-`0`/`50%` border-radii · 0 box-shadows · one `<h1>` · all images have alt text ·
no horizontal overflow at 360/390/768/1024/1280/1440/1920 · zero console messages ·
zero failed requests · `prefers-reduced-motion` fully honoured · dist ≈ 3.5 MB.

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
| C1 | **Nav must link to real pages, not in-page sections** | ⏳ Planned — Phase 1 |
| C2 | "Request a Consultation" → **"Contact us"** | ⏳ Planned — **needs decision, see §7 Q2** |
| C3 | Leadership shown as **positions, not individuals** — use the org chart | ⏳ Planned — **breaks the current Team section, see §5 P1-6** |
| C4 | Insights = curated external links (ERB, IET, OSHA Tanzania, TANROADS, TARURA, FIDIC, TBS) | ⏳ Planned — Phase 1 |
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
- [ ] **P1-12** Emit a `404.html` for static hosting (catch-all route is not prerendered)
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

- [?] **P2-1** Three departments or the IA's five services? — **see §7 Q5**
- [ ] **P2-2** Services index page
- [ ] **P2-3** Five service pages on the IA's fixed template: overview · scope of work ·
      typical deliverables · relevant sectors · selected related projects · CTA
- [ ] **P2-4** Write "typical deliverables" per service *(not in any source — needs drafting)*

### P3 — Projects

- [ ] **P3-1** Projects index with filters (sector, service, location, status)
- [ ] **P3-2** Select the launch project set from the profile *(authority granted in C5)*
- [ ] **P3-3** Project detail template: client · location · year · services · value · gallery · related services
- [ ] **P3-4** 2–3 featured case studies: challenge · scope · solution · facts · images · outcome
      *[!] Blocked — this narrative does not exist in any source. Needs client interviews.*

### P4 — Sectors

- [?] **P4-1** Seven pages or one page with seven blocks? — **see §7 Q3**
- [ ] **P4-2** Write seven sector descriptions *("sector" is not a concept in the profile)*
- [ ] **P4-3** Build

### P5 — Contact & Legal

- [?] **P5-1** Choose enquiry-form backend — **see §7 Q4**
- [x] **P5-2** Contact page built — address, phone, email, working hours
- [x] **P5-3** Google Maps `<iframe>` (no API key needed); verified it resolves to NATAI PLAZA
- [!] **P5-4** Form markup built with real labels — **deliberately inert.** On submit it tells
      the visitor to email directly rather than faking a send. Blocked on P5-1.
- [ ] **P5-5** Privacy Policy *(needs drafting, arguably legal input)*
- [ ] **P5-6** Terms of Use *(same)*

### P6 — Later

- [ ] **P6-1** Insights: News & Updates
- [ ] **P6-2** Insights: Publications / Downloads
- [ ] **P6-3** Insights: Careers
- [ ] **P6-4** Image compression pass before launch (`tools/optimize_images.py`)

---

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
| Social media handles | Footer links are `#` placeholders right now |
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
npm run build                                   # -> dist/
npx vite preview --port 4173 --strictPort       # serve the build
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
