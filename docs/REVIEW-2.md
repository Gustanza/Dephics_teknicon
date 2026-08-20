# Review round 2

Measured against the production build at `http://localhost:4173/` (Playwright 1.62.1, DSF 1),
re-running every census from round 1 plus new probes for the four things that changed. Everything
quantitative below is a `getComputedStyle` / `getBoundingClientRect` reading or a decoded-pixel
measurement from the live page. Screenshots compared tile by tile against `docs/ref/fuse/`.

## Scores

| Axis | Score | Notes |
|---|---|---|
| A. Theme fidelity | 9/10 | Every round-1 theme defect is closed and none of the fixes broke anything. Radius census: 0 non-`0`/non-`50%` values across 518 elements. Shadow census: 0 `box-shadow`, 0 `text-shadow`. Uppercase census: **only** the four sanctioned families remain (14/700/1.8px eyebrow ×8, hero eyebrow 17/500/2px, slide counter 28px, marquee 169.92px/−3.398px) — the four invented micro-label families are gone. Section rhythm still 147.334 everywhere, container 1290, h1 65.24/−1, h2 47.005/47.992/−1.4, h3 27.999, h5 24.004. The logo strip, button sweep, scroll-to-top and three asymmetric breaks are all now present and correct. One point lost, almost entirely to the **execution** of the new logo strip (Major 1) and to the service card still carrying body copy §4.1 gives it none of. |
| B. Brand truth | 9/10 | I re-checked every number, name, address, licence and attribution against `BRIEF.md` from scratch, not assuming the unchanged parts held. **No wrong number, no wrong client, no unsupported claim.** The hero pairing is genuinely fixed; all three slides now sit over a photograph their own eyebrow covers. The "three countries" MSD error is gone and replaced with a sentence that is true line by line. The clients strip's heading and note are honest about what the marks are and what they are not. The point is lost on three small precision slips in the counter labels (Minor 6, 7), none of which is a rubric-8 defect. |
| C. Craft | 9/10 | `scrollWidth === clientWidth` at 360 / 390 / 768 / 1024 / 1280 / 1440 / 1920. Zero console messages of any type, zero failed requests, zero 4xx/5xx. One `h1`. Contrast now passes everywhere including over photography — I decoded the rendered backdrop under every white-on-image string on all three hero slides and both CTA panels; the **worst brightest-pixel** ratio on the page is 5.87:1 (hero slide 3 title). `prefers-reduced-motion` fully honoured: 0 armed reveals, counters land on final values, marquee stops, `scroll-behavior: auto`. Anchor scrolling clears the header by 158–164px at every nav link. `dist` is 3.5 MB with no dead assets. Held back by the hero's LCP image being upscaled 1.82× at 1920 (Major 2). |

**Verdict: PASS**

No Critical defects. All three axes are at or above the release bar. The two Majors below are worth
fixing before launch but neither blocks it.

---

## Round 1 verification — all 26 items

Every Critical and Major from round 1 is closed. I verified each against the live DOM rather than
the diff:

| R1 | Item | Status |
|---|---|---|
| C1 | Hero slides 2/3 over the wrong photographs | **Fixed** — see below |
| C2 | "Warehouses for MSD across three countries" | **Fixed** — `content.js:72` now names Keko, Mbeya and no third country |
| C3 | `--c-text-light` failing 4.5:1 | **Fixed** — `style.css:62` is `#686D83`; measured **4.69:1** on `#F3F5F9`, **5.12:1** on white. All seven listed elements pass |
| M4 | CTA right headline a 3-line data dump | **Fixed** — both panels are now one-line questions on the same centre line, client list demoted to a 15px note (`SplitCta.vue:93-101`) |
| M5 | Service card body 7/6/7 centred lines | **Partly fixed** — now 4/3/4. See Minor 5 |
| M6 | No client-logo strip | **Fixed** — `Clients.vue` added. See Major 1 for its execution |
| M7 | Four invented uppercase families | **Fixed** — full-DOM census returns only sanctioned families. `.creds__label` is 13px/400/0 sentence case; `.prj__cat` is 17px/400 `--c-text`, identical to `.svc__tag`; `.tm__meta dt` is 13px/400 |
| M8 | Filter chips | **Fixed** — deleted entirely |
| M9 | `suffix: '+'`, `2009` as a counter | **Fixed** — figures render bare as `16 · 40 · 14 · 34`, no `data-ed` equivalent |
| M10 | Page centred top to bottom | **Fixed** — three breaks, all of which read. See "Asymmetry" below |
| M11 | Vision texture a recycled project photo | **Fixed** — flat `#141733` over the counters' `#0B0E24` with a 1px `--d-bd` hairline. The seam is clearly visible in `build-07.png` and the two bands now read as two |
| M12 | Button fill fades | **Fixed** — `style.css:337-378` implements the full `sc_button_slide`: 1.2s `cubic-bezier(.34,.43,.13,.96)` sweep out the far side, label colour flipping at 30–50%, with a reduced-motion fallback |
| m13 | tiper/zimbili crushed into 4:3 | **Fixed** — both now `aspect-ratio: 16/9` via `wide` (`Projects.vue:87`); rendered 414×233 from 1020×459 and 645×291, i.e. 0.41× and 0.64× — no upscale, no lost frame |
| m14 | Hero primary upscaled 1.38× | **Not fixed, and now worse.** See Major 2 |
| m15 | 5 credential cells leaving a half-width hairline | **Fixed** — 6 cells (NSSF 1026954 added); rows close at 6-up, 3-up and 2-up |
| m16 | "registered with the ERB since 2009" | **Fixed** — both instances reworded; `content.js:51` and `:292` now separate the founding date from the registration |
| m17 | "Projects delivered" | **Fixed** — "Named projects" |
| m18 | Uganda in a sentence about project locations | **Fixed** — `content.js:170` is now "…for clients across…" |
| m19 | Footer column labels `<h2>` | **Fixed** — `SiteFooter.vue:17` is `<h3>`, still 19px/−0.6px |
| m20 | Dead assets in `dist/` | **Fixed** — every file in `public/img/` is now referenced; `logo-teknicon.png` and `site-engineers-reviewing-drawings.jpg` deleted. `dist` = 3.5 MB, largest asset 396 KB |
| m21 | `width`/`height` not matching natural sizes | **Fixed** — all 16 photographs declare their true source dimensions |
| m22 | `.prj__title` / `.tm__name` at 20px | **Fixed** — both 24.004px at ≥1280 |
| m23 | 7.5px lockup tagline in the header | **Fixed** — `SiteHeader.vue:39` passes `:show-tagline="false"` |
| m24 | No scroll-to-top | **Fixed** — `ui/ScrollTop.vue`, 44×44 square, appears past one viewport, visible in `build-02.png` |
| m25 | "(VAT incl.)" and "Tanzania MSD" trimmed | **Fixed** — both restored |
| m26 | Mobile hero headline 36px | **Fixed** — measured **44px** at 390px |

**No fix introduced a regression.** I re-ran the radius, shadow, section-padding, contrast,
overflow, console and failed-request censuses in full and all of them still pass.

---

## Critical defects

None.

---

## Major issues (should fix)

### 1. `src/components/Clients.vue:70-88` — the logo strip's cells are regular but its contents are not, and the double-width final cell breaks the row it is supposed to close

The strip is the right *component* — `border-width: 0 1px 1px 0`, `--c-bd`, `opacity .3 → 1` on
hover, full-bleed, 6-up → 3-up → 2-up. It is the strip's **execution** that is the weakest thing on
the page now, and it is the one place where the theme's ruled-paper discipline visibly fails.

Three measured problems, in order of damage:

**a. The marks vary 4.7× in optical width inside identical cells.** I decoded the non-transparent
bounding box of each PNG and scaled it to its rendered size at 1920:

| mark | rendered ink | | mark | rendered ink |
|---|---|---|---|---|
| Volt Resources | **254 × 73 px** | | Busolwa | 108 × 79 |
| Matongo | 194 × 57 | | Ruvuma Coal | 79 × 79 |
| Anglo de Beers | 181 × 75 | | Unilever | 79 × 79 |
| Shanta Gold | 173 × 77 | | Katavi | 75 × 77 |
| Buckreef | 151 × 78 | | **DAWASA** | **54 × 38** |
| IRUWASA | 120 × 79 | | | |

The cause is `max-height: 80px` + `max-width: 100%` (`Clients.vue:82-88`): landscape marks
(Volt 256×80, Matongo 195×58) run to full width, square marks (Katavi 220×230, Ruvuma 127×127)
are capped at 80px wide. DAWASA is worst because its PNG is 67% × 48% ink — 33% of its width and
52% of its height is transparent padding, so it lands at 54px of visible mark in a 320px cell.
The result in `clients1920.png` is a top row of big wordmarks over a bottom row of small
device marks. Fuse's own strip (`fuse-01.png`, top edge) uses evenly-sized 215×90 marks and reads
as one system. Normalise on *area* rather than height — e.g. cap each cell's mark at ~140px wide
and ~64px tall, and re-crop `client-dawasa.png` to its ink.

**b. The last row is 35–48% taller than the rows above it, at every desktop and tablet width.**
`padding: 9% 8%` resolves against the cell's own width, and `:last-child { grid-column: span 2 }`
doubles that width, so the final cell gets double the padding:

| viewport | cells/row | normal row height | last row height | last cell padding-top |
|---|---|---|---|---|
| 1920 | 6 | 139 px | **196 px** (+41%) | 57.59 px vs 28.80 px |
| 1440 | 6 | 124 px | **167 px** (+35%) | 43.19 px vs 21.59 px |
| 1279 | 3 | 158 px | **234 px** (+48%) | — |
| 768 | 3 | 127 px | **173 px** (+36%) | — |
| 390 / 640 | 2 | 117 px | 117 px | fixed `26px 18px`, so uniform |

In a grid whose entire graphic idea is regular ruled paper, a final row half again as tall as the
others is the thing the eye lands on. Fix by giving the spanning cell explicit padding, or by
switching to fixed vertical padding at all widths.

**c. The spanning cell orphans the last mark on the line where a rule should be.** At 1920 the
Unilever cell runs 1280→1920 and its mark centres at **x = 1600** — the exact column boundary where
rows 1 and 2 both carry a vertical rule. So the last logo appears to sit *on top of* a missing rule
with 320px of empty ruled paper to its right. `docs/ref/build/build-06.png` shows the same effect at
1440. Row closure is arithmetically perfect — I confirmed every row sums to the full grid width at
390/640/768/1024/1279/1280/1440/1920 — but arithmetic closure is not visual closure. Leaving cell 12
empty (bottom rule only, no mark) reads better than stretching cell 11 across the gap.

For the record, THEME_DNA §7.1 also specifies `padding: 18% 10%` on desktop; the build uses
`9% 8%`, which makes the cells about 15% shorter than the theme's. Minor next to (a)–(c).

### 2. `src/data/content.js:45` + `index.html:45` — hero slide 1 is the lowest-resolution source in the set, and it is the LCP image

The pairing problem is fixed, but the fix put the softest photograph in the most exposed position.
Measured upscale of the three hero frames, with Ken Burns disabled:

| slide | file | natural | at 1440 | at 1920 | at 1920 + Ken Burns 110% |
|---|---|---|---|---|---|
| 1 | `project-zmt-terminal.jpg` | **1057 × 664** | **1.36×** | **1.82×** | **2.00×** |
| 2 | `hero-tsf-embankment-luika.jpg` | 1467 × 964 | 0.98× | 1.31× | 1.44× |
| 3 | `hero-ulongoni-bridge.jpg` | 1080 × 810 | 1.33× | 1.78× | 1.96× |

The coder self-reported slide 3 (Ulongoni, 1.38× at round 1's measurement). Slide 1 is worse and was
not reported. It is also `loading="eager"`, `fetchpriority="high"` and `<link rel="preload">` — i.e.
it *is* the Largest Contentful Paint — and it is the `og:image` (`index.html:26,36`), so it is also
the social preview.

How visible: at 1440 it is soft but survives. At 1920 it does not — a 700×460 crop of the container
yard shows mushy container edges, unreadable container markings and visible JPEG blocking, because
the subject is hard rectilinear geometry, which is where bicubic upscaling is most obvious. Slide 3
at the same 1.78× reads better only because its subject (hillside vegetation, small figures) hides
interpolation. Slide 2 at 0.98× is crisp — the rockfill grain is fully resolved — which makes the
difference between it and slide 1 obvious as the carousel advances.

Two honest options: (i) reorder so `hero-tsf-embankment-luika.jpg` (the only ≥1400px frame in the
hero set) carries slide 1 and its "Tailings storage facilities & water" eyebrow leads; or (ii) flag
the original ZMT frame as the single highest-value asset request to the client. Note that every
other ≥1400px source in the manifest (`mnekezi-box-culvert` 1571, `kilombero-pump-station` 1600,
`energy-dissipater-luika` 1525, `tsf-liner-mwaoga` 1521, `binguni-hospital` 1464) is already spent
elsewhere on the page, so there is no free swap.

---

## Minor / polish

3. **`Clients.vue` heading vs `BRIEF.md` §8b — the h2 says "clients", the source says "clients &
   partners".** `content.js:266` renders *"Mining, water and industrial clients"* as the h2 over all
   eleven marks. BRIEF §8b's own heading is *"Some of our clients & partners"* and does not say which
   of the eleven is which. The eyebrow directly above already reads "Clients & partners"
   (`content.js:265`), so the pair is defensible — but the h2 alone asserts a client relationship for
   all eleven that the source does not individually confirm. The note (`content.js:267`) is otherwise
   exemplary: it names the public-sector clients as *"named in the company profile"* rather than
   implying the strip is the whole list, which is exactly what BRIEF §8's closing note asks for.

4. **`Counters.vue:43,62-65` — an eyebrow with no h2 under it.** `THE PRACTICE IN NUMBERS` is the
   only one of the eight eyebrow instances that does not lead a heading; rubric A3 defines the
   pattern as *"a small uppercase tracked label above the h2"*. Fuse's own counters band
   (`fuse-05.png`) carries no eyebrow at all — just the four ghost numerals. Either add an h2 or drop
   the label and let the four figures do the work.

5. **`Services.vue:45,123-128` — the card still has a body paragraph the theme's card has none of.**
   Measured 4 / 3 / 4 lines at `text-align: center`, down from 7 / 6 / 7 — a real improvement, and
   the cards no longer read as columns of prose. But `fuse-01.png` is unambiguous: tag → one-line
   title → image → 34px rule → "Read More", with no `sc_services_item_text` node at all, and the
   ragged centred rag ("*— raft foundations, concrete frames,*" / "*systems.*") is still the least
   composed type on the page. One line each, or move all three into the section lede.

6. **`content.js:287` — `16 / Years in practice` is a year short.** BRIEF §10 sanctions "16+ years"
   with the basis "2009 → 2026", but the company was established **June 2009** and today is
   **August 2026**, i.e. 17 years and 2 months. With the `+` correctly dropped per §11.14, the bare
   `16` now states an exact count that is one low. Either set the value to `17`, or relabel to
   `Years in practice, since 2009` so the figure reads as a floor rather than a count.

7. **`content.js:289` — `14 / Engineers and technicians` mislabels one of the fourteen.** BRIEF §6's
   fourteen include Mary Mroso, a **Quantity Surveyor**, who is neither. BRIEF §10's own wording for
   the same figure is *"Key professional and technical staff"* — which is both correct and already
   ground truth. Same class of slip at `content.js:309`: *"…and eight more engineers, surveyors and
   technicians"* pluralises a single quantity surveyor (the remaining eight are 5 engineers, 1 QS,
   2 technicians).

8. **`content.js:102` and `:329` — `project-tobacco-plant-morogoro.jpg` appears twice.** Once as
   Services card 1's 332×247 thumb, once as the CTA right panel's 734×648 half-screen. This is the
   same pattern round 1 explicitly cleared for `hero-ulongoni-bridge.jpg` (eight sections apart, very
   different rendered size), so it is consistent rather than wrong — but it is now the second reuse on
   a page whose photo library is fully spent, and the CTA panel is the more prominent of the two.
   Worth knowing about rather than fixing.

9. **`Services.vue:162-165` — the third service card sits alone at half width between 640px and
   1023px.** `repeat(2, 1fr)` with three items leaves the Project Management card in row 2 with an
   empty half beside it. This is the same species of ragged-grid problem as round-1 #15, which was
   fixed for the credentials strip. `repeat(2,1fr)` with a `:last-child { grid-column: span 2 }`, or
   dropping straight from 3-up to 1-up, both close it.

10. **`Team.vue:100-107` — the `.tm__mono` initials sit at 1.64:1.** 35px/700 in `--c-bd` `#C6CAD6`
    on white. They are `aria-hidden="true"` and clearly decorative in the same spirit as the 5%-alpha
    ghost numerals, so this is not an accessibility failure — but at 1.64:1 they are barely visible at
    all in `team.png`, which raises the question of whether they are earning their 22px gutter.

11. **`dist/img/manifest.json` ships to production.** 12 KB of provenance documentation served from
    the public root. Harmless, but it exposes internal notes (`confidence`, `flags`,
    "*needs compression before launch*") to anyone who guesses the path.

12. **`Counters.vue:47-49` — the accessible reading order is label-then-number.** The screen reader
    gets "Years in practice, 16" because the visually-hidden value follows the label. Move the
    `visually-hidden` span above `.cnt__label`.

---

## The four things I was asked to scrutinise hardest — findings

**Hero pairing (fixed).** All three slides now match. Slide 1: generic eyebrow *"Consulting engineers
and project managers"* + *"Engineering that holds Tanzania together"* over ZMT — a real named
Teknicon project (BRIEF §5, `manifest.json` `"confidence":"confident"`), and a generic headline makes
no claim the picture contradicts. Slide 2: *"Tailings storage facilities & water"* + *"Dams and
tailings built to be audited"* over the New Luika TSF2 Phase 3 embankment, client Shanta — exact
match, and it names Shanta, Buckreef, Matongo and Anglo de Beers, all four of which are in BRIEF §5.
Slide 3: *"Buildings, bridges & infrastructure"* + *"From a 40m span to a 7-storey block"* over
Ulongoni Bridge under construction, DMDP, Ilala Municipal Council. The one wrinkle worth stating:
the "40m span" is Zimbili's (BRIEF §5), not Ulongoni's, so the number in the headline belongs to the
bridge that is *not* in the picture — but the lede names both bridges and the eyebrow covers the
category, and `project-zimbili-bridge.jpg` at 645×291 is far too small to be a hero. Acceptable as is.

**Asymmetry (§11.9) — all three breaks read as intent, not misalignment.**

- *Projects intro* — `grid-template-columns` computes to **756.922px / 473.078px** (1.6fr/1fr, 60px
  gap), heading flush left at x=75, footnote flush right at x=892 with a 1px top rule and its
  block bottom 7px above the heading's. It reads as a hanging note against a display heading. Good.
- *Team roster* — `padding-top` measured at **66.24px** and **154.08px** at 1440, i.e. exactly
  `4.6vw` and `10.7vw`; entries land at y 7517/7708/7901 (left) against 7605/7796/7990 (right), a
  consistent 88px offset. I was ready to call this misalignment — two columns of hairline-ruled rows
  whose rules do not line up across the gutter is a real risk — but `team.png` settles it: the offset
  is large enough and regular enough to read as deliberate, and it matches Fuse's own pair in
  `fuse-05.png` (John Lewis's card sitting ~88px above Jason Lee's) almost exactly. It works.
- *Counters band* — eyebrow flush left at x=75 spanning the full 1290 container, note flush right
  ending at x=1365 (the container's right edge) with a 1px top rule and `max-width: 46ch`. This is
  the weakest of the three because Fuse's counters band carries neither element, but as a way to get
  a dark band off centre it is idiomatic rather than invented. See Minor 4.

Net: the page is no longer centred top to bottom. Of eleven sections, three are deliberately
asymmetric, two (Quality's sticky split, the half/half CTA) are inherited asymmetric theme moves,
and the centred ones — services intro, service cards, vision quote, CTA panels — are the exact set
§11.9 says Fuse itself centres.

**Counters (correct, with two label slips).** `2009 / Established` → `16 / Years in practice` is the
right move: counters count quantities. The founding year survives, in full, in the note directly
below (`content.js:292` → *"Established June 2009. Registered with the Engineers Registration Board
as a Local Engineering Consulting Firm."*), which also cleans up round-1 #16. Figures render as
`16 · 40 · 14 · 34` with no suffix, at 169.92px in `rgba(255,255,255,.05)` behind 23.92px/700 labels
— §11.14 and §6 satisfied. The two precision slips are Minor 6 and 7.

**Anchor-scroll offset — not reproducible; the page is correct.** I clicked all seven nav links on
the live page and measured. `html { scroll-padding-top: 90px }` (`style.css:109`) against a fixed
header that is **79.09px** tall in its scrolled state:

| link | scrollY | target top | header bottom | first eyebrow/heading top | clearance |
|---|---|---|---|---|---|
| `#quality` | 2277 | 90 | 79 | "Quality assurance" 243 | **+164** |
| `#services` | 1023 | 90 | 79 | "What we do" 238 | **+159** |
| `#projects` | 3297 | 90 | 79 | "Selected work" 237 | **+158** |
| `#clients` | 5225 | 90 | 79 | "Clients & partners" 237 | **+158** |
| `#team` | 7032 | 90 | 79 | **"Key personnel" 237** | **+158** |
| `#contact` | 8814 | 258 | 79 | "Office" 371 | **+292** |

Every target's top edge lands 11px below the header and every section's first line of type lands
158px or more below it. "KEY PERSONNEL" specifically clears by 158px — `team.png` shows it. The
capture that showed it occluded was almost certainly taken from a programmatic `scrollIntoView` or a
direct `scrollTo`, neither of which applies `scroll-padding-top`; real clicks and real hash
navigation both do.

**`.prj__cat` at 17px/400 under a 24px title — dismissed, it does not read heavy.** Measured
17px / 400 / `letter-spacing: 0` / `rgb(86,91,112)` (`--c-text`), sentence case, against a title at
24.004px / 700 / `#141733`. The title carries ~1.4× the size, +300 weight and 2.6× the contrast, so
it wins comfortably — `build-04.png` confirms it. This is also now *identical* to `.svc__tag`
(`Services.vue:78-84`), which is the whole point of the round-1 fix: the same semantic slot is
styled one way on the page instead of two. The only quantitative deviation is the ratio: §4.1 sets
the subtitle at 17px under a 28px h4 (0.61), where projects puts 17px under a 24px h3 (0.71). If you
want it lighter, drop it to `--info-size` 15px rather than changing weight or case.

---

## What is working well

**The round-1 fix pass is the most complete I have seen.** All three Criticals, all nine Majors and
all fourteen Minors are addressed, and I could not find a single regression introduced by any of
them. The two items round 1 told the coder to defend — the QA section's empty quadrant and the
absent hero scroll cue — are both still correctly left alone.

**The token layer survived the rewrite intact.**
- Radius census across the full DOM: **zero** values that are not `0px` or `50%`.
- Shadow census: **zero** `box-shadow`, **zero** `text-shadow`.
- Font census: `"DM Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif` on all 490
  rendered elements; the 28 `Times New Roman` hits are `<head>` nodes only (`meta`, `link`, `title`,
  `script`) and render nothing.
- Section padding: every `.section` at `147.334px` top and bottom; Counters 147.334 / 56.666;
  Vision 113.334 / 147.334. No ad-hoc values anywhere.
- Display type: h1 65.24 / 67.197 / −1px, h2 47.005 / 47.992 / −1.4, h3 27.999 / 33.991 / −0.5,
  h5 24.004 / 28.805 / −0.5, h6 19 / 28.006 / −0.6, marquee 169.92 / 700 / −3.3984px. Container 1290.

**The uppercase census is now clean, and that was the subtlest of the round-1 fixes.** Five
tracked-caps families collapsed to the four sanctioned ones. `.prj__cat` and `.svc__tag` are now
byte-identical in spec, `.creds__label` and `.tm__meta dt` dropped to sentence case at 13px/400, and
the chip family is gone with the control. The eyebrow reads as a distinct signal again — eight
instances, all 14px / 18px / 700 / 1.8px / `opacity .9`, with the 50×1px accent dash used exactly
once, on the QA block.

**Contrast is now solved on photography as well as on flat colour**, which is more than round 1
asked for. Decoding the rendered backdrop with the type hidden, on every white-on-image string:

| element | slide | mean backdrop | white vs mean | white vs **brightest pixel** |
|---|---|---|---|---|
| hero eyebrow | 1 / 2 / 3 | rgb(41,45,61) / (44,44,56) / (42,39,50) | 13.66 / 13.78 / 14.64 | 6.51 / 6.62 / 6.27 |
| hero title | 1 / 2 / 3 | rgb(35,37,53) / (40,38,51) / (39,38,50) | 15.14 / 14.84 / 14.90 | 6.80 / 7.61 / **5.89** |
| hero lede | 1 / 2 / 3 | — | 15.31 / 16.02 / 13.16 | 9.12 / 10.38 / 7.54 |
| slide counter | 1 / 2 / 3 | — | 7.26 / 12.92 / 11.96 | 5.72 / 6.42 / 5.94 |
| nav / phone / wordmark | 1 | rgb(19,21,30) | 18.20 / 18.34 / 19.09 | 6.63 / 8.28 / 17.90 |
| CTA eyebrows / titles / note | — | — | 12.31–14.63 | 5.87–7.39 |

Round 1 measured a 4.2:1 hotspot under the hero headline where the 90° scrim thinned past its 68%
stop and suggested extending the `.62` stop to ~45%. `Hero.vue:180` now reads `.62 45%` — the
suggestion was taken, and the worst pixel anywhere under white type is now **5.89:1**.

**Craft basics re-verified end to end.** `documentElement.scrollWidth === clientWidth` at
360 / 390 / 768 / 1024 / 1280 / 1440 / 1920 — the marquee, the Ken Burns overscan and the six
`is-cropped` images all extend past the viewport and are all correctly contained by
`overflow: hidden`. Zero console messages of any type, zero `requestfailed`, zero 4xx/5xx. One `h1`,
`header`/`nav`/`main`/`footer` landmarks, working skip link, real 113–219 character alt text taken
verbatim from the manifest on all 27 images, `loading="lazy"` on everything below the fold and
`eager` + `fetchpriority="high"` + `<link rel="preload">` on the one hero frame that needs it.
Tabbing through the first fourteen stops gives a visible 2px ring on every one, red on light and
white over the hero. `prefers-reduced-motion` is honoured properly: 0 of 49 reveals armed, marquee
`animation-name: none`, `scroll-behavior: auto`, counters landing on `16/40/14/34` rather than
sticking at zero.

**The facts hold up under a second full audit.** I re-checked, from `BRIEF.md`, not from round 1:
every registration number (LCF 122, ACET 061, OSHA 313-102-022, BRELA 71672, NSSF 1026954,
TIN 108-536-756), the full Natai Plaza address, P.O. Box 31653, `info@teknicon.co.tz`,
`+255 22 2700403`, the vision statement comma for comma, all nine project cards' titles, categories,
clients, spans, costs and lengths, all six roster entries' professions, countries and years, the
"…and eight more" arithmetic, the credentials strip, the counter note, the footer blurb and
registrations line, the marquee, and both CTA panels. **Nothing is wrong.** The clients strip's
eleven marks are all in BRIEF §8b, all genuinely mining / water / industrial, and the note is
scrupulously honest about the public-sector half being carried in prose because no logo files exist
— which is exactly what §8's closing note demands.

**Two structural fixes that were harder than they look.** The vision band's separation
(`#0B0E24` → `#141733` + 1px `--d-bd`) solves round-1 #11 without inventing a texture and without
shortening the band — 487px, still on the 113/147 rhythm, and the seam is now unmistakable in
`build-07.png`. And the CTA panels (`cta.png`) are now two matched one-line questions with the
client list demoted to a 15px caption hung out of flow below the button, so both panels' eyebrow /
title / button stacks sit on the same centre line — which is precisely what `fuse-06.png` does.
