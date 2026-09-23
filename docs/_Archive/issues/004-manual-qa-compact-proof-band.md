---
title: Manual QA Compact Proof Band
labels:
  - ready-for-agent
---

# Manual QA Compact Proof Band

## Parent

`docs/proof-logo-assets-prd.md`

## What to build

Run a focused visual QA pass on the implemented **Compact Proof Band** after the proof content model, normalized assets, and **Home Proof Band Component** are in place.

This slice is HITL because perceived logo balance, compactness, wrapping quality, and text fallback fit need human visual judgment. If the proof band already passes inspection, no code change is required. If the review finds visible imbalance, make only small spacing, sizing, or layout polish changes.

## Acceptance criteria

- [x] Desktop review confirms the proof band remains compact and balanced.
- [x] Mobile review confirms proof items wrap cleanly without cramped or overflowing text.
- [x] Logo-backed items have similar perceived size across wide, tall, and text-heavy marks.
- [x] Text fallback items fit the same quiet proof-item layout.
- [x] Quiet source links do not make the section feel like a navigation menu.
- [x] Any required polish is scoped to proof-band visual fit.
- [x] The final evidence includes commands run and viewport notes or screenshots.

## Final QA Evidence

Human visual QA validated the compact proof band after switching from monochrome treatment to color logos with approved readable variants for primarily white/light marks.

Viewport notes:

- Desktop: proof band remains compact between the hero and triage cards; logo-backed items are recognizable and visually balanced across wide, tall, and text-heavy marks.
- Mobile: proof items wrap cleanly without cramped labels or horizontal overflow.
- Text fallback: the `Lia Blanco Arquitetura` fallback uses the same quiet proof-item treatment as logo-backed items.
- Links: source links remain quiet proof items and do not read like a navigation menu.
- Scope: required polish stayed inside proof-band visual fit, asset treatment, and proof-logo documentation.

Verification commands:

- `git diff --check`
- `docker compose run --rm web npm run test -- tests/lib/homepage-content.test.ts`
- `docker compose run --rm web npm run build`
- `docker run --rm --user $(id -u):$(id -g) -e HOME=/tmp/pw-home -e npm_config_cache=/tmp/npm-cache -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.58.2-noble sh -lc 'npm ci && npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts'`

## Test intent

- Behavior: The final proof band looks balanced and compact across desktop and mobile after real assets render.
  Public interface: Local preview visual QA.
  Why this matters: Automated tests can verify presence and links, but they cannot prove perceived logo balance or visual polish.
  Evidence: `npm run build && npm run preview -- --host 127.0.0.1 --port 4321`, then inspect desktop and mobile viewports and record notes or screenshots.
  Refactor-safe because: It validates the rendered user experience rather than implementation details.

## Commit stack

- Commit 1: Apply small proof-band spacing, sizing, or layout polish only if visual QA finds an issue. Validation: `npm run build` and targeted desktop/mobile preview notes.
- Commit 2: Update tests only if polish changes an externally visible behavior contract. Validation: the relevant content or e2e command named in the implementation issue.

## Blocked by

- `docs/issues/003-render-home-proof-band-component.md`
