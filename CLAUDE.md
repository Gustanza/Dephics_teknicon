# TEKNICON website — start here

Marketing site for **TEKNICON LTD**, a Tanzanian consulting engineering firm
(structural, civil, project management). Vue 3 + Vite 8, no router yet, no CSS framework.

## Before doing anything

**Read [`docs/ROADMAP.md`](docs/ROADMAP.md).** It holds the current state, the full client
feedback log, the decision log, the task tracker and the open questions. It is the single
source of truth for what is done and what is next.

Then, depending on the work:
- Writing copy or any number → [`docs/BRIEF.md`](docs/BRIEF.md) (company ground truth)
- Writing CSS → [`docs/THEME_DNA.md`](docs/THEME_DNA.md) (the Fuse theme spec)
- Using an image → [`docs/image-manifest.json`](docs/image-manifest.json)

## Three rules that must not be broken

1. **No invented facts.** Every number, name, date, client, licence and address must trace
   to `docs/BRIEF.md`. If it is not in that file, it does not go on the page. This has
   caught two real defects already.

2. **The design is Fuse** (AxiomThemes), and it is specified, not improvised.
   DM Sans only · headings 700 with negative tracking · **`border-radius: 0`** everywhere
   (`50%` is the only exception) · **no shadows** · rhythm 17/34/57/113/147px · container
   1290px · uppercase only on the 14px eyebrow. See `THEME_DNA.md` §11 for the anti-patterns.
   Deliberate departures are allowed — comment them in the code and log them in ROADMAP §4.

3. **Verify, don't assert.** Build it, serve it, screenshot it, measure it. Compare against
   `docs/ref/fuse/` (the real theme) and `docs/ref/build/` (ours). Do not claim something
   works without checking.

## Brand tokens — already settled, do not re-derive

`--c-brand-navy: #2C3792` (client-specified) · `--c-brand-red: #E93825` (from the profile PDF)
· `--c-link: #CF3221` (the red deepened for AA contrast) · `--c-heading: #2C3792`

The values `#2B2E8C` and `#D81F26` came from a low-resolution raster and are **wrong**.
Never reintroduce them. Never redraw the logo — official artwork is in `public/img/`.

## Conventions

- All content in `src/data/content.js` — no prose hardcoded in templates
- All tokens in `src/style.css` `:root` — no magic colour values in components
- Keep `docs/ROADMAP.md` updated **as part of the work**, not afterwards

## Commands

```bash
npm run dev                                      # localhost:5173
npm run build                                    # -> dist/
npx vite preview --port 4173 --strictPort        # serve the build
node tools/shoot.mjs <url> docs/ref/build build  # screenshots
```
