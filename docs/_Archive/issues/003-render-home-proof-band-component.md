---
title: Render Home Proof Band Component
labels:
  - ready-for-agent
---

# Render Home Proof Band Component

## Parent

`docs/proof-logo-assets-prd.md`

## What to build

Replace the current inline compact proof markup with a single **Home Proof Band Component** that renders the **Homepage Proof Content Model**.

The component should preserve the proof band's current page position after the hero and before the homepage triage cards. It should render all approved proof items, use quiet source links, keep logo-backed and text fallback items in the same proof-item layout, avoid visible relationship labels, and use Astro-native asset rendering for production logos.

## Acceptance criteria

- [ ] The homepage renders one compact proof band through the new component.
- [ ] The old inline proof markup is removed rather than duplicated.
- [ ] The proof band remains after the hero and before the triage cards.
- [ ] Both visible proof groups render with all approved proof items.
- [ ] Proof items with URLs render as quiet links.
- [ ] Text fallback items share the same quiet layout rhythm as logo-backed items.
- [ ] The UI does not show direct-client, indirect-client, partner, supplier, or endorsement labels.
- [ ] Raster logos use Astro's image component and SVG logos use Astro SVG component imports where practical.
- [ ] The production build succeeds with the logo asset imports.

## Test intent

- Behavior: Homepage visitors see the compact proof band in the correct location with both proof groups, all approved proof items, quiet links, text fallback rendering, and no relationship labels.
  Public interface: Homepage e2e behavior.
  Why this matters: This is the user-visible trust proof section and it sits in a conversion-adjacent part of the homepage.
  Evidence: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts` and `npm run build`.
  Refactor-safe because: It checks rendered homepage behavior and build output, not component internals.

## Commit stack

- Commit 1: Add the **Home Proof Band Component** and replace the inline proof section while preserving the existing proof-band test hook. Validation: `npm run build`.
- Commit 2: Update homepage e2e coverage for groups, links, fallback rendering, placement, and absence of relationship labels. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.

## Blocked by

- `docs/issues/001-define-homepage-proof-content-model.md`
- `docs/issues/002-normalize-production-proof-logo-assets.md`
