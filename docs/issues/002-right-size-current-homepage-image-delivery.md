---
title: Right-size current homepage image delivery
labels:
  - ready-for-agent
---

# Right-size current homepage image delivery

## What to build

Improve the current homepage image delivery that PageSpeed flags as oversized
for rendered dimensions. Keep the work focused on the current homepage hero and
proof/logo images, preserving meaningful `alt` text, stable dimensions, and the
already implemented first-image LCP priority behavior.

## Acceptance criteria

- [x] The homepage hero image is delivered closer to its rendered slot without
      removing the existing LCP priority behavior.
- [x] Proof/logo images flagged by PageSpeed are delivered closer to their
      rendered sizes without becoming decorative or losing meaningful `alt`
      text.
- [x] Header/footer logo image sizing includes explicit dimensions where needed
      to avoid PageSpeed's missing-dimensions diagnostic.
- [x] Existing homepage layout stability and no-horizontal-overflow behavior are
      preserved.

## Test intent

- Behavior: Current homepage hero and proof/logo images are sized for their
  rendered slots while preserving accessibility text and layout stability.
  Public interface: Built homepage preview, rendered image attributes, browser
  inspection, and lab check.
  Why this matters: PageSpeed reports meaningful image-delivery savings on the
  current homepage, especially for the mobile LCP image and proof/logo images.
  Evidence: `npm run build`, homepage Playwright spec, no-horizontal-overflow
  check, and rendered image inspection or lab check confirming the previously
  flagged images are no longer obviously oversized for displayed dimensions.
  Refactor-safe because: The verification observes the rendered page and image
  delivery behavior rather than a specific component implementation.

## Commit stack

- Commit 1: Adjust current homepage hero image sizing/output. Validation:
  focused hero spec and rendered image inspection.
- Commit 2: Adjust proof/logo image sizing/output and explicit logo dimensions
  where needed. Validation: homepage spec and no-horizontal-overflow check.

## Blocked by

None - can start immediately.
