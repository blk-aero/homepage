---
title: Marketing Attribution and Operations - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Marketing Attribution and Operations

## Problem Statement

The site has first-touch `sessionStorage` attribution and WhatsApp click events,
but broader marketing operations still need durable short-term attribution,
secondary contact tracking, post-build URL notification, and recurring content
operations.

## Goal

Extend the measurement and operations layer around the static site without
blocking user-facing page PRDs.

## Implemented Baseline

- `mergeFirstTouchAttribution` preserves original UTM/GCLID values.
- WhatsApp CTAs push `whatsapp_click` events.
- Attribution is currently stored in `sessionStorage`.
- Current WhatsApp tests assert that raw UTM/GCLID fields do not appear in the
  visible prefilled message.
- Footer email uses `mailto:`, and phone display routes to WhatsApp rather than
  `tel:`.
- `scripts/indexnow.mjs` is intentionally absent from the current surface.

## Scope

- Add a first-party short-term cookie fallback for attribution, with a 7-day TTL
  unless a different retention window is explicitly approved.
- Design an Offline Conversion Import-ready payload shape for Pipedream or the
  downstream CRM workflow.
- Track secondary contact events:
  - `click_to_call` if a real `tel:` link is introduced.
  - `email_click` for footer or contact email links.
- Add a lightweight IndexNow post-build script that reads the generated sitemap
  and submits changed URLs when the required environment key is configured.
- Document a quarterly freshness workflow for pages that need updated proof,
  FAQs, standards, or local references.
- Document a post-project PR/backlink workflow for major completed projects.
- Leave explicit entry points for future A/B testing scripts without adding a
  testing platform now.
- Include Meta Pixel tag placeholders and triggers in the GTM Container Recipe.
- Define manual tasks for Google Search Console sitemap registration and GA4 Custom Dimensions setup.

## Out of Scope

- Changing the public WhatsApp message text to expose campaign metadata.
- Building lead magnet pages or forms.
- Choosing an email marketing platform.
- Reintroducing generated rollout files as cleanup.
- Sending IndexNow requests without an explicit environment key.

## Acceptance Criteria

- Attribution tests cover session and cookie fallback behavior.
- Contact tracking tests prove the expected event names and payload shapes.
- IndexNow is opt-in, environment-gated, and safe when no key is present.
- Operations docs explain freshness, backlink, post-project PR cadence, GSC sitemap registration, and GA4 Custom Dimensions setup.
- Existing WhatsApp message tests still prove that raw attribution does not
  appear in the visible prefilled message.
- Relevant unit/config tests and `npm run build` pass.

