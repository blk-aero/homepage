---
title: Technical Performance - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Technical Performance

## Problem Statement

The site is static Astro and already avoids heavy framework runtime, but future
page expansion can still degrade performance through large images, excessive
client JavaScript, layout shift, stale dev-server verification, unbounded media,
or slow crawl/render paths.

Performance should be handled as its own technical quality track so it is not
buried inside schema, local SEO, lead capture, or content PRDs.

## Goal

Define a repeatable performance standard for BLK pages that keeps the site fast,
stable, crawlable, and easy to verify as new pages and assets are added.

## Implemented Baseline

- The current site is vanilla Astro + Tailwind + Flowbite.
- Homepage hero and platform visuals use Astro image handling for local assets.
- Playwright's default path builds the static site and verifies the built
  preview, not a stale dev server.
- The current layout uses a safer full-bleed structure to avoid horizontal
  overflow from `w-screen` inside centered containers.
- The homepage intentionally avoids prototype-only markers and heavy interactive
  surfaces.

## Scope

- Define performance budgets for major page templates:
  - Homepage.
  - Cluster Detail Pages.
  - Searchable Coverage Index.
  - Local Service + City Pages.
  - Lead Capture Offers.
- Standardize local image policy:
  - Prefer Astro image optimization for local bitmap assets.
  - Preserve meaningful `alt`, `loading`, `decoding`, dimensions, and art
    direction.
  - Avoid unbounded original-size media in rendered pages.
  - Lazy-load non-critical imagery.
- Keep JavaScript small and purposeful:
  - Use vanilla scripts for simple UI behavior.
  - Keep Flowbite ESM imports targeted to the components in use.
  - Avoid React/Svelte or heavy runtime integrations unless explicitly approved.
  - Avoid third-party embeds until a real user-facing surface requires them.
- Protect layout stability:
  - Reserve stable dimensions for hero media, cards, skeletons, forms, maps, and
    repeated grids.
  - Prevent horizontal overflow on mobile and desktop.
  - Avoid late-loading elements that push the primary CTA or page headings.
- Protect crawl/render efficiency:
  - Keep primary content server-rendered.
  - Do not make page meaning depend on client-side JavaScript.
  - Keep metadata, headings, links, and body content available in built HTML.
- Add verification guidance for performance-sensitive changes.

## Performance Targets

Use these as lab targets for representative pages. If a target is not met, the
implementation should either improve the page or document the trade-off in the
PR.

- Lighthouse Performance: 90 or higher on mobile for key public pages.
- Largest Contentful Paint: 2.5s or less on a throttled mobile profile.
- Cumulative Layout Shift: 0.1 or less.
- Interaction to Next Paint: 200ms or less for interactive pages.
- No horizontal overflow at common mobile and desktop widths.
- No page-level dependency on client JavaScript for reading the primary content.

## Out of Scope

- JSON-LD, `/llms.txt`, and entity schema work; those belong to
  `docs/trust-schema-ai-discovery-prd.md`.
- Local SEO route generation, sitemap rules, and doorway-page gates; those belong
  to `docs/local-service-city-pages-prd.md`.
- IndexNow, freshness cadence, and backlink operations; those belong to
  `docs/marketing-attribution-ops-prd.md`.
- Proof logo sourcing and approval; that belongs to
  `docs/proof-logo-assets-prd.md`.
- Rebuilding the current homepage purely for a performance rewrite without a
  measured problem.

## Acceptance Criteria

- Performance-sensitive PRs state which page template they affect and which
  checks were run.
- Image-heavy pages use optimized local assets or document why an exception is
  needed.
- New interactive behavior does not introduce a frontend framework runtime for a
  simple UI task.
- Built HTML contains primary headings, body copy, links, and metadata without
  waiting for client JavaScript.
- Representative pages pass a no-horizontal-overflow check on mobile and
  desktop.
- `npm run build` passes before performance work is considered complete.

## Verification Guidance

Minimum checks for performance-sensitive changes:

- `git diff --check`
- `npm run build`
- Relevant Playwright route or behavior specs against built preview output.
- Browser or Playwright inspection for horizontal overflow on at least one mobile
  and one desktop viewport.
- Lighthouse or equivalent lab check when changing hero media, large images,
  third-party scripts, embeds, or page-level layout primitives.
