---
title: Local Service + City Pages - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Local Service + City Pages

## Problem Statement

BLK needs local SEO coverage for searches such as "levantamento topografico em
Jacarei", but the current checkout intentionally removed generated city and
service-city routes. Restoring them without quality gates would risk thin
doorway pages.

## Goal

Restore programmatic local pages only when the data and content quality are
strong enough to produce useful, indexable pages.

## Implemented Baseline

- The current surface intentionally omits `src/pages/cidades/[city].astro`,
  generated service-city routes, rollout controls, and legacy route helpers.
- `CONTEXT.md` defines Service + City Page as localized content that must add
  local context rather than only changing a city name.
- `/cidades` search and the five Cluster Detail Pages are separate PRDs; this
  PRD should not use them as an excuse to launch thin generated pages.

## Scope

- Add city content data with an explicit `active` flag.
- Generate `/cidades/[city]` only for active cities that pass quality gates.
- Generate `/solucoes/[cluster]/[city]` only when both the city and cluster data
  meet the minimum content threshold.
- Include local context such as neighborhoods, buyer intent, local FAQs, and
  official-source links.
- Add sitemap and metadata behavior for generated pages.
- Add route taxonomy that can support Google Ads campaign segmentation by
  cluster and city.
- Keep ad-to-page keyword scent aligned through route taxonomy and page copy,
  not query-string headline swapping in the first implementation pass.
- Add build-time or test-time quality checks that prevent pages from being
  generated when required local fields are missing.

## Quality Gates

A generated local page must include:

- Active city flag.
- At least three served neighborhoods or a documented reason why the city is
  handled differently.
- Local FAQ entries.
- A freshness marker.
- At least one relevant official-source or standards link.
- A unique H1 and body copy that add useful local context.

## Out of Scope

- Replacing the five Cluster Detail Pages.
- Launching every possible city at once.
- Auto-generating copy from templates without review.
- IndexNow, freshness operations, and backlink workflows.
- Reading or restoring `docs/Archive`.

## Open Question

Should local service-city pages launch with one pilot city first?

Recommended answer: yes. Pilot one active city and one or two clusters, verify
the quality gate and search behavior, then widen the route set.

## Acceptance Criteria

- Inactive or incomplete cities do not generate public pages.
- Active generated pages contain local context, local FAQ, official-source link,
  and correct canonical metadata.
- Sitemap output includes only active generated pages.
- Tests cover quality gates and route rendering.
- Relevant route/content E2E tests and `npm run build` pass.
