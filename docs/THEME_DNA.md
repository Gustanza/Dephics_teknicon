# THEME DNA — "Fuse — Production Industry" (AxiomThemes)

Implementation-ready spec derived from the live demo (`https://fuse.axiomthemes.com/`), its rendered
homepage HTML, and the theme's own stylesheets:

- `wp-content/themes/fuse/skins/default/css/style.css` (597 KB — base + components)
- `.../css/__plugins.css` (1.36 MB — all `trx_addons` shortcode styling; **this is where most component CSS lives**)
- `.../css/__custom.css` (design tokens + colour schemes)
- `.../css/__responsive.css`, `.../extra-styles.css`
- `wp-content/plugins/trx_addons/…` (`__styles.css`, `qw_extension_services.css`, `mouse-helper.css`, `skills.css`, `services.css`, `team.css`, `testimonials.css`)

Root font size is **17px** (`html { font-size: 17px }`). Every `em`/`rem` below resolves against that
unless noted. Homepage body classes: `wp-theme-fuse theme-fuse scheme_default_cozy body_style_fullscreen
header_position_over expand_content remove_margins`.

---

## 0. Paste-in token block

```css
:root{
  /* ---------- Typeface ---------- */
  --font-sans: "DM Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
  /* DM Sans 400 / 500 / 700 only. There is NO second family, no serif, no display face.
     Roboto + Roboto Slab load in the demo only because Elementor's kit defaults reference them. */

  /* ---------- Root / rhythm ---------- */
  --root-size: 17px;              /* html { font-size } — the whole em scale hangs off this */
  --page-width: 1290px;           /* --theme-var-page_width */
  --page-fullwide-max: 1920px;
  --page-fullwide-pad: 60px;
  --edge-pad: 70px;               /* header / hero row side padding at desktop */
  --grid-gap: 30px;               /* --theme-var-grid_gap; also the swiper slide gap */
  --sidebar-width: 410px;

  /* ---------- Spacing scale (the theme's ONLY vertical rhythm) ---------- */
  --space-tiny:   1rem;           /*  17.00px */
  --space-small:  2rem;           /*  34.00px */
  --space-medium: 3.3333rem;      /*  56.67px */
  --space-large:  6.6667rem;      /* 113.33px */
  --space-huge:   8.6667rem;      /* 147.33px  <- standard section top & bottom */
  --shift-tiny: 2em; --shift-small: 4em; --shift-medium: 6em; --shift-large: 8em;

  /* ---------- Type scale (desktop, px equivalents at 17px root) ---------- */
  --h1-size: 3.353em;  --h1-lh: 1em;      --h1-ls: -1.8px;  /* 57px */
  --h2-size: 2.765em;  --h2-lh: 1.021em;  --h2-ls: -1.4px;  /* 47px */
  --h3-size: 2.059em;  --h3-lh: 1.086em;  --h3-ls: -1px;    /* 35px */
  --h4-size: 1.647em;  --h4-lh: 1.214em;  --h4-ls: -0.5px;  /* 28px */
  --h5-size: 1.412em;  --h5-lh: 1.208em;  --h5-ls: -0.5px;  /* 24px */
  --h6-size: 1.118em;  --h6-lh: 1.474em;  --h6-ls: -0.6px;  /* 19px */
  --h-weight: 700;                  /* every heading is 700. No 300/400/600 headings. */
  --body-size: 1rem;   --body-lh: 1.647em; --body-ls: 0;    /* 17px / 28px */
  --body-mb: 1.57em;                /* p margin-bottom = 26.7px */
  --button-size: 15px; --button-lh: 21px; --button-weight: 700; --button-tt: none;
  --menu-size: 17px;   --menu-weight: 500;
  --submenu-size: 14px; --submenu-weight: 400;
  --info-size: 13px;   --info-weight: 400;   /* meta / small labels */
  --eyebrow-size: 14px; --eyebrow-lh: 18px; --eyebrow-weight: 700;
  --eyebrow-ls: 1.8px; --eyebrow-tt: uppercase; --eyebrow-opacity: .9;
  --ghost-numeral: 10em;            /* 170px oversized counter figure */
  --marquee-size: 170px;            /* footer ribbon */

  /* ---------- Radii — THE signature ---------- */
  --rad: 0px;                     /* --theme-var-rad. Cards, buttons, images, inputs, panels: ALL 0. */
  --rad-circle: 50%;              /* the only other value the theme ever uses */

  /* ---------- Borders ---------- */
  --hairline: 1px;                /* the theme's structural line weight */
  --border-btn: 2px;              /* outline buttons only */

  /* ---------- Elevation ---------- */
  --shadow: none;                 /* the demo uses NO drop shadows anywhere */
  --shadow-optin: 0 7px 25px var(--c-link-02); /* .sc_button_shadow opt-in only; unused on the demo */

  /* ---------- Motion ---------- */
  --dur: .3s;  --ease: ease;                  /* 303 of ~370 transitions in the skin are exactly this */
  --dur-out: .3s; --ease-out: ease-out;       /* movement (translate / right / text-indent) */
  --dur-fast: .2s;                            /* menu underline */
  --dur-slow: .4s;                            /* reveal-text link labels */
  --enter-dur: 1s;                            /* .animated */
  --enter-dist: 60px;                         /* fuse-fadeinup translateY */
  --stagger: 100ms;                           /* demo value; library default is 150ms */
  --ease-sweep: cubic-bezier(.34,.43,.13,.96);/* button fill sweep */
  --ease-soft:  cubic-bezier(.25,.8,.25,1);   /* most-used custom curve in __plugins.css */

  /* ---------- Colour: scheme_default_cozy (warm — the homepage default) ---------- */
  --c-bg:        #F6F0EE;
  --c-bg-alt:    #ffffff;   /* alter_bg_color — card surfaces */
  --c-bg-alt-h:  #EDE8E6;
  --c-bd:        #BBB7B6;
  --c-text:      #5F5856;
  --c-text-light:#76706E;
  --c-text-dark: #312825;   /* headings, eyebrows, "ink" */
  --c-link:      #D06901;   /* accent — burnt orange */
  --c-hover:     #AB5601;
  --c-link2:     #F62D1A;   /* accent2 — signal red (cart badge, slider bullets) */
  --c-hover2:    #C42213;
  --c-link3:     #1A60F6;   /* accent3 — blue */
  --c-hover3:    #164FCC;
  --c-extra-bg:  #3F2C2A;   /* submenu / dropdown surface */
  --c-extra-text:#C5BDBC;
  --c-extra-dark:#FFF7F6;
  --c-inverse-link: #ffffff;
  --c-inverse-dark: #312825;
  --c-dark-003: rgba(49,40,37,.03);  /* ghost numerals */
  --c-dark-02:  rgba(49,40,37,.2);   /* thin outline chips */
  --c-dark-05:  rgba(49,40,37,.5);
  --c-link-02:  rgba(208,105,1,.2);

  /* ---------- Colour: scheme_dark_cozy (dark bands, header-over-hero, footer) ---------- */
  --d-bg:        #0E0908;
  --d-bg-alt:    #1B1311;   /* footer surface (scheme_dark_cozy_alter) */
  --d-bd:        #5D5554;
  --d-text:      #C5BDBC;
  --d-text-light:#A29A9A;
  --d-text-dark: #FFF7F6;
  --d-link:      #D06901;
  --d-hover:     #AB5601;
  --d-dark-003:  rgba(255,247,246,.03);

  /* ---------- Colour: scheme_default (cool variant shipped with the theme) ---------- */
  --k-bg:#F3F6F8; --k-bg-alt:#ffffff; --k-bd:#BEC0C5;
  --k-text:#5B565F; --k-text-light:#726E76; --k-text-dark:#2B2531;
  --k-link:#3E63FA; --k-hover:#3859E0; --k-link2:#FA6A3E; --k-link3:#21C90F;

  /* ---------- Colour: scheme_dark (cool dark) ---------- */
  --n-bg:#171618; --n-bg-alt:#252326; --n-bd:#5C5767;
  --n-text:#C3BDC9; --n-text-light:#A19BA8; --n-text-dark:#F6F8FF; --n-link:#3E63FA;
}

/* Breakpoints actually used by the theme */
@media (max-width:1679px){ /* wide */ }
@media (max-width:1439px){ /* notebook — trx_addons responsive kicks in */ }
@media (max-width:1279px){ :root{
  --space-tiny:1em; --space-small:2em; --space-medium:3em;
  --space-large:4em; --space-huge:5em;      /* 17 / 34 / 51 / 68 / 85px */
  --page-width:1024px;
}}
@media (max-width:1023px){ /* tablet portrait */ }
@media (max-width:767px){ :root{ --page-width:767px; } }
@media (max-width:479px){ /* small phone — headings drop letter-spacing to 0 */ }
```

---

## 1. Section rhythm

**There is no `padding: 120px 0` on sections.** Fuse builds vertical rhythm entirely out of *spacer
widgets carrying a named height class*. Every top-level section is bookended by
`.elementor-widget-spacer.sc_height_huge`, whose inner div is forced to `--sc-space-huge`:

```css
.elementor-widget-spacer.sc_height_tiny   .elementor-spacer-inner{ height:var(--sc-space-tiny)   !important } /*  17px */
.elementor-widget-spacer.sc_height_small  .elementor-spacer-inner{ height:var(--sc-space-small)  !important } /*  34px */
.elementor-widget-spacer.sc_height_medium .elementor-spacer-inner{ height:var(--sc-space-medium) !important } /*  57px */
.elementor-widget-spacer.sc_height_large  .elementor-spacer-inner{ height:var(--sc-space-large)  !important } /* 113px */
.elementor-widget-spacer.sc_height_huge   .elementor-spacer-inner{ height:var(--sc-space-huge)   !important } /* 147px */
```

**Standard section = `padding: 147px 0` equivalent (85px at ≤1279px).** Reproduce it as:

```css
.section        { padding-block: var(--space-huge); }        /* 147.33px top and bottom */
.section--tight { padding-block: var(--space-large); }       /* 113.33px — used for the footer top */
```

Sections that sit flush against a neighbouring dark band drop one side to `0` and let the neighbour's
spacer carry the gap — the theme never doubles up (e.g. section `c0cb178` on the homepage is nothing
but a lone 147px spacer used as a divider between the split section and the video band).

### Container and gutters

```css
.container { max-width: 1290px; margin-inline: auto; }        /* elementor-section-boxed */
@media (max-width:1279px){ .container{ max-width:1024px } }
@media (max-width: 767px){ .container{ max-width: 767px } }

.grid { display:grid; gap: 30px; }                            /* --theme-var-grid_gap */
/* Elementor column gaps in use on the demo:
   .elementor-column-gap-no        → 0     (partner logo grid — cells must touch)
   .elementor-column-gap-default   → 20px  (10px each side)
   .elementor-column-gap-extended  → 30px  (15px each side)  ← header, footer, most content rows */
```

Full-bleed rows (hero, header, logo strip, video band, CTA panels) use
`elementor-section-full_width` and pad **`70px`** at the sides instead of centring a container.

### Eyebrow → h2 → body spacing (measure these exactly)

```css
.sc_item_subtitle_above          { margin-bottom: 1.4em; }    /* 14px font → 19.6px to the heading */
h1.sc_item_title_tag + .sc_item_descr { margin-top: 1.4em; }  /* descr is 17px → 23.8px */
h2.sc_item_title_tag + .sc_item_descr { margin-top: 1.35em; } /*             → 22.95px */
.sc_item_title    + .sc_item_button,
.sc_item_subtitle + .sc_item_button,
.sc_item_descr    + .sc_item_button   { margin-top: 2.1em; }  /* 17px base → 35.7px */
/* Section title block → the content it introduces: a sc_height_small spacer = 34px */
```

Heading own margins (from the token file, `em` of the heading's own size):

| tag | margin-top | margin-bottom |
|---|---|---|
| h1 | 1.12em (63.8px) | 0.40em (22.8px) |
| h2 | 0.79em (37.1px) | 0.45em (21.1px) |
| h3 | 1.15em (40.3px) | 0.63em (22.1px) |
| h4 | 1.44em (40.3px) | 0.62em (17.4px) |
| h5 | 1.55em (37.2px) | 0.80em (19.2px) |
| h6 | 1.75em (33.3px) | 1.10em (20.9px) |
| p  | 0 | 1.57em (26.7px) |

Left-aligned h1/h2 get `margin-left: -1px` (optical flush-left correction for the tight tracking).

### Responsive heading steps (from `__responsive.css`)

| | ≤1279 | ≤1023 | ≤767 | ≤479 |
|---|---|---|---|---|
| h1 | 46px | 38 / 42 | 30 / 35, **ls 0** | 27 / 31, ls 0 |
| h2 | 36px | 30 / 35 | 25 / 29, ls 0 | 23 / 27, ls 0 |
| h3 | 28px | 25 / 29 | 23 / 27, ls 0 | — |
| h4 | 23px | 22 / 27 | 21 / 25, ls 0 | 19 / 23, ls 0 |
| h5 | 20px | 20 / 25 | 19 / 23, ls 0 | — |
| h6 | 18px | 18 / 22 | 17 / 21, ls 0 | 17 / 21, ls 0 |

Note the rule: **negative tracking is dropped entirely below 768px.**

---

## 2. The eyebrow / section-title pattern

Used above *every* h2 on the site ("What we offer", "Manufactory", "Our staff", "Get in touch",
"Careers"). Exact CSS from `__plugins.css`:

```css
.sc_item_subtitle{
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  opacity: .9;
  color: var(--theme-color-text_dark);   /* #312825 light / #FFF7F6 on dark bands */
}
.sc_item_subtitle_above{ margin-bottom: 1.4em; }  /* 19.6px */
```

**No dash, no dot, no icon by default** — it is plain uppercase ink-coloured text, differentiated
only by size, weight and the wide 1.8px tracking. The theme ships three opt-in decorations; only use
them deliberately:

```css
/* (a) accent dash — 50×1px rule in the link colour, 70px inset */
.sc_title_accent .sc_item_subtitle{ position:relative; display:inline-block; padding-left:70px; }
.sc_title_accent .sc_item_subtitle::before{
  content:""; display:block; width:50px; height:1px;
  position:absolute; top:50%; left:0; transform:translateY(-50%);
  background-color: var(--theme-color-text_link);
}
.sc_title_accent .sc_item_subtitle.sc_align_center{ padding:10px 0 0; width:100%; }
.sc_title_accent .sc_item_subtitle.sc_align_center::before{ top:0; left:50%; transform:translateX(-50%); }
.sc_title_accent .sc_item_subtitle.sc_align_right { padding:0 70px 0 0; width:100%; }
.sc_title_accent .sc_item_subtitle.sc_align_right::before{ left:auto; right:0; }

/* (b) glyph above the eyebrow */
.sc_item_subtitle.sc_item_title_style_icon::before{
  content:"\e9a7"; font-family:"fontello"; font-size:18px; font-weight:400;
  display:block; margin-bottom:20px; color:var(--theme-color-text_dark);
}

/* (c) shadow variant switches the eyebrow to the light text colour */
.sc_item_subtitle.sc_item_title_style_shadow{ color: var(--theme-color-text_light); }
```

The homepage uses **plain** eyebrows — centred (`sc_align_center`) for the services block and the two
CTA panels, left-aligned for the split "Manufactory" and "Our staff" blocks.

Related: the theme also ships a heading-outline hook (`.sc_item_title_text { -webkit-text-stroke-width }`)
— on the homepage it is explicitly set to `0px` on every title, i.e. **solid headings, never outlined**.

Small-title exception (used in the footer): `h6` titles in `.sc_title_default` render at 19px / 700 /
−0.6px, and an h5 followed by a subtitle downgrades that subtitle to plain 17px / 400 body text.

---

## 3. Buttons

### 3.1 Primary (solid)

```css
.btn{
  display:inline-flex; align-items:center; vertical-align:top;
  font-family: var(--font-sans);
  font-size:15px; line-height:21px; font-weight:700;
  text-transform:none; letter-spacing:0;      /* NOT uppercase — this matters */
  white-space:nowrap; height:auto; max-width:100%;
  padding:19px 42px;                          /* → 59px tall */
  color: var(--c-inverse-link);               /* #ffffff */
  background-color: var(--c-link);            /* #D06901 */
  border-width:0 !important;
  border-radius:0;                            /* --rad */
  box-shadow:none;
  cursor:pointer; -webkit-appearance:none;
}
.btn:hover, .btn:focus{
  color: var(--c-inverse-link);
  background-color: var(--c-hover);           /* #AB5601 — a straight darken, no transform, no shadow */
}
.btn + .btn{ margin-left:0; }
.btn{ margin-right:2.3em; }  .btn:last-child{ margin-right:0; }
/* wrapped rows: .sc_button_wrap{margin-bottom:-10px}  .sc_button_wrap .sc_button{margin-bottom:10px} */
```

Sizes:

| variant | padding | font |
|---|---|---|
| small  | `14px 36px` | 15px |
| normal | `19px 42px` | 15px |
| large  | `19px 50px` | 18px |

Colour variants swap only the background: `.color_style_link2` → `#F62D1A` / `#C42213`,
`.color_style_link3` → `#1A60F6` / `#164FCC`, `.color_style_dark` → `#312825` with `--c-bg` text.

### 3.2 Secondary (outline / `sc_button_bordered`)

```css
.btn--outline{
  background: none !important;
  border-width: 2px !important; border-style: solid;
  border-color: var(--c-link);
  color: var(--c-link);
  padding: 17px 40px;               /* 2px border keeps the 59px height identical to solid */
  box-shadow: none; border-radius: 0;
}
.btn--outline:hover, .btn--outline:focus{
  color: var(--c-inverse-link) !important;
  border-color: var(--c-hover) !important;
  background-color: var(--c-hover) !important;   /* fills solid on hover */
}
/* sizes: small 12px 34px · large 17px 48px · inside a narrow header row 14px 42px */
/* dark variant: border + text #312825 → fills #312825 with white text */
```

The homepage's two CTA panels use `sc_button_bordered sc_button_size_small` over dark photography.

### 3.3 Arrow behaviour — the `sc_button_hover` variant

The label slides left and an arrow glyph fades in from the right edge. This is *the* Fuse button move:

```css
.sc_button_hover:not(.sc_button_simple){ padding:19px 54px; position:relative; }
.sc_button_hover .sc_button_text,
.sc_button_hover .sc_button_icon{ transition: transform .3s ease-out; will-change: transform; }
.sc_button_hover:hover .sc_button_text,
.sc_button_hover:hover .sc_button_icon{ transform: translateX(-1.65rem); }  /* -28px */
.sc_button_hover::before{
  content:"\e9a4"; font-family:"fontello"; font-size:10px; font-weight:400;
  position:absolute; right:0 !important; left:auto !important; top:50% !important;
  transform: translateY(-50%);
  opacity:0; background:transparent !important; color:inherit !important;
  transition: opacity .3s ease-out, right .3s ease-out; will-change: right, opacity;
}
.sc_button_hover:hover::before,
.sc_button_hover.active::before{ right:3.2em !important; opacity:1; }
/* small size: label shifts -1.1rem, arrow lands at right:2.5em */
```

### 3.4 Sweep-fill variant (`sc_button_slide`)

A 2px inset ring with a colour bar that sweeps **all the way through** left→right (it does not stop
at 100% — it exits the far side), while the label colour flips mid-sweep:

```css
.sc_button_slide{
  --slide: var(--c-link); --slide-text: var(--c-inverse-link);
  background:none !important; color:var(--slide) !important;
  position:relative; z-index:1; overflow:hidden;
}
.sc_button_slide > span{ position:relative; z-index:2; color:currentColor; }
.sc_button_slide::before{ content:""; position:absolute; inset:0; z-index:1;
  border-radius:inherit; box-shadow: inset 0 0 0 2px var(--slide); }
.sc_button_slide::after{ content:""; position:absolute; z-index:1; left:0; top:-10%;
  width:100%; height:120%; background-color:currentColor; transform:translateX(-100%); }
.sc_button_slide:hover::after{ animation: button-slide-animation 1.2s cubic-bezier(.34,.43,.13,.96) forwards; }
.sc_button_slide:hover > span{ animation: button-slide-text-animation 1.2s forwards; }

@keyframes button-slide-animation{
  0%{ transform:translateX(-101%) } 50%{ transform:translateX(0) } 100%{ transform:translateX(101%) }
}
@keyframes button-slide-text-animation{
  0%,75%,100%{ color: currentColor } 30%,50%{ color: var(--slide-text) }
}
```

There is also `sc_button_flow` (fill wipes in via `box-shadow: inset 0 100px 0 0`) — a lower-key
alternative for dense UI.

### 3.5 Text link button (`sc_button_simple`)

```css
.link-btn{ font-size:16px; line-height:20px; font-weight:500; letter-spacing:0;
  background:transparent !important; border:none !important; padding:0 1.7em 2px 0; }
.link-btn::after{ content:"\e9a4"; font-family:"fontello"; font-size:12px; font-weight:400;
  transition: right .3s ease, opacity .3s ease; }
.link-btn{ color: var(--c-link); }
.link-btn:hover{ color: var(--c-hover) !important; }
/* large 18px · small 14px */

/* "circle icon + label" variant — used for PLAY / media triggers */
.link-btn--icon .sc_button_icon{
  width:59px; height:59px; line-height:59px; font-size:20px; text-align:center;
  border:1px solid var(--c-dark-02); border-radius:50%;   /* one of the few circles */
}
.link-btn--icon--sm .sc_button_icon{ width:36px; height:36px; line-height:36px; font-size:12px; }
```

### 3.6 Circular buttons

Fuse has a distinct family of **perfect-circle** buttons (the only place radius ≠ 0):

```css
.round-square .elementor-button      { width:101px; height:101px; line-height:100px; padding:0; }
.round-square.big .elementor-button  { width:141px; height:141px; line-height:140px; }
.round-square-2 .elementor-button    { width:193px; height:193px; line-height:193px !important; padding:0; }
@media (max-width:1023px){ .round-square.big .elementor-button{ width:121px;height:121px;line-height:120px } }
@media (max-width: 767px){ .round-square.big .elementor-button{ width:101px;height:101px;line-height:100px } }
@media (max-width: 479px){ .round-square.big .elementor-button{ width: 81px;height: 81px;line-height: 80px } }
```

Homepage instance ("PLAY", over the background-video band):
`background: transparent; border: 1px solid #FFF7F6; border-radius: 50%; color: #FFF7F6;
font-size: 14px; font-weight: 500; letter-spacing: .06em;` — 141px, centred, with `14vw` spacers above
and below, and a magnetic red cursor blob attached (see §8).

Also available: `.custom_icon_btn` — 15px / 500 label plus a `4.22rem` (71.7px) circular
`1px solid var(--c-dark-05)` icon chip, `margin-left: 30px` between them.

### 3.7 Hero CTA (Slider Revolution layer, exact values)

`font: 700 15px/58px "DM Sans"; padding: 0 42px; background:#d06901; color:#fcfcfc;`
hover → `background:#ab5601; color:#fff; border-radius:0`. Mobile drops horizontal padding
42 → 36 → 32px and line-height 58 → 52 → 50px.

---

## 4. Cards

### 4.1 Services / "what we offer" card (`sc_services_qw-card`)

Structure is **title-above-image** — unusual, and a big part of the look:

```
.sc_services_item                       padding: 2.4em (40.8px); text-align:center; background:#ffffff
├─ .sc_services_item_header
│    ├─ .sc_services_item_subtitle      17px / 1.5em / 400, colour #5F5856 — "Industry" (NOT uppercase)
│    └─ h4.sc_services_item_title       28px / 700 / -0.5px, margin 0; subtitle→title gap 0.15em
├─ .sc_services_item_thumb              margin-top 1.5em (25.5px); img 890×664 → 4:3 (1.34:1)
└─ .sc_services_item_info               margin-top 1.6em (27.2px); padding-top .7em; has ::before rule
     └─ .sc_services_item_more_link     15px / 21px / 500 "Read More" + hidden arrow
```

```css
/* the 34×1px centred hairline that separates image from CTA */
.sc_services_qw-card .sc_services_item_info{ position:relative; padding-top:.7em; }
.sc_services_qw-card .sc_services_item_info::before{
  content:''; display:block; position:absolute; top:0; left:50%; transform:translateX(-50%);
  width:34px; height:1px; background-color: var(--c-text-dark);
}

/* image zoom — note it starts slightly over-scaled to hide edge seams */
.sc_services_qw-card .sc_services_item_thumb img{
  transform: scale(1.01,1.01); transition: transform .3s ease; will-change: transform;
}
.sc_services_qw-card .sc_services_item:hover .sc_services_item_thumb img{ transform: scale(1.07,1.07); }

/* arrow reveal on the Read More link */
.sc_services_qw-card .sc_services_item_more_link{
  display:inline-block; font-size:15px; line-height:21px; font-weight:500; color: var(--c-text-dark);
}
.sc_services_qw-card .sc_services_item_more_link .link_icon{
  top:1px; text-indent:-8px; opacity:0;
  transition: text-indent .3s ease, opacity .3s ease;
}
.sc_services_qw-card .sc_services_item_more_link .link_icon::before{
  content:'\E802'; font-family:"qw_extension_icons"; font-size:11px; font-weight:400;
}
.sc_services_qw-card .sc_services_item:hover .sc_services_item_more_link .link_icon{
  text-indent:4px; opacity:1;
}

/* full-card click target */
.sc_services_qw-card .sc_services_item_link{ position:absolute; inset:0; z-index:10; }
```

**No overlay sits over the image, no colour tint, no number badge.** The only hover events are
(a) image zoom 1.01 → 1.07 and (b) the arrow sliding out beside "Read More". Card background is
`--c-bg-alt` (`#ffffff`) sitting on the `#F6F0EE` page — the contrast is deliberately faint, carried
by tone rather than by a border or a shadow.

An optional index numeral exists (`.sc_services_item_number`: `font-size:3em; line-height:1em;
font-weight:700; color: var(--theme-color-alter_dark)`, `margin-top:10px` under the header) — the
homepage does not use it, but it is the sanctioned "01 / 02 / 03" treatment.

Carousel config on the homepage: `slidesPerView 3` (2 at ≤1279), `space 30`, `loop`, bullets below,
no arrows.

### 4.2 Process / timeline card (`sc_services_qw-nodes`)

The "Manufactory" step list — a left-rail vertical timeline, **not** an accordion:

```css
.sc_services_qw-nodes{
  --marker: 56px; --indent-large: 8.2em; --indent-medium: 4.5em;
}
.sc_services_item_featured_left{ padding-left: var(--indent-large); }   /* 139.4px */
.sc_services_item_featured_left .sc_services_item_info{ padding: .5em 0 2.3em 0; }
.sc_services_item_marker{                       /* circular icon node */
  position:absolute; z-index:2; left:0; top:0;
  width:var(--marker); height:var(--marker); line-height:var(--marker);
  font-size:1.25em; text-align:center; border-radius:50%;
  color: var(--c-text-dark); background-color: var(--c-bg-alt);
  transition: all .3s ease;
}
.sc_services_item:hover .sc_services_item_marker{
  color: var(--theme-color-inverse_hover); background-color: var(--c-text-dark);
}
.sc_services_item_timeline{                     /* the 1px connector */
  position:absolute; z-index:1; border-style:solid; border-color: var(--c-bd);
  border-width: 0 1px 0 0; width:1px; height:auto;
  left: calc(var(--marker) / 2);
  top:  calc(var(--marker) + var(--marker) / 2.7);
  bottom: calc(var(--marker) / 2.7);
}
:last-child .sc_services_item_timeline{ border-width: 0; }
```

Title h4 28px; body `.sc_services_item_text` 17px / 1.5em; header → text gap `1.1em`.
The "Read More" here is **reverse-reveal**: the arrow is always visible and the *label* slides out
from behind it on hover (`text-indent:-110px; opacity:0; visibility:hidden` → `text-indent:0;
margin-right:10px; opacity:1`, 0.4s ease / 0.3–0.5s ease-out).

### 4.3 Team card (`sc_team_short`)

```css
.sc_team_short .post_featured img{ transition: transform .3s ease 0s; }
.sc_team_short .post_featured:hover img{ transform: scale(1.05,1.05); }
.sc_team_short .sc_team_item_thumb{ border:none; }
.sc_team_short .sc_team_item_thumb + .sc_team_item_info{ margin-top:24px; }
.sc_team_short .sc_team_item_title{ font-size:24px; font-weight:700; line-height:1.2em; }
.sc_team_short .sc_team_item_subtitle{ font-size:16px; line-height:20px; font-weight:400;
  margin-top:11px; color: var(--c-text-light); }

/* socials fly up from the centre of the image, staggered */
.sc_team_short .trx_addons_hover_team{ position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%); width:100%; padding:15px; text-align:center; z-index:99; }
.sc_team_short .sc_team_item_socials .social_item{
  opacity:0; top:20px; position:relative; margin:3px !important;
  transition-property: all; transition-duration:.3s;
}
.sc_team_short .trx_addons_hover_style_info_anim:hover .social_item{ opacity:1; top:0; }
.sc_team_short .trx_addons_hover_style_info_anim:hover .social_item:nth-child(1){ transition-delay:.10s }
/* …:nth-child(2) .15s, (3) .20s, (4) .25s … +.05s per item up to 8 */
.sc_team_short .social_icon{ width:45px; height:45px; line-height:45px; font-size:16px;
  border-radius:50%; color:#000; background:#FFF; border:none; }
.sc_team_short .social_item:hover .social_icon{ color: var(--c-inverse-link); background: var(--c-link); }
```

On the homepage the two team cards sit in a 50/50 row with **deliberately unequal top offsets**
(`4.6vw` vs `10.7vw` spacers) — a staggered, non-baseline-aligned pair. Copy that; it is intentional.

### 4.4 Testimonial card (`sc_testimonials_qw-big`)

```css
.sc_testimonials_qw-big .slider_one .sc_testimonials_item{ padding: 0 15%; }
.sc_testimonials_qw-big .sc_testimonials_item_content{      /* the quote = h1 typography */
  font-family: var(--theme-font-h1_font-family);
  font-size:   var(--theme-font-h1_font-size);     /* 3.353em → 57px */
  line-height: var(--theme-font-h1_line-height);   /* 1em */
  font-weight: var(--theme-font-h1_font-weight);   /* 700 */
  letter-spacing: var(--theme-font-h1_letter-spacing); /* -1.8px */
  color: var(--c-text-dark); text-align:center;
}
.sc_testimonials_qw-big .sc_testimonials_item_content::before{ display:none; } /* NO quote glyph */
.sc_testimonials_qw-big .sc_testimonials_item_content + .sc_testimonials_item_author{ margin-top: 2.3em; }
.sc_testimonials_qw-big .sc_testimonials_item_author{
  display:flex; justify-content:center; align-items:center; text-align:left; padding:0 0 1px;
}
.sc_testimonials_qw-big .sc_testimonials_item_author_avatar{
  width:70px; height:70px; margin:0 15px 0 0; flex-shrink:0;
  border-radius:50%; overflow:hidden;                 /* source image is 120×120 */
}
.sc_testimonials_qw-big .sc_testimonials_item_author_title   { font-size:19px; line-height:1.3em; font-weight:700; color:var(--c-text-dark); }
.sc_testimonials_qw-big .sc_testimonials_item_author_subtitle{ font-size:15px; line-height:1.333em; color:var(--c-text); margin-top:4px; }
/* side arrows: bare 22px glyph \e802 (qw_extension_icons), prev mirrored with scaleX(-1) */
.sc_testimonials_qw-big .slider_controls_wrap > a{
  background-color: transparent !important; border: none !important; border-radius: 0 !important;
}
```

The quote is set at the **h1** size — a 57px 700-weight sentence with −1.8px tracking is the whole
design of that section. Author block is small and quiet underneath.

---

## 5. Hero

- **Slider Revolution, `sliderLayout: "fullscreen"`**, `minHeight: 500px`, grid `1920×960` desktop
  → `1440×700` → `778×420` → `480×560`. Responsive levels `1240,1460,785,500`.
  Progress bar disabled; arrows and bullets disabled — **the only navigation is the slide counter**.
- **No overlay scrim on the slide image.** There is no `rgba()` layer, no gradient, no tint. The
  photography is inherently dark and the type is `#fcfcfc`. The *only* image treatments are
  `data-filter="b:2"` (2px blur on entry) and a Ken Burns pan-zoom
  (`data-panzoom="d:10000; ss:100; se:110%"` → 100% → 110% over 10s), background position `60% 30%`.
- The **header** supplies the only darkening: a `linear-gradient(180deg,#000 0%,#00000000 100%)`
  background-overlay at `opacity:.4` across the top row (see §9).
- **Content is bottom-left, not centred.** The layer group sits in `rev_row_zone_bottom` with row
  margins `70px` left/right and `70px` bottom (`70 / 50 / 40 / 40` down the breakpoints).

Layer stack, top to bottom:

| layer | desktop | tablet | mobile | notes |
|---|---|---|---|---|
| eyebrow | 17px / lh 24 / **ls 2px** / 500 / uppercase | 14 / 22 / 2px | 14 / 22 / 1px | `#fcfcfc`, DM Sans |
| gap shape | 22px | 12px | 8px | |
| headline | **87px** / lh 90 / ls −1px / 700 | 57 / 60 / −1 | 44 / 44 / 0 | `#fcfcfc`, 2 lines, per-character mask reveal |
| gap shape | 30px | 22px | 20px | |
| CTA | 15px / lh 58 / 700, `padding: 0 42px`, bg `#d06901` | — | — | hover `#ab5601` |
| counter | 28px / lh 20 / 700 / uppercase, right-aligned, `margin-top: 28px` | 23 | 20 | clickable → next slide |

Slide counter markup and look: `<span style="font-size:200%">01</span>&nbsp;/&nbsp;03` — the current
index renders at **200% (56px)** beside a full-size " / 03". Right-aligned, bottom-right of the row,
`cursor: pointer`, jumps to the next slide on click.

**No scroll cue in the homepage hero, and no side-rail** — no vertical text, no fixed social column,
no left/right edge furniture anywhere on the homepage.

### Inner-page hero (About Us pattern)

```
full-width section, background-image cover
  + .elementor-background-overlay { background:#020202; opacity:.15 }
  spacer 60px (40 / 20)
  h1.sc_layouts_title_caption      → 57px / line-height 1em, centred
  spacer 20px (10 / 5)
  chevron-down SVG, 20px, colour #F6F8FF        ← the scroll cue
  spacer sc_height_huge (147px)
```

Header rows over an inner hero use the same gradient scrim at the lower `opacity: .2`.

---

## 6. Counters / stats

Fuse's counters are **oversized ghost numerals with the label sitting on top of them** — not a
number-above-label stack.

```css
.sc_skills_counter_modern .sc_skills_item_wrap{
  position:relative; display:flex; flex-direction:column;
  justify-content:center; align-items:center; min-height: 8.2em;   /* 139.4px */
}
.sc_skills_counter_modern .sc_skills_total{        /* THE NUMBER */
  position:absolute; z-index:0; top:50%; left:50%; transform:translate(-50%,-50%);
  width:100%; text-align:center; white-space:nowrap; margin:0;
  font-size: 10em;            /* 170px */
  line-height: 1em; font-weight: 700; letter-spacing: 0;
  color: var(--theme-color-text_dark_003);   /* text_dark at 3% alpha */
  opacity: 1;
}
.sc_skills_counter_modern .sc_skills_item_title{   /* THE LABEL, on top */
  position:relative; z-index:1; text-align:center;
  font-size:24px; line-height:1.4em; font-weight:700;
  text-transform:none; letter-spacing:0; color: var(--c-text-dark);
}
/* 1px × 60px vertical divider between columns, half a gutter to the right */
.sc_skills_counter_modern .sc_skills_item_wrap::after{
  content:""; display:block; width:1px; height:60px;
  position:absolute; right: calc(-1 * var(--grid-gap) / 2); top:50%; transform:translateY(-50%);
  background-color: var(--c-bd);
}
.sc_skills_counter_modern .sc_skills_column:last-child .sc_skills_item_wrap::after{ display:none; }
/* also suppressed on every nth-child that ends a row (1_2:nth(2n), 1_4:nth(4n), …) */
```

- **No `+` or `%` suffix element.** The trailing-units field (`data-ed`) is empty on all four counters.
- Homepage values: `98 Projects · 65 People · 10 Years · 15 Offices`, `data-duration="1500"`,
  `data-speed="15"`, counting from 0.
- On the demo's dark band the ghost numeral is nudged to an explicit `#17100F` against `#0E0908` —
  i.e. *just barely* readable. Keep it that subtle.
- Layout: `.trx_addons_column-1_4` desktop, `-1_2` on mobile, single row, `columns_padding_bottom`.
- Optional icon slot above the number renders at `3.8em`; an image slot renders as a `4.83em` circle.

---

## 7. Decorative motifs

**The theme's entire vocabulary is: 0px radius, 1px hairlines, and perfect circles.** There are no
diagonals, chevrons, hexagons, dot grids, clip-paths or skews anywhere in `style.css` — a full scan
returns **zero `clip-path` declarations** and exactly one incidental `skew(30deg)`. Border-radius
census across the whole skin: 36 × `0`, 27 × `50%`, plus a handful of legacy 2–6px values inside
plugin overrides. Treat `0` and `50%` as the only two legal radii.

### 7.1 Hairline cell grid — the partner logo strip

Six columns with no gutter, each drawing its own right + bottom rule so the strip reads as ruled paper:

```css
.logo-cell{
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: #BBB7B6;                 /* --c-bd */
  padding: 18% 10%;                       /* 9% all round ≤1279; 20px 5px ≤767 */
  display:flex; align-items:center; justify-content:center;
}
.logo-cell:last-child{ border-width: 0 0 1px 0; }   /* right rule dropped on the last cell */
.logo-cell img{ opacity:.3; transition-duration:.3s; }
.logo-cell:hover img{ opacity:1; }
/* 6-up desktop → 3-up ≤1279 → 2-up ≤767. Logos are 215×90 PNGs. */
```

### 7.2 Marquee ribbon (footer) — the single boldest decoration

```css
.marquee{
  position:absolute; inset:0; z-index:0;
  display:flex; flex-direction:row; justify-content:flex-start; align-items:flex-start;
  white-space:nowrap; overflow:hidden;
}
.marquee-char{
  font-family:"DM Sans", sans-serif;
  font-size:170px; font-weight:700; line-height:1em;
  text-transform:uppercase; letter-spacing:-0.02em;
  color:#D06901;                          /* full-strength accent, not ghosted */
}
.marquee-element{ padding-right:7%; }     /* gap between repeats */
@media (max-width:1279px){ .marquee-char{ font-size:140px } }
@media (max-width: 767px){ .marquee-char{ font-size: 70px } }
```

Demo content: the phrase "Factory Hub", `bg_text_marquee: 11` (speed), `bg_text_accelerate: 1`
(scrolling speeds the ribbon up), `bg_text_top: 20px`, `bg_text_reverse: 0`, no delimiter glyph.
The band reserves `206px` of height (`160px` ≤1279). It is a *background text* layer at `z-index: 0`,
sitting behind/below the footer content.

### 7.3 Oversized ghost numerals

`10em` (170px) 700-weight figures at 3% alpha behind counter labels — see §6. Same idea as the
marquee: huge type used as texture, not as information.

### 7.4 Thin rules, catalogued

| where | spec |
|---|---|
| card image → CTA separator | `34px × 1px`, centred, `--c-text-dark` |
| timeline connector | `1px` vertical, `--c-bd`, inset half a marker from the node |
| counter dividers | `1px × 60px`, `--c-bd`, at `calc(-1 * var(--grid-gap) / 2)` |
| footer bottom bar | `1px` full-width solid, `10px` padding block above and below |
| eyebrow accent (opt-in) | `50px × 1px`, `--c-link`, 70px inset |
| menu underline | `2px`, `--c-text-dark`, width 0 → 100% |
| submenu underline | `1px`, `--c-extra-dark`, width 0 → 100%, `bottom:-5px` |
| circle icon chips | `1px solid var(--c-dark-02)` on a `50%` radius |

### 7.5 Dark band with texture overlay

The testimonials / team / counters block is one continuous near-black field with a semi-transparent
factory texture on top:

```css
.band--dark{ background-color:#0E0908; }
.band--dark::before{                       /* elementor-background-overlay */
  content:""; position:absolute; inset:0;
  background: url(f-factory-deco-img.png) center/cover no-repeat;
  opacity:.2;
  transition: background .3s, border-radius .3s, opacity .3s;
}
```

### 7.6 Half/half image CTA panels

Not thin strips — **two 50% columns inside a `min-height: 635px` row** (400px ≤1279), each with its
own `background-size: cover` photograph, `padding: 30px` (`60px 20px` on mobile), `scheme_dark_cozy`,
centred eyebrow + h1-tag title + small bordered button.

### 7.7 Background video band

Full-width section, self-hosted looping muted `<video>`, `scheme_dark_cozy`, `14vw` spacers top and
bottom (60px on mobile), one 141px circular outline "PLAY" button centred.

### 7.8 Available but unused hooks (know they exist)

- `-webkit-text-stroke-width` on `.sc_item_title_text` → outlined / ghost headlines.
- `.sc_button_shadow` → `0 7px 25px rgba(accent,.2)`. **The demo never enables it.**
- `.sc_cover` hover covers, `.num-hover` index colour swaps, `.sc_extra_bg_*` / `.sc_bg_mask_*`.
- `.sc_team_hover` gradient mask: `linear-gradient(0deg, var(--theme-color-text_link) 0%, transparent 100%)`.

---

## 8. Motion

### 8.1 Entrance

Elements are marked `elementor-invisible` and revealed by an IntersectionObserver.

```css
.animated{ visibility:visible; animation-duration:1s; }
.animated.faster{ animation-duration:.3s; }

@keyframes fuse-fadeinup{ from{ opacity:0; transform:translateY(60px) } to{ opacity:1; transform:translateY(0) } }
@keyframes fuse-fadein  { from{ opacity:0 }                            to{ opacity:1 } }
/* siblings: fuse-fadeindown (-60px Y), fuse-fadeinleft (-60px X), fuse-fadeinright (+60px X) */
.fuse-fadeinup{ animation-name: fuse-fadeinup; animation-timing-function: ease; }
```

- **Distance is `60px`, duration `1s`, easing `ease`.** Nothing else.
- `animation_type_block` → the whole widget animates as one unit.
- `animation_type_sequental` → children stagger. Delay per child = `stagger × index`, where `stagger`
  falls back to the widget's `animation_delay` (**100ms on this demo**) and to **150ms** when neither
  is set.
- Homepage usage: section titles and the testimonial block use `fuse-fadein` + `animation_type_block`;
  the partner strip, the services grid, the team row and the "Our staff" row use `fuse-fadeinup` +
  `animation_type_sequental` with `animation_delay: 100`.

### 8.2 Hover transitions actually used

A census of `transition` declarations in `style.css`:

| duration + easing | count | where |
|---|---|---|
| `.3s ease` | 303 | the default for essentially everything |
| `.3s ease-out` | 45 | transforms, `right`, `text-indent` |
| `.4s ease` | 14 | reveal-text link labels |
| `.2s ease` | 6 | menu underline width |
| `.4s / .5s / .6s ease-out` | 8 | slower reveals |

Custom curves worth keeping: `cubic-bezier(.25,.8,.25,1)` (23 uses — the general "soft" curve),
`cubic-bezier(.34,.43,.13,.96)` (button sweep), `cubic-bezier(.46,.03,.52,.96)` (12 uses).

**Rule of thumb: if you are unsure, write `transition: <prop> .3s ease`.**

### 8.3 Custom cursor (mouse-helper addon)

```css
.trx_addons_mouse_helper{
  position:fixed; z-index:999999; pointer-events:none;
  --mouse-helper-width:8px; --mouse-helper-height:8px;
  --mouse-helper-left:20px; --mouse-helper-top:20px;
  width:var(--mouse-helper-width); height:var(--mouse-helper-height);
  border-radius:50%; border:none;
  background-color:#ffffff;
  mix-blend-mode: difference;              /* inverts whatever it passes over */
  font-size:16px; text-indent:0;
  transition: width .3s ease, height .3s ease, opacity .3s ease, color .3s ease,
              background-color .3s ease, left .3s ease, top .3s ease,
              border-radius .1s ease, box-shadow .2s ease;
}
/* growth states */
.trx_addons_mouse_helper_active.trx_addons_mouse_helper_with_icon { --mouse-helper-width:65px;  --mouse-helper-height:65px; }
.trx_addons_mouse_helper_active.trx_addons_mouse_helper_with_text { --mouse-helper-width:80px;  --mouse-helper-height:80px; }
.trx_addons_mouse_helper_active.trx_addons_mouse_helper_with_image{ --mouse-helper-width:288px; --mouse-helper-height:288px;
  border-radius:0; box-shadow: 0 3px 46px rgba(0,0,0,.1); }   /* image previews are SQUARE */
.trx_addons_mouse_helper_with_layout{ --mouse-helper-width:66px; --mouse-helper-height:66px; }
.trx_addons_mouse_helper_with_layout.trx_addons_mouse_helper_click{ --mouse-helper-width:56px; --mouse-helper-height:56px; }
/* circular caption text spins: animation: spin-ccw 8s infinite linear */
```

Body-level classes on the demo: `trx_addons_mouse_helper_base trx_addons_mouse_helper_style_default
trx_addons_mouse_helper_smooth`. The **only** magnetic target on the homepage is the PLAY button:
`data-mouse-helper="hover" data-mouse-helper-magnet="99" data-mouse-helper-centered="1"
data-mouse-helper-hide-helper="1" data-mouse-helper-bg-color="#FB2610" data-mouse-helper-mode="multiply"`
— the dot is replaced by a red blob that multiplies over the video and is pulled toward the button.

### 8.4 Other motion

- Hero background: pan-zoom 100% → 110% over 10s per slide; the slide transition uses a 6-column mask
  slice (`col:6`) with `scale 1.5 → 1` and a `-20% / -20%` offset.
- Headline entry: per-character mask reveal (`frame_0_chars: d:5; y:30%; o:0`, easing `power4.out`).
- Counters: 1500ms count-up, 15ms tick.
- Marquee: continuous, accelerates with scroll velocity.
- Slider bullets: `10px × 10px`, `border: 2px solid`, transparent fill, `border-radius: 50%`,
  `margin: 0 4px`, sitting `1em` below the slider (`position: static`); active state fills
  `#F62D1A` (accent2). Transition `background-color .3s ease`.

---

## 9. Header

Three separate rows exist in the header template; only one is visible at a time.

### 9.1 Unfixed row (over the hero)

```css
.header-row{
  padding: 22px 70px;                       /* → ~88px tall with a 44px logo */
  background: transparent;                  /* header_position_over + scheme_dark_cozy */
  align-items: center;
}
.header-row::before{                        /* the only scrim */
  content:""; position:absolute; inset:0;
  background-image: linear-gradient(180deg, #000000 0%, #00000000 100%);
  opacity: .4;                              /* .2 on inner pages */
  transition: background .3s, border-radius .3s, opacity .3s;
}
```

### 9.2 Fixed row (after scroll)

A separate section carrying `sc_layouts_row_fixed sc_layouts_row_delay_fixed sc_layouts_row_hide_unfixed`
— it does not exist until the page scrolls, then slides in.

```css
.header-row--fixed{ padding: 10px 70px; }              /* ~64px tall — 24px shorter than unfixed */
.sc_layouts_row_fixed_on{ background-color: var(--c-bg); }   /* solid #F6F0EE, no blur, no shadow */
```

Mobile row: `padding: 15px 0` (≤1279) → `10px 0` (≤767).

### 9.3 Logo

`50 × 44px` PNG (`@2x` supplied). Widget `margin-right: 1.6vw`.
Text-logo fallback: `1.7em` (28.9px) / 700 / lh 1.25 / ls 0.

### 9.4 Menu

```css
.menu > li > a{ padding: .9em; }             /* 15.3px each side → ~30.6px between labels */
.menu > li > a{ font: 500 17px/1.5em "DM Sans"; color: var(--theme-color-text_dark); }
/* over the dark hero that resolves to #FFF7F6; over the fixed light bar to #312825 */

/* underline indicator — .menu_hover_zoom_line */
.menu > li:not(.menu-collapse) > a::after{
  content:"" !important; display:block !important; position:relative;
  bottom:-2px; left:0; width:0; height:2px;
  background-color: var(--theme-color-text_dark);
  transition: all .2s ease;
}
.menu > li > a:hover::after,
.menu > li.current-menu-item > a::after,
.menu > li.current-menu-parent > a::after,
.menu > li.current-menu-ancestor > a::after{ width: 100%; }
.menu > li > a:hover{ color: var(--theme-color-text_dark) !important; }  /* colour does NOT shift to accent */
```

Sub-menus:

```css
.menu > li > ul{ top: 5.7em; left: -.7em; background-color: var(--c-extra-bg); }  /* #3F2C2A */
.menu li li > a{ font: 400 14px/1.5em "DM Sans"; color: var(--c-extra-text) !important; }  /* #C5BDBC */
.menu li li > a:hover{ color: var(--c-extra-dark) !important; }                             /* #FFF7F6 */
.menu li li > a > span{ transition: padding-left .2s ease; }
.menu li li > a:hover > span{ padding-left: 9px; }                 /* label indents on hover */
.menu li li > a > span::after{ height:1px; width:0; bottom:-5px;
  background-color: var(--c-extra-dark); transition: width .2s ease; }
.menu li li > a:hover > span::after{ width:100%; }
/* mega columns */
.menu > li[class*=columns-] > ul.sub-menu{ padding: 2.3em 4.3em; }
.menu > li[class*=columns-] li.menu-item-has-children > a{
  font-size:19px !important; font-weight:500 !important; padding:.65em 0;
  color: var(--theme-color-extra_dark) !important;      /* group headings */
}
```

### 9.5 Far-right cluster (in order)

1. **Cart** (`trx_sc_layouts_cart`) — basket glyph, item-count badge in `#F62D1A`, running total text.
2. **Search** (`trx_sc_layouts_search`, `search_modern`) — icon that expands into a full-width overlay
   field (`.search_overlay.scheme_dark_cozy`).
3. **Panel toggle** — an icon widget linking to `#panel_bar`, opening a right-side slide panel
   (`sc_layouts_panel sc_layouts_panel_right sc_layouts_effect_slide`, **388px wide**, `scheme_dark`,
   containing logo, socials-with-names and a contact block).

Each of the three carries `margin: 4px 0 0 8px`. On mobile the cluster becomes cart + search + burger
(`trx_addons_icon-menu`) opening `menu_mobile_fullscreen scheme_dark`.

There is **no header CTA button** on the demo.

---

## 10. Footer

Template `footer-info-socials-run`, wrapper class `scheme_dark_cozy_alter` →
background `#1B1311`, body text `#C5BDBC`, headings `#FFF7F6`, rules `#5D5554`, links `#D06901`.

```
[row 1]  spacer sc_height_large                                   113px
[row 2]  4 columns, elementor-column-gap-extended (30px)
         ├ col 1  25%  h6 "Hello"        + 6px  + address (max-width 210px)
         ├ col 2  25%  h6 "Office"       + 6px  + address, 6px, email, 18px, phone (#FFFEFE)
         ├ col 3  25%  h6 "Links"        + 6px  + custom-links list (Home / Services / About Us / Features / Contacts)
         └ col 4  25%  h6 "Get In Touch" + 15px + social icon row
           (≤1279 the widths re-proportion to 26% / 25% / 18% / 31%; ≤767 they stack with 20px gaps)
[row 3]  spacer sc_height_medium                                   57px
         divider  --divider-border-width:1px; width:100%; padding-block: 10px
         spacer 10px
         copyright text  16px / line-height 1.2em   "AxiomThemes © 2026. All rights reserved."
         spacer 23px
[row 4]  marquee band — spacer 206px (160px ≤1279); "Factory Hub" ribbon at 170px #D06901
```

Column headings are `h6` inside `.sc_title_default` → **19px / 700 / ls −0.6px**, in `#FFF7F6`.
Body copy in the columns is default 17px / 1.647em in `#C5BDBC`.

A `.trx_addons_scroll_to_top` anchor (`scroll_to_top_style_default`) sits fixed at the page corner.

---

## 11. Anti-patterns — things that would instantly read as "not Fuse"

1. **Any border-radius other than `0` or `50%`.** No 4px, no 8px, no 12px, no `rounded-lg`, no pill
   buttons. Cards, images, inputs, dropdowns, panels, badges: all square. Circles are reserved for
   icon chips, avatars, slider bullets, the cursor dot and the 101 / 141 / 193px CTA buttons.
2. **Drop shadows.** No `0 4px 12px rgba(0,0,0,.08)` card elevation, no hover lift, no soft glow.
   The theme separates surfaces with a 4-point tonal step (`#F6F0EE` page vs `#ffffff` card) and 1px
   hairlines. The one shadow token that exists (`0 7px 25px accent/20%`) is an opt-in the demo never uses.
3. **Gradient buttons, glassmorphism, backdrop blur.** The only gradient anywhere is the header's
   black-to-transparent scrim. Buttons are flat fills that darken on hover, or 2px outlines that fill.
4. **Uppercase button labels.** `--theme-font-button_text-transform: none`, `letter-spacing: 0`.
   Uppercase with wide tracking belongs *exclusively* to the 14px eyebrow; using it on buttons
   collapses the hierarchy the whole theme is built on.
5. **Loose or positive letter-spacing on headings.** Fuse runs −1.8px at h1 and −1.4px at h2. Neutral
   or airy tracking on a 57px heading is the single fastest way to lose the look.
6. **Light or mixed-weight headings.** Every heading is 700. No 300 / 400 / 500 / 600 display type,
   no thin display serif, no "Bold + Light" two-weight headline pairs.
7. **A second typeface.** DM Sans does headings, body, buttons, menu, numerals and the marquee. No
   serif accent face, no monospace, no script, no variable-font flourishes.
8. **Pastels, and cool neutrals mixed into the warm scheme.** The palette is a warm off-white
   (`#F6F0EE`) with warm-grey ink (`#5F5856` / `#312825`) and burnt orange (`#D06901`). Dropping in
   `#f8fafc` / `#64748b` slate greys, mint, lavender or a soft blue-grey card fights the scheme. If
   you need cool, switch wholesale to `scheme_default`; do not blend the two.
9. **Centring everything.** Fuse centres section intros and the service cards, then goes hard
   asymmetric: a sticky left column against a scrolling right column, staggered team cards at unequal
   `vw` offsets, bottom-left hero type, bottom-right slide counter. A page that is centred top to
   bottom is not this theme.
10. **Hover effects that move the card.** No `translateY(-4px)`, no container scale-up, no border-colour
    flash. Hover happens *inside* the frame: the image zooms 1.01 → 1.07, an arrow slides out, an icon
    chip inverts. The card's own box never moves.
11. **Decorative shapes.** No blobs, waves, diagonal section cuts, hexagons, dotted grids, floating
    circles or SVG squiggles. Decoration is 1px rules, huge type at low alpha, and photography.
12. **Section padding chosen ad hoc.** `80px`, `100px`, `padding: 6rem 0` are all wrong. The rhythm is
    the five named steps — 17 / 34 / 57 / 113 / 147 — and standard sections are 147 top and bottom.
13. **Visible slider chrome.** No arrow circles with backgrounds, no progress bars, no numbered
    pagination pills. Bullets are 10px, 2px-outlined, transparent, filling `#F62D1A` when active;
    arrows are bare 22px glyphs with `background: transparent !important; border-radius: 0 !important`.
14. **A `+` or `%` glued to a counter, or a bold visible number.** The figure is 170px at 3% alpha
    behind a 24px label, and it carries no suffix.

---

## 12. Quick reference — homepage section order (verified against the DOM)

| # | section | treatment |
|---|---|---|
| 1 | Header | transparent over hero, `22px 70px`, black→transparent scrim @ .4; sticky twin at `10px 70px` on `#F6F0EE` |
| 2 | Hero | Rev Slider fullscreen, 3 slides, bottom-left eyebrow / 87px headline / CTA, bottom-right `01 / 03` counter, Ken Burns 100 → 110% |
| 3 | Partners | full-width 6-cell hairline grid, `0 1px 1px 0` `#BBB7B6`, logos 30% → 100% opacity |
| 4 | Services | 147px spacer · centred eyebrow "What we offer" + h1-tag "Best solutions in industry" · 34px spacer · 3-up looping card carousel (`sc_services_qw-card`) with bullets · 147px spacer |
| 5 | Split | 50/50 — left column `sc_column_fixed` (sticky) with eyebrow "Manufactory" + title + descr; right column a 4-node vertical timeline (`sc_services_qw-nodes`) |
| 6 | Divider | a lone 147px spacer |
| 7 | Video band | `scheme_dark_cozy`, looping background video, 14vw spacers, 141px circular outline "PLAY" + magnetic red cursor |
| 8 | Dark band | `#0E0908` + factory texture PNG @ .2 — testimonials (h1-size quote, 70px avatar, side arrows) → 147px → "Our staff" 50/50 title + copy → staggered team pair (4.6vw / 10.7vw offsets) → 147px → 4 counters with ghost numerals |
| 9 | CTA panels | one row, `min-height: 635px`, two 50% photo columns, `padding: 30px`, `scheme_dark_cozy`, centred eyebrow + title + small bordered button ("Get in touch → Contact Us", "Careers → About Us") |
| 10 | Footer | `#1B1311`, 113px spacer, 4 × 25% columns, 1px divider, copyright, then the 170px `#D06901` "Factory Hub" marquee band (206px tall) |
