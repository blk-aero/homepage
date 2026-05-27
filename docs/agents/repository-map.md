# Repository Map

- `src/pages`: Astro routes for the homepage and temporary support pages.
- `src/content`: site data collection.
- `src/lib`: shared logic (`consent`, `datalayer`, `homepage-*`, `whatsapp`, `contact`).
- `src/components`, `src/layouts`, `src/styles`: UI composition and styling.
- `tests/config`: script and repo-config assertions.
- `tests/lib`: unit tests for shared logic.
- `tests/e2e`: Playwright end-to-end checks for routing, conversion flow, accessibility, homepage behavior, and navigation.
- `DEPLOYMENT.md`: Cloudflare Pages deployment requirements and post-deploy checks.
