# Review round 1

Measured against the running production build at `http://localhost:4173/` (Playwright, 1440×900,
DSF 1), plus a tile-by-tile comparison of `docs/ref/build/*` against `docs/ref/fuse/*`.
Everything quantitative below is a `getComputedStyle` / `getBoundingClientRect` / decoded-pixel
reading from the live page, not an estimate.

## Scores

| Axis | Score | Notes |
|---|---|---|
| A. Theme fidelity | 8/10 | The skeleton is genuinely Fuse and the token work is close to exact: 0 non-`0`/non-`50%` radii anywhere in the DOM, 0 box-shadows anywhere in the DOM, every section on the 147/113/57 rhythm, h1 57px/−1.8, h2 47.005px/47.99/−1.4, marquee 169.92px/−0.02em, container 1290px. What costs it: four invented uppercase micro-label families diluting the eyebrow (§11.4), a segmented filter control with no analogue in the theme, a `+` glued to a counter (§11.14), a body paragraph inside the service card, a composition that is centred top-to-bottom (§11.9), and the partner strip replaced rather than added. |
| B. Brand truth | 6/10 | Registrations, address, P.O. box, phone, email, vision, team roster, years and client attributions are all correct — I checked every one against `BRIEF.md` and found no wrong number and no wrong client. But two of the three hero slides sit under photographs that contradict their own headline, and one hero lede states a fact that is not in the brief. Rubric item 8 makes both critical. |
| C. Craft | 7/10 | No horizontal overflow at 390/768/1024/1440/1920 (`documentElement.scrollWidth === clientWidth` at all five), no console output of any kind, no failed requests, one `h1`, real alt text on every image, reduced motion fully honoured. Held back by a page-wide contrast failure on one colour token and by dead assets shipping to `dist/`. |

**Verdict: BLOCK**

---

## Critical defects (must fix)

### 1. `src/data/content.js:53` and `:62` — hero slides 2 and 3 carry photographs of the wrong subject

This is the single most damaging thing on the page, because it is on the largest surface and it is
the first thing anyone sees.

- **Slide 2** — eyebrow `TAILINGS STORAGE FACILITIES & WATER`, headline *"Dams and tailings built
  to be audited"*, lede naming Shanta, Buckreef, Matongo and Anglo de Beers — rendered over
  `/img/project-zmt-terminal.jpg`, which `manifest.json` identifies with `"confidence":"confident"`
  as *"Workshop, service building and container storage hardstand — Zanzibar Multipurpose Terminal"*,
  client ZMT. A container port is illustrating a tailings-dam claim. Visible in
  `docs/ref/build/build-00.png`.
- **Slide 3** — eyebrow `BUILDINGS, BRIDGES & INFRASTRUCTURE`, headline *"From a 40m span to a
  7-storey block"* — rendered over `/img/hero-tsf-embankment-luika.jpg`, a roller compacting a
  rockfill tailings embankment at New Luika.

The two images are simply one position out of step. Swap them: `hero-tsf-embankment-luika.jpg`
belongs on slide 2 (it is the manifest's TSF2 Phase 3 shot and the only ≥1400 px dramatic frame in
the set), and slide 3 should take a building or bridge — `project-tra-ita-hotel.jpg` (1367×771,
the 7-storey block the headline names) or `hero-ulongoni-bridge.jpg`.

Secondary cost: `project-zmt-terminal.jpg` is a confidently-attributed photograph of a real named
project (BRIEF §5, §8) and it is currently spent as an uncaptioned backdrop for someone else's
claim. ZMT appears nowhere else on the page.

### 2. `src/data/content.js:67` — "Warehouses for MSD across three countries" is not supportable from the brief

BRIEF §5 lists three MSD-adjacent warehouses: **Keko, Dar es Salaam** (MSD/USAID), **Mbeya**
(MSD/USAID) and **Kigali, Rwanda** — and the Kigali client is explicitly *"Ministry of Health
Kigali, Rwanda, funded by USAID & Global Fund"*, **not** MSD. So the true statement is "two
warehouses for MSD in Tanzania, plus one for the Rwandan Ministry of Health". "Across three
countries" is wrong on both the count of countries (two at most) and the client. This originated in
`docs/CONTENT.md` §1 and was carried through unchanged; the copy deck is not ground truth.

Suggested replacement that stays inside the brief: *"Warehouses for MSD in Dar es Salaam and Mbeya,
and for the Ministry of Health in Kigali."*

### 3. `src/style.css:62` — `--c-text-light: #757A8E` fails 4.5:1 everywhere it is used

Measured against the two page grounds:

| Element | file | size / weight | ratio | required |
|---|---|---|---|---|
| `.creds__caption` | `Credentials.vue:71` | 15px / 400 | **3.90:1** on `#F3F5F9` | 4.5 |
| `.creds__label` | `Credentials.vue:54` | 13px / 700 | **3.90:1** | 4.5 |
| `.tm__prof` | `Team.vue:120` | 16px / 400 | **3.90:1** | 4.5 |
| `.tm__meta dt` | `Team.vue:140` | 12px / 700 | **3.90:1** | 4.5 |
| `.prj__chip` (inactive) | `Projects.vue:93` | 14px / 700, interactive | **3.90:1** | 4.5 |
| `.logo__tag` (fixed header) | `ui/Logo.vue:61,72` | 7.5px / 500 | **3.90:1** | 4.5 |
| `.prj__client` | `Projects.vue:167` | 15px / 400 on `#FFFFFF` | **4.26:1** | 4.5 |

Rubric item 13 requires ≥ 4.5:1. `.prj__client` is the worst offence in practice: it is the client
attribution line on every project card — the most load-bearing brand-truth text on the page — and
it is the palest thing in the design.

One token fixes six of the seven: darkening `--c-text-light` to about `#6A6F85` puts it at 4.63:1
on `#F3F5F9` and 5.06:1 on white. The theme's own cool scheme uses `--k-text-light:#726E76`, which
is darker than what is here, so this is a move *toward* the theme, not away from it.

---

## Major issues (should fix)

### 4. `src/data/content.js:282` / `SplitCta.vue:87` — the right CTA panel headline is a data dump at display size

`"TRA, TIPER, MSD, TARURA, Shanta, Buckreef."` renders at 57.001px / lh 57.001 / −1.8px across
**three lines and 171px** of height, against `"Have a project?"` at **one line and 57px** — a 3:1
imbalance in a row where both panels are vertically centred in the same 635px box. It pushes the
right panel's eyebrow above the fold of the tile (`build-09.png`).

The coder flagged this. It is **both** a taste problem and a theme problem, and `fuse-06.png`
settles it: Fuse's own two panels are `"Have a project?"` and `"Want to work with us?"` — two
matched one-line questions. A six-item acronym list is not a headline. Make the title a short
question (`"Who we work for."`) and demote the client names to the eyebrow or a small line under
the button.

### 5. `Services.vue:45,73,123` — a centred 6–7 line body paragraph inside a card the theme gives no body at all

Measured: the three `.svc__body` blocks run **7, 6 and 7 lines** at `text-align: center`
(`Services.vue:73`). THEME_DNA §4.1 sets the card structure as
`subtitle → h4 → thumb → info(34px rule + link)` with **no** `.sc_services_item_text` node —
compare `fuse-01.png`, where the card is tag, one-line title, image, rule, "Read More", and nothing
else. `build-02.png` shows the result: three ragged centred columns of justified-ish prose, with
the rule and "View capability" pushed 200px down the card.

The coder self-reported this and it is a real theme defect, not taste. Either cut the body to one
or two lines, or move it out of the card and into the section lede. Centred body copy over 6 lines
is unreadable at any width regardless of the theme.

### 6. No client-logo strip — 11 real logos sit unused in `public/img/clients/`

Rubric A6 names *"logo strip divided by 1px rules"* as a required signature move, and THEME_DNA §7.1
specifies it exactly (6 cells, `border-width: 0 1px 1px 0`, `#BBB7B6`, logos at 30% → 100% opacity
on hover). `Credentials.vue` correctly reproduces the *hairline cell grid*, but fills it with
registration numbers and then stops — the actual logo strip never appears.

Meanwhile `public/img/clients/` holds Shanta Gold, Buckreef Gold, Anglo de Beers, Matongo Gold
Mine, Busolwa, Katavi, Ruvuma Coal, Volt Resources, DAWASA, IRUWASA and Unilever — and four of
those companies are named *in the hero copy itself* (`content.js:58`) and three more in the projects
grid. Shipping the marks unused while naming the clients in prose is the weakest possible version
of both. ASSETS.md notes they are good to ~110–140px display width, which is exactly what a 6-cell
strip needs. Add the strip; keep the credentials band as a second, narrower row.

Confirmed as a real gap, not a defensible omission.

### 7. Four invented uppercase micro-label families dilute the eyebrow (§11.4)

The eyebrow is correct and consistent everywhere it appears — 14px / 18px / 700 / 1.8px, five
instances, verified. The problem is what surrounds it. A full DOM census of
`text-transform: uppercase` returns five *different* tracked-caps styles:

| style | file:line | spec |
|---|---|---|
| eyebrow (sanctioned) | `style.css:234` | 14px / 700 / 1.8px |
| `.creds__label` | `Credentials.vue:49,53` | 13px / 700 / 1.4px |
| `.prj__chip` | `Projects.vue:86,91,92` | 14px / 700 / 1.2px |
| `.prj__cat` | `Projects.vue:145,150,151` | 13px / 700 / 1.6px, in brand red |
| `.tm__meta dt` | `Team.vue:135-140` | 12px / 700 / 1.2px |

§11.4: *"Uppercase with wide tracking belongs exclusively to the 14px eyebrow; using it elsewhere
collapses the hierarchy the whole theme is built on."* Four near-identical-but-not-identical
variants at 12/13/13/14px is worse than one wrong one, because the eyebrow stops reading as a
distinct signal.

`.prj__cat` is the sharpest instance because the build gets the equivalent element *right* one
section earlier: `.svc__tag` (`Services.vue:78-84`) is 17px / 400 / not-uppercase, exactly per
§4.1. The same semantic slot is styled two incompatible ways on the same page. Bring `.prj__cat`
to `.svc__tag`'s spec, drop the `dt` and `creds__label` to sentence case at 13px/400
(`--info-size`), and delete the chip family with #8.

### 8. `Projects.vue:79-105` — the filter chips are a segmented control the theme does not own

A 1px-bordered four-cell button group with a solid red active fill, uppercase tracked labels, and
`border-left` dividers. Nothing in THEME_DNA looks like this; §11.13 explicitly rejects
*"numbered pagination pills"* and the theme's only comparable furniture is 10px 2px-outlined
transparent bullets. It sits directly beside the h2 in `build-04.png` and competes with it.

The nine projects also fit on one screen with no filtering needed — three per category, so every
filter shows exactly one row. The control does no work. Either delete it (and let the grid's
`.prj__cat` labels carry the taxonomy) or restyle it as plain text links separated by the theme's
1px rules.

### 9. `src/data/content.js:245` — `suffix: '+'` on the counter violates §11.14

*"No `+` or `%` suffix element. The trailing-units field (`data-ed`) is empty on all four
counters."* The demo's own values are `98 · 65 · 10 · 15`, bare. Rendered as `40+` at 170px the
plus is a large glyph that also eats the cell's right margin. Drop the suffix and let
`"Named projects"` as the label carry the "at least" sense.

Separately, `2009` counting up from 0 through 1400, 1800… to land on a *year* is a category error —
counters count quantities. Consider swapping that column for `16` / `Years in practice`
(BRIEF §10 sanctions "16+ years") and putting the founding date in the label.

### 10. The composition is centred top to bottom — none of the theme's asymmetric moves are present (§11.9)

Services intro centred, service cards centred, credentials caption centred, counters centred,
vision quote centred, both CTA panels centred, team lede top-right of a symmetric 1fr/1fr.
§11.9: *"Fuse centres section intros and the service cards, then goes hard asymmetric… A page that
is centred top to bottom is not this theme."*

The build has exactly one asymmetric block (the QA split) and it is inherited straight from the
theme. The cheapest fix with the most return: the theme's staggered team pair (§4.3 — two 50%
columns at deliberately unequal `4.6vw` / `10.7vw` top offsets). A 3×2 grid of identical panels
(`Team.vue:134-139`) is the most generic arrangement on the page and it is where the theme is
loudest about doing the opposite.

### 11. `Vision.vue:30` — the band texture is a recycled project photograph, and two dark bands merge into one

Three separate problems in one element:

1. `url('/img/project-tsf-liner-mwaoga.jpg')` at `opacity: .12` is the **same photograph** used as
   a full project card two sections above (`content.js:225`, *"TSF1, Mwaoga Village, Chunya
   District"*). At 1440 it is plainly legible as a photograph — hillside, liner slope and three
   kneeling workers are all readable through the quote (see the scratch capture, and the top of
   `build-07.png`). §7.5 wants an abstract texture PNG at `.2`, not a dimmed portfolio image.
2. The horizon line runs straight through the second line of the vision statement.
3. `Counters.vue` (`#0B0E24`, 503px) and `Vision.vue` (`#0B0E24`, 486px) are the same background
   colour with nothing but this near-invisible texture between them, so the page reads as one
   989px near-black region containing two small centred text blocks. `build-06.png` shows the seam
   is barely perceptible.

The section's own rhythm is fine — 113px top / 147px bottom is on the scale, and the 486px height
is not excessive. It is the texture that is doing no work. Either drop it entirely and let the
navy carry the band (the theme's testimonial quote sits on flat colour plenty of the time), or
generate a genuine abstract texture. Do not reuse a captioned project photo as wallpaper.

### 12. `src/style.css:268-293` — the button fill fades; the theme's wipes

`.btn` transitions only `background-color .3s ease`. Rubric A7 asks for *"button fill that wipes
rather than fades"*, and THEME_DNA §3.4 gives the full `sc_button_slide` spec: a 2px inset ring
with a bar that sweeps left→right through and out the far side over 1.2s
`cubic-bezier(.34,.43,.13,.96)`, with the label colour flipping mid-sweep.

The label-slide + arrow-reveal move (§3.3) *is* implemented and correct (`style.css:295-314`,
−1.65rem / `right: 3.2em`), so this is a gap rather than a mistake — but the sweep is the more
recognisable of the two and the outline buttons in the CTA panels are the obvious place for it.

---

## Minor / polish

13. **`content.js:201` — `project-tiper-hardstand.jpg` is a worse 4:3 crop than the one the coder
    reported.** It is 1020×459 (2.22:1) forced into `aspect-ratio: 4/3` (`Projects.vue:118`),
    discarding 40% of the frame; the visible result at the top of `build-05.png` is mostly bare
    concrete with the boom pump cut off. `project-zimbili-bridge.jpg` (645×291, self-reported) has
    the same 2.22:1 problem plus a 1.07× upscale — **real, but the lesser of the two**. Give both a
    wider `aspect-ratio` (16/9) or make them the two wide cards in a mixed grid.

14. **The primary hero image is upscaled 1.38×.** `hero-ulongoni-bridge.jpg` is 1080×810 natural,
    rendered at 1491×932 at a 1440 viewport. `manifest.json` flags it. It is the correct *story*
    choice (ASSETS.md agrees) but it is the softest full-bleed pixel on the page. If the client can
    supply the original frame, this is the highest-value asset request; otherwise accept it.

15. **`Credentials.vue:83-88` — 5 cells in a 2-column mobile grid leave a half-width hairline.** At
    390px the fifth cell (`Established / June 2009`) sits alone in row 3 and its bottom border stops
    at 50% of the viewport, leaving a rule that dead-ends mid-page. Either add a sixth credential
    (ERB Reg. No. 0122, or NSSF 1026954 — both in BRIEF §7) or span the last cell.

16. **`content.js:48` and `:249` — "registered with the ERB since 2009" is an inference.** BRIEF §1
    says established June 2009 *and* registered with the ERB; it does not date the ERB registration
    to 2009. Same for `"Teknicon has practised as a registered Local Engineering Consulting Firm
    since June 2009."` Reword to *"Established June 2009. Registered with the Engineers
    Registration Board as a Local Engineering Consulting Firm."*

17. **`content.js:245` — "Projects delivered".** BRIEF §10's basis for 40+ is *"Named projects in
    the profile"*, several of which are design-only or in progress. "Named projects" is the honest
    label and costs nothing.

18. **`content.js:163` — "…across Tanzania, Rwanda, Uganda and Zanzibar."** The country list comes
    from BRIEF §1, but no project in BRIEF §5 is *located* in Uganda — the Uganda High Commission is
    in Dodoma, Tanzania, for the Government of Uganda. Either drop Uganda from a sentence about
    project locations, or reword to "…for clients across Tanzania, Rwanda, Uganda and Zanzibar."

19. **`SiteFooter.vue:17` — footer column labels are `<h2>`.** "Office", "Contact" and
    "Departments" render at 19px/700/−0.6px, which is the theme's h6 spec (§10: *"Column headings
    are h6"*) — the styling is right, the tag is not. It puts three 19px labels at the same document
    level as "Projects on the ground". Use `<h3>` or `<h6>`.

20. **Dead assets ship to `dist/`.** `public/img/clients/` (11 PNGs), `logo-teknicon.png` and
    `site-engineers-reviewing-drawings.jpg` are referenced nowhere in `src/` or `index.html` but are
    copied wholesale by Vite. Fixing #6 resolves most of this; delete the rest. (Credit where due:
    the images that *are* used were re-encoded — nothing in `public/img/` now exceeds 387 KB, so
    ASSETS.md's "needs compression before launch" list is closed.)

21. **`width`/`height` attributes do not match the natural aspect ratios.** Hero images declare
    `1600×900` (`Hero.vue:66-67`) against a 1080×810 source; service images declare `890×664`
    against sources rendered at 332×247; the logo SVG declares `39×28` and renders at 31×22. CSS
    overrides all of them so there is no CLS in practice, but the attributes are decorative rather
    than functional, which is the opposite of why the rubric asks for them.

22. **Two type sizes are off the theme's scale.** `.prj__title` (`Projects.vue:155`) and
    `.tm__name` (`Team.vue:108`) are both 20px. The theme's steps are 19 / 24 / 28 / 35 / 47 / 57;
    §4.3 sets the team card title at **24px**. Move both to 24px (or `.prj__title` to 19px if 24
    crowds the three-up grid).

23. **`ui/Logo.vue:72` — the lockup tagline is 7.5px in the fixed header** (`:56` sets 8.5px
    default, `:76` sets 10px in the footer). Below ~9px this is texture, not text, and it is also one of the 3.90:1 failures
    in #3. Either drop the tagline from the small header variant (as it already does below 479px)
    or floor it at 10px.

24. **No scroll-to-top anchor.** §10 names `.trx_addons_scroll_to_top` and it is visible in the
    bottom-right of `fuse-02.png` and `fuse-06.png`. Small, but it is furniture a Fuse user expects.

25. **Two small trims from the brief.** `content.js:184` shortens "Tanzania Medical Store
    Department (MSD)" to "Medical Store Department"; `content.js:168` drops "(VAT incl.)" from
    "TZS 15.94 Billion (VAT incl.)". Neither is false; both are worth restoring in a document
    addressed to procurement officers.

26. **Mobile hero headline is 36px against the theme's 44px.** Measured at 390px:
    `clamp(36px, 4.6vw - 1px, 87px)` bottoms out at 36px, while §5's layer table gives
    `44px / lh 44 / ls 0` on mobile. Raise the clamp floor to 44px.

---

## Confirmed / dismissed — the seven self-reported items

| # | Coder's report | Verdict |
|---|---|---|
| 1 | Service card body copy centred over 6–7 lines | **Confirmed, theme problem.** Major #5. Measured 7/6/7 lines. §4.1's card has no body node at all. |
| 2 | `project-zimbili-bridge` soft in a 4:3 card | **Confirmed, minor.** 1.07× upscale plus a 2.22:1→4:3 crop. But `project-tiper-hardstand` (1020×459) has the identical problem and was *not* reported — see #13. |
| 3 | Right CTA headline runs to three lines at 57px | **Confirmed, both theme and taste.** Major #4. `fuse-06.png` shows the theme's own panels are two matched one-line questions. |
| 4 | `hero-ulongoni-bridge` reused in the CTA panel; `project-tsf-liner-mwaoga` reused as the vision texture | **Split.** The Ulongoni reuse is **fine** — it is the strongest story image in the set, the two uses are eight sections apart, and the panel is 50% width so it reads as a different picture. The vision-texture reuse is **not** fine and is Major #11: it is legible as a photograph and it duplicates a captioned project card two sections above. |
| 5 | QA section leaves an empty bottom-left quadrant | **Dismissed — defend this.** `fuse-02.png` shows the theme's own "Manufactory" split doing exactly the same thing: the left column's eyebrow/title/descr ends around 400px into a ~730px column and the rest is empty paper. Measured on the build: intro 275px in a 726px column. This is theme-faithful. If you want to close the gap slightly, the theme's pattern allows an `sc_item_button` under the intro copy (§1, `.sc_item_descr + .sc_item_button { margin-top: 2.1em }`) — a "Request a proposal" button there would be idiomatic. Do not restructure the section. |
| 6 | No client-logo strip; 11 logos unused | **Confirmed, Major #6.** Rubric A6 names it; four of the logo companies are named in the hero copy. |
| 7 | No scroll cue in the hero, siding with THEME_DNA §5 over CONTENT.md §1 | **Dismissed — correct call, defend it.** §5 is unambiguous: *"No scroll cue in the homepage hero, and no side-rail."* The chevron belongs to the *inner-page* hero pattern only. The coder read the spec correctly and CONTENT.md was wrong. |

## Confirmed / dismissed — the three observations from the brief for this review

- **"The hero headline reads slightly grey rather than white."** — **Dismissed.** Computed colour is
  `rgb(252,252,252)` = `#fcfcfc`, which is the theme's *exact* hero type colour (§5 layer table:
  *"`#fcfcfc`, 2 lines, per-character mask reveal"*). I decoded the rendered pixels behind the
  headline with the type hidden: mean backdrop `rgb(41,39,51)`, giving **13.82:1** average contrast.
  Pure `#FFFFFF` over the same backdrop would give 14.13:1 — a 2% difference, not perceptible.
  The perception of greyness is coming from the *variance*, not the colour: the brightest patches
  under the headline drop to **4.2:1** where the 90° scrim thins past its 68% stop
  (`Hero.vue:164`). If you want it to snap, extend the left gradient's `.62` stop from 34% to
  ~45% rather than changing the colour. Leave `#fcfcfc` alone.
- **"The vision band looked nearly empty and very tall, with its texture muddy."** — **Partly
  confirmed.** The height is *not* the problem: 486px total = 113px top pad + 171px quote + 55px
  attribution + 147px bottom pad, all on the theme's named scale. The muddy texture and the
  merging of two identical dark bands are real — Major #11.
- **"Team cards are tinted panels with a 1px border sitting on white."** — **Confirmed, mild.**
  `Team.vue:73-78` sets `background: var(--c-bg)` (`#F3F5F9`) + `border: 1px solid var(--c-bd)` on a
  `band--white` section. Two deviations: the theme's tonal step runs *paper page → white card*, and
  this inverts it; and §4.3 sets the team card thumb to `border: none` — the theme's team card is
  not a panel at all. It is not a §11.2 violation (there is no shadow, and there *is* a legitimate
  tonal step + hairline), so it is defensible given that no staff photographs exist. Rolling it into
  the staggered-pair fix in #10 would resolve both at once.

---

## What is working well

**The token layer is close to exact, and I measured all of it.**

- **Radii: a full-DOM census returns zero elements with a border-radius that is not `0px` or `50%`.**
  §11.1 is the single fastest way to lose the look and it is airtight.
- **Shadows: a full-DOM census returns zero `box-shadow` and zero `text-shadow`.** §11.2 clean.
- **Section rhythm is the theme's, with no ad-hoc values anywhere.** Every `.section` computes
  `padding-top/bottom: 147.334px`; Counters is 147.334 / 56.666 and Vision 113.334 / 147.334 —
  the correct "flush against a neighbouring band, let the neighbour carry the gap" pattern from §1.
  No 80px, no 100px, no `6rem`.
- **Display type matches the spec to three decimal places:** h2 47.005px / 47.992 / −1.4px;
  the vision quote and both CTA titles at 57.001px / 57.001 / −1.8px (§4.4's h1-size testimonial,
  correctly applied); `.prj__footnote` and `.tm__more` at 19px / 700 / −0.6px (h6);
  the marquee at 169.92px / 700 / −3.398px (`-0.02em`). Container 1290px. One `h1`.
- **The hero headline scales on the theme's actual curve.** `clamp(36px, 4.6vw - 1px, 87px)`
  renders **65.24px** at 1440 — which is exactly 87 × (1440/1920), i.e. the Rev Slider's own
  proportional scaling off its 1920 grid. And `-1px` tracking is right: it is the slider layer's
  value from §5, not the `-1.8px` h1 token. That is a genuinely subtle piece of reading.
- **The eyebrow is right and consistent.** Five instances, all 14px / 18px / 700 / uppercase /
  1.8px / `opacity: .9`, ink-coloured on light and `#FFFFFF` on dark, `margin-bottom: 1.4em`.
  The opt-in 50×1px accent dash (§2a) is used once, on the QA block — used deliberately, as the
  spec asks.
- **Signature moves present and correctly built:** bottom-left hero stack with the bottom-right
  `01 / 03` counter at 28px with the index at 200% (56px, measured) and click-to-advance; Ken Burns
  100→110% over 10s; the hairline cell grid with `0 1px 1px 0` borders; service cards in
  tag → title → image → 34px centred rule → link order; the 56px circular timeline markers with the
  1px connector inset at `calc(marker/2)` / `calc(marker + marker/2.7)`; ghost numerals with 1px×60px
  dividers at `calc(-1 * var(--grid-gap) / 2)`; the split photo CTA at `min-height: 635px` /
  `padding: 30px`; the four-column dark footer; the 170px accent marquee.
- **Colour discipline.** The cool palette is a wholesale switch to the theme's own `scheme_default`
  variant, not a blend — which is exactly what §11.8 permits. Brand red `#D81F26` plays the accent
  role sparingly (nav CTA, category tags, monogram, marquee) and navy carries the wordmark and dark
  bands. The page is emphatically not the theme's orange, and it is not a pastel mush either.
- **Motion is measured off the spec, not guessed.** 60px / 1s / `ease` / 100ms stagger via a single
  shared `IntersectionObserver` (`useReveal.js`) with no animation library; image zoom
  `scale(1.01) → scale(1.07)` at `.3s ease`; button label −1.65rem with the arrow landing at
  `right: 3.2em`; counters 1500ms.
- **Craft basics are solid.** No horizontal overflow at 390 / 768 / 1024 / 1440 / 1920 —
  `scrollWidth === clientWidth` at every one, with the marquee and cropped images correctly
  contained by `overflow: hidden`. Zero console messages of any kind and zero failed requests. Real
  descriptive alt text on every image, taken verbatim from the manifest. `header`/`nav`/`main`/
  `footer` landmarks, a working skip link, visible focus rings with a light variant on dark bands.
  `prefers-reduced-motion` is honoured properly — reveals are never armed, the marquee stops, and
  the counters land on their final values rather than sticking at zero (I checked that specifically;
  it works).
- **The project filter works cleanly.** All four states verified in the browser: every card ends at
  `opacity: 1` with the reveal classes settled, no stuck-invisible items on re-filter.
- **Facts, where they are right, are meticulously right.** I checked every registration number
  (LCF 122, ACET 061, OSHA 313-102-022, BRELA 71672, TIN 108-536-756), the full address, P.O. Box
  31653, `info@teknicon.co.tz`, `+255 22 2700403`, the vision statement (verbatim, comma-for-comma),
  and all nine project cards' titles, categories, clients, spans, costs and lengths against
  BRIEF §5 — **no wrong number and no client attributed to the wrong project.** The team roster is
  the correct six: sorting BRIEF §6 by experience gives Shaffi 34, Msambila 31, Mulinda 27,
  Lubuva 24, Rutaindurwa 17, Hanti 17 — exactly the six shown, with the right professions, the right
  countries and the right years, and "…and eight more" is arithmetically correct (14 − 6).
  No lorem ipsum, no placeholder, and — correctly — no invented headshots, with
  `content.js:265` saying so on the page.
