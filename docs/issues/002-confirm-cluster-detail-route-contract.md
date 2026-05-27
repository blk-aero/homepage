---
title: Confirm cluster Detail Path route contract
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Define the five homepage cluster detail URLs and make every `Ver detalhes` target release-safe. The detail pages can be intentionally simple placeholders in this slice, but they must render, identify the matching cluster, and give visitors a clear next step instead of producing broken links.

The five cluster paths are for **Projeto e Obra**, **Regularização Rural**, **Regularização Urbana**, **Volumetria e Medição**, and **Monitoramento e Inteligência Geográfica**. Full cluster detail content remains out of scope for this issue.

## Acceptance criteria

- [ ] A stable URL exists for each of the five homepage service clusters.
- [ ] Each URL renders a simple page that names the cluster and provides a WhatsApp-first next step.
- [ ] Homepage `Ver detalhes` links can point to these URLs without producing broken links.
- [ ] Placeholder pages do not pretend to be full cluster-detail implementations or named case studies.

## Test intent

- Behavior: Every cluster detail route linked from the homepage renders successfully and is useful enough as a temporary release-safe destination.
  Public interface: Browser routes and homepage links.
  Why this matters: The homepage can be implemented before full cluster pages, but it must not ship broken `Ver detalhes` links.
  Evidence: `npm run test:e2e -- tests/e2e/routing.spec.ts`, `npm run check:links` with the local site running, and `npm run build`.
  Refactor-safe because: The checks validate route and link behavior visible to users and crawlers.

## Commit stack

- Commit 1: Add the five cluster detail route targets with simple placeholder content. Validation: `npm run test:e2e -- tests/e2e/routing.spec.ts`.
- Commit 2: Add or update link coverage so homepage detail paths are checked. Validation: `npm run check:links` with the local site running.
- Commit 3: Verify static rendering can build the placeholder route set. Validation: `npm run build`.

## Blocked by

None - can start immediately.
