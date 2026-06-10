---
title: Register Website and Submit Sitemap to Google Search Console
labels:
  - ready-for-agent
---

## Parent

- [docs/marketing-attribution-operations.md](file:///Users/lupion/Documents/homepage/docs/marketing-attribution-operations.md)

## What to build

This is a **Human-in-the-Loop (HITL)** setup task.
- Log in to the Google Search Console (GSC) dashboard.
- Verify ownership of your site domain `https://blk.aero` (using DNS TXT record or HTML file upload).
- Submit the live sitemap URL: `https://blk.aero/sitemap-index.xml` in the Sitemaps tab.

## Acceptance criteria

- [ ] Domain ownership is verified in Google Search Console.
- [ ] Sitemap is submitted and shows a "Success" status under the GSC sitemaps table.

## Test intent

- Behavior: Google Search Console acknowledges the sitemap and schedules the site URLs for indexing.
  Public interface: Google Search Console admin dashboard.
  Why this matters: Ensures Google discovers and indexes all city and service pages for organic search visibility.
  Evidence: Confirm GSC reports sitemap status as "Success" and lists sitemaps crawled.
  Refactor-safe because: Tests integration between Google's crawler and the site's XML output, independent of how routes are built.

## Blocked by

- Deployment of sitemap files to production.
