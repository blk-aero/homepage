---
title: First-Touch Attribution Cookie Fallback & Hydration
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Implement a first-party cookie fallback (`blk_cookie_attribution_v1`) with a rolling 7-day TTL to preserve first-touch campaign parameters (UTM parameters and GCLID) across sessions and browser closures.

- On page load, if sessionStorage is empty, the client script will check the cookie. If found, it hydrates sessionStorage.
- If current URL query parameters exist, they are parsed and merged. The first-touch parameters take precedence.
- The final merged attribution values are saved to sessionStorage and written to `blk_cookie_attribution_v1` (refreshing the expiration to 7 days whenever attribution is refreshed).

## Acceptance criteria

- [ ] A rolling 7-day first-party cookie named `blk_cookie_attribution_v1` is successfully set.
- [ ] Stored campaign parameters (UTM and GCLID) are read from the cookie to hydrate `sessionStorage` if it is empty.
- [ ] Stored parameters are not overwritten by new URL query parameters (adhering to first-touch rules).
- [ ] Safe fallback handles browser environments where cookies are blocked.

## Test intent

- Behavior: First-touch query parameters must survive sessionStorage clearing if the rolling 7-day cookie exists, must not be overwritten by new parameters, and must refresh the cookie expiry when attribution is refreshed.
  Public interface: Browser client-side sessionStorage and document.cookie.
  Why this matters: Ensures return ad clicks are attributed correctly to their original campaign.
  Evidence: Playwright coverage in `tests/e2e/conversion-flow.spec.ts` validates cookie-based hydration, browser cookie expiry near seven days, and rolling expiry refresh.
  Refactor-safe because: Tests the observable storage and merge outcomes rather than the specific cookie parse algorithm.

## Commit stack

- Commit 1: Add getCookie/setCookie helper functions and merge logic. Validation: unit tests pass.
- Commit 2: Integrate cookie fallback in layout tracking scripts. Validation: integration tests pass.

## Blocked by

- None - can start immediately
