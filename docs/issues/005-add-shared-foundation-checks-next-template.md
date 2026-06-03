---
title: Add shared foundation checks when the next real template ships
labels:
  - blocked
---

# Add shared foundation checks when the next real template ships

## What to build

When the first real non-homepage public template ships, introduce shared
Performance Foundation checks that run against both the homepage and the new
template. The checks should cover the common behavior future pages must inherit:
no horizontal overflow, crawlable primary content, applicable hero/LCP image
priority, and no accidental runtime expansion.

## Acceptance criteria

- [ ] Shared foundation checks run against the homepage and at least one real
      non-homepage public template.
- [ ] The checks cover no horizontal overflow at representative mobile and
      desktop widths.
- [ ] The checks cover crawlable primary content in built output.
- [ ] The checks cover applicable hero/LCP image priority behavior without
      forcing every page to have a hero image.
- [ ] The checks cover accidental runtime expansion or reference the runtime
      guardrail from the shared test path.

## Test intent

- Behavior: Multiple real public templates share the same Performance Foundation
  expectations.
  Public interface: Built preview Playwright checks across public routes.
  Why this matters: The foundation should become reusable when there is more
  than one real page template, not overfit the homepage or temporary support
  pages.
  Evidence: Shared Playwright checks pass against built preview for both the
  homepage and the new real template.
  Refactor-safe because: The checks assert public-route behavior across rendered
  pages instead of specific component internals.

## Commit stack

- Commit 1: Introduce shared public-page foundation checks. Validation: focused
  e2e run.
- Commit 2: Apply checks to the homepage and the new real template. Validation:
  relevant route specs.

## Blocked by

- First real non-homepage public template.
