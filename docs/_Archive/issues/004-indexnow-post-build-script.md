---
title: Opt-in IndexNow Post-Build Script
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

Implement a lightweight post-build script (`scripts/indexnow.mjs`) that reads the generated sitemaps (`dist/sitemap-index.xml` and `dist/sitemap-0.xml`) and submits URLs to the IndexNow API. The script must be opt-in, environment-gated by `INDEXNOW_KEY`, and exit safely with status `0` without making external calls if the key is missing.

Also, remove `"scripts/indexnow.mjs"` from the guard rail banned list in `tests/config/current-surface.test.ts`.

## Acceptance criteria

- [ ] `scripts/indexnow.mjs` exists and is allowed by current-surface tests.
- [ ] Script reads unique page URLs from sitemaps under the build output directory `dist`.
- [ ] If `INDEXNOW_KEY` is present, it POSTs the URLs to `https://api.indexnow.org/IndexNow` using the standard payload template.
- [ ] If `INDEXNOW_KEY` is missing, it skips execution and exits with status 0.
- [ ] `"postbuild": "node scripts/indexnow.mjs"` is added to `package.json`.

## Test intent

- Behavior: The post-build script runs safely on every build, submitting sitemap URLs only when the API key is active.
  Public interface: Node script run command and `package.json` hooks.
  Why this matters: Ensures real-time page submission for Bing/Yandex index freshness without breaking local or PR build pipelines.
  Evidence: A Vitest test suite `tests/scripts/indexnow.test.ts` mocks sitemaps and fetch requests to verify key gate-keeping and payload formatting.
  Refactor-safe because: Tests sitemap file parsing outcomes and environment key logic via mocks, ignoring internal API client styling.

## Commit stack

- Commit 1: Update current-surface tests and implement IndexNow crawler and submission. Validation: unit tests pass.
- Commit 2: Add postbuild hook in package.json. Validation: run npm build and check logs.

## Blocked by

- None - can start immediately
