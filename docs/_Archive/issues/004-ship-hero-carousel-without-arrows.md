---
title: Ship hero carousel without arrows
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Implement the production homepage hero using the selected **Variant F - Carousel sem setas** direction. The hero must use the canonical promise, canonical subheadline, `Falar com especialista` as the primary CTA, and a quiet five-slide service-cluster carousel with dot indicators only.

The carousel should auto-cycle every `2000ms` for normal users, pause while hovered or focused, stop auto-cycling after any dot click, and disable auto-cycle when reduced motion is active.

## Acceptance criteria

- [ ] The hero shows the canonical H1 and subheadline from the PRD.
- [ ] The primary CTA says `Falar com especialista` and visually communicates WhatsApp as the channel.
- [ ] The carousel has five slides matching the five accepted service clusters.
- [ ] The carousel has focusable, labeled dot controls and no visible previous or next arrow controls.
- [ ] Auto-cycle, hover or focus pause, manual dot stop, and reduced-motion behavior work as specified.
- [ ] The compact proof band appears immediately after the hero.

## Test intent

- Behavior: Visitors can understand BLK's breadth from the first viewport and keyboard users can operate the hero carousel without arrow controls.
  Public interface: Homepage hero UI, dot controls, motion behavior, and reduced-motion behavior.
  Why this matters: The hero is the first-screen promise and must not regress into a generic drone/topography page.
  Evidence: `npm run test -- <carousel behavior unit test>`, `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`, and `npm run build`.
  Refactor-safe because: The tests prove observable slide selection and timing outcomes instead of implementation-only state.

## Commit stack

- Commit 1: Add the carousel behavior module and unit coverage. Validation: `npm run test -- <carousel behavior unit test>`.
- Commit 2: Render the five-slide no-arrow hero carousel. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 3: Verify reduced-motion and build behavior. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts` and `npm run build`.

## Blocked by

- `docs/issues/003-build-homepage-content-model-and-section-order.md`
