/**
 * Placeholders for content only the client can supply.
 *
 * Rule 1 of this project is "no invented facts": a year, a status, a sector write-up or
 * a privacy policy that is not in docs/BRIEF.md must not be made up. So instead of
 * leaving a gap or guessing, the value is set to TBC (or tbc('what is needed')) in
 * content.js, and the page shows a clearly marked "To be confirmed" chip in its place.
 *
 * To fill one in, replace the TBC with the real value — nothing else changes:
 *
 *     year: TBC                  ->   year: '2021'
 *     description: tbc('...')    ->   description: 'Real copy from the client.'
 *
 * To list every placeholder still outstanding:
 *
 *     npm run placeholders
 */

/*
  THE LAUNCH SWITCH.
    true  — every placeholder renders as a visible "To be confirmed" chip, so gaps are
            obvious while the site is being reviewed.
    false — placeholders are hidden: rows, fields and blocks that are still TBC simply
            do not render. Flip this for launch if any are still outstanding.
*/
export const SHOW_PLACEHOLDERS = false

/** A bare placeholder, for repetitive fields such as a project's year. */
export const TBC = Object.freeze({ tbc: true, note: '' })

/** A placeholder with a note saying what is needed, shown on the chip. */
export const tbc = (note) => Object.freeze({ tbc: true, note })

export const isTbc = (v) => !!(v && typeof v === 'object' && v.tbc === true)

/** Has a real value — not empty and not a placeholder. */
export const filled = (v) =>
  v != null && v !== '' && !isTbc(v) && !(Array.isArray(v) && v.length === 0)

/** Should be rendered at all: a real value, or a placeholder while they are shown. */
export const shown = (v) => filled(v) || (isTbc(v) && SHOW_PLACEHOLDERS)
