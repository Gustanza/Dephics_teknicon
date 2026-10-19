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

### Verified state as of last build (2026-09-27)
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

### Round G — Sectors, Insights, Contact and Footer measured against the IA document (2026-09-27)
| # | IA item | Status |
|---|---|---|
| G1 | Primary nav: Home · About Us · Services · Projects · Sectors · Insights · Contact Us | ✅ Exact, in order |
| G2 | Sectors: the seven, and "service vs sector" | ✅ All seven names verbatim; each evidenced by linked projects. Removed the definition said twice in a row (header + intro) |
| G3 | Insights: News & Updates · Publications / Downloads · Career; not an empty menu item | ⚠️ Publications (company profile) ✅ + the C4 curated links ✅. **News and Career: no content exists** — hidden until supplied. Josephat's WhatsApp reply (Media & Resources / Industry Trends / News…) was cut off in the screenshot — full text needed |
| G4 | Contact: address, telephone/mobile, email, social links | ⚠️ Address, telephone, mobiles, email ✅ (client-supplied 2026-10-15, BRIEF §9). **Social** — no handles supplied (P0-2) |
| G5 | Contact: Google map of the office | ✅ Now in the office column beside the form (was full width below) |
| G6 | Contact: enquiry form — name, organisation, email, phone, enquiry | ✅ All, plus Subject. ⚠️ Not connected to an inbox yet (Q4); it tells visitors to email until then |
| G7 | Contact: working hours | ⚠️ **The hours shown were invented** (Mon–Fri 08:00–17:00, weekends closed — in no source). Withdrawn 2026-09-27, now a client placeholder, hidden. Also removed the unsourced promise "We respond to every enquiry received during working hours" |
| G8 | Footer: About Teknicon + profile download · Services · Contact details · Legal | ✅ |
| G9 | Footer: Quick Links | ❌ Removed by team decision (see §4) |
| G10 | Footer: Professional Credentials — logos or accreditations | ✅ New ruled row: ERB LCF 122 · ACET 061 · OSHA 313-102-022 · BRELA 71672 (text; logos if supplied). Replaces the bottom-bar registration line |

### Round F — Services and Projects measured against the IA document (2026-09-27)
| # | IA item | Status |
|---|---|---|
| F1 | Services: five capability areas, named as the IA names them | ✅ All five; water service uses the IA's Home name (Round D) |
| F2 | Services: each area's scope bullets | ✅ All 25 lines verbatim (checked programmatically against the PDF) |
| F3 | Service page format: overview · scope · typical deliverables · relevant sectors · related projects · consultation CTA | ✅ All five pages, in that order. CTA reads "Contact us" (C2) |
| F4 | Projects: All Projects, filter by sector, service, location **and status** | ⚠️ Type, sector, service, location built. **Status**: no project has one in any source — the filter appears by itself once the client fills `status` |
| F5 | Projects: three categories | ✅ Buildings & Facilities 14 · Transport & Urban Infrastructure 12 · Water, Dams & TSF 10 |
| F6 | Featured Project Case Studies: challenge, scope, solution, facts, images, outcome | ⚠️ Three chosen. Narratives exist in no source → labelled **"Featured project"** until they do (`hasCaseStudy()` switches the wording to "Case study" by itself). Removed the lone "Scope" block that repeated the fact sheet |
| F7 | Project page: client, location, year, services delivered, value if publishable, gallery, related services | ⚠️ Client, location, services, related services on all 36; value on 1 (only TRA ITA's is in the source); gallery on 12. **Year** on none — client input |
| F8 | "Similar work" on project pages | ✅ Fixed: ranked by type, then service overlap (Jaccard), then sector — was sector-only, so a bridge page led with a workshop, then a bus terminal |
| F9 | /projects header claimed work "delivered across … Uganda" | ✅ Fixed — the Uganda High Commission is in Dodoma. Now "across Tanzania, including Zanzibar, and in Rwanda" |
| F10 | /projects closing panel "Who do we work for? → See our clients" linked to the Clients section just above it | ✅ Replaced with the contact panel, as on Home |

### Round E — About Us measured against the IA document, item by item (2026-09-27)
| # | IA About item | Status |
|---|---|---|
| E1 | Company Overview: background, establishment, ownership, office location, professional positioning | ✅ Positioning statement (PDF p.7 wording) + fact row: Established · Ownership · Head office |
| E2 | Vision, Mission & Values: vision, quality-driven approach, core principles | ⚠️ Vision + "Our objective" + four "Core principles", all profile wording. **No Mission or Values labels** — neither exists in any source. Client to supply |
| E3 | Leadership & Our Team (→ positions, C3) incl. qualifications, disciplines, experience | ✅ Org chart + "Overall team strength" (Disciplines · Core strengths · Experience 7–34 yrs), PDF p.46. Removed an invented line ("names provided on request and in tender submissions") |
| E4 | Quality, HSE & Compliance | ⚠️ Heading adopted on /about; QA steps + a "Health, safety & compliance" step (OSHA 313-102-022, licences "continuously active and compliant"). **No HSE policy in any source** — client to supply |
| E5 | Organisation Structure | ✅ Merged with E3. Open: Q6 (fourth HOD); and the About intro's three departments (Structural · Civil · PM) disagree with the chart's (Structural & Bridges · Dams & Water · Civil & Highway) — both are the profile's own; see Q9 |
| E6 | Licences & Professional Memberships | ✅ All 10. ⚠️ Business licence expires 2026-11-19; tax clearance and ERB practising licence 2026-12-31 — must be refreshed |
| E7 | Download Company Profile (+ any capability statement) | ✅ PDF. No capability statement exists |

Page order now follows the IA: Overview · Vision · Leadership/Organisation · Quality/HSE · Licences. Licences moved to the paper band so the page alternates.

### Round D — Home page measured against the IA document, item by item (2026-09-27)
| # | IA Home item | Status |
|---|---|---|
| D1 | Slide 1: "We are Consulting Engineers and Project Managers" + supporting message + two CTAs | ✅ Done — IA headline verbatim (supporting message removed by client 2026-10-19). Buttons: "Explore our services" → `/services`, **"Contact us"** → `/contact` (C2 overrides the IA's "Request a Consultation"). Image: stock (Pexels) since 2026-09-27 — see §4 |
| D2 | Slides 2–3/4: "Teknicon to provide…" captions | ✅ Drafted — slides 2–3 now open "TEKNICON provides…", sourced from BRIEF, each linking to its service. **Client to approve wording.** Kept at 3 slides: no 4th hero-grade photograph |
| D3 | Brief intro → About, *or* CEO foreword | ✅ Intro option done. CEO foreword exists in no source — client to supply if wanted |
| D4 | Four service highlights | ⚠️ Three shown, per the client's 2026-09-23 request (PM reached via "All services"). **Client to choose 3 or 4** (§7 Q7). Water service now carries the IA's Home name |
| D5 | Featured projects | ✅ Done (6 cards). Case-study narratives still client input (§5a) |
| D6 | Sectors served | ✅ Done (7) |
| D7 | Why work with Teknicon — 4 differentiators | ✅ **New section** (`WhyTeknicon.vue`). "Established since 2009" set as "Established in 2009" |
| D8 | Client and partner logos | ⚠️ 11 mining/water/industrial logos only. Public-sector logos (TRA, TIPER, MSD, TARURA, ministries, Judiciary, UDSM) and any partner marks: client to supply files + permission |
| D9 | Contact / enquiry strip | ✅ Done — Home's second CTA panel now carries phone (tap-to-call), email and address instead of "Who do we work for?" |

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
| **`public/.htaccess` ships with every build (cPanel / Apache)** | Live site 404'd on any page opened in a new tab or refreshed (2026-10-15): the build writes `about.html` but links use `/about`; in-page clicks never ask the server, direct loads do. `/services` also redirected to the `services/` folder and printed a directory listing. The file maps clean URLs to `.html`, 301s trailing slashes away, turns off listings and serves `404.html`. Verified on a local Apache (XAMPP, port 8099) — full audit clean via direct loads. **Upload `.htaccess` with `dist/`** — cPanel File Manager hides dotfiles by default |
| **Contact details replaced (client, 2026-10-15)** | New address (Natai Plaza, 17 Coca Cola Road — no floor/suite), Tel +255 752 594 793, two mobiles. All live in `company` in `content.js`; header, footer, contact page, Home/Projects contact panel, About fact row, privacy text, contact-page meta and map query updated. Old landline +255 22 2700403 and "4th Floor, Suite No. RT 01B / Plot 17" must not reappear — BRIEF §9 |
| "Contact Us" out of the desktop menu bar (client, 2026-10-15) | The red "Contact Us" button sits beside it, so it appeared twice. Marked `bar: false` in `nav`: dropped from the desktop bar only. The slide-out menu (≤1279px) keeps it — below 640px the button is hidden and that item is the phone's only route to /contact |
| Header menu centred, spacing scales with width (client, 2026-10-15) | With Contact Us out of the bar, the empty space pooled before the button and read as a missing item. The menu now centres between logo and button (`flex: 1`), and above 1380px item spacing grows from .9em to 1.5em at 1920. Measured every 10px 1280–1920: gaps either side equal at every width, no overflow, row height unchanged |
| Hero frozen to slide 1; first button reads "Services that we offer" (client, 2026-10-15) | Slides 2 and 3 carry `frozen: true` in `heroSlides` — kept, not deleted. With one slide the hero is a still: no autoplay, no "01 / 03" counter, no live-region announcements, frozen slides' images not loaded. Remove the flag to restore a slide |
| Hero slide 2 (dams) restored (client, 2026-10-19) | `frozen` removed from slide 2; slide 3 (TRA ITA) stays frozen. Two slides: autoplay and the "01 / 02" counter return |
| Hero slide 2 reworded (client, 2026-10-19) | Eyebrow "Structural & Bridge Engineering"; headline "We design and supervise buildings and special structures under varied site conditions." (three lines); lede removed — `Hero.vue` now skips the paragraph when a slide has no `lede`. Photo (dam) and button (→ water/dams service) unchanged pending client decision |
| Hero slide 1 eyebrow → "Established Since June 2009" (client, 2026-10-19) | "· Dar es Salaam" dropped; "in" then changed to "Since" at the client's request. Renders uppercase per the eyebrow style |
| Hero slide 1 lede removed (client, 2026-10-19) | The IA supporting message ("We do multidisciplinary engineering…") is gone; neither shown slide now has a lede |
| Home welcome note: "Established 2009" overlay removed (client, 2026-10-19) | `welcomeNote.year` commented out; `WelcomeNoteFuse.vue` renders the year block only when set. Collage slices unchanged |
| Home welcome note reheaded (client, 2026-10-19) | Eyebrow "Welcoming Note"; heading "Word from our / CEO & Managing Director" (client asked for CEO first, later the same day; the signature keeps the docx's "Managing Director & CEO") (was "Turning visions / into reality") |
| Home welcome note: dark statement band removed (client, 2026-10-19) | The band (eyebrow "From our Managing Director", closing line at 57px, signature) is gone. The closing line (bold, heading colour) and the signature (name + role) now end the letter text beside the collage, before the button — so the note reads once, in the order of `tekres/Welcoming note2.docx`, and stays signed. Lede to the right of the heading unchanged (docx paragraph 1, verbatim). `statementEyebrow` / `closingAccent` deleted from `welcomeNote` |
| /services hero reworded (client's handwritten note, 2026-10-19) | Heading "What clients hire us to do" (was "What a client hires us to do"); lede "From feasibility studies and detailed design to construction supervision and project management." (was "Five services, one engineering practice — …Defects Liability Period."). The note read "From feasibility studies, detailed design, and construction supervision & project management", tidied to a from/to sentence. Eyebrow "Services" unchanged. (Applied to the Home services section first by mistake, then reverted — Home is back to "What we do" / "From feasibility study to defects liability") |
| About › Licences split into two tabs (client's handwritten note, 2026-10-19) | Heading "Registered & Continuously Compliant". Tabs "Statutory Compliance" (BRELA, TRA, OSHA, Licence (Municipal), NSSF, WCF, ATE, Local Content) and "Professional Compliance" (ERB, ACET, AEQSRB Zanzibar, IET), in the note's order. By organisation: TRA's three certificates → one row, ERB + practising licence → one row. WCF, ATE, Local Content, AEQSRB, IET are new — recorded in BRIEF §7a; their standing line is `tbc()` (hidden at launch setting). Third professional body is the Zanzibar AEQSRB — first misread as the mainland AQRB, corrected the same day. WAI-ARIA tabs, both panels prerendered. **Open: which register "Local Content" is; Teknicon's standing with the five new bodies** |
| Home welcome note alignment (client, 2026-10-19) | The letter text started ~50px right of the quoted lede above it, and sat low (centred against the collage). `.wf__head` now uses the same columns/gap as `.wf__grid` (630fr / 547fr, `--space-large`; `--space-medium` below 1280) so both share a left edge, and `.wf__grid` aligns to the top |
| Water service: comma after "Water" dropped (client, 2026-10-19) | Now "Water Dams & Tailings Storage Facilities": service title, sector name, /services and /projects meta descriptions, /projects hero lede ("water dams and tailings storage facilities"), checklist tool. Route slug unchanged. Quotes of the IA's original wording left as written |
| Home sectors section reworded (client's handwritten note, 2026-10-19) | Heading "Sectors that we serve" (was "Who we build for"); link "More details →" (was "All sectors →"), still to /sectors, with a visually-hidden "about the sectors we serve" for screen readers. Label text moved to `sectors.moreLink`. Eyebrow "Sectors" kept. /sectors page unaffected (it hides this heading) |
| Clients section heading → "Some of our clients & partners" (client's handwritten note, 2026-10-19) | Was "Mining, water and industrial clients & partners". The profile's own section title (BRIEF §8). Shared component, so it changes on Home and /projects. Eyebrow, note and logos unchanged — the note still scopes the marks to mining, water and industry |
| "Why work with Teknicon" reworked (client's handwritten note, 2026-10-19) | Title "Why Teknicon?". Reasons reordered and retitled: 1 Established in 2009 · 2 Wholly owned by Tanzanian nationals (note cut off after "Wholly owned by" — finished from BRIEF §1) · 3 Registered with relevant professional bodies · 4 Engagement in the entire project lifecycle. Supporting lines moved with their reasons; #2's line no longer repeats the title ("A local consultancy registered under the Companies Act…"). Eyebrow "Key differentiators" kept |
| Counter band reworked (client's handwritten note + mockups, 2026-10-19) | Eyebrow "The vital numbers" (was "The practice in numbers"). Three figures, not four: 17 Years in practice · **100** Projects and more (was 40 Named projects) · **3–40** Years range of individual professional experiences (was 34 Years, longest track record). Staff count (14) and the "Established June 2009…" note removed. `Counters.vue` now supports a range (`to`), counts both ends up, reads "3 to 40" to screen readers; grid 3 columns, stacked on phones. New figures recorded in BRIEF §10 |
| Experience range 7–34 → **3–40** site-wide (client, 2026-10-19) | Counter band, About team-strength figure, team lede ("ranging from 3 to 40 years"), checklist tool; BRIEF §2b/§6 annotated. An individual's own `years: 34` in the (internal) roster left as is — it is one person's figure, not the range |
| Phone number removed from the desktop header bar (client, 2026-10-19) | `.hdr__phone` link and its CSS deleted from `SiteHeader.vue`. Number unchanged in `company`; still in the slide-out menu, footer, contact panel and /contact |
| Home "Who we are" intro hidden (client, 2026-10-15) | Client did not align with it. Commented out in `HomePage.vue` (line + import) — `HomeIntro.vue` and `homeIntro` copy kept. The hero now leads straight into the services cards |
| Services reordered to match Home (client, 2026-10-15) | `services.items` now runs Structural 01, Civil 02, Water/Dams/Tailings 03, then Engineering Design 04, Project Management 05 — the three Home cards first, in Home order. /services, footer, "Service n of 5", prev/next and the project filter all follow the array |
| **Welcome note slices: rounded corners + new photo** (2026-10-16) | DEPARTURE, client request: the three photo slices in `WelcomeNoteFuse.vue` take a 12px radius (`--rad-slice` in `style.css`) to match the Genesis reference — the only non-0/50% radius on the site; `tools/census.mjs` allows it by class `wf__slice` alone. Photo swapped from the survey team to the TRA ITA Hotel tower render (real Teknicon project; no staff/CEO photos exist, BRIEF §6) — the Uganda High Commission render was tried first but is too wide for the 630×860 box (bottom slice was all road). Slices then widened (client): 75/86/84% of the box (was 70/76/72), stagger kept; then slice 1 lengthened to 84% (client; 92% tried, too wide) and the "Established" label moved above "2009" so the slice can run under the year, and the section clips sideways so the 60px enter motion cannot scroll a 360px viewport. Then (client) the eyebrow + h2 moved into a head row above the collage, split like the Clients section head: heading left, lede right under a 1px hairline at 15px `--c-text-light`; the text column beside the collage keeps the vision paragraph, body and button. Head change not yet verified. Same head split applied to the Home "What we do" section (`Services.vue`, was one centred block); the right-hand lede in the Home head splits (welcome note, Services, Projects footnote, Clients) is set as body text (`--c-text`, regular, body size); only the welcome note's is in quotes |
| **EXPERIMENT v4: welcome note from Fuse's About page** (2026-10-16) — **live on Home** | Heading reworded at the client's request: eyebrow "Message from the CEO", h2 "Turning visions / into reality" (from the note's 4th paragraph; an interim "Leadership message / A personal welcome from our CEO" was dropped) (was "Welcome note" / "Welcome to TEKNICON LTD"). `WelcomeNoteFuse.vue`, same `welcomeNote` content. Two blocks of the real Fuse About page (`docs/ref/fuse/about-00…02`, measured at 1440 — THEME_DNA does not cover them): (1) the "1995 / START IN" intro on white — two-photo collage (A 440×590, B 410×450 overlapping lower-right; real Teknicon sites: Kilombero pump station + survey team), **2009** at 145px in the accent straddling A, "Established" label, letter in the right column, navy button to /about; geometry in % of the 630×756 box, year in `cqw`, so it scales as one piece. (2) the "WHAT WE DO" dark band — closing line at 57px with "sustainable future." in brand red, underlined (brand red, not `--c-link`: large text on `--d-bg`), signed by name + role beneath. At 1440 the collage measures exactly the demo's boxes. Verified 1440/1280/1024/390; audit + census clean |
| EXPERIMENT v3: welcome note as a dark band (2026-10-16) — kept, not live | `WelcomeNoteBand.vue`: `--d-bg-mid` band, survey photo as 12% texture (scaled 125% from top to keep the date stamp out), ghost marquee, body in three ruled columns, qw-big finale. Not given a final audit before v4 replaced it |
| **EXPERIMENT: MD's welcome note on Home** in the hidden intro's slot (2026-10-16, v2 same day) | Text verbatim from `tekres/Welcoming note2.docx` (`welcomeNote` in content.js; source logged BRIEF §6a — first source for "CEng." and "Managing Director & CEO"). **v2** (client: v1 wasted space — sticky heading left ~900px of empty column): `WelcomeNote.vue` = photo column (real Teknicon survey team, `site-survey-team.jpg`) stretched to the letter's height, with a flat `--d-bg` panel carrying the vision (BRIEF §2) on its lower edge · letter column: eyebrow + h2, 24px lede in ink, 1px hairline, body in two columns ≥768px, hairline + signature · finale: closing line at h1 typography (qw-big, §4.4) under the 34×1px rule, then the /about button. Below 1280 it stacks, panel under a top-anchored 16:9 crop (keeps both engineers in frame and the camera date stamp out). Verified 1440/1280/1024/768/390: no overlap, no overflow; audit + census clean. ⚠️ `hero-dam-reservoir.jpg` (frozen hero slide 2) is a Pexels photo of Glen Canyon Dam, USA — not Teknicon work; flag before unfreezing. Revert: one line + import in `HomePage.vue` |
| Footer headings promoted h3 → h2 | On pages without their own h2 (`/privacy`, `/404`) the footer skipped a level. Styling is by class, nothing moved |
| Split-CTA buttons → real routes | `#contact` scrolled to the footer and `#clients` did not exist on most pages |
| Consultation band uses red + navy buttons | The client's chosen brand pair (P0-1); an outline button hovers navy and vanishes on the dark band |
| Home hero slide 1 uses the IA's headline verbatim | Round D. The previous "Engineering that holds Tanzania together" was ours, not the client's. Hero content widened 900 → 1240px so the longer headline keeps the theme's two lines at 87px; on phones the lines flow and balance |
| "Why work with Teknicon" reuses the Quality split | Fuse's sticky-column + node-timeline (THEME_DNA §4.2 / §12 row 5). Both now render through one `NodeSplit.vue`; Quality is a thin wrapper. Paper band so it steps off the white Sectors above |
| Home contact strip = the Fuse CTA panel row, second panel repurposed | THEME_DNA §7.6 is two photo panels, not a thin strip, so the row stays; only panel 2's content changes. Other pages keep "Who do we work for?" (`SplitCta` takes a `panels` prop) |
| **`Button` binds only the attribute its element needs** | Bug found 2026-09-27: `href: undefined` passed to RouterLink overwrote its computed href, so **every internal button site-wide** shipped as `<a>` with no href — JS-clickable but unfocusable and uncrawlable. Same defect fixed in the footer website link (all pages) and About's departments link (read `.href`, data had `to`). Build now has 0 href-less anchors |
| **Insights shipped in two versions, side by side** (team decision 2026-09-29) | The menu item keeps its name; hovering it opens a Fuse sub-menu (THEME_DNA §9.4): **Insights 1** = `/insights`, the client's WhatsApp version (C4 links); **Insights 2** = `/insights/resources`, the IA's own spec (News & Updates · Publications / Downloads · Career), so the client can choose. News holds two real, sourced 2026 items (revised profile; ERB practising licence) — no invented news. Career shows the org chart's roles and a career-enquiries line to info@ (**client to approve — Q12**). Sub-menu labels are placeholders; rename in `nav` once the client picks |
| **Insights 2 filled with SAMPLE news and vacancies** (team decision 2026-09-29) | The client has supplied no news and no openings, so Insights 2 carries demonstration content for review: 4 articles (each with its own page at `/insights/resources/<slug>`) and 3 vacancies. Article facts are the profile's own (New Luika TSF2 phases; Zimbili & Ulongoni; the QA procedure; 2026 registrations) — only dates and framing are sample. Vacancies use the org chart's real departments; roles, requirements and closing dates are sample. Every item shows a **"Sample"** tag. **Before launch: set `insightsResources.showSamples = false`** in content.js — that removes every sample item and its page in one go. Stock images (Insights 2 masthead; the QA note) are logged under `stock` in image-manifest.json |
| **All buttons in title case** (2026-09-29) | Major words capitalised; a, an, the, and, or, of, to, in, on, for, at, by, with lower case unless first ("See the Projects", "Reach Out to Us"). Split-CTA "Request a proposal" → **"Reach Out to Us"**. Email-address buttons left as typed. Verified against every `.btn` in the built site (15 labels, 56 pages). Text links (e.g. "Read article") keep sentence case |
| Filters no longer move the page | Bug (2026-09-29): each project-register filter rewrites the URL query, and `scrollBehavior` in main.js treated that as a navigation — jump to top, or re-scroll to #register. Now a same-path, same-hash change returns `false` (stay put). Verified: 4 tab clicks + 2 selects, scroll position unchanged; real page navigation still starts at the top |
| **Hero slide 2 → stock photograph of Glen Canyon Dam** (team decision 2026-09-29) | The TSF-embankment frame did not read as "dams", and Teknicon's own 350 ML masonry-dam photo was judged not strong enough. Of the three stock downloads (Hoover Dam ×2, Glen Canyon Dam) Glen Canyon was used: dam and reservoir in one frame, no flag. ⚠️ Recorded risk: a recognisable US landmark sits under a caption naming Shanta / Buckreef / Matongo / Anglo de Beers — replace with an original client photograph or drone shot when available. Logged as STOCK in image-manifest.json |
| **Footer "Professional Credentials" row removed** (team decision 2026-09-29) | Deliberate departure from the IA footer, like Quick Links. Footer is now About · Services · Contact Details + the legal bar |
| **No registration numbers anywhere on the site** (team decision 2026-09-29) | Treated as private company information. Removed from: footer credentials (now names + standing), About licences (all 10 kept by name with a standing line; numbers and expiry dates dropped), About HSE step, Home "Why Teknicon", Insights 1 link notes, the sample "Registrations 2026" article. `credentials` data and Credentials.vue deleted. Scan of all 56 built pages: none left. Numbers stay in BRIEF §7 for internal use. ⚠️ The downloadable company-profile PDF still contains every number (p.47) — see Q13 |
| **Home registration strip removed** (team decision 2026-09-29) | ERB · ACET · OSHA · BRELA · NSSF numbers under the hero were judged internal information. `Credentials.vue` is no longer on Home; its data still feeds the footer's Professional Credentials row. Open: the footer row and the About licences table (which also lists TIN, VAT, tax clearance) carry the same kind of numbers — see Q13 |
| **Hero slide 1 uses a stock photograph** (Pexels, `hero-crane-yard-dusk.jpg`) | 2026-09-27, for resolution: the TIPER frame (1646×602) ran at ~2.9× on a retina laptop and looked soft. Allowed on slide 1 only, because its headline names no project; slides 2–3 name real work and keep Teknicon's photographs. Rejected candidates: a Chinese crane truck showing a stranger's phone number; European (PERI / TOI TOI) and US sites; a Turkish tower crane ("AVCILAR" sign). Recorded in image-manifest.json as STOCK. The real fix is still the client's original camera files |
| **Footer Quick Links column removed** (deliberate departure from the IA footer) | Team call, 2026-09-27: About Us / Projects / Sectors / Contact are all in the primary nav, which is sticky, so the column only repeated it. Footer is now three columns (About · Services · Contact Details) + the legal bar. Note the IA also asks for a **Professional Credentials** footer part (registration/membership logos) — not built; the bottom bar carries ERB · ACET · TIN as text. Needs logo files from the client if wanted |
| Water service renamed **"Water, Dams & Tailings Storage Facilities"** | The IA used two names (Home + Projects: "Tailings Storage Facilities"; Services: "Mining Infrastructure"). Client instruction 2026-09-27: use the Home wording. Title, card tag ("Water & Tailings"), route (`/services/water-dams-tailings-storage-facilities` — safe, site not yet live) and `/services` meta all changed; now matches the hero slide 2 eyebrow and the Projects category |
| Service cards share row tracks (CSS subgrid) | Client flagged (2026-09-27): a three-line title ("Water, Dams & Mining Infrastructure" at 1024–1280) pushed that card's photo and button below its neighbours'. Now header / photo / description / button are shared tracks, so every row aligns whatever the copy. Six-column grid keeps an incomplete last row centred. Verified aligned at 1024–1920 |
| Header at laptop widths (1280–1499): phone number hidden, menu tightened below 1380 | The nowrap menu had squeezed the 5:1 logo into a 46px square at 1280 (seen in the client's screenshot); un-squeezing it showed the row was up to 184px too wide and the CTA ran off the page. Logo now never shrinks. Swept every 10px 1280–1920, sticky and transparent: logo 5:1, no overflow |

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
| **Q7** | Home service highlights: 3 (their 23 Sep request) or the IA's 4? | Client decision. *(The water service's name is **settled**: "Water Dams & Tailings Storage Facilities" everywhere, 2026-09-27; comma dropped 2026-10-19 — see §4.)* |
| **Q8** | Approve slide 2–3 captions; supply CEO foreword (optional) and public-sector client logos with permission | Client input. See Round D |
| **Q9** | Which department structure is current? The profile text names Structural & Bridge · Civil · Project Management; its org chart names Structural & Bridges · Dams & Water · Civil & Highway. Both appear on /about | Client. The chart looks newer and matches the five-service IA |
| **Q10** | Mission statement, Values, HSE policy, capability statement | Client input — none exist in the profile, so none were written |
| **Q11** | Office working hours; ~~a mobile number~~ (supplied 2026-10-15); social media URLs; News items and a Careers page for Insights; the rest of Josephat's "Insights → Media & Resources" message | Client input |
| **Q12** | Insights: keep version 1 (links), version 2 (news · publications · career), or both? And may career enquiries go to info@teknicon.co.tz? | Client decision — see §4 |
| **Q13** | The downloadable company profile PDF (on About, Insights and the footer) lists every registration number on p.47. Keep offering it, remove the download, or have the client supply a public version without p.47? | Team / client decision |

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
