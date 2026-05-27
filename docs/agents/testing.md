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

* **Running E2E Tests / Link Checks:**
  Because the base development container uses a minimal Node image (`node:20-alpine`) without Playwright system dependencies or browser binaries installed, running Playwright E2E tests (`npm run test:e2e`) directly inside the container is not supported.
  - To run E2E tests or link checks, keep the Docker container running as a local dev server, and execute the test command from your host machine:
    ```bash
    npm run test:e2e
    # or
    npm run check:links
    ```
  - Alternatively, you can run them using a Playwright-capable container (like `mcr.microsoft.com/playwright`).

* **Hot-Reloading (File Watching) on macOS:**
  If you notice that editing files locally does not trigger hot-reloading inside the container, check your Colima mount driver. Colima using `sshfs` might delay or swallow file events. For optimal hot-reloading, start Colima using `virtiofs` (default on newer versions):
  ```bash
  colima start --mount-type virtiofs
  ```

