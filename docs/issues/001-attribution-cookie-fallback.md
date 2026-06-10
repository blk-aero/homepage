---
title: First-Touch Attribution Cookie Fallback & Hydration
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Implement a first-party cookie fallback (`blk_cookie_attribution_v1`) with a 7-day TTL to preserve first-touch campaign parameters (UTM parameters and GCLID) across sessions and browser closures. 

- On page load, if sessionStorage is empty, the client script will check the cookie. If found, it hydrates sessionStorage.
- If current URL query parameters exist, they are parsed and merged. The first-touch parameters take precedence.
- The final merged attribution values are saved to sessionStorage and written to `blk_cookie_attribution_v1` (with a 7-day expiration).

## Acceptance criteria

- [ ] A 7-day first-party cookie named `blk_cookie_attribution_v1` is successfully set.
- [ ] Stored campaign parameters (UTM and GCLID) are read from the cookie to hydrate `sessionStorage` if it is empty.
- [ ] Stored parameters are not overwritten by new URL query parameters (adhering to first-touch rules).
- [ ] Safe fallback handles browser environments where cookies are blocked.

## Test intent

- Behavior: First-touch query parameters must survive sessionStorage clearing if the 7-day cookie exists, and must not be overwritten by new parameters.
  Public interface: Browser client-side sessionStorage and document.cookie.
  Why this matters: Ensures return ad clicks are attributed correctly to their original campaign.
  Evidence: A Vitest test suite `tests/lib/attribution-cookie.test.ts` validates parsing, merging, and cookie-based hydration.
  Refactor-safe because: Tests the observable storage and merge outcomes rather than the specific cookie parse algorithm.

## Commit stack

- Commit 1: Add getCookie/setCookie helper functions and merge logic. Validation: unit tests pass.
- Commit 2: Integrate cookie fallback in layout tracking scripts. Validation: integration tests pass.

## Blocked by

- None - can start immediately
