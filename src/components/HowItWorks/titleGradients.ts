/**
 * How It Works card-title gradients, in card order (01 → 03).
 * The colour stops live once in CSS (`--hiw-title-1-a` … `--hiw-title-3-b`)
 * and these classes paint `linear-gradient(105deg, a, b)` — the same gradient
 * the card titles use.
 */
export const HIW_TITLE_GRADIENTS = ['hero-grad-1', 'hero-grad-2', 'hero-grad-3'] as const
