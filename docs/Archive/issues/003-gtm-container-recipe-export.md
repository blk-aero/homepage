---
title: GTM Container Recipe JSON Export
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Export a pre-configured, importable JSON container template (`docs/gtm-container-recipe.json`) defining the variables, triggers, and tags for Google Tag Manager. The container should map variables (`gclid`, `utm_source`, `landing_page`, `page_path`), create custom event triggers for conversions, and define GA4 event tags alongside Meta Pixel custom HTML tag placeholders.

## Acceptance criteria

- [ ] A valid, syntactically correct `docs/gtm-container-recipe.json` is exported.
- [ ] The JSON contains GTM container specifications including account, container, variable, trigger, and tag arrays.
- [ ] Variables map dataLayer fields like `gclid`, `landing_page`, and campaign parameters.
- [ ] GA4 Event tags and Meta Pixel Custom HTML tags exist for `whatsapp_click` and `email_click`.

## Test intent

- Behavior: The exported GTM container is syntactically valid and has all the required variables and triggers defined.
  Public interface: The `docs/gtm-container-recipe.json` file.
  Why this matters: Enables immediate, error-free campaign configuration in the GTM interface.
  Evidence: A Vitest test suite checks that the JSON file is valid and parses correctly, asserting that variables exist.
  Refactor-safe because: Only checks file existence, format syntax, and key presence.

## Commit stack

- Commit 1: Export GTM container recipe JSON file. Validation: syntax parser check.

## Blocked by

- [docs/issues/002-macro-journey-datalayer-enrichment.md](file:///Users/lupion/Documents/homepage/docs/issues/002-macro-journey-datalayer-enrichment.md)
