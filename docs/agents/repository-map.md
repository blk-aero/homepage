# Repository Map and Task Routing

## Key Paths

- `src/pages`: Astro routes and dynamic route handlers.
- `src/content`: content collection config and global site config.
- `src/lib`: shared logic for consent, datalayer, homepage content, site config, WhatsApp, and contact helpers.
- `src/components`, `src/layouts`, `src/styles`: UI composition and styling.
- `tests/config`: script and repo-config assertions.
- `tests/content`: content inventory and structure checks.
- `tests/lib`: unit tests for shared logic.
- `tests/e2e`: Playwright checks for routing, conversion flow, accessibility, embeds, and navigation.
- `.github/workflows/astro.yml`: GitHub Pages deployment workflow.

## Task Routing

- For page, section, visual asset, CTA, navigation, proof block, or service-content work, follow `DESIGN.md`.
- For page/content changes, verify route rendering and CTA presence.
- For schema/SEO changes, verify metadata outputs and crawl artifacts such as `/robots.txt` and sitemap files.
- For changes that would restore generated service/city/blog/case rollouts, follow [repo workflows and TODOs](repo-workflows.md) first.
