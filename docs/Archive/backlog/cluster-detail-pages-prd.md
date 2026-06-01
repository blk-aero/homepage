---
title: Cluster Detail Pages - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Cluster Detail Pages

## Problem Statement

Homepage triage cards now route to five `/solucoes/[cluster]` detail paths, but
those pages still render "Em Construção". Visitors who want more context before
opening WhatsApp do not yet receive a useful explanation of each cluster.

## Goal

Replace the five temporary cluster pages with full-depth Cluster Detail Pages
that explain the buyer problem, BLK method, deliverables, differentiators,
proof, objections, and next contact path for each homepage service cluster.

## Implemented Baseline

- `/solucoes/[cluster]` exists and statically generates the five homepage
  cluster paths.
- The homepage exposes discrete `Ver detalhes` links for each cluster.
- The homepage uses Card-Based Matching for the current phase and should not be
  replaced by a ServiceMatcher or calculator in this PRD.
- The homepage already owns the Authority + Triage structure and should not be
  reworked in this PRD.
- Current routing tests expect the five cluster paths to render temporary
  construction pages; this PRD owns changing that expectation.

## Scope

- Build a reusable cluster page template for:
  - `/solucoes/projeto-e-obra`
  - `/solucoes/regularizacao-rural`
  - `/solucoes/regularizacao-urbana`
  - `/solucoes/volumetria-e-medicao`
  - `/solucoes/monitoramento-e-inteligencia-geografica`
- Add structured cluster content for:
  - BLUF/problem summary.
  - Work method.
  - Concrete deliverables.
  - Specs or technical facts using a `<dl id="specs">` block.
  - Differentiator/comparison block.
  - Cluster-specific proof or trust signals.
  - Objection FAQ with at least three useful questions.
  - Primary Specialist CTA.
- Include a truthful risk-reversal or expectation-setting note only where BLK
  can stand behind the claim.
- Use Standards-Forward Copy for relevant standards and official references.
- Keep visible WhatsApp greetings short; do not restore long qualification
  payloads for normal CTAs from older backlog drafts.
- Keep pages vanilla Astro + Tailwind + Flowbite.

## Content Quality Gate

A cluster page is ready to replace the temporary page only when it has:

- Authentic cluster-specific copy, not placeholder text.
- At least 300 words of buyer-useful content.
- A specs `<dl id="specs">` block.
- A comparison or differentiator block that explains how BLK's method changes
  the buyer decision.
- At least three cluster-specific FAQs.
- One primary contact path and no competing heavy form.

## Out of Scope

- `/cidades`, `/cidades/[city]`, or `/solucoes/[cluster]/[city]`.
- Lead capture offers under `/ofertas`.
- `/sobre`, `/llms.txt`, or full JSON-LD graph work.
- Replacing the homepage triage model with an interactive matcher.
- Reading or restoring `docs/Archive`.

## Open Question

Should this first pass include a lightweight cluster-page scope helper?

Recommended answer: no. Ship static full-depth cluster pages first. A helper can
be added later if analytics show that visitors need a structured pre-chat step.

## Acceptance Criteria

- All five cluster paths render full-depth content instead of "Em Construção".
- The homepage `Ver detalhes` links continue to point to the same paths.
- Each page includes a visible H1, BLUF paragraph, specs block, differentiator
  block, FAQ, and Primary Specialist CTA.
- The implementation keeps the current homepage section order unchanged.
- Existing routing tests are updated to stop expecting construction pages for
  the five cluster paths.
- Relevant route/content E2E tests and `npm run build` pass.
