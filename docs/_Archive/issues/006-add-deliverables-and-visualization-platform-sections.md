---
title: Add deliverables and visualization platform sections
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Add the **Decision-First Deliverable Groups** section and the distinct **Client Visualization Platform** section. Deliverables should be framed around buyer decisions, not as a raw file-format list. The platform section should explain that orthoimages, point clouds, 3D models, and evidence are organized in a visual environment for stakeholders who do not have specialized software or hardware.

Do not mention the default 20-day visualization access window on the homepage.

## Acceptance criteria

- [ ] Four deliverable groups render: Base para Projeto e Obra, Base para Regularização e Aprovação, Base para Medição e Auditoria, and Base Visual para Alinhamento.
- [ ] The deliverables section appears before the client visualization platform section.
- [ ] The platform section is presented as a standard delivery differentiator, not as one of the deliverable groups.
- [ ] The copy makes the outputs understandable to non-technical stakeholders.
- [ ] The homepage does not mention the standard 20-day platform access window.

## Test intent

- Behavior: Buyers can understand what decision support they receive before reading BLK's method.
  Public interface: Rendered homepage sections and section order.
  Why this matters: The PRD prioritizes decision-first value over technical file-format lists.
  Evidence: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts` and `npm run build`.
  Refactor-safe because: The assertions target section presence and ordering visible to visitors.

## Commit stack

- Commit 1: Render the four decision-first deliverable groups. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 2: Render the client visualization platform section after deliverables. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 3: Verify static build. Validation: `npm run build`.

## Blocked by

- `docs/issues/003-build-homepage-content-model-and-section-order.md`
