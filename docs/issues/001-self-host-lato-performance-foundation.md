---
title: Self-host Lato as the Performance Foundation font baseline
labels:
  - ready-for-agent
---

# Self-host Lato as the Performance Foundation font baseline

## What to build

Replace the runtime Google Fonts request chain with self-hosted local Lato font
assets while preserving the current visual baseline. The completed slice should
keep the site on Lato, remove the third-party font dependency from rendered
pages, and verify the homepage still renders correctly through built preview.

## Acceptance criteria

- [ ] Rendered public pages no longer request `fonts.googleapis.com` or
      `fonts.gstatic.com` for Lato.
- [ ] Lato remains the configured visual baseline; the implementation does not
      silently switch to a system font stack.
- [ ] Font loading is handled with local assets and an intentional loading
      strategy.
- [ ] Homepage rendering remains visually stable enough for the existing
      homepage Playwright checks to pass.

## Test intent

- Behavior: The built site uses local Lato assets instead of runtime Google
  Fonts.
  Public interface: Built preview and browser network requests.
  Why this matters: Runtime Google Fonts contributes render-blocking and
  third-party request chains in PageSpeed while Lato is part of the visual
  baseline.
  Evidence: `npm run build`, relevant homepage Playwright spec, and a
  browser/network check showing no `fonts.googleapis.com` or `fonts.gstatic.com`
  requests.
  Refactor-safe because: The test observes rendered output and network behavior,
  not the internal CSS organization.

## Commit stack

- Commit 1: Add local Lato assets and the font loading strategy. Validation:
  `npm run build`.
- Commit 2: Remove the runtime Google Fonts import and verify homepage
  rendering/network behavior. Validation: relevant homepage Playwright spec plus
  browser/network check.

## Blocked by

None - can start immediately.
