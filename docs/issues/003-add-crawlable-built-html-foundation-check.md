---
title: Add crawlable built-HTML foundation check
labels:
  - ready-for-agent
---

# Add crawlable built-HTML foundation check

## What to build

Add a foundation check that proves the homepage's primary content is present in
built output before client-side JavaScript runs. The check should cover primary
headings, meaningful body copy, links, metadata, and primary CTA content using
the highest practical seam: built Astro output served through preview or
inspected as static HTML.

## Acceptance criteria

- [ ] Built output exposes primary homepage headings and body copy without
      relying on client-side JavaScript.
- [ ] Built output exposes primary links and CTA destinations needed for
      crawling and first-contact paths.
- [ ] Built output exposes page metadata needed for basic crawl/render
      performance.
- [ ] The check is documented as prior art for future public page templates.

## Test intent

- Behavior: Primary content, links, metadata, and primary CTA content exist in
  built output without waiting for client JavaScript.
  Public interface: Built preview or static HTML output.
  Why this matters: The Performance Foundation includes crawl/render efficiency;
  search crawlers and users should receive meaningful page content from the
  server-rendered HTML.
  Evidence: `npm run build` and a Playwright or static HTML inspection against
  built output.
  Refactor-safe because: The check asserts user/crawler-visible content rather
  than component structure.

## Commit stack

- Commit 1: Add a built-output crawlability test for the homepage. Validation:
  focused test run.
- Commit 2: Document the check as prior art for future public templates.
  Validation: `git diff --check`.

## Blocked by

None - can start immediately.
