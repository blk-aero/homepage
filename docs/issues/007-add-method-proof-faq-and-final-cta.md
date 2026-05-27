---
title: Add method, proof snippets, FAQ, and final CTA
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Add the technical confidence method, anonymized cluster proof snippets, hiring-objection FAQ, and final WhatsApp CTA. The method section should be titled **Como garantimos confiança técnica** and frame drone topography as dense detail with validated accuracy, including the accepted trust signals where they strengthen buyer confidence.

Proof snippets must stay anonymized and cluster-oriented. The FAQ should be short and practical, with no starting-price anchor.

## Acceptance criteria

- [ ] The method section title is `Como garantimos confiança técnica`.
- [ ] The method section includes the five accepted steps and mentions the relevant technical trust signals from the PRD.
- [ ] The page includes the trust badge wording `Categoria A em Aerolevantamento pelo Ministério da Defesa` linked to the official aerolevantamento page.
- [ ] Drone-topography value is framed as `Mais detalhe, menos interpolação` with validated accuracy, not as a blanket precision superiority claim.
- [ ] Anonymized proof snippets render for the accepted cluster work patterns without becoming named case studies.
- [ ] The FAQ covers pricing, 5/7/10-day timing reference, unsure-what-to-request, visualization without technical software, approval/audit expectations, and registered aerolevantamento.
- [ ] The final CTA is WhatsApp-first and uses the shared homepage CTA payload behavior.

## Test intent

- Behavior: Near-contact visitors see defensible technical confidence, relevant proof patterns, practical objection handling, and a final low-friction WhatsApp path.
  Public interface: Homepage sections, links, FAQ text, final CTA URL, and keyboard-accessible controls.
  Why this matters: The lower homepage must build trust without overclaiming or turning into a full case-study catalog.
  Evidence: `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`, `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`, and `npm run build`.
  Refactor-safe because: The checks inspect visible headings, CTA behavior, and accessibility-facing UI.

## Commit stack

- Commit 1: Add the technical confidence method and aerolevantamento trust badge. Validation: `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`.
- Commit 2: Add anonymized proof snippets and short FAQ. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 3: Add final CTA conversion coverage and verify the full lower-page flow. Validation: `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`.
- Commit 4: Verify static build. Validation: `npm run build`.

## Blocked by

- `docs/issues/001-extend-whatsapp-attribution-for-homepage-ctas.md`
- `docs/issues/003-build-homepage-content-model-and-section-order.md`
