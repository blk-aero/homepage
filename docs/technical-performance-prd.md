---
title: Technical Performance - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Technical Performance

## Problem Statement

BLK Aero is expanding from an Authority + Triage Homepage into a broader set of
public pages. The current site already has a strong static Astro baseline, but
future page work can still erode performance through oversized media, casual
third-party scripts, layout shift, stale local verification, client-rendered
primary content, weak cache behavior, or template-specific exceptions that are
not captured anywhere reusable.

The user does not want a one-off homepage cleanup or PageSpeed score chase. The
need is a Performance Foundation: a reusable site-quality standard that future
BLK public pages inherit so new routes stay fast, stable, crawlable, and easy to
verify.

## Solution

Create and enforce a Performance Foundation for BLK public pages. The foundation
should live in repo defaults, reusable page patterns, tests, and release checks,
not only in planning prose.

The first implementation proof is the homepage mobile LCP image. The current
homepage hero image identified by PageSpeed as mobile LCP should be eager and
high fetch priority, while non-critical carousel images should remain lazy and
non-priority. The next current-page image pass should right-size the rendered
homepage hero and proof/logo images PageSpeed flags as larger than their
displayed dimensions, while preserving meaningful `alt` text and stable layout.
These fixes should stay narrow, measurable, and aligned with the PageSpeed
evidence.

Future pages should inherit the same foundation through component and layout
defaults first, regression tests second, and deployment verification third. This
keeps performance work close to the surfaces future agents will actually reuse:
page templates, image handling, layout primitives, JavaScript boundaries,
crawlable built HTML, and release checks.

The foundation should preserve the current vanilla Astro, Tailwind, and Flowbite
approach. It should not introduce a frontend framework runtime, a heavy Vite
plugin, a broad hero rewrite, or a separate image abstraction until repeated
template patterns justify it.

## User Stories

1. As the site owner, I want future BLK public pages to inherit performance
   rules from the repo, so that every new route does not restart performance
   decisions from scratch.
2. As the site owner, I want performance decisions documented in code and tests,
   so that the PRD is not the only place where the standard exists.
3. As a mobile visitor, I want the first homepage hero image to load with the
   correct priority, so that the first meaningful visual appears quickly.
4. As a mobile visitor, I want non-critical carousel images to avoid competing
   with the first hero image, so that the page does not waste early bandwidth.
5. As a mobile visitor, I want pages to avoid horizontal overflow, so that I can
   read and navigate without broken layout.
6. As a buyer comparing BLK services, I want page headings, copy, links, and
   metadata to exist in the built HTML, so that the page is readable even before
   optional client behavior runs.
7. As a buyer on a slow connection, I want large images to be intentionally sized
   for their rendered slots, so that pages do not download unnecessary pixels.
8. As a buyer using assistive technology, I want image performance work to
   preserve meaningful alternative text, so that optimization does not remove
   context.
9. As a mobile visitor, I want current homepage hero and proof/logo images to be
   right-sized for their displayed dimensions, so that the existing homepage
   spends less bandwidth on unused pixels.
10. As a reviewer, I want logo and proof image sizing changes to preserve layout
    stability, so that image delivery improvements do not create CLS regressions.
11. As a future implementation agent, I want direct Astro image handling to remain
   the default, so that I do not invent a wrapper before repeated template needs
   exist.
12. As a future implementation agent, I want a clear rule for hero/LCP images, so
    that only the critical image receives high priority.
13. As a future implementation agent, I want non-critical images to lazy-load by
    default, so that secondary content does not slow down the first viewport.
14. As a future implementation agent, I want stable dimensions for hero media,
    cards, forms, grids, maps, and skeletons, so that visual elements do not push
    content around after load.
15. As a future implementation agent, I want JavaScript to stay small and
    purposeful, so that simple UI behavior does not become a framework runtime.
16. As a future implementation agent, I want Flowbite usage to stay targeted, so
    that the site keeps using installed ESM/CSS integration instead of CDN or
    broad runtime loading.
17. As a future implementation agent, I want new third-party scripts to require
    a named business purpose, so that trackers, maps, embeds, chat widgets, and
    videos are not added casually.
18. As a future implementation agent, I want third-party exceptions to be lazy or
    deferred where practical, so that page templates remain fast when a business
    need exists.
19. As a future implementation agent, I want Lato preserved through self-hosted
    local font assets, so that performance work removes the runtime Google Fonts
    chain without changing the site's identity.
20. As a future implementation agent, I want font self-hosting implemented as a
    focused pass, so that file selection, loading strategy, and visual checks are
    handled together.
21. As a future implementation agent, I want measured lab gates instead of early
    byte-level budgets, so that templates are judged against real content rather
    than invented ceilings.
22. As a reviewer, I want performance-sensitive PRs to state the affected page
    template and checks run, so that review can focus on the actual risk.
23. As a reviewer, I want cache policy verified against the live site after
    deployment, so that content-hashed assets and HTML freshness are checked in
    the place where headers actually exist.
24. As a reviewer, I want page-specific tests to remain the enforcement surface
    while the homepage is the only real public template, so that tests do not
    overfit temporary support pages.
25. As a reviewer, I want shared Playwright foundation checks added when the next
    real page template ships, so that common performance expectations become
    reusable once there is more than one real template.
26. As a search crawler, I want primary content, metadata, headings, and links in
    the built HTML, so that crawling does not depend on client-side JavaScript.
27. As the site owner, I want SEO and LLM indexing enrichment kept outside this
    PRD except for crawl/render overlap, so that performance does not become a
    catch-all backlog.
28. As the site owner, I want the Performance Foundation to support future
    Cluster Detail Pages, Searchable Coverage Index, Local Service + City Pages,
    and Lead Capture Offers, so that new growth surfaces do not weaken the base
    site.

## Implementation Decisions

- Use **Performance Foundation** as the canonical term for this work. It means a
  reusable site-quality standard that future BLK public pages inherit. It does
  not mean a one-off homepage cleanup, score chasing, or isolated PageSpeed
  patch.
- Enforce the foundation through component and layout defaults first, tests
  second, and deployment verification third.
- Keep the site vanilla Astro, Tailwind, and Flowbite. Do not add React, Svelte,
  adapters, CDN Flowbite scripts, heavy Vite plugins, or other framework runtime
  dependencies for simple marketing-page behavior.
- Treat the current homepage LCP image fix as the first code-backed foundation
  proof. The first homepage hero image should be eager and high fetch priority
  because PageSpeed identified it as the mobile LCP image. Later carousel images
  should remain lazy and non-priority.
- Keep direct Astro image handling as the default for local bitmap assets. Do
  not add a shared image wrapper until multiple real page templates repeat the
  same sizing, priority, or art-direction rules.
- New local bitmap assets should be routed through Astro image handling where
  practical. Exceptions must be deliberate and explained in the affected PR.
- Hero and LCP images must be intentionally sized for their rendered slots.
  Non-critical imagery should lazy-load and keep asynchronous decoding.
- The current homepage image-delivery pass should right-size the hero image and
  proof/logo images that PageSpeed reports as larger than their displayed
  dimensions. This is a current-surface performance slice, separate from future
  page-template image policy.
- Image optimization must preserve meaningful alternative text and stable
  rendered dimensions. Performance work must not turn proof, service, or
  deliverable imagery into decorative noise unless the image is actually
  decorative.
- Layout primitives must reserve stable dimensions for hero media, cards, forms,
  skeletons, maps, repeated grids, and other fixed-format areas.
- Public pages must avoid horizontal overflow at common mobile and desktop
  widths.
- Primary page meaning must be available in built HTML. Headings, body copy,
  links, metadata, and primary calls to action must not depend on client-side
  JavaScript.
- JavaScript must remain small and purposeful. Use vanilla scripts for simple UI
  behavior and targeted Flowbite ESM imports for the components actually in use.
- Do not add new third-party scripts, trackers, maps, chat widgets, video
  embeds, or similar runtime dependencies without a named business purpose.
  Where possible, third-party behavior should be lazy-loaded or deferred and
  verified on the affected page template.
- Preserve Lato as the current visual baseline and implement self-hosted local
  Lato assets to replace the runtime Google Fonts request chain.
- Do not switch to a system font stack as a silent performance shortcut because
  it changes the site's visual identity. Font self-hosting should choose the
  needed files deliberately, define the loading strategy, and include visual
  regression checks in the same implementation slice.
- Treat content-hashed Astro assets as deployment cache candidates for a long
  immutable policy. HTML should stay short-lived so copy and metadata changes can
  roll out predictably.
- Treat cache headers as a deployment requirement verified against the live site
  unless the hosting layer exposes a repo-managed configuration surface. Do not
  invent repo configuration for headers until the actual hosting layer can
  consume it.
- Use measured lab gates for representative pages. Current gates are mobile
  Lighthouse Performance at or above 90, LCP at or below 2.5 seconds on a
  throttled mobile profile, CLS at or below 0.1, INP at or below 200
  milliseconds for interactive pages, no horizontal overflow, and no dependency
  on client JavaScript for primary content.
- Defer hard byte-level ceilings for JavaScript, images, and total page weight
  until the real future templates have representative content. The future
  templates include Cluster Detail Pages, Searchable Coverage Index, Local
  Service + City Pages, and Lead Capture Offers.
- Keep current performance enforcement in page-specific specs while the homepage
  is the only real public template. Add shared Playwright foundation checks when
  the next real template ships.
- Do not create an ADR for the current enforcement-order decision. The PRD and
  agent guidance are the right weight. Consider an ADR only if a later decision
  becomes hard to reverse, surprising without context, and based on a real
  trade-off, such as infrastructure changes for immutable headers.

## Testing Decisions

- Good tests should prove externally visible behavior in built or rendered
  output. They should avoid asserting internal implementation details unless the
  behavior cannot be observed at a higher seam.
- The highest-value seam is the built Astro site served through preview and
  inspected by Playwright. This matches how public pages are actually consumed
  and avoids stale dev-server verification.
- The homepage hero behavior should be covered by the existing homepage
  Playwright spec family. The test should prove that the first hero image is
  eager and high fetch priority, while later carousel images remain lazy and
  non-priority.
- Current homepage image-delivery improvements should be verified through built
  preview behavior and a lab check that specifically inspects the hero image and
  proof/logo images PageSpeed reported as oversized for their displayed
  dimensions.
- The homepage layout should continue to use the existing horizontal-overflow
  Playwright check as prior art for future public-page layout stability checks.
- Future real page templates should receive shared Playwright foundation checks
  once more than one real template exists. Those shared checks should cover no
  horizontal overflow, crawlable primary content, applicable hero/LCP image
  priority, and accidental runtime expansion.
- Built HTML should be inspected when a change affects crawl/render behavior.
  The behavior under test is that primary headings, body copy, links, metadata,
  and primary calls to action exist without waiting for client JavaScript.
- JavaScript/runtime changes should be tested at the page behavior seam first.
  A good test proves that the intended UI still works without introducing a
  broader runtime dependency for simple behavior.
- Image-heavy template changes should run a lab check such as Lighthouse or an
  equivalent browser performance inspection. This is required when changing hero
  media, large images, third-party scripts, embeds, or page-level layout
  primitives.
- Cache-header behavior should be verified after deployment with live header
  checks for at least one HTML page and one content-hashed Astro asset when cache
  policy is part of the change. Local build output alone does not prove live
  cache behavior.
- Performance-sensitive PRs should report the affected page template and exact
  checks run. If a measured target is missed, the PR should either improve the
  page or explain the trade-off explicitly.
- Docs-only changes should at minimum pass whitespace/diff validation. Code or
  template changes should also run the relevant build and Playwright specs for
  the affected route behavior.

## Out of Scope

- JSON-LD, entity schema, FAQ schema, `/llms.txt`, Open Graph image enrichment,
  Twitter card enrichment, and other SEO/LLM discovery features are outside this
  PRD unless they affect crawl/render performance.
- Local SEO route generation, sitemap strategy, city/service doorway gates, and
  localized content rollout rules are outside this PRD.
- IndexNow, freshness cadence, backlinks, campaign attribution operations, and
  marketing operations are outside this PRD.
- Proof logo sourcing, proof approval, and credibility asset collection are
  outside this PRD.
- Accessibility repairs such as carousel ARIA semantics, carousel dot touch
  targets, and identical WhatsApp link descriptions are outside this PRD unless
  a performance slice directly changes those same controls.
- Best Practices repairs such as the live `denied is not defined` console error
  are outside this PRD unless they are handled inside the third-party/runtime
  guardrail slice.
- Security and platform hardening such as CSP, HSTS, COOP, clickjacking
  protection, and Trusted Types are outside this PRD.
- A broad homepage rebuild is outside this PRD unless a measured performance
  problem justifies it.
- A shared image wrapper is outside the first pass. It should be reconsidered
  only after repeated real template patterns make the abstraction pay for itself.
- Switching away from Lato to a system font stack is outside this PRD.
- Removing existing operational or analytics scripts is outside this PRD unless
  measurement shows they are harming the affected page or they no longer have a
  business purpose.
- Hard byte-level budgets for JavaScript, images, and total page weight are
  outside this PRD until representative future templates exist.

## Further Notes

- The current homepage already demonstrates several foundation decisions:
  static Astro rendering, direct Astro image handling for key local assets,
  targeted Flowbite usage, built-preview Playwright verification, and horizontal
  overflow protection.
- The first homepage hero image priority fix has already been implemented and
  covered by a Playwright regression test.
- Current PageSpeed evidence is mobile-first: desktop is effectively healthy,
  while the meaningful loading improvements are mobile LCP, current homepage
  image delivery, font request removal, render-blocking request reduction, and
  cache behavior.
- The PageSpeed double-check also surfaced accessibility, console-error, and
  security-header findings. Those should be tracked separately from this
  Performance Foundation PRD except where a performance issue touches the same
  runtime surface.
- The Performance Foundation should not absorb every adjacent technical concern.
  SEO and LLM indexing work should remain in the discovery/SEO backlog except
  where it overlaps with crawlable built HTML and render performance.
- The next implementation sequence should start with foundation items that can
  be implemented and reviewed locally: self-hosted Lato, current homepage image
  delivery, crawlable built-HTML checks, third-party runtime guardrails, shared
  checks when the next real template ships, and performance-sensitive PR
  reporting. Production header verification should run after local validation,
  code review, and deployment.
