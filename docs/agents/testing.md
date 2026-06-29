# Testing and Verification

## Core Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`
- `npm run test:built`
- `npm run test:e2e`
- `npm run check:links`

Playwright builds the static site and starts the preview server automatically from `playwright.config.ts` with:

```bash
npm run build && npm run preview -- --host 127.0.0.1 --port 4321
```

`npm run check:links` expects a running local site at `http://127.0.0.1:4321`.

Set `PLAYWRIGHT_REUSE_SERVER=1` only when intentionally running Playwright against an already-started local server. By default, Playwright builds and previews the current checkout to avoid stale dev-server output.

`npm run build` also runs `postbuild` (`node scripts/indexnow.mjs`). The IndexNow hook is opt-in: with no `INDEXNOW_KEY`, it should print a skip message, make no external request, and exit 0. Changes to that workflow should run `npm run test -- tests/scripts/indexnow.test.ts`.

`npm run test` excludes the `dist`-reading built-output specs so the default unit/config suite does not depend on local build state. Use `npm run test:built` for crawlable HTML, public runtime, and deployment release checks that must build first.

## Verification Matrix

- Docs-only changes: run `git diff --check`.
- `src/lib/*` changes: run related unit tests under `tests/lib/*`, then `npm run test`.
- `src/lib/attribution.ts`: run `npm run test -- tests/lib/attribution.test.ts`.
- `package.json` script changes: run `npm run test -- tests/config/package-scripts.test.ts`.
- `scripts/indexnow.mjs` or IndexNow build-hook changes: run `npm run test -- tests/scripts/indexnow.test.ts`, then `npm run build`.
- `docs/gtm-container-recipe.json` changes: run `npm run test -- tests/scripts/gtm-recipe.test.ts`.
- `src/content/config.ts` or active route inventory changes: run `npm run test -- tests/config/current-surface.test.ts`.
- `src/content/site/global.yaml` or `src/lib/site-config.ts`: run `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.
- Route/content changes in `src/pages` or `src/content`: run `npm run test:e2e -- tests/e2e/routing.spec.ts`, relevant behavior specs, and `npm run build`.
- Crawl/render-sensitive homepage changes: run `npm run test:built`. This includes `tests/config/crawlable-built-html.test.ts`, the crawlable built HTML foundation check and the prior-art path for future public templates.
- Third-party runtime changes: update `docs/agents/public-runtime-allowlist.json` with the named business purpose, then run `npm run test:built`.
- CTA/navigation/hero behavior changes: run relevant e2e specs, especially `tests/e2e/conversion-flow.spec.ts`, `tests/e2e/navigation-whatsapp.spec.ts`, and `tests/e2e/home-hero-showcase.spec.ts`.
- Lead magnet/trust/about parity changes: run `npm run test:e2e -- tests/e2e/prd-parity.spec.ts`.
- Embed/lazy-media changes: run `npm run test:e2e -- tests/e2e/lite-embed.spec.ts`.
- Footer contact/social changes: run `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.
- Accessibility-sensitive UI changes: run `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`.
- Release-sensitive changes: run `npm run build`, `npm run test`, relevant e2e scopes, and `npm run check:links` with a preview or dev server running.

## Local Development via Docker & Colima

To test the application locally without installing Node/npm or packages directly on the host machine, you can spin up the application in a Docker container.

### Prerequisites
- [Colima](https://github.com/abiosoft/colima) (for macOS container runtime) or Docker Desktop installed.

### Setup and Execution

1. **Start Colima** (if not already running):
   ```bash
   colima start
   ```

2. **Spin Up the Container**:
   Run the following command in the repository root directory:
   ```bash
   docker compose up --build
   ```
   This will:
   - Build a container using the local `Dockerfile` (running Node 20).
   - Install all required dependencies within the container sandbox.
   - Mount the local workspace volume (excluding host `node_modules` to avoid conflict).
   - Start the Astro development server at `http://localhost:4321` with hot-reloading enabled.

3. **Verify the App**:
   Navigate to `http://localhost:4321` on your host machine to interact with the running site.

4. **Shutdown the Environment**:
   To stop the server and remove the container, run:
   ```bash
   docker compose down
   ```

### Important Notes for Testing

* **Running Tests & Verification inside the Container:**
  Since the container already has all packages installed, you can run unit/integration tests and link checks directly inside the running container without installing anything on your host machine:
  ```bash
  # Run unit/integration tests (Vitest)
  docker compose exec web npm run test

  # Run link checking tool
  docker compose exec web npm run check:links
  ```

* **Running Playwright E2E Tests:**
  The development container runs on a minimal Alpine image (`node:20-alpine`) which does not contain the system dependencies or browser binaries required by Playwright.
  - To run Playwright E2E tests (`npm run test:e2e`), you must have Node/npm and dependencies installed locally on your host machine (via `npm install`). You can then run `npm run test:e2e` from your host, which will target the running container at `http://localhost:4321`.
  - Alternatively, E2E tests can be run containerized using a dedicated Playwright Docker image (e.g., `mcr.microsoft.com/playwright`).

* **Updating Dependencies (Anonymous Volume Caching):**
  If `package.json` dependencies are updated, Docker Compose may reuse the existing anonymous `node_modules` volume from a previous run, causing version mismatches. To force a clean install and rebuild, reset the volumes:
  ```bash
  docker compose down -v
  docker compose up --build
  ```

* **Hot-Reloading (File Watching) on macOS:**
  If you notice that editing files locally does not trigger hot-reloading inside the container, check your Colima mount driver. Colima using `sshfs` might delay or swallow file events. For optimal hot-reloading, start Colima using `virtiofs` (default on newer versions):
  ```bash
  colima start --mount-type virtiofs
  ```
