---
title: Macro User Journey Tracking & DataLayer Enrichment
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Capture the visitor's landing page (`landing_page`) and immediate previous page (`previous_page`), and enrich GTM `dataLayer` pushes for all conversions (`whatsapp_click`, `email_click`, `social_click`) with:
- `event_timestamp` (ISO 8601 string)
- `landing_page` (stored in sessionStorage and a 7-day cookie fallback `blk_cookie_landing_page_v1`)
- `previous_page` (immediate referrer computed dynamically from internal `document.referrer`)
- Current campaign attribution details.

Also, place an explicit A/B testing comment placeholder in `<head>` of `BaseLayout.astro`.

## Acceptance criteria

- [ ] All conversions push `event_timestamp`, `landing_page`, and `previous_page` parameters.
- [ ] `landing_page` value persists in the `blk_cookie_landing_page_v1` cookie for 7 days.
- [ ] `previous_page` is empty if the user came from an external site, and set to the internal referrer path if the user moved between pages.
- [ ] Head comments are added early in `BaseLayout.astro` `<head>` for A/B testing.

## Test intent

- Behavior: Clicking WhatsApp or email links triggers datalayer pushes containing journey parameters and ISO timestamps.
  Public interface: GTM `window.dataLayer` array.
  Why this matters: Critical to map user paths (e.g. SEO landing city page to conversion) in campaign metrics.
  Evidence: Intercept `window.dataLayer` pushes in Playwright E2E tests (`tests/e2e/conversion-flow.spec.ts`) on click triggers.
  Refactor-safe because: Focuses entirely on the emitted JSON payload keys and values, not the element class names.

## Commit stack

- Commit 1: Add landing/previous page helpers and enrich dataLayer payloads. Validation: E2E test fails.
- Commit 2: Add A/B testing head comments and write E2E assertions. Validation: E2E tests pass.

## Blocked by

- [docs/issues/001-attribution-cookie-fallback.md](file:///Users/lupion/Documents/homepage/docs/issues/001-attribution-cookie-fallback.md)
