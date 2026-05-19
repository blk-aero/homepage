# QA Checklist

Date: 2026-05-19

This checklist verifies the PRD items that are currently considered implemented. Use it as a release smoke test before expanding the remaining PRD work.

## Baseline Setup

Run from the repository root:

```bash
cd /Users/lupion/Documents/homepage
npm ci
```

Pass criteria:

- Dependencies install without errors.
- `node_modules` is present locally.

## Astro, Layout, and Flowbite Baseline

Run:

```bash
npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/home-hero-showcase.spec.ts
npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/navigation-whatsapp.spec.ts
npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/prd-parity.spec.ts
```

Pass criteria:

- Homepage hero renders with the expected media and brand strip.
- Mobile navigation opens and reveals links.
- Primary UI parity blocks render on service and `/sobre` pages.

## Rollout Control and Dynamic Routes

Run:

```bash
npm run test -- /Users/lupion/Documents/homepage/tests/lib/rollout.test.ts
npm run test -- /Users/lupion/Documents/homepage/tests/lib/routes.test.ts
npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/routing.spec.ts
```

Pass criteria:

- Active service routes return `200`.
- Active city routes return `200`.
- Inactive routes return `404`.
- Service+city pair generation respects `data/rollout-control.json`.

## WhatsApp Attribution and Conversion Event

Run:

```bash
npm run test -- /Users/lupion/Documents/homepage/tests/lib/attribution.test.ts
npm run test -- /Users/lupion/Documents/homepage/tests/lib/whatsapp.test.ts
npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/conversion-flow.spec.ts
```

Manual browser check:

1. Start the dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

2. Open:

```text
http://127.0.0.1:4321/servicos/georreferenciamento-de-imovel-rural/jacarei-sp?utm_source=google&utm_medium=cpc&utm_campaign=qa&gclid=qa123
```

3. Navigate to another internal page without query parameters.
4. Click the WhatsApp CTA.
5. In DevTools console, inspect:

```js
window.dataLayer.filter((event) => event.event === "whatsapp_click").at(-1)
```

Pass criteria:

- The `wa.me` URL contains the service, city, and attribution values.
- Attribution survives internal navigation.
- The `whatsapp_click` event contains `service`, `city`, `page_path`, and available `utm_*`/`gclid` fields.

## Robots, Sitemap, IndexNow, and Deployment Artifacts

Run:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
```

Then open:

- `http://127.0.0.1:4321/robots.txt`
- `http://127.0.0.1:4321/sitemap-index.xml`

Also inspect:

- `/Users/lupion/Documents/homepage/DEPLOYMENT.md`
- `/Users/lupion/Documents/homepage/scripts/indexnow.mjs`
- `/Users/lupion/Documents/homepage/tests/lib/indexnow.test.ts`

Pass criteria:

- Build exits with status `0`.
- `robots.txt` returns `200`.
- `robots.txt` references the sitemap.
- `sitemap-index.xml` returns `200`.
- Deployment docs list build command, output directory, and relevant environment variables.
- IndexNow payload test passes.

## Full Regression Gate

Run:

```bash
npm run test
npm run test:e2e
npm run build
```

Then, with preview running in another terminal:

```bash
npm run check:links
```

Pass criteria:

- `npm run test` exits with status `0`.
- `npm run test:e2e` exits with status `0`.
- `npm run build` exits with status `0`.
- `npm run check:links` exits with status `0`.

## QA Evidence to Capture

Record these in the release notes or PR comment:

- Current commit: `git rev-parse --short HEAD`
- Exact command names and pass/fail result.
- Any failing test names and error snippets.
- Screenshot of one service+city page.
- Screenshot or copied text from `/robots.txt`.
- One copied `whatsapp_click` payload from DevTools.
