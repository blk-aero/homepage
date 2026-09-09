---
title: Build homepage content model and section order
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Replace the current small homepage composition with the settled **Authority + Triage Homepage** structure backed by a centralized content model. The page should render the accepted section order: hero, compact proof band, five triage cards, decision-first deliverables, client visualization platform, technical confidence method, anonymized proof snippets, hiring-objection FAQ, and final CTA.

This slice should establish the content contract and section skeletons without needing to complete every interactive or visual detail handled by later issues.

## Acceptance criteria

- [ ] Homepage copy and card data are centralized in a stable content model instead of scattered through page markup.
- [ ] The homepage renders all accepted sections in the required order.
- [ ] The canonical hero promise and subheadline are used exactly.
- [ ] The page remains static-rendering friendly and does not introduce a heavy frontend framework.
- [ ] Existing baseline metadata and layout behavior are preserved.

## Test intent

- Behavior: The homepage exposes the accepted commercial structure and canonical copy in the right sequence.
  Public interface: Rendered homepage content and heading order.
  Why this matters: Later slices need a stable content contract and page architecture to add behavior safely.
  Evidence: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`, `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`, and `npm run build`.
  Refactor-safe because: The tests assert visible content and sequence rather than component boundaries.

## Commit stack

- Commit 1: Add the centralized homepage content model. Validation: `npm run test`.
- Commit 2: Render the required homepage section skeleton in order. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 3: Verify accessibility smoke and static build. Validation: `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts` and `npm run build`.

## Blocked by

None - can start immediately.
