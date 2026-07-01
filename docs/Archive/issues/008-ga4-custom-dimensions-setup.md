---
title: Register Custom Dimensions (landing_page, previous_page) in GA4 Admin
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

This is a **Human-in-the-Loop (HITL)** setup task.
- Log in to your Google Analytics 4 (GA4) property admin panel.
- Navigate to **Data Display** -> **Custom Definitions**.
- Create a new Event-scoped Custom Dimension for `landing_page` (Event parameter: `landing_page`).
- Create a new Event-scoped Custom Dimension for `previous_page` (Event parameter: `previous_page`).
- Verify that these dimensions begin populating when custom click events are fired.

## Acceptance criteria

- [ ] Custom dimensions for `landing_page` and `previous_page` are active in the GA4 Custom Definitions panel.
- [ ] Dimension values appear in Realtime or Custom exploration reports in GA4 when WhatsApp conversion events trigger.

## Test intent

- Behavior: GA4 custom dimensions are registered, letting you run reports linking conversion counts to SEO entry page URLs.
  Public interface: GA4 Custom Definitions admin panel and reporting dashboard.
  Why this matters: Essential for measuring landing page performance and macro user journeys natively in GA4.
  Evidence: Confirm that custom dimensions are listed in GA4 and show parameter counts.
  Refactor-safe because: Tests GA4 dashboard reporting functionality, independent of frontend script styling.

## Blocked by

- [docs/issues/006-gtm-container-import-verification.md](file:///Users/lupion/Documents/homepage/docs/issues/006-gtm-container-import-verification.md)
