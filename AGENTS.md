# AGENTS

## Purpose and Scope

This file defines how AI coding agents should operate in this repository.

Scope is technical execution only: implementation workflow, verification standards, testing expectations, and deployment/release checks.

## Repository Map

- `src/pages`: Astro routes and dynamic route handlers.
- `src/content`: content collections for services, cities, blog, and cases.
- `src/lib`: shared logic (`consent`, `datalayer`, `routes`, `schema`, `rollout`, `whatsapp`, `contact`).
- `src/components`, `src/layouts`, `src/styles`: UI composition and styling.
- `tests/config`: script and repo-config assertions.
- `tests/content`: content inventory and structure checks.
- `tests/lib`: unit tests for shared logic.
- `tests/e2e`: Playwright end-to-end checks for routing, conversion flow, accessibility, embeds, and navigation.
- `docs/runbooks`: operational procedures, including rollout QA.
- `DEPLOYMENT.md`: Cloudflare Pages deployment requirements and post-deploy checks.

## Required Workflow

1. Identify impacted files and nearby tests before editing.
2. Keep edits scoped to the requested change.
3. Run targeted verification for touched areas.
4. Run broader verification when changes span multiple areas or affect release behavior.
5. Report exact commands run and results before declaring completion.

## Hard Requirements

- Do not claim success without running relevant verification commands.
- Prefer targeted tests first, then broader suites as needed.
- Do not edit generated artifacts (`dist`, `.astro`) unless explicitly requested.
- Do not perform unrelated refactors while addressing the requested task.

## Default Operating Conventions

- Use `rg` and `rg --files` for fast discovery.
- For page/content changes, verify route rendering and CTA presence.
- For schema/SEO changes, verify metadata outputs and crawl artifacts (`/robots.txt`, sitemap).
- For rollout or market-expansion content changes, follow `docs/runbooks/weekly-rollout-qa.md`.

## Core Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`
- `npm run test:e2e`
- `npm run check:links` (expects local server at `http://127.0.0.1:4321`)

## Testing Matrix

- `src/lib/*` changes:
  - Run related unit tests under `tests/lib/*`.
  - Run `npm run test`.
- `scripts/indexnow.mjs` changes:
  - Run `npm run test -- tests/lib/indexnow.test.ts`.
- `package.json` script changes:
  - Run `npm run test -- tests/config/package-scripts.test.ts`.
- `src/content/config.ts` or content inventory changes:
  - Run `npm run test -- tests/content/phase1-content-files.test.ts`.
- Route/content changes (`src/pages`, `src/content`):
  - Run `npm run test:e2e -- tests/e2e/routing.spec.ts`.
  - Run additional relevant e2e specs for touched behavior.
  - Run `npm run build`.
- CTA/navigation/hero behavior changes:
  - Run relevant e2e specs, especially conversion and navigation coverage:
    - `tests/e2e/conversion-flow.spec.ts`
    - `tests/e2e/navigation-whatsapp.spec.ts`
    - `tests/e2e/home-hero-showcase.spec.ts`
- Lead magnet/trust/about parity changes:
  - Run `npm run test:e2e -- tests/e2e/prd-parity.spec.ts`.
- Embed/lazy-media changes:
  - Run `npm run test:e2e -- tests/e2e/lite-embed.spec.ts`.
- Footer contact/social changes:
  - Run `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.
- Accessibility-sensitive UI changes:
  - Run `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`.
- Release-sensitive changes:
  - Run `npm run build`.
  - Run `npm run test`.
  - Run relevant `npm run test:e2e` scopes.
  - Run `npm run check:links` with preview/dev server running.

## Deployment and Release Checks

Cloudflare Pages baseline from `DEPLOYMENT.md`:
- Build command: `npm run build`
- Output directory: `dist`

Environment variables:
- Required: `SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`
- Optional: `PUBLIC_GTM_ID`, `INDEXNOW_KEY`

Post-deploy checks:
1. Open `/robots.txt` and confirm sitemap URL is present.
2. Open `/sitemap-index.xml` and confirm expected pages are listed.
3. Validate key routes (`/`, `/servicos/*`, `/cidades/*`, `/sobre`).
4. Run GTM preview checks when `PUBLIC_GTM_ID` is enabled.
5. Run PageSpeed checks for primary landing pages on mobile and desktop.

Weekly rollout QA expectations from `docs/runbooks/weekly-rollout-qa.md`:
- Confirm non-placeholder content quality for new cities/services.
- Verify local neighborhoods/FAQ and service BLUF/specs/CTA/trust blocks.
- Execute: `npm run build`, `npm run test`, targeted routing e2e, and link checks.

## Completion Checklist

Before closing a task, report:
- Commands executed.
- Pass/fail outcome for each command.
- Any unverified area, with reason and remaining risk.
