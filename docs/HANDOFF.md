# Handoff — Teknicon Ltd landing page

Everything on this page is taken from Teknicon's own company profile
(`tekres/260611 Company Profile R1 (3).docx` and `tekres/Teknicon Revised Profile Jul 26.pdf`).
No figure, client name, project or photograph has been invented. The extracted ground truth
lives in `docs/BRIEF.md`; if a fact is not in that file, it is not on the page.

---

## 1. What to ask Teknicon for

These are the things that would visibly improve the site and that only Teknicon can supply.
They are in priority order.

### Photography

| # | Ask for | Why |
|---|---|---|
| 1 | **The original Zanzibar Multipurpose Terminal drone frame** — full resolution, straight off the camera or drone | It is the first thing a visitor sees. The only copy in the profile is 1057 px wide, so at a 1920-wide screen the browser has to enlarge it about 1.8×, which softens the container edges. Everything else about the picture is right — it is a real, confidently identified Teknicon project — so it stays, with the slow zoom on that first slide reduced to compensate. A file 2000 px wide or larger would remove the problem entirely. |
| 2 | **The drone aerial of a completed tailings storage facility** | In the source document this photograph survives only *inside a screenshot of a Word window*, so it cannot be recovered at any usable size. It is the single best image in the whole profile and there is currently no aerial TSF shot on the site. |
| 3 | **Photographs or renders of the TRA Regional Office rehabilitation, Tanga, and the Uganda High Commission, Dodoma** | See section 2. |
| 4 | Any photograph currently held **only inside a Word or PowerPoint file** | Images pasted into Office documents are usually recompressed. Original camera files are always better. |

### Logos

| # | Ask for | Why |
|---|---|---|
| 5 | **Client logo files for TRA, TIPER, the University of Dar es Salaam, the Judiciary of Tanzania, MSD, ZMT and Mbeya Cement** | The profile's logo wall contains only mining, water and industrial marks. These seven public-sector and institutional clients are named in the profile text but have no logo file anywhere in the source, so the Clients section carries them as a written note instead of a mark. Preferably SVG or EPS; a high-resolution PNG on a transparent background also works. |
| 6 | **A vector (SVG, AI or EPS) version of the Teknicon logo** | The only version in the profile is a 335 × 59 pixel image, which goes soft at any size larger than a business card. The mark in the site header was redrawn by hand from that image (`src/assets/brand/mark.svg`) and should be checked against the official artwork before launch. |

> A note on the DAWASA, IRUWASA and Unilever marks: all three were lifted from the profile's
> own logo wall, and the first two had to be re-cropped to remove dead white space. They are
> the lowest-resolution marks in the strip. Cleaner files from those clients would sharpen them.

---

## 2. Projects with no usable picture

Two named projects from the profile are **not shown on the page at all**, because the only
images of them in the source document are unreadable vector blobs (`.emf` files) that cannot
be converted:

- **Rehabilitation of TRA Regional Office, Tanga** — design and construction supervision, client TRA
- **Uganda High Commission, Dodoma** — design, client Government of Uganda

Both are covered indirectly: the Selected Work section's footnote says "over forty named
projects, for clients across Tanzania, Rwanda, Uganda and Zanzibar". As soon as a photograph
or render of either arrives, it can be added as a normal project card (see section 4).

Also worth knowing:

- **There are no staff photographs anywhere in the source material, and none have been
  invented.** The Key Personnel section is set typographically and says so in its own note. If
  Teknicon wants headshots, the section is built to take them.
- The site shows **nine** project cards out of the forty-plus in the profile — the nine that
  have a usable photograph. It is a selection, not the full list, and the page says so.

---

## 3. Running and building the site

You need [Node.js](https://nodejs.org/) 20 or newer. Everything is run from the project folder.

```bash
npm install          # once, to fetch dependencies
npm run dev          # local preview with live reload -> http://localhost:5173/
npm run build        # produces the deployable site in dist/
npm run preview      # serves the built dist/ folder, to check before deploying
```

**To deploy:** run `npm run build`, then upload the entire contents of the `dist/` folder to
the web host's public directory. `dist/` is a plain static site — no database, no server-side
code, nothing to configure. It is about 3.5 MB.

---

## 4. Where the words and pictures live

**All of the page's text is in one file: `src/data/content.js`.**

You do not need to know how to program to change copy. The file is a list of labelled values,
and each section of the page has its own clearly named block, in the order the page uses them:

| Block | What it controls |
|---|---|
| `company` | Name, tagline, vision, **address, email, phone, web address** |
| `nav` | The seven links in the top bar |
| `heroSlides` | The three rotating opening images and their headlines |
| `credentials` | The strip of registration numbers under the hero |
| `services` | The three department cards |
| `quality` | The Quality Assurance section |
| `projects` | The nine project cards |
| `clients` | The client logo strip, its heading and its note |
| `counters` | The four figures on the dark band |
| `team` | The Key Personnel roster |
| `splitCta` | The two call-to-action panels |
| `footer` | Footer columns, copyright line, registrations line |

The contact details are in **`company`**, and the footer reads them from there, so changing the
phone number or address in one place changes it everywhere it appears. Find the sentence you
want to change, edit the text between the quote marks, save, and run `npm run build`.

A project card, for example, looks like this:

```js
{
  title: 'MSD Storage Warehouse, Keko',
  category: 'Buildings',
  client: 'Tanzania Medical Store Department (MSD) · funded by USAID',
  image: '/img/project-msd-warehouse-keko.jpg',
  w: 1100, h: 825,          // the picture's real pixel size — keep these accurate
  alt: 'A completed white medical storage warehouse with MSD branding, …',
  crop: false
}
```

Two rules when editing:

1. **Keep `w` and `h` matching the real dimensions of the image file.** They stop the page
   jumping about while pictures load.
2. **Always write a real `alt` description.** It is what a blind visitor and a search engine
   read instead of the picture.

**Photographs** live in `public/img/`, client logos in `public/img/clients/`. To swap a
picture, drop the new file into that folder and point the `image:` line at it. Where each
existing photograph came from, what it shows and how confident the identification is, is
recorded in `docs/image-manifest.json` and summarised in plain English in `docs/ASSETS.md`.

Colours, type sizes and spacing are defined once at the top of `src/style.css`.

---

## 5. Scope — please read before commissioning more work

**This is the landing page only.** There are no inner pages yet.

Every link in the top navigation — Home, About, Services, Projects, Clients, Team, Contact —
scrolls to a section further down this same page ("About" goes to the Quality Assurance
section, "Contact" goes to the footer). So do the buttons ("Explore our work",
"See the portfolio", "View capability", "Request a proposal", "See our clients"). Nothing
leaves the page, and nothing is broken; there is simply nowhere else to go yet.

Natural next steps, if and when they are wanted:

- Individual service pages for the three departments
- A full project index, with a page per project
- A working contact form (the Contact link goes to the footer, which lists the address, phone
  and email as clickable links; there is no form to submit)
- The `www.teknicon.co.tz` domain pointed at the built site

The page is already responsive down to a 360 px phone, works with a keyboard, respects the
"reduce motion" accessibility setting, and carries the social preview and search-engine
metadata for the home page.
