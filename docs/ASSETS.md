# TEKNICON LTD — Image assets

Curated from the 84 images embedded in `tekres/260611 Company Profile R1 (3).docx`
(unzipped to `tekres/_extract/word/media/`).

Machine-readable index: `docs/image-manifest.json`.

## How the attributions were established

The document places **each caption in the paragraph immediately *after* its image**.
Parsing `word/document.xml` for `r:embed` relationship IDs interleaved with paragraph
text reconstructs the exact reading order, so almost every photograph can be tied to a
named project with high confidence rather than guessed at. That mapping was then
cross-checked against `docs/BRIEF.md`. Anything marked `likely` in the manifest is an
inference; anything marked `confident` sits directly above its own caption in the source.

## What was selected — 28 files

### Logo (1)

| File | Source | Size |
|---|---|---|
| `logo-teknicon.png` | image1.png | 335×59 |

Only 335 px wide. It will look soft above roughly 170 px display width. **Recommend an SVG
redraw** — the mark is two overlapping outlined red diamonds plus a navy wordmark, and is
simple enough to reproduce exactly.

### Hero (2)

| File | Source | Size | Subject |
|---|---|---|---|
| `hero-tsf-embankment-luika.jpg` | image46.png | 1467×964 | Roller compacting the rockfill embankment crest, TSF2 Phase 3, New Luika Gold Mine (Shanta) |
| `hero-ulongoni-bridge.jpg` | image29.png | 1080×810 | Ulongoni Bridge under construction over a river channel, DMDP (Ilala Municipal Council) |

The TSF embankment shot is the only ≥1400 px image in the set that is genuinely dramatic.
The Ulongoni Bridge frame is the better *story* — plant, crew, formwork and the surrounding
town all in one image — but is 1080 px wide, so it should be used in a contained hero or a
half-width split rather than full-bleed on a large display.

### Projects (12)

Coverage of the three service pillars:

**Buildings and structures (5)**
- `project-tra-ita-hotel.jpg` — TRA ITA Hotel Accommodation, Mikocheni (TRA), TZS 15.94 bn — render
- `project-binguni-hospital.jpg` — Referral and Teaching College Hospital, Zanzibar — masterplan render
- `project-zmt-terminal.jpg` — Zanzibar Multipurpose Terminal workshop and container hardstand — drone photograph
- `project-tobacco-plant-morogoro.jpg` — steel portal frame erection, Tobacco Processing Plant, Morogoro
- `project-msd-warehouse-keko.jpg` — MSD Storage Warehouse, Keko (MSD / USAID) — completed

**Infrastructure (3)**
- `project-zimbili-bridge.jpg` — Zimbili Bridge, 40 m span, DMDP — under construction
- `project-tiper-hardstand.jpg` — concrete pour for the rigid pavement hardstand, TIPER Gantry Production Centre
- `project-mnekezi-box-culvert.jpg` — three-cell box culvert, Mnekezi–Lwamgasa road diversion, Geita

**Mining TSF, dams and water (4)**
- `project-tsf-liner-mwaoga.jpg` — geomembrane-lined TSF1 basin, Mwaoga, Chunya (Anglo de Beers)
- `project-energy-dissipater-luika.jpg` — energy dissipater for TSF2 supernatant water, New Luika (Shanta)
- `dam-masonry-luika.jpg` — 350 ML masonry water dam under construction, New Luika (Shanta)
- `project-kilombero-pump-station.jpg` — pump station, Ifakara irrigation scheme (Kilombero Plantation)

### Atmosphere (3)

- `site-survey-team.jpg` — two engineers on a route survey, **one wearing a Teknicon Ltd
  high-visibility vest**. The only image in the entire source that shows Teknicon-branded
  staff. Use it wherever the page talks about the firm's own people.
- `site-supervision-crew.jpg` — a dozen workers in PPE unrolling geomembrane liner (TSF2 Cell 1, Buckreef).
- `site-engineers-reviewing-drawings.jpg` — engineers reading construction drawings on a rebar
  mat. Low resolution (640×289); only usable as a narrow banner strip.

### Client and partner logos (11)

`public/img/clients/`: Shanta Gold, Buckreef Gold (BGC), Anglo de Beers (T), Ruvuma Coal,
Matongo Gold Mine, Busolwa Mining, Katavi Mining, Volt Resources, DAWASA, Unilever, IRUWASA.

All are 127–256 px wide, which is adequate for a logo strip at ~110–140 px display width
but not for anything larger.

## What was rejected, and why

Full list with per-file reasons in `docs/image-manifest.json` → `rejected` (55 entries). The categories:

- **Unreadable vector blobs** — `image5/6/7.wmf`, `image9/10.emf`. Two of these are the *only*
  images for real projects (see gaps below).
- **A Word window screenshot** — `image47.png`. The drone photograph of a completed tailings
  storage facility visible inside it is the best aerial in the whole document, and it cannot
  be recovered at usable quality.
- **Cover-page decoration** — `image4.png` (green geometric graphic), `image2.png` (a 482×322
  aerial thumbnail).
- **Under the size floor** — anything below ~600 px in either dimension: the Royal Soap
  building (384×576), the Coca-Cola Road warehouse interior (492×369), the Ifakara canal
  (295×222), and roughly twenty TSF construction-record frames at 630–740 px.
- **Redundant TSF record shots** — the source contains ~30 near-identical photographs of
  geomembrane liner, rockfill and haul roads across nine different TSF contracts. Four
  representative frames were kept; the rest add nothing visually.
- **Burnt-in graphics** — `image27.png` (Rau Bridge) carries a "DARAJA LA RAU" caption baked
  into the pixels.
- **Two client logos that are actually screenshots** — `image83.png` (RUWASA, with a browser
  close button and share icons still in frame) and `image84.png` (TIPER, cropped from a tender
  listing complete with a red "tenders" badge and body text).

## Gaps the build will have to work around

1. **No photograph or render exists for two named building projects.** The TRA Regional Office
   Tanga rehabilitation and the Uganda High Commission in Dodoma are represented only by
   `image9.emf` and `image10.emf` — EMF vector blobs that cannot be rasterised here. Those two
   projects need either text-only cards or new imagery from the client.

2. **No aerial TSF image survives at usable resolution.** This is the single biggest loss. The
   drone shot inside the Word-window screenshot (`image47`) and the two small aerials
   (`image55` at 641×353, `image2` at 482×322) are all the same class of image and all
   unusable at hero size. If Teknicon can supply the original drone files, that is the highest-value
   asset request to make.

3. **No staff photographs at all.** `BRIEF.md` already states this. The team section must be
   typographic — 14 named people, no headshots. `site-survey-team.jpg` is the closest thing to
   a people image and it is shot from behind.

4. **Logo coverage does not match the written client list.** The 13 logos embedded in the
   profile are mining, water and industrial companies. The clients named in the profile text —
   TRA, TIPER, University of Dar es Salaam, The Judiciary of Tanzania, Ministry of Health
   (Tanzania and Zanzibar), ZMT, MSD, Mbeya Cement, Pyrethrum Company of Tanzania, Tanzania
   Tobacco Processors, Uganda High Commission — have **no logo files in the source**. Either
   source those marks separately or render the public-sector clients as a styled text list
   beside the logo strip.

5. **The Teknicon logo itself is a 335×59 raster.** Redraw as SVG before launch.

6. **Several images carry camera date stamps** in orange in the lower-right corner
   (`project-mnekezi-box-culvert`, `project-tsf-liner-mwaoga`, `project-energy-dissipater-luika`,
   `dam-masonry-luika`, `site-survey-team`, `site-supervision-crew`). Acceptable for
   construction-record authenticity; crop them out if the design calls for a cleaner look.

## Needs compression before launch

Two files exceed 1.5 MB, both PNGs holding photographic content:

| File | Size |
|---|---|
| `hero-tsf-embankment-luika.jpg` | 1.80 MB |
| `project-tobacco-plant-morogoro.jpg` | 1.72 MB |

`hero-ulongoni-bridge.jpg` is 1.43 MB — under the threshold but still worth converting.
All three should be re-encoded to JPEG or WebP. No image library was available in this
environment, so files were copied byte-for-byte with no re-encoding or resizing.

## Reserves

Three good images were cut only for pillar balance and are worth pulling in if the layout
needs more cards:

- `image68.jpeg` (1509×1131) — River Nyamazovu trained channel with gabion revetment, Buckreef, Geita
- `image17.jpeg` (1489×931) — Oysterbay residential apartments render
- `image12.png` (1024×768) — Kibong'oto Hospital new laboratory, completed
