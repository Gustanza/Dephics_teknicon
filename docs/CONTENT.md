# Landing page content deck — TEKNICON LTD

Copy is final unless the critic flags it. Every claim traces to `docs/BRIEF.md`.
Section order mirrors the Fuse homepage, with the theme's shop/blog sections replaced by
what a consulting engineering practice actually needs.

Voice: a 16-year-old Tanzanian consulting practice writing to permanent secretaries,
mine general managers and development-partner procurement officers. Specific, measured,
unembellished. Never "we're passionate about". Always name the client and the number.

---

## 0. Header

- Logo: Teknicon lockup (white/knockout version over the hero, navy version once fixed)
- Nav: `Home · About · Services · Projects · Clients · Team · Contact`
  (single-page anchors — this is a landing page only; order must match page order,
  because the header runs a scroll-spy that highlights the section you are in)
- Right rail: phone `+255 22 2700403` and a primary button **"Request a proposal"**
- Transparent over the hero; on scroll, becomes a fixed solid navy/white bar

---

## 1. Hero — full-bleed slider (3 slides)

Background: the strongest imagery from `docs/image-manifest.json` (aerial TSF / dam / major building).
Dark overlay so white type holds. Slide counter `01 / 03` bottom-right. Scroll cue bottom-left.

**Slide 1**
- Eyebrow: `CONSULTING ENGINEERS AND PROJECT MANAGERS`
- H1: `Engineering that holds` <br> `Tanzania together`
- Sub: `Structural, civil and project management consultancy — from feasibility study to defects liability. Registered with the Engineers Registration Board since 2009.`
- CTA: `Explore our work` · secondary: `Talk to an engineer`

**Slide 2**
- Eyebrow: `TAILINGS STORAGE FACILITIES & WATER`
- H1: `Dams and tailings` <br> `built to be audited`
- Sub: `Design, design review and construction supervision of TSFs, clear-water dams and reservoirs for Shanta, Buckreef, Matongo and Anglo de Beers.`
- CTA: `See the portfolio`

**Slide 3**
- Eyebrow: `BUILDINGS, BRIDGES & INFRASTRUCTURE`
- H1: `From a 40m span` <br> `to a 7-storey block`
- Sub: `Zimbili and Ulongoni bridges for DMDP. The TZS 15.94 billion TRA ITA building at Mikocheni. Warehouses for MSD across three countries.`
- CTA: `See the portfolio`

---

## 2. Credentials strip (replaces the theme's partner-logo row)

Thin band, items divided by 1px vertical rules — the theme's logo-strip treatment,
but carrying registrations instead of borrowed logos. Small caps labels, value beneath.

| Label | Value |
|---|---|
| Engineers Registration Board | `LCF 122` |
| ACET member | `061` |
| OSHA | `313-102-022` |
| Incorporated (BRELA) | `71672` |
| Established | `June 2009` |

Caption under the strip: `Fully registered, continuously compliant, wholly Tanzanian-owned.`

---

## 2a. About — "Introduction"  (added at the client's request)

Added after the client noted that the profile's Introduction and "Background and
Organization of the Company" content (profile pp. 4–5) appeared nowhere on the site,
and that the **About** nav link wrongly jumped to the Quality Assurance section.
Sits between the credentials strip and Services, mirroring the profile's own order.

- Eyebrow: `INTRODUCTION`
- H2: `Multidisciplinary consultants,` <br> `wholly Tanzanian-owned`

Left column: photograph of the completed Kibong'oto Hospital laboratory with a caption
naming the project and client, then the three technical departments and a link through
to Services.

Right column: the three introduction paragraphs verbatim from the profile, then the
company objective statement set apart behind a 2px accent rule.

> The profile draws the three departments as a **three-cog diagram** in red, amber and
> navy. It is deliberately not reproduced: decorative shapes are against the theme
> (`THEME_DNA.md` §11.11), and the diagram's amber is a colour that appears nowhere else
> on the site. The departments are named in the theme's own language instead.

---

## 3. Services — "What we do" (3 cards)

- Eyebrow: `WHAT WE DO`
- H2: `Three departments, one engineering practice`
- Intro: `TEKNICON delivers multidisciplinary consulting engineering and project management services across the entire project lifecycle — feasibility study, concept and detailed design, tender documentation, construction supervision, contract administration and project close-out.`

Cards follow the theme's order: **tag → title → image → rule → link.**

**Card 1** — tag `STRUCTURAL`
- Title: `Structural and Bridge Engineering`
- Body: `Buildings and special structures under varied site conditions — raft foundations, reinforced concrete frames, structural steelwork, prefabricated warehouse systems and bridges. Including structural assessment and rehabilitation of existing buildings.`
- Link: `View capability`

**Card 2** — tag `CIVIL`
- Title: `Civil Engineering and Infrastructure`
- Body: `Earthworks and pavement design, storm water and flood protection, water supply and irrigation, sewer reticulation, dams, reservoirs and weirs, and tailings storage facilities — with hydrology, survey and geotechnical coordination.`
- Link: `View capability`

**Card 3** — tag `PROJECT MANAGEMENT`
- Title: `Project Management and Supervision`
- Body: `Contract administration, tender documentation and evaluation, coordination of multidisciplinary design teams, construction supervision and progress reporting, interim payment certificates, and support through the Defects Liability Period.`
- Link: `View capability`

---

## 4. Split section — quality assurance process

Left column: eyebrow + H2 + body. Right column: 5-step list with circular icon badges
joined by a thin vertical connector rule (the theme's "manufactory" pattern).

- Eyebrow: `QUALITY ASSURANCE`
- H2: `Checked before it is issued.` <br> `Checked again on site.`
- Body: `TEKNICON applies quality assurance procedures that prescribe the checks and audits required to ensure soundness, correctness and interface compatibility of engineering solutions — implemented in accordance with applicable laws, codes of practice, technical standards and project-specific requirements.`

**Steps**
1. `Technical review` — Design calculations and drawings are reviewed before issue.
2. `Interface coordination` — Structural, civil, architectural, mechanical, electrical and quantity surveying inputs are reconciled.
3. `Site inspection` — Regular inspections, reporting and review of contractor submissions during construction.
4. `Monitoring` — Quality, schedule, budget and compliance with the contract documents, tracked throughout.
5. `Close-out` — Final inspections and support through the Defects Liability Period.

---

## 5. Projects — "Selected work"

- Eyebrow: `SELECTED WORK`
- H2: `Projects on the ground`
- Filter chips: `All · Buildings · Infrastructure · Mining & Water`

Cards use real captions from `docs/image-manifest.json`. Each card: image, category tag, title,
client line. Suggested set (adjust to what imagery actually exists):

| Title | Category | Client line |
|---|---|---|
| TRA ITA Hotel Accommodation, Mikocheni | Buildings | Tanzania Revenue Authority · 7 storeys · TZS 15.94bn |
| Binguni Referral and Teaching Hospital, Zanzibar | Buildings | Government of Zanzibar, Ministry of Health |
| MSD Storage Warehouses | Buildings | Medical Store Department · USAID · Keko, Mbeya, Kigali |
| Zimbili Bridge, Dar es Salaam | Infrastructure | Ilala Municipal Council · DMDP · 40m span |
| Furahisha Pedestrian Flyover, Mwanza | Infrastructure | Composite bridge · 0.723 km additional lane |
| Wenda–Mgama & Mtili–Ifwagi–Mkuta Roads | Infrastructure | TARURA · 19 km and 14 km, Iringa and Mufindi |
| TSF2, New Luika Gold Mine | Mining & Water | Shanta Mining Company Ltd · Phases 1 to 3B |
| 350 ML Masonry Water Dam, New Luika | Mining & Water | Shanta Mining Company Ltd |
| TSF2 Cells 1 & 2, Mnekezi, Geita | Mining & Water | Buckreef Gold Company Ltd |

Footer link: `Over forty named projects across Tanzania, Rwanda, Uganda and Zanzibar.`

---

## 6. Counters — dark band, ghost numerals

| Number | Label |
|---|---|
| `2009` | Established |
| `40+` | Projects delivered |
| `14` | Engineers and technicians |
| `34` | Years, longest track record |

Overline above the band: `THE PRACTICE IN NUMBERS`

---

## 7. Vision quote band

Full-bleed dark or image band, large centred quote — the theme's testimonial treatment,
used for the vision statement since no client testimonials exist in the source material.

> `To improve the quality of life for human beings through engineering excellence.`

Attribution: `Teknicon Ltd — Vision Statement`

---

## 8. Team

- Eyebrow: `KEY PERSONNEL`
- H2: `Registered engineers, on the drawing board and on site`
- Intro: `Senior consulting engineers, registered professional engineers, a quantity surveyor and senior civil technicians — with individual experience ranging from 7 to 34 years.`

**No photographs exist.** Render the team as a typographic roster, not photo cards:
name, profession, countries of practice, years. Use the theme's card geometry
(sharp corners, 1px rules, hover accent) with an initials monogram in place of a portrait.
List the six most senior, then a line: `…and eight more engineers, surveyors and technicians.`

---

## 9. Split CTA band (two photo panels)

**Left panel**
- Eyebrow: `GET IN TOUCH`
- H3: `Have a project?`
- Button: `Request a proposal`

**Right panel**
- Eyebrow: `CLIENTS & PARTNERS`
- H3: `TRA, TIPER, MSD, TARURA, Shanta, Buckreef.`
- Button: `See who we work for`

---

## 10. Footer — dark, four columns

**Col 1 — Teknicon**
Logo (knockout) + `A multidisciplinary consulting engineering firm registered with the Engineers Registration Board as a Local Engineering Consulting Firm. Wholly Tanzanian-owned. Member, ACET.`

**Col 2 — Office**
`Natai Plaza, 4th Floor, Suite No. RT 01B`
`Coca Cola Road, Plot 17`
`Mikocheni Light Industrial Area`
`Dar es Salaam, Tanzania`
`P.O. Box 31653`

**Col 3 — Contact**
`info@teknicon.co.tz` (link)
`+255 22 2700403` (link)
`www.teknicon.co.tz`

**Col 4 — Departments**
`Structural and Bridge Engineering`
`Civil Engineering`
`Project Management`

Bottom bar: `Teknicon Ltd © 2026. All rights reserved.` · right side: `ERB LCF 122 · ACET 061 · TIN 108-536-756`

**Marquee strip** below the footer, accent colour, giant uppercase, scrolling:
`ENGINEERING EXCELLENCE · STRUCTURAL · CIVIL · PROJECT MANAGEMENT · SINCE 2009 ·`

---

## Global rules

- One `<h1>` only — the hero slide headline.
- Buttons: sharp corners, 15px/700 DM Sans, no text-transform.
- Never write a number that is not in `docs/BRIEF.md`.
- Where the brief has no photograph, use typography and geometry — never a stock image
  of someone else's staff or someone else's building.
