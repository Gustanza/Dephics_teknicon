# Review protocol — Teknicon landing page

This is the shared rubric for the build/critique loop. The CODER builds against it; the
CRITIC scores against it. Both read `docs/BRIEF.md` (facts) and `docs/THEME_DNA.md` (look).

## Reference material on disk

| What | Where |
|---|---|
| Company ground truth (facts, projects, people, contacts) | `docs/BRIEF.md` |
| Theme design spec (tokens, spacing, components) | `docs/THEME_DNA.md` |
| Curated real imagery + captions | `docs/image-manifest.json`, `docs/ASSETS.md` |
| **Fuse theme screenshots** (1440x900 tiles + full page + mobile) | `docs/ref/fuse/` |
| Our build's screenshots (regenerated each round) | `docs/ref/build/` |
| Theme's compiled CSS (for exact values) | scratchpad `__custom.css` |

Capture our build with:

```
npm run dev            # in background, port 5173
node tools/shoot.mjs http://localhost:5173/ docs/ref/build build
```

## The rubric

Score each axis 0–10. **Anything below 8 blocks release.**

### A. Theme fidelity (weight x3)
The single most important axis. The client chose Fuse; the page must read as though it
came out of that theme.

1. **Sharp geometry** — 0px border-radius on cards, buttons, images, inputs, badges.
   Circles are allowed ONLY for icon badges, avatars and social chips.
2. **Type** — DM Sans everywhere. Headings 700 with negative letter-spacing
   (h1 -1.8px, h2 -1.4px, h3 -1px). Tight line-height on display headings (~1.0–1.09).
   Body 400, line-height ~1.65. No serif, no other family.
3. **Eyebrow pattern** — every section leads with a small uppercase tracked label above
   the h2. Consistent size/colour/spacing across all sections.
4. **Section rhythm** — consistent large vertical padding; alternating
   base / white / dark bands. Container 1290px.
5. **No soft-UI** — no drop shadows on cards, no gradients on buttons, no glassmorphism,
   no pill shapes, no pastel tints.
6. **Signature Fuse moves present** — at minimum: full-bleed hero with dark overlay +
   slide counter; logo strip divided by 1px rules; service cards with the category tag
   and title ABOVE the image; a process list with circular icon badges joined by a thin
   vertical connector; ghost-numeral counters on a dark band with vertical dividers;
   a split two-panel photo CTA; dark multi-column footer; a bottom marquee/ticker strip.
7. **Motion** — subtle fade/rise entrance on scroll with stagger; image zoom on card hover;
   button fill that wipes rather than fades. Durations in the 0.3–0.6s range, ease-out.

### B. Brand truth (weight x3)
8. **Every fact traces to `docs/BRIEF.md`.** Any project name, client name, statistic,
   certification number, phone number or address not in the brief is a **critical defect**.
9. **No lorem ipsum, no placeholder names, no stock-photo people presented as staff.**
10. **Colour** — Teknicon navy `#2B2E8C` and red `#D81F26` carry the brand, applied with
    the theme's *discipline* (one dominant accent, used sparingly and confidently).
    The page must not simply be the theme's orange.
11. **Tone** — the copy should sound like a 16-year-old consulting engineering practice
    writing to government agencies, mining companies and development partners.
    Confident and specific. Not a startup, not a marketing agency.

### C. Craft (weight x2)
12. **Responsive** — no horizontal scroll at 390px, 768px, 1024px, 1440px, 1920px.
    Display type scales down sensibly (clamp), grids collapse cleanly.
13. **Accessible** — real alt text on every image, semantic landmarks
    (`header`/`nav`/`main`/`section`/`footer`), one `h1`, visible focus rings,
    body text contrast ≥ 4.5:1, respects `prefers-reduced-motion`.
14. **Vue quality** — clean SFC per section, `<script setup>`, props/data separated from
    markup, content in a data module rather than hardcoded in templates where it repeats,
    scoped styles, shared tokens in one stylesheet. No unused scaffold files left behind.
15. **Performance sanity** — images sized appropriately, `loading="lazy"` below the fold,
    `width`/`height` set to prevent layout shift, no console errors, build succeeds.

## Critic output format

Write `docs/REVIEW-<round>.md`:

```markdown
# Review round <n>

## Scores
| Axis | Score | Notes |
|---|---|---|
| A. Theme fidelity | x/10 | |
| B. Brand truth | x/10 | |
| C. Craft | x/10 | |
**Verdict: BLOCK | PASS**

## Critical defects (must fix)
1. `src/components/Hero.vue:42` — <what is wrong> — <what the theme does instead, with the number>

## Major issues (should fix)
...

## Minor / polish
...

## What is working well
...
```

Be specific and cite `file:line`. "The hero feels off" is useless; "the hero headline is
48px/1.3 with 0 letter-spacing — the theme uses 57px/1.0 at -1.8px, so it reads soft"
is actionable. Compare screenshots side by side, not just code.
