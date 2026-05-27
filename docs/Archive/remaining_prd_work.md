# Remaining PRD Work

Snapshot date: 2026-05-26

## Purpose

This document separates the already-settled homepage direction from the broader `draft_prd.md` scope. Use it to decide which major section deserves its own grill session and standalone PRD before implementation.

The homepage-specific PRD now lives in [homepage_prd.md](./homepage_prd.md). This file covers work from the original PRD that is either not implemented yet or only partially implemented in the current worktree.

## Confirmed Not Implemented

These items were checked against the current repository shape and should be treated as new implementation work.

### Homepage Implementation

- The current homepage still uses the existing `HomeHeroShowcase`, a small service-card set, and `LeadMagnetCta`.
- The full authority + triage homepage from [homepage_prd.md](./homepage_prd.md) is not implemented yet.
- The selected hero direction, **Variant F - Carousel sem setas**, has not been ported from the prototype worktree into this branch.
- The homepage-specific asset directories do not exist yet:
  - `src/assets/homepage/proof-logos/source/`
  - `src/assets/homepage/proof-logos/mono/`
  - `src/assets/homepage/platform/source/`
  - `src/assets/homepage/platform/`

### Cluster Detail Pages

The five full-depth cluster detail routes from the homepage triage cards are not implemented yet:

- `/servicos/projeto-e-obra/`
- `/servicos/regularizacao-rural/`
- `/servicos/regularizacao-urbana/`
- `/servicos/volumetria-e-medicao/`
- `/servicos/monitoramento-e-inteligencia-geografica/`

Each one needs its own content structure and should not ship as a shallow placeholder.

### Lead Magnet / Offers System

- A single static offer page exists, but there is no full offer collection or reusable offer-page system.
- There is no `/ofertas/` index route.
- There is no dynamic offer route driven by content.
- Lead-magnet submission and downstream tracking still need a dedicated plan.

### Interactive Matcher

- A separate `ServiceMatcher` or calculator component is not implemented.
- This is currently deferred for the homepage because the accepted homepage direction uses card-based matching.
- If implemented later, it should be planned as a separate conversion/engagement feature, not as a homepage prerequisite.

### AI Discovery / Machine-Readable Context

- `llms.txt` is not implemented.
- The PRD's broader AI-discovery and AEO ambitions need a separate PRD because they affect schema, crawl surfaces, content freshness, and machine-readable summaries across the site.

### Bulk City Creation

- The optional bulk city generation workflow is not implemented.
- There is no confirmed CSV/data pipeline for creating or enriching many city pages at once.

## Partial Or Needs Audit

These areas have some implementation already, but the current state should not be treated as PRD-complete.

### WhatsApp Attribution And CTA Tracking

- `WhatsAppCTA` exists and emits `whatsapp_click`.
- UTM and `gclid` capture exists, but first-touch preservation needs audit because current values appear to overwrite stored values.
- Homepage-specific fields still need completion: CTA location, selected cluster, desired deliverable/output type, and the lightly qualified message structure.

### Secondary Contact Tracking

- Some email and WhatsApp tracking exists in `ContactLinks`.
- `click_to_call` is not clearly wired into the shared header/footer experience.
- Header/footer contact behavior needs a dedicated audit before claiming full conversion tracking coverage.

### SEO / AEO Schema

- Baseline metadata and simple JSON-LD exist.
- The richer PRD targets are not complete: Organization graph depth, `FAQPage`, `ProfilePage`, `ImageObject`, `dateModified`, `speakable`, stronger `@id` linking, and page-specific graph composition.

### Service, City, And Service + City Pages

- The repository has content collections and dynamic routes for services, cities, and service+city pages.
- PRD parity still needs audit for BLUF quality, specs, local context, update markers, internal links, official-source links, proof assets, related cases, and conversion blocks.

### Proof System

- Current homepage proof is not the accepted two-group proof band.
- Logo normalization and usage rights are business-ready conceptually, but the site-ready asset pipeline and component are not implemented yet.

### Consent, GTM, And Privacy

- Consent and GTM components exist.
- Consent Mode v2 behavior, event payloads, and production GTM setup still need a focused audit before release.

### IndexNow

- The IndexNow script and tests exist.
- Key hosting, deployment integration, and operational use still need release-level verification.

### Performance Media Components

- Lite embed and lazy iframe components exist.
- The full image pipeline for homepage visuals, proof logos, platform screenshots, responsive formats, and LCP-sensitive hero assets is still open.

### Deployment And Release QA

- `DEPLOYMENT.md` remains the release reference.
- Deployment should stay last, after homepage, cluster pages, tracking, schema, and content parity are implemented and tested.

## Suggested Next Grill PRDs

Recommended order:

1. **Homepage implementation PRD**: already split into [homepage_prd.md](./homepage_prd.md); next step is implementation planning.
2. **Cluster detail pages PRD**: define the five full-depth `Ver detalhes` pages and shared page template.
3. **Conversion attribution and contact tracking PRD**: WhatsApp, call, email, CTA payloads, first-touch attribution, and GTM/GA4 events.
4. **SEO/AEO schema and AI discovery PRD**: structured data, freshness, `llms.txt`, AI extraction, and machine-readable page summaries.
5. **Lead magnet and offers PRD**: offer content model, form or low-friction capture path, and tracking.
6. **Service/city rollout PRD**: content quality rules for service, city, and service+city pages.
7. **Visual proof and asset system PRD**: normalized logos, case/proof assets, platform screenshots, and public-safe image handling.
8. **Deployment and release QA PRD**: Cloudflare Pages, env vars, robots/sitemap checks, link checks, PageSpeed, and GTM preview.

## Working Rule

Do not use the old monolithic `draft_prd.md` homepage section as implementation truth. Use [homepage_prd.md](./homepage_prd.md) for homepage work, and use this document to select the next non-homepage grill session.
