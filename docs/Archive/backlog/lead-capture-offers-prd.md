---
title: Lead Capture Offers - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Lead Capture Offers

## Problem Statement

The site currently optimizes for low-friction WhatsApp contact. That is correct
for ready buyers, but researching visitors may need a lower-commitment offer
before they start a commercial conversation.

## Goal

Add static lead capture offers that collect consent-gated contact details,
display the download immediately, and hand the lead to Pipedream for commercial
follow-up.

## Implemented Baseline

- The site has Consent Mode state helpers and a cookie banner.
- WhatsApp CTAs already push `whatsapp_click` events with attribution context.
- There is no `offers` content collection and no `/ofertas/[slug]` route.
- The homepage's primary conversion path remains WhatsApp First Contact; offers
  are secondary paths for researching visitors.

## Scope

- Add an `offers` content collection.
- Add `/ofertas/[slug]` static offer pages.
- Require each offer to map to a related cluster or solution.
- Build a client-side capture form for name, email, and phone.
- Display the download link immediately after a successful form submission.
- Push a `lead_magnet_submit` event to the GTM dataLayer.
- Gate PII in analytics payloads according to Consent Mode v2 state.
- Send the lead payload to Pipedream through a configurable webhook.
- Include a contextual fallback CTA to WhatsApp for visitors who prefer direct
  contact.

## Out of Scope

- Hosting a CRM database inside the Astro project.
- Email nurture platform selection.
- Offline Conversion Import payload design beyond the fields needed by the
  webhook.
- Dynamic generated local pages.
- Making lead capture the primary homepage CTA.

## Open Question

Which marketing system should own email nurture after Pipedream receives a
lead?

Recommended answer: leave the Astro site responsible only for consent-gated
capture and webhook handoff; choose the marketing platform in operations.

## Acceptance Criteria

- `/ofertas/[slug]` pages build from content.
- A valid form submission displays the offer download without waiting for an
  email.
- `lead_magnet_submit` events do not expose email/phone to ad systems when
  consent is denied.
- Pipedream webhook URL is configurable and not hard-coded as a secret.
- Tests cover form behavior, consent gating, and offer-to-cluster routing.
- Relevant unit/E2E tests and `npm run build` pass.
