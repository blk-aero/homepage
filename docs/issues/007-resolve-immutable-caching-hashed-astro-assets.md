---
title: Resolve immutable caching for hashed Astro assets
labels:
  - ready-for-agent
---

# Resolve immutable caching for hashed Astro assets

## What to build

Decide and implement the hosting or CDN path that lets live content-hashed Astro
assets serve a long immutable cache policy while HTML remains short-lived. This
is intentionally the last slice because it depends on production header evidence
and may require an infrastructure decision if the current hosting layer cannot
enforce the desired headers.

## Acceptance criteria

- [ ] Live HTML remains short-lived enough for content and metadata updates to
      roll out predictably.
- [ ] Live content-hashed Astro assets serve a long immutable cache policy,
      ideally `public, max-age=31536000, immutable`.
- [ ] If the current hosting layer cannot enforce the desired headers, the
      trade-off and chosen infrastructure path are documented before
      implementation.
- [ ] The final behavior is verified against production after deployment.

## Test intent

- Behavior: Live hashed Astro assets use long immutable caching while HTML stays
  short-lived.
  Public interface: Live HTTPS header responses.
  Why this matters: PageSpeed flags inefficient cache lifetimes for hashed
  assets, but the fix belongs to the deployed hosting/CDN surface.
  Evidence: Live `curl -sSI` checks for one HTML page and one content-hashed
  Astro asset after the chosen hosting/cache path is deployed.
  Refactor-safe because: The check validates public deployment behavior rather
  than a specific implementation mechanism.

## Commit stack

- Commit 1: Decide whether current hosting can enforce desired headers or
  whether infrastructure must change. Validation: documented decision.
- Commit 2: Implement the chosen hosting/cache path. Validation: live header
  checks.

## Blocked by

- `docs/issues/006-add-production-cache-header-release-check.md`
