---
title: Searchable Coverage Index - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Searchable Coverage Index

## Problem Statement

The `/cidades` route currently renders a temporary construction page. Visitors
who need to know whether BLK serves their region cannot search cities or
neighborhoods before deciding whether to contact BLK.

## Goal

Turn `/cidades` into a useful static coverage finder with a lightweight search
box, active city/neighborhood data, and a service-area visual.

## Implemented Baseline

- `/cidades` exists as a temporary support page.
- Generated city routes are intentionally absent from the current surface.
- This PRD is the bridge between the placeholder `/cidades` route and later
  generated local pages; it should not restore `/cidades/[city]`.
- The project is expected to stay static Astro with lightweight vanilla client
  behavior.

## Scope

- Add a city/neighborhood data source that can later support generated city
  routes.
- Render active cities and neighborhoods on `/cidades`.
- Add a client-side vanilla JS filter that hides non-matching cards without a
  page reload.
- Include a lightweight map or service-area visual that communicates the served
  region.
- Provide empty and no-results states.
- Add CTA behavior that routes visitors to WhatsApp with `cta_location` context
  for coverage searches.

## Out of Scope

- Dynamic `/cidades/[city]` pages.
- Dynamic `/solucoes/[cluster]/[city]` pages.
- Full local SEO copy for individual cities.
- Doorway-page gates for generated pages.
- Lead magnet forms.

## Acceptance Criteria

- `/cidades` no longer displays "Em Construção".
- Visitors can search by city or neighborhood on mobile and desktop.
- Filtering runs on the client without a route change or reload.
- The page remains useful when a city has no generated detail route yet.
- Tests prove that matching cards remain visible and non-matching cards are
  hidden after search input.
- Relevant route/content E2E tests and `npm run build` pass.
