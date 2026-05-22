# Testing and Verification

## Core Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`
- `npm run test:e2e`
- `npm run check:links`

## Local Server Behavior

- Playwright auto-starts `npm run dev -- --host 127.0.0.1 --port 4321` from `playwright.config.ts`.
- `npm run check:links` expects a local site at `http://127.0.0.1:4321`.

## Targeted Test Matrix

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
  - Run relevant e2e specs, especially:
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

## Completion Report

Before closing a task, report:

- Commands executed.
- Pass/fail outcome for each command.
- Any unverified area, with reason and remaining risk.
