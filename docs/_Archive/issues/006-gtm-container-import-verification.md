---
title: Import GTM Container Recipe & Configure GA4/Meta Tags
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

This is a **Human-in-the-Loop (HITL)** setup task.
- Import the exported `docs/gtm-container-recipe.json` into your Google Tag Manager workspace.
- Replace the GA4 Measurement ID placeholder in GTM variables with your actual GA4 Measurement ID (`G-XXXXXXXXXX`).
- Replace the Facebook Pixel ID placeholder with your actual Facebook Pixel ID.
- Publish the GTM container workspace version.
- Verify that GTM is active on the live website and triggers the correct custom events in GTM preview mode.

## Acceptance criteria

- [ ] GTM Container is imported successfully without schema errors.
- [ ] GA4 Measurement ID and Facebook Pixel ID are configured.
- [ ] GTM workspace is published to production.
- [ ] Triggering clicks on WhatsApp or email on the live site fires custom tags.

## Test intent

- Behavior: The GTM script on the live site loads and triggers GA4/Meta pixel tags on WhatsApp and email click conversions.
  Public interface: GTM Tag Assistant / Preview Mode.
  Why this matters: Critical to ensure the dataLayer events pushed by the codebase are caught and routed to ad channels.
  Evidence: In GTM preview mode, click a WhatsApp CTA and verify the GA4 event and Meta Pixel conversion tags fire.
  Refactor-safe because: Tests the final tagging integrations inside the browser sandbox, independent of codebase architecture.

## Blocked by

- [docs/issues/003-gtm-container-recipe-export.md](file:///Users/lupion/Documents/homepage/docs/issues/003-gtm-container-recipe-export.md)
- Deployment of frontend changes (Issue 2) to production.
