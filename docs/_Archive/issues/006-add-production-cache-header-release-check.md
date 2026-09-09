---
title: Add production cache-header release check
labels:
  - ready-for-agent
---

# Add production cache-header release check

## What to build

Add a release-stage check that verifies cache headers against production
`https://blk.aero/` after local implementation, code review, and deployment.
The check should make it repeatable to inspect one HTML page and one
content-hashed Astro asset in the live hosting layer.

## Acceptance criteria

- [x] The release guidance explains that cache headers must be checked against
      production, not local build output.
- [x] The check includes one live HTML request.
- [x] The check includes one live content-hashed Astro asset request.
- [x] The check records whether HTML remains short-lived and whether hashed
      assets are candidates for long immutable caching.

## Test intent

- Behavior: Production header verification is repeatable against the real
  deployed site.
  Public interface: Live HTTPS header responses.
  Why this matters: Cache headers are controlled by the live hosting/CDN layer,
  so local build output cannot prove cache behavior.
  Evidence: `curl -sSI https://blk.aero/` and
  `curl -sSI https://blk.aero/_astro/<hashed-asset>` after deploy.
  Refactor-safe because: The check observes the public deployment contract, not
  repo internals.

## Commit stack

- Commit 1: Add release checklist/runbook coverage for live HTML and hashed
  asset header checks. Validation: `git diff --check`.
- Commit 2: Record the first production header check result after deploy.
  Validation: live `curl -sSI` output.

## Blocked by

- Local implementation, review, and deployment of the relevant performance
  changes.
