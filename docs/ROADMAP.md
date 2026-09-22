# TEKNICON WEBSITE — PROJECT STATE & ROADMAP

**Single source of truth for where this project is and what happens next.**
If you are picking this up in a fresh session, read this file top to bottom before
touching anything. Everything you need is either here or linked from here.

- **Last updated:** 2026-09-22
- **Current phase:** Landing page delivered · multi-page rebuild planned, **not started**
- **Status of this plan:** awaiting client go-ahead

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
Vue 3.5 · Vite 8 · **no router** (single page) · Playwright 1.62 for verification.
No CSS framework. Tokens in `src/style.css`, all content in `src/data/content.js`.

### Page structure (`src/App.vue`)
`Hero → Credentials → About → Services → Quality → Projects → Clients → Counters →
Vision → Team → SplitCta → SiteFooter`

### Components
`src/components/` — About, Clients, Counters, Credentials, Hero, Projects, Quality,
Services, SiteFooter, SiteHeader, SplitCta, Team, Vision
`src/components/ui/` — Button, Logo, Reveal, ScrollTop, SectionHeading
`src/composables/useReveal.js` — one shared IntersectionObserver

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

## 5. TASK TRACKER

Status key: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[?]` needs a decision

### P0 — Outstanding on the current landing page

- [ ] **P0-1** Outlined hero button (`.btn--light`) sweep → brand navy instead of white
  *Two lines in `src/style.css`: `--sweep: var(--c-btn-hover); --sweep-text: #fff`.
  Affects 3 buttons (hero secondary + 2 split-CTA). White-on-navy = 10.15:1, safe.*
- [!] **P0-2** Replace `#` placeholder social links in the footer
  *Blocked on the client supplying real handles. `src/data/content.js` → `footer.columns[Follow]`.*

### P1 — Routing spine (the foundation for everything else)

- [?] **P1-1** Choose SSG vs Nuxt — **see §7 Q1**
- [ ] **P1-2** Add `vue-router@5` + `vite-ssg@28` *(confirmed compatible with Vite 8)*
- [ ] **P1-3** Create route structure and `src/pages/`; move `App.vue` sections into pages
- [ ] **P1-4** Header: replace scroll-spy with route-based active state; keep hover colour behaviour
- [ ] **P1-5** Per-route `<title>`, meta description, canonical, OG tags
- [ ] **P1-6** ⚠️ **Replace Team roster with the org chart (positions, not individuals)**
  *`src/components/Team.vue` currently publishes 6 named engineers with years of service.
  This conflicts with client policy C3 and must not ship. Chart data is recoverable —
  see §6. The 14 named personnel stay in BRIEF §6 as internal reference only.*
- [ ] **P1-7** Build the org chart as native responsive HTML/SVG (not an image)
- [ ] **P1-8** Footer restructure to the IA's five columns: About Teknicon (+ profile
      download) · Services · Quick Links · Professional Credentials · Contact + Legal
- [ ] **P1-9** Insights page — curated links: ERB, IET, OSHA Tanzania, TANROADS, TARURA, FIDIC, TBS
      *Verify every URL before shipping.*
- [ ] **P1-10** Standardise CTA copy per C2 — **pending §7 Q2**
- [ ] **P1-11** Company Profile PDF download (asset already in `tekres/`)

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
- [ ] **P5-2** Contact page: address, phone, email, socials, working hours
- [ ] **P5-3** Google map embed
- [ ] **P5-4** Enquiry form + spam protection
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
| **Q1** | SSG on the current stack, or migrate to Nuxt? | **SSG.** `vite-ssg@28` supports Vite 8 and vue-router 5. Keeps all components, real HTML per route for SEO and link previews, still deploys as static files. Nuxt only if Insights becomes a real content operation. |
| **Q2** | "Contact us" on every primary CTA, or only the Home slideshow button? | **Standardise the primary CTA**, keep contextual ones ("See the portfolio", "View Capability"). |
| **Q3** | Sectors — 7 pages or 1 page with 7 blocks? | **One page for launch.** Far less copy to write; splits later without breaking URLs if slugs are planned now. |
| **Q4** | Enquiry-form backend — Formspree, Netlify Forms, or client host? | Affects where we deploy. Needs answering before P5. |
| **Q5** | Three departments or the IA's five services? | **Five.** The IA asks for it and the org chart corroborates it. |
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
