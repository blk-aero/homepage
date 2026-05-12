# Testing and Verification

## Core Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`
- `npm run test:e2e`
- `npm run check:links`

Playwright starts the dev server automatically from `playwright.config.ts` with:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

`npm run check:links` expects a running local site at `http://127.0.0.1:4321`.

## Verification Matrix

- Docs-only changes: run `git diff --check`.
- `src/lib/*` changes: run related unit tests under `tests/lib/*`, then `npm run test`.
- `src/lib/attribution.ts`: run `npm run test -- tests/lib/attribution.test.ts`.
- `scripts/indexnow.mjs`: run `npm run test -- tests/lib/indexnow.test.ts`.
- `package.json` script changes: run `npm run test -- tests/config/package-scripts.test.ts`.
- `src/content/config.ts` or content inventory changes: run `npm run test -- tests/content/phase1-content-files.test.ts`.
- `src/content/site/global.yaml` or `src/lib/site-config.ts`: run `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.
- Route/content changes in `src/pages` or `src/content`: run `npm run test:e2e -- tests/e2e/routing.spec.ts`, relevant behavior specs, and `npm run build`.
- CTA/navigation/hero behavior changes: run relevant e2e specs, especially `tests/e2e/conversion-flow.spec.ts`, `tests/e2e/navigation-whatsapp.spec.ts`, and `tests/e2e/home-hero-showcase.spec.ts`.
- Lead magnet/trust/about parity changes: run `npm run test:e2e -- tests/e2e/prd-parity.spec.ts`.
- Embed/lazy-media changes: run `npm run test:e2e -- tests/e2e/lite-embed.spec.ts`.
- Footer contact/social changes: run `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.
- Accessibility-sensitive UI changes: run `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`.
- Release-sensitive changes: run `npm run build`, `npm run test`, relevant e2e scopes, and `npm run check:links` with a preview or dev server running.
