---
title: Add compact proof band and five triage cards
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Add the compact proof band and replace the current three service cards with the five accepted **Homepage Triage Cards**. The proof band should use two visual groups only: **Credenciais e Associações** and **Clientes e Projetos Atendidos**. The triage cards should use card-based matching, with WhatsApp-first contact and a secondary `Ver detalhes` route for each cluster.

## Acceptance criteria

- [ ] The compact proof band appears directly after the hero and before the triage cards.
- [ ] The proof band shows the accepted credential and client/project groups without per-logo relationship labels.
- [ ] Proof items use normalized monochrome site-ready logos or clean text fallbacks.
- [ ] Five triage cards render: Projeto e Obra, Regularização Rural, Regularização Urbana, Volumetria e Medição, and Monitoramento e Inteligência Geográfica.
- [ ] Each triage card has `Falar com especialista` and `Ver detalhes` actions.
- [ ] Card WhatsApp links include selected cluster and CTA-location context.

## Test intent

- Behavior: Visitors can quickly recognize credibility and choose the closest commercial path without using a matcher form.
  Public interface: Homepage proof band, triage card links, and WhatsApp URLs.
  Why this matters: This is the main homepage triage mechanism for the current phase.
  Evidence: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`, `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`, and `npm run build`.
  Refactor-safe because: The checks inspect visible groups, cluster names, CTA labels, and generated URLs.

## Commit stack

- Commit 1: Add structured proof data and render the compact proof band. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 2: Add the five homepage triage cards and detail links. Validation: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- Commit 3: Add cluster-aware WhatsApp assertions for card CTAs. Validation: `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`.
- Commit 4: Verify static build. Validation: `npm run build`.

## Blocked by

- `docs/issues/001-extend-whatsapp-attribution-for-homepage-ctas.md`
- `docs/issues/002-confirm-cluster-detail-route-contract.md`
- `docs/issues/003-build-homepage-content-model-and-section-order.md`
