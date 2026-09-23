---
title: Extend WhatsApp attribution for homepage CTAs
type: AFK
labels:
  - ready-for-agent
---

## Parent

`docs/homepage_prd.md`

## What to build

Extend the WhatsApp contact flow so homepage CTAs can produce useful prefilled messages and conversion events. The message and click payload should carry the visitor's selected service cluster when relevant, where the CTA appeared on the homepage, and available first-touch attribution fields.

The attribution behavior should preserve first-touch UTM and `gclid` values across navigation. Later empty, unrelated, or partial query strings must not erase an existing first-touch attribution value.

## Acceptance criteria

- [ ] Homepage WhatsApp URLs can include location, approximate area or perimeter, objective, deadline, desired deliverable or output type, selected cluster, CTA location, and attribution fields when those values are available.
- [ ] Existing service and city WhatsApp behavior continues to include its current service, city, and attribution context.
- [ ] First-touch UTM and `gclid` values are preserved across internal navigation and are not overwritten by later empty or unrelated query params.
- [ ] `whatsapp_click` events include page path, CTA location, selected cluster when relevant, and available attribution fields.

## Test intent

- Behavior: Homepage CTA message and tracking payloads include the fields needed for first commercial qualification and segmentation.
  Public interface: WhatsApp URL text and emitted `whatsapp_click` event payload.
  Why this matters: BLK needs WhatsApp-first contact without losing campaign or cluster context.
  Evidence: `npm run test -- tests/lib/whatsapp.test.ts tests/lib/attribution.test.ts` and `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`.
  Refactor-safe because: The tests inspect generated URLs and observable analytics payloads, not helper internals.

## Commit stack

- Commit 1: Preserve first-touch attribution through navigation. Validation: `npm run test -- tests/lib/attribution.test.ts`.
- Commit 2: Extend WhatsApp message building for homepage CTA context. Validation: `npm run test -- tests/lib/whatsapp.test.ts`.
- Commit 3: Prove homepage conversion payload behavior end to end. Validation: `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`.

## Blocked by

None - can start immediately.
