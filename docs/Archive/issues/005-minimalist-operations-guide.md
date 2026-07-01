---
title: Minimalist Marketing Operations Guide
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Create a minimalist guide (`docs/marketing-operations.md`) that documents:
- The exact conversion payload JSON schema (GCLID, UTMs, landing_page, previous_page, timestamps).
- Manual GSC Sitemap submission steps.
- Manual GA4 Custom Dimensions setup steps.
- Quarterly page freshness checklists (updating proofs, checking standards).
- Post-project backlink checklists.

## Acceptance criteria

- [ ] `docs/marketing-operations.md` is successfully created.
- [ ] Contains detailed steps for manual sitemap registration in Google Search Console.
- [ ] Contains detailed steps for GA4 custom dimensions (`landing_page`, `previous_page`) registration.
- [ ] Contains the exact payload JSON schema and operational cadence checklists.

## Test intent

- Behavior: The operations guide exists and contains instructions for all required manual tasks.
  Public interface: The `docs/marketing-operations.md` markdown file.
  Why this matters: Serves as the SOP for ad managers, SEO specialists, and content editors.
  Evidence: Verify that the file is present in the workspace.
  Refactor-safe because: Only checks for file presence and markdown sections.

## Commit stack

- Commit 1: Create `docs/marketing-operations.md`. Validation: local check.

## Blocked by

- [docs/issues/002-macro-journey-datalayer-enrichment.md](file:///Users/lupion/Documents/homepage/docs/issues/002-macro-journey-datalayer-enrichment.md)
- [docs/issues/003-gtm-container-recipe-export.md](file:///Users/lupion/Documents/homepage/docs/issues/003-gtm-container-recipe-export.md)
