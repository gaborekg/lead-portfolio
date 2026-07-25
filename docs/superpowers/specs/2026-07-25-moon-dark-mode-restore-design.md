# Restore the "moon" light/dark switch — Design

**Date:** 2026-07-25
**Status:** Approved (design), ready to implement

## Goal

Bring back the "moon" theme switch — clicking the portrait sweeps a crescent
shadow across it and flips the site between light and dark — **on top of** the
site's current automatic dark mode, **without disturbing** the new
growing-sentence "About" section or any other current feature.

The moon's source of truth is the **old deployed Netlify site**
(https://gaborgaya-portfolio.netlify.app), which still runs the pre-July-18
code with the working moon. It is NOT in the current source files. We recover
it from there and graft it onto the current site.

## Behaviour (agreed)

1. **Default (never clicked):** the site matches the visitor's device setting
   (`prefers-color-scheme`) — this is the current behaviour, unchanged.
2. **Manual override:** clicking the portrait flips light↔dark. The choice is
   saved (`localStorage`) and restored on the next visit and across pages. A
   saved choice always wins over the device setting.
3. **Mobile:** tapping the portrait switches instantly (no crescent sweep, no
   colour cross-fade) — this avoids the old mobile glitch. The old CSS already
   does this (`.portrait::after { display:none }` + `theme-anim` transitions
   disabled under `@media (max-width:640px)`).
4. **Accessibility:** the portrait is a keyboard-operable button
   (`role="button" tabindex="0"`, Enter/Space activate it); reduced-motion
   users get an instant switch (no animation).

## Changes (4 contained pieces)

1. **`index.html` — `<head>` theme script.** Replace the current
   "mirror `prefers-color-scheme`" script with: use the saved choice if there
   is one, otherwise follow the device; keep listening to OS changes but only
   apply them while there is no saved manual choice. Runs before paint (no
   flash).
2. **`index.html` — portrait markup.** Add `role="button" tabindex="0"` (and an
   `aria-label`) to `.portrait` so it is clickable and keyboard-accessible
   again.
3. **`styles.css` — moon CSS.** Add the recovered blocks: `.theme-anim` colour
   cross-fade; `.portrait::after` crescent disc + its light/dark/hover states;
   `.moon-exit` / `.moon-reset` sweep choreography; the `prefers-reduced-motion`
   and `@media (max-width:640px)` rules (disc hidden + instant on mobile).
   Adapt any colour values to the current CSS token names.
4. **`theme-toggle.js` — new file.** Recover the ~40-line script (click +
   keyboard handler on `.portrait, .portrait-float`, sweep choreography,
   `localStorage` save). Link it before `</body>`.

## Integration points to verify

- **Docked avatar:** the current site's `avatar-dock.js` docks a copy of the
  portrait into the nav on scroll. The recovered click handler already targets
  `.portrait, .portrait-float`; confirm the docked copy still carries a class
  the handler matches, so the docked avatar also toggles (as it did before).
- **Token names:** the disc CSS from the old site must reference the current
  project's colour tokens, not stale ones.

## Explicitly NOT touched

Growing-sentence "About", docked-avatar glide, sticky headers, all content and
copy. This work touches only the portrait element + the theme plumbing.

## Verification (before declaring done)

Open the local site and confirm, in this order:
1. Fresh load (cleared storage) matches the OS setting.
2. Clicking the portrait flips the theme with the sweep (desktop).
3. Reload keeps the manually chosen theme.
4. Narrow the window to mobile width: tap flips instantly, no sweep, no glitch.
5. Growing-sentence About still opens/reveals correctly.
6. Then push; GitHub Pages auto-redeploys (~1 min); re-check live.
